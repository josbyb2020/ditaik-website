---
description: "Accessibility audit using checklists and automation"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

# Accessibility Review Command

**Mode**: READ-ONLY

Comprehensive accessibility audit following WCAG 2.1 AA guidelines.

## Arguments

- `$ARGUMENTS` - Optional: specific page or component to audit (default: all changed files)

## Procedure

### Step 1: Check Automation Tools

```bash
# Check for pa11y
npx pa11y --version 2>/dev/null && echo "pa11y available" || echo "pa11y not installed"

# Check for axe-core
npm ls @axe-core/playwright 2>/dev/null && echo "axe-core available" || echo "axe-core not installed"
```

### Step 2: Run Automated Checks (if available)

```bash
# Start server if not running
npx http-server . -p 8080 &
sleep 2

# Run pa11y on each page
for page in index.html about.html services.html pricing.html contact.html freelance.html; do
  echo "=== Checking $page ==="
  npx pa11y http://localhost:8080/$page --reporter cli 2>/dev/null || echo "Manual check required"
done
```

### Step 3: Manual Accessibility Audit

Load guidelines from `.claude/agents/a11y-auditor.md` and check:

#### Keyboard Navigation
- [ ] Tab through all pages
- [ ] All interactive elements focusable
- [ ] Logical tab order
- [ ] Focus visible
- [ ] Mobile menu: focus trapped when open

#### Semantics & Structure
- [ ] One `<h1>` per page
- [ ] Heading hierarchy (h1 > h2 > h3)
- [ ] Landmark regions (header, main, nav, footer)
- [ ] Lists use `<ul>`/`<ol>` appropriately

#### Forms & Inputs
- [ ] All inputs have labels
- [ ] Required fields marked
- [ ] Error messages associated

#### Images & Media
- [ ] All images have alt text
- [ ] Decorative images: `alt=""`

#### Links
- [ ] Link text descriptive
- [ ] External links have warning or aria-label

#### ARIA Usage
- [ ] `aria-expanded` on toggles
- [ ] `aria-current="page"` on active nav
- [ ] `aria-label` where text not visible

#### Color & Contrast
- [ ] Text contrast >= 4.5:1
- [ ] Not relying on color alone

### Step 4: Generate Report

```markdown
## Accessibility Audit Report

### Automated Scan Results
[pa11y output or "Tool not installed"]

### Manual Audit

#### Critical Issues (WCAG A failures)
| Issue | Location | WCAG | Fix |
|-------|----------|------|-----|
| [issue] | [file:line] | [criterion] | [suggestion] |

#### High Priority (WCAG AA failures)
| Issue | Location | WCAG | Fix |
|-------|----------|------|-----|

#### Best Practices
| Issue | Location | Recommendation |
|-------|----------|----------------|

### Keyboard Navigation Test
- Homepage: [pass/issues]
- Mobile menu: [pass/issues]
- Contact: [pass/issues]

### Screen Reader Notes
[Any notes about screen reader experience]

### Color Contrast Check
- Primary text (#333) on white: 12.6:1 PASS
- Light text (#666) on white: 5.7:1 PASS
- Primary blue (#1a4fc0) on white: 5.5:1 PASS

### Next Steps
- Run `/a11y-fix` to implement fixes
```

## Installation Guide (if tools missing)

```bash
# Install pa11y for automated testing
npm install -g pa11y

# Install axe-core for Playwright (if using)
npm install -D @axe-core/playwright
```
