import React, { useState } from 'react';

function IndexPage() {
  const [tab, setTab] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [searchR, setSearchR] = useState([]);
  const [sid, setSid] = useState('');
  const [loginError, setLoginError] = useState('');
  const [role, setRole] = useState('');
  // Add other UI states for extra pages as needed...

  // Simulated login, replace with API in real app
  async function doLogin(e) {
    e.preventDefault();
    setLoginError("");
    // Replace with fetch to backend in real app
    if (email === "electroowner@electromail.com" && password === "gessey1125191514") {
      setSid('demo-session-id');
      setRole('owner');
      setTab('dashboard');
    } else if (email.endsWith('@electromail.com') && password.length > 6) {
      setSid('demo-user-session-id');
      setRole('user');
      setTab('dashboard');
    } else {
      setLoginError("Invalid credentials or email must end with @electromail.com");
    }
  }

  // Simulated signup, replace with API in real app
  async function doSignup(e) {
    e.preventDefault();
    if (!email.endsWith('@electromail.com')) {
      setLoginError("Email must end with @electromail.com");
      return;
    }
    if (password.length < 6) {
      setLoginError("Password too short");
      return;
    }
    setSid('demo-user-session-id');
    setRole('user');
    setTab('dashboard');
  }

  // Simulated search, replace with API in real app
  async function doSearch() {
    if (!searchQ) {
      setSearchR([]);
      return;
    }
    // Example dummy data - replace with backend search
    setSearchR([
      { type: "email", subject: "Welcome!", preview: "Hello from ElectroMail...", time: "Now" },
      { type: "website", domain: "my-first-site.electrocom", preview: "A cool new website!" }
    ]);
  }

  // Download app button
  function downloadApp() {
    window.open("/download", "_blank");
  }

  // The UI
  return (
    <div style={{fontFamily:"Segoe UI", background:"#f9fafe", minHeight:"100vh"}}>
      <header style={{background:"#233c64", color:"white", padding:"1em 2em", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <span style={{fontWeight:"bold", fontSize:"1.3em"}}>🌐 ElectroMail Browser</span>
        <button onClick={downloadApp} style={{padding:"0.5em 2em", fontWeight:"bold", background:"#3a56e8", border:"none", borderRadius:"12px", color:"white"}}>Download App</button>
      </header>

      {/* Navigation */}
      <nav style={{display:"flex", gap:"1em", padding:"1em 2em", background:"#eaf1ff", borderBottom:"1px solid #dde"}}>
        <button onClick={()=>setTab('home')}>Home</button>
        <button onClick={()=>setTab('signup')}>Sign Up</button>
        <button onClick={()=>setTab('login')}>Login</button>
        <button onClick={()=>setTab('search')}>Quick Search</button>
        {sid && <button onClick={()=>setTab('dashboard')}>Dashboard</button>}
      </nav>

      {/* Main Page Content */}
      <main style={{padding:"2em"}}>
        {/* Homepage intro */}
        {tab === 'home' && (
          <section style={{maxWidth:"650px", margin:"auto", textAlign:"center"}}>
            <h1>Welcome to ElectroMail Browser</h1>
            <p>Create your own <b>@electromail.com</b> account and access secure email, powerful website builder, docs, spreadsheets, presentations, and more!</p>
            <p>Admins/Owners can manage the network and create official sites ending in <b>.electroknowncom</b>. All regular sites use <b>.electrocom</b>.</p>
            <p><button style={{padding:".6em 2em", background:"#2c5de8", color:"white", border:"none", borderRadius:"8px", fontWeight:"bold"}} onClick={()=>setTab('signup')}>Get Started</button></p>
          </section>
        )}

        {/* Sign Up */}
        {tab === 'signup' && (
          <section style={{maxWidth:"420px", margin:"auto"}}>
            <h2>Sign Up</h2>
            <form onSubmit={doSignup}>
              <input placeholder="Choose an email (must end @electromail.com)" type="email" value={email}
                     onChange={e=>setEmail(e.target.value)}
                     style={{width:"100%", marginBottom:"0.7em", padding:"0.8em", fontSize:"1em"}} />
              <input placeholder="Password" type="password" value={password}
                     onChange={e=>setPassword(e.target.value)}
                     style={{width:"100%", marginBottom:"1em", padding:"0.8em", fontSize:"1em"}} />
              <button type="submit" style={{width:"100%", padding:"0.7em", background:"#399", color:"white", borderRadius:"6px"}}>Create Email</button>
              {loginError && <div style={{color:"red", marginTop:"0.8em"}}>{loginError}</div>}
            </form>
          </section>
        )}

        {/* Login */}
        {tab === 'login' && (
          <section style={{maxWidth:"420px", margin:"auto"}}>
            <h2>Login</h2>
            <form onSubmit={doLogin}>
              <input placeholder="Email (@electromail.com)" type="email" value={email}
                     onChange={e=>setEmail(e.target.value)}
                     style={{width:"100%", marginBottom:"0.7em", padding:"0.8em", fontSize:"1em"}} />
              <input placeholder="Password" type="password" value={password}
                     onChange={e=>setPassword(e.target.value)}
                     style={{width:"100%", marginBottom:"1em", padding:"0.8em", fontSize:"1em"}} />
              <button type="submit" style={{width:"100%", padding:"0.7em", background:"#258", color:"white", borderRadius:"6px"}}>Login</button>
              {loginError && <div style={{color:"red", marginTop:"0.8em"}}>{loginError}</div>}
            </form>
            <p style={{marginTop:"1.2em", fontSize:"0.9em"}}>Demo owner: <b>electroowner@electromail.com</b><br/>Password: <b>gessey1125191514</b></p>
          </section>
        )}

        {/* Search */}
        {tab === 'search' && (
          <section style={{maxWidth:"640px", margin:"auto"}}>
            <h2>Super-fast Search</h2>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)}
                   placeholder="Search emails, users, websites, docs, etc..."
                   style={{width:"100%", padding:"0.8em", fontSize:"1em", marginBottom:"0.7em"}} />
            <button style={{width:"100%", padding:"0.7em", background:"#458", color:"white", borderRadius:"6px"}} onClick={doSearch}>Search</button>
            <div style={{marginTop:"1.2em"}}>
              {searchR.length === 0 ? (
                <i>No results yet.</i>
              ) : (
                <div>
                  {searchR.map((r,i)=>
                    <div key={i} style={{margin:"1em 0", padding:"1em 0.5em", border:"1px solid #bbd", borderRadius:"8px", background:"#fff"}}>
                      <span style={{fontWeight:"bold"}}>{r.type === 'email' ? `Email: ${r.subject}` : `Website: ${r.domain}`}</span>
                      <div>{r.preview}</div>
                      <div style={{fontSize:"0.85em", color:"#555"}}>{r.time}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* User dashboard (after login/signup) */}
        {tab === 'dashboard' && (
          <section>
            <h2>Welcome, {role === "owner" ? "Owner/Admin" : "User"}!</h2>
            <div style={{maxWidth:"700px", margin:"auto", marginBottom:"2em"}}>
              <ul>
                <li>📨 <b>Email: </b>Send &amp; receive emails via your <b>@electromail.com</b> address.</li>
                <li>🌐 <b>Website Maker: </b>Create your own websites at <b>*.electrocom</b>.<br/>
                  <i>Official admin/owner sites: <b>*.electroknowncom</b></i></li>
                <li>🤖 <b>AI-powered Builder: </b>Generate sites via AI using text, code, images.</li>
                <li>🔎 <b>Quick Search: </b>Instant search in mails, users, docs, websites and more.</li>
                <li>🗂 <b>Docs/Sheets/Slides/Classroom: </b>All-in-one workspace like Google tools.</li>
                {role === "owner" && (
                  <li>👑 <b>Admin Panel: </b>See all passwords, emails, user activity, create admin accounts and official sites.</li>
                )}
              </ul>
            </div>
            <button style={{padding:"0.6em 2em", background:"#399", color:"white", border:"none", borderRadius:"8px", fontWeight:"bold"}} onClick={()=>setTab('search')}>Go to Search</button>
            <button style={{padding:"0.6em 2em", background:"#2c5de8", color:"white", border:"none", borderRadius:"8px", fontWeight:"bold", marginLeft:"1.4em"}} onClick={downloadApp}>Download Desktop App</button>
          </section>
        )}
      </main>
      <footer style={{background:"#233c64", color:"#fff", padding:"2em 0", marginTop:"2.5em", textAlign:"center", fontSize:"0.98em"}}>© 2025 ElectroMail.com</footer>
    </div>
  );
}

export default IndexPage;