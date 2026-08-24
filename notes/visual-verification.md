# Local visual verification

The synthetic report at `http://127.0.0.1:4097` displayed the static-analysis limitation, six summary cards, an SVG graph with 14 labeled nodes, search/type/risk filters, searchable result rows, and architecture review hints. The graph used the generated repository fixture only; no personal repository was inspected.

Selecting synthetic `src/main.js` showed one incoming HTML reference from `public/index.html`, two outgoing static references, and a one-file potential rename impact. The displayed plan explicitly required manual review/update/reanalysis/testing and stated that the tool makes no source changes.

A `390 × 844` capture saved as `notes/screenshots/mobile-390.png` confirmed a readable stacked hero, static-analysis boundary, two-column summary metrics, and accessible entry into the graph controls without horizontal clipping.
