# E2E Fixer Agent

**Mode**: WRITE
**Purpose**: Add Playwright tests if present, or scaffold minimal setup if project agrees.

## Scope

This agent creates and updates end-to-end tests using Playwright (preferred) or provides setup guidance.

## Pre-Check

Before writing tests, verify:
1. Is Playwright installed? Check `package.json` for `@playwright/test`
2. Is there a `playwright.config.js` or `playwright.config.ts`?
3. Is there a `tests/` or `e2e/` directory?

## If Playwright Not Installed

Provide setup instructions and stop:

```markdown
## Playwright Setup Required

Playwright is not installed in this project. To set up:

### Quick Setup
\`\`\`bash
npm init playwright@latest
\`\`\`

This will:
- Install `@playwright/test`
- Create `playwright.config.js`
- Create `tests/` directory with example test
- Optionally install browsers

### Manual Setup
\`\`\`bash
npm install -D @playwright/test
npx playwright install
\`\`\`

Then create `playwright.config.js`:
\`\`\`javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx http-server . -p 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
\`\`\`

After setup, run `/e2e-run` to execute tests.
```

## If Playwright Is Installed

### Test File Structure

```
tests/
├── navigation.spec.js    # Navigation and routing tests
├── accessibility.spec.js # A11y tests with axe-core
├── mobile.spec.js        # Mobile-specific tests
└── forms.spec.js         # Form interaction tests
```

### Writing Tests

Follow these patterns:

#### Navigation Test

```javascript
// tests/navigation.spec.js
import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Ditaik/);
    await expect(page.locator('h1')).toContainText('Trouvez des freelances');
  });

  test('all nav links work', async ({ page }) => {
    await page.goto('/');

    const pages = [
      { link: 'Accueil', url: 'index.html', h1: 'Trouvez des freelances' },
      { link: 'À propos', url: 'about.html', h1: 'À propos' },
      { link: 'Services', url: 'services.html', h1: 'Comment ça marche' },
      { link: 'Tarifs', url: 'pricing.html', h1: 'Tarifs' },
      { link: 'Contact', url: 'contact.html', h1: 'Contactez-nous' },
    ];

    for (const p of pages) {
      await page.goto('/');
      await page.click(`nav >> text=${p.link}`);
      await expect(page.locator('h1')).toContainText(p.h1);
    }
  });
});
```

#### Mobile Menu Test

```javascript
// tests/mobile.spec.js
import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('hamburger menu toggles', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#navToggle');
    const menu = page.locator('#navMenu');

    // Initially closed
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).not.toHaveClass(/active/);

    // Open menu
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toHaveClass(/active/);

    // Close menu
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).not.toHaveClass(/active/);
  });

  test('menu closes on link click', async ({ page }) => {
    await page.goto('/');

    await page.click('#navToggle');
    await page.click('nav >> text=À propos');

    await expect(page.locator('#navMenu')).not.toHaveClass(/active/);
  });
});
```

#### Accessibility Test (if axe-core available)

```javascript
// tests/accessibility.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  const pages = ['/', '/about.html', '/services.html', '/contact.html'];

  for (const path of pages) {
    test(`${path} has no a11y violations`, async ({ page }) => {
      await page.goto(path);

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/navigation.spec.js

# Run with UI
npx playwright test --ui

# Run in headed mode
npx playwright test --headed
```

## Output Format

```markdown
## E2E Tests Created/Updated

### Files Created
- `tests/navigation.spec.js` - [N] tests
- `tests/mobile.spec.js` - [N] tests

### Test Coverage
| Test Suite | Tests | Coverage |
|------------|-------|----------|
| Navigation | 5 | All nav links |
| Mobile | 3 | Menu toggle |
| A11y | 4 | All pages |

### Run Command
\`\`\`bash
npx playwright test
\`\`\`

### Next Steps
- Review test output
- Add tests for any edge cases
- Set up CI integration
```
