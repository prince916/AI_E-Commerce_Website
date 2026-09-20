import { useState } from 'react';

const API_BASE = 'http://localhost:4000';

function App() {
  const [status, setStatus] = useState('Checking backend...');
  const [statusTone, setStatusTone] = useState('neutral');
  const [healthLog, setHealthLog] = useState('Waiting for backend response...');
  const [registerLog, setRegisterLog] = useState('No registration attempted yet.');
  const [loginLog, setLoginLog] = useState('No login attempted yet.');
  const [uploadLog, setUploadLog] = useState('No upload attempted yet.');

  async function checkBackend() {
    try {
      const response = await fetch(`${API_BASE}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setStatus('Backend online');
        setStatusTone('success');
        setHealthLog('Connected successfully to the Express backend.');
      } else {
        setStatus('Backend responded with an error');
        setStatusTone('warning');
        setHealthLog(`Received HTTP ${response.status}.`);
      }
    } catch (error) {
      setStatus('Backend offline');
      setStatusTone('danger');
      setHealthLog(`Connection failed: ${error.message}. Start the backend from the server folder.`);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
      setRegisterLog(`Status: ${response.status}\n${result}`);
    } catch (error) {
      setRegisterLog(`Request failed: ${error.message}`);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
      setLoginLog(`Status: ${response.status}\n${result}`);
    } catch (error) {
      setLoginLog(`Request failed: ${error.message}`);
    }
  }

  async function handleUpload(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();
      setUploadLog(`Status: ${response.status}\n${result}`);
    } catch (error) {
      setUploadLog(`Upload failed: ${error.message}`);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">AI</span>
          <div>
            <p className="eyebrow">Commerce Platform</p>
            <h1>AI E-Commerce</h1>
          </div>
        </div>

        <div className={`status-pill ${statusTone}`}>{status}</div>
      </header>

      <main className="dashboard-grid">
        <section className="panel panel-highlight">
          <div className="section-header">
            <h2>System Health</h2>
            <button className="primary-button" onClick={checkBackend} type="button">
              Check Backend
            </button>
          </div>
          <p className="helper-text">Validate that the Node/Express API is running on port 4000.</p>
          <div className="console-box">{healthLog}</div>
        </section>

        <section className="panel">
          <h2>Create Account</h2>
          <form onSubmit={handleRegister} className="form-grid">
            <label>
              Name
              <input type="text" name="name" placeholder="John Doe" required />
            </label>

            <label>
              Email
              <input type="email" name="email" placeholder="john@example.com" required />
            </label>

            <label>
              Password
              <input type="password" name="password" placeholder="••••••••" required />
            </label>

            <button type="submit" className="primary-button full-width">Register</button>
          </form>
          <div className="console-box small">{registerLog}</div>
        </section>

        <section className="panel">
          <h2>Welcome Back</h2>
          <form onSubmit={handleLogin} className="form-grid">
            <label>
              Email
              <input type="email" name="email" placeholder="john@example.com" required />
            </label>

            <label>
              Password
              <input type="password" name="password" placeholder="••••••••" required />
            </label>

            <button type="submit" className="primary-button full-width">Login</button>
          </form>
          <div className="console-box small">{loginLog}</div>
        </section>

        <section className="panel">
          <h2>Product Image Upload</h2>
          <form onSubmit={handleUpload} className="form-grid">
            <label>
              Select Image
              <input type="file" name="image" accept="image/*" required />
            </label>

            <button type="submit" className="secondary-button full-width">Upload Media</button>
          </form>
          <div className="console-box small">{uploadLog}</div>
        </section>
      </main>
    </div>
  );
}

export default App;
