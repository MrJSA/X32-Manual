# Kapitel 16: Waves SuperRack Performer – Konzept & Ersteinrichtung

**Waves SuperRack Performer** ist ein nativer (CPU-basierter) Plugin-Host, der einen Computer in ein externes Effekt-Rack für das X32 verwandelt. Er wurde als eigenständige, deutlich günstigere Anwendung (rund 100 US-Dollar plus die gekauften Plugins) aus dem SoundGrid-Ökosystem herausgelöst und arbeitet mit der Erweiterungskarte, die in den meisten X32-Pulten ohnehin verbaut ist: **kein SoundGrid-Server und keine X-WSG-Karte nötig**.

Dieses Kapitel erklärt, was SuperRack Performer ist, welche Hardware benötigt wird und wie Computer und Pult eingerichtet werden, damit Audio in beide Richtungen fließt. Die Routing-Methoden selbst behandelt [Kapitel 17](17_SuperRack_Routing_Methods.md), die Latenz [Kapitel 18](18_SuperRack_Latency_and_Buffer.md) und Plugin-Ketten [Kapitel 19](19_SuperRack_Plugin_Chains.md).

---

## 1. Funktionsprinzip

Das Audiosignal verlässt das Pult über die Erweiterungskarte, wird auf dem Computer bearbeitet und kommt über dieselbe Karte zurück.

| Schritt | Wo | Was passiert |
|---|---|---|
| **1. Raus** | `ROUTING → Card Out` | Preamp- bzw. Stagebox-Signale gehen auf die Erweiterungskarte |
| **2. Bearbeiten** | Computer mit SuperRack Performer | Die Plugins laufen auf der CPU des Computers |
| **3. Zurück** | `ROUTING → Input` (Card 1–32) | Die bearbeiteten Signale kommen von der Karte zurück in die Kanalzüge |

- Die Erweiterungskarte arbeitet als **32 × 32 Audiointerface** zwischen Pult und Computer.
- Die gesamte Plugin-Bearbeitung läuft auf der **CPU des Computers** („native“ Bearbeitung).
- Das Signal muss das Pult verlassen, durch den Computer laufen und zurückkommen. Deshalb **erhöht jeder Weg durch SuperRack die Latenz** (siehe [Kapitel 18](18_SuperRack_Latency_and_Buffer.md)).

### Native (SuperRack Performer) vs. SoundGrid

| | SuperRack Performer (Native) | SuperRack SoundGrid |
|---|---|---|
| **Bearbeitung** | CPU des Computers | Eigener SoundGrid-DSP-Server |
| **X32-Karte** | X-USB, X-UF, X-LIVE (serienmäßige USB-Karten) oder X-DANTE mit Dante Virtual Soundcard | X-WSG (Waves-SoundGrid-Karte) |
| **Zusätzliche Hardware** | Keine | SoundGrid-Server + Netzwerk-Switch |
| **Latenz** | Höher, abhängig von der Puffergröße | Niedriger und gleichmäßiger |
| **Kosten** | Gering | Hoch |

> **Faustregel:** Wenn ein paar Millisekunden zusätzliche Latenz akzeptabel sind, bietet der native SuperRack Performer den kompletten Waves-Plugin-Katalog, ohne dass ein Server gekauft werden muss.

---

## 2. Hardware- & Software-Checkliste

### Erforderlich
- X32 / M32 mit einer 32 × 32 Erweiterungskarte: **X-USB**, **X-UF**, **X-LIVE** (im USB-Interface-Modus) oder **X-DANTE** mit Dante Virtual Soundcard
- Ein **dedizierter** Computer (macOS oder Windows) mit schneller CPU
- USB-Kabel (bzw. Netzwerkkabel bei X-DANTE)
- Waves SuperRack Performer und die gewünschten Plugins

### Dringend empfohlen
- Abtastrate des Pults auf **48 kHz**
- Computer am Netzteil, Ruhezustand und Bildschirmschoner deaktiviert
- **Keine** Streaming-Software (OBS o. Ä.) auf demselben Computer

> **Dedizierter Computer:** Technisch lässt sich SuperRack zusammen mit einer Streaming-Anwendung (z. B. OBS, gespeist von einer Matrix über dieselbe USB-Verbindung) auf einem Rechner betreiben, davon wird aber dringend abgeraten. Ein eigener SuperRack-Computer liefert das robusteste und störungsfreieste Ergebnis.

---

## 3. Vorbereitung am Pult

### Schritt 1: Abtastrate auf 48 kHz stellen
`SETUP → Config → Sample Rate → 48 kHz`

Ohne einen sehr speziellen Grund für 44,1 kHz immer 48 kHz verwenden. Bei 44,1 kHz arbeiten **alle** Pult-Ein- und -Ausgänge, SuperRack und jedes Plugin rund **9 % langsamer**, also mit etwa 9 % mehr Latenz im gesamten System.

### Schritt 2: Erweiterungskarte auf 32 × 32 konfigurieren

| Karte | Wo | Einstellung |
|---|---|---|
| **X-USB / X-UF** | `SETUP → Card` | Kanalkonfiguration **32 in / 32 out** |
| **X-LIVE** | `SETUP → Card` | Channel Config (zweite Ebene der Seite) **32 in / 32 out** und **Playback Config = USB** (USB-Interface-Modus, nicht SD) |
| **X-DANTE** | Dante Controller | Kanäle zur und von der Dante Virtual Soundcard patchen (siehe [Kapitel 17, Methode E](17_SuperRack_Routing_Methods.md#methode-e-x-dante-karte-dante-virtual-soundcard)) |

> **Symptom einer falschen Karteneinstellung:** Die Eingangsauswahl in SuperRack zeigt vom X-LIVE / X-USB nur 2 oder 8 statt 32 Kanäle. Zuerst die Kanalkonfiguration am Pult korrigieren, dann patchen.

### Schritt 3: Preamp-Gain vor dem Einbinden von SuperRack einstellen
Alle Vorverstärker einpegeln, solange die Kanäle noch direkt von den Preamps kommen. Sobald die Kanalquelle auf `Card` umgestellt ist, steuert der Gain-Regler des Kanals den analogen Vorverstärker nicht mehr.

Müssen die Preamps nach dem Routing nachjustiert werden: `SETUP → Preamps` öffnen, den physischen Quellblock wählen (z. B. `Local 9–16`, `AES50 A 1–8`) und dort den Gain pro Eingang einstellen. Hintergründe dazu in [Kapitel 05](05_Gain_Staging_and_Preamps.md).

---

## 4. Einrichtung am Computer (SuperRack Performer)

In SuperRack Performer `Setup` öffnen:

| Bereich | Einstellung | Wert |
|---|---|---|
| **Audio Setup** | Device | X-LIVE / X-USB / X-UF / Dante Virtual Soundcard |
| | Sample Rate | **48 000 Hz** (muss zum Pult passen) |
| | Buffer Size | 32 / 64 / 128 / 256 … (siehe [Kapitel 18](18_SuperRack_Latency_and_Buffer.md)) |
| **Settings** | Anzahl der Racks | 8 / 32 / 64. Nur so viele wie nötig: Weniger Racks bedeuten weniger CPU-Last |

### macOS: Mikrofon-Berechtigung
Beim ersten Start fragt macOS, ob SuperRack Performer auf den Audioeingang zugreifen darf. **Erlauben** klicken. Wurde der Zugriff versehentlich verweigert: `Apple-Menü → Systemeinstellungen → Datenschutz & Sicherheit → Mikrofon`, entsperren und **SuperRack Performer** aktivieren.

### Startwerte für die Puffergröße

| Computer | Puffer |
|---|---|
| Sehr schnell | **32** Samples |
| Mittelklasse | **64** Samples |
| Langsamer | **128–256** Samples |

Die CPU-Anzeige in SuperRack beobachten. Steigt sie stark an, erscheinen rote Überlastanzeigen oder sind Klicks zu hören, den Puffer eine Stufe erhöhen.

---

## 5. Racks patchen

In der Ansicht `Overview` hat jedes Rack eine **Input**- und eine **Output**-Auswahl:

1. **Mono** oder **Stereo** und den/die Gerätekanal/-kanäle wählen, z. B. `Mono → X-LIVE → Input 16`.
2. SuperRack weist automatisch den **gleichen Ausgang** zu, damit ist der Rückweg zum Pult komplett.
3. Das Rack benennen (z. B. `Vocal 1`, `Main LR`).

**Stereo-Racks:** `Stereo` und das Kanalpaar (z. B. 1–2) wählen. SuperRack warnt vor einem doppelt belegten Ausgang im nächsten Rack. Bestätigen und dieses nächste Rack auf `None` setzen.

---

## 6. Der Mute-Test: Signalweg prüfen

Der zuverlässigste Weg, um nachzuweisen, dass das Pult tatsächlich den Ausgang von SuperRack hört:

1. In ein Mikrofon sprechen, das durch SuperRack geroutet ist.
2. Eingangs- **und** Ausgangsanzeige des Racks in SuperRack beobachten.
3. In SuperRack **Mute** auf diesem Rack drücken.
4. Ergebnis prüfen:

| Ergebnis | Bedeutung |
|---|---|
| Der Kanal am Pult verstummt | Der Signalweg stimmt |
| Das Mikrofon ist weiterhin zu hören | Kanal bzw. Insert kommt noch nicht von der Karte zurück |

> **Hinweis:** Bei der Aux-Insert-Methode zeigt SuperRack eventuell schon Signal, *bevor* am Pult `INSERT` gedrückt wird. Der Mute-Test gelingt erst, wenn der Insert aktiv ist, denn erst dann ersetzt der Rückweg das Originalsignal.

---

## 7. Typische Fehler

| Problem | Ursache / Lösung |
|---|---|
| Nur 2 oder 8 Kanäle in SuperRack sichtbar | Karte nicht auf 32 × 32 gestellt (`SETUP → Card`) |
| X-LIVE verbunden, aber kein Rückweg-Signal | Playback Config steht noch auf SD; auf **USB** stellen |
| Gain-Regler ändert den Mikrofonpegel nicht | Kanalquelle ist die Karte; in `SETUP → Preamps` einstellen |
| Rückkopplung / aufschaukelndes Signal | Card Out auf dasselbe Signal gepatcht, das von der Karte zurückkommt (z. B. Aux **In** statt Aux **Out**) |
| Knackser, Aussetzer | Puffer zu klein für die CPU; Puffer erhöhen und andere Programme schließen |
| macOS: überhaupt keine Eingänge | Mikrofon-Berechtigung verweigert |
