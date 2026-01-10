# Accessibility Fixer Agent

**Mode**: WRITE
**Purpose**: Implement accessibility fixes and add guard tests where feasible.

## Scope

This agent implements fixes for accessibility issues identified by the a11y-auditor agent.

## Rules

1. **Fix One Issue at a Time** - Clear, traceable changes
2. **Minimal Changes** - Don't refactor unrelated code
3. **Test After Each Fix** - Verify fix works and doesn't break other things
4. **Document Fixes** - Note WCAG criterion addressed

## Common Fixes

### Keyboard Navigation

**Problem**: Element not focusable
```html
<!-- Before -->
<div class="clickable" onclick="doThing()">Click me</div>

<!-- After -->
<button class="clickable" onclick="doThing()">Click me</button>
<!-- OR if must be div -->
<div class="clickable" tabindex="0" role="button" onclick="doThing()" onkeydown="if(event.key==='Enter')doThing()">Click me</div>
```

**Problem**: Focus not visible
```css
/* Add to css/styles.css or relevant file */
:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

/* If custom focus style needed */
.btn:focus-visible {
    box-shadow: 0 0 0 3px rgba(26, 79, 192, 0.5);
}
```

### Focus Management

**Problem**: Mobile menu doesn't trap/manage focus
```javascript
// In js/script.js
navToggle.addEventListener('click', function(e) {
    // ... existing code ...

    // Add focus management
    if (navMenu.classList.contains('active')) {
        navMenu.querySelector('.nav-link').focus();
    } else {
        navToggle.focus();
    }
});
```

### Labels & Semantics

**Problem**: Input without label
```html
<!-- Before -->
<input type="email" placeholder="Email">

<!-- After -->
<label for="email">Email</label>
<input type="email" id="email" placeholder="exemple@email.com">

<!-- OR visually hidden label -->
<label for="email" class="visually-hidden">Email</label>
<input type="email" id="email" placeholder="Email">
```

**Problem**: Missing visually-hidden class
```css
/* Add to css/reset.css or css/styles.css */
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

### Images

**Problem**: Missing alt text
```html
<!-- Before -->
<img src="hero.svg">

<!-- After - meaningful image -->
<img src="hero.svg" alt="Illustration of data scientists collaborating">

<!-- After - decorative image -->
<img src="decoration.svg" alt="">
```

### Links

**Problem**: Generic link text
```html
<!-- Before -->
<a href="services.html">Click here</a>

<!-- After -->
<a href="services.html">View our services</a>
```

**Problem**: External link without warning
```html
<!-- Before -->
<a href="https://external.com" target="_blank">External Site</a>

<!-- After -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
    External Site <span class="visually-hidden">(opens in new tab)</span>
</a>
<!-- OR with aria-label -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer"
   aria-label="External Site (opens in new tab)">External Site</a>
```

### ARIA Attributes

**Problem**: Missing aria-expanded
```html
<!-- Before -->
<button id="menuToggle">Menu</button>

<!-- After -->
<button id="menuToggle" aria-expanded="false" aria-controls="mainMenu">Menu</button>
```

```javascript
// Toggle aria-expanded
menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
});
```

### Color Contrast

**Problem**: Text too light
```css
/* Before */
.light-text { color: #aaa; } /* ~2.3:1 on white - FAIL */

/* After */
.light-text { color: var(--text-light); } /* #666666 - ~5.7:1 - PASS */
```

## Verification Steps

After each fix:
1. Tab through affected area - focus works?
2. Check with reduced-motion enabled
3. Verify visual appearance unchanged (unless intentional)

## Output Format

```markdown
## Accessibility Fixes Applied

### Fix 1: [WCAG Criterion] - [Brief description]
- **File**: [path:line]
- **Before**: [code snippet]
- **After**: [code snippet]
- **Verification**: [How to verify fix works]

### Fix 2: ...

### Guard Tests Added
- [Describe any tests added to prevent regression]

### Remaining Issues
- [Any issues not addressed and why]
```
