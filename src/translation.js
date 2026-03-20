export const translations = {
  en: {
    nav: {
      features: 'Features',
      about: 'About',
      docs: 'Docs',
      github: 'Github',
      login: 'Log in',
      signup: 'Sign up',
      chat: 'Chat'
    },
    hero: {
      title: 'The SLM built <br /> for your Privacy',
      subtitle: 'A high-performance, privacy-first Small Language Model designed to handle your daily tasks with absolute precision and speed.',
      ctaPrimary: 'Start Chatting',
      ctaSecondary: 'View Docs'
    },
    features: {
      title: 'What makes ILU.slm special?',
      subtitle: 'Everything you need to build great products on the web.',
      releaseNotes: 'The power of full-stack AI to the frontend. Read the release notes.',
      cards: {
        optimizations: {
          title: 'Built-in Optimizations',
          description: 'Automatic model quantization, caching, and token optimization for improved UX and lower costs.'
        },
        streaming: {
          title: 'Dynamic Token Streaming',
          description: 'Instantly stream model outputs from the server, integrated with Python generators and WebSockets.'
        },
        python: {
          title: 'Python Server Components',
          description: 'Add AI logic without sending additional client-side code. Built on the latest Python async features.'
        },
        actions: {
          title: 'Server Actions',
          description: 'Run server code by calling a function. Skip the API. Then, easily revalidate cached data.'
        },
        handlers: {
          title: 'Route Handlers',
          description: 'Build API endpoints to securely connect with third-party services for handling auth or webhooks.'
        },
        routing: {
          title: 'Advanced Routing',
          description: 'Create routes using the file system, including support for more advanced routing patterns.'
        },
        middleware: {
          title: 'Middleware',
          description: 'Take control of the incoming request. Use code to define routing and access rules for auth.'
        }
      }
    },
    about: {
      title: 'Built by <br /> privacy <br /> maximalists.',
      description: 'At ILU, we believe that intelligence shouldn\'t come at the cost of your digital sovereignty. Our mission is to democratize high-performance AI while keeping your data exactly where it belongs: with you.',
      stats: {
        devs: 'Join 5,000+ developers',
        mission: 'building the future of private AI.'
      }
    },
    footer: {
      quicklinks: 'Quicklinks',
      ilu: 'ILU.ai',
      follow: 'Follow us',
      other: 'Other ILU Sites',
      copyright: '© 2026 ILU SLM. All rights reserved.',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      language: 'Language'
    },
    login: {
      welcome: 'Welcome back to the future.',
      subtitle: 'Log in to your console to manage your Small Language Models and deploy AI applications at scale.',
      backHome: 'Back to home',
      title: 'Login',
      desc: 'Enter your credentials to access your console.',
      email: 'Email Address',
      password: 'Password',
      forgot: 'Forgot password?',
      submit: 'Login',
      or: 'Or continue with',
      noAccount: "Don't have an account?",
      signup: 'Sign up for free',
      features: {
        management: {
          title: 'Model Management',
          desc: 'Monitor and optimize your local SLMs with ease.'
        },
        insights: {
          title: 'Real-time Insights',
          desc: 'Track token usage and performance metrics instantly.'
        }
      }
    },
    signup: {
      welcome: 'Explore the future of AI Applications.',
      subtitle: 'Experience the next generation of privacy-first, high-performance Small Language Models built for modern developers.',
      backHome: 'Back to home',
      title: 'Create your account',
      desc: 'Get started with ILU SLM today.',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      password: 'Password',
      passwordHint: 'Must be at least 8 characters long.',
      terms: 'By creating an account, you agree to our Terms of Service and Privacy Policy.',
      submit: 'Create Account',
      hasAccount: 'Already have an account?',
      login: 'Login',
      features: {
        speed: {
          title: 'Lightning Fast',
          desc: 'Optimized for sub-millisecond latency and peak efficiency.'
        },
        secure: {
          title: 'Secure by Design',
          desc: 'Your data never leaves your infrastructure, guaranteed.'
        }
      }
    },
    docs: {
      title: 'Documentation',
      subtitle: 'Everything you need to know about ILU SLM.',
      searchPlaceholder: 'Search documentation...',
      previous: 'Previous',
      next: 'Next',
      sections: [
        {
          title: 'Getting Started',
          items: [
            { id: 'introduction', label: 'Introduction' },
            { id: 'quickstart', label: 'Quickstart Guide' },
            { id: 'installation', label: 'Installation' },
            { id: 'basic-usage', label: 'Basic Usage' }
          ]
        },
        {
          title: 'Core Concepts',
          items: [
            { id: 'slm-basics', label: 'SLM Basics' },
            { id: 'privacy-first', label: 'Privacy First' },
            { id: 'local-execution', label: 'Local Execution' },
            { id: 'token-optimization', label: 'Token Optimization' }
          ]
        },
        {
          title: 'API Reference',
          items: [
            { id: 'authentication', label: 'Authentication' },
            { id: 'endpoints', label: 'Endpoints' },
            { id: 'rate-limits', label: 'Rate Limits' },
            { id: 'error-codes', label: 'Error Codes' }
          ]
        }
      ],
      content: {
        introduction: {
          title: 'Introduction',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        quickstart: {
          title: 'Quickstart Guide',
          body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
        },
        installation: {
          title: 'Installation',
          body: '```bash\nnpm install @ilu/slm-sdk\n```\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
        },
        'basic-usage': {
          title: 'Basic Usage',
          body: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.'
        },
        'slm-basics': {
          title: 'SLM Basics',
          body: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
        },
        'privacy-first': {
          title: 'Privacy First',
          body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
        },
        'local-execution': {
          title: 'Local Execution',
          body: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        },
        'token-optimization': {
          title: 'Token Optimization',
          body: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?'
        },
        authentication: {
          title: 'Authentication',
          body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
        },
        endpoints: {
          title: 'Endpoints',
          body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
        },
        'rate-limits': {
          title: 'Rate Limits',
          body: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'
        },
        'error-codes': {
          title: 'Error Codes',
          body: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
        }
      }
    }
  },
  de: {
    nav: {
      features: 'Funktionen',
      about: 'Über uns',
      docs: 'Dokumentation',
      github: 'Github',
      login: 'Anmelden',
      signup: 'Registrieren',
      chat: 'Chat'
    },
    hero: {
      title: 'Das SLM gebaut <br /> für Ihre Privatsphäre',
      subtitle: 'Ein leistungsstarkes, datenschutzorientiertes Small Language Model, das Ihre täglichen Aufgaben mit absoluter Präzision und Geschwindigkeit erledigt.',
      ctaPrimary: 'Chat starten',
      ctaSecondary: 'Dokumentation'
    },
    features: {
      title: 'Was macht ILU.slm besonders?',
      subtitle: 'Alles, was Sie brauchen, um großartige Produkte im Web zu entwickeln.',
      releaseNotes: 'Die Power von Full-Stack AI für das Frontend. Lesen Sie die Release-Notes.',
      cards: {
        optimizations: {
          title: 'Integrierte Optimierungen',
          description: 'Automatische Modell-Quantisierung, Caching und Token-Optimierung für verbesserte UX und geringere Kosten.'
        },
        streaming: {
          title: 'Dynamisches Token-Streaming',
          description: 'Sofortiges Streamen von Modell-Outputs vom Server, integriert mit Python-Generatoren und WebSockets.'
        },
        python: {
          title: 'Python Server Komponenten',
          description: 'KI-Logik hinzufügen, ohne zusätzlichen clientseitigen Code zu senden. Basierend auf den neuesten Python-Async-Features.'
        },
        actions: {
          title: 'Server Actions',
          description: 'Server-Code durch Aufruf einer Funktion ausführen. Überspringen Sie die API. Dann einfach gecachte Daten revalidieren.'
        },
        handlers: {
          title: 'Route Handler',
          description: 'API-Endpunkte erstellen, um sicher eine Verbindung zu Drittanbieter-Diensten für Auth oder Webhooks herzustellen.'
        },
        routing: {
          title: 'Erweitertes Routing',
          description: 'Routen über das Dateisystem erstellen, einschließlich Unterstützung für fortgeschrittene Routing-Muster.'
        },
        middleware: {
          title: 'Middleware',
          description: 'Kontrolle über die eingehende Anfrage übernehmen. Code verwenden, um Routing- und Zugriffsregeln für Auth zu definieren.'
        }
      }
    },
    about: {
      title: 'Gebaut von <br /> Datenschutz- <br /> Maximalisten.',
      description: 'Bei ILU glauben wir, dass Intelligenz nicht auf Kosten Ihrer digitalen Souveränität gehen sollte. Unsere Mission ist es, Hochleistungs-KI zu demokratisieren und Ihre Daten genau dort zu lassen, wo sie hingehören: bei Ihnen.',
      stats: {
        devs: 'Schließen Sie sich 5.000+ Entwicklern an',
        mission: 'die die Zukunft der privaten KI aufbauen.'
      }
    },
    footer: {
      quicklinks: 'Quicklinks',
      ilu: 'ILU.ai',
      follow: 'Folgen Sie uns',
      other: 'Andere ILU-Seiten',
      copyright: '© 2026 ILU SLM. Alle Rechte vorbehalten.',
      terms: 'Nutzungsbedingungen',
      privacy: 'Datenschutzbestimmungen',
      language: 'Sprache'
    },
    login: {
      welcome: 'Willkommen zurück in der Zukunft.',
      subtitle: 'Melden Sie sich an, um Ihre Small Language Models zu verwalten und KI-Anwendungen skalierbar bereitzustellen.',
      backHome: 'Zurück zur Startseite',
      title: 'Anmelden',
      desc: 'Geben Sie Ihre Zugangsdaten ein, um auf Ihre Konsole zuzugreifen.',
      email: 'E-Mail-Adresse',
      password: 'Passwort',
      forgot: 'Passwort vergessen?',
      submit: 'Anmelden',
      or: 'Oder fortfahren mit',
      noAccount: 'Noch kein Konto?',
      signup: 'Kostenlos registrieren',
      features: {
        management: {
          title: 'Modell-Management',
          desc: 'Überwachen und optimieren Sie Ihre lokalen SLMs mit Leichtigkeit.'
        },
        insights: {
          title: 'Echtzeit-Einblicke',
          desc: 'Verfolgen Sie Token-Nutzung und Performance-Metriken sofort.'
        }
      }
    },
    signup: {
      welcome: 'Entdecken Sie die Zukunft der KI-Anwendungen.',
      subtitle: 'Erleben Sie die nächste Generation von datenschutzorientierten, leistungsstarken Small Language Models für moderne Entwickler.',
      backHome: 'Zurück zur Startseite',
      title: 'Konto erstellen',
      desc: 'Starten Sie noch heute mit ILU SLM.',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      password: 'Passwort',
      passwordHint: 'Muss mindestens 8 Zeichen lang sein.',
      terms: 'Mit der Erstellung eines Kontos erklären Sie sich mit unseren Nutzungsbedingungen und Datenschutzbestimmungen einverstanden.',
      submit: 'Konto erstellen',
      hasAccount: 'Haben Sie bereits ein Konto?',
      login: 'Anmelden',
      features: {
        speed: {
          title: 'Blitzschnell',
          desc: 'Optimiert für Latenzen im Sub-Millisekundenbereich und maximale Effizienz.'
        },
        secure: {
          title: 'Sicher durch Design',
          desc: 'Ihre Daten verlassen niemals Ihre Infrastruktur, garantiert.'
        }
      }
    },
    docs: {
      title: 'Dokumentation',
      subtitle: 'Alles, was Sie über ILU SLM wissen müssen.',
      searchPlaceholder: 'Dokumentation durchsuchen...',
      previous: 'Zurück',
      next: 'Weiter',
      sections: [
        {
          title: 'Erste Schritte',
          items: [
            { id: 'introduction', label: 'Einführung' },
            { id: 'quickstart', label: 'Schnellstart-Anleitung' },
            { id: 'installation', label: 'Installation' },
            { id: 'basic-usage', label: 'Grundlegende Nutzung' }
          ]
        },
        {
          title: 'Kernkonzepte',
          items: [
            { id: 'slm-basics', label: 'SLM Grundlagen' },
            { id: 'privacy-first', label: 'Datenschutz zuerst' },
            { id: 'local-execution', label: 'Lokale Ausführung' },
            { id: 'token-optimization', label: 'Token-Optimierung' }
          ]
        },
        {
          title: 'API-Referenz',
          items: [
            { id: 'authentication', label: 'Authentifizierung' },
            { id: 'endpoints', label: 'Endpunkte' },
            { id: 'rate-limits', label: 'Rate-Limits' },
            { id: 'error-codes', label: 'Fehlercodes' }
          ]
        }
      ],
      content: {
        introduction: {
          title: 'Einführung',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        quickstart: {
          title: 'Schnellstart-Anleitung',
          body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
        },
        installation: {
          title: 'Installation',
          body: '```bash\nnpm install @ilu/slm-sdk\n```\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
        },
        'basic-usage': {
          title: 'Grundlegende Nutzung',
          body: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.'
        },
        'slm-basics': {
          title: 'SLM Grundlagen',
          body: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
        },
        'privacy-first': {
          title: 'Datenschutz zuerst',
          body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
        },
        'local-execution': {
          title: 'Lokale Ausführung',
          body: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        },
        'token-optimization': {
          title: 'Token-Optimierung',
          body: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?'
        },
        authentication: {
          title: 'Authentifizierung',
          body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
        },
        endpoints: {
          title: 'Endpunkte',
          body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
        },
        'rate-limits': {
          title: 'Rate-Limits',
          body: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'
        },
        'error-codes': {
          title: 'Fehlercodes',
          body: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
        }
      }
    }
  }
};
