# Kapitel 12: Szenen, Cues, Snippets & Show-Steuerung

Das Behringer X32 und Midas M32 verfügen über eine voll ausgestattete Show-Automation. Das präzise Verständnis der Unterschiede zwischen **Shows**, **Cues**, **Szenen (Scenes)**, **Snippets** und **Safes** ist unverzichtbar, um versehentliches Überschreiben von Konfigurationen, Audio-Aussetzer und Pannen im Live-Betrieb zuverlässig zu verhindern.

Dieses Kapitel erklärt die Hierarchie der Show-Steuerung, die chirurgische Snippet-Erstellung, globale und szenenspezifische Safes sowie die Live-Automatisierung.

---

## 1. Die Hierarchie der Show-Steuerung im Detail

Die Konsole strukturiert Automationsdaten in drei absteigenden Ebenen, die von einer übergeordneten Cue-Liste gesteuert werden:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MASTER-SHOW-DATEI (*.shw)                                                   │
│ Vollständiges Show-Archiv auf USB mit allen Cues, Szenen & Snippets         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. CUES (000 bis 499 ── 500 Einträge insgesamt)                             │
│    Die zentrale Live-Ablaufliste (Run-Sheet). Jeder Cue kann auslösen:      │
│    ├── Eine Szene (Lädt einen kompletten Mischpult-Gesamtzustand)           │
│    ├── Ein Snippet (Führt gezielte, partielle Parameter-Änderungen aus)     │
│    └── Einen MIDI-Befehl (Sendet Programmwechsel, CC oder Lichtimpulse)     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. SZENEN (00 bis 99 ── 100 Einträge insgesamt)                             │
│    Ein vollständiger Snapshot des GESAMTEN Mischpults:                      │
│    Alle 32 Kanäle, 16 Busse, 6 Matrizen, Preamps, Routing, FX-Rack,         │
│    Fader-Positionen, Mutes, Scribble-Strips und Systemeinstellungen.        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. SNIPPETS (00 bis 99 ── 100 Einträge insgesamt)                           │
│    Gezielte, chirurgische Teil-Aufrufe:                                     │
│    Ruft NUR die spezifisch selektierten Kanäle, Busse oder Signalblöcke auf │
│    (z. B. ändert nur den Lead-Vocal-EQ, ohne Fader oder Preamps anzurühren).│
└─────────────────────────────────────────────────────────────────────────────┘
```

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

```
┌─────────────────────────────────────────────────────────────┐
│                 SNIPPET-ERSTELLUNGSMATRIX                   │
├─────────────────────────────────────────────────────────────┤
│ ZIEL-KANÄLE:           ZU LADENDE PARAMETER:                │
│ [X] Kanal 1 (Lead-Voc) [ ] Config / Preamp   [X] Equalizer  │
│ [ ] Kanal 2 (Gitarre)  [ ] Gate              [X] Dynamics   │
│ [ ] Kanal 3 (Bass)     [ ] Inserts           [ ] Fader/Mute │
│ [ ] Kanäle 4-32        [ ] Sends             [ ] Scribble   │
└─────────────────────────────────────────────────────────────┘
```

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

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. PARAMETER-SAFES (GLOBAL):                                                │
│    Schützt ganze Funktionsbereiche über ALLE Szenen hinweg:                 │
│    - ROUTING SAFE: Verhindert, dass Szenen Ein-/Ausgangs-Patching verändern.│
│    - PREAMP SAFE: Verhindert das Überschreiben der analogen Gain-Werte.     │
│    - FX RACK SAFE: Verhindert das Neuladen der Effekt-Plugin-Slots.         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. KANAL-SAFES (PRO KANAL):                                                 │
│    Schützt einzelne Kanäle vor JEDEM Szenenaufruf:                          │
│    - Beispiel: Kanal 32 ist das Mikrofon des Moderators / Sprechers.        │
│    - Kanal-Safe auf Kanal 32 aktivieren.                                    │
│    - Nun können 20 verschiedene musikalische Songszenen für die Band        │
│      geladen werden, ohne dass Fader, EQ oder Gain des Moderatormikrofons   │
│      auch nur ein einziges Mal verändert werden!                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Das Prinzip "Safe on Recall":
> **Wichtige Regel:** Parameter- und Kanal-Safes greifen im **Moment des Ladens (Recall)**, nicht beim Speichern.
> Beim Speichern einer Szene zeichnet das Mischpult stets den vollständigen Zustand des gesamten Boards auf. Erst beim *Laden* prüft das System die Safe-Liste und überspringt alle geschützten Bereiche.

---

## 5. Master-Cue-Automation & Externe MIDI-Einbindung

Der Reiter **CUES** fasst Szenen, Snippets und externe MIDI-Befehle in einer fortlaufenden Liste zusammen:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ CUE-LISTE (Theater / Konzert-Ablaufplan):                                   │
│                                                                             │
│ Cue 01: "Einlass / Walk-In" ──► Lädt Szene 01 (Pausenmusik / Grund-Setup)   │
│ Cue 02: "Song 1 - Rock"     ──► Lädt Szene 02 + MIDI: Program Change 1      │
│ Cue 03: "Gitarrensolo"      ──► Lädt Snippet 12 (Gitarren-Boost +4 dB)      │
│ Cue 04: "Akustik-Ballade"   ──► Lädt Szene 03 + MIDI: Program Change 2      │
│ Cue 05: "Moderation"        ──► Lädt Snippet 08 (Band-Mute + FX-Mute EIN)   │
└─────────────────────────────────────────────────────────────────────────────┘
```

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
