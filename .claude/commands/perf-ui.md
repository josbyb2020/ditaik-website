---
description: "Performance audit using Lighthouse and web-vitals"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

# Performance UI Command

**Mode**: READ-ONLY

Frontend performance audit with Lighthouse and measurement recommendations.

## Arguments

- `$ARGUMENTS` - Optional: specific page to audit (default: all pages)

## Procedure

### Step 1: Check Tools

```bash
# Check Lighthouse CLI
npx lighthouse --version 2>/dev/null && echo "Lighthouse available" || echo "Lighthouse not installed"

# Check for web-vitals in project
grep -r "web-vitals" package.json 2>/dev/null && echo "web-vitals installed" || echo "web-vitals not installed"
```

### Step 2: Run Lighthouse (if available)

```bash
# Start server
npx http-server . -p 8080 &
sleep 2

# Run Lighthouse on homepage
npx lighthouse http://localhost:8080/index.html \
  --only-categories=performance \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless"

# View summary
cat lighthouse-report.json | jq '.categories.performance.score, .audits["largest-contentful-paint"].numericValue, .audits["cumulative-layout-shift"].numericValue'
```

### Step 3: Manual Performance Audit

Load `.claude/agents/perf-ui-auditor.md` and analyze:

#### Resource Analysis
```bash
# Count CSS files
find . -name "*.css" -not -path "./.git/*" | wc -l

# Count JS files
find . -name "*.js" -not -path "./.git/*" | wc -l

# Check file sizes
ls -lah css/*.css js/*.js assets/*.png assets/*.svg 2>/dev/null
```

#### External Dependencies
- Google Fonts: 2 families, multiple weights
- Font Awesome: Full library (~1.5MB)
- CDN resources: fonts.googleapis.com, cdnjs.cloudflare.com

### Step 4: Core Web Vitals Assessment

| Metric | Target | Likely Status |
|--------|--------|---------------|
| LCP | < 2.5s | Good (static site) |
| FID | < 100ms | Good (minimal JS) |
| CLS | < 0.1 | Check hero animation |

### Step 5: Generate Report

```markdown
## Performance Audit Report

### Lighthouse Scores (if available)
| Metric | Score/Value | Target | Status |
|--------|-------------|--------|--------|
| Performance | --/100 | 90+ | -- |
| LCP | --s | < 2.5s | -- |
| CLS | -- | < 0.1 | -- |
| TBT | --ms | < 200ms | -- |

### Resource Summary
| Type | Count | Size |
|------|-------|------|
| HTML | 7 | ~30KB |
| CSS | 8 | ~40KB |
| JS | 7 | ~10KB |
| Images | 3 | ~50KB |
| External | 2 | ~500KB (fonts) |

### Quick Wins

1. **Reduce Google Fonts**
   Current:
   \`\`\`
   Montserrat: 400, 500, 600, 700
   Open Sans: 300, 400, 500, 600
   \`\`\`
   Recommended:
   \`\`\`
   Montserrat: 400, 600, 700
   Open Sans: 400, 600
   \`\`\`

2. **Add font-display: swap**
   Already using `display=swap` in font URL? [Check]

3. **Subset Font Awesome**
   Using ~15 icons from full library
   Consider: self-host only used icons

### Medium Effort

4. **Preload critical assets**
   \`\`\`html
   <link rel="preload" href="css/styles.css" as="style">
   <link rel="preload" href="assets/logo.png" as="image">
   \`\`\`

5. **Convert logo to SVG**
   Better scaling, likely smaller

### Measurement Commands

\`\`\`bash
# Run Lighthouse
npx lighthouse http://localhost:8080 --view

# Install Lighthouse CLI
npm install -g lighthouse
\`\`\`

### Web Vitals Integration

To add real-user monitoring:
\`\`\`bash
npm install web-vitals
\`\`\`

\`\`\`javascript
// In script.js
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric.name, metric.value);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
\`\`\`

### Next Steps
1. Implement quick wins
2. Measure before/after
3. Set up monitoring
```
