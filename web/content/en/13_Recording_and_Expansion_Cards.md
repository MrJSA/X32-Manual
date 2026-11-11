# Chapter 13: Recording, Playback & Expansion Cards

The Behringer X32 and Midas M32 offer exceptional recording and playback versatility, from simple stereo walk-in music and board-mix capture on the top-panel USB port to 32-channel multitrack DAW recording and standalone dual-SD card playback via modular expansion cards.

This chapter details the top-panel 2-track USB recorder, the standard X-USB interface, the standalone X-LIVE card, Dante networking, and the complete Virtual Soundcheck (VSC) workflow.

---

## 1. Top-Panel USB 2-Track Recorder & Player

The front-panel USB Type-A port provides instant stereo WAV recording and playback without an external computer.

| Property | Value |
|---|---|
| **Format** | Stereo WAV, 16-bit, uncompressed |
| **Sample rate** | 44.1 kHz or 48 kHz (follows the console clock) |
| **USB stick** | Must be formatted **FAT32** (max. 32 GB partition) |

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

| Direction | Path | Use |
|---|---|---|
| **Recording** | Console channels 1–32 (tapped at In/LC) → Card Out → USB → DAW | Multitrack recording |
| **Playback** | DAW tracks 1–32 → USB → card inputs → console channels | Virtual soundcheck |

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

| Feature | Details |
|---|---|
| **Channels** | 32 channels recorded at the same time, 32-bit / 48 kHz |
| **Media** | Two SD card slots (SD 1 and SD 2) |
| **File spanning** | Spans the FAT32 file-size limit and switches cards without losing a single sample |
| **Markers** | Set song markers during the show to jump between songs in rehearsal |
| **USB** | Works as a USB audio interface at the same time |

### SD Card Selection:
Use **Class 10 / UHS-1 / U3** SD cards from reputable brands (SanDisk Extreme, Kingston Canvas). Format cards as **FAT32** directly inside the X32 setup menu.

---

## 4. X-DANTE Expansion Card

The **X-DANTE** card replaces the USB interface with an Audinate Dante IP-based digital audio network port:
- Transmits 32 channels of audio over standard Gigabit Ethernet.
- Integrates seamlessly with Yamaha, Dante-enabled digital wireless receivers (Shure ULX-D / Axient), and Dante Virtual Soundcard (DVS) on laptops.
- Configured using the free **Dante Controller** software on PC or Mac.

> **Plugins over the card:** X-USB, X-UF, X-LIVE and X-DANTE can also feed a computer running **Waves SuperRack Performer** as an external plugin rack. See [Chapter 16](16_SuperRack_Performer_Setup.md).

---

## 5. Virtual Soundcheck (VSC) Step-by-Step Workflow

A **Virtual Soundcheck** allows the audio engineer to record the band during rehearsal, send the musicians off the stage, and play back the 32 multitrack recordings back through the console channels. You can dial in EQ, compress vocals, tweak reverbs, and balance monitor mixes without fatiguing the performers' voices.

| Phase | Where | What to do |
|---|---|---|
| **1. Record the rehearsal** | Routing → Home, Routing → Card Out | Inputs 1–32 come from Local / AES50 stageboxes; record channels 1–32 to the DAW or the X-LIVE SD card |
| **2. Switch to playback** | Routing → Home | Set inputs 1–8, 9–16, 17–24 and 25–32 to **Card 1–8 … Card 25–32** |
| **3. Play back and mix** | DAW or X-LIVE | Press play — channels 1–32 now get the recorded tracks. Tweak EQ, compressors, gates and reverbs, walk the room with a tablet, refine wedges and in-ears with Sends on Faders |
| **4. Back to live** | Routing → Home | Set inputs 1–32 back to **Local 1–32** or **AES50 A 1–32** — the console is live and tuned for the show |

> **Pro Tip:** Store Phase 2 and Phase 4 into two dedicated **Snippets** (`Snippet 01: VSC PLAYBACK` and `Snippet 02: LIVE INPUTS`) with only the **Routing** parameter box checked. You can now toggle the entire console between virtual soundcheck and live performance with a single button press!
