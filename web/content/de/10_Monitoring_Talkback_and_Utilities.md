# Kapitel 10: Abhören, Solo, Talkback & Hilfswerkzeuge

Ein Mischpult ist nur so leistungsfähig wie die Kontrolle des Toningenieurs über das akustische Geschehen: präzises Abhören, direkte Kommunikation mit der Bühne, Signalüberprüfung und das automatische Verwalten vieler offener Sprachmikrofone. Das Behringer X32 und Midas M32 bieten hierfür eine eigene Regie-Abhörsektion, getrennte Talkback-Matrizen (Talk A & B), einen Testsignal-Oszillator, einen 100-Band-Echtzeit-Analyzer (RTA) sowie einen 8-Kanal Dan-Dugan-Sprachautomixer.

Dieses Kapitel beschreibt Solo-Modi, Talkback-Routing, Testtöne zur Systemüberprüfung und den Einsatz des Automixers.

---

## 1. Regieraum- & Kopfhörer-Monitoring

Oben rechts auf der Pultoberfläche befindet sich die dedizierte Sektion **MONITOR**. Diese steuert sowohl die physischen Control-Room-Ausgänge auf der Rückseite (für Nahfeldmonitore) als auch die beiden 6,35-mm-Kopfhörerbuchsen an den vorderen Seitenwangen des Mischpults.

```
┌─────────────────────────────────────────────────────────────┐
│ MONITOR-BEDIENELEMENTE:                                     │
│ - LEVEL-DREHREGLER: Analoge Lautstärkeregelung              │
│ - MONO-TASTE: Schaltet die Abhöre auf Mono um               │
│ - DIM-TASTE: Dämpft den Abhörpegel sofort um -20 dB ab      │
│ - TALK A & TALK B TASTEN: Aktiviert die Sprechverbindung    │
│ - TALK LEVEL-REGLER: Vorverstärkung für das Talkback-Mikro  │
└─────────────────────────────────────────────────────────────┘
```

### Solo-Modi & Abhör-Logik:
Drücken Sie die Taste **MONITOR** neben dem Bildschirm, um die Einstellungen aufzurufen:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. PFL (PRE-FADER LISTEN):                                  │
│    Greift das unverfälschte Signal direkt nach Gain & Low-Cut ab.│
│    Faderstellung und Mute haben keinerlei Einfluss.         │
│    *Ideal für*: Einpegeln und Prüfen von Brummschleifen.    │
├─────────────────────────────────────────────────────────────┤
│ 2. AFL (AFTER-FADER LISTEN):                                │
│    Greift das Signal hinter Fader, Panorama und Mute ab.    │
│    *Ideal für*: Abhören von In-Ear-Mixes und Subgruppen.    │
├─────────────────────────────────────────────────────────────┤
│ 3. EXCLUSIVE SOLO (Solo-Reset):                             │
│    - Aktiv: Ein Klick auf Solo hebt alle anderen Solos auf. │
│    - Inaktiv: Mehrere Kanäle können gleichzeitig auf Solo   │
│      liegen (kumulierendes Solo).                           │
├─────────────────────────────────────────────────────────────┤
│ 4. SOLO DIMS:                                               │
│    Senkt die Monitorlautsprecher automatisch um 20 dB ab,   │
│    sobald ein Solo aktiviert wird – schützt vor Schreck-   │
│    momenten bei lauten Signalen!                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Talkback A & Talkback B Kommunikationsmatrix

Das Pult besitzt zwei voneinander unabhängige Talkback-Signalwege: **Talkback A** und **Talkback B**.

```
┌─────────────────────────────────────────────────────────────┐
│ TALKBACK-SIGNALQUELLEN:                                     │
│ 1. INTERNES MIKROFON: Eingebaute Kondensatorkapsel im Pult  │
│ 2. EXTERNES MIKROFON: Eigene XLR-Buchse auf der Rückseite   │
├─────────────────────────────────────────────────────────────┤
│ ZIEL-MATRIX (Separat wählbar für Talk A & Talk B):          │
│ [X] Mix-Busse 1-8  (Bodenmonitore Bühne)                    │
│ [X] Mix-Busse 9-16 (In-Ear-Monitoring Musiker)              │
│ [ ] Matrizen 1-6   (Garderobe / Inspizienz / Foyer)         │
│ [ ] Main LR        (Saal-PA ── Im Konzert IMMER AUSLASSEN!) │
└─────────────────────────────────────────────────────────────┘
```

### Taster vs. Schalter (Push-to-Talk vs. Latch):
- **Tastbetrieb (Momentary)**: Halten Sie `TALK A` gedrückt, während Sie sprechen. Loslassen trennt die Verbindung sofort.
- **Dauerbetrieb (Latch)**: Ein kurzer Druck schaltet Talkback dauerhaft ein; erneuter Druck schaltet es aus.

### Best Practice im Live-Betrieb:
- **Talkback A**: Exklusiv auf **Busse 1–8 (Bühnenmonitore & IEM)** geroutet, um während der Probe direkt mit der Band zu kommunizieren.
- **Talkback B**: Geroutet auf **Aux Out / Matrix 6 (Inspizient, Lichtpult oder Garderobe)**, um mit der Crew zu sprechen, ohne die Musiker auf der Bühne zu stören.

---

## 3. Testsignal-Generator (Oszillator)

Der integrierte Oszillator erzeugt präzise Testsignale zur Überprüfung von Verkabelungen, Lautsprecherphasen und Raumresonanzen:
- **Rosa Rauschen (Pink Noise)**: Gleiche Energie pro Oktave. Der weltweite Standard für Raumakustik-Messungen und Subwoofer-Phasenanpassung.
- **Weißes Rauschen (White Noise)**: Höhengeprägtes Rauschen zur Überprüfung von Hochtontreibern.
- **Sinusgenerator (Sine Wave)**: Reiner Einzelton von **20 Hz bis 20 kHz** in präzisen 1-Hz-Schritten einstellbar.

---

## 4. Der 8-Kanal Dan-Dugan-Automixer

Auf den **Kanälen 1 bis 8** steht ein lizenzierter **Dan Dugan Sprach-Automixer** mit Gain-Sharing-Algorithmus zur Verfügung:

```
┌─────────────────────────────────────────────────────────────┐
│                  WIE DER AUTOMIXER ARBEITET                 │
├─────────────────────────────────────────────────────────────┤
│ Problem bei Diskussionsrunden mit mehreren offenen Mikros:  │
│ Sprechen 4 Teilnehmer an 4 offenen Mikrofonen, entstehen:   │
│ - Kammfiltereffekte (hohler, phasenverschobener Klang)      │
│ - Aufschaukelnder Raumhall und Lüftungsgeräusche            │
│ - Akute Rückkopplungsgefahr                                 │
├─────────────────────────────────────────────────────────────┤
│ Die Dugan Gain-Sharing-Lösung:                              │
│ Die Gesamtverstärkung im Raum bleibt stets bei exakt 0 dB.  │
│ - Spricht Sprecher A: Mikro A erhält 100% Gain;             │
│   Mikrofone B, C und D werden blitzschnell um -15 dB gedämpft!│
│ - Sprechen zwei Personen: Pegel teilt sich 50/50 auf.       │
│ - Alles geschieht in Millisekunden völlig unhörbar und ohne │
│   abgehackte Silben wie bei herkömmlichen Noise Gates!      │
└─────────────────────────────────────────────────────────────┘
```

### Einrichtung des Automixers:
1. Sprachmikrofone auf die **Kanäle 1 bis 8** patchen.
2. Im Menü **Channel → Config** den Reiter **Automix** öffnen.
3. Automixer für die gewünschten Kanäle einschalten und Gruppe **X** oder **Y** zuweisen.
4. **Weight (Priorität)**: Moderator auf **+3 dB**, Gäste auf **0 dB** einstellen. Spricht der Moderator, priorisiert das System dessen Stimme automatisch.
