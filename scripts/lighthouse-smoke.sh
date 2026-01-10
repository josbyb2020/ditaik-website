#!/bin/bash
# Lighthouse Smoke Test - Performance audit on homepage
# Usage: ./scripts/lighthouse-smoke.sh [page]

set -e

PAGE="${1:-index.html}"

echo "=========================================="
echo "  Lighthouse Performance Audit"
echo "=========================================="
echo ""
echo "Page: $PAGE"
echo ""

# Check if lighthouse is installed
if ! command -v lighthouse &> /dev/null && ! npx lighthouse --version &> /dev/null 2>&1; then
    echo "Lighthouse is not installed."
    echo "Install with: npm install -g lighthouse"
    exit 1
fi

# Start local server
echo "Starting local server..."
npx http-server . -p 8080 -s &
SERVER_PID=$!
sleep 2

# Trap to ensure server is stopped
trap "kill $SERVER_PID 2>/dev/null || true" EXIT

echo "Running Lighthouse audit..."
echo ""

# Create reports directory
mkdir -p reports

# Run Lighthouse
npx lighthouse "http://localhost:8080/$PAGE" \
    --only-categories=performance,accessibility,best-practices,seo \
    --output=html,json \
    --output-path="./reports/lighthouse-$(date +%Y%m%d-%H%M%S)" \
    --chrome-flags="--headless --no-sandbox"

echo ""
echo "=========================================="
echo "  Results"
echo "=========================================="
echo ""
echo "Reports saved to ./reports/"
echo ""

# Extract scores from JSON report
LATEST_REPORT=$(ls -t reports/*.json 2>/dev/null | head -1)
if [ -n "$LATEST_REPORT" ] && command -v jq &> /dev/null; then
    echo "Scores:"
    echo "  Performance:    $(jq -r '.categories.performance.score * 100 | floor' "$LATEST_REPORT")%"
    echo "  Accessibility:  $(jq -r '.categories.accessibility.score * 100 | floor' "$LATEST_REPORT")%"
    echo "  Best Practices: $(jq -r '.categories["best-practices"].score * 100 | floor' "$LATEST_REPORT")%"
    echo "  SEO:            $(jq -r '.categories.seo.score * 100 | floor' "$LATEST_REPORT")%"
    echo ""
fi

echo "View HTML report:"
echo "  open ./reports/lighthouse-*.html"
