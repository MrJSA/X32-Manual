# Chapter 05: Gain Staging, Preamps & Headamps

Gain staging is the foundational step of all live sound and studio engineering. On digital consoles like the Behringer X32 and Midas M32, proper gain staging ensures the lowest possible noise floor, preserves dynamic range, and prevents catastrophic digital clipping.

This chapter details analog headamps versus digital trim, digital metering calibration, phantom power protocols, polarity alignment, gain sharing across AES50, and Gain Split configuration. The last two sections cover what happens before the XLR socket: balanced lines, DI boxes and microphone placement.

---

## 1. Analog Headamp vs. Digital Trim

The X32 features two distinct gain controls in its signal chain:

| Stage | Range | What it does |
|---|---|---|
| **1. Physical XLR input** | — | The microphone or line signal arrives |
| **2. Analog headamp** (Midas design) | -12 dB to +60 dB, 0.5 dB steps | Sets the analog level **before** the A/D converter |
| **3. A/D converter** (Cirrus) | 24-bit, 114 dB dynamic range | Converts to digital |
| **4. Digital trim** | -18 dB to +18 dB, 0.25 dB steps | Digital gain inside the 40-bit DSP |
| **5. Processing** | — | Low Cut → Gate → EQ → Dynamics → Fader |

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

| Meter LED | Level | Meaning |
|---|---|---|
| **CLIP** | 0 dBFS | Hard digital clipping — distortion, never go here |
| **-6** | -6 dBFS | Highest safe level for transient peaks |
| **-12** | -12 dBFS | Normal peak range |
| **-18** | -18 dBFS | **Nominal target** (= 0 VU / +4 dBu), the first yellow LED |
| **-30** | -30 dBFS | Normal sustained level |
| **-60** | -60 dBFS | Signal present |

### The Gain Staging Golden Rules:
1. **Nominal RMS Level**: Calibrate the preamp so sustained singing or playing averages around **-18 dBFS** (lighting up the -18 dB LED, the first yellow LED).
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

| Microphone | When the drum head moves down | Polarity setting |
|---|---|---|
| **Snare top** | Diaphragm is pushed in → **positive** voltage | Normal |
| **Snare bottom** | Diaphragm is pulled out → **negative** voltage | **Invert (Ø on)** so both mics are in phase |

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

### Polarity Is Not Time Alignment
The `Ø` button swaps the positive and negative half of the waveform. It has no notion of time. It fully fixes a problem only when two signals arrive **at the same moment** but mirrored, like snare top and bottom.

When two signals arrive a few milliseconds apart (a DI and a miked amp, a close mic and an overhead, or two loudspeakers), the result is **comb filtering**: some frequencies cancel and others add up, depending on the delay. Flipping polarity only moves the notches to other frequencies. The real fix is to delay the earlier signal:

- **Input delay**: channels 1–32 each have a delay on the **Config** page (up to 500 ms). Delay the DI until it lines up with the amp microphone. Sound travels about 34 cm (1.1 ft) per millisecond, so a mic 30 cm in front of a speaker needs roughly 1 ms on the DI channel.
- **Output delay**: mix buses, matrices and the main bus have their own delay for aligning loudspeakers ([Chapter 07](07_Mixing_Buses_and_Sends.md), [Chapter 15](15_Live_Mixing_Workflows_and_Best_Practices.md)).

Set the delay first, then try both polarity settings and keep the fuller one.

---

## 6. Multi-Console AES50 Gain Sharing & HA Remote

In modern production environments, a single set of stageboxes (e.g., Behringer S32 or Midas DL32) is routinely shared between two or three consoles (Front of House, Monitors, and Broadcast):

| Device | Connected to | Clock | Preamp control |
|---|---|---|---|
| **Stagebox (S32 / DL32)** | FOH console, AES50 Port A | — | Controlled remotely |
| **FOH console** | Stagebox (Port A), monitor console (Port B) | **Master** | **HA Remote active** — owns the analog headamps |
| **Monitor console** | FOH console, AES50 | Slave | Digital trim only |

### The Gain Conflict Problem:
If the Front of House engineer turns up a microphone's analog headamp by 6 dB during the middle of the concert, that same microphone will immediately jump by 6 dB in the monitor engineer's in-ear mixes, potentially deafening the performer and causing catastrophic monitor feedback.

### The Solution: Remote HA Control (SETUP → GLOBAL):
1. Navigate to **SETUP → GLOBAL**.
2. Designate one console as the **Preamps Master** (typically the Monitor console, or FOH).
3. The other console is set to receive the digital stream without headamp ownership. In the global options, select the AES50 port whose console is permitted to manipulate the analog headamps (e.g. **AES50 Port A**) and confirm **Enable HA** — local preamp settings are overwritten by the controlling console.

---

## 7. HA Gain Split Mode (Independent Digital Trim)

Firmware 4.x introduces the **HA Gain Split** mode, providing complete digital gain independence for every console on the network.

### How to Configure HA Gain Split:
1. Complete soundcheck line checks and establish healthy analog headamp levels on all physical inputs.
2. Press the **SETUP** button and open the **Global** tab (the same page that holds the remote HA setting).
3. Switch **HA Gain Split** to **ON**.

| Setting | Where | Result |
|---|---|---|
| **HA Gain Split: ON** | SETUP → **Global** | The analog headamps are locked |
| **Channel gain knobs** | Every channel strip | Now control **digital trim**, -18.0 dB to +18.0 dB in 0.25 dB steps |

### What Happens When Gain Split is Enabled:
- The standard `GAIN` rotary knob on every channel strip instantly transforms into a **Digital Trim knob (-18 dB to +18 dB)**.
- Adjusting channel trim only alters digital DSP multiplication for that specific console channel; it does **not** change the analog preamp level or affect any other console sharing the AES50 stream.
- The physical analog headamp gains are locked in place. If an analog gain change is genuinely required during the performance, it can still be accessed via the **SETUP → PREAMPS** menu page.

---

## 8. Before the Preamp: Balanced Lines & DI Boxes

Gain staging can only preserve what arrives at the XLR socket. Two things decide that on stage: how the signal travels down the cable, and whether the instrument sees the load it needs.

### Balanced vs. Unbalanced

| Connection | Conductors | Behavior on long runs |
|---|---|---|
| **Unbalanced** (1/4" TS instrument cable, RCA) | Signal + ground | Hum and interference land directly on the signal. Keep runs short (a few meters) |
| **Balanced** (XLR, 1/4" TRS) | Signal +, signal − (inverted copy), ground | The input subtracts the two signal wires. Interference picked up equally on both cancels; the audio remains |

> **The stereo-cable trap:** a 1/4" TRS plug from a headphone, phone or laptop output is **not** balanced. It carries **left on the tip and right on the ring**. Plug it into one balanced input (for example a single Aux In jack) and the input subtracts right from left: everything panned to the center (lead vocal, kick, bass) nearly disappears and only a thin, wide residue is left. Use a Y-cable (stereo TRS to two mono plugs) into **two** inputs, the RCA jacks of Aux In 5/6, or a stereo DI box.

### What a DI Box Does
A DI box solves two problems at once: it turns an unbalanced instrument signal into a balanced, mic-level one for the long run to the stagebox, and it presents the instrument with a **high input impedance**.

Passive pickups, and piezo pickups in particular, need a load of **1 MΩ or more** to deliver their full frequency range and dynamics. A mic preamp input is in the low kilohm range (about 10 kΩ on the X32's XLR inputs). Connected directly, the pickup's output collapses under that load and the instrument sounds thin and lifeless.

### Active or Passive? Use the Opposite of the Instrument

| Instrument | DI box | Why |
|---|---|---|
| **Passive** electronics: passive bass, electric guitar, acoustic guitar with piezo pickup and no preamp | **Active DI** (powered by +48V or a battery) | Its buffer provides the ≥ 1 MΩ input the pickup needs |
| **Active** electronics with a strong output: keyboards, stage pianos, active basses, laptops, modelers | **Passive DI** (transformer, no power needed) | The transformer takes high levels without clipping, saturates gently on peaks, and isolates the grounds |

Active DIs are the usual reason for switching +48V on for a DI channel (Section 4).

### Cheap Pads Can Eat the Low End
The quality of a passive DI matters more than its simple circuit suggests. A published measurement of a budget passive DI showed that its 20 dB **pad** did not attenuate evenly. It behaved like a first-order high-pass filter at about 840 Hz:

| Frequency | Level with the pad engaged |
|---|---|
| 5 kHz | about -5 dB |
| 1 kHz | about -8 dB |
| 125 Hz | about -18 dB |
| 30 Hz | about -30 dB |
| 20 Hz | about -32 dB |

The whole bottom octave of a bass or piano was gone before the signal reached the preamp, and no amount of console EQ brings it back cleanly. With the pad off, the same box measured fairly flat; well-built DI boxes stayed flat from 20 Hz to 20 kHz with the pad on or off.

- If a DI'd bass or keyboard sounds thin for no obvious reason, **switch the pad off** and lower the instrument's output or the preamp gain instead. The X32 headamp goes down to -12 dB.
- Check unknown DI boxes before the show: send the oscillator's pink noise ([Chapter 10](10_Monitoring_Talkback_and_Utilities.md)) through the DI and compare pad on and pad off on the RTA.

### Hum: Ground Lift, Never the Mains Earth
A steady low hum at **50 Hz** (Europe) or **60 Hz** (North America) plus its harmonics usually means a ground loop: the instrument amp or power supply on stage and the console are grounded at two different points.

- **Fix:** press the DI box's **Ground Lift** switch. It opens the ground connection between the DI's input and output while the audio keeps passing.

> **Danger:** never remove or tape over the earth pin of a mains plug, and never use a "ground cheater" adapter to stop hum. Without the protective earth, a fault can put full mains voltage on an instrument or microphone body. The ground lift on the DI box is the only safe switch for this job.

---

## 9. Stage Microphone Placement: Separation Before Processing

Gates and compressors can only work musically when the microphone already delivers more of the wanted source than of its neighbors. A compressor raises whatever spill it is given. Good placement uses the **null** of the polar pattern, the angle where the microphone is least sensitive (see also the wedge table in [Chapter 15](15_Live_Mixing_Workflows_and_Best_Practices.md)).

### Snare Top and Bottom

| Position | Typical microphone | Placement |
|---|---|---|
| **Top** | Dynamic cardioid or supercardioid (e.g. SM57, Beta 57A) | Bring it in **between the hi-hat and the first rack tom**, so both sit in the mic's least sensitive angles. That removes much of the hi-hat spill before any gate is involved |
| **Bottom** | Small-diaphragm condenser (finer snare-wire detail) or a clip-on dynamic | About 4 cm (1.5") in from the rim, 3–5 cm (1–2") below the head, and 10–12 cm (4–5") away from the snare wires so their air blast doesn't hit the capsule. Invert its polarity (Section 5) |

The matching compressor settings are in [Chapter 06](06_Channel_Processing.md).

### Small Drum Setups
When channels, time or stage space are short (in-ear rigs on an X32 Rack, small stages, festival changeovers):

- **Kick + snare + one kit mic**: a single cardioid placed centrally over the kick drum, just above the beater side and aimed at the snare, captures a balanced picture of the whole kit. With kick and snare spot mics it covers a full drum sound on three channels. In a larger setup the same position works as a heavily compressed "crush" mic blended under the close mics.
- **Underheads on loud stages**: overheads placed high above the kit pick up a lot of guitar amps and wedges. Mounting the mics **below** the cymbals, angled slightly in toward the kit, improves the ratio of drums to stage noise considerably. With few channels, leave the low cut on these mics low so they also carry the body of the kit in the in-ear mix.
- **Cajon**: a dynamic at the rear sound hole for the bass, a condenser on the front playing surface, plus light compression and a little reverb, comes surprisingly close to a full kit in the ears.

### Acoustic Guitar on Stage
Use **one** cardioid or supercardioid microphone, not a studio-style pair: two mics on a moving player comb-filter against each other with every movement. Combine it with a low cut at 80–100 Hz to keep low-frequency feedback under control.
