# Chapter 13: Recording, Playback & Expansion Cards

The Behringer X32 and Midas M32 offer exceptional recording and playback versatility, from simple stereo walk-in music and board-mix capture on the top-panel USB port to 32-channel multitrack DAW recording and standalone dual-SD card playback via modular expansion cards.

This chapter details the top-panel 2-track USB recorder, the standard X-USB interface, the standalone X-LIVE card, Dante networking, and the complete Virtual Soundcheck (VSC) workflow.

---

## 1. Top-Panel USB 2-Track Recorder & Player

The front-panel USB Type-A port provides instant stereo WAV recording and playback without an external computer.

```
┌─────────────────────────────────────────────────────────────┐
│ 2-TRACK USB SPECIFICATIONS:                                 │
│ - Format: Stereo WAV, 16-bit uncompressed                   │
│ - Sample Rate: 44.1 kHz or 48 kHz (matches console clock)   │
│ - Media Formatting: FAT32 MANDATORY (max 32 GB partition)   │
└─────────────────────────────────────────────────────────────┘
```

### Recording Setup:
1. Navigate to **HOME → TAPE (USB REC)** (or press the dedicated screen button).
2. Set the **Record Source**:
   - Default: `Main L / Main R` (Records the live room mix).
   - Recommended for Live Board Mixes: Route a dedicated **Matrix (1–2)** to the recorder, allowing you to insert a mastering limiter (e.g., Fair Compressor or Combinator) to level the recording without affecting the house PA.
3. Press the fifth encoder to start recording; press again to stop. Files are named sequentially (`REC_0001.WAV`).

### Playback Setup (Walk-in Music):
1. Load 16-bit or 24-bit stereo WAV files onto the root directory of your USB drive.
2. In the USB screen, select the audio track and press **Play**.
3. The stereo playback stream automatically returns onto the **Aux 7/8** fader layer (labeled `USB / TAPE`). Raise Aux 7/8 to hear playback in the house.

---

## 2. X-USB Expansion Card (32x32 USB Audio Interface)

Shipped factory-standard on most X32 consoles, the **X-USB** card transforms the mixer into a 32-input / 32-output USB 2.0 audio interface for digital audio workstations (DAWs) including Reaper, Pro Tools, Logic Pro, Ableton Live, and Studio One.

```
┌─────────────────────────────────────────────────────────────┐
│                   X-USB 32x32 ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────┤
│ CONSOLE CHANNELS (1–32) ──► Card Out ──► USB Cable ──► DAW │
│ (Direct Preamp Taps at IN/LC)                               │
│                                                             │
│ DAW PLAYBACK TRACKS (1–32) ◄── Inputs ◄── USB Cable ◄── DAW │
│ (Virtual Soundcheck Playback)                               │
└─────────────────────────────────────────────────────────────┘
```

### Driver & OS Configuration:
- **Windows**: Requires the official Behringer/Midas ASIO driver. Configure buffer size to **64–128 samples** for low-latency live software monitoring, or **256–512 samples** for stable live recording.
- **macOS & Linux**: Native USB Audio Class 2.0 compliant (zero driver installation required). Select `X-USB` directly in system sound preferences and DAW hardware setup.

### Setting Up 32-Channel Multitrack Recording:
1. Connect a USB-A to USB-B cable between the card and computer.
2. On the console, press **SETUP** and page to **Card**. Verify configuration is set to **32 in / 32 out**.
3. Press **ROUTING** and page to **Card Out**:
   - `Outputs 1-8`   = **Local 1-8** (or `AES50 A 1-8`)
   - `Outputs 9-16`  = **Local 9-16** (or `AES50 A 9-16`)
   - `Outputs 17-24` = **Local 17-24** (or `AES50 A 17-24`)
   - `Outputs 25-32` = **Local 25-32** (or `AES50 A 25-32`)
4. In your DAW, create 32 audio tracks mapped sequentially to Inputs 1 through 32. Arm all tracks and record.
5. Because Card Out taps channels at **IN / LC** (pre-EQ, pre-compressor, pre-fader), your recorded tracks will be pristine, untouched multitrack audio ready for studio mixing.

---

## 3. X-LIVE Card (Dual SD Card Standalone Multitrack)

The **X-LIVE** expansion card eliminates the need for a laptop during live concerts by recording 32 uncompressed channels directly onto two high-speed SD/SDHC/SDXC memory cards.

```
┌─────────────────────────────────────────────────────────────┐
│ X-LIVE HARDWARE CAPABILITIES:                               │
│ - 32 Channels of simultaneous 32-bit 48 kHz PCM recording.  │
│ - Dual SD Card Slots (SD 1 and SD 2).                       │
│ - AUTOMATIC SEAMLESS FILE SPANNING: Spans seamlessly across │
│   FAT32 32GB boundaries and switches cards without losing    │
│   a single audio sample!                                    │
│ - MARKER INSERTION: Place song markers during live shows    │
│   to jump instantly between songs during rehearsals.        │
│ - Simultaneous USB interface operation.                     │
└─────────────────────────────────────────────────────────────┘
```

### SD Card Selection:
Use **Class 10 / UHS-1 / U3** SD cards from reputable brands (SanDisk Extreme, Kingston Canvas). Format cards as **FAT32** directly inside the X32 setup menu.

---

## 4. X-DANTE Expansion Card

The **X-DANTE** card replaces the USB interface with an Audinate Dante IP-based digital audio network port:
- Transmits 32 channels of audio over standard Gigabit Ethernet.
- Integrates seamlessly with Yamaha, Dante-enabled digital wireless receivers (Shure ULX-D / Axient), and Dante Virtual Soundcard (DVS) on laptops.
- Configured using the free **Dante Controller** software on PC or Mac.

---

## 5. Virtual Soundcheck (VSC) Step-by-Step Workflow

A **Virtual Soundcheck** allows the audio engineer to record the band during rehearsal, send the musicians off the stage, and play back the 32 multitrack recordings back through the console channels. You can dial in EQ, compress vocals, tweak reverbs, and balance monitor mixes without fatiguing the performers' voices.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 VIRTUAL SOUNDCHECK WORKFLOW PHASES                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: RECORD THE REHEARSAL                                               │
│ - Routing → Home: Inputs 1–32 from Local / AES50 stageboxes.                │
│ - Routing → Card Out: Record channels 1–32 into DAW or X-LIVE SD card.      │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: SWITCH CONSOLE TO PLAYBACK MODE                                    │
│ - Navigate to ROUTING → HOME.                                               │
│ - Set Inputs 1-8   = [Card 1-8]                                             │
│ - Set Inputs 9-16  = [Card 9-16]                                            │
│ - Set Inputs 17-24 = [Card 17-24]                                           │
│ - Set Inputs 25-32 = [Card 25-32]                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: PLAY BACK & TWEAK MIX                                              │
│ - Hit Play in DAW or on X-LIVE.                                             │
│ - Console channels 1–32 now respond to recorded tracks!                     │
│ - Tweak channel EQs, compressors, gates, and reverb decay times.            │
│ - Walk the room with an iPad to evaluate PA coverage in all seating zones.  │
│ - Engage Sends on Faders to refine stage floor wedges and in-ear mixes.     │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: RETURN TO LIVE PERFORMANCE MODE                                    │
│ - Navigate to ROUTING → HOME.                                               │
│ - Return Inputs 1–32 back to [Local 1–32] or [AES50 A 1–32].                │
│ - The console is now live and tuned for the concert!                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **Pro Tip:** Store Phase 2 and Phase 4 into two dedicated **Snippets** (`Snippet 01: VSC PLAYBACK` and `Snippet 02: LIVE INPUTS`) with only the **Routing** parameter box checked. You can now toggle the entire console between virtual soundcheck and live performance with a single button press!
