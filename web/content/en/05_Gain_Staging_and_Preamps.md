# Chapter 05: Gain Staging, Preamps & Headamps

Gain staging is the foundational step of all live sound and studio engineering. On digital consoles like the Behringer X32 and Midas M32, proper gain staging ensures the lowest possible noise floor, preserves dynamic range, and prevents catastrophic digital clipping.

This chapter details analog headamps versus digital trim, digital metering calibration, phantom power protocols, polarity alignment, gain sharing across AES50, and Gain Split configuration.

---

## 1. Analog Headamp vs. Digital Trim

The X32 features two distinct gain controls in its signal chain:

```
[Physical XLR Input]
        │
        ▼
┌─────────────────────────┐
│   ANALOG HEADAMP        │  -12 dB to +60 dB (0.5 dB steps)
│   (Midas Designed)      │  Controls analog voltage before A/D conversion
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   A/D CONVERTER (Cirrus)│  24-bit, 114 dB dynamic range
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   DIGITAL TRIM          │  -18 dB to +18 dB (0.25 dB steps)
│   (DSP Processing)      │  Digital multiplication inside 40-bit DSP engine
└───────────┬─────────────┘
            │
            ▼
   [Low Cut / Gate / EQ / Dyn / Fader]
```

### Key Distinctions:

| Attribute | Analog Headamp (Preamp) | Digital Trim |
|---|---|---|
| **Location** | Analog circuitry before A/D converter | Digital signal processor after A/D converter |
| **Adjustment Range** | -12.0 dB to +60.0 dB | -18.0 dB to +18.0 dB |
| **Impact on Noise** | Critical: sets signal-to-noise ratio (SNR) | Alters digital volume; also boosts digital noise floor |
| **Hardware Tie** | Tied permanently to the **physical input jack** | Tied to the **console channel strip** |
| **Multiple Channels** | Shared if multiple channels patch the same input | Independent per channel, even when sharing inputs |

> **Crucial Concept:** Preamp gain belongs to the **physical socket** (Local XLR 1–32 or Stagebox AES50 1–48), *not* to the mixer channel. If Channel 1 and Channel 17 are both routed from Local In 1, adjusting the analog headamp on Channel 1 changes the input level for Channel 17 as well.

---

## 2. Digital Metering & The -18 dBFS Target

Unlike analog consoles where nominal operating level sits at `0 VU` (+4 dBu) with +18 to +24 dB of analog headroom before soft saturation occurs, digital systems have a hard brick-wall ceiling at **0 dBFS (decibels Full Scale)**. Exceeding 0 dBFS results in unrecoverable digital square-wave clipping distortion.

### Digital Metering Reference Scale:

```
  0 dBFS ─── [CLIP]  ◄── Hard Digital Clipping! (Catastrophic distortion)
 -6 dBFS ─── [-6]    ◄── Maximum Safe Transient Peak Ceiling
-12 dBFS ─── [-12]   ◄── Normal Peak Operating Range (Yellow LED)
-18 dBFS ─── [-18]   ◄── Nominal Target Level (= 0 VU / +4 dBu) (Top of Green)
-30 dBFS ─── [-30]   ◄── Normal Sustained Level
-60 dBFS ─── [-60]   ◄── Signal Present Threshold
```

### The Gain Staging Golden Rules:
1. **Nominal RMS Level**: Calibrate the preamp so sustained singing or playing averages around **-18 dBFS** (solid green lighting up the -18 dB LED).
2. **Dynamic Peak Transients**: Allow peak transients (kick beater snap, snare hits, vocal screams) to bounce between **-12 dBFS and -6 dBFS**.
3. **Never Touch the Red CLIP Indicator**: If the red Clip LED flashes even once, immediately reduce analog headamp gain by 4 to 6 dB.

---

## 3. Step-by-Step Preamp Gain Setting Procedure

Follow this exact sequence during line check and soundcheck:

1. **Solo the Channel**: Press the channel's `SOLO` button. Ensure Solo is set to **PFL (Pre-Fader Listen)** in the Monitor menu so you view the raw input level on the master meters without fader influence.
2. **Flatten Fader & Processing**: Keep the channel fader at -∞ (down) so the audience and musicians are not blasted with unexpected volume during line check. Leave EQ and Compressor bypassed initially.
3. **Instruct the Performer**: Have the musician play or sing at their **maximum realistic performance intensity** (not a timid check).
4. **Adjust Analog Gain**: Turn the physical `GAIN` rotary knob in the top-left channel strip until the meter consistently bounces around **-18 dBFS**, with the loudest transients peaking at **-12 dBFS to -8 dBFS**.
5. **Engage Low Cut (HPF)**: Immediately engage the `LOW CUT` filter to eliminate subsonic stage vibrations and handling rumble before they hit your dynamics processor.

---

## 4. Phantom Power (+48V) Protocol & Safety

The console can supply +48V DC phantom power individually to each of its 32 physical XLR inputs and connected AES50 stageboxes.

### When to Engage +48V:
- **Condenser Microphones**: Studio vocals, pencil condensers, drum overheads, boundary mics.
- **Active Direct Injection (DI) Boxes**: Active DIs requiring external DC power.
- **Active Ribbon Microphones**: Modern active ribbons equipped with onboard preamps.

### When to Leave +48V OFF:
- **Dynamic Microphones**: Shure SM58, Beta 57A, Sennheiser e935 (will tolerate phantom power if wired properly, but completely unnecessary).
- **Passive Ribbon Microphones**: Phantom power can permanently stretch, bow, or destroy delicate passive aluminum ribbons if patched through a patchbay or faulty cable.
- **Line-Level Devices & Electronic Instruments**: Keyboards, DJ mixers, laptop soundcards, and guitar modelers. Applying +48V to consumer audio outputs can destroy output coupling capacitors.

> **Safety Warning:** Always **mute the channel** before activating or deactivating +48V. Switching phantom power on a live channel discharges high DC voltages through the preamps, causing a deafening transient pop that can destroy high-frequency compression drivers and damage hearing.

---

## 5. Polarity Inversion (180° Phase Flip)

The polarity toggle button (`Ø`) inverts the electrical phase of the audio signal by 180 degrees. This is essential when multiple microphones capture the same acoustic source from opposite directions or differing distances.

### Standard Polarity Correction Scenarios:

```
[Snare Top Mic] ──► Downward diaphragm movement creates Positive (+) electrical pulse
       │
   [Snare Drum Head]
       │
[Snare Bottom Mic] ◄── Downward diaphragm movement creates Negative (-) electrical pulse
                       ► INVERT POLARITY (Ø ON) to bring both microphones in phase!
```

1. **Snare Top & Snare Bottom**:
   - The top mic diaphragm moves inward when struck, generating positive voltage.
   - The bottom mic diaphragm moves outward away from the shell, generating negative voltage.
   - Without polarity inversion, their low frequencies cancel out, producing a thin, hollow "cardboard" snare tone. Flip polarity on the **bottom mic**.
2. **Kick Drum In & Out / Subkick**:
   - Dual kick microphones placed inside and outside the sound hole often exhibit acoustic phase cancellation around 60–100 Hz. Listen to both together, flip polarity on one, and choose the setting with the punchiest, fullest bass response.
3. **Bass Guitar DI & Bass Amp Mic**:
   - The direct DI box signal arrives instantaneously at the mixer (speed of light in copper), whereas the amplifier mic experiences acoustic air delay (speed of sound ~1 ms per foot). Inverting polarity or applying input delay aligns the two signals.
4. **Coincident Acoustic Guitar Mics**:
   - Combining an internal undersaddle piezo pickup with an external condenser microphone frequently creates comb filtering. Inverting one channel often restores acoustic warmth.

---

## 6. Multi-Console AES50 Gain Sharing & HA Remote

In modern production environments, a single set of stageboxes (e.g., Behringer S32 or Midas DL32) is routinely shared between two or three consoles (Front of House, Monitors, and Broadcast):

```
┌──────────────┐          AES50 (Port A)          ┌───────────────────┐
│ STAGEBOX     ├─────────────────────────────────►│ FOH CONSOLE       │
│ S32 / DL32   │                                  │ (Clock: MASTER)   │
└──────────────┘                                  │ (HA Remote: Active│
                                                  └─────────┬─────────┘
                                                            │ AES50 (Port B)
                                                            ▼
                                                  ┌───────────────────┐
                                                  │ MONITOR CONSOLE   │
                                                  │ (Clock: SLAVE)    │
                                                  │ (Digital Trim)    │
                                                  └───────────────────┘
```

### The Gain Conflict Problem:
If the Front of House engineer turns up a microphone's analog headamp by 6 dB during the middle of the concert, that same microphone will immediately jump by 6 dB in the monitor engineer's in-ear mixes, potentially deafening the performer and causing catastrophic monitor feedback.

### The Solution: Preamps Menu & HA Remote:
1. Navigate to **SETUP → PREAMPS**.
2. Designate one console as the **Preamps Master** (typically the Monitor console, or FOH).
3. The other console is set to receive the digital stream without headamp ownership. Under **HA Remote**, designate which AES50 port is permitted to manipulate analog headamps.

---

## 7. HA Gain Split Mode (Independent Digital Trim)

Firmware 4.x introduces the **HA Gain Split** mode, providing complete digital gain independence for every console on the network.

### How to Configure HA Gain Split:
1. Complete soundcheck line checks and establish healthy analog headamp levels on all physical inputs.
2. Press the **SETUP** button and page right to the **Preamps** tab.
3. Use the first encoder to toggle **HA Gain Split** to **ON**.

```
┌─────────────────────────────────────────────────────────────┐
│ SETUP ──► [PREAMPS]                                         │
│                                                             │
│   [HA Gain Split: ON] ◄── Lock Analog Headamps              │
│                                                             │
│   All Channel Strips switch to:                             │
│   DIGITAL TRIM: -18.0 dB ... +18.0 dB (0.25 dB steps)       │
└─────────────────────────────────────────────────────────────┘
```

### What Happens When Gain Split is Enabled:
- The standard `GAIN` rotary knob on every channel strip instantly transforms into a **Digital Trim knob (-18 dB to +18 dB)**.
- Adjusting channel trim only alters digital DSP multiplication for that specific console channel; it does **not** change the analog preamp level or affect any other console sharing the AES50 stream.
- The physical analog headamp gains are locked in place. If an analog gain change is genuinely required during the performance, it can still be accessed via the **SETUP → PREAMPS** menu page.
