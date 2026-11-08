# Kapitel 01: Hardware-Übersicht & Konsolen-Topografie

Das Behringer X32 (sowie das baugleiche Midas M32) ist ein digitales Mischpult mit 40 Eingangskanälen und 25 zeitkorrigierten Mix-Bussen, konzipiert für Live-Beschallung, Studioaufnahmen und Broadcast-Produktionen. Mit einer internen Abtastrate von 44,1 kHz oder 48 kHz und 40-Bit-Fließkomma-Signalverarbeitung verbindet das Mischpult dedizierte haptische Bedienelemente mit einer flexiblen Software-Architektur.

Dieses Kapitel beschreibt die physische Bedienoberfläche, die Steuerungszonen, die Bildschirmnavigation, die rückseitigen Anschlüsse und grundlegende Bedienregeln.

---

## 1. Physischer Oberflächenaufbau

Die Bedienoberfläche des X32 gliedert sich in vier zentrale Funktionsbereiche:

| Bereich | Position | Inhalt |
|---|---|---|
| **Kanalzug** | Oben links | Eigene Hardware-Regler für Preamp, Gate, EQ, Dynamik und Sends des gewählten Kanals |
| **7"-Farbdisplay** | Oben Mitte | 10 Menütasten (HOME, METERS, ROUTING, LIBRARY, EFFECTS, SETUP, MONITOR, SCENES, MUTE GRP, UTILITY) und die Dreh-Encoder 1–6 |
| **Frei belegbare Bedienelemente** | Oben rechts | Regler 1–4 und Tasten 5–12, in den Sets A / B / C |
| **Eingangs-Faderbank** | Unten links, 16 Fader | Ebenen Ch 1–16, Ch 17–32, Aux In / FX-Returns, Bus 1–8, Bus 9–16 und User-Layer |
| **Ausgangs-Faderbank** | Unten rechts, 8 Fader + Main LR | Ebenen DCA 1–8, Bus 1–8, Bus 9–16, Matrix 1–6 / Main C, dazu der eigene Main-LR-Fader |

Jeder Faderzug hat ein Scribble-Strip sowie die Tasten **Select**, **Solo** und **Mute**.

### A. Linke Faderbank (16 Motorfader)
Die linke Faderbank steuert Eingangskanäle, Hilfskanäle und Bus-Master abhängig von der aktiven Fader-Ebene (Layer):
- **CH 1–16**: Standard-Eingangskanäle 1 bis 16.
- **CH 17–32**: Standard-Eingangskanäle 17 bis 32.
- **AUX IN / FX RETURN**: 6 symmetrische Klinken-Aux-Eingänge, 2 Kanäle des internen USB-Players und 8 Fader für interne Stereo-Effektrückwege (FX 1L/R bis FX 4L/R).
- **BUS MASTER 1–8**: Summenfader für die Mix-Busse 1 bis 8.
- **BUS MASTER 9–16**: Summenfader für die Mix-Busse 9 bis 16.

Jeder Kanalzug der linken Faderbank umfasst:
1. **100-mm-Motorfader**: Berührungsempfindlicher Fader mit einem Regelbereich von -∞ bis +10 dB.
2. **Beleuchtetes LCD-Scribble-Strip**: Dynamische Anzeige für Kanalname, Kanalnummer, Piktogramm und Hintergrundfarbe.
3. **Mute-Taste**: Rot beleuchteter Schalter zum Stummschalten des Kanals hinter dem Vorverstärker.
4. **Solo-Taste**: Gelb/Bernsteinfarben beleuchteter Schalter zum Abhören auf dem Kopfhörer-/Monitorbus.
5. **Select-Taste**: Blau beleuchtete Wahltaste, die den Kanalzug und das Hauptdisplay auf diesen Kanal fokussiert.
6. **Pegelanzeige**: 6-Segment-LED-Kette (-60, -30, -18, -12, -6 dBFS, CLIP), Kompressor-Gain-Reduction (`C`) und Gate-Status (`G`).

### B. Rechte Faderbank (8 Motorfader)
Die rechte Bank steuert Summierungsbusse, DCAs und Matrix-Wege:
- **DCA 1–8**: Steuert die 8 VCA/DCA-Gruppen (Digitally Controlled Amplifiers).
- **BUS 1–8**: Master-Fader für Mix-Busse 1 bis 8.
- **BUS 9–16**: Master-Fader für Mix-Busse 9 bis 16.
- **MATRIX 1–6 / MAIN C**: Master-Fader für die 6 Matrizen sowie den diskreten Center-/Mono-Bus.

### C. Main-Stereo-Bus-Fader (Separater 100-mm-Fader)
Ganz rechts befindet sich der dedizierte Fader für die **Stereo-Hauptsumme (Main LR)** mit eigener Select-, Solo- und Mute-Taste, Scribble-Strip und zweikanaliger 24-Segment-Präzisions-LED-Pegelanzeige.

---

## 2. Dedizierte Kanalzug-Bedienelemente

Im oberen linken Bereich des Mischpults befindet sich die Hardware-Kanalzugsektion für direkten haptischen Zugriff auf alle Bearbeitungsparameter des gewählten Kanals:

| Sektion | Tasten | Regler |
|---|---|---|
| **Config / Preamp** | 48V, Polarität (Ø), Low Cut ein, View | Gain, Low-Cut-Frequenz |
| **Gate** | Gate in, View | Threshold, Range |
| **Equalizer (4 Bänder)** | EQ in, Mode, Bandwahl (Low, Lo-Mid, Hi-Mid, High), View | Frequenz, Q, Gain |
| **Dynamik** | Comp in, View | Threshold, Ratio, Attack, Release |

1. **Konfiguration & Preamp-Sektion**:
   - `48V`: Schaltet +48V Phantomspeisung für Kondensatormikrofone und aktive DI-Boxen.
   - `Ø (Polarität)`: Phasenumkehr (180°-Drehung der elektrischen Phasenlage).
   - `GAIN / TRIM-Drehregler`: Regelt den analogen Vorverstärkerpegel (-12 dB bis +60 dB) bzw. den digitalen Trim (-18 dB bis +18 dB).
   - `LOW CUT-Regler & Taste`: Hochpassfilter einstellbar von 20 Hz bis 400 Hz (12 dB/Oktave Flankensteilheit).
   - `VIEW-Taste`: Öffnet sofort die Konfigurationsseite des Kanals auf dem 7"-Bildschirm.

2. **Gate-Sektion**:
   - `GATE IN`: Aktiviert oder umgeht das Gate/Expander/Ducker-Modul.
   - `THRESHOLD-Regler`: Definiert den Ansprechschwellenwert (-80 dB bis 0 dB).
   - `VIEW-Taste`: Zeigt alle Gate-Parameter auf dem Display (Attack, Hold, Release, Sidechain-Filter).

3. **Equalizer-Sektion**:
   - `EQ IN`: Bypass-Schalter für den 4-Band vollparametrischen Entzerrer.
   - `BAND SELECT-Tasten`: `LOW`, `LO MID`, `HI MID`, `HIGH`.
   - `FREQ, Q, GAIN-Regler`: Präzise Steuerung von Mittenfrequenz (20 Hz - 20 kHz), Filtergüte Q (0,3 - 10,0) und Anhebung/Absenkung (-15 dB bis +15 dB).
   - `VIEW-Taste`: Öffnet die grafische Frequenzkurve mit unterlegtem 100-Band-Echtzeit-Analyzer (RTA).

4. **Dynamik-Sektion (Kompressor)**:
   - `COMP IN`: Schaltet den Kompressor/Expander ein oder aus.
   - `THRESHOLD & RATIO-Regler`: Bestimmt Kompressions-Schwellenwert und Kompressionsrate (1,1:1 bis 100:1 / Limiter).
   - `VIEW-Taste`: Öffnet die Dynamikseite (Attack, Release, Knee-Härte, RMS/Peak, Make-up-Gain, parallele Mischung).

5. **Summen-Zuweisung**:
   - `MONO / CENTER`: Sendet den Kanal auf den diskreten Center-/Mono-Bus.
   - `STEREO / LR`: Sendet den Kanal auf die Stereo-Hauptsumme.
   - `PAN-Regler`: Regelt Panorama (Stereo) bzw. Divergenz (LCR).

---

## 3. Das 7"-Farbdisplay & Navigationssystem

Das 800x480 Farb-TFT-Display dient der detaillierten Parametrisierung und dem Signalrouting. Die Navigation erfolgt über 8 Hauptmenütasten und 6 Endlos-Dreh-Encoder:

| Reihe | Bedienelemente |
|---|---|
| **Menütasten (links neben dem Display)** | HOME · METERS · ROUTING · LIBRARY · EFFECTS · SETUP · MONITOR · SCENES · MUTE GRP · UTILITY |
| **Unter dem Display** | Sechs Dreh-/Drück-Encoder, je einer pro Parameterspalte am unteren Rand der aktiven Seite |

### Das VIEW-Prinzip
Nahezu jeder Hardware-Abschnitt verfügt über eine gelbe **VIEW-Taste**. Ein Druck auf `VIEW` springt auf dem Display augenblicklich zu der passenden Parameterseite. Lästiges Suchen in verschachtelten Menüs entfällt während des Live-Betriebs komplett.

### Die UTILITY-Taste
Die `UTILITY`-Taste ist kontextsensitiv. Sie öffnet eine seitliche Werkzeugleiste passend zur aktuellen Bildschirmanzeige:
- Im **Kanal-Home**: Kopieren, Einfügen und Zurücksetzen einzelner Kanalbearbeitungsblöcke.
- Im **Scribble-Strip-Menü**: Farbauswahl, Namenseingabe, Piktogramme und Invertierung.
- Im **Routing**: Zurücksetzen des Signalroutings auf Werkseinstellungen.
- In **Scenes / Snippets**: USB-Export, Importieren, Löschen und Umbenennen von Szenen.

### Bildschirm-Encoder 1 bis 6
Die sechs Drehregler unterhalb des Bildschirms steuern direkt die sechs Spalten der angezeigten Parameterseite. Drehen verändert den Wert, Drücken bestätigt Aktionen oder schaltet Funktionen ein/aus.

---

## 4. Scribble-Strip-Personalisierung

Jeder Faderzug besitzt ein eigenes beleuchtetes Kontrast-LCD. Dies verhindert Fehlbedienungen auf dunklen Bühnen:

### Anpassungsmöglichkeiten:
1. **8 Hintergrundfarben**: Aus (Schwarz), Rot, Grün, Gelb, Blau, Magenta, Cyan, Weiß.
2. **Textdarstellung**: Normal (farbiger Text auf dunklem Grund) oder Invertiert (schwarzer Text auf leuchtender Farbe).
3. **Piktogramme**: 74 integrierte Symbole für Schlagzeug, Percussion, Bass, Gitarren, Tasteninstrumente, Bläser, Gesang, Zuspieler und Symbole.
4. **Kanalnamen**: Bis zu 12 Zeichen zweizeilig (z. B. Zeile 1: `KICK IN`, Zeile 2: `B91A`).

### Schnellzugriff-Tastenkombination:
Halten Sie die `SELECT`-Taste des gewünschten Kanals gedrückt und drücken Sie die `UTILITY`-Taste. Der Scribble-Strip-Editor für diesen Kanal öffnet sich sofort.

---

## 5. Anschlüsse auf der Geräterückseite

| Reihe | Anschlüsse |
|---|---|
| **Analoge Eingänge** | XLR-Eingänge 1–16 und 17–32 |
| **Analoge Ausgänge** | XLR-Ausgänge 1–16, Aux Out 1–6 (Klinke) + Cinch 5–6 |
| **Aux-Eingänge** | Aux In 1–6 (Klinke) + Cinch 5–6 |
| **Digital & Steuerung** | AES50 Port A und B, Ultranet P16, Remote-Ethernet, MIDI In / Out |
| **Karte & Strom** | X-USB / X-LIVE-Erweiterungsschacht (32×32), Netzschalter und Kaltgerätebuchse |

| Anschluss / Schnittstelle | Steckertyp | Funktion & Einsatzzweck |
|---|---|---|
| **Eingänge 1–32** | XLR weiblich | 32 ferngesteuerte Midas-Mikrofonvorverstärker mit schaltbarer +48V Phantomspeisung. |
| **Ausgänge 1–16** | XLR männlich | 16 symmetrische Line-Pegel-Ausgänge (zuweisbar an Main LR, Mix-Busse, Matrizen oder Direct Outs). |
| **Aux In 1–6** | 6,35-mm-Klinke symmetrisch | 6 Line-Eingänge für Keyboards, Zuspieler oder externe Effekte. Kanäle 5–6 zusätzlich mit Cinch-Buchsen. |
| **Aux Out 1–6** | 6,35-mm-Klinke symmetrisch | 6 symmetrische Line-Ausgänge für In-Ear-Sender, Outboard-FX oder Nebenräume. Ausgänge 5–6 mit Cinch. |
| **Control Room Out** | Klinke & XLR symmetrisch | Unabhängige Stereo-Abhöre für Regielautsprecher oder Nahfeldmonitore. |
| **AES50 Ports A & B** | Neutrik EtherCON | Digitale SuperMAC-Multicores für jeweils 48 bidirektionale Audiokanäle (24 Bit / 48 kHz) über geschirmtes CAT5e/CAT6. |
| **Ultranet P16** | RJ45 / EtherCON | 16-Kanal-Digitalbus inklusive Stromversorgung für Behringer P16-M Personal-Monitor-Mischer. |
| **Ethernet Remote** | RJ45 | 100-Mbit-Netzwerkbuchse für Fernsteuerung via X32-Edit, Mixing Station, OSC und Steuerungssoftware. |
| **MIDI In / Out** | 5-Pol DIN | MIDI-Kommunikation für Szenenumschaltung, DAW-Transportsteuerung und Fader-Automation. |
| **Erweiterungsslot** | 32x32-Kartenschacht | Modulare Audio-Interface-Karten: X-USB (Standard), X-LIVE (SD-Recording), X-DANTE oder X-MADI. |
| **Kopfhörer (Phones)** | 6,35-mm-Stereoklinke | Zwei getrennte Kopfhörerbuchsen an den vorderen Seitenwangen des Pultes. |

---

## 6. USB-Anschluss auf der Oberseite

Die frontseitige USB-Typ-A-Buchse erfüllt zwei zentrale Aufgaben:
1. **2-Spur Audio-Recorder & Player**: Zeichnet unkomprimierte 16-Bit-WAV-Dateien mit 44,1/48 kHz von jedem wählbaren Bus direkt auf USB-Sticks auf und spielt Pausenmusik über Aux 7/8 ab.
2. **Systemdatentransfer**: Speichert und lädt Szenen (Scenes), Snippets, Presets, vollständige Shows und Firmware-Updates. Der Stick muss im Format **FAT32** formatiert sein.

---

## 7. Wichtige Grundregeln für den Live-Betrieb

- **Preamp-Gain ist an die Hardware gebunden**: Der analoge Gain gehört zur physikalischen Buchse (lokale XLR-Buchse oder Stagebox), nicht zum Kanalzug. Ein Umrouten des Kanals nimmt den Gain mit.
- **Speichern vor großen Änderungen**: Speichern Sie vor grundlegendem Umrouten oder Firmware-Updates immer eine vollständige Show- oder Szenendatei auf einem USB-Stick.
- **Ausschließlich geschirmte Netzwerkkabel verwenden**: Für AES50-Verbindungen zu digitalen Stageboxen (S16, S32, DL16, DL32) sind zwingend **geschirmte STP-Kabel mit beidseitig metallisch geerdeten EtherCON-Steckern** erforderlich, um Tonaussetzer durch statische Entladungen (ESD) sicher zu verhindern.
