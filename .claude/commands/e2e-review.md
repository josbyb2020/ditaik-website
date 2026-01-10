---
description: "Generate E2E test plan for UI changes"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

# E2E Review Command

**Mode**: READ-ONLY

Generate end-to-end test coverage plan for changed UI flows.

## Arguments

- `$ARGUMENTS` - Optional: specific flow or page to cover

## Procedure

### Step 1: Check Playwright Status

```bash
# Check if Playwright installed
npm ls @playwright/test 2>/dev/null && echo "Playwright installed" || echo "Playwright not installed"

# Check for existing tests
ls -la tests/ 2>/dev/null || ls -la e2e/ 2>/dev/null || echo "No test directory found"
```

### Step 2: Identify Changed Flows

```bash
# Get changed files
git diff HEAD~1..HEAD --name-only | grep -E "\.(html|js)$"
```

Map changes to user flows:
- Navigation changes -> Navigation flow tests
- Form changes -> Form submission tests
- Mobile menu changes -> Mobile interaction tests

### Step 3: Load E2E Auditor Guidelines

Load `.claude/agents/e2e-auditor.md` for test planning approach.

### Step 4: Generate Test Plan

For the Ditaik website, core flows:

#### Navigation Flow (Critical)
```
1. Load homepage
2. Verify header with logo
3. Click each nav link
4. Verify correct page loads
5. Verify active state updates
```

#### Mobile Menu Flow (High)
```
1. Set viewport to 375px
2. Verify hamburger visible
3. Click hamburger
4. Verify menu opens (aria-expanded=true)
5. Click link
6. Verify menu closes
```

#### Contact Flow (High)
```
1. Load contact page
2. Verify email link works (mailto:)
3. Verify phone link works (tel:)
4. Verify social links open new tab
```

#### Footer Flow (Medium)
```
1. Verify all footer links work
2. Verify external links have proper rel
3. Verify copyright year
```

### Step 5: Selector Strategy

Recommend accessible selectors:

```javascript
// Good - role-based
page.getByRole('navigation')
page.getByRole('button', { name: 'Menu' })
page.getByRole('link', { name: 'Contact' })

// Good - label-based
page.getByLabel('Email')

// Acceptable - text-based
page.getByText('Contactez-nous')

// Last resort - test IDs
page.getByTestId('contact-form')
```

### Step 6: Output Report

```markdown
## E2E Test Plan

### Playwright Status
[Installed / Not installed]

If not installed:
\`\`\`bash
npm init playwright@latest
\`\`\`

### Test Coverage Plan

| Flow | Priority | Tests | Status |
|------|----------|-------|--------|
| Navigation | Critical | 5 | Proposed |
| Mobile Menu | High | 3 | Proposed |
| Contact | High | 4 | Proposed |
| Footer | Medium | 3 | Proposed |

### Detailed Test Cases

#### Navigation Tests
\`\`\`javascript
test('all nav links work', async ({ page }) => {
  await page.goto('/');
  // Test each link...
});
\`\`\`

#### Mobile Tests
\`\`\`javascript
test.use({ viewport: { width: 375, height: 667 } });
test('hamburger menu toggles', async ({ page }) => {
  // Test mobile menu...
});
\`\`\`

### Selector Recommendations
[Include selector strategy]

### Next Steps
1. Run `/e2e-run` if Playwright installed
2. Or set up Playwright first
```
