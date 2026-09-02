(() => {
  const COOKIE_NAME = "de.darkplugins.cookie.language";
  const supportedLanguages = new Set(["en", "de"]);

  const translations = {
    en: {
      meta: {
        homeTitle: "DarkPlugins · Portfolio",
        homeDescription: "DarkPlugins portfolio: software, plugins, and web projects.",
        projectsTitle: "All projects · DarkPlugins",
        projectsDescription: "All DarkPlugins projects grouped by topic."
      },
      nav: {
        main: "Main navigation",
        homeAria: "Go to home",
        openMenu: "Open menu",
        openProjectList: "Open project list",
        about: "About",
        projects: "Projects",
        allProjects: "All projects",
        contact: "Contact"
      },
      language: {
        label: "Language",
        english: "English",
        german: "German"
      },
      home: {
        galleryAria: "Portfolio gallery",
        role: "Software Engineer"
      },
      about: {
        sectionAria: "About me",
        label: "About me",
        heading: "Code with a clear purpose.",
        paragraph1: "I build, test, and publish personal software projects — from browser extensions and small web tools to Minecraft plugins and Raspberry Pi prototypes.",
        paragraph2: "On GitHub, these become useful tools such as CR-Toolkit and TTVNotifyMe, as well as experiments like the Game Radio Station. Every project is a chance to make an idea tangible and learn something new along the way.",
        paragraph3: "My focus is JavaScript, Node.js, Python, and Java — always with an eye for clear interfaces, working systems, and solutions that help in everyday use.",
        skills: "Skills",
        technologiesAria: "Technologies",
        workAria: "Work style",
        workLabel: "Work style",
        workHeading: "Plan calmly. Build clearly.",
        workText: "From browser extensions such as CR-Toolkit and Minecraft plugins to the Raspberry Pi prototype GRS-v1: I test ideas in practice, connect software with real hardware, and shape projects into useful tools step by step."
      },
      projects: {
        sectionAria: "Projects",
        label: "GitHub projects",
        heading: "Selected projects",
        view: "View project",
        grsAlt: "GamesRadioStation preview",
        ttvAlt: "TTVNotifyMe preview",
        allSectionAria: "All projects",
        discover: "Discover more",
        allHeading: "All projects",
        githubAlt: "GitHub projects",
        githubSmall: "Code & open source",
        spigotAlt: "SpigotMC projects",
        spigotSmall: "Minecraft plugins",
        allAlt: "View all projects",
        allSmall: "Complete overview"
      },
      contact: {
        label: "Contact",
        heading: "Let's write.",
        copyEmail: "Copy email address",
        linksAria: "Direct links",
        githubAria: "Open GitHub",
        spigotAria: "Open SpigotMC",
        emailAria: "Write an email",
        emailLabel: "Email",
        note: "For project requests, plugins, or a technical exchange, email is the fastest way to reach me."
      },
      archive: {
        label: "Archive",
        heading: "All projects",
        intro: "Projects from browser development, Minecraft plugins, and hardware prototypes. Not everything is visible on GitHub.",
        theme: "Theme",
        slideAria: "Projects {number}",
        projectImageAlt: "Placeholder image for {title}",
        viewProject: "View project",
        year: "Year",
        technologies: "Technologies",
        closeModal: "Close project",
        statusAria: "Project status",
        privateSource: "Source code private",
        download: "Download",
        spigotDownload: "Spigot download",
        sourceUnavailable: "Source code unavailable"
      },
      status: {
        finished: "Finished",
        active: "Active Development",
        notReleased: "Not released yet",
        prototype: "Prototype"
      },
      theme: {
        webExtensions: "Web & Extensions",
        minecraftPlugins: "Minecraft Plugins",
        prototypesHardware: "Prototypes & Hardware",
        toolsAnalysis: "Tools & Analysis"
      },
      notification: {
        copied: "Copied to clipboard"
      },
      preloader: {
        loading: "Loading page"
      }
    },
    de: {
      meta: {
        homeTitle: "DarkPlugins · Portfolio",
        homeDescription: "Portfolio von DarkPlugins: Software, Plugins und Web-Projekte.",
        projectsTitle: "Alle Projekte · DarkPlugins",
        projectsDescription: "Alle Projekte von DarkPlugins nach Themen sortiert."
      },
      nav: {
        main: "Hauptnavigation",
        homeAria: "Zur Startseite",
        openMenu: "Menü öffnen",
        openProjectList: "Projektliste öffnen",
        about: "Über mich",
        projects: "Projekte",
        allProjects: "Alle Projekte",
        contact: "Kontakt"
      },
      language: {
        label: "Sprache",
        english: "Englisch",
        german: "Deutsch"
      },
      home: {
        galleryAria: "Portfolio-Galerie",
        role: "Softwareentwickler"
      },
      about: {
        sectionAria: "Über mich",
        label: "Über mich",
        heading: "Code mit klarem Zweck.",
        paragraph1: "Ich baue, teste und veröffentliche persönliche Softwareprojekte – von Browser-Erweiterungen und kleinen Web-Tools bis zu Minecraft-Plugins und Raspberry-Pi-Prototypen.",
        paragraph2: "Auf GitHub entstehen daraus praktische Werkzeuge wie CR-Toolkit und TTVNotifyMe, aber auch Experimente wie die Game Radio Station. Jedes Projekt ist eine Gelegenheit, eine Idee greifbar zu machen und dabei etwas Neues zu lernen.",
        paragraph3: "Mein Schwerpunkt liegt auf JavaScript, Node.js, Python und Java – immer mit Blick auf klare Bedienung, funktionierende Systeme und Lösungen, die im Alltag wirklich helfen.",
        skills: "Skills",
        technologiesAria: "Technologien",
        workAria: "Arbeitsweise",
        workLabel: "Arbeitsweise",
        workHeading: "Ruhig planen. Klar umsetzen.",
        workText: "Von Browser-Erweiterungen wie CR-Toolkit über Minecraft-Plugins bis zum Raspberry-Pi-Prototypen GRS-v1: Ich probiere Ideen praktisch aus, verbinde Software mit echter Hardware und bringe Projekte Schritt für Schritt in eine nutzbare Form."
      },
      projects: {
        sectionAria: "Projekte",
        label: "GitHub-Projekte",
        heading: "Ausgewählte Projekte",
        view: "Projekt ansehen",
        grsAlt: "Vorschau von GamesRadioStation",
        ttvAlt: "Vorschau von TTVNotifyMe",
        allSectionAria: "Alle Projekte",
        discover: "Entdecke mehr",
        allHeading: "Alle Projekte",
        githubAlt: "GitHub-Projekte",
        githubSmall: "Code & Open Source",
        spigotAlt: "SpigotMC-Projekte",
        spigotSmall: "Minecraft-Plugins",
        allAlt: "Alle Projekte ansehen",
        allSmall: "Komplette Übersicht"
      },
      contact: {
        label: "Kontakt",
        heading: "Lass uns schreiben.",
        copyEmail: "E-Mail-Adresse kopieren",
        linksAria: "Direkte Links",
        githubAria: "GitHub öffnen",
        spigotAria: "SpigotMC öffnen",
        emailAria: "E-Mail schreiben",
        emailLabel: "E-Mail",
        note: "Für Projektanfragen, Plugins oder einen technischen Austausch erreichst du mich am schnellsten per E-Mail."
      },
      archive: {
        label: "Archiv",
        heading: "Alle Projekte",
        intro: "Projekte aus Browser-Entwicklung, Minecraft-Plugins und Hardware-Prototypen. Nicht alles ist auf GitHub einsehbar.",
        theme: "Thema",
        slideAria: "Projekte {number}",
        projectImageAlt: "Platzhalterbild für {title}",
        viewProject: "Projekt ansehen",
        year: "Jahr",
        technologies: "Technologien",
        closeModal: "Projekt schließen",
        statusAria: "Projektstatus",
        privateSource: "Quellcode privat",
        download: "Herunterladen",
        spigotDownload: "Spigot-Download",
        sourceUnavailable: "Quellcode nicht verfügbar"
      },
      status: {
        finished: "Fertiggestellt",
        active: "Aktive Entwicklung",
        notReleased: "Noch nicht veröffentlicht",
        prototype: "Prototyp"
      },
      theme: {
        webExtensions: "Web & Erweiterungen",
        minecraftPlugins: "Minecraft-Plugins",
        prototypesHardware: "Prototypen & Hardware",
        toolsAnalysis: "Tools & Analyse"
      },
      notification: {
        copied: "In die Zwischenablage kopiert"
      },
      preloader: {
        loading: "Seite wird geladen"
      },
      skill: {
        "Browser Extension": "Browser-Erweiterung",
        Notifications: "Benachrichtigungen",
        Media: "Medien",
        UI: "Oberfläche",
        "Tab Completer": "Tab-Vervollständigung",
        Security: "Sicherheit"
      },
      project: {
        ttvnotifyme: {
          description: "Eine Browser-Erweiterung, die benachrichtigt, sobald ein Streamer live geht.",
          details: "TTVNotifyMe behält Streams im Blick, ohne dass die Plattform dauerhaft geöffnet bleiben muss."
        },
        mediaDownloader: {
          description: "Eine Browser-Erweiterung zum Herunterladen von Bildern und Videos direkt aus dem Kontextmenü.",
          details: "Medien können im Originalformat oder in unterstützten konvertierten Formaten gespeichert werden."
        },
        crToolkit: {
          description: "Eine Crunchyroll-Browser-Erweiterung mit zusätzlichen Steuerelementen für ein angenehmeres Anime-Erlebnis.",
          details: "Enthalten sind ein anpassbarer Cinema-Modus, das Überspringen von Intros und Outros sowie Einstellungen für Kopfzeile und Oberfläche."
        },
        flipacoin: {
          description: "Eine kleine Website, die einen Münzwurf schnell und unkompliziert simuliert.",
          details: "Ein bewusst kompaktes Webprojekt, das eine einzelne Idee mit einer klaren Oberfläche umsetzt."
        },
        web: {
          description: "Die eigene Website als eigenständiges Webprojekt.",
          details: "Das Repository bündelt die Portfolio-Oberfläche und die dazugehörige Frontend-Umsetzung."
        },
        blacklist: {
          description: "Ein Minecraft-Plugin, das bestimmte Befehle wie /plugins oder /help für Spieler blockiert.",
          details: "Blacklist ist für deutschsprachige Server gedacht und konzentriert sich auf eine kleine, klar definierte Schutzfunktion."
        },
        relevantCommandsOnly: {
          description: "Ein Minecraft-Plugin, das im Tab-Completer nur Befehle aus den persönlichen Präferenzen anzeigt.",
          details: "Das Projekt befindet sich noch in Entwicklung und soll die Befehlsauswahl auf Servern übersichtlicher machen."
        },
        '2fa': {
          description: "Ein Minecraft-Plugin, das Server mit einer Zwei-Faktor-Authentifizierung zusätzlich absichert.",
          details: "Der Fokus liegt auf einer zusätzlichen Sicherheitsschicht für Spieler und Serverzugänge."
        },
        verifybot: {
          description: "Ein Minecraft-Plugin, mit dem sich Spieler beispielsweise mit ihren Rängen auf einem Discord- und/oder TeamSpeak-Server verifizieren lassen.",
          details: "VerifyBot befindet sich aktuell in Entwicklung. Der Quellcode ist nicht öffentlich verfügbar."
        },
        ads: {
          description: "Ein Minecraft-Plugin, mit dem Spieler sich selbst oder ihren Plot auf einem CityBuild-Server bewerben können – inklusive direktem Teleport.",
          details: "Ads ist fertiggestellt. Die Werbung kann im Chat, in der Actionbar oder über weitere konfigurierbare Anzeigeformen erscheinen."
        },
        grsV1: {
          description: "Ein Raspberry-Pi-Prototyp für eine spielbasierte Radio-Station mit Drehencoder, rundem LCD und Audioausgabe.",
          details: "Die Python-Anwendung verwaltet Spiele- und Songauswahl, speichert den Wiedergabestatus, steuert VLC und kann Audio über Bluetooth ausgeben. Das Projekt läuft unter Linux und integriert systemd für den Start beim Booten."
        },
        projectWebArcade: {
          description: "Eine kompakte Arcade mit Browser-Spielen, echten Joysticks und Tastern.",
          details: "Der Launcher verbindet Snake, Pong und Quiz mit einem Node.js-Backend, das Hardware-Eingaben über WebSockets an die Weboberfläche weitergibt."
        },
        energyAnalyzer10: {
          description: "Eine Desktop-Anwendung zur Analyse erneuerbarer Energiedaten aus der SMARD-API.",
          details: "EnergyAnalyzer 1.0 unterstützt auswählbare Zeiträume, Tabellen- und Liniendiagramme sowie die lokale Speicherung von JSON-Daten. Es handelt sich um ein privates Projekt."
        }
      }
    }
  };

  const getValue = (object, path) => path.split(".").reduce((value, key) => value?.[key], object);

  const translateSkill = (skill) => translations[currentLanguage].skill?.[skill] ?? translations.en.skill?.[skill] ?? skill;

  const interpolate = (value, variables = {}) => String(value).replace(/\{(\w+)\}/g, (_, key) => variables[key] ?? `{${key}}`);

  const normalizeLanguage = (language) => {
    const baseLanguage = String(language || "").toLowerCase().split(/[-_]/)[0];
    return supportedLanguages.has(baseLanguage) ? baseLanguage : "en";
  };

  const readCookie = () => {
    const prefix = `${COOKIE_NAME}=`;
    const cookie = document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(prefix));
    if (!cookie) return null;

    try {
      return decodeURIComponent(cookie.slice(prefix.length));
    } catch {
      return null;
    }
  };

  const browserLanguage = () => {
    return normalizeLanguage(navigator.language || navigator.languages?.[0] || "en");
  };

  let currentLanguage = normalizeLanguage(readCookie() || browserLanguage());

  const translate = (key, fallback = key, variables) => {
    const localized = getValue(translations[currentLanguage], key) ?? getValue(translations.en, key);
    return interpolate(localized ?? fallback, variables);
  };

  const setLanguage = (language, persist = true) => {
    currentLanguage = normalizeLanguage(language);
    if (persist) {
      document.cookie = `${COOKIE_NAME}=${encodeURIComponent(currentLanguage)}; max-age=31536000; path=/; SameSite=Lax`;
    }

    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      element.alt = translate(element.dataset.i18nAlt);
    });
    document.querySelectorAll("[data-i18n-content]").forEach((element) => {
      element.content = translate(element.dataset.i18nContent);
    });
    document.querySelectorAll("[data-language-select]").forEach((select) => {
      select.value = currentLanguage;
    });

    window.dispatchEvent(new CustomEvent("languagechange", { detail: { language: currentLanguage } }));
  };

  const projectKey = (slug) => ({
    "ttvnotifyme": "ttvnotifyme",
    "media-downloader": "mediaDownloader",
    "cr-toolkit": "crToolkit",
    "flipacoin": "flipacoin",
    "web": "web",
    "blacklist": "blacklist",
    "relevant-commands-only": "relevantCommandsOnly",
    "2fa": "2fa",
    "verifybot": "verifybot",
    "ads": "ads",
    "grs-v1": "grsV1",
    "project-web-arcade": "projectWebArcade",
    "energy-analyzer-1-0": "energyAnalyzer10"
  }[slug] ?? slug);

  const themeKey = (theme) => ({
    "Web & Extensions": "webExtensions",
    "Minecraft Plugins": "minecraftPlugins",
    "Prototypes & Hardware": "prototypesHardware",
    "Tools & Analysis": "toolsAnalysis"
  }[theme]);

  window.translations = {
    get language() {
      return currentLanguage;
    },
    t: translate,
    setLanguage,
    projectText: (project, field) => translate(`project.${projectKey(project.slug)}.${field}`, project[field]),
    projectSkills: (project) => project.skills.map(translateSkill),
    statusText: (key, fallback) => translate(`status.${key}`, fallback),
    themeText: (theme) => translate(`theme.${themeKey(theme)}`, theme)
  };

  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.addEventListener("change", () => setLanguage(select.value));
  });

  setLanguage(currentLanguage, false);
})();
