# Project Digital Twin

**Project Digital Twin** is a portable, read-only repository architecture mapper. It inventories a selected local repository, normalizes static relationships into a project graph, and creates local HTML/JSON reports for exploration, dependency queries, drift comparison, and controlled update planning.

> **Analysis boundary:** Project Digital Twin reads filesystem, package, workflow, and available Git metadata only. It never changes source files, runs project code, installs packages, fetches remotes, checks out commits, edits Git state, or performs a rename. Graph output is evidence for review, not an execution model or an automatic refactor plan.

## Static adapters and graph contents

| Adapter | Collected relationship |
|---|---|
| JavaScript / TypeScript | Static `import`, `export … from`, `require`, and literal dynamic-import forms. |
| HTML | Static `href` and `src` references. |
| CSS | `@import` and `url(...)` references. |
| JSON | Relative-path-like string values in nested data structures. |
| README / Markdown | Markdown links and resource references. |
| `package.json` | Runtime and development package dependency nodes. |
| GitHub Actions | `uses:` workflow references. |
| Git history | Available recent file-path activity metadata only; no source contents. |

The normalized graph distinguishes repository files, package dependencies, and external/unresolved targets. It exposes incoming and outgoing references, HTML pages using a selected module, file/resource references, risk levels based on static in/out degree, orphan hints, stale-resource hints, and recently changed file paths when local Git history is available.

## Queries and controlled impact planning

```bash
# Build a local architecture report and optional metadata snapshot
./run-local.sh analyze /path/to/repository --out reports/analyze --snapshot snapshots/twin.json

# Query static dependents and pages using an exact normalized node path
./run-local.sh query reports/analyze/project-digital-twin.json src/main.js

# Generate a read-only rename-impact plan; it does not rename anything
./run-local.sh plan reports/analyze/project-digital-twin.json src/main.js

# Compare a prior analysis or saved snapshot with a current analysis document
./run-local.sh compare snapshots/baseline.json reports/analyze/project-digital-twin.json
```

The impact plan provides direct dependents, transitively affected static dependents, a simple risk level, and manual next steps: review references, update them intentionally, rerun the local twin, and then use the repository’s own tests/build. It does not claim completeness or perform those actions.

## Local Linux and Windows use

Install **Node.js 22+**, pnpm, and Git if Git activity is desired. The local report server binds only to `127.0.0.1`; its default port is configurable.

| Task | Linux / macOS shell | Windows PowerShell or Command Prompt |
|---|---|---|
| Analyze local repository | `./run-local.sh analyze /path/to/repository --out reports/analyze` | `run-local.cmd analyze C:\path\to\repository --out reports\analyze` |
| Add an ignore basename | `./run-local.sh analyze /path/to/repository --ignore vendor --out reports/analyze` | `run-local.cmd analyze C:\path\to\repository --ignore vendor --out reports\analyze` |
| Run synthetic demo | `./run-local.sh demo --out reports/demo` | `run-local.cmd demo --out reports\demo` |
| Serve a local report | `./run-local.sh serve reports/analyze --port=4085` | `run-local.cmd serve reports\analyze --port=4085` |

The demo creates a clearly labeled **synthetic repository** beneath `reports/synthetic-repository`, including imports, HTML/CSS links, JSON and Markdown references, package metadata, a workflow, and a local Git commit. It does not scan a personal repository. Local reports are named `project-digital-twin.html` and `project-digital-twin.json`; there is no hosted site URL for this repository.

## Important limitations

Dynamic imports, runtime-generated paths, TypeScript/webpack/Vite aliases, framework routing, reflection, plugin registration, generated files, minified bundles, non-literal configuration, binary formats, unsupported language features, and external resources can be omitted or represented as unresolved nodes. Timestamps and Git activity are hints, not proof of ownership, staleness, security, or safe removability. Paths, commit metadata, package names, workflow references, and report output may be sensitive; review before sharing.

## Validation

```bash
pnpm install
pnpm test
pnpm check
pnpm demo
```

The suite uses temporary synthetic repositories and covers import/link parsing, graph generation, dependency/page/resource queries, impact analysis, snapshot drift comparison, and interactive report generation.

## License

MIT.
