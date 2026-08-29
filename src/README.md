# Src

## Purpose

Contains the production implementation of Project Digital Twin: command handling, domain rules, storage, reports, and local serving as applicable.

## Contents

- `adapters.mjs` — Collects supported platform observations for Project Digital Twin and provides explicit safe fallbacks where collection is unavailable.
- `cli.mjs` — Implements Project Digital Twin's command-line interface and coordinates validation, persistence, report generation, and local serving.
- `fixtures.mjs` — Provides deterministic synthetic fixtures for Project Digital Twin's demonstrations and regression tests.
- `render.mjs` — Generates and serves Project Digital Twin's demonstration report through a deployment-friendly HTTP host.
- `report.mjs` — Builds Project Digital Twin's self-contained report artifacts and browser-side interactions from validated data.
- `twin.mjs` — Builds and queries Project Digital Twin's repository graph, relationships, impact views, and architecture snapshots.

## Responsibilities

Production behavior belongs here. Generated reports, user data, and repository documentation should remain outside this folder.

## Important Notes

- This folder is part of **Project Digital Twin** and should be kept consistent with the commands and architecture documented in the root README.
- Paths and file roles listed above reflect the current repository implementation.

