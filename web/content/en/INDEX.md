# Behringer X32 / Midas M32 Comprehensive Field Guide

A complete, practical, and in-depth reference manual for configuring, routing, processing, and mixing on the Behringer X32 and Midas M32 digital mixing consoles (Firmware 4.x).

---

## Guide Table of Contents

| Chapter | Title | Focus & Core Topics |
|---|---|---|
| **[01](01_Hardware_Overview_and_Surface_Anatomy.md)** | **[Hardware Overview & Surface Anatomy](01_Hardware_Overview_and_Surface_Anatomy.md)** | Surface layout, fader banks, channel strip anatomy, 7" screen navigation, scribble strips, and rear connectivity. |
| **[02](02_Stageboxes_and_AES50_Networking.md)** | **[Digital Snakes, Stageboxes & AES50 Networks](02_Stageboxes_and_AES50_Networking.md)** | SuperMAC AES50 protocol, S16/S32/SD/DL stageboxes, shielded cable requirements, clocking, and cascading multiple units. |
| **[03](03_Routing_and_Patching.md)** | **[Routing, Patching & Signal Distribution](03_Routing_and_Patching.md)** | Input blocks of 8, tap point selection, XLR Out, Aux Out, Ultranet, Card Out, and standard stage routing recipes. |
| **[04](04_Firmware_4x_User_Routing.md)** | **[Firmware 4.x User Routing (1:1 Patching)](04_Firmware_4x_User_Routing.md)** | Breaking free of 8-channel blocks with User In and User Out 1:1 flexible patching, wireless mic racks, and custom routing. |
| **[05](05_Gain_Staging_and_Preamps.md)** | **[Gain Staging, Preamps & Headamps](05_Gain_Staging_and_Preamps.md)** | Analog headamp vs digital trim, +48V phantom power, polarity, gain splitting, and multi-console headamp sharing. |
| **[06](06_Channel_Processing.md)** | **[Channel Processing Architecture](06_Channel_Processing.md)** | Low Cut (HPF), Gate / Expander / Ducker, 4-band Parametric EQ, Compressor / Limiter, parallel compression, and inserts. |
| **[07](07_Mixing_Buses_and_Sends.md)** | **[Mix Buses, Sends-on-Faders & Matrices](07_Mixing_Buses_and_Sends.md)** | 16 Mix Buses, tap points, floor monitors vs IEMs, Sends-on-Faders workflow, audio subgroups, and the 6 Matrix mixes. |
| **[08](08_DCA_and_Mute_Groups.md)** | **[DCAs, Mute Groups & Fader Management](08_DCA_and_Mute_Groups.md)** | Digitally Controlled Amplifiers vs Subgroups, DCA pre/post fader behavior, DCA Spill, and 6 master Mute Groups. |
| **[09](09_Effects_Rack_and_Plugins.md)** | **[Virtual Effects Rack & Processors](09_Effects_Rack_and_Plugins.md)** | 8-slot virtual rack, send vs insert effects, vintage compressors (1176, LA-2A, Fairchild), Pultec EQs, delays, reverbs, and enhancers. |
| **[10](10_Monitoring_Talkback_and_Utilities.md)** | **[Monitoring, Solo, Talkback & Utilities](10_Monitoring_Talkback_and_Utilities.md)** | Control Room & Headphones, AFL/PFL solo modes, Talkback A/B destination matrix, oscillator, and Dan Dugan automixer. |
| **[11](11_Personal_Monitoring_DP48_and_P16.md)** | **[Personal Monitoring: Ultranet P16 & Midas DP48](11_Personal_Monitoring_DP48_and_P16.md)** | Ultranet Powerplay P16 distribution, 16-channel patch strategies, and Midas DP48 dual 48-channel monitor integration over AES50. |
| **[12](12_Scenes_Cues_and_Snippets.md)** | **[Scenes, Cues, Snippets & Show Control](12_Scenes_Cues_and_Snippets.md)** | The show control hierarchy, full scene snapshots, targeted snippets, Parameter Safes, Channel Safes, and MIDI recall. |
| **[13](13_Recording_and_Expansion_Cards.md)** | **[Recording, Playback & Expansion Cards](13_Recording_and_Expansion_Cards.md)** | Top-panel 2-track USB recorder, 32x32 X-USB interface, X-LIVE standalone dual SD card recording, and Dante expansion. |
| **[14](14_Network_Remote_Control_and_Software.md)** | **[Network Setup, Remote Control & Software](14_Network_Remote_Control_and_Software.md)** | Network configuration (Static vs DHCP), Wi-Fi router setup, X32-Edit, Mixing Station app customization, and OSC remote control. |
| **[15](15_Live_Mixing_Workflows_and_Best_Practices.md)** | **[Live Mixing Workflows & System Tuning](15_Live_Mixing_Workflows_and_Best_Practices.md)** | Step-by-step soundcheck checklist, virtual soundcheck, aux-fed subs, feedback elimination, and broadcast streaming setup. |

---

## How to Use This Guide

- **Console Architecture**: The X32 processes **40 total input channels** (32 mic/line channels + 8 aux channels: Aux In 1–6 plus the 2 USB player channels; the 8 stereo FX returns come on top), **25 mix buses** (16 mix buses + 6 matrix buses + Main LCR), and **8 stereo virtual FX processors**.
- **Cross-Platform Compatibility**: All parameter values, routing paths, and workflows in this guide apply equally to the **Behringer X32 (Full Console)**, **X32 Compact**, **X32 Producer**, **X32 Rack**, **X32 Core**, and the **Midas M32 / M32R** series running firmware 4.0 or newer.
- **Signal Flow Rule of Thumb**: Preamp Gain belongs to the **physical input connector**, while digital trim, processing, and fader levels belong to the **console channel strip**. Keep physical source assignments clean and structured to avoid confusion during live events.

