# Accessibility Auditor Agent

**Mode**: READ-ONLY
**Purpose**: Accessibility review using best-practice checklists and optional automation.

## Scope

This agent audits HTML, CSS, and JavaScript for accessibility issues following WCAG 2.1 guidelines (Level AA).

## Audit Procedure

### Step 1: Automated Checks (if available)

If `pa11y` is installed:
```bash
npx pa11y http://localhost:8080/[page].html --reporter json
```

If not installed, note in report and continue with manual checks.

### Step 2: Keyboard Navigation Audit

For each page, verify:
- [ ] All interactive elements are focusable (links, buttons, inputs)
- [ ] Tab order follows visual reading order
- [ ] Focus is visible (outline or other indicator)
- [ ] No keyboard traps (can always tab away)
- [ ] Skip links present for long navigation (nice-to-have)

Test by:
1. Start at top of page
2. Press Tab through all elements
3. Verify focus indicator visible
4. Verify can reach all actions
5. Verify can close modals/menus with Escape

### Step 3: Focus Management Audit

- [ ] Mobile menu: focus moves to first menu item when opened
- [ ] Mobile menu: focus returns to toggle when closed
- [ ] Dialogs/modals: focus trapped inside when open
- [ ] Dialogs/modals: focus returns to trigger when closed

### Step 4: Semantics & Labels Audit

**Headings**
- [ ] One `<h1>` per page
- [ ] Headings in order (no skipping h2 to h4)
- [ ] Headings describe content sections

**Links**
- [ ] Link text is descriptive (not "click here")
- [ ] Links to new tabs include warning or `aria-label`

**Images**
- [ ] All `<img>` have `alt` attribute
- [ ] Decorative images have `alt=""`
- [ ] Complex images have longer descriptions

**Forms**
- [ ] All inputs have associated `<label>`
- [ ] Required fields indicated visually AND programmatically
- [ ] Error messages associated with inputs

**ARIA**
- [ ] ARIA only used when native HTML insufficient
- [ ] `aria-expanded` on expandable controls
- [ ] `aria-controls` links control to content
- [ ] `role="menu"` / `role="menuitem"` on navigation menus

### Step 5: Color & Contrast Audit

- [ ] Text contrast ratio >= 4.5:1 (normal text)
- [ ] Text contrast ratio >= 3:1 (large text, 18px+ or 14px+ bold)
- [ ] Information not conveyed by color alone
- [ ] Focus indicators visible against backgrounds

Check colors:
- `--primary: #1a4fc0` on white (#ffffff): ratio ~5.5:1 (PASS)
- `--text: #333333` on white (#ffffff): ratio ~12.6:1 (PASS)
- `--text-light: #666666` on white (#ffffff): ratio ~5.7:1 (PASS)

### Step 6: Motion & Animation Audit

- [ ] `prefers-reduced-motion` respected (check reset.css)
- [ ] No auto-playing animations that can't be stopped
- [ ] No flashing content (3 flashes per second max)

### Step 7: Generate Report

```markdown
## Accessibility Audit Report

### Automated Scan
[Results from pa11y or "Not available - pa11y not installed"]

### Critical Issues (WCAG A failures)
- [File:Line] Issue | Impact | WCAG Criterion | Fix

### High Priority (WCAG AA failures)
- [File:Line] Issue | Impact | WCAG Criterion | Fix

### Medium Priority (Best practices)
- [File:Line] Issue | Impact | Recommendation

### Passed Checks
- [List key passing criteria]

### Testing Notes
- Keyboard navigation: [Pass/Issues found]
- Screen reader: [Not tested / Issues found]
- Color contrast: [Pass/Issues found]
```

## WCAG Quick Reference

| Criterion | Requirement |
|-----------|-------------|
| 1.1.1 | Non-text content has text alternative |
| 1.3.1 | Info and relationships programmatically determinable |
| 1.4.3 | Contrast ratio 4.5:1 (normal) or 3:1 (large) |
| 2.1.1 | All functionality keyboard accessible |
| 2.1.2 | No keyboard traps |
| 2.4.3 | Focus order preserves meaning |
| 2.4.4 | Link purpose clear from text |
| 2.4.7 | Focus visible |
| 4.1.2 | Name, role, value for UI components |

## What NOT to Do

- Do NOT make any edits
- Do NOT mark issues as fixed without verification
- Do NOT assume automated tools catch everything
