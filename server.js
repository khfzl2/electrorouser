const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 4000;
const aiHelper = require('./utils/ai-helper');
const scanSite = require('./utils/scan-site');
const quicksearch = require('./database');

app.use(express.json());

// Add website endpoint
app.post('/website', async (req, res) => {
  const { sid, name, code, type, official } = req.body;
  // Validate link endings and official domains
  const domain = official ? `${name}.electroknowncom` : `${name}.electrocom`;
  if (!domain.endsWith('.electrocom') && !domain.endsWith('.electroknowncom')) return res.status(400).json({error:'Invalid domain'});
  // Scan for viruses/malware
  const clean = await scanSite(code);
  if (!clean) return res.status(400).json({error:'Malware detected'});
  // Save to DB
  quicksearch.websites.push({ domain, code, type, creator: sid });
  res.json({ success:true, link: domain});
});

// Launch AI website builder
app.post('/website/ai', async (req, res) => {
  const { prompt, codeType } = req.body;
  const result = await aiHelper(prompt, codeType);
  res.json({ result });
});

// Fast search (users, emails, websites, docs, sheets, slides)
app.get('/search', (req, res) => {
  const { q } = req.query;
  // Full text index querying (mocked with in-memory search here)
  const results = quicksearch.search(q);
  res.json({ results });
});

// Download desktop app
app.get('/download', (req, res) => {
  res.download('./download/app.zip', 'electro-browser-app.zip');
});

// Google Workspace clone endpoints...
// /docs, /sheets, /slides, /classroom: CRUD handlers for each

app.listen(PORT, () => console.log(`Server running: ${PORT}`));