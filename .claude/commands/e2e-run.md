---
description: "Run E2E tests with Playwright"
allowed-tools:
  - Read
  - Bash
  - Glob
---

# E2E Run Command

**Mode**: READ-ONLY

Run existing E2E tests using Playwright.

## Arguments

- `$ARGUMENTS` - Optional: specific test file or test name

## Procedure

### Step 1: Check Prerequisites

```bash
# Check Playwright
npm ls @playwright/test 2>/dev/null
if [ $? -ne 0 ]; then
  echo "Playwright not installed"
  exit 1
fi

# Check for test files
ls tests/*.spec.js 2>/dev/null || ls e2e/*.spec.js 2>/dev/null || echo "No test files found"
```

### Step 2: If Playwright Not Installed

Provide setup instructions:

```markdown
## Playwright Setup Required

Playwright is not installed. To set up:

\`\`\`bash
# Quick setup
npm init playwright@latest

# Manual setup
npm install -D @playwright/test
npx playwright install
\`\`\`

Create `playwright.config.js`:
\`\`\`javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8080',
  },
  webServer: {
    command: 'npx http-server . -p 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
  },
});
\`\`\`

Then run `/e2e-run` again.
```

### Step 3: Run Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/navigation.spec.js

# Run with specific project (browser)
npx playwright test --project=chromium

# Run in headed mode for debugging
npx playwright test --headed

# Run with UI
npx playwright test --ui
```

### Step 4: Report Results

```markdown
## E2E Test Results

### Summary
- Total: [N] tests
- Passed: [N]
- Failed: [N]
- Skipped: [N]

### Test Details
| Test | Status | Duration |
|------|--------|----------|
| [test name] | [pass/fail] | [time] |

### Failed Tests
[If any failures, include details and error messages]

### Commands Used
\`\`\`bash
npx playwright test
\`\`\`

### View Report
\`\`\`bash
npx playwright show-report
\`\`\`

### Next Steps
- Fix failing tests if any
- Add tests for uncovered flows
```

## Troubleshooting

### Browsers not installed
```bash
npx playwright install
```

### Server not running
```bash
npx http-server . -p 8080
```

### Tests timing out
Increase timeout in config or use `--timeout=60000`
