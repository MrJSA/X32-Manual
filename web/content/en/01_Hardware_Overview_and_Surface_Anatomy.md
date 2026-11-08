# Chapter 01: Hardware Overview & Surface Anatomy

The Behringer X32 (and its sister console, the Midas M32) is a 40-input, 25-bus digital mixing console designed for live sound, studio recording, and broadcast production. Operating at 44.1 kHz or 48 kHz with 40-bit floating-point internal processing, the console combines dedicated physical surface controls with a flexible software architecture.

This chapter details the physical surface, control topography, screen navigation principles, rear connectivity, and setup workflow.

---

## 1. Physical Surface Layout

The X32 surface is divided into four primary functional zones:

| Zone | Position | What it contains |
|---|---|---|
| **Channel strip** | Top left | Dedicated hardware controls for Preamp, Gate, EQ, Dynamics and Sends of the selected channel |
| **7" color display** | Top center | 10 menu buttons (HOME, METERS, ROUTING, LIBRARY, EFFECTS, SETUP, MONITOR, SCENES, MUTE GRP, UTILITY) and rotary encoders 1–6 |
| **Assignable controls** | Top right | Knobs 1–4 and keys 5–12, in sets A / B / C |
| **Input fader bank** | Bottom left, 16 faders | Layers Ch 1–16, Ch 17–32, Aux In / FX returns, Bus 1–8, Bus 9–16 and user layers |
| **Output fader bank** | Bottom right, 8 faders + Main LR | Layers DCA 1–8, Bus 1–8, Bus 9–16, Matrix 1–6 / Main C, plus the dedicated Main LR fader |

Every fader strip has a scribble strip, plus **Select**, **Solo** and **Mute** buttons.

### A. Left Fader Bank (16 Motorized Faders)
The left fader bank controls input channels, auxiliary returns, and bus masters depending on the selected layer:
- **CH 1–16**: Standard analog/digital inputs 1 through 16.
- **CH 17–32**: Standard inputs 17 through 32.
- **AUX IN / FX RETURN**: 6 Auxiliary TRS inputs, 2 internal USB player channels, and 8 stereo FX return faders (4 stereo pairs: FX 1L/R through FX 4L/R).
- **BUS MASTER 1–8**: Master faders for Mix Buses 1 through 8.
- **BUS MASTER 9–16**: Master faders for Mix Buses 9 through 16.

Each fader strip on the left contains:
1. **100mm Motorized Fader**: Touch-sensitive fader offering -∞ to +10 dB travel.
2. **Backlit Scribble Strip**: Dynamic LCD showing channel name, number, icon, and custom color.
3. **Mute Button**: Illuminated red button muting the channel post-preamp.
4. **Solo Button**: Illuminated amber button routing the channel to the monitor/headphone bus.
5. **Select Button**: Illuminated blue button focusing the channel strip hardware and LCD screen on that channel.
6. **Input Meter**: 6-segment LED ladder displaying input level (-60, -30, -18, -12, -6 dBFS, CLIP), compressor gain reduction (`C`), and gate status (`G`).

### B. Right Fader Bank (8 Motorized Faders)
The right bank manages output summing, DCAs, and matrix sends:
- **DCA 1–8**: Controls 8 Digitally Controlled Amplifier groups.
- **BUS 1–8**: Master faders for Mix Buses 1 through 8.
- **BUS 9–16**: Master faders for Mix Buses 9 through 16.
- **MATRIX 1–6 / MAIN C**: Master faders for Matrices 1 through 6 and the discrete Center/Mono bus fader.

### C. Main Stereo Bus Fader (Dedicated 100mm Fader)
The separate far-right fader is permanently dedicated to the **Main Left/Right Master Stereo Bus**, featuring its own Select, Solo, Mute buttons, scribble strip, and stereo 24-segment LED ladder meters.

---

## 2. Dedicated Channel Strip Controls

Located on the upper-left of the console, the channel strip offers instant tactile control over the currently selected channel without needing screen navigation:

| Section | Buttons | Knobs |
|---|---|---|
| **Config / Preamp** | 48V, Polarity (Ø), Low Cut on, View | Gain, Low Cut frequency |
| **Gate** | Gate in, View | Threshold, Range |
| **Equalizer (4-band)** | EQ in, Mode, band select (Low, Lo-Mid, Hi-Mid, High), View | Frequency, Q, Gain |
| **Dynamics** | Comp in, View | Threshold, Ratio, Attack, Release |

1. **Config & Preamp Section**:
   - `48V`: Toggles +48V phantom power for condenser mics and active DIs.
   - `Ø (Polarity)`: Inverts electrical phase (180° flip).
   - `GAIN / TRIM Knob`: Adjusts analog headamp gain (-12 dB to +60 dB) or digital trim (-18 dB to +18 dB).
   - `LOW CUT Knob & Button`: High-Pass Filter adjustable from 20 Hz to 400 Hz (12 dB/octave Butterworth slope).
   - `VIEW Button`: Jumps the main 7" display to the channel configuration tab.

2. **Gate Section**:
   - `GATE IN`: Enables or bypasses the gate/expander/ducker.
   - `THRESHOLD Knob`: Sets the opening threshold level (-80 dB to 0 dB).
   - `VIEW Button`: Jumps the main display to the detailed Gate page (attack, hold, release, sidechain filter).

3. **Equalizer Section**:
   - `EQ IN`: Hard bypass for the channel's 4-band parametric equalizer.
   - `BAND SELECT Buttons`: `LOW`, `LO MID`, `HI MID`, `HIGH`.
   - `FREQ, Q, GAIN Knobs`: Precision frequency (20 Hz - 20 kHz), bandwidth Q (0.3 - 10.0), and boost/cut (-15 dB to +15 dB).
   - `VIEW Button`: Jumps the main screen to the full EQ curve with real-time 100-band RTA overlay.

4. **Dynamics (Compressor) Section**:
   - `COMP IN`: Enables or bypasses the compressor/expander.
   - `THRESHOLD & RATIO Knobs`: Adjusts compression threshold and ratio (1.1:1 up to 100:1 / Limiter).
   - `VIEW Button`: Jumps the main screen to the Dynamics tab (attack, release, knee, RMS/Peak detection, makeup gain, mix balance).

5. **Main Bus Assignment**:
   - `MONO / CENTER`: Routes the selected channel to the discrete Mono bus.
   - `STEREO / LR`: Routes the channel to the Main Stereo bus.
   - `PAN Knob`: Sets stereo panorama or LCR divergence.

---

## 3. The 7" Color Display & Navigation System

The 800x480 color TFT screen provides in-depth telemetry and system routing. Navigation is driven by eight dedicated menu buttons and six push-rotary encoders:

| Row | Controls |
|---|---|
| **Menu buttons (left of the screen)** | HOME · METERS · ROUTING · LIBRARY · EFFECTS · SETUP · MONITOR · SCENES · MUTE GRP · UTILITY |
| **Below the screen** | Six push-rotary encoders, one per parameter column shown at the bottom of the active page |

### The VIEW Principle
Every physical section on the console features a dedicated **VIEW button**. Pressing `VIEW` instantly flips the main screen to the parameters for that specific section. This eliminates deep menu diving during live mixing.

### The UTILITY Button
The `UTILITY` button is context-sensitive. Pressing it while viewing any screen opens a side tray containing actions relevant to that exact page:
- On **Channel Home**: Copy, Paste, and Default channel processing blocks.
- On **Scribble Strips**: Color picker, naming field, icon selector, and display invert.
- On **Routing**: Reset routing to default factory patches.
- On **Scenes / Snippets**: Export to USB, import, delete, or rename.

### Screen Encoders 1 through 6
The six rotary encoders directly below the display map to the six parameter columns shown at the bottom of the active screen. Turning an encoder adjusts values; pressing an encoder activates toggles, confirmations, or file-loading routines.

---

## 4. Scribble Strip Customization

Every fader has an individual backlit high-contrast LCD scribble strip. These strips prevent channel misidentification in dark environments.

### Customization Options:
1. **8 Backlight Colors**: Off (Black), Red, Green, Yellow, Blue, Magenta, Cyan, White.
2. **Text Inversion**: Normal (colored text on dark background) or Inverted (black text on bright colored background).
3. **Icons**: 74 built-in icons covering drums, percussion, bass, guitars, acoustic instruments, keyboards, brass, woodwinds, vocals, playback devices, and utility icons.
4. **Naming**: Up to 12 characters across two lines (e.g., Line 1: `KICK IN`, Line 2: `B91A`).

### Fast Editing Shortcut:
Hold the channel's `SELECT` button and press the `UTILITY` button. The screen immediately opens the scribble strip editor for that channel. Use encoders to choose color, icon, and name without leaving your mix.

---

## 5. Rear Panel Connectivity

| Panel row | Connectors |
|---|---|
| **Analog inputs** | XLR inputs 1–16 and 17–32 |
| **Analog outputs** | XLR outputs 1–16, Aux Out 1–6 (TRS) + RCA 5–6 |
| **Aux inputs** | Aux In 1–6 (TRS) + RCA 5–6 |
| **Digital & control** | AES50 Port A and B, Ultranet P16, Remote Ethernet, MIDI In / Out |
| **Card & power** | X-USB / X-LIVE expansion card slot (32×32), power switch and IEC inlet |

| Port / Interface | Connector Type | Description & Purpose |
|---|---|---|
| **Inputs 1–32** | XLR Female | 32 studio-grade, digitally controlled Midas microphone preamps with switchable +48V phantom power. |
| **Outputs 1–16** | XLR Male | 16 balanced analog line-level outputs (assignable to Main LR, Mix Buses, Matrices, or Direct Outs). |
| **Aux In 1–6** | 1/4" TRS Balanced | 6 line inputs for keyboards, outboard gear, and media playback. Channels 5–6 include parallel unbalanced RCA jacks. |
| **Aux Out 1–6** | 1/4" TRS Balanced | 6 balanced line outputs for outboard FX sends, green room feeds, or IEM transmitters. Outputs 5–6 include parallel RCA jacks. |
| **Control Room Out** | 1/4" TRS & XLR Balanced | Stereo monitor feeds for studio control room speakers or booth monitoring. |
| **AES50 Ports A & B** | Neutrik EtherCON | Dual SuperMAC digital snake ports carrying 48 bidirectional audio channels at 24-bit, 48 kHz over shielded CAT5e/CAT6. |
| **Ultranet P16** | RJ45 / EtherCON | 16-channel digital bus delivering audio and remote DC power to Behringer P16-M personal monitor mixers. |
| **Ethernet Remote** | RJ45 | 100 Mbps network jack for remote control via X32-Edit, Mixing Station, OSC, and third-party automation tools. |
| **MIDI In / Out** | 5-Pin DIN | Standard MIDI communication for scene recall, DAW transport automation, and fader tracking. |
| **Expansion Slot** | Proprietary 32x32 Slot | Houses modular digital audio cards: X-USB (factory standard), X-LIVE (SD recording), X-DANTE, X-MADI, or X-WSG. |
| **Phones Out** | 1/4" TRS Stereo | Dual high-current headphone jacks located on the front underside cheeks of the console. |

---

## 6. Front Top-Panel USB Port

The top-panel USB Type-A port serves two vital roles:
1. **2-Track Audio Recorder & Player**: Records uncompressed 16-bit 44.1/48 kHz stereo WAV files directly from any assignable bus (Main LR, matrix, or mix bus), and plays back stereo audio files into Aux 7/8.
2. **System File Transfer**: Saves and loads console configuration files, full Show packages, Scenes, Snippets, channel presets, and executes firmware updates. Drives must be formatted in **FAT32**.

---

## 7. Operational Workflow Rules

- **Preamp Gain is Physical**: Preamp gain belongs to the input hardware jack (local XLR or stagebox), not the channel strip. Re-patching an input moves the preamp control along with it.
- **Save Before Major Reconfiguration**: Always store a complete Scene or Show file onto an external USB drive before re-patching routing blocks or updating firmware.
- **Shielded Network Cables Only**: All AES50 connections between the console and digital stageboxes (S16, S32, DL16, DL32) **must** use shielded CAT5e/CAT6 cables with EtherCON metal shells grounded on both ends to prevent electrostatic discharge (ESD) mutes.
