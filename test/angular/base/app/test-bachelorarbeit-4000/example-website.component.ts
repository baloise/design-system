import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'

@Component({
  selector: 'app-example-website',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  template: `
    <bal-app class="example-website">
      <div class="topbar">
        <div class="brand">Test Bachelorarbeit</div>
        <div class="nav-items">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#offerings">Angebote</a>
          <a href="#contact">Kontakt</a>
        </div>
      </div>

      <section class="hero-section" id="home">
        <div class="hero-inner">
          <bal-heading level="1" class="hero-title">Test Bachelorarbeit</bal-heading>
          <bal-text class="hero-text">
            Moderne Web-Lösungen für Unternehmen mit unserem Angular Design-System.
          </bal-text>
          <div class="hero-actions">
            <bal-button color="primary" size="large">Mehr erfahren</bal-button>
            <bal-button color="secondary" size="large">Kontakt</bal-button>
          </div>
        </div>
      </section>

      <section class="section features-section" id="features">
        <div class="container">
          <bal-heading level="2">Unsere Stärken</bal-heading>
          <bal-grid cols="3" class="features-grid">
            <bal-grid-column>
              <bal-card class="feature-card">
                <bal-card-header>
                  <bal-card-title>Professionell</bal-card-title>
                </bal-card-header>
                <bal-card-content>
                  <bal-text>Hochwertige Unternehmenslösungen mit modernem Look & Feel.</bal-text>
                </bal-card-content>
              </bal-card>
            </bal-grid-column>
            <bal-grid-column>
              <bal-card class="feature-card">
                <bal-card-header>
                  <bal-card-title>Schnell</bal-card-title>
                </bal-card-header>
                <bal-card-content>
                  <bal-text>Kurze Entwicklungszyklen und schnelle Umsetzung für Ihre Projekte.</bal-text>
                </bal-card-content>
              </bal-card>
            </bal-grid-column>
            <bal-grid-column>
              <bal-card class="feature-card">
                <bal-card-header>
                  <bal-card-title>Sicher</bal-card-title>
                </bal-card-header>
                <bal-card-content>
                  <bal-text>Zuverlässige Lösungen mit Fokus auf Sicherheit und Stabilität.</bal-text>
                </bal-card-content>
              </bal-card>
            </bal-grid-column>
          </bal-grid>
        </div>
      </section>

      <section class="section offerings-section" id="offerings">
        <div class="container">
          <bal-heading level="2">Unsere Angebote</bal-heading>
          <bal-grid cols="3" class="offerings-grid">
            <bal-grid-column>
              <bal-card class="offering-card">
                <bal-card-header>
                  <bal-card-title>Basis Paket</bal-card-title>
                </bal-card-header>
                <bal-card-content>
                  <bal-text>€99 / Monat</bal-text>
                  <ul>
                    <li>Standard Support</li>
                    <li>Basic Styling</li>
                    <li>Monatliche Updates</li>
                  </ul>
                  <bal-button color="primary">Jetzt wählen</bal-button>
                </bal-card-content>
              </bal-card>
            </bal-grid-column>

            <bal-grid-column>
              <bal-card class="offering-card">
                <bal-card-header>
                  <bal-card-title>Professional Paket</bal-card-title>
                </bal-card-header>
                <bal-card-content>
                  <bal-text>€299 / Monat</bal-text>
                  <ul>
                    <li>Priorisierter Support</li>
                    <li>Erweiterte Features</li>
                    <li>API Zugang</li>
                  </ul>
                  <bal-button color="primary">Jetzt wählen</bal-button>
                </bal-card-content>
              </bal-card>
            </bal-grid-column>

            <bal-grid-column>
              <bal-card class="offering-card">
                <bal-card-header>
                  <bal-card-title>Enterprise Paket</bal-card-title>
                </bal-card-header>
                <bal-card-content>
                  <bal-text>Auf Anfrage</bal-text>
                  <ul>
                    <li>Individuelle Beratung</li>
                    <li>Dedizierter Support</li>
                    <li>Maßgeschneiderte Lösungen</li>
                  </ul>
                  <bal-button color="primary">Kontakt aufnehmen</bal-button>
                </bal-card-content>
              </bal-card>
            </bal-grid-column>
          </bal-grid>
        </div>
      </section>

      <section class="section contact-section" id="contact">
        <div class="container">
          <bal-heading level="2">Kontaktieren Sie uns</bal-heading>
          <bal-card class="contact-card">
            <bal-card-content>
              <form class="contact-form">
                <bal-field>
                  <bal-field-label>Name</bal-field-label>
                  <bal-field-control>
                    <bal-input placeholder="Ihr Name"></bal-input>
                  </bal-field-control>
                </bal-field>
                <bal-field>
                  <bal-field-label>E-Mail</bal-field-label>
                  <bal-field-control>
                    <bal-input placeholder="Ihre E-Mail"></bal-input>
                  </bal-field-control>
                </bal-field>
                <bal-field>
                  <bal-field-label>Nachricht</bal-field-label>
                  <bal-field-control>
                    <bal-textarea placeholder="Ihre Nachricht"></bal-textarea>
                  </bal-field-control>
                </bal-field>
                <bal-button color="primary">Anfrage senden</bal-button>
              </form>
            </bal-card-content>
          </bal-card>
        </div>
      </section>

      <bal-footer class="footer">
        <div class="container footer-inner">
          <div>
            <bal-heading level="3">Test Bachelorarbeit</bal-heading>
            <bal-text>Moderne Unternehmens-Webseite mit Angular und Baloise Design-System.</bal-text>
          </div>
          <div>
            <bal-heading level="3">Links</bal-heading>
            <nav class="footer-nav">
              <a href="#home">Home</a>
              <a href="#features">Features</a>
              <a href="#contact">Kontakt</a>
            </nav>
          </div>
          <div>
            <bal-heading level="3">Impressum</bal-heading>
            <bal-text>© 2026 Test Bachelorarbeit. Alle Rechte vorbehalten.</bal-text>
          </div>
        </div>
      </bal-footer>
    </bal-app>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      background: white;
      border-bottom: 1px solid #e5e7eb;
    }

    .brand {
      font-weight: 700;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .nav-items {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .nav-items a {
      color: #0f172a;
      text-decoration: none;
      font-weight: 500;
    }

    .hero-section {
      background: linear-gradient(135deg, #004b87 0%, #003d6b 100%);
      color: white;
      padding: 6rem 1.5rem;
      text-align: center;
    }

    .hero-inner {
      max-width: 760px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      margin-bottom: 1rem;
    }

    .hero-text {
      font-size: 1.15rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
      line-height: 1.8;
    }

    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .section {
      padding: 4rem 1.5rem;
      background-color: white;
    }

    .features-section {
      background: #f8fafc;
    }

    .section h2 {
      margin-bottom: 2rem;
    }

    .container {
      max-width: 1180px;
      margin: 0 auto;
    }

    .features-grid,
    .offerings-grid {
      gap: 1.5rem;
    }

    .feature-card,
    .offering-card,
    .contact-card {
      min-height: 100%;
    }

    .offering-card ul {
      padding-left: 1.1rem;
      margin: 1rem 0;
      color: #334155;
    }

    .offering-card li {
      margin-bottom: 0.75rem;
      list-style: disc;
    }

    .contact-form {
      display: grid;
      gap: 1.25rem;
    }

    .footer {
      background: #0f172a;
      color: white;
      padding: 3rem 1.5rem;
    }

    .footer-inner {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
      align-items: start;
    }

    .footer-nav {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-nav a {
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
    }

    @media (max-width: 900px) {
      .topbar,
      .footer-inner {
        flex-direction: column;
        align-items: flex-start;
      }

      .hero-actions {
        flex-direction: column;
      }

      .footer-inner {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ExampleWebsiteComponent {}
