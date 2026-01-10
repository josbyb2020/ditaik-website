---
description: "Run all available verification checks"
allowed-tools:
  - Read
  - Glob
  - Bash
---

# Verify UI Command

**Mode**: READ-ONLY

Run all available verification checks: format, lint, typecheck, tests.

## Arguments

- `$ARGUMENTS` - Optional: "quick" for fast checks only

## Procedure

### Step 1: Tool Detection

Detect which tools are available:

```bash
echo "=== Tool Detection ==="

# HTML validation
npx htmlhint --version 2>/dev/null && echo "✓ htmlhint" || echo "✗ htmlhint"

# CSS linting
npx stylelint --version 2>/dev/null && echo "✓ stylelint" || echo "✗ stylelint"

# JS linting
npx eslint --version 2>/dev/null && echo "✓ eslint" || echo "✗ eslint"

# Formatting
npx prettier --version 2>/dev/null && echo "✓ prettier" || echo "✗ prettier"

# Accessibility
npx pa11y --version 2>/dev/null && echo "✓ pa11y" || echo "✗ pa11y"

# E2E tests
npm ls @playwright/test 2>/dev/null && echo "✓ playwright" || echo "✗ playwright"
```

### Step 2: Run Available Checks

```bash
echo "=== Running Checks ==="

# HTML validation
echo "--- HTML Validation ---"
npx htmlhint "*.html" 2>/dev/null || echo "SKIPPED: htmlhint not installed"

# CSS linting
echo "--- CSS Linting ---"
npx stylelint "css/**/*.css" 2>/dev/null || echo "SKIPPED: stylelint not installed"

# JS linting
echo "--- JS Linting ---"
npx eslint "js/**/*.js" 2>/dev/null || echo "SKIPPED: eslint not installed"

# Formatting check
echo "--- Format Check ---"
npx prettier --check "**/*.{html,css,js}" 2>/dev/null || echo "SKIPPED: prettier not installed"

# Basic syntax check (always available)
echo "--- Syntax Verification ---"
for f in js/*.js; do
  node --check "$f" 2>&1 && echo "✓ $f" || echo "✗ $f"
done
```

### Step 3: Run Tests (if available)

```bash
# Unit tests
echo "--- Unit Tests ---"
npm test 2>/dev/null || echo "SKIPPED: no test script configured"

# E2E tests
echo "--- E2E Tests ---"
npx playwright test 2>/dev/null || echo "SKIPPED: playwright not installed"
```

### Step 4: A11y Spot Check (if available)

```bash
echo "--- Accessibility Spot Check ---"
# Start server
npx http-server . -p 8080 &
SERVER_PID=$!
sleep 2

# Run pa11y on homepage
npx pa11y http://localhost:8080/index.html --reporter cli 2>/dev/null || echo "SKIPPED: pa11y not installed"

# Stop server
kill $SERVER_PID 2>/dev/null
```

### Step 5: Generate Report

```markdown
## Verification Report

### Summary
| Check | Status | Notes |
|-------|--------|-------|
| HTML Validation | [pass/fail/skip] | |
| CSS Linting | [pass/fail/skip] | |
| JS Linting | [pass/fail/skip] | |
| JS Syntax | [pass/fail] | |
| Formatting | [pass/fail/skip] | |
| Unit Tests | [pass/fail/skip] | |
| E2E Tests | [pass/fail/skip] | |
| A11y Check | [pass/fail/skip] | |

### Issues Found
[List any issues]

### Skipped Checks
The following tools are not installed:
- [tool]: `npm install -D [package]`

### Commands to Install Missing Tools
\`\`\`bash
# All recommended tools
npm install -D htmlhint stylelint eslint prettier pa11y @playwright/test

# Initialize Playwright
npx playwright install
\`\`\`

### Next Steps
- Fix any issues found
- Install missing tools for better coverage
- Run `/ui-review` for detailed UI analysis
```

## Quick Mode

If `$ARGUMENTS` contains "quick", skip:
- E2E tests
- A11y checks
- Formatting (only check, don't report details)

```bash
echo "=== Quick Verification ==="
# Only syntax checks
for f in js/*.js; do
  node --check "$f" 2>&1 || exit 1
done
echo "✓ All JS files valid"
```
