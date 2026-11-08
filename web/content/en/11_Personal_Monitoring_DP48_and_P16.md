# Chapter 11: Personal Monitoring: Ultranet P16 & Midas DP48

Personal monitoring systems empower musicians on stage to create and control their own customized in-ear mixes without requiring the Front of House engineer's attention. The Behringer X32 and Midas M32 natively support two industry-standard digital personal monitoring architectures: the **Behringer Powerplay P16** (via Ultranet) and the **Midas DP48** (via AES50).

This chapter details the Ultranet protocol, P16 patching strategies, the "16-channel squeeze" technique, and Midas DP48 dual-mix integration.

---

## 1. The Ultranet Powerplay P16 System

The proprietary **Ultranet** digital audio bus carries 16 channels of uncompressed 24-bit 48 kHz digital audio over standard Cat5e cable:

| Link | From | To | Carries |
|---|---|---|---|
| **1** | Console **Ultranet out** (EtherCON / RJ45) | P16-D distribution hub | 16 channels, shielded Cat5e |
| **2** | P16-D hub | One P16-M personal mixer per musician (drummer, bass player, lead singer, keyboardist, …) | Audio **and** power over Cat5e |

### The P16-M Personal Mixer Hardware:
- **16 Channel Select Buttons**: Individual volume, stereo panning, solo, and mute per channel.
- **3-Band EQ with Sweepable Mid**: Independent tone shaping on every channel without affecting FOH.
- **Master Brick-Wall Limiter**: Built-in peak limiter dedicated to protecting the performer's hearing.

---

## 2. Ultranet Output Routing & Optimal Tap Points

Navigate to **ROUTING → ULTRANET** to configure the 16 P16 channels:

| Setting | Allowed values |
|---|---|
| **Source** | Channel, mix bus, matrix, direct out or main |
| **Tap point** | **Post-EQ** or **Pre-Fader** — never Post-Fader |

### The Tap Point Rule for Personal Mixers:
- **Never use Post-Fader**: If Ultranet taps are set to Post-Fader, every time the FOH engineer adjusts a fader in the house mix, the musician's in-ear level shifts erratically.
- **Use Pre-Fader or Post-EQ**: Delivers clean, finished tone with channel EQ intact, while isolating the performer from FOH volume adjustments.

---

## 3. The "16-Channel Squeeze" Strategy

A full band often exceeds 24 to 32 inputs. Fitting a complex lineup into the 16 slots of the P16 requires smart consolidation:

| P16 ch | Signal | Routing |
|---|---|---|
| **01** | Kick drum | Direct out (Ch 1) |
| **02** | Snare drum | Direct out (Ch 2) |
| **03** | Drum stem (toms / overheads) | Mix bus 11 (summed subgroup) |
| **04** | Bass guitar | Direct out (Ch 4) |
| **05** | Electric guitar 1 | Direct out (Ch 5) |
| **06** | Electric guitar 2 | Direct out (Ch 6) |
| **07** | Acoustic guitar | Direct out (Ch 7) |
| **08** | Keyboards / piano | Mix bus 12 (stereo / mono sum) |
| **09** | Click & guide cues | Direct out (Aux In / Ch 9) |
| **10** | Backing tracks | Mix bus 13 (stereo sum) |
| **11** | Lead vocal 1 | Direct out (Ch 16) |
| **12** | Lead vocal 2 / guest | Direct out (Ch 17) |
| **13** | Backing vocals stem | Mix bus 14 (summed subgroup) |
| **14** | Pastor / MC speech | Direct out (Ch 32) |
| **15** | Stage ambient mics | Direct out (crowd mic, Ch 30) |
| **16** | Vocal reverb return | Direct out (FX 1L return) |

### Why Include Stage Ambient Microphones (P16 Ch 15)?
When performers switch to sealed molded in-ear monitors (IEMs), they are isolated from acoustic room reflections. They cannot hear the congregation singing, audience applause, or spoken comments between songs, leading to a claustrophobic feeling.
- Place two condenser microphones on stage pointing out toward the audience.
- Route them **only** to P16 Channel 15 (never route them to Main LR!).
- Musicians can dial in just enough audience ambiance to feel naturally connected to the room.

---

## 4. Midas DP48 Dual 48-Channel Personal Mixer

The **Midas DP48** represents a quantum leap beyond the P16, operating over **AES50** rather than Ultranet:

| Feature | Details |
|---|---|
| **48 channels** | Over AES50 (Cat5e) |
| **Two independent mixes** | Mix A and Mix B: two performers (e.g. drummer and bassist) share **one** DP48, each with their own 1/4" and 3.5 mm stereo outputs |
| **12 stereo groups** | Channels are grouped onto 12 faders |
| **Built-in stereo ambient mic** | Blends room sound straight into the mix |
| **SD card recorder** | Records rehearsal stems |

### Connecting DP48 to the X32 / M32:
1. Connect a shielded Cat5e cable from console **AES50 Port B** to the DP48 input (or daisy-chain through stageboxes).
2. On the console, navigate to **ROUTING → AES50 B OUT**.
3. Send the desired channel blocks (Channels 1–32 and Buses 1–16) across AES50 B 1–48.
4. On the DP48, assign channels to the **12 Groups** (e.g., Group 1 = Drums, Group 2 = Bass, Group 3 = Guitars, Group 4 = Vocals).
5. Performers use the rotary encoders and high-contrast color screen to balance their IEM mixes with full stereo panning, EQ, reverb, and limiting per group.
