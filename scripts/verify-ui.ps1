# Verify UI - Run all available verification checks (Windows PowerShell)
# Usage: .\scripts\verify-ui.ps1 [-Quick]

param(
    [switch]$Quick
)

$ErrorActionPreference = "Continue"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Ditaik Website - UI Verification" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

if ($Quick) {
    Write-Host "Running in quick mode..." -ForegroundColor Yellow
}

$Passed = 0
$Failed = 0
$Skipped = 0

# Function to check if npm package is available
function Test-NpmTool {
    param([string]$Tool)
    try {
        $null = npx $Tool --version 2>&1
        return $LASTEXITCODE -eq 0
    } catch {
        return $false
    }
}

# Function to run check
function Invoke-Check {
    param(
        [string]$Name,
        [string]$Command
    )

    Write-Host "--- $Name ---"
    try {
        Invoke-Expression $Command 2>&1 | Out-Host
        if ($LASTEXITCODE -eq 0) {
            Write-Host "PASSED" -ForegroundColor Green
            $script:Passed++
        } else {
            Write-Host "FAILED" -ForegroundColor Red
            $script:Failed++
        }
    } catch {
        Write-Host "FAILED: $_" -ForegroundColor Red
        $script:Failed++
    }
    Write-Host ""
}

# Function to skip check
function Skip-Check {
    param(
        [string]$Name,
        [string]$Install
    )

    Write-Host "--- $Name ---"
    Write-Host "SKIPPED (not installed)" -ForegroundColor Yellow
    Write-Host "  Install: $Install"
    $script:Skipped++
    Write-Host ""
}

Write-Host "=== Tool Detection ===" -ForegroundColor Cyan
Write-Host ""

# Detect tools
$HasHtmlhint = Test-NpmTool "htmlhint"
$HasStylelint = Test-NpmTool "stylelint"
$HasEslint = Test-NpmTool "eslint"
$HasPrettier = Test-NpmTool "prettier"
$HasPa11y = Test-NpmTool "pa11y"

Write-Host "htmlhint:  $(if($HasHtmlhint){'yes'}else{'no'})"
Write-Host "stylelint: $(if($HasStylelint){'yes'}else{'no'})"
Write-Host "eslint:    $(if($HasEslint){'yes'}else{'no'})"
Write-Host "prettier:  $(if($HasPrettier){'yes'}else{'no'})"
Write-Host "pa11y:     $(if($HasPa11y){'yes'}else{'no'})"
Write-Host ""

Write-Host "=== Running Checks ===" -ForegroundColor Cyan
Write-Host ""

# JavaScript Syntax Check (always available)
Write-Host "--- JavaScript Syntax ---"
$JsOk = $true
Get-ChildItem -Path "js/*.js" | ForEach-Object {
    $result = node --check $_.FullName 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  $($_.Name)" -ForegroundColor Green
    } else {
        Write-Host "  $($_.Name)" -ForegroundColor Red
        $JsOk = $false
    }
}
if ($JsOk) {
    Write-Host "PASSED" -ForegroundColor Green
    $Passed++
} else {
    Write-Host "FAILED" -ForegroundColor Red
    $Failed++
}
Write-Host ""

# HTML Validation
if ($HasHtmlhint) {
    Invoke-Check "HTML Validation" "npx htmlhint '*.html'"
} else {
    Skip-Check "HTML Validation" "npm install -D htmlhint"
}

# CSS Linting
if ($HasStylelint) {
    Invoke-Check "CSS Linting" "npx stylelint 'css/**/*.css'"
} else {
    Skip-Check "CSS Linting" "npm install -D stylelint stylelint-config-standard"
}

# JS Linting
if ($HasEslint) {
    Invoke-Check "JavaScript Linting" "npx eslint 'js/**/*.js'"
} else {
    Skip-Check "JavaScript Linting" "npm install -D eslint"
}

# Format Check
if ($HasPrettier) {
    Invoke-Check "Format Check" "npx prettier --check '**/*.{html,css,js}' --ignore-path .gitignore"
} else {
    Skip-Check "Format Check" "npm install -D prettier"
}

# Quick mode stops here
if (-not $Quick) {
    # Accessibility Check
    if ($HasPa11y) {
        Write-Host "--- Accessibility Check ---"
        # Start server
        $server = Start-Process -FilePath "npx" -ArgumentList "http-server . -p 8080 -s" -PassThru -WindowStyle Hidden
        Start-Sleep -Seconds 2

        try {
            npx pa11y http://localhost:8080/index.html --reporter cli 2>&1 | Out-Host
            if ($LASTEXITCODE -eq 0) {
                Write-Host "PASSED" -ForegroundColor Green
                $Passed++
            } else {
                Write-Host "FAILED" -ForegroundColor Red
                $Failed++
            }
        } finally {
            # Stop server
            Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
        }
        Write-Host ""
    } else {
        Skip-Check "Accessibility Check" "npm install -g pa11y"
    }
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Passed:  $Passed" -ForegroundColor Green
Write-Host "Failed:  $Failed" -ForegroundColor Red
Write-Host "Skipped: $Skipped" -ForegroundColor Yellow
Write-Host ""

if ($Failed -gt 0) {
    Write-Host "Some checks failed. Please fix issues before committing." -ForegroundColor Red
    exit 1
} else {
    Write-Host "All checks passed!" -ForegroundColor Green
    exit 0
}
