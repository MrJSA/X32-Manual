# Kapitel 12: Szenen, Cues, Snippets & Show-Steuerung

Das Behringer X32 und Midas M32 verfügen über eine voll ausgestattete Show-Automation. Das präzise Verständnis der Unterschiede zwischen **Shows**, **Cues**, **Szenen (Scenes)**, **Snippets** und **Safes** ist unverzichtbar, um versehentliches Überschreiben von Konfigurationen, Audio-Aussetzer und Pannen im Live-Betrieb zuverlässig zu verhindern.

Dieses Kapitel erklärt die Hierarchie der Show-Steuerung, die chirurgische Snippet-Erstellung, globale und szenenspezifische Safes sowie die Live-Automatisierung.

---

## 1. Die Hierarchie der Show-Steuerung im Detail

Die Konsole strukturiert Automationsdaten in drei absteigenden Ebenen, die von einer übergeordneten Cue-Liste gesteuert werden:

| Ebene | Bereich | Was sie speichert / auslöst |
|---|---|---|
| **Show-Datei** (`*.shw`) | Eine pro Show | Die komplette Sicherung auf USB mit allen Cues, Szenen und Snippets |
| **Cues** | 000–499 (500 Einträge) | Der Live-Ablauf. Jeder Cue kann eine **Szene** (kompletter Pultzustand), ein **Snippet** (gezielte Änderungen) und/oder einen **MIDI-Befehl** (Program Change, CC oder Licht-Cue) auslösen |
| **Szenen** | 00–99 (100 Einträge) | Eine Momentaufnahme des **gesamten** Pultes: alle 32 Kanäle, 16 Busse, 6 Matrizen, Preamps, Routing, Effekt-Rack, Fader, Mutes, Scribble-Strips und Einstellungen |
| **Snippets** | 00–99 (100 Einträge) | Gezielte Teil-Abrufe: **nur** die gewählten Kanäle, Busse oder Bearbeitungsblöcke (z. B. nur der EQ des Lead-Gesangs, ohne Fader oder Gain zu berühren) |

---

## 2. Szenen vs. Snippets: Wann verwendet man was?

| Eigenschaft | Vollständige Szene (Scene) | Gezieltes Snippet |
|---|---|---|
| **Umfang** | Global (alle Parameter der Konsole) | Präzise (nur markierte Häkchen) |
| **Audio-Aussetzer** | Kleiner DSP-Reset möglich beim Wechsel von FX-Rack-Plugins | **Keinerlei Audio-Aussetzer** (nahtlose Parameteränderung) |
| **Fader-Positionen** | Überschreibt alle 25 Motorfader | Lässt unselektierte Fader völlig unangetastet |
| **Preamps & Routing** | Überschreibt Preamps und Routing (außer mit Safes) | Verändert Routing/Preamps nur bei expliziter Anwahl |
| **Optimal für** | Band-Umbau, Festival-Setups, Grund-Setup vor der Show | Song-zu-Song Gitarren-Patches, Gastsänger, VSC-Umschaltung |

---

## 3. Chirurgische Snippets erstellen und abrufen

Snippets ermöglichen es Tontechnikern, gezielte Anpassungen vorzunehmen, ohne Gefahr zu laufen, den gesamten Live-Mix zu zerstören:

Beispiel: ein Snippet, das nur EQ und Dynamik des Lead-Gesangs ändert.

| | Enthalten | Nicht enthalten |
|---|---|---|
| **Kanäle** | Kanal 1 (Lead-Gesang) | Kanal 2 (Gitarre), Kanal 3 (Bass), Kanäle 4–32 |
| **Parameter** | Equalizer, Dynamik | Config / Preamp, Gate, Inserts, Sends, Fader / Mute, Scribble-Strip |

### Praxis-Beispiele für Snippets:
1. **Gast-Sänger EQ & Kompression**:
   - Nur `Kanal 1` anwählen, Häkchen bei `Equalizer` und `Dynamics` setzen.
   - Speichern als `Snippet 05: Gast-Sänger`.
   - Wird dieses Snippet in Song 4 aufgerufen, aktualisiert das Pult *ausschließlich* EQ und Kompressor von Kanal 1 für die Stimme des Gastsängers. Monitor-Mischungen, Faderpegel, Vorverstärkung und alle anderen 31 Kanäle bleiben zu 100 % unberührt.
2. **Blitzschnelle Virtual-Soundcheck-Umschaltung**:
   - Nur `Routing` anwählen. Eingänge auf `Card 1–32` setzen und als `Snippet 01: VSC EIN` speichern.
   - Eingänge zurück auf `Local / AES50` stellen und als `Snippet 02: VSC AUS` speichern.
   - Der Aufruf von Snippet 01 oder 02 wechselt blitzschnell zwischen Playback und Live-Bühne, ohne EQs, Dynamik oder Monitormixe zu verändern.

---

## 4. Parameter-Safes & Kanal-Safes

Safes schützen definierte Kanäle oder Signalblöcke davor, beim Laden einer neuen Szene überschrieben zu werden.

| Safe | Gültigkeit | Schützt | Beispiel |
|---|---|---|---|
| **Routing Safe** | Global (alle Szenen) | Ein- und Ausgangs-Patching | Szenen patchen die Bühne nie um |
| **Preamp Safe** | Global (alle Szenen) | Analoge Vorverstärker-Pegel | Szenen ändern nie den Gain |
| **FX Rack Safe** | Global (alle Szenen) | Effekt-Slots | Szenen laden nie Plugins neu |
| **Channel Safe** | Pro Kanal | Alles in diesem Kanal | Channel Safe auf Kanal 32 (Pastor / Moderation): 20 Band-Szenen abrufen, und Fader, EQ und Preamp dieses Mikrofons ändern sich **nie** |

### Das Prinzip "Safe on Recall":
> **Wichtige Regel:** Parameter- und Kanal-Safes greifen im **Moment des Ladens (Recall)**, nicht beim Speichern.
> Beim Speichern einer Szene zeichnet das Mischpult stets den vollständigen Zustand des gesamten Boards auf. Erst beim *Laden* prüft das System die Safe-Liste und überspringt alle geschützten Bereiche.

---

## 5. Master-Cue-Automation & Externe MIDI-Einbindung

Der Reiter **CUES** fasst Szenen, Snippets und externe MIDI-Befehle in einer fortlaufenden Liste zusammen:

| Cue | Name | Löst aus |
|---|---|---|
| **01** | Intro / Einlass | Szene 01 (Einlassmusik-Preset) |
| **02** | Song 1 – Rock | Szene 02 + MIDI Program Change 1 (Keys) |
| **03** | Gitarrensolo | Snippet 12 (Gitarre +4 dB) |
| **04** | Akustik-Ballade | Szene 03 + MIDI Program Change 2 |
| **05** | Predigt / Ansprache | Snippet 08 (Band-Mute + FX-Mute ein) |

### Zuweisung von Hardware-Tastern zum Weiterschalten:
Um Cues während einer Live-Show nahtlos weiterzuschalten, ohne den Bildschirm zu berühren:
1. Im Bedienfeld oben rechts den Bereich **ASSIGN** aufrufen.
2. Taster 5 mit **Cue Previous** und Taster 6 mit **Cue Next** belegen.
3. Taster 7 mit **Cue GO** belegen.
4. Der Tontechniker kann nun Theaterszenen, Licht-Cues und Song-Setups per Tastendruck auf der Konsole abfeuern.

---

## 6. Show-Verwaltung auf USB-Speichermedien

Vor wichtigen Produktionen stets eine vollständige Show-Sicherung anlegen:
1. FAT32-formatierten USB-Stick in den oberen USB-Port stecken.
2. Die Taste **SCENES** drücken und zum Reiter **Home** navigieren.
3. **UTILITY** drücken.
4. **Export Show to USB** wählen. Dateinamen eingeben (z. B. `TOUR_2026_MASTER.shw`).
5. Die Konsole speichert ein konsistentes Gesamtarchiv mit allen 500 Cues, 100 Szenen, 100 Snippets und Routing-Einstellungen auf den USB-Stick.
