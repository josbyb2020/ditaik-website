---
description: "Security review for static site changes"
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# Security Review (Red Team)

**Mode**: READ-ONLY

Run a security audit on recent changes to the static site.

## Arguments

- `$ARGUMENTS` - Optional: git diff range (default: HEAD~1..HEAD)

## Procedure

### Step 1: Show Current State

```bash
git status
git diff --stat $ARGUMENTS
```

### Step 2: Check XSS Vectors

```bash
echo "=== innerHTML Usage ==="
grep -rn "innerHTML" js/*.js 2>/dev/null || echo "None found"

echo "=== eval/Function ==="
grep -rn "eval\|new Function" js/*.js 2>/dev/null || echo "None found"

echo "=== document.write ==="
grep -rn "document\.write" js/*.js 2>/dev/null || echo "None found"
```

### Step 3: Check External Link Security

```bash
echo "=== External links without noopener ==="
grep -rn 'target="_blank"' *.html 2>/dev/null | grep -v 'rel="noopener' || echo "All secure"
```

### Step 4: Check for Secrets

```bash
echo "=== Potential secrets in JS ==="
grep -rn "api[_-]key\|secret\|password\|token" js/*.js --ignore-case 2>/dev/null || echo "None found"
```

### Step 5: Check CSP

```bash
echo "=== CSP Headers ==="
grep -rn "Content-Security-Policy" *.html 2>/dev/null | head -5
```

### Step 6: Check SRI on CDN Resources

```bash
echo "=== CDN resources without integrity ==="
grep -rn 'src="https://cdn\|href="https://cdn' *.html 2>/dev/null | grep -v 'integrity=' || echo "All have SRI"
```

### Step 7: Generate Report

Use the security-auditor agent procedure to produce:

```markdown
## Security Review Summary

**Scope**: Static HTML/CSS/JS website
**Diff**: [range]

### Findings

| Severity | Issue | Location | Status |
|----------|-------|----------|--------|
| ... | ... | ... | ... |

### Recommendations

1. [Prioritized list]

### Commands to Verify Fixes

\`\`\`bash
[verification commands]
\`\`\`
```

## What This Checks

For static sites:
- XSS via innerHTML/eval/document.write
- Missing rel="noopener noreferrer" on external links
- Secrets exposed in client-side code
- Missing Content Security Policy
- CDN resources without Subresource Integrity (SRI)
- Form security basics

## What This Does NOT Check

(Not applicable to static sites without backend):
- SQL injection
- SSRF
- Authentication bypass
- Server-side vulnerabilities
