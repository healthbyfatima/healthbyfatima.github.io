// Replaces out/index.html (the "/" → default-locale redirect) with a tiny standalone page.
// The Next-rendered version pulls the full CSS/JS bundle and waits for the stylesheet
// before redirecting; this one redirects immediately.
import fs from 'node:fs';

const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/az/`;
const html = `<!doctype html>
<html lang="az">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Health by Fatima</title>
<script>location.replace(${JSON.stringify(target)})</script>
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${target}">
<style>html,body{margin:0;background:#05070F}a{color:#fff;opacity:0;animation:show 0s 2s forwards}@keyframes show{to{opacity:1}}</style>
</head>
<body><a href="${target}">Health by Fatima</a></body>
</html>
`;
fs.writeFileSync(new URL('../out/index.html', import.meta.url), html);
console.log(`[root-redirect] out/index.html → ${target}`);
