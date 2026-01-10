---
description: "Apply accessibility fixes"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# Accessibility Fix Command

**Mode**: WRITE

Apply accessibility fixes identified in `/a11y-review`.

## Arguments

- `$ARGUMENTS` - REQUIRED: Specify what to fix
  - "fix Critical issues"
  - "fix: [specific issue]"
  - "add missing alt text"

## Procedure

### Step 1: Confirm Scope

Parse `$ARGUMENTS` to determine which fixes to apply.

If scope unclear, ASK before proceeding.

### Step 2: Load Agent Guidelines

Load `.claude/agents/a11y-fixer.md` for fix patterns.

### Step 3: Apply Fixes

Common fixes to apply:

#### Missing Labels
```html
<!-- Add label -->
<label for="inputId">Label text</label>
<input id="inputId" type="text">

<!-- Or visually hidden -->
<label for="inputId" class="visually-hidden">Label text</label>
```

#### Missing Alt Text
```html
<!-- Meaningful image -->
<img src="image.png" alt="Description of image content">

<!-- Decorative image -->
<img src="decoration.png" alt="">
```

#### ARIA Attributes
```html
<!-- Toggle buttons -->
<button aria-expanded="false" aria-controls="menuId">Toggle</button>

<!-- Current page -->
<a href="current.html" aria-current="page">Current</a>
```

#### Focus Styles
```css
/* Add if missing */
:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

.btn:focus-visible {
    box-shadow: 0 0 0 3px rgba(26, 79, 192, 0.5);
}
```

#### Visually Hidden Class
```css
/* Add to reset.css if missing */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

### Step 4: Verify Fixes

```bash
# Run pa11y if available
npx pa11y http://localhost:8080/index.html 2>/dev/null || echo "Manual verification required"

# Check for remaining issues
grep -r "alt=\"\"" *.html  # Find empty alt (should be intentional)
grep -r "<img" *.html | grep -v "alt="  # Find images without alt
```

### Step 5: Report

```markdown
## Accessibility Fixes Applied

### Fixes Implemented
| WCAG | Issue | File | Fix Applied |
|------|-------|------|-------------|
| [criterion] | [issue] | [file:line] | [description] |

### Files Modified
- [file]: [changes]

### Verification
- pa11y: [pass/not available]
- Manual keyboard test: [pass/todo]

### Remaining Issues
- [Any issues not addressed and why]

### Next Steps
- Test keyboard navigation manually
- Run `/verify-ui` for full check
```

## Important Rules

1. **Fix accessibility, not style** - Don't change visual appearance unless required
2. **ARIA is a last resort** - Prefer semantic HTML
3. **Test after fixing** - Keyboard test at minimum
4. **Document WCAG criteria** - Note which criterion each fix addresses
