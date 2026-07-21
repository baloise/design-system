import { useState } from 'react'
import {
  BalApp,
  BalButton,
  BalButtonGroup,
  BalCard,
  BalCardContent,
  BalCardTitle,
  BalIcon,
  BalHeading,
  BalField,
  BalFieldLabel,
  BalFieldControl,
  BalInput,
  BalTextarea,
  useBaloiseDesignSystem,
} from '@baloise/ds-react'
import './App.css'

function App() {
  useBaloiseDesignSystem()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Vielen Dank ${formData.name}! Ihre Anfrage wurde eingereicht.`)
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  return (
    <BalApp className="has-sticky-footer">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Test Bachelorarbeit</h1>
          <p>Innovative Lösungen für Ihr Unternehmen mit modernem Design System</p>
          <BalButtonGroup>
            <BalButton color="primary" size="large">
              Mehr erfahren
            </BalButton>
            <BalButton color="secondary" size="large">
              Kontakt
            </BalButton>
          </BalButtonGroup>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Unsere Stärken</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span style={{ fontSize: '48px', color: '#004b87' }}>⚙️</span>
              <h3>Professionell</h3>
              <p>Hochwertige und professionelle Lösungen für Ihre geschäftlichen Anforderungen</p>
            </div>
            <div className="feature-card">
              <span style={{ fontSize: '48px' }}>⚡</span>
              <h3>Schnell & Effizient</h3>
              <p>Optimierte Prozesse für maximale Produktivität und schnelle Ergebnisse</p>
            </div>
            <div className="feature-card">
              <span style={{ fontSize: '48px' }}>🛡️</span>
              <h3>Sicher & Zuverlässig</h3>
              <p>Vertrauenswürdige und sichere Systeme mit höchsten Standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="offerings-section">
        <div className="offerings-container">
          <h2 className="offerings-title">Unsere Angebote</h2>
          <div className="offerings-grid">
            <BalCard>
              <div className="offering-card-header">
                <h3>Basis Paket</h3>
                <p>€99/Monat</p>
              </div>
              <BalCardContent className="offering-card-content">
                <ul>
                  <li>Grundlegende Features</li>
                  <li>5 Projektmanagement</li>
                  <li>E-Mail Support</li>
                  <li>Monatliche Updates</li>
                  <li>1 GB Speicher</li>
                </ul>
                <BalButton color="primary" fullwidth>
                  Auswählen
                </BalButton>
              </BalCardContent>
            </BalCard>

            <BalCard>
              <div className="offering-card-header" style={{ background: '#FF6B35' }}>
                <h3>Professional Paket</h3>
                <p>€299/Monat</p>
              </div>
              <BalCardContent className="offering-card-content">
                <ul>
                  <li>Erweiterte Features</li>
                  <li>20 Projektmanagement</li>
                  <li>Prioritäts Support</li>
                  <li>Wöchentliche Updates</li>
                  <li>100 GB Speicher</li>
                  <li>API Zugang</li>
                </ul>
                <BalButton color="primary" fullwidth>
                  Auswählen
                </BalButton>
              </BalCardContent>
            </BalCard>

            <BalCard>
              <div className="offering-card-header" style={{ background: '#004BA8' }}>
                <h3>Enterprise Paket</h3>
                <p>Auf Anfrage</p>
              </div>
              <BalCardContent className="offering-card-content">
                <ul>
                  <li>Alle Features</li>
                  <li>Unbegrenzte Projekte</li>
                  <li>24/7 Premium Support</li>
                  <li>Tägliche Updates</li>
                  <li>1 TB Speicher</li>
                  <li>Dedizierter Account Manager</li>
                </ul>
                <BalButton color="primary" fullwidth>
                  Anfragen
                </BalButton>
              </BalCardContent>
            </BalCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Bereit loszulegen?</h2>
          <p>Starten Sie noch heute mit unseren innovativen Lösungen</p>
          <BalButton color="primary" size="large">
            Kostenlos testen
          </BalButton>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <h2 className="contact-title">Kontaktieren Sie uns</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <BalField>
              <BalFieldLabel>Name</BalFieldLabel>
              <BalFieldControl>
                <BalInput
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ihr Name"
                  required
                ></BalInput>
              </BalFieldControl>
            </BalField>

            <BalField>
              <BalFieldLabel>E-Mail</BalFieldLabel>
              <BalFieldControl>
                <BalInput
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ihre E-Mail"
                  required
                ></BalInput>
              </BalFieldControl>
            </BalField>

            <BalField>
              <BalFieldLabel>Unternehmen</BalFieldLabel>
              <BalFieldControl>
                <BalInput
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Ihr Unternehmen"
                ></BalInput>
              </BalFieldControl>
            </BalField>

            <BalField>
              <BalFieldLabel>Nachricht</BalFieldLabel>
              <BalFieldControl>
                <BalTextarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ihre Nachricht..."
                  required
                ></BalTextarea>
              </BalFieldControl>
            </BalField>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <BalButton color="primary" type="submit">
                Senden
              </BalButton>
              <BalButton
                color="secondary"
                onClick={() => setFormData({ name: '', email: '', company: '', message: '' })}
              >
                Zurücksetzen
              </BalButton>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Test Bachelorarbeit. Alle Rechte vorbehalten. | Design System Demo</p>
      </footer>
    </BalApp>
  )
}

export default App
