# Kapitel 13: Aufnahme, Wiedergabe & Erweiterungskarten

Das Behringer X32 und Midas M32 bieten herausragende Aufnahme- und Wiedergabemöglichkeiten: von unkomplizierter Stereo-Pausenmusik und Summen-Mitschnitten über den oberseitigen USB-Port bis hin zu 32-kanaligen DAW-Mehrspuraufnahmen und autarker Doppel-SD-Karten-Aufnahme über modulare Erweiterungskarten.

Dieses Kapitel beschreibt den integrierten 2-Spur-USB-Recorder, das standardmäßige X-USB-Audiointerface, die autarke X-LIVE-Karte, Dante-Netzwerke sowie den kompletten Workflow für den virtuellen Soundcheck (Virtual Soundcheck, VSC).

---

## 1. Oberseitiger USB 2-Spur-Recorder & -Player

Die USB-Typ-A-Buchse auf der Bedienoberfläche ermöglicht direkte Stereo-WAV-Aufnahmen und -Wiedergaben ohne externen Computer.

```
┌─────────────────────────────────────────────────────────────┐
│ TECHNISCHE DATEN DES 2-SPUR-USB-RECORDERS:                  │
│ - Format: Stereo WAV, 16-Bit unkomprimiert                  │
│ - Abtastrate: 44,1 kHz oder 48 kHz (entspricht Pult-Clock)  │
│ - Speichermedium-Formatierung: ZWINGEND FAT32 (max. 32 GB)  │
└─────────────────────────────────────────────────────────────┘
```

### Aufnahme einrichten:
1. Zu **HOME → TAPE (USB REC)** navigieren (oder die Taste neben dem Display drücken).
2. **Record Source (Aufnahmequelle)** festlegen:
   - Standard: `Main L / Main R` (Zeichnet die Live-Summe des Raumes auf).
   - Empfehlung für Live-Mitschnitte: Eine eigene **Matrix (1–2)** auf den Recorder routen. So kann ein Mastering-Limiter (z. B. Fair Compressor oder Combinator) eingeschleift werden, um die Aufnahme zu verdichten, ohne die Saalanlage zu beeinflussen.
3. Den fünften Dreh-Encoder drücken, um die Aufnahme zu starten; erneut drücken zum Stoppen. Die Dateien werden fortlaufend nummeriert (`REC_0001.WAV`).

### Wiedergabe einrichten (Pausenmusik / Walk-In):
1. 16-Bit oder 24-Bit Stereo-WAV-Dateien in das Hauptverzeichnis (Root) des USB-Sticks kopieren.
2. Im USB-Bildschirm den Titel anwählen und **Play** drücken.
3. Das Stereosignal wird automatisch auf die Fader-Ebene **Aux 7/8** zurückgeführt (beschriftet mit `USB / TAPE`). Aux 7/8 aufziehen, um die Musik über die Saalanlage wiederzugeben.

---

## 2. X-USB-Erweiterungskarte (32x32 USB-Audiointerface)

Serienmäßig in den meisten X32-Konsolen verbaut, verwandelt die **X-USB**-Karte das Mischpult in ein 32-Ein- / 32-Ausgangs-USB-2.0-Audiointerface für Digital Audio Workstations (DAWs) wie Reaper, Pro Tools, Logic Pro, Ableton Live und Studio One.

```
┌─────────────────────────────────────────────────────────────┐
│                 X-USB 32x32 ARCHITEKTUR                     │
├─────────────────────────────────────────────────────────────┤
│ PULTEINGÄNGE (1–32) ──► Card Out ──► USB-Kabel ──► DAW      │
│ (Direkte Vorverstärker-Abgriffe bei IN/LC)                  │
│                                                             │
│ DAW-PLAYBACK-SPUREN (1–32) ◄── Inputs ◄── USB-Kabel ◄── DAW │
│ (Virtual Soundcheck Playback)                               │
└─────────────────────────────────────────────────────────────┘
```

### Treiber- & Betriebssystem-Konfiguration:
- **Windows**: Benötigt den offiziellen Behringer/Midas ASIO-Treiber. Puffergröße auf **64–128 Samples** für latenzarmes Software-Monitoring einstellen, oder auf **256–512 Samples** für absolut stabile Live-Aufnahmen.
- **macOS & Linux**: Native USB Audio Class 2.0 konform (vollständig treiberlos). `X-USB` direkt in den Systemeinstellungen und der DAW anwählen.

### Schritt-für-Schritt: 32-Kanal-Mehrspuraufnahme einrichten:
1. USB-A-auf-USB-B-Kabel zwischen Karte und Rechner anschließen.
2. Auf dem Mischpult **SETUP** drücken und zum Reiter **Card** blättern. Sicherstellen, dass die Konfiguration auf **32 in / 32 out** steht.
3. **ROUTING** drücken und zum Reiter **Card Out** wechseln:
   - `Outputs 1-8`   = **Local 1-8** (oder `AES50 A 1-8`)
   - `Outputs 9-16`  = **Local 9-16** (oder `AES50 A 9-16`)
   - `Outputs 17-24` = **Local 17-24** (oder `AES50 A 17-24`)
   - `Outputs 25-32` = **Local 25-32** (oder `AES50 A 25-32`)
4. In der DAW 32 Audiospuren anlegen und sequenziell den Eingängen 1 bis 32 zuweisen. Alle Spuren scharfschalten und Aufnahme starten.
5. Da Card Out die Signale bei **IN / LC** abgreift (vor EQ, vor Kompressor, vor Fader), enthält die Aufnahme unberührte, saubere Mehrspur-Rohdaten für den späteren Studio-Mixdown.

---

## 3. X-LIVE-Karte (Autarke 32-Kanal Doppel-SD-Karten-Aufnahme)

Die **X-LIVE**-Erweiterungskarte macht einen Laptop bei Live-Konzerten komplett überflüssig:

```
┌─────────────────────────────────────────────────────────────┐
│               X-LIVE SYSTEM-HIGHLIGHTS                      │
├─────────────────────────────────────────────────────────────┤
│ - BIS ZU 32 KANÄLE GLEICHZEITIG direkt auf Standard-SD/     │
│   SDHC/SDXC-Karten aufnehmen und abspielen.                 │
│ - REDUNDANTE DOPPEL-SD-SLOTS: Nahtloses Überblenden über    │
│   Kartengrenzen hinweg (Seamless Spanning), ohne auch nur   │
│   ein einziges Audio-Sample zu verlieren!                   │
│ - MARKER-FUNKTION: Während des Konzerts Song-Marker setzen, │
│   um bei späteren Proben direkt zu Titeln zu springen.      │
│ - Paralleler Betrieb als USB-Audiointerface möglich.        │
└─────────────────────────────────────────────────────────────┘
```

### Empfohlene SD-Karten:
Ausschließlich **Class 10 / UHS-1 / U3** SD-Karten renommierter Hersteller (SanDisk Extreme, Kingston Canvas) verwenden. Die Karten stets direkt im Setup-Menü des X32 als **FAT32** formatieren.

---

## 4. X-DANTE-Erweiterungskarte

Die **X-DANTE**-Karte ersetzt die USB-Schnittstelle durch ein Audinate Dante IP-Audionetzwerk:
- Überträgt bis zu 32 Audiokanäle über herkömmliche Gigabit-Ethernet-Netzwerkinfrastruktur.
- Ermöglicht direkte digitale Integration mit Yamaha-Konsolen, netzwerkfähigen Funkmikrofon-Empfängern (Shure ULX-D / Axient) und der Dante Virtual Soundcard (DVS) auf Laptops.
- Konfiguration erfolgt unkompliziert über die kostenlose Software **Dante Controller** auf PC oder Mac.

---

## 5. Virtueller Soundcheck (Virtual Soundcheck, VSC) Praxis-Workflow

Ein **Virtueller Soundcheck** erlaubt es dem Tontechniker, die Band während der Probe aufzuzeichnen, die Musiker von der Bühne zu entlassen und anschließend die 32 aufgenommenen Spuren über die Pultkanäle wiederzugeben. So können EQs, Kompressoren, Gates und Halleffekte in aller Ruhe feingeschliffen werden – ohne die Stimmen und Nerven der Künstler zu strapazieren.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 VIRTUAL-SOUNDCHECK WORKFLOW-PHASEN                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: PROBE AUFZEICHNEN                                                  │
│ - Routing → Home: Kanäle 1–32 von Local / AES50-Stageboxen belegt.          │
│ - Routing → Card Out: Kanäle 1–32 in DAW oder X-LIVE SD-Karte mitschneiden. │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: MISCHPULT AUF WIEDERGABE-MODUS UMSTELLEN                           │
│ - Zu ROUTING → HOME navigieren.                                             │
│ - Eingänge 1-8   = [Card 1-8]                                               │
│ - Eingänge 9-16  = [Card 9-16]                                              │
│ - Eingänge 17-24 = [Card 17-24]                                             │
│ - Eingänge 25-32 = [Card 25-32]                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: WIEDERGABE & MIX FEINSCHLEIFEN                                     │
│ - Play in der DAW oder auf der X-LIVE starten.                              │
│ - Die Pultkanäle 1–32 reagieren nun auf die aufgenommenen Spuren!           │
│ - Kanal-EQs, Kompressoren, Gates und Hallfahnen exakt abstimmen.            │
│ - Mit dem Tablet durch den Saal gehen und die Beschallung prüfen.           │
│ - Per Sends on Faders die Bühnenmonitore und In-Ear-Mischungen optimieren.  │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: ZURÜCK ZUM LIVE-MODUS SCHALTEN                                     │
│ - Zu ROUTING → HOME navigieren.                                             │
│ - Eingänge 1–32 zurück auf [Local 1–32] oder [AES50 A 1–32] patchen.        │
│ - Das Mischpult ist live-bereit und perfekt für das Konzert abgestimmt!     │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **Profi-Tipp:** Phase 2 und Phase 4 in zwei separaten **Snippets** (`Snippet 01: VSC WIEDERGABE` und `Snippet 02: LIVE EINGÄNGE`) speichern, bei denen ausschließlich das Häkchen bei **Routing** gesetzt ist. Damit schaltet ein einziger Tastendruck das gesamte Pult zwischen virtuellem Soundcheck und Live-Betrieb um!
