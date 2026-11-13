# Chapter 12: Scenes, Cues, Snippets & Show Control

The Behringer X32 and Midas M32 feature an enterprise-grade automation and show control engine. Understanding the distinction between **Shows**, **Cues**, **Scenes**, **Snippets**, and **Safes** is vital to prevent accidental configuration overwrites, audio dropouts, and live performance disasters.

This chapter details the show control hierarchy, surgical snippet creation, global and scene safes, and live production automation.

---

## 1. The Show Control Hierarchy Explained

The console organizes automation into three descending layers indexed by a master cue list:

| Level | Range | What it stores / does |
|---|---|---|
| **Show file** (`*.shw`) | One per show | The complete backup on USB, containing all cues, scenes and snippets |
| **Cues** | 000–499 (500 entries) | The live timeline. Each cue can trigger a **scene** (full console state), a **snippet** (targeted changes) and/or a **MIDI command** (program change, CC or lighting cue) |
| **Scenes** | 00–99 (100 entries) | A full snapshot of the **entire** console: all 32 channels, 16 buses, 6 matrices, preamps, routing, FX rack, faders, mutes, scribble strips and preferences |
| **Snippets** | 00–99 (100 entries) | Targeted partial recalls: **only** the selected channels, buses or processing blocks (e.g. only the lead vocal EQ, without touching faders or gains) |

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

Example: a snippet that only changes the lead vocal's EQ and dynamics.

| | Included | Not included |
|---|---|---|
| **Channels** | Channel 1 (lead vocal) | Channel 2 (guitar), Channel 3 (bass), Channels 4–32 |
| **Parameters** | Equalizer, Dynamics | Config / Preamp, Gate, Inserts, Sends, Fader / Mute, Scribble strip |

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

| Safe | Scope | Protects | Example |
|---|---|---|---|
| **Routing safe** | Global (all scenes) | Input / output patching | Scenes never re-patch the stage |
| **Preamp safe** | Global (all scenes) | Analog headamp gains | Scenes never change gain |
| **FX rack safe** | Global (all scenes) | Effect slots | Scenes never reload plugins |
| **Channel safe** | Per channel | Everything on that channel | Put a channel safe on Ch 32 (pastor / MC / host): recall 20 band scenes and that mic's fader, EQ and preamp **never** change |

### The "Safe on Recall" Principle:
> **Crucial Rule:** Parameter and Channel Safes operate at the **time of recall**, not the time of saving.
> When you save a Scene, the console records the complete state of the entire board regardless of safes. When you *recall* that scene, the console checks the Safe list and skips any parameter marked as safe.

---

## 5. Master Cue Automation & External MIDI Integration

The **CUES** tab unites Scenes, Snippets, and external MIDI automation into a single sequential list:

| Cue | Name | Triggers |
|---|---|---|
| **01** | Intro / walk-in | Scene 01 (walk-in music preset) |
| **02** | Song 1 – Rock | Scene 02 + MIDI program change 1 (keys) |
| **03** | Guitar solo | Snippet 12 (guitar +4 dB) |
| **04** | Acoustic ballad | Scene 03 + MIDI program change 2 |
| **05** | Pastor speech | Snippet 08 (band mute + FX mute on) |

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

---

## 7. Library Presets: Reusable Building Blocks

Scenes and snippets belong to one show. The **LIBRARY** holds presets that travel between shows and consoles: **channel** presets, **effects** presets and **routing** presets.

- **Save**: select the channel, press **LIBRARY**, pick an empty slot and save. The same works for an effect slot and for the routing pages.
- **Recall scope**: when loading a channel preset, choose which sections it may overwrite: preamp (headamp), configuration, gate, dynamics, EQ and sends. Untick the preamp and the sends and "my lead vocal" brings its EQ and compressor onto a channel without touching the gain you just set or the monitor mixes.
- **Typical use**: a personal vocal or kick preset at a festival desk, a favorite reverb setting, or a routing preset for a recurring stagebox layout.

Like scenes, presets can be exported to a USB stick with **UTILITY**.
