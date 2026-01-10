#!/bin/bash
# Verify UI - Run all available verification checks
# Usage: ./scripts/verify-ui.sh [quick]

set -e

QUICK_MODE=""
if [ "$1" = "quick" ]; then
    QUICK_MODE="true"
    echo "Running in quick mode..."
fi

echo "=========================================="
echo "  Ditaik Website - UI Verification"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0
SKIPPED=0

# Function to check if command exists
check_tool() {
    if command -v "$1" &> /dev/null || npx "$1" --version &> /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to run check
run_check() {
    local name="$1"
    local cmd="$2"

    echo "--- $name ---"
    if eval "$cmd" 2>/dev/null; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC}"
        ((FAILED++))
    fi
    echo ""
}

# Function to skip check
skip_check() {
    local name="$1"
    local install="$2"

    echo "--- $name ---"
    echo -e "${YELLOW}⊘ SKIPPED${NC} (not installed)"
    echo "  Install: $install"
    ((SKIPPED++))
    echo ""
}

echo "=== Tool Detection ==="
echo ""

# Detect tools
HAS_HTMLHINT=$(check_tool htmlhint && echo "yes" || echo "no")
HAS_STYLELINT=$(check_tool stylelint && echo "yes" || echo "no")
HAS_ESLINT=$(check_tool eslint && echo "yes" || echo "no")
HAS_PRETTIER=$(check_tool prettier && echo "yes" || echo "no")
HAS_PA11Y=$(check_tool pa11y && echo "yes" || echo "no")

echo "htmlhint:  $HAS_HTMLHINT"
echo "stylelint: $HAS_STYLELINT"
echo "eslint:    $HAS_ESLINT"
echo "prettier:  $HAS_PRETTIER"
echo "pa11y:     $HAS_PA11Y"
echo ""

echo "=== Running Checks ==="
echo ""

# JavaScript Syntax Check (always available)
echo "--- JavaScript Syntax ---"
JS_OK=true
for f in js/*.js; do
    if [ -f "$f" ]; then
        if node --check "$f" 2>&1; then
            echo -e "  ${GREEN}✓${NC} $f"
        else
            echo -e "  ${RED}✗${NC} $f"
            JS_OK=false
        fi
    fi
done
if [ "$JS_OK" = true ]; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi
echo ""

# HTML Validation
if [ "$HAS_HTMLHINT" = "yes" ]; then
    run_check "HTML Validation" "npx htmlhint '*.html'"
else
    skip_check "HTML Validation" "npm install -D htmlhint"
fi

# CSS Linting
if [ "$HAS_STYLELINT" = "yes" ]; then
    run_check "CSS Linting" "npx stylelint 'css/**/*.css'"
else
    skip_check "CSS Linting" "npm install -D stylelint stylelint-config-standard"
fi

# JS Linting
if [ "$HAS_ESLINT" = "yes" ]; then
    run_check "JavaScript Linting" "npx eslint 'js/**/*.js'"
else
    skip_check "JavaScript Linting" "npm install -D eslint"
fi

# Format Check
if [ "$HAS_PRETTIER" = "yes" ]; then
    run_check "Format Check" "npx prettier --check '**/*.{html,css,js}' --ignore-path .gitignore"
else
    skip_check "Format Check" "npm install -D prettier"
fi

# Quick mode stops here
if [ -n "$QUICK_MODE" ]; then
    echo "=== Quick Mode Complete ==="
else
    # Accessibility Check
    if [ "$HAS_PA11Y" = "yes" ]; then
        echo "--- Accessibility Check ---"
        # Start server
        npx http-server . -p 8080 -s &
        SERVER_PID=$!
        sleep 2

        if npx pa11y http://localhost:8080/index.html --reporter cli 2>/dev/null; then
            echo -e "${GREEN}✓ PASSED${NC}"
            ((PASSED++))
        else
            echo -e "${RED}✗ FAILED${NC}"
            ((FAILED++))
        fi

        # Stop server
        kill $SERVER_PID 2>/dev/null || true
        echo ""
    else
        skip_check "Accessibility Check" "npm install -g pa11y"
    fi
fi

echo "=========================================="
echo "  Summary"
echo "=========================================="
echo -e "${GREEN}Passed:${NC}  $PASSED"
echo -e "${RED}Failed:${NC}  $FAILED"
echo -e "${YELLOW}Skipped:${NC} $SKIPPED"
echo ""

if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Some checks failed. Please fix issues before committing.${NC}"
    exit 1
else
    echo -e "${GREEN}All checks passed!${NC}"
    exit 0
fi
