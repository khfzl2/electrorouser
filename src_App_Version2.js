import React, { useState } from 'react';

function App() {
  const [tab, setTab] = useState('search');
  const [searchQ, setSearchQ] = useState('');
  const [searchR, setSearchR] = useState([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiRes, setAiRes] = useState('');
  const [siteType, setSiteType] = useState('html'); // html, python, etc.
  // You’d manage login/session state here too in real app

  // Quick Search
  async function search() {
    let r = await fetch('/search?q=' + encodeURIComponent(searchQ));
    let data = await r.json();
    setSearchR(data.results);
  }

  // Download Desktop App
  function downloadApp() {
    window.location.href = '/download';
  }

  // AI Website Builder
  async function buildWebsiteAI() {
    let r = await fetch('/website/ai', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ prompt: aiPrompt, codeType: siteType })
    });
    let { result } = await r.json();
    setAiRes(result);
  }

  return (
    <div style={{fontFamily:'Segoe UI', background:'#fafafe', minHeight:'100vh'}}>
      <header style={{padding: '1rem', background: '#242b38', color: '#FFF', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontSize:'1.3rem'}}>🌐 ElectroMail Browser</div>
        <button onClick={downloadApp} style={{padding:'0.5em 2em', background:'#3a56e8', border:'none', color:'#fff', borderRadius:'12px'}}>Download App</button>
      </header>
      <nav style={{borderBottom:'1px solid #dee', display:'flex', gap:'1em', padding:'0.5em 1em'}}>
        <button onClick={()=>setTab('search')}>🔍 Search</button>
        <button onClick={()=>setTab('aiweb')}>🤖 Create Website (AI)</button>
        <button onClick={()=>setTab('webbuild')}>🛠️ Build Website</button>
        <button onClick={()=>setTab('docs')}>📄 Docs</button>
        <button onClick={()=>setTab('sheets')}>📊 Sheets</button>
        <button onClick={()=>setTab('slides')}>📽️ Slides</button>
        <button onClick={()=>setTab('classroom')}>🏫 Classroom</button>
        <button onClick={()=>setTab('admin')}>👑 Admin Panel</button>
      </nav>
      <main style={{padding:'2em'}}>
        {tab === 'search' && (
          <>
            <h2>Super-fast Search</h2>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search everything..." style={{padding:'0.5em', width:'60%'}} />
            <button onClick={search} style={{marginLeft:'1em'}}>Search</button>
            <div>
              {searchR.length === 0 ? <i>No results yet.</i> : searchR.map((r,i)=>
                <div key={i} style={{margin:'1em 0', padding:'1em', border:'1px solid #abc', borderRadius:'9px', background:'#fff'}}>
                  <b>{r.domain || r.title || r.email || r.name}</b>
                  <pre style={{marginTop:'0.5em', fontSize:'0.9em'}}>{JSON.stringify(r,null,2)}</pre>
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'aiweb' && (
          <>
            <h2>AI Website Builder</h2>
            <div>
              <select value={siteType} onChange={e=>setSiteType(e.target.value)}>
                <option value="html">HTML</option>
                <option value="python">Python</option>
                <option value="images">Images</option>
                <option value="text">Text</option>
              </select>
              <input value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)} placeholder="Describe your site (purpose, theme, code...)" style={{width:'60%', margin:'1em'}}/>
              <button onClick={buildWebsiteAI}>Create with AI</button>
            </div>
            <h3>Preview:</h3>
            <pre style={{background:'#f0f0fc', color:'#223', padding:'0.65em 1em', borderRadius:'7px'}}>{aiRes}</pre>
          </>
        )}

        {tab === 'webbuild' && (
          <>
            <h2>Manual Website Creation</h2>
            <p>Create a site yourself (HTML, Python, text, images). The link will end with <b>.electrocom</b> or <b>.electroknowncom</b> for official.</p>
            {/* Insert website builder/editor UI here */}
            <div style={{background: '#f9f9fd', padding:'1em', borderRadius:'11px'}}>
              <i>Editor UI goes here</i>
            </div>
          </>
        )}

        {tab === 'docs' && (
          <>
            <h2>ElectroDocs</h2>
            <p>Google Docs-like editor:</p>
            <div style={{background: '#fff', padding:'1em', minHeight:'200px', border:'1px solid #ddd'}}>Your doc here</div>
          </>
        )}
        {tab === 'sheets' && (
          <>
            <h2>ElectroSheets</h2>
            <p>Google Sheets-like spreadsheet:</p>
            <div style={{background: '#fff', padding:'1em', minHeight:'200px', border:'1px solid #ddd'}}>Spreadsheet UI here</div>
          </>
        )}
        {tab === 'slides' && (
          <>
            <h2>ElectroSlides</h2>
            <p>Presentation (slides):</p>
            <div style={{background: '#fff', padding:'1em', minHeight:'200px', border:'1px solid #ddd'}}>Slides UI here</div>
          </>
        )}
        {tab === 'classroom' && (
          <>
            <h2>ElectroClassroom</h2>
            <p>Organize lessons, assignments, users (like Google Classroom).</p>
            <div style={{background: '#fff', padding:'1em', minHeight:'200px', border:'1px solid #ddd'}}>Classroom features go here</div>
          </>
        )}
        {tab === 'admin' && (
          <>
            <h2>Admin Panel</h2>
            <p>Admin/owner dashboard. View all emails, passwords, activities, sites, manage accounts.</p>
            <div style={{background: '#fff', padding:'1em', minHeight:'200px', border:'1px solid #cce'}}>Admin features go here</div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;