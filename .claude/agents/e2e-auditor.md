# E2E Auditor Agent

**Mode**: READ-ONLY
**Purpose**: Propose E2E coverage for changed flows; create test plan and selectors strategy.

## Scope

This agent reviews UI changes and proposes end-to-end test coverage using Playwright or manual testing procedures.

## Guiding Principles

Based on Testing Library principles:
- Test user-visible behavior, not implementation details
- Use accessible selectors (role, label, text content)
- Avoid testing CSS classes or DOM structure

## Procedure

### Step 1: Identify Testable Flows

For each changed page/component, identify:
1. **Critical paths** - Core user journeys
2. **Edge cases** - Error states, empty states
3. **Interactions** - Clicks, form submissions, navigation

### Step 2: Define Test Cases

Format:
```markdown
### [Flow Name]
**Priority**: Critical / High / Medium / Low
**Pages**: [list of pages involved]

**Steps**:
1. [User action]
2. [Expected result]
3. [User action]
4. [Expected result]

**Selectors**:
- [element]: [accessible selector strategy]
```

### Step 3: Selector Strategy

Prefer in this order:
1. **Role + Name**: `getByRole('button', { name: 'Contact' })`
2. **Label**: `getByLabel('Email')`
3. **Text**: `getByText('Contactez-nous')`
4. **Test ID** (last resort): `getByTestId('contact-form')`

For this project (vanilla HTML), manual equivalents:
```javascript
// Role + Name
document.querySelector('button[aria-label="Contact"]')
document.querySelector('a:contains("Contact")')

// By role (approximate)
document.querySelector('[role="navigation"]')
document.querySelector('nav')
```

## Test Plans for Ditaik Website

### Navigation Flow
**Priority**: Critical
**Pages**: All

**Steps**:
1. Load homepage
2. Verify header visible with logo
3. Click each nav link
4. Verify correct page loads (check h1 content)
5. Verify current page marked active
6. On mobile: test hamburger menu toggle

**Selectors**:
- Logo: `nav .logo a`
- Nav links: `nav .nav-link`
- Hamburger: `#navToggle`
- Mobile menu: `#navMenu`

### Mobile Menu Flow
**Priority**: High
**Pages**: All (< 768px viewport)

**Steps**:
1. Set viewport to 375px width
2. Verify hamburger visible
3. Click hamburger
4. Verify menu slides in
5. Verify `aria-expanded="true"` on toggle
6. Click nav link
7. Verify menu closes
8. Verify `aria-expanded="false"`

**Selectors**:
- Toggle: `#navToggle[aria-expanded]`
- Menu: `#navMenu.active`

### Contact Flow
**Priority**: Critical
**Pages**: contact.html

**Steps**:
1. Load contact page
2. Verify email link visible
3. Verify phone link visible
4. Verify social links have proper aria-labels
5. Click email link (verify mailto: href)

**Selectors**:
- Email: `a[href^="mailto:"]`
- Phone: `a[href^="tel:"]`
- LinkedIn: `a[aria-label="LinkedIn"]`

### Footer Links Flow
**Priority**: Medium
**Pages**: All

**Steps**:
1. Scroll to footer
2. Verify all internal links work
3. Verify external links have `rel="noopener noreferrer"`
4. Verify copyright year correct

**Selectors**:
- Footer: `footer`
- Links: `footer a`
- Copyright: `.copyright`

## Playwright Test Template (if installed)

```javascript
// tests/navigation.spec.js
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all pages', async ({ page }) => {
    await page.goto('/');

    // Check all nav links
    const navLinks = page.locator('nav .nav-link');
    const count = await navLinks.count();

    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      const text = await link.textContent();

      await link.click();
      await expect(page).toHaveURL(new RegExp(href));
    }
  });

  test('should toggle mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const toggle = page.locator('#navToggle');
    const menu = page.locator('#navMenu');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(menu).toHaveClass(/active/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
```

## Output Format

```markdown
## E2E Test Plan

### Playwright Status
[Installed / Not installed - run `npm init playwright@latest` to set up]

### Test Coverage Summary
| Flow | Priority | Status |
|------|----------|--------|
| Navigation | Critical | Proposed |
| Mobile Menu | High | Proposed |
| Contact | Critical | Proposed |
| Footer | Medium | Proposed |

### Detailed Test Cases
[Include test cases as above]

### Selector Strategy
[Include selector recommendations]

### Next Steps
1. [Install Playwright if needed]
2. [Create test files]
3. [Run tests]
```
