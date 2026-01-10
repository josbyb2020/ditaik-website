# Performance UI Auditor Agent

**Mode**: READ-ONLY
**Purpose**: Frontend performance review with measurement-first approach.

## Scope

This agent audits performance of the static Ditaik website:
- Page load performance
- Resource optimization
- Rendering performance
- Core Web Vitals factors

## Procedure

### Step 1: Check Available Tools

**Lighthouse CLI**:
```bash
# Check if installed
npx lighthouse --version

# If not installed
npm install -g lighthouse
```

**Web Vitals**: Check if instrumented in JS files.

### Step 2: Run Lighthouse (if available)

```bash
# Start local server first
npx http-server . -p 8080 &

# Run Lighthouse
npx lighthouse http://localhost:8080/index.html \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless"
```

Key metrics to extract:
- **LCP** (Largest Contentful Paint): < 2.5s good
- **FID** (First Input Delay): < 100ms good
- **CLS** (Cumulative Layout Shift): < 0.1 good
- **TTI** (Time to Interactive): < 3.8s good
- **Total Blocking Time**: < 200ms good

### Step 3: Manual Performance Audit

#### Resource Loading

Check all pages for:

**Images**
- [ ] Hero image (SVG): OK, vectors are efficient
- [ ] Logo (PNG): Could be SVG for better scaling
- [ ] Favicon set: OK

**CSS**
- [ ] Number of CSS files: 2-3 per page (reset + styles + page-specific)
- [ ] CSS loaded in `<head>`: Yes (blocking)
- [ ] Could benefit from critical CSS inline

**JavaScript**
- [ ] Number of JS files: 1-2 per page
- [ ] Loaded at end of body: Yes (good)
- [ ] No heavy libraries

**External Resources**
- [ ] Google Fonts: 2 families (Montserrat, Open Sans)
  - Consider `font-display: swap` (check if set)
  - Preconnect is set (good)
- [ ] Font Awesome: Full library from CDN
  - Consider subset or local hosting

#### Render Performance

**CSS**
- [ ] No `!important` abuse
- [ ] Efficient selectors (no deep nesting)
- [ ] `transition` only on specific properties vs `all`

**JavaScript**
- [ ] DOM queries cached
- [ ] Event delegation used
- [ ] No forced layout/reflow patterns

**Animations**
- [ ] Use `transform` and `opacity` (GPU-accelerated)
- [ ] Current: `translateY` animation on hero image (good)
- [ ] Reduced motion respected

### Step 4: Identify Bottlenecks

For this static site, likely bottlenecks:

1. **Font Loading**
   - Google Fonts loads 8 font weights
   - Could reduce to essential weights (400, 600, 700)

2. **Font Awesome**
   - Full library (~1.5MB uncompressed)
   - Only using ~15 icons
   - Could use subset or SVG icons

3. **No Image Optimization**
   - Logo could be SVG
   - No lazy loading (not needed for above-fold)

4. **CSS Blocking**
   - All CSS loads synchronously
   - Could inline critical CSS

### Step 5: Generate Recommendations

```markdown
## Performance Audit Report

### Lighthouse Scores (if available)
| Metric | Score | Target |
|--------|-------|--------|
| Performance | -- | 90+ |
| LCP | --s | < 2.5s |
| CLS | -- | < 0.1 |
| TBT | --ms | < 200ms |

### Quick Wins (Low effort, High impact)

1. **Reduce Google Fonts weights**
   - Current: 400, 500, 600, 700 for both families
   - Suggested: 400, 600, 700 only
   - Savings: ~50KB

2. **Font display swap**
   - Add `&display=swap` to Google Fonts URL
   - Prevents invisible text during load

3. **Preload critical resources**
   ```html
   <link rel="preload" href="assets/logo.png" as="image">
   ```

### Medium Effort Improvements

4. **Convert logo to SVG**
   - Better quality at all sizes
   - Likely smaller file size

5. **Self-host Font Awesome subset**
   - Only include used icons
   - Reduce from ~1.5MB to ~10KB

6. **Add resource hints**
   ```html
   <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
   ```

### Future Considerations

7. **Inline critical CSS**
   - Extract above-fold styles
   - Load rest asynchronously

8. **Add web-vitals instrumentation**
   - Monitor real user performance
   ```javascript
   import { getCLS, getFID, getLCP } from 'web-vitals';
   getCLS(console.log);
   getFID(console.log);
   getLCP(console.log);
   ```

### Measurement Commands

\`\`\`bash
# Lighthouse audit
npx lighthouse http://localhost:8080 --view

# Page weight analysis
npx bundlesize # (if configured)
\`\`\`

### Metrics Baseline
Record these before and after optimizations:
- Total page weight: [measure]
- Number of requests: [measure]
- DOMContentLoaded: [measure]
- Load time: [measure]
```

## Output Format

Always include:
1. Current metrics (measured or estimated)
2. Prioritized recommendations
3. Commands to measure/verify
4. Before/after expectations
