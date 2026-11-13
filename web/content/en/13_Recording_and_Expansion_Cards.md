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

### Recording *With* Channel Processing and Effects
The input blocks above (`Local`, `AES50`) are picked up right after the preamps, so EQ, gate, compressor and reverbs are never on the recording. To record the processed sound, send **direct outs** to the card by way of an output block:

1. **ROUTING → Ultranet (P16)**: set P16 outputs 1–16 to the direct outs of channels 1–16, tap **Post Fader** (or **Pre Fader** if fader moves should not be recorded).
2. **ROUTING → Card Out**: set `Outputs 1-8` = **P16 1-8** and `Outputs 9-16` = **P16 9-16**.
3. **Effect returns**: on **ROUTING → Out 1–16**, set eight free outputs (e.g. 9–16) to the direct outs **FX 1L … FX 4R**, then set a Card Out block to **Out 9-16**.

The DAW now receives the processed channels plus the reverb and delay returns as separate tracks.

- This borrows the Ultranet and XLR output patch, so it only works while those outputs are not needed for personal mixers or loudspeakers.
- Mix buses and matrices reach the card the same way: assign them to an output, then send that output block to the card. That gives finished stems instead of single channels.
- With a Pre Fader tap, a channel insert is only recorded when it sits in the **Pre** position.

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

- **Officially supported: SD and SDHC up to 32 GB.** The card only reads FAT32, not exFAT. Larger SDXC cards can work when formatted as FAT32, but they are not officially supported: test before relying on one.
- **Data rate:** 32 tracks at 48 kHz need about **340 MB per minute** (roughly 6 MB/s). One 32 GB card holds about 90 minutes of 32 tracks; two cards give about **3 hours**.
- **Fewer tracks, more time:** the number of recorded channels (8, 16 or 32) is set under **SETUP → Card**. Eight tracks run for more than 12 hours across both cards.

### How X-LIVE Stores a Recording
Knowing the file layout saves confusion when the SD card is opened on a computer:

| Item | What you find |
|---|---|
| **Session folder** | One folder per recording, named with eight hexadecimal characters (the start time stamp), e.g. `4B5C62B0` |
| **Audio files** | `00000001.WAV`, `00000002.WAV`, … Each is **one multichannel** WAV (8, 16 or 32 channels, 32-bit PCM), not one file per track |
| **File length** | FAT32 limits a file to 4 GB, so with 32 channels a new file starts about every **11.7 minutes**. The takes join without a gap |
| **`SE_LOG.BIN`** | The session log that tells the card which files belong together and in what order. Don't delete or rename anything inside a session folder if the card should still play it |

**Getting a session into a DAW:**
1. Copy the whole session folder to the computer.
2. Import all WAV files in order onto one track, one after the other.
3. Split the multichannel file into mono tracks. In Reaper: right-click the items → **Item processing → Explode multichannel audio or MIDI items to new one-channel items**. Other DAWs call this "split to mono" or similar.

---

## 4. X-DANTE Expansion Card

The **X-DANTE** card replaces the USB interface with an Audinate Dante IP-based digital audio network port:
- Transmits 32 channels of audio over standard Gigabit Ethernet.
- Integrates seamlessly with Yamaha, Dante-enabled digital wireless receivers (Shure ULX-D / Axient), and Dante Virtual Soundcard (DVS) on laptops.
- Configured using the free **Dante Controller** software on PC or Mac.

> **Plugins over the card:** X-USB, X-UF, X-LIVE and X-DANTE can also feed a computer running **Waves SuperRack Performer** as an external plugin rack. See [Chapter 16](16_SuperRack_Performer_Setup.md).

### All Expansion Cards at a Glance

Every card carries 32 channels in and 32 out; the slot takes one card at a time. The Klark Teknik **DN32** cards for the M32 are the same cards under another name.

| Card | Connection | Good to know |
|---|---|---|
| **X-USB** | USB 2.0 | The standard card. Also emulates Mackie Control / HUI for DAW remote control |
| **X-UF** | USB 2.0 + FireWire 400 | The original card of early consoles. Its drivers and firmware differ from the X-USB's: check which card is fitted before installing anything |
| **X-LIVE** | Two SD slots + USB 2.0 | SD recording and USB interface work independently of each other |
| **X-DANTE** | Primary + secondary Ethernet | Redundant Dante network; the Dante network supplies the clock |
| **X-MADI** | Optical (SC) + coaxial (BNC) | Carries a block of 32 out of up to 64 MADI channels. Fiber runs up to 2 km, coax up to 100 m |
| **X-ADAT** | 4 × optical in, 4 × optical out, word clock (BNC) | 32 channels at 48 kHz; optical links can't create ground loops |
| **X-WSG** | Ethernet to a Waves SoundGrid server | Server-based plugin processing with very low latency (see below) |
| **Cymatic uTrack-X32** *(third party)* | USB hard drive or USB to computer | 32-track recording straight to a hard drive. The drive and the computer connection cannot be used at the same time |

**X-WSG latency in context:** the console itself has about 0.83 ms from analog input to analog output at 48 kHz. Sending all 32 channels through a SoundGrid server adds about 0.86 ms, for a total of about **1.69 ms**. A computer-based rack over USB is several milliseconds slower ([Chapter 18](18_SuperRack_Latency_and_Buffer.md)).

### Tip: An X32 Core as a Playback Stagebox
Playback computers usually sit on stage, far from the mixer. Instead of running analog lines or a long USB cable, put an **X32 Core** (or Rack) next to the computer:

1. Connect the playback computer by USB to the Core's card.
2. On the Core, route `Card 1–32` to its **AES50 A** outputs.
3. One shielded Cat5e cable carries up to 32 playback tracks digitally to an AES50 port of the main console, where they are patched like any stagebox input.

Set the Core to synchronize from that AES50 port ([Chapter 02](02_Stageboxes_and_AES50_Networking.md)).

---

## 5. Virtual Soundcheck (VSC) Step-by-Step Workflow

A **Virtual Soundcheck** allows the audio engineer to record the band during rehearsal, send the musicians off the stage, and play back the 32 multitrack recordings back through the console channels. You can dial in EQ, compress vocals, tweak reverbs, and balance monitor mixes without fatiguing the performers' voices.

| Phase | Where | What to do |
|---|---|---|
| **1. Record the rehearsal** | Routing → Home, Routing → Card Out | Inputs 1–32 come from Local / AES50 stageboxes; record channels 1–32 to the DAW or the X-LIVE SD card |
| **2. Switch to playback** | Routing → Home | Set inputs 1–8, 9–16, 17–24 and 25–32 to **Card 1–8 … Card 25–32** |
| **3. Play back and mix** | DAW or X-LIVE | Press play — channels 1–32 now get the recorded tracks. Tweak EQ, compressors, gates and reverbs, walk the room with a tablet, refine wedges and in-ears with Sends on Faders |
| **4. Back to live** | Routing → Home | Set inputs 1–32 back to **Local 1–32** or **AES50 A 1–32** — the console is live and tuned for the show |

> **Which page does what?** The names are easy to mix up. **ROUTING → Card Out** decides what the console sends **to** the card, which is the *recording* path. Playback comes back on the card's inputs and is selected on **ROUTING → Home** as the source of the channel blocks. On playback, the gain knob works as digital trim (-18 to +18 dB) per channel, because there is no analog preamp in the path.

> **Pro Tip:** Store Phase 2 and Phase 4 into two dedicated **Snippets** (`Snippet 01: VSC PLAYBACK` and `Snippet 02: LIVE INPUTS`) with only the **Routing** parameter box checked. You can now toggle the entire console between virtual soundcheck and live performance with a single button press!
