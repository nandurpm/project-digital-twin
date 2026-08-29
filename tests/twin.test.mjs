/*
 * ============================================================
 * FILE: twin.test.mjs
 * PURPOSE: Exercises Project Digital Twin's domain behavior, validation, persistence, reporting, and safety boundaries with the Node.js test runner.
 * ============================================================
 */

import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp,readFile,rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseReferences } from "../src/adapters.mjs";
import { createSampleRepository } from "../src/fixtures.mjs";
import { reportHtml,writeReport } from "../src/report.mjs";
import { buildTwin,compareTwins,createSnapshot,impactPlan,queryTwin } from "../src/twin.mjs";
async function fixture(){const root=await mkdtemp(join(tmpdir(),'project-digital-twin-'));await createSampleRepository(root);return root}
test('parses static imports, HTML links, CSS references, markdown links, JSON references, and workflow uses',()=>{assert.deepEqual(parseReferences('src/main.js',"import x from './ui.js'; const y=require('./data.json')").map(item=>item.raw),['./ui.js','./data.json']);assert.deepEqual(parseReferences('public/index.html','<script src="../src/main.js"></script><a href="../docs/a.md">A</a>').map(item=>item.kind),['html-link','html-link']);assert.equal(parseReferences('styles/app.css',"@import url('./theme.css'); .x{background:url('../logo.svg')}").length,2);assert.equal(parseReferences('README.md','[Guide](docs/guide.md)').length,1);assert.equal(parseReferences('.github/workflows/test.yml','- uses: actions/checkout@v4').length,1)});
test('builds normalized nodes and edges from the synthetic fixture repository',async()=>{const root=await fixture();try{const twin=await buildTwin(root);assert.ok(twin.summary.files>=10);assert.ok(twin.edges.some(edge=>edge.source==='src/main.js'&&edge.target==='src/ui.js'));assert.ok(twin.nodes.some(node=>node.id==='package:left-pad'));assert.ok(twin.nodes.some(node=>node.id==='assets/manual.pdf'));assert.ok(twin.gitHistoryAvailable)}finally{await rm(root,{recursive:true,force:true})}});
test('answers dependency, page-usage, reference, and rename-impact queries without source changes',async()=>{const root=await fixture();try{const twin=await buildTwin(root),query=queryTwin(twin,'src/main.js'),plan=impactPlan(twin,'src/main.js');assert.ok(query.dependents.some(edge=>edge.source==='public/index.html'));assert.ok(query.pagesUsing.includes('public/index.html'));assert.ok(plan.affected.includes('public/index.html'));assert.ok(['low','medium','high'].includes(plan.level))}finally{await rm(root,{recursive:true,force:true})}});
test('creates safe snapshots and compares graph drift',async()=>{const root=await fixture();try{const twin=await buildTwin(root),snapshot=createSnapshot(twin),comparison=compareTwins(snapshot,twin);assert.equal(snapshot.schemaVersion,'project-digital-twin-snapshot/v1');assert.equal(comparison.edgeDelta,0);assert.deepEqual(comparison.addedNodes,[])}finally{await rm(root,{recursive:true,force:true})}});
test('writes an interactive graph report with search, filtering, risk detail, and static-analysis limitations',async()=>{const root=await fixture(),out=await mkdtemp(join(tmpdir(),'twin-report-'));try{const twin=await buildTwin(root),outputs=await writeReport(twin,out),html=await readFile(outputs.html,'utf8');for(const text of['Interactive graph','Search nodes','Node details / impact plan','Static-analysis limitation','Potential rename impact'])assert.match(html,new RegExp(text));assert.match(reportHtml(twin),/project-digital-twin\/v1/)}finally{await rm(root,{recursive:true,force:true});await rm(out,{recursive:true,force:true})}});
