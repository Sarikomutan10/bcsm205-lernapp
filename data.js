/* Geprüfter Fragenkatalog BCSM 205 · SoSe 2026 */
const BCSM205_DATA = {
  exam: {
    date: "26.09.2026",
    durationMinutes: 120,
    officialPoints: 120,
    passPoints: 61,
    note: "Der rekonstruierte Übungskatalog enthält 122 Trainingspunkte. Laut offizieller Skriptfolie hat die echte Klausur 120 Punkte; zum Bestehen werden 61 Punkte benötigt."
  },
  categories: [
    { id: "grundlagen", range: "1–7", title: "Grundlagen", subtitle: "Projektbegriff, Standards, magisches Dreieck" },
    { id: "initiierung", range: "8–12", title: "Initiierung & Ziele", subtitle: "Machbarkeit, Projektauftrag, Phasen" },
    { id: "struktur", range: "13–19", title: "Struktur & Organisation", subtitle: "Qualität, PSP, Arbeitspakete, Kommunikation" },
    { id: "planung", range: "20–26", title: "Zeit, Ressourcen & Kosten", subtitle: "Dauer, Netzplan, Histogramm, Schätzung" },
    { id: "umfeld", range: "27–33", title: "Umfeld & Risiken", subtitle: "Stakeholder, Reserven, Verträge" },
    { id: "controlling", range: "34–38", title: "Controlling", subtitle: "EVM, Regelkreis, Steuerung, Ampel" },
    { id: "abschluss", range: "39–46", title: "Abschluss & Agilität", subtitle: "Abnahme, Scrum, User Story, Selbstmanagement" }
  ],
  questions: [
    {
      id: 1, category: "grundlagen", type: "multiple", points: 2, source: "Folien 14–16",
      prompt: "Welche Aussagen gehören zur Projektdefinition?",
      instruction: "Wähle genau drei Aussagen.",
      options: [
        ["Das Vorhaben ist zielgerichtet.", true],
        ["Das Vorhaben ist zeitlich und hinsichtlich seiner Ressourcen begrenzt.", true],
        ["Es wird in einer Projektorganisation durchgeführt, um ein einmaliges Ergebnis zu realisieren.", true],
        ["Das Ergebnis wird regelmäßig in identischer Form wiederholt.", false],
        ["Das Vorhaben besitzt weder Endtermin noch Ressourcenbegrenzung.", false]
      ],
      explanation: "Ein Projekt ist zielgerichtet, zeitlich und ressourcenmäßig begrenzt, organisatorisch eigenständig und auf ein einmaliges Ergebnis ausgerichtet."
    },
    {
      id: 2, category: "grundlagen", type: "multiple", points: 2, source: "Folie 17",
      prompt: "Welche drei Arbeitsformen werden unterschieden?",
      instruction: "Wähle genau drei Begriffe.",
      options: [["Routine",true],["Prozess",true],["Projekt",true],["Improvisation",false],["Abteilung",false]],
      explanation: "Routine ist wiederkehrende Standardarbeit. Ein Prozess ist ein wiederholbarer geregelter Ablauf. Ein Projekt ist einmalig, komplex und zeitlich begrenzt."
    },
    {
      id: 3, category: "grundlagen", type: "multiple", points: 2, source: "Folien 39–41",
      prompt: "Welche drei Größen bilden das magische Dreieck?",
      instruction: "Wähle genau drei Größen.",
      options: [["Leistungsumfang",true],["Zeit",true],["Ressourcen/Kosten",true],["Initiierung",false],["Durchführung",false]],
      explanation: "Leistungsumfang, Zeit und Ressourcen beziehungsweise Kosten beeinflussen sich gegenseitig. Initiierung und Durchführung sind Projektmanagementphasen."
    },
    {
      id: 4, category: "grundlagen", type: "multiple", points: 2, source: "Folien 33–36",
      prompt: "Warum wird Projektmanagement standardisiert?",
      instruction: "Eine Aussage ist falsch. Wähle die drei richtigen Aussagen.",
      options: [
        ["Standardisierung erlaubt die Besetzung von Projektrollen durch Personen ohne Projektmanagementkenntnisse.",false],
        ["Sie stellt Vergleichbarkeit zwischen Projekten her.",true],
        ["Sie erleichtert die Kommunikation innerhalb und außerhalb von Projekten.",true],
        ["Sie unterstützt Wissensaustausch und Professionalisierung.",true]
      ],
      explanation: "Standards schaffen Vergleichbarkeit, eine gemeinsame Sprache, Effizienz und Wissenstransfer. Sie ersetzen keine fachliche Qualifikation. IPMA, PMI und PRINCE2 sind Beispiele für standardisierte Ansätze."
    },
    {
      id: 5, category: "grundlagen", type: "single", points: 1, source: "Folien 62–63",
      prompt: "Bei der Pizzeria wird geprüft, ob am geplanten Standort eine Gaststättenkonzession erteilt werden kann. Welchem PM-Element ist dies zuzuordnen?",
      options: [["Sachliches Umfeld",true],["Stakeholder",false],["Qualität",false],["Zeit",false]],
      explanation: "Die Konzession ist eine externe rechtliche Gegebenheit, die das Projekt beeinflussen kann. Sie gehört deshalb zum sachlichen Umfeld."
    },
    {
      id: 6, category: "grundlagen", type: "matching", points: 2, source: "Folien 42–45",
      prompt: "Ordne den vier Projektmanagementphasen die passende Kernaufgabe zu.",
      pairs: [
        ["Initiierung","Vorhaben bewerten, grob planen und Projektauftrag vorbereiten"],
        ["Planung","Ganzheitlichen und detaillierten Projektplan erstellen"],
        ["Durchführung","Projekt kontrollieren, steuern und berichten"],
        ["Abschluss","Lieferobjekt abnehmen, dokumentieren und Wissen sichern"]
      ],
      explanation: "In der Initiierung wird nur grob geplant. Die vollständige Detailplanung gehört in die PM-Phase Planung."
    },
    {
      id: 7, category: "grundlagen", type: "open", points: 6, source: "Folien 39–40",
      prompt: "Beschrifte das magische Dreieck und erläutere an einem Pizzeria-Beispiel die Auswirkung einer Änderung.",
      instruction: "Zeichne zuerst auf dein Blatt. Vergleiche danach mit der Musterlösung.",
      criteria: ["Leistungsumfang genannt", "Zeit genannt", "Ressourcen/Kosten genannt", "Eine Größe bleibt ausdrücklich konstant", "Auswirkung auf mindestens eine andere Größe erklärt"],
      explanation: "Beispiel: Der Eröffnungstermin bleibt fest, aber der Leistungsumfang wird um einen Lieferservice erweitert. Dann müssen Ressourcen und Kosten steigen, etwa für Fahrer und Software. Bleiben auch die Kosten fest, muss der Umfang reduziert oder der Termin verschoben werden.",
      solutionHtml: `<div class="solution-visual"><svg class="mini-chart" viewBox="0 0 620 265" role="img" aria-label="Magisches Dreieck aus Leistungsumfang, Zeit und Ressourcen oder Kosten"><path d="M310 30 90 225h440Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><circle cx="310" cy="30" r="11" fill="#df7c4b"/><circle cx="90" cy="225" r="11" fill="#df7c4b"/><circle cx="530" cy="225" r="11" fill="#df7c4b"/><text x="310" y="18" text-anchor="middle" fill="currentColor" font-weight="700">LEISTUNGSUMFANG</text><text x="58" y="252" fill="currentColor" font-weight="700">ZEIT</text><text x="410" y="252" fill="currentColor" font-weight="700">RESSOURCEN / KOSTEN</text><text x="310" y="150" text-anchor="middle" fill="currentColor">Qualität / Ziel</text></svg></div>`
    },
    {
      id: 8, category: "initiierung", type: "multiple", points: 2, source: "Folien 53 und 57",
      prompt: "Welche Aussagen zur Projektinitiierung sind richtig?",
      instruction: "Wähle genau drei Aussagen.",
      options: [
        ["Technische und sachliche Machbarkeit werden geprüft.",true],
        ["Projektwürdigkeit und Wirtschaftlichkeit werden bewertet.",true],
        ["Die PM-Elemente werden grob geplant und ein Projektauftrag wird vorbereitet.",true],
        ["Der gesamte Projektplan wird bereits abschließend detailliert erstellt.",false]
      ],
      explanation: "In der Initiierung wird entschieden, ob das Vorhaben sinnvoll und machbar ist. Die detaillierte Planung folgt erst in der PM-Phase Planung."
    },
    {
      id: 9, category: "initiierung", type: "multiple", points: 2, source: "Folie 55",
      prompt: "Welche Instanzen können ein Projekt auslösen?",
      instruction: "Wähle genau drei Auslöser.",
      options: [
        ["Ein externer Kunde über eine Anfrage oder einen Auftrag",true],
        ["Die Geschäftsleitung über einen internen Projektauftrag",true],
        ["Mitarbeiter über Ideen oder Verbesserungsvorschläge",true],
        ["Ein Projektteam, das erst nach dem Projektstart gebildet wird",false],
        ["Jeder Lieferant automatisch durch Abgabe einer Rechnung",false]
      ],
      explanation: "Die dargestellten Auslöser sind externer Kunde, Geschäftsleitung und Mitarbeiter."
    },
    {
      id: 10, category: "initiierung", type: "single", points: 1, source: "Folien 18 und 56",
      prompt: "Welches Merkmal gehört nicht zu den übergeordneten Kriterien der Projektklassifizierung?",
      options: [["Größe",false],["Komplexität",false],["Strategische Bedeutung",false],["Private Lieblingsfarbe des Projektleiters",true]],
      explanation: "Projekte werden nach Größe, Komplexität und strategischer Bedeutung klassifiziert. Die Größe kann etwa über Dauer, Budget/Aufwand und Anzahl der Beteiligten bestimmt werden."
    },
    {
      id: 11, category: "initiierung", type: "multiple", points: 2, source: "Folien 58–59",
      prompt: "Welche Aussagen über Projektziele und Projektlieferobjekt sind richtig?",
      instruction: "Wähle genau vier Aussagen.",
      options: [
        ["Projektziele beschreiben angestrebte Zustände nach Projektabschluss.",true],
        ["Das Lieferobjekt ist das materielle oder immaterielle Projektergebnis.",true],
        ["Projektziele sollen SMART formuliert werden.",true],
        ["Projektziele erfüllen Planungs-, Entscheidungs-, Koordinations-, Kontroll- und Motivationsfunktionen.",true],
        ["Projektziel und Projektlieferobjekt sind immer identisch.",false]
      ],
      explanation: "Ziel und Lieferobjekt hängen zusammen, sind aber nicht identisch: Ziel = angestrebter Zustand, Lieferobjekt = konkretes Ergebnis. Beispiel Pizzeria: Ziel ist die Sicherung des Einkommens; Lieferobjekt ist die betriebsbereite Pizzeria. Ziele werden hierarchisch geordnet, nach Zielarten unterschieden und SMART formuliert: spezifisch, messbar, attraktiv/akzeptiert, realistisch und terminiert."
    },
    {
      id: 12, category: "initiierung", type: "open", points: 6, source: "Folien 42–45, besonders 43",
      prompt: "Zeichne die vier Projektmanagementphasen und ergänze beispielhafte Projektphasen für die Errichtung einer Pizzeria. Erkläre den Zusammenhang.",
      instruction: "Achtung: Die fachlichen Projektphasen liegen in der Darstellung des Professors vollständig innerhalb der PM-Phase Durchführung.",
      criteria: ["Initiierung", "Planung", "Durchführung", "Abschluss", "Fachliche Pizzeria-Phasen innerhalb der Durchführung", "Unterschied PM-Phasen und Projektphasen erklärt"],
      explanation: "Die PM-Phasen steuern jedes Projekt: Initiierung, Planung, Durchführung und Abschluss. Die fachlichen Projektphasen beschreiben dagegen, wie das Lieferobjekt entsteht. Beim Professor liegen diese fachlichen Pizzeria-Phasen vollständig innerhalb der PM-Phase Durchführung.",
      solutionHtml: `<div class="solution-visual"><h4>So muss die Zeichnung aufgebaut sein</h4><div class="pm-track"><div class="pm-phase">INITIIERUNG</div><div class="pm-phase">PLANUNG</div><div class="pm-phase execution">DURCHFÜHRUNG</div><div class="pm-phase">ABSCHLUSS</div></div><div class="project-track"><span>Bauplanung</span><span>Genehmigung</span><span>Umbau</span><span>Einrichtung</span><span>Eröffnungstest</span></div><p class="explanation"><strong>Merke:</strong> Die untere Reihe ist der fachliche Ablauf zur Herstellung der Pizzeria und gehört in die Durchführung.</p></div>`
    },
    {
      id: 13, category: "struktur", type: "multiple", points: 2, source: "Folien 76–77",
      prompt: "Mit welchen Instrumenten kann das Projektlieferobjekt beschrieben werden?",
      instruction: "Wähle genau drei Instrumente.",
      options: [["Objektstrukturplan",true],["Anforderungskatalog",true],["Lastenheft",true],["Ressourcenplan",false],["Netzplan",false]],
      explanation: "Objektstrukturplan, Anforderungskatalog und Lastenheft beschreiben das Ergebnis oder seine Anforderungen. Ressourcen- und Netzplan behandeln Mittel und Zeit."
    },
    {
      id: 14, category: "struktur", type: "multiple", points: 2, source: "Folien 78–79",
      prompt: "Womit befasst sich Qualitätsmanagement in Projekten?",
      instruction: "Wähle genau zwei Aussagen.",
      options: [
        ["Ausschließlich mit der Projektmanagementphase Durchführung",false],
        ["Mit Prozessen und Abläufen, die unmittelbar der Erstellung des Lieferobjekts dienen",true],
        ["Pauschal mit sämtlichen PM-Elementen, unabhängig von Prozessen",false],
        ["Mit den mittelbar beteiligten Projektmanagementprozessen",true]
      ],
      explanation: "Qualität zeigt, wie gut ein Produkt die festgelegten Anforderungen erfüllt. QM plant, steuert und verbessert sowohl die Lieferobjektprozesse als auch die Projektmanagementprozesse."
    },
    {
      id: 15, category: "struktur", type: "multiple", points: 2, source: "Folien 80–84",
      prompt: "Nach welchen drei Prinzipien können Teilprojekte in einem Projektstrukturplan gebildet werden?",
      instruction: "Wähle genau drei Prinzipien.",
      options: [["Phasenorientiert",true],["Objektorientiert",true],["Funktionsorientiert",true],["Instrumentenorientiert",false],["Zufallsorientiert",false]],
      explanation: "Die drei Grundformen sind phasenorientierter, objektorientierter und funktionsorientierter PSP."
    },
    {
      id: 16, category: "struktur", type: "multiple", points: 2, source: "Folien 85–86",
      prompt: "Welche Angaben sind wesentliche Bestandteile einer Arbeitspaketbeschreibung?",
      instruction: "Wähle genau drei Angaben.",
      options: [
        ["Definiertes Ergebnis des Arbeitspakets",true],
        ["Abhängigkeiten zu Vorgängern und Nachfolgern",true],
        ["Methode der Fortschrittsmessung",true],
        ["Private Urlaubsplanung des Auftraggebers",false],
        ["Speiseplan der Hochschulmensa",false]
      ],
      explanation: "Zentral sind Ergebnis, Aufgaben, Zeit, Aufwand, Ressourcen, Verantwortung, Abhängigkeiten und die Methode zur Fortschrittsmessung."
    },
    {
      id: 17, category: "struktur", type: "multiple", points: 2, source: "Folien 87–96",
      prompt: "Welche Instrumente gehören zur Planung von Organisation und Kommunikation?",
      instruction: "Wähle genau drei Instrumente.",
      options: [["Projektorganigramm",true],["Spielregeln",true],["Kommunikationsplan",true],["Kostenplan",false],["Risikomatrix",false]],
      explanation: "Projektorganigramm, Spielregeln und Kommunikationsplan gehören dazu. Ebenfalls wichtig sind Rollenbeschreibung und Funktionendiagramm beziehungsweise VEMI-Matrix."
    },
    {
      id: 18, category: "struktur", type: "single", points: 1, source: "Folien 93–94",
      prompt: "Welche Häufigkeiten sind für die Funktionen einer VEMI-Matrix regelkonform?",
      options: [
        ["V: 0 oder 1; E: 0; M: 0; I: 0",false],
        ["V: genau 1; E: 0 oder 1; M: 0 bis n; I: 0 bis n",true],
        ["V: 0 bis n; E: 0 bis n; M: 0 bis n; I: 0 bis n",false],
        ["V: genau 2; E: genau 1; M: genau 4; I: genau 4",false]
      ],
      explanation: "Für jedes Arbeitspaket gilt: V genau einmal, E höchstens einmal, M und I beliebig oft."
    },
    {
      id: 19, category: "struktur", type: "multiple", points: 2, source: "Folien 95–96",
      prompt: "Welche Aussagen zum Kommunikationsplan sind richtig?",
      instruction: "Wähle genau zwei Aussagen.",
      options: [
        ["Am Projektlenkungsausschuss nehmen Auftraggeber, Ausschussmitglieder und Projektleiter teil.",true],
        ["In Projektteamsitzungen werden unter anderem Status, Risiken, Probleme, Entscheidungen und das weitere Vorgehen besprochen.",true],
        ["Teilprojektleitersitzungen dienen ausschließlich der Freigabe des Gesamtbudgets.",false],
        ["Der Projektlenkungsausschuss muss grundsätzlich täglich zusammentreten.",false]
      ],
      explanation: "Ein Kommunikationsplan legt Anlass, Teilnehmer, Inhalte, Rhythmus und Medium fest. Im Beispiel tagt der PLA monatlich; Projektteamsitzungen behandeln Status, Risiken, Probleme, Entscheidungen und nächste Schritte."
    },
    {
      id: 20, category: "planung", type: "open", points: 6, source: "Folien 104–105",
      prompt: "Erläutere den Unterschied zwischen Aufwand und Dauer und gib die Berechnungsformel für die Dauer an.",
      criteria: ["Aufwand als Nettoarbeit/Personenzeit erklärt", "Dauer als Durchlaufzeit erklärt", "Division durch Ressourcen × Verfügbarkeit", "Wartezeiten addiert", "Risikopuffer addiert"],
      explanation: "Aufwand ist die Nettoarbeit in Personenzeit; Dauer ist die Durchlaufzeit von Start bis Ende einschließlich Wartezeiten. Formel: Dauer = Aufwand ÷ (Anzahl Ressourcen × Verfügbarkeit) + Wartezeiten + Risikopuffer. Beispiel: 24 PT ÷ (3 × 0,8) + 2 + 1 = 13 Tage. Wartezeit und Puffer werden erst nach der Division addiert."
    },
    {
      id: 21, category: "planung", type: "single", points: 1, source: "Folie 103",
      prompt: "Welche Reihenfolge beschreibt die Erstellung und Optimierung eines Terminplans korrekt?",
      options: [
        ["Methoden/Instrumente wählen → Dauer schätzen → Abhängigkeiten festlegen → Projektdauer berechnen → validieren/optimieren",true],
        ["Projektdauer berechnen → Abhängigkeiten löschen → Dauer schätzen → Projekt starten",false],
        ["Optimieren → Projekt abschließen → Methoden wählen → Abhängigkeiten festlegen",false]
      ],
      explanation: "Zuerst werden Methode und Instrument gewählt, dann Dauer und Abhängigkeiten bestimmt, anschließend wird die Projektdauer berechnet und der Plan validiert beziehungsweise optimiert."
    },
    {
      id: 22, category: "planung", type: "network", points: 8, source: "Folien 112–117",
      prompt: "Berechne den Netzplan mit A=5, B=4, C=2, D=4, E=11 und F=3. Zwischen B und D liegt +2, zwischen C und E −1.",
      instruction: "A verzweigt zu B und C; B führt mit +2 zu D, C mit −1 zu E; D und E führen zu F. Trage FA, FE, SA, SE und GP ein.",
      rows: [
        {ap:"A", values:[0,5,0,5,0]}, {ap:"B", values:[5,9,7,11,2]}, {ap:"C", values:[5,7,5,7,0]},
        {ap:"D", values:[11,15,13,17,2]}, {ap:"E", values:[6,17,6,17,0]}, {ap:"F", values:[17,20,17,20,0]}
      ],
      criticalPath: "A-C-E-F", duration: 20,
      explanation: "Vorwärts: bei mehreren Vorgängern das Maximum nehmen. Rückwärts: bei mehreren Nachfolgern das Minimum. GP = SA − FA = SE − FE. Projektdauer: 20 Zeiteinheiten; kritischer Pfad A–C–E–F. Die Zeitabstände +2 und −1 müssen in Vorwärts- und Rückwärtsrechnung berücksichtigt werden."
    },
    {
      id: 23, category: "planung", type: "histogram", points: 8, source: "Folien 128–129",
      prompt: "Übertrage den Ressourcenbedarf in ein Ressourcenhistogramm. Die verfügbare Kapazität beträgt jede Woche 4 PT.",
      instruction: "A: W1–2 je 2 PT. B: W3–7 je 4 PT. C: W4 10 PT, W6 5 PT. D: W5 4 PT, W6 4 PT, W7 2 PT. E: W7–9 je 2 PT. Trage zuerst den Gesamtbedarf W1 bis W9 ein.",
      values: [2,2,4,14,8,13,8,2,2],
      explanation: "Gesamtbedarf W1–W9: 2, 2, 4, 14, 8, 13, 8, 2, 2 PT. Gegenüber der Kapazität von 4 PT besteht in W4 bis W7 Überlastung. Ein echtes Ressourcenhistogramm stapelt die Beiträge der einzelnen Arbeitspakete; eine bloße Summenkurve reicht nicht.",
      chartSegments: {
        labels:["W1","W2","W3","W4","W5","W6","W7","W8","W9"],
        series:[
          {name:"A",values:[2,2,0,0,0,0,0,0,0],color:"#3d6d91"},
          {name:"B",values:[0,0,4,4,4,4,4,0,0],color:"#df7c4b"},
          {name:"C",values:[0,0,0,10,0,5,0,0,0],color:"#8d6dac"},
          {name:"D",values:[0,0,0,0,4,4,2,0,0],color:"#d0a23d"},
          {name:"E",values:[0,0,0,0,0,0,2,2,2],color:"#438a6d"}
        ]
      }
    },
    {
      id: 24, category: "planung", type: "multiple", points: 2, source: "Folien 130–134",
      prompt: "Welche Maßnahmen können grundsätzlich dem Ressourcenausgleich dienen?",
      instruction: "Wähle genau vier Maßnahmen.",
      options: [
        ["Arbeitspakete verschieben oder zeitlich strecken beziehungsweise stauchen",true],
        ["Arbeitspakete in Vorgänge zerlegen und sinnvoll parallelisieren",true],
        ["Externe Ressourcen einkaufen oder Arbeitspakete outsourcen",true],
        ["Mehrarbeit, produktivere Ressourcen oder notfalls den Leistungsumfang reduzieren",true],
        ["Ressourcenüberlastung ignorieren und den Plan unverändert als sicher erklären",false]
      ],
      explanation: "Alle ersten vier Maßnahmen sind möglich. Ihre Auswirkungen auf Zeit, Kosten und Leistungsumfang sowie notwendige PLA-Genehmigungen müssen geprüft werden."
    },
    {
      id: 25, category: "planung", type: "open", points: 6, source: "Folien 139–141",
      prompt: "Zeichne und beschrifte eine typische S-förmige Kostensummenlinie und ordne die Projektmanagementphasen ein.",
      instruction: "Zeichne zuerst auf dein Blatt. Vergleiche danach die Achsen, Form und Phasen.",
      criteria: ["x-Achse: Zeit", "y-Achse: kumulierte Kosten", "S-förmiger Verlauf", "Initiierung und Planung flach", "Durchführung steil", "Abschluss flacht ab"],
      explanation: "Die x-Achse zeigt die Zeit, die y-Achse die kumulierten Kosten. Der Anstieg beginnt in Initiierung und Planung flach, wird in der Durchführung steil und flacht im Abschluss wieder ab.",
      solutionHtml: `<div class="solution-visual"><svg class="mini-chart" viewBox="0 0 650 290" role="img" aria-label="S-förmige Kostensummenlinie"><path d="M70 25v220h545" fill="none" stroke="currentColor" stroke-width="3"/><path d="M75 235 C180 232 205 220 260 185 S345 70 430 45 S540 32 605 30" fill="none" stroke="#df7c4b" stroke-width="7" stroke-linecap="round"/><line x1="185" y1="35" x2="185" y2="245" stroke="currentColor" opacity=".2"/><line x1="295" y1="35" x2="295" y2="245" stroke="currentColor" opacity=".2"/><line x1="520" y1="35" x2="520" y2="245" stroke="currentColor" opacity=".2"/><text x="120" y="270" text-anchor="middle" fill="currentColor">Initiierung</text><text x="240" y="270" text-anchor="middle" fill="currentColor">Planung</text><text x="405" y="270" text-anchor="middle" fill="currentColor">Durchführung</text><text x="565" y="270" text-anchor="middle" fill="currentColor">Abschluss</text><text x="345" y="288" text-anchor="middle" fill="currentColor">Zeit</text><text x="20" y="145" transform="rotate(-90 20 145)" text-anchor="middle" fill="currentColor">kumulierte Kosten</text></svg></div>`
    },
    {
      id: 26, category: "planung", type: "multiple", points: 2, source: "Folie 106",
      prompt: "Welche Schätzmethoden wurden behandelt?",
      instruction: "Drei der angebotenen Methoden sind richtig.",
      options: [["Expertenschätzung",true],["(Normierte) Erfahrungsschätzung",true],["Parametrische Schätzung",true],["Zufalls- oder Würfelmethode",false]],
      explanation: "Expertenschätzung, Erfahrungsschätzung und parametrische Schätzung sind richtig. Zusätzlich behandelt das Skript das Mischverfahren als Kombination mehrerer Ansätze."
    },
    {
      id: 27, category: "umfeld", type: "multiple", points: 2, source: "Folien 57 und 62–63",
      prompt: "Welche Konsequenzen können sich aus einem Eintrag im sachlichen Umfeld ergeben?",
      instruction: "Wähle genau drei Aussagen.",
      options: [
        ["Die Machbarkeit des Projekts wird überprüft.",true],
        ["Aus einer notwendigen Maßnahme kann ein Arbeitspaket entstehen.",true],
        ["Die Gegebenheit kann als Risiko behandelt werden oder im Extremfall das Projekt stoppen.",true],
        ["Der Eintrag wird grundsätzlich ohne Bewertung gelöscht.",false],
        ["Jeder Eintrag führt automatisch zu mehr Projektbudget.",false]
      ],
      explanation: "Einträge im sachlichen Umfeld werden bewertet. Daraus können Machbarkeitsprüfungen, Maßnahmen beziehungsweise Arbeitspakete, Risiken oder sogar ein Projektstopp folgen."
    },
    {
      id: 28, category: "umfeld", type: "multiple", points: 2, source: "Folie 65",
      prompt: "Welche Aussagen entsprechen der Stakeholderdefinition?",
      instruction: "Wähle genau vier Aussagen.",
      options: [
        ["Stakeholder können innerhalb der Projektorganisation stehen.",true],
        ["Stakeholder können außerhalb der Projektorganisation stehen.",true],
        ["Stakeholder können das Projekt beeinflussen.",true],
        ["Stakeholder können vom Projekt beeinflusst werden.",true],
        ["Stakeholder sind ausschließlich Mitglieder des Projektteams.",false]
      ],
      explanation: "Stakeholder können intern oder extern sein. Entscheidend ist, dass sie das Projekt beeinflussen können oder von ihm beeinflusst werden."
    },
    {
      id: 29, category: "umfeld", type: "single", points: 1, source: "Folien 66–67",
      prompt: "Stakeholder A ist neutral mit hohem Einfluss, B negativ mit hohem Einfluss und C negativ mit geringem Einfluss. Um wen kümmerst du dich zuerst?",
      options: [["A",false],["B",true],["C",false]],
      explanation: "B besitzt hohen Einfluss und eine negative Einstellung. Damit stellt B den größten unmittelbaren Widerstand dar."
    },
    {
      id: 30, category: "umfeld", type: "single", points: 1, source: "Folie 148",
      prompt: "Die Auswirkung eines Risikos wird mit 2 und seine Eintrittswahrscheinlichkeit mit 1 bewertet. Welche RPZ ergibt sich?",
      options: [["2",true],["3",false],["20",false],["0,5",false]],
      explanation: "RPZ = Bewertung der Auswirkung × Bewertung der Wahrscheinlichkeit = 2 × 1 = 2. Die Angabe 3 im Fragenplan war ein Rechenfehler."
    },
    {
      id: 31, category: "umfeld", type: "single", points: 1, source: "Folien 147 und 149",
      prompt: "Die Erwartungswerte aller identifizierten und quantifizierten Risiken ergeben 20.000 Euro. Welche Reserve ist dafür zu bilden?",
      options: [
        ["Contingency Reserve von 20.000 Euro für bekannte Risiken",true],
        ["Management Reserve ausschließlich für diese bekannten Risiken",false],
        ["Keine Reserve, weil Risiken noch nicht eingetreten sind",false]
      ],
      explanation: "Für identifizierte und bewertete Risiken wird eine Contingency Reserve gebildet. Die Management Reserve ist pauschal für noch unbekannte Risiken vorgesehen."
    },
    {
      id: 32, category: "umfeld", type: "open", points: 6, source: "Folien 146–152",
      prompt: "Wähle ein Risiko der Pizzeria und erläutere daran die vier Risikostrategien.",
      instruction: "Verwende ein einziges Risiko für alle vier Strategien.",
      criteria: ["Ein konkretes Risiko genannt", "Vermeiden", "Vermindern", "Übertragen", "Akzeptieren", "Jede Strategie auf dasselbe Risiko angewendet"],
      explanation: "Risiko: Der Pizzaofen wird nicht rechtzeitig geliefert. Vermeiden: einen sofort verfügbaren Lagerofen kaufen. Vermindern: früh bestellen, Status überwachen und Ersatzlieferanten bereithalten. Übertragen: Liefergarantie, Vertragsstrafe oder Generalunternehmer vereinbaren. Akzeptieren: Risiko bewusst tragen und Termin-/Kostenpuffer sowie einen Notfallplan vorsehen."
    },
    {
      id: 33, category: "umfeld", type: "single", points: 1, source: "Folie 158",
      prompt: "Welches Vertragsformat passt typischerweise zu einem Projekt, bei dem ein definiertes Lieferobjekt und dessen Erfolg geschuldet sowie ausdrücklich abgenommen werden?",
      options: [["Kaufvertrag",false],["Dienstvertrag",false],["Werkvertrag",true]],
      explanation: "Beim Werkvertrag wird die Herstellung eines konkreten Werks beziehungsweise Lieferobjekts mit Abnahme nach vereinbarten Kriterien geschuldet."
    },
    {
      id: 34, category: "controlling", type: "single", points: 1, source: "Folien 177–179",
      prompt: "Welche Formeln für CPI und SPI sind richtig?",
      options: [["CPI = EV ÷ AC und SPI = EV ÷ PV",true],["CPI = AC ÷ EV und SPI = PV ÷ EV",false]],
      explanation: "Der Earned Value steht bei beiden Kennzahlen im Zähler. C steht für Costs und verweist auf Actual Cost; S steht für Schedule und verweist auf Planned Value."
    },
    {
      id: 35, category: "controlling", type: "multiple", points: 2, source: "Folie 178",
      prompt: "Ein Projekt besitzt SPI = 1,1 und CPI = 0,8. Welche zwei Aussagen sind richtig?",
      instruction: "Wähle genau zwei Aussagen.",
      options: [
        ["Die Kosten sind niedriger als geplant.",false],
        ["Die Kosten sind höher beziehungsweise die Kosteneffizienz ist schlechter als geplant.",true],
        ["Das Projekt liegt zeitlich vor dem Plan.",true],
        ["Das Projekt liegt zeitlich hinter dem Plan.",false]
      ],
      explanation: "CPI < 1 bedeutet, dass das Projekt zu teuer ist. SPI > 1 bedeutet, dass das Projekt zeitlich vor dem Plan liegt."
    },
    {
      id: 36, category: "controlling", type: "order", points: 8, source: "Folien 165–169",
      prompt: "Bringe den Regelkreis der Projektsteuerung in die richtige Reihenfolge.",
      steps: [
        "IST-Werte aus den laufenden Projektaktivitäten und PM-Elementen erfassen",
        "SOLL-IST-Vergleich durchführen und Abweichungsgründe analysieren",
        "Steuerungsmaßnahmen entwickeln",
        "Status berichten und nötige Entscheidungen oder Freigaben des PLA einholen",
        "Freigegebene Maßnahmen in Projektaktivitäten und PM-Elementen umsetzen"
      ],
      explanation: "Nach der Umsetzung beginnt der Zyklus erneut. Als typischer Mittelwert wurde in der Vorlesung ein Rhythmus von zwei bis vier Wochen genannt, abhängig von Projektgröße und Komplexität."
    },
    {
      id: 37, category: "controlling", type: "multiple", points: 2, source: "Folie 168",
      prompt: "Welche drei Kategorien von Steuerungsmaßnahmen können bei Abweichungen gewählt werden?",
      instruction: "Wähle genau drei Kategorien.",
      options: [
        ["Korrektive Maßnahmen innerhalb des Projektauftrags",true],
        ["Planänderung einzelner PM-Elemente über einen Change Request",true],
        ["Gesamtprojektbezogene Änderung: Abbruch, Aussetzung oder Neuplanung",true],
        ["Abweichung grundsätzlich ignorieren und nicht berichten",false]
      ],
      explanation: "Maßnahmen außerhalb des freigegebenen Projektauftrags benötigen eine Entscheidung beziehungsweise Freigabe."
    },
    {
      id: 38, category: "controlling", type: "multiple", points: 2, source: "Folien 185–186",
      prompt: "Welche Aussagen zur Ampellogik sind richtig?",
      instruction: "Wähle genau zwei Aussagen.",
      options: [
        ["Rot bedeutet: Das Team kann die Zielabweichung nicht selbst lösen und muss an den PLA eskalieren. Es bedeutet nicht automatisch Projektabbruch.",true],
        ["Neutral ist nur für ein zukünftiges, noch nicht bewertbares Arbeitspaket sinnvoll, nicht als Gesamtampel des Projekts.",true],
        ["Gelb bedeutet, dass keinerlei Zielabweichung vorliegt.",false],
        ["Grün bedeutet, dass die Projektziele endgültig aufgegeben wurden.",false]
      ],
      explanation: "Grün: Ziele werden eingehalten. Gelb: Es gibt eine Abweichung, die das Team selbst lösen kann. Rot: Eskalation an den PLA nötig."
    },
    {
      id: 39, category: "abschluss", type: "multiple", points: 2, source: "Folien 189–195",
      prompt: "Welche Aufgaben gehören zur Projektmanagementphase Abschluss?",
      instruction: "Wähle genau drei Aufgaben.",
      options: [
        ["Lieferobjekt anhand der Leistungsziele und Abnahmekriterien abnehmen und übergeben",true],
        ["Projektressourcen freigeben und das Projekt administrativ schließen",true],
        ["Abschlussdokumentation erstellen und erworbenes Wissen sichern",true],
        ["Die laufende Wartung des Lieferobjekts dauerhaft als Teil des beendeten Projekts ausführen",false]
      ],
      explanation: "Abnahme, Übergabe, Freigabe der Ressourcen, administrativer Abschluss, Dokumentation und Wissenssicherung gehören in den Abschluss. Die laufende Wartung folgt nach dem Projekt."
    },
    {
      id: 40, category: "abschluss", type: "single", points: 1, source: "Folien 190–191",
      prompt: "Anhand welcher Kriterien wird das Projektlieferobjekt abgenommen?",
      options: [
        ["Anhand der im Projektplan dokumentierten, aus den Leistungszielen abgeleiteten Abnahmekriterien",true],
        ["Ausschließlich nach dem spontanen persönlichen Eindruck des Kunden",false],
        ["Nur anhand der Anzahl eingesetzter Projektmitarbeiter",false]
      ],
      explanation: "Maßgeblich sind die vorab vereinbarten und im Projektplan dokumentierten Abnahmekriterien."
    },
    {
      id: 41, category: "abschluss", type: "single", points: 1, source: "Folie 192",
      prompt: "Ein Projekt endet mit 25 Prozent geringeren Kosten als geplant. Wie wird das im Kurs regelmäßig bewertet?",
      options: [["Positiv",false],["Neutral",false],["Negativ",true]],
      explanation: "Eine so große Unterschreitung wird negativ bewertet, weil sie regelmäßig auf ungenaue Planung oder eine überhöhte Budgetierung hinweist. Eine sachliche Begründung bleibt entscheidend."
    },
    {
      id: 42, category: "abschluss", type: "matching", points: 2, source: "Folien 204–205",
      prompt: "Verbinde die vier agilen Werte mit der jeweils zugehörigen Vergleichsgröße.",
      pairs: [
        ["Individuen und Interaktionen","Prozesse und Werkzeuge"],
        ["Funktionierende Software","Umfassende Dokumentation"],
        ["Zusammenarbeit mit dem Kunden","Vertragsverhandlungen"],
        ["Reagieren auf Veränderung","Befolgen eines Plans"]
      ],
      explanation: "Die rechte Seite bleibt wichtig. Im agilen Manifest wird die linke Seite jeweils höher geschätzt."
    },
    {
      id: 43, category: "abschluss", type: "multiple", points: 2, source: "Folien 211–215",
      prompt: "Welche der folgenden Begriffe sind Scrum-Ereignisse?",
      instruction: "Wähle genau drei Begriffe.",
      options: [["Sprint Planning",true],["Daily Scrum",true],["Sprint Retrospective",true],["Product Backlog",false],["Scrum Master",false]],
      explanation: "Die ersten drei sind Ereignisse. Product Backlog ist ein Scrum-Artefakt, Scrum Master eine Rolle. Weitere Ereignisse sind Sprint und Sprint Review."
    },
    {
      id: 44, category: "abschluss", type: "open", points: 6, source: "Folien 217–218",
      prompt: "Formuliere aus Sicht des Pizzeria-Besitzers eine User Story zur Verwaltung eingehender Bestellungen und nenne zwei Akzeptanzkriterien.",
      criteria: ["Form: Als [Rolle]", "Anforderung: möchte ich [Funktion]", "Nutzen: damit [Zweck]", "Erstes beobachtbares/testbares Akzeptanzkriterium", "Zweites beobachtbares/testbares Akzeptanzkriterium"],
      explanation: "User Story: Als Pizzeria-Besitzer möchte ich eingehende Lieferbestellungen automatisch nach Liefergebiet gruppieren und nach Bestellzeit sortieren können, damit ich Kuriere effizient bündeln und pünktlich losschicken kann. Kriterien: Jede Bestellung wird anhand der Adresse genau einem Liefergebiet zugeordnet. Der Disponent kann Bestellungen je Gebiet nach Zeit sortieren und mehrere Bestellungen einem Kurier zuweisen."
    },
    {
      id: 45, category: "abschluss", type: "single", points: 1, source: "Folien 210 und 222–223",
      prompt: "Welche Aussage zur Wahl zwischen traditionellem und agilem Projektmanagement ist richtig?",
      options: [
        ["Alle Projekte können grundsätzlich traditionell, aber nicht alle Projekte sinnvoll agil abgewickelt werden.",true],
        ["Jedes Projekt muss vollständig agil durchgeführt werden.",false],
        ["Rechtliche Vorgaben, Teamgröße und Unternehmenskultur spielen bei der Entscheidung keine Rolle.",false]
      ],
      explanation: "Die Wahl hängt unter anderem von Projektart und -größe, Team, Auslastung, Kultur, Recht und Regulatorik sowie dem Berichtswesen ab."
    },
    {
      id: 46, category: "abschluss", type: "multiple", points: 2, source: "Folie 230",
      prompt: "Welche Begriffe sind Teilbereiche des Selbstmanagements?",
      instruction: "Vier der angebotenen Antworten sind richtig.",
      options: [
        ["Selbstwahrnehmung und Selbsterkenntnis",true],
        ["Zielmanagement und Selbstentwicklung",true],
        ["Selbstmotivation",true],
        ["Organisations- und Zeitmanagement",true],
        ["Vertrags- und Claimmanagement",false]
      ],
      explanation: "Die ersten vier gehören dazu. Das Skript zeigt zusätzlich Gesundheits- und Stressmanagement als fünften echten Teilbereich."
    }
  ]
};
