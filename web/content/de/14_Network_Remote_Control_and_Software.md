# Kapitel 14: Netzwerk-Setup, Fernsteuerung & Software

Drahtlose Fernsteuerung erlaubt es Tontechnikern, von jeder beliebigen Position im Raum aus zu mischen – die akustische Abdeckung von Balkonplätzen, den vorderen Reihen oder unter Rangvorsprüngen direkt vor Ort zu beurteilen und Parameter in Echtzeit nachzujustieren. Das Behringer X32 und Midas M32 verfügen über eine Ethernet-Netzwerkschnittstelle, die dedizierte Steuerungssoftware, Tablet-Apps von Drittanbietern sowie Open Sound Control (OSC) Automatisierung unterstützt.

Dieses Kapitel beschreibt die Netzwerkkonfiguration, WLAN-Optimierung im Live-Betrieb, X32-Edit, Mixing Station Anpassungen und das OSC-Protokoll.

---

## 1. Netzwerkkonfiguration der Konsole

Das Mischpult wird über die 100-Mbit/s-RJ45-Ethernet-Buchse auf der Rückseite in das Netzwerk eingebunden:

```
┌─────────────────────────────────────────────────────────────┐
│ SETUP ──► [NETWORK]                                         │
│                                                             │
│   DHCP: OFF (Dringend empfohlen für zuverlässigen Live-Ton) │
│   IP ADDRESS:   192.168.1.50                                │
│   SUBNET MASK:  255.255.255.0                               │
│   GATEWAY:      192.168.1.1                                 │
└─────────────────────────────────────────────────────────────┘
```

### Warum eine statische IP-Adresse unverzichtbar ist:
DHCP weist Adressen zwar automatisch zu, doch **DHCP-Leases können mitten im Konzert ablaufen oder erneuert werden**, wodurch Tablets und Laptops im entscheidenden Moment die Verbindung verlieren. Eine fest vergebene, statische IP-Adresse stellt eine dauerhaft stabile Kommunikation sicher.

---

## 2. WLAN-Optimierung für Veranstaltungsräume

Im leeren Saal während des Nachmittags-Soundchecks per iPad zu mischen ist einfach; die Verbindung stabil zu halten, wenn 800 Besucher mit Smartphones den Saal füllen, ist eine handfeste netzwerktechnische Herausforderung.

```
┌─────────────────────────────────────────────────────────────┐
│            WLAN-BEST-PRACTICES FÜR VERANSTALTUNGEN          │
├─────────────────────────────────────────────────────────────┤
│ 1. AUSSCHLIESSLICH 5 GHz (ODER 6 GHz WI-FI 6) NUTZEN!       │
│    Das 2,4-GHz-Band am Router komplett deaktivieren.        │
│    2,4 GHz ist durch Besucher-Smartphones, Bluetooth und    │
│    Funkstrecken extrem überlastet (hohe Paketverluste).     │
├─────────────────────────────────────────────────────────────┤
│ 2. ANTENNEN AUF SICHTLINIE HOCH POSITIONIEREN:              │
│    Der menschliche Körper besteht zu 70 % aus Wasser, das   │
│    5-GHz-Mikrowellensignale stark dämpft. Den WLAN-Router   │
│    auf einem Mikrofonstativ MINDESTENS 2,5 BIS 3 METER ÜBER │
│    DEN KÖPFEN DES PUBLIKUMS montieren!                      │
├─────────────────────────────────────────────────────────────┤
│ 3. SSID VERSTECKEN & WPA2/WPA3-VERSCHLÜSSELUNG NUTZEN:      │
│    Verhindert, dass hunderte Smartphones den Router mit     │
│    automatischen Suchanfragen nach freiem WLAN überfluten.  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Remote-Mixing-Software im Vergleich

### A. X32-Edit (Offizielle Software für PC / Mac / Linux)
Ein detailgetreues 1:1-Abbild der physischen Bedienoberfläche:
- **Synchronisations-Dialog**: Beim Verbinden fragt X32-Edit:
  - **Console → PC**: *Sichere Option!* Lädt den aktuellen Pultzustand auf den Rechner.
  - **PC → Console**: *ACHTUNG!* Überträgt die Datei vom Rechner auf das Mischpult und überschreibt alle aktiven Einstellungen auf der Konsole!
- **Offline-Show-Vorbereitung**: Shows zu Hause vorbereiten, Kanalbeschriftungen anlegen, User Routing konfigurieren und Szenen-Cues einrichten, bevor man die Location betritt.

### B. Mixing Station (Plattformübergreifende Mobil-App)
Entwickelt von David Schumann, gilt **Mixing Station** (Windows, macOS, iOS, Android, Linux) als die führende Fernsteuerungssoftware für digitale Pulte:
- **Vollständig anpassbare Layouts**: Extrem dichte Kanalstreifen erstellen und ungenutzte Kanäle ausblenden, um bis zu 24 Fader auf einem einzigen Tablet-Bildschirm darzustellen.
- **Eigene Aktions-Buttons**: Eigene Tasten für „FX Mute“, „Tap Tempo“, „Lead Vocal Solo“ oder „VSC Umschaltung“ anlegen.
- **Schwebende Fader & Layer (Floating Faders)**: Wichtige Lead-Vocal- und DCA-Fader am Bildschirmrand anpinnen, sodass sie auf jedem Layer sofort erreichbar bleiben.
- **Feine Fader-Auflösung**: Pinch-to-Zoom für präzise Lautstärkeanpassungen im 0,1-dB-Bereich.

### C. Persönliche In-Ear-Monitoring-Apps (M32-Q / X32-Q)
Ermöglicht Bandmitgliedern, ihren eigenen Monitormix per Smartphone abzumischen:
- **Bus-Sperre (Bus Locking)**: Die App jedes Musikers wird fest auf seinen zugewiesenen Mix-Bus beschränkt (z. B. Drummer auf Bus 3–4), um versehentliche Eingriffe in die Saalmischung oder die Monitore anderer Musiker auszuschließen.

---

## 4. Open Sound Control (OSC) Protokoll

Das X32 kommuniziert über standardmäßige Ethernet-UDP-Pakete unter Verwendung des **Open Sound Control (OSC)** Protokolls auf Port **10023**.

```
┌─────────────────────────────────────────────────────────────┐
│                     OSC-PROTOKOLL-AUFBAU                    │
├─────────────────────────────────────────────────────────────┤
│ UDP-PORT: 10023                                             │
│ ADRESS-SYNTAX: Hierarchische Text-Befehle                   │
│                                                             │
│ BEISPIELE:                                                  │
│ /ch/01/mix/fader       ,f   0.75   (Kanal 1 Fader auf 0 dB) │
│ /ch/01/mix/on          ,i   1      (Kanal 1 Mute aufheben)  │
│ /bus/01/mix/fader      ,f   0.75   (Bus 1 Master-Fader)     │
│ /main/st/mix/fader     ,f   0.75   (Main LR Master-Fader)   │
│ /ch/01/config/name     ,s   "VOCAL"(Kanal-Displaytext)      │
├─────────────────────────────────────────────────────────────┤
│ DER /xremote KEEP-ALIVE HEARTBEAT:                          │
│ Um kontinuierlich Fader-Bewegungen und Pegelanzeigen von der│
│ Konsole zu empfangen, muss externe Software mindestens alle │
│ 10 Sekunden den Befehl \"/xremote\" an das Pult senden!       │
└─────────────────────────────────────────────────────────────┘
```

Dieses offene UDP-Protokoll ermöglicht die nahtlose Einbindung von Stream Decks, Theater-Steuerungen, kundenspezifischen Automationen und externen Leitständen.
