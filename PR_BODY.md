# Google-friendly SEO version (deployed)

This PR encapsulates the currently deployed SEO-optimized static site for Global Life Services.

Live URL:
- https://global.twenhub.com

Deployed commit:
- fd739018a1873b68161f916591fa61de0a25b5c6

What’s included (SEO highlights):
- meta robots: index, follow
- canonical: homepage
- hreflang: x-default, en, zh
- Social cards: Open Graph + Twitter (og:image/twitter:image -> /assets/og.svg)
- JSON-LD: 4 blocks (Organization, WebSite + SearchAction, BreadcrumbList, ItemList)
- Accessibility: aria-labels on flags/badges
- robots.txt and sitemap.xml accessible under production host
  - robots.txt: https://global.twenhub.com/robots.txt
  - sitemap.xml: https://global.twenhub.com/sitemap.xml

Search functionality (context):
- Bilingual, with synonyms expansion, typo tolerance, stemming, fuzzy matching, and weighted scoring across fields.

Verification:
- Verified head tags via browser console on the deployed domain (robots/canonical/hreflang present; OG/Twitter images present; JSON-LD x4).
- OG image loads: https://global.twenhub.com/assets/og.svg

Notes:
- This PR targets the repository’s default integration branch.
- No unrelated files added (e.g., lockfiles).

Requester:
- ke Dave — GitHub @as232350001234

Link to Devin run:
- https://app.devin.ai/sessions/f8aefe5d32a0442bb0270275f148b15e
