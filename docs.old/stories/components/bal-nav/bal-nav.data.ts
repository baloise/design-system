export const logoLinkItem = {
  href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
  ariaLabel: 'Homepage',
  htmlTitle: 'Homepage',
}

export const buttonLinkItems = [
  {
    icon: 'call',
    popupId: 'popup-call',
    touchPlacement: 'bottom',
    ariaLabel: '24h Kundenservice',
    htmlTitle: '24h Kundenservice',
  },
  {
    label: 'DE',
    popupId: 'popup-locale',
    touchPlacement: 'bottom',
    ariaLabel: 'Sprache wählen',
    htmlTitle: 'Sprache wählen',
  },
  {
    icon: 'location',
    htmlTitle: 'Berater und Standorte',
    ariaLabel: 'Berater und Standorte',
    href: 'https://www.baloise.ch/de/privatkunden/kontakt-services/berater-standorte.html',
    target: '_blank',
    touchPlacement: 'none',
  },
  {
    icon: 'search',
    popupId: 'popup-search',
    ariaLabel: 'Suchen',
    htmlTitle: 'Suchen',
  },
  {
    label: 'Anmelden',
    icon: 'account',
    popupId: 'popup-login',
    ariaLabel: 'Anmelden',
    htmlTitle: 'Anmelden',
  },
]

const serviceLinkItem = {
  value: 'Services',
  label: 'Services',
  linkItems: [
    {
      label: 'Service link 1',
    },
    {
      label: 'Service link 2',
    },
    {
      label: 'Service link 3',
    },
  ],
}

const sectionLinkItem = {
  value: 'Section Title',
  label: 'Section Title',
  linkItems: [
    {
      label: 'Section link 1',
    },
    {
      label: 'Section link 2',
    },
    {
      label: 'Section link 3',
    },
    {
      label: 'Section link 4',
    },
  ],
}

const mainLinkItem = label => ({
  value: label,
  label: label,
  sectionLinkItems: [sectionLinkItem, sectionLinkItem, sectionLinkItem],
  serviceLinkItems: [serviceLinkItem],
})

export const optionLinkItems = [
  {
    value: 'privatkunden',
    label: 'Privatkunden',
    active: true,
    mainLinkItems: [
      {
        value: 'Versichern',
        label: 'Versichern',
        active: true,
        sectionLinkItems: [
          {
            value: 'Wohnen & Recht',
            label: 'Wohnen & Recht',
            href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
            active: true,
            linkItems: [
              {
                value: 'Hausratversicherung',
                label: 'Hausratversicherung',
                clickable: true,
                active: true,
              },
              {
                value: 'Haushaltversicherung für alle unter 30',
                label: 'Haushaltversicherung für alle unter 30',
                href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
              },
              {
                value: 'Haftpflichtversicherung',
                label: 'Haftpflichtversicherung',
                href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
              },
              {
                value: 'Rechtsschutzversicherung',
                label: 'Rechtsschutzversicherung',
                href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
              },
              {
                value: 'Cyber-Versicherung',
                label: 'Cyber-Versicherung',
                href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
              },
              {
                value: 'Wertsachen- & Elektronikversicherungen',
                label: 'Wertsachen- & Elektronikversicherungen',
                href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
              },
            ],
          },
          {
            value: 'Fahrzeuge',
            label: 'Fahrzeuge',
            linkItems: [
              {
                value: 'Autoversicherung',
                label: 'Autoversicherung',
                href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
              },
              {
                value: 'Elektroauto-Versicherung',
                label: 'Elektroauto-Versicherung',
                href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
              },
              {
                value: 'Motorrad- & Rollerversicherung',
                label: 'Motorrad- & Rollerversicherung',
              },
              {
                value: 'Motorrad- & Rollerversicherung für alle unter 30',
                label: 'Motorrad- & Rollerversicherung für alle unter 30',
              },
              {
                value: 'Veloversicherung',
                label: 'Veloversicherung',
              },
              {
                value: 'Bootsversicherung',
                label: 'Bootsversicherung',
              },
            ],
          },
          {
            value: 'Personen',
            label: 'Personen',
            linkItems: [
              {
                value: 'Lebensversicherungen',
                label: 'Lebensversicherungen',
              },
              {
                value: 'Einzel-Unfallversicherung',
                label: 'Einzel-Unfallversicherung',
              },
              {
                value: 'Todesfallrisikoversicherung',
                label: 'Todesfallrisikoversicherung',
              },
              {
                value: 'Einzel-Krankentaggeldversicherung',
                label: 'Einzel-Krankentaggeldversicherung',
              },
              {
                value: 'Erwerbsunfähigkeitsversicherung',
                label: 'Erwerbsunfähigkeitsversicherung',
              },
              {
                value: 'Hausangestellten-Versicherung',
                label: 'Hausangestellten-Versicherung',
              },
            ],
          },
          {
            value: 'Ferien & Reisen',
            label: 'Ferien & Reisen',
            linkItems: [
              {
                value: 'Reiseversicherung (für das ganze Jahr)',
                label: 'Reiseversicherung (für das ganze Jahr)',
              },
              {
                value: 'Ferienversicherung (2 bis 92 Tage)',
                label: 'Ferienversicherung (2 bis 92 Tage)',
              },
              {
                value: 'Reisegepäckversicherung',
                label: 'Reisegepäckversicherung',
              },
              {
                value: 'Annullierungskosten',
                label: 'Annullierungskosten',
              },
              {
                value: 'Mietfahrzeug-Versicherung',
                label: 'Mietfahrzeug-Versicherung',
              },
            ],
          },
          {
            value: 'Wohneneigentum',
            label: 'Wohneneigentum',
            linkItems: [
              {
                value: 'Bauversicherung',
                label: 'Bauversicherung',
              },
              {
                value: 'Gebäudeversicherung',
                label: 'Gebäudeversicherung',
              },
            ],
          },
        ],
        serviceLinkItems: [
          {
            value: 'Services',
            label: 'Services',
            linkItems: [
              {
                value: 'Schaden melden',
                label: 'Schaden melden',
              },
              {
                value: 'Pannenhilfe',
                label: 'Pannenhilfe',
              },
              {
                value: 'Partnerbetriebe',
                label: 'Partnerbetriebe',
              },
              {
                value: 'Versicherungsnachweis',
                label: 'Versicherungsnachweis',
              },
              {
                value: 'Internationale Versicherungskarte',
                label: 'Internationale Versicherungskarte',
              },
              {
                value: 'Wiederinkraftsetzung',
                label: 'Wiederinkraftsetzung',
                href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
              },
            ],
          },
        ],
        overviewLink: {
          value: 'Alle Versicherungslösungen',
          label: 'Alle Versicherungslösungen',
          href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
        },
      },
      {
        value: 'Anlegen & Vorsorg',
        label: 'Anlegen & Vorsorg',
        sectionLinkItems: [
          {
            value: 'Anlegen',
            label: 'Anlegen',
            linkItems: [
              {
                value: 'Zielbasiertes Anlegen',
                label: 'Zielbasiertes Anlegen',
              },
              {
                value: 'Fondskonto',
                label: 'Fondskonto',
              },
              {
                value: 'Anlagefonds',
                label: 'Anlagefonds',
              },
              {
                value: 'Anlegen mit Berater',
                label: 'Anlegen mit Berater',
              },
              {
                value: 'Anlegen ohne Berater',
                label: 'Anlegen ohne Berater',
              },
              {
                value: 'Vermögensverwaltung',
                label: 'Vermögensverwaltung',
              },
              {
                value: 'Kassenobligationen',
                label: 'Kassenobligationen',
              },
              {
                value: 'Festgeld',
                label: 'Festgeld',
              },
            ],
          },
          {
            value: 'Altersvorsorge',
            label: 'Altersvorsorge',
            linkItems: [
              {
                value: 'Pensionsplanung',
                label: 'Pensionsplanung',
              },
              {
                value: 'Vorsorgelösungen',
                label: 'Vorsorgelösungen',
              },
              {
                value: 'Renten- und Auszahlungspläne',
                label: 'Renten- und Auszahlungspläne',
              },
              {
                value: 'Invest Sparen 3 - Säule 3a',
                label: 'Invest Sparen 3 - Säule 3a',
              },
              {
                value: 'Freizügigkeitskonto',
                label: 'Freizügigkeitskonto',
              },
              {
                value: 'Lebensversicherungen',
                label: 'Lebensversicherungen',
              },
              {
                value: 'Finanzplanung',
                label: 'Finanzplanung',
              },
            ],
          },
          {
            value: 'Finanzwissen',
            label: 'Finanzwissen',
            linkItems: [
              {
                value: 'Persönliche Anlagestrategie',
                label: 'Persönliche Anlagestrategie',
              },
              {
                value: '5 Tipps für eine erfolgreiche Vorsorge',
                label: '5 Tipps für eine erfolgreiche Vorsorge',
              },
              {
                value: 'Fondswissen',
                label: 'Fondswissen',
              },
              {
                value: 'Warum Anlagefonds?',
                label: 'Warum Anlagefonds?',
              },
              {
                value: 'Zeitpunkt der Vorsorge',
                label: 'Zeitpunkt der Vorsorge',
              },
              {
                value: 'Das Schweizer Vorsorgesystem einfach erklärt',
                label: 'Das Schweizer Vorsorgesystem einfach erklärt',
              },
            ],
          },
          {
            value: 'Ihre Ziele',
            label: 'Ihre Ziele',
            linkItems: [
              {
                value: 'Pensionierung planen',
                label: 'Pensionierung planen',
              },
              {
                value: 'Als Frau vorsorgen',
                label: 'Als Frau vorsorgen',
              },
              {
                value: 'Vermögen aufbauen, Lebenstraum erfüllen',
                label: 'Vermögen aufbauen, Lebenstraum erfüllen',
              },
              {
                value: 'Familie richtig absichern',
                label: 'Familie richtig absichern',
              },
              {
                value: 'Risiken absichern, Familie schützen',
                label: 'Risiken absichern, Familie schützen',
              },
              {
                value: 'Nachlass frühzeitig regeln',
                label: 'Nachlass frühzeitig regeln',
              },
            ],
          },
          {
            value: 'Nachhaltig investieren',
            label: 'Nachhaltig investieren',
            linkItems: [
              {
                value: 'Allgemeine Informationen',
                label: 'Allgemeine Informationen',
              },
            ],
          },
        ],
        serviceLinkItems: [
          {
            value: 'Services',
            label: 'Services',
            linkItems: [
              {
                value: 'Vorsorgeausweis',
                label: 'Vorsorgeausweis',
              },
              {
                value: 'Aktuelle Kurse',
                label: 'Aktuelle Kurse',
              },
              {
                value: 'Börse & Anlageempfehlungen',
                label: 'Börse & Anlageempfehlungen',
              },
              {
                value: 'Bankkonditionen',
                label: 'Bankkonditionen',
              },
              {
                value: 'Downloads',
                label: 'Downloads',
              },
            ],
          },
          {
            value: 'Finance4Women',
            label: 'Finance4Women',
            color: 'purple',
            linkItems: [
              {
                value: 'Was macht eine gute Pensionskasse aus?',
                label: 'Was macht eine gute Pensionskasse aus?',
              },
              {
                value: 'Impact-Investing: Geldanlage mit Sinn',
                label: 'Impact-Investing: Geldanlage mit Sinn',
              },
              {
                value: 'Inflation - Was ist das?',
                label: 'Inflation - Was ist das?',
              },
              {
                value: 'Lohnverhandlungen erfolgreich führen. Tipps und Checkliste',
                label: 'Lohnverhandlungen erfolgreich führen. Tipps und Checkliste',
              },
            ],
          },
        ],
      },
      {
        value: 'Konten, Karten & Finanzierung',
        label: 'Konten, Karten & Finanzierung',
      },
      {
        value: 'Kontakt & Services',
        label: 'Kontakt & Services',
        href: 'https://www.baloise.ch/de/privatkunden/kontakt-services/berater-standorte.html',
        target: '_blank',
      },
      {
        value: 'Blog',
        label: 'Blog',
        href: 'https://www.baloise.ch/de/privatkunden/kontakt-services/berater-standorte.html',
        target: '_blank',
      },
    ],
    overviewLink: {
      value: 'Privatkunden',
      label: 'Privatkunden',
      href: 'http://localhost:3334/components/bal-nav/test/bal-nav.visual.html',
    },
  },
  {
    value: 'unternehmenskunden',
    label: 'Unternehmenskunden',
    active: false,
    mainLinkItems: [
      mainLinkItem('Versichern'),
      mainLinkItem('Firma gründen'),
      mainLinkItem('Konten, Karten & Finanzierung'),
      mainLinkItem('Anlegen'),
      mainLinkItem('Kontakt & Services'),
      mainLinkItem('Blog'),
    ],
  },
  {
    value: 'institutionelle-anleger',
    label: 'Institutionelle Anleger',
    mainLinkItems: [
      mainLinkItem('Anlegen'),
      mainLinkItem('Diestleistungsangebog'),
      mainLinkItem('Kontakt & Services'),
      mainLinkItem('Blog'),
    ],
  },
  {
    value: 'ueber-uns',
    label: 'Über uns',
    mainLinkItems: [
      mainLinkItem('Engagement'),
      mainLinkItem('Organisation'),
      mainLinkItem('Geschichte'),
      mainLinkItem('Jobs'),
      mainLinkItem('Immobilien'),
      mainLinkItem('Medienmitteilungen'),
      mainLinkItem('Kontakt & Services'),
      mainLinkItem('Blog'),
    ],
  },
]
