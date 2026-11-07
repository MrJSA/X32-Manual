# Chapter 12: Scenes, Cues, Snippets & Show Control

The Behringer X32 and Midas M32 feature an enterprise-grade automation and show control engine. Understanding the distinction between **Shows**, **Cues**, **Scenes**, **Snippets**, and **Safes** is vital to prevent accidental configuration overwrites, audio dropouts, and live performance disasters.

This chapter details the show control hierarchy, surgical snippet creation, global and scene safes, and live production automation.

---

## 1. The Show Control Hierarchy Explained

The console organizes automation into three descending layers indexed by a master cue list:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MASTER SHOW FILE (*.shw)                                                    │
│ Complete backup file stored on USB containing all Cues, Scenes & Snippets   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. CUES (000 to 499 ── 500 Total Entries)                                   │
│    The master live timeline. Each individual Cue can trigger:               │
│    ├── A Scene (Loads a full console state)                                 │
│    ├── A Snippet (Executes surgical parameter tweaks)                       │
│    └── A MIDI Command (Fires external program change, CC, or lighting cue) │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. SCENES (00 to 99 ── 100 Total Entries)                                   │
│    A complete, heavy snapshot of the ENTIRE console state:                  │
│    All 32 channels, 16 buses, 6 matrices, preamps, routing, FX rack,        │
│    fader positions, mutes, scribble strips, and system preferences.        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. SNIPPETS (00 to 99 ── 100 Total Entries)                                 │
│    Surgical, targeted partial recalls:                                      │
│    Recalls ONLY the specific channels, buses, or processing blocks selected │
│    (e.g., changes only the Lead Vocal EQ without touching faders or gains). │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Scenes vs. Snippets: When to Use Which

| Attribute | Full Scene | Targeted Snippet |
|---|---|---|
| **Scope** | Global (all console parameters) | Precision (only checked boxes) |
| **Audio Dropouts** | Small DSP reset may occur when changing FX rack plugins | **Zero audio dropout** (seamlessly changes parameters) |
| **Fader Positions** | Overwrites all 25 faders | Leaves unselected faders completely untouched |
| **Preamps & Routing**| Overwrites preamps and routing unless explicitly safed | Only modifies routing/preamps if specifically checked |
| **Best Used For** | Total band changeovers, festival setups, starting a new show | Song-to-song guitar patches, guest singer presets, VSC toggles |

---

## 3. Creating and Recalling Surgical Snippets

Snippets allow live sound engineers to make changes without the fear of blowing away the entire mix:

```
┌─────────────────────────────────────────────────────────────┐
│                   SNIPPET CREATION MATRIX                   │
├─────────────────────────────────────────────────────────────┤
│ TARGET CHANNELS:       PARAMETERS TO RECALL:                │
│ [X] Channel 1 (Lead)   [ ] Config / Preamp   [X] Equalizer  │
│ [ ] Channel 2 (Guitar) [ ] Gate              [X] Dynamics   │
│ [ ] Channel 3 (Bass)   [ ] Inserts           [ ] Fader/Mute │
│ [ ] Channels 4-32      [ ] Sends             [ ] Scribble   │
└─────────────────────────────────────────────────────────────┘
```

### Practical Snippet Examples:
1. **Guest Vocalist EQ & Compression**:
   - Check `Channel 1`, check `Equalizer` and `Dynamics`.
   - Store as `Snippet 05: Guest Vocalist`.
   - When recalled during Song 4, the console updates *only* Channel 1's EQ and compressor to suit the guest singer's voice. The monitor mixes, fader level, preamps, and remaining 31 channels remain 100% untouched.
2. **Instant Virtual Soundcheck Toggle**:
   - Check `Routing` only. Set inputs to `Card 1–32` and save as `Snippet 01: VSC ON`.
   - Switch inputs back to `Local / AES50` and save as `Snippet 02: VSC OFF`.
   - Recalling Snippet 01 or 02 instantly toggles between playback and live stage without altering any EQ, dynamics, or monitor balances.

---

## 4. Parameter Safes & Channel Safes

Safes prevent specified channels or processing blocks from being overwritten when a new Scene is recalled.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. PARAMETER SAFES (GLOBAL):                                                │
│    Protects entire subsystems across ALL scenes:                            │
│    - ROUTING SAFE: Prevents scenes from changing input/output patching.     │
│    - PREAMP SAFE: Prevents scenes from overwriting analog headamp gains.    │
│    - FX RACK SAFE: Prevents scenes from reloading effect plugin slots.      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. CHANNEL SAFES (PER-CHANNEL):                                             │
│    Protects individual channels from ANY scene recall:                      │
│    - Example: Channel 32 is the Pastor / MC / Host microphone.              │
│    - Place a Channel Safe on Channel 32.                                    │
│    - You can now recall 20 different musical song scenes for the band, and  │
│      the Pastor's microphone fader, EQ, and preamp will NEVER change!       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The "Safe on Recall" Principle:
> **Crucial Rule:** Parameter and Channel Safes operate at the **time of recall**, not the time of saving.
> When you save a Scene, the console records the complete state of the entire board regardless of safes. When you *recall* that scene, the console checks the Safe list and skips any parameter marked as safe.

---

## 5. Master Cue Automation & External MIDI Integration

The **CUES** tab unites Scenes, Snippets, and external MIDI automation into a single sequential list:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ CUE LIST (Theater / Concert Run-Sheet):                                     │
│                                                                             │
│ Cue 01: "Intro / Walk-In" ──► Loads Scene 01 (Walk-in Music / Preset)       │
│ Cue 02: "Song 1 - Rock"   ──► Loads Scene 02 + MIDI: Program Change 1 (Keys)│
│ Cue 03: "Guitar Solo"     ──► Loads Snippet 12 (Guitar Boost +4 dB)         │
│ Cue 04: "Acoustic Ballad" ──► Loads Scene 03 + MIDI: Program Change 2       │
│ Cue 05: "Pastor Speech"   ──► Loads Snippet 08 (Band Mute + FX Mute ON)     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Assigning Console Buttons for Cue Stepping:
To step through Cues seamlessly during a show without touching the screen:
1. Navigate to the **ASSIGN** section on the console surface (upper right).
2. Assign Button 5 to **Cue Previous** and Button 6 to **Cue Next**.
3. Assign Button 7 to **Cue GO**.
4. The engineer can now advance theatrical scenes, light cues, and musical presets with tactile button presses.

---

## 6. Show Management on External USB Drives

Always back up complete show archives before major events:
1. Insert a FAT32-formatted USB flash drive into the top-panel USB port.
2. Press the **SCENES** menu button and navigate to the **Home** tab.
3. Press **UTILITY**.
4. Select **Export Show to USB**. Enter a name (e.g., `TOUR_2026_MASTER.shw`).
5. The console writes a unified archive containing all 500 Cues, 100 Scenes, 100 Snippets, and routing configurations to the drive.
