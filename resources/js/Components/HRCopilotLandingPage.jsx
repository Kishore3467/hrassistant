import React from 'react';

const HRCopilotPage = () => {
  return (
    <div className="hrcopilot">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Devopstrio HR Copilot</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#integration">Integrations</a></li>
          <li><a href="#analytics">Analytics</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Open Source HR Copilot</h1>
          <p>
            AI-powered virtual HR assistant for onboarding, employee support, and automation.
          </p>
          <p className="target">
            🇬🇧 UK-based enterprises & 🇮🇳 India-based IT/HR outsourcing firms
          </p>
        </div>
      </section>

      {/* Features Section */}
      {/* <section id="features" className="features">
        <h2>✅ Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🤖 Chat-based HR Assistant</h3>
            <p>Employee self-service chatbot for leave, payroll, policies, onboarding.</p>
          </div>
          <div className="feature-card">
            <h3>📝 Document Generator</h3>
            <p>Auto-generate job descriptions, offer letters, NDAs, and more.</p>
          </div>
          <div className="feature-card">
            <h3>📄 PDF & Policy Q&A</h3>
            <p>Bot answers questions from internal policy docs.</p>
          </div>
          <div className="feature-card">
            <h3>🧑‍🎓 Onboarding Copilot</h3>
            <p>Day-1 checklist, FAQs, and IT/HR/facility setup guidance.</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Candidate Screening</h3>
            <p>Resume/CV ingestion, Q&A screening bot.</p>
          </div>
          <div className="feature-card">
            <h3>💬 Multi-platform Integration</h3>
            <p>Integrates with Teams, Webchat, WhatsApp via Twilio.</p>
          </div>
        </div>
      </section> */}

      {/* Integration Section */}
      {/* <section id="integration" className="integration">
        <h2>💡 Multi-platform Integration</h2>
        <p>Connect with Microsoft Teams, WhatsApp, Webchat, and more.</p>
      </section> */}

      {/* Analytics Section */}
      {/* <section id="analytics" className="analytics">
        <h2>📈 Analytics Dashboard</h2>
        <p>Logs, queries, insights for HR leadership decision-making.</p>
      </section> */}

      {/* Footer */}
      {/* <footer id="contact" className="footer">
        <p>© 2025 Devopstrio Ltd · Customizable & Open Source</p>
      </footer> */}
    </div>
  );
};

export default HRCopilotPage;
