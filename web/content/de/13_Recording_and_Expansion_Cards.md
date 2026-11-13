# Kapitel 13: Aufnahme, Wiedergabe & Erweiterungskarten

Das Behringer X32 und Midas M32 bieten herausragende Aufnahme- und Wiedergabemöglichkeiten: von unkomplizierter Stereo-Pausenmusik und Summen-Mitschnitten über den oberseitigen USB-Port bis hin zu 32-kanaligen DAW-Mehrspuraufnahmen und autarker Doppel-SD-Karten-Aufnahme über modulare Erweiterungskarten.

Dieses Kapitel beschreibt den integrierten 2-Spur-USB-Recorder, das standardmäßige X-USB-Audiointerface, die autarke X-LIVE-Karte, Dante-Netzwerke sowie den kompletten Workflow für den virtuellen Soundcheck (Virtual Soundcheck, VSC).

---

## 1. Oberseitiger USB 2-Spur-Recorder & -Player

Die USB-Typ-A-Buchse auf der Bedienoberfläche ermöglicht direkte Stereo-WAV-Aufnahmen und -Wiedergaben ohne externen Computer.

| Eigenschaft | Wert |
|---|---|
| **Format** | Stereo-WAV, 16 Bit, unkomprimiert |
| **Abtastrate** | 44,1 kHz oder 48 kHz (folgt der Pult-Clock) |
| **USB-Stick** | Muss **FAT32**-formatiert sein (max. 32-GB-Partition) |

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

| Richtung | Weg | Einsatz |
|---|---|---|
| **Aufnahme** | Pultkanäle 1–32 (Abgriff In/LC) → Card Out → USB → DAW | Mehrspuraufnahme |
| **Wiedergabe** | DAW-Spuren 1–32 → USB → Karteneingänge → Pultkanäle | Virtueller Soundcheck |

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

### Aufnahme *mit* Kanalbearbeitung und Effekten
Die oben genannten Eingangsblöcke (`Local`, `AES50`) werden direkt nach den Vorverstärkern abgegriffen; EQ, Gate, Kompressor und Hall sind deshalb nie auf der Aufnahme. Um den bearbeiteten Klang aufzunehmen, schickt man **Direct Outs** über einen Ausgangsblock zur Karte:

1. **ROUTING → Ultranet (P16)**: Die P16-Ausgänge 1–16 auf die Direct Outs der Kanäle 1–16 stellen, Abgriff **Post Fader** (oder **Pre Fader**, wenn Faderbewegungen nicht mit aufgenommen werden sollen).
2. **ROUTING → Card Out**: `Outputs 1-8` = **P16 1-8** und `Outputs 9-16` = **P16 9-16** wählen.
3. **Effekt-Returns**: Unter **ROUTING → Out 1–16** acht freie Ausgänge (z. B. 9–16) auf die Direct Outs **FX 1L … FX 4R** stellen, dann einen Card-Out-Block auf **Out 9-16** setzen.

Die DAW erhält nun die bearbeiteten Kanäle sowie die Hall- und Delay-Returns als getrennte Spuren.

- Dieser Weg belegt das Ultranet- und XLR-Ausgangs-Patch. Er funktioniert also nur, solange diese Ausgänge nicht für Personal-Mixer oder Lautsprecher gebraucht werden.
- Mix-Busse und Matrizen gelangen auf dieselbe Weise zur Karte: einem Ausgang zuweisen und diesen Ausgangsblock zur Karte schicken. So entstehen fertige Stems statt Einzelkanälen.
- Bei Abgriff Pre Fader wird ein Kanal-Insert nur mit aufgenommen, wenn er in der Position **Pre** sitzt.

---

## 3. X-LIVE-Karte (Autarke 32-Kanal Doppel-SD-Karten-Aufnahme)

Die **X-LIVE**-Erweiterungskarte macht einen Laptop bei Live-Konzerten komplett überflüssig:

| Merkmal | Details |
|---|---|
| **Kanäle** | 32 Kanäle gleichzeitig, 32 Bit / 48 kHz |
| **Medien** | Zwei SD-Kartenschächte (SD 1 und SD 2) |
| **Datei-Übergang** | Überspringt die FAT32-Dateigrößengrenze und wechselt die Karte, ohne ein einziges Sample zu verlieren |
| **Marker** | Song-Marker während der Show setzen, um in der Probe zwischen Songs zu springen |
| **USB** | Arbeitet gleichzeitig als USB-Audio-Interface |

### Empfohlene SD-Karten:
Ausschließlich **Class 10 / UHS-1 / U3** SD-Karten renommierter Hersteller (SanDisk Extreme, Kingston Canvas) verwenden. Die Karten stets direkt im Setup-Menü des X32 als **FAT32** formatieren.

- **Offiziell unterstützt: SD und SDHC bis 32 GB.** Die Karte liest nur FAT32, kein exFAT. Größere SDXC-Karten können mit FAT32-Formatierung funktionieren, werden aber nicht offiziell unterstützt: vor dem Einsatz testen.
- **Datenrate:** 32 Spuren bei 48 kHz brauchen etwa **340 MB pro Minute** (rund 6 MB/s). Eine 32-GB-Karte fasst etwa 90 Minuten mit 32 Spuren; zwei Karten ergeben etwa **3 Stunden**.
- **Weniger Spuren, mehr Zeit:** Die Zahl der aufgenommenen Kanäle (8, 16 oder 32) wird unter **SETUP → Card** eingestellt. Acht Spuren laufen über beide Karten mehr als 12 Stunden.

### So speichert X-LIVE eine Aufnahme
Wer die Dateistruktur kennt, ist nicht überrascht, wenn die SD-Karte am Computer geöffnet wird:

| Element | Was Sie vorfinden |
|---|---|
| **Session-Ordner** | Ein Ordner pro Aufnahme, benannt mit acht Hexadezimalzeichen (Zeitstempel des Starts), z. B. `4B5C62B0` |
| **Audiodateien** | `00000001.WAV`, `00000002.WAV`, … Jede ist **eine mehrkanalige** WAV-Datei (8, 16 oder 32 Kanäle, 32 Bit PCM), nicht eine Datei pro Spur |
| **Dateilänge** | FAT32 begrenzt eine Datei auf 4 GB; bei 32 Kanälen beginnt deshalb etwa alle **11,7 Minuten** eine neue Datei. Die Teile schließen lückenlos aneinander an |
| **`SE_LOG.BIN`** | Das Session-Protokoll, das der Karte sagt, welche Dateien in welcher Reihenfolge zusammengehören. In einem Session-Ordner nichts löschen oder umbenennen, wenn die Karte ihn weiter abspielen soll |

**Eine Session in die DAW bringen:**
1. Den gesamten Session-Ordner auf den Computer kopieren.
2. Alle WAV-Dateien der Reihe nach hintereinander auf eine Spur importieren.
3. Die Mehrkanaldatei in Monospuren aufteilen. In Reaper: Rechtsklick auf die Items → **Item processing → Explode multichannel audio or MIDI items to new one-channel items**. Andere DAWs nennen das „Split to mono“ oder ähnlich.

---

## 4. X-DANTE-Erweiterungskarte

Die **X-DANTE**-Karte ersetzt die USB-Schnittstelle durch ein Audinate Dante IP-Audionetzwerk:
- Überträgt bis zu 32 Audiokanäle über herkömmliche Gigabit-Ethernet-Netzwerkinfrastruktur.
- Ermöglicht direkte digitale Integration mit Yamaha-Konsolen, netzwerkfähigen Funkmikrofon-Empfängern (Shure ULX-D / Axient) und der Dante Virtual Soundcard (DVS) auf Laptops.
- Konfiguration erfolgt unkompliziert über die kostenlose Software **Dante Controller** auf PC oder Mac.

> **Plugins über die Karte:** X-USB, X-UF, X-LIVE und X-DANTE können auch einen Computer mit **Waves SuperRack Performer** als externes Plugin-Rack speisen. Siehe [Kapitel 16](16_SuperRack_Performer_Setup.md).

### Alle Erweiterungskarten im Überblick

Jede Karte überträgt 32 Kanäle hin und 32 zurück; der Schacht nimmt immer nur eine Karte auf. Die **DN32**-Karten von Klark Teknik für das M32 sind dieselben Karten unter anderem Namen.

| Karte | Anschluss | Gut zu wissen |
|---|---|---|
| **X-USB** | USB 2.0 | Die Standardkarte. Emuliert zusätzlich Mackie Control / HUI zur DAW-Fernsteuerung |
| **X-UF** | USB 2.0 + FireWire 400 | Die ursprüngliche Karte der frühen Pulte. Treiber und Firmware unterscheiden sich von der X-USB: vor jeder Installation prüfen, welche Karte verbaut ist |
| **X-LIVE** | Zwei SD-Slots + USB 2.0 | SD-Aufnahme und USB-Interface arbeiten unabhängig voneinander |
| **X-DANTE** | Primary + Secondary Ethernet | Redundantes Dante-Netzwerk; der Takt kommt aus dem Dante-Netz |
| **X-MADI** | Optisch (SC) + koaxial (BNC) | Überträgt einen Block von 32 aus bis zu 64 MADI-Kanälen. Glasfaser bis 2 km, Koax bis 100 m |
| **X-ADAT** | 4 × optisch In, 4 × optisch Out, Wordclock (BNC) | 32 Kanäle bei 48 kHz; optische Verbindungen können keine Masseschleifen bilden |
| **X-WSG** | Ethernet zu einem Waves-SoundGrid-Server | Serverbasierte Plugin-Bearbeitung mit sehr geringer Latenz (siehe unten) |
| **Cymatic uTrack-X32** *(Fremdhersteller)* | USB-Festplatte oder USB zum Computer | 32-Spur-Aufnahme direkt auf eine Festplatte. Festplatte und Computerverbindung lassen sich nicht gleichzeitig nutzen |

**Die X-WSG-Latenz im Vergleich:** Das Pult selbst hat bei 48 kHz etwa 0,83 ms vom analogen Eingang zum analogen Ausgang. Alle 32 Kanäle über einen SoundGrid-Server zu schicken, kostet etwa 0,86 ms zusätzlich, zusammen etwa **1,69 ms**. Ein computerbasiertes Rack über USB ist mehrere Millisekunden langsamer ([Kapitel 18](18_SuperRack_Latency_and_Buffer.md)).

### Tipp: Ein X32 Core als Stagebox für Zuspieler
Zuspielrechner stehen meist auf der Bühne, weit weg vom Pult. Statt analoge Leitungen oder ein langes USB-Kabel zu legen, stellt man ein **X32 Core** (oder Rack) neben den Rechner:

1. Den Zuspielrechner per USB mit der Karte des Core verbinden.
2. Am Core `Card 1–32` auf die Ausgänge von **AES50 A** routen.
3. Ein geschirmtes Cat5e-Kabel überträgt bis zu 32 Zuspielspuren digital an einen AES50-Port des Hauptpults, wo sie wie jeder Stagebox-Eingang gepatcht werden.

Das Core auf diesen AES50-Port synchronisieren ([Kapitel 02](02_Stageboxes_and_AES50_Networking.md)).

---

## 5. Virtueller Soundcheck (Virtual Soundcheck, VSC) Praxis-Workflow

Ein **Virtueller Soundcheck** erlaubt es dem Tontechniker, die Band während der Probe aufzuzeichnen, die Musiker von der Bühne zu entlassen und anschließend die 32 aufgenommenen Spuren über die Pultkanäle wiederzugeben. So können EQs, Kompressoren, Gates und Halleffekte in aller Ruhe feingeschliffen werden – ohne die Stimmen und Nerven der Künstler zu strapazieren.

| Phase | Wo | Was zu tun ist |
|---|---|---|
| **1. Probe aufnehmen** | Routing → Home, Routing → Card Out | Eingänge 1–32 kommen von Local / AES50-Stageboxen; Kanäle 1–32 in die DAW oder auf die X-LIVE-SD-Karte aufnehmen |
| **2. Auf Wiedergabe umschalten** | Routing → Home | Eingänge 1–8, 9–16, 17–24 und 25–32 auf **Card 1–8 … Card 25–32** stellen |
| **3. Abspielen und mischen** | DAW oder X-LIVE | Play drücken — die Kanäle 1–32 erhalten nun die aufgenommenen Spuren. EQ, Kompressoren, Gates und Hall anpassen, mit dem Tablet durch den Saal gehen, Monitore und In-Ears per Sends on Faders verfeinern |
| **4. Zurück zu live** | Routing → Home | Eingänge 1–32 wieder auf **Local 1–32** oder **AES50 A 1–32** stellen — das Pult ist live und für die Show eingestellt |

> **Welche Seite macht was?** Die Namen werden leicht verwechselt. **ROUTING → Card Out** bestimmt, was das Pult **an** die Karte sendet, also den *Aufnahme*weg. Die Wiedergabe kommt über die Eingänge der Karte zurück und wird unter **ROUTING → Home** als Quelle der Kanalblöcke gewählt. Bei der Wiedergabe arbeitet der Gain-Regler pro Kanal als digitaler Trim (-18 bis +18 dB), weil kein analoger Vorverstärker im Signalweg liegt.

> **Profi-Tipp:** Phase 2 und Phase 4 in zwei separaten **Snippets** (`Snippet 01: VSC WIEDERGABE` und `Snippet 02: LIVE EINGÄNGE`) speichern, bei denen ausschließlich das Häkchen bei **Routing** gesetzt ist. Damit schaltet ein einziger Tastendruck das gesamte Pult zwischen virtuellem Soundcheck und Live-Betrieb um!
