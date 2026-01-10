# UI Builder Agent

**Mode**: WRITE
**Purpose**: Implement components/pages per plan, using repo conventions.

## Scope

This agent creates or modifies HTML, CSS, and JavaScript files following the established patterns in the Ditaik website.

## Rules

1. **Minimal Diffs** - Only change what's necessary
2. **Reuse Existing** - Use existing CSS classes and design tokens
3. **Follow Patterns** - Copy structure from similar existing pages
4. **States Required** - Implement loading/error/empty states for dynamic content
5. **Accessibility** - Include proper ARIA attributes and semantic HTML

## Implementation Checklist

### For New HTML Pages

1. Copy the structure from `index.html`
2. Update:
   - `<title>` tag
   - `<meta name="description">` content
   - `<nav>` active link (`class="nav-link active"` and `aria-current="page"`)
   - `<main>` content
3. Keep all security meta tags (CSP, X-Frame-Options, etc.)
4. Include proper CSS files:
   - `css/reset.css`
   - `css/styles.css`
   - `css/[pagename].css` (page-specific, create if needed)
5. Include JS files at end of body:
   - `js/script.js`
   - `js/[pagename].js` (page-specific, create if needed)

### For New CSS

1. Use existing design tokens from `:root` in `css/styles.css`:
   ```css
   color: var(--primary);
   padding: var(--spacing-md);
   border-radius: var(--border-radius-md);
   box-shadow: var(--shadow-md);
   transition: var(--transition);
   ```

2. Follow existing naming patterns:
   - `.section-header` for section titles
   - `.container` for centered content
   - `.btn`, `.btn-primary`, `.btn-secondary` for buttons
   - `.[component]-card` for card elements

3. Include responsive styles:
   ```css
   @media screen and (max-width: 768px) { }
   @media screen and (max-width: 576px) { }
   ```

### For New JavaScript

1. Use `const`/`let`, never `var`
2. Check element existence before accessing:
   ```javascript
   const element = document.querySelector('.my-element');
   if (element) {
       // safe to use element
   }
   ```

3. Use event delegation for multiple similar elements
4. Update ARIA attributes for state changes:
   ```javascript
   element.setAttribute('aria-expanded', 'true');
   ```

### For Forms

1. Include `<label>` for all inputs
2. Add `required` attribute where needed
3. Include client-side validation patterns
4. Handle error display:
   ```html
   <input class="error" ...>
   <span class="error-message">Error text</span>
   ```

## Verification Steps

After making changes:
1. Validate HTML structure
2. Test on mobile viewport (375px)
3. Tab through interactive elements
4. Check hover/focus states

## Output

After completing implementation:
```markdown
## Implementation Complete

### Files Modified
- [file path]: [brief description of changes]

### Files Created
- [file path]: [purpose]

### Testing Notes
- [Any specific things to test]

### Next Steps
- Run `/verify-ui` to validate changes
```
