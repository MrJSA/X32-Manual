# Chapter 06: Channel Processing Architecture

Every input channel on the Behringer X32 and Midas M32 contains a dedicated high-performance processing strip driven by a 40-bit floating-point DSP engine. Each channel includes input polarity inversion, a steep low-cut filter, a flexible gate/expander/ducker, insert routing, a 4-band fully parametric EQ with real-time analysis (RTA), a comprehensive dynamics compressor/limiter with integrated parallel mixing, and bus routing.

This chapter details the channel signal flow, each processing block's controls, and practical tuning recipes for live sound.

---

## 1. Channel Signal Flow Architecture

Understanding the internal signal order is critical when diagnosing why a filter or compressor responds in a particular manner:

| # | Block | Range / options | Notes |
|---|---|---|---|
| 1 | **Input source** | Local XLR, AES50, Card or Aux | |
| 2 | **Analog gain** | -12 to +60 dB | Digital trim instead when Gain Split is active |
| 3 | **Polarity (Ø)** | On / off | 180° electrical phase invert |
| 4 | **Low Cut** | 20–400 Hz, 12 dB/oct | High-pass filter |
| 5 | **Gate / Duck** | Expander 2/3/4, Gate, Ducker | With sidechain key filter |
| — | *Insert point PRE* | Internal FX rack or Aux | Optional |
| 6 | **4-band PEQ** | Low, Lo-Mid, Hi-Mid, High | Low Cut, shelving, PEQ, High Cut |
| 7 | **Dynamics** | Compressor / Limiter / Expander | RMS/Peak, parallel Mix % |
| — | *Insert point POST* | Internal FX rack or Aux | Optional |
| 8 | **Channel mute** | On / off | Effect on pre/post-fader sends is configurable |
| 9 | **100 mm fader** | -∞ to +10 dB | |
| 10 | **Pan / Balance** | | → Main stereo bus (L/R) and Mono / Center bus |
| 11 | **Bus sends** | Mix buses 1–16 | Tap points: In/LC, Pre-EQ, Post-EQ, Pre-Fade, Post-Fade, Subgroup |

> **Note on EQ & Dynamics Order:** The order of the EQ and Dynamics blocks can be swapped. On the **Channel → Config** screen, toggle the **EQ Pre/Post Dyn** setting. Setting Dynamics *before* EQ prevents EQ boosts from pushing the compressor into excessive gain reduction.

---

## 2. Config & Preamp: Low Cut (High-Pass Filter)

The Low Cut filter is an active 12 dB/octave Butterworth high-pass filter adjustable from **20 Hz to 400 Hz**.

### Why Low Cut is Mandatory:
- **Subwoofer Protection**: Stops subsonic stage thumps, mic-stand kicks, and HVAC air conditioning vibrations from reaching subwoofers.
- **Headroom Preservation**: Bass frequencies consume massive amplifier power. Filtering unnecessary low end cleans up total system headroom.
- **Vocal Clarity**: Eliminates vocal plosives ("P" and "B" pops) and mic handling noise.

### Instrument Cutoff Guidelines:

| Source | Recommended Cutoff | Rationale |
|---|---|---|
| **Spoken Word / Pastor** | 120 Hz – 160 Hz | Eliminates chest thump, plosives, and podium mechanical vibration. |
| **Lead / Backing Vocals** | 100 Hz – 140 Hz | Tightens vocals without thinning the chest resonance of the singer. |
| **Acoustic Guitar** | 80 Hz – 100 Hz | Tames boomy body resonance and prevents low-frequency feedback. |
| **Electric Guitar** | 80 Hz – 100 Hz | Cleans up cabinet low-end rumble; leaves room for bass guitar. |
| **Snare Drum** | 80 Hz | Removes bass drum spill from the bottom head without losing snare body. |
| **Drum Toms** | 60 Hz – 80 Hz | Keeps tom sustain focused while eliminating low sub rumble. |
| **Cymbals / Overheads** | 120 Hz – 250 Hz | Overheads should capture brass shimmer, not the kick drum shell. |
| **Bass Guitar** | 30 Hz – 40 Hz | Protects speaker cones from subsonic fundamentals below low B (31 Hz). |
| **Kick Drum** | 25 Hz – 30 Hz | Leaves low-end punch intact while filtering subsonic cone excursion. |
| **Keyboards / Synth** | 40 Hz – 60 Hz | Prevents synth sub-bass patches from muddying live mixes unless intended. |

---

## 3. Gate, Expander & Ducker

The X32 dynamics processor provides five dedicated modes:

| Mode | Ratio | Behavior |
|---|---|---|
| **Expander 2** | 1:2 | Gentle attenuation below the threshold |
| **Expander 3** | 1:3 | Moderate attenuation |
| **Expander 4** | 1:4 | Aggressive attenuation |
| **Gate** | — | Hard mute below the threshold |
| **Duck** | — | Attenuates the signal when the **key input exceeds** the threshold |

### Controls & Parameters:
- **Threshold** (-80 dB to 0 dB): Level at which the processor opens or triggers.
- **Range** (0 dB to 60 dB): Depth of attenuation applied when closed. (Using 12–18 dB range sounds far more musical and transparent than a harsh 60 dB brick-wall mute!).
- **Attack** (0 to 120 ms): Speed at which the gate opens. Use **0 ms** for fast drum transients.
- **Hold** (0.02 ms to 2000 ms): Duration the gate stays fully open after signal drops below threshold. Prevents "chattering" on decaying notes.
- **Release** (5 ms to 4000 ms): Time taken to gently fade down once hold expires.

### Key Filter (Sidechain Filtering):
The gate includes a tunable sidechain filter:
- **Mode**: Low Cut (6/12 dB), High Cut (6/12 dB), or Peaking (Bandpass Q 0.3–10.0).
- **Frequency**: 20 Hz to 20 kHz.
- **Key Source**: Set to `Self` (the channel itself) or pick any other input channel or mix bus.

### Practical Gate Applications:
1. **Snare Bleed Removal on Drum Toms**:
   - Set Gate Mode to **Expander 3** with a **15 dB Range**.
   - Set Key Filter to **Peak** at **120 Hz to 180 Hz** (the resonant pitch of the tom).
   - The gate will now open only when the tom is struck, ignoring loud nearby snare hits and cymbal wash.
2. **Sidechain Ducking Bass with Kick Drum**:
   - Select the **Bass Guitar** channel and open the Gate page.
   - Switch Mode to **DUCK**.
   - Set **Key Source** to the **Kick Drum** channel.
   - Set **Range** to **4 dB to 6 dB**, Attack to **5 ms**, Release to **80 ms**.
   - *Result*: Every time the kick drum strikes, the bass guitar ducks by 5 dB for a fraction of a second. This glues the rhythm section together and creates massive low-end punch without muddy buildup.
3. **Speech / Music Auto-Ducking**:
   - Aux In channels have no gate section (Section 8), so bring the background music into a pair of **regular input channels**: set their source to the Aux In or USB player on the **Config** page. Set Mode to **DUCK** keyed to the Pastor or Announcer microphone. The music automatically dips whenever someone speaks.

---

## 4. 4-Band Parametric Equalizer (PEQ)

Each input channel features a 4-band fully parametric equalizer. Band 1 (Low) and Band 4 (High) can also morph into Shelving or Cut filters.

| Band | Filter types |
|---|---|
| **1 – Low** | Low Cut (12 dB/oct), Low Shelving or Parametric |
| **2 – Lo Mid** | Parametric |
| **3 – Hi Mid** | Parametric |
| **4 – High** | High Cut (12 dB/oct), High Shelving or Parametric |

| Parameter | Range |
|---|---|
| **Frequency** | 20 Hz to 20 kHz (fine 1/3-octave steps) |
| **Gain** | -15.0 dB to +15.0 dB (0.5 dB steps) |
| **Q (bandwidth)** | 0.3 (broad, 2.5 octaves) to 10.0 (surgical, 1/10 octave) |

### Real-Time Analyzer (RTA) Integration:
Press the `VIEW` button on the EQ section. The screen renders a 100-band RTA directly behind the equalizer curve:
- **RTA Mode**: Bar Graph or Spectrograph (waterfall).
- **Tap Point**: Set to **Pre** (shows incoming raw signal) or **Post** (shows signal after your EQ curve has been applied).

### The "Sweep and Destroy" EQ Technique:
To eliminate ringing resonances, feedback frequencies, or nasal tones:
1. Select a parametric mid band (Band 2 or 3).
2. Set Q narrow (**Q = 5.0 to 8.0**) and boost gain by **+9 dB**.
3. Slowly sweep the frequency knob through the spectrum while the performer sings or plays.
4. When the offending frequency screams out painfully, stop sweeping.
5. Invert the gain from +9 dB down to **-3 dB to -6 dB** and broaden the Q slightly (**Q = 2.0 to 3.0**). The offending resonance disappears without gutting the instrument's musicality.

> **Not for ringing out monitors:** a +9 dB boost excites room resonances that would never feed back at show level, so you end up cutting frequencies that were no problem. To find real feedback frequencies, raise the level until the first ring starts and read it off the RTA ([Chapter 15](15_Live_Mixing_Workflows_and_Best_Practices.md)).

### Instrument EQ Cheat Sheet:

| Instrument | Frequency | Move | Why |
|---|---|---|---|
| **Vocals** | 80–140 Hz | Low Cut | Removes plosives and stage rumble |
| | 200–300 Hz | Cut 2–3 dB | Less muddy chest buildup / proximity effect |
| | 1.0–1.5 kHz | Narrow cut | Removes the cheap "megaphone" honk |
| | 3.0–4.0 kHz | Gentle boost | Intelligibility and articulation |
| | 10–12 kHz | High shelf +2 dB | Smooth, airy sheen |
| **Snare** | 80 Hz | Low Cut | |
| | 200–240 Hz | Boost 2–4 dB | Snare "meat" and body |
| | 600–900 Hz | Narrow notch -4 dB | Removes the hollow cardboard ring |
| | 2.5–3.5 kHz | Boost 2–3 dB | Stick snap and attack |
| | 8 kHz | High shelf | Snare wire sizzle |
| **Kick drum** | 30 Hz | Low Cut | |
| | 50–70 Hz | Boost 3 dB | Sub-bass chest thump |
| | 250–400 Hz | Deep cut 4–8 dB | Cleans out muddy boxiness |
| | 3.5–5.0 kHz | Boost 3–5 dB | Beater click that cuts through dense guitars |
| **Electric guitar** | 80 Hz | Low Cut | |
| | 400–500 Hz | Cut 2–3 dB | Removes mud, leaves room for the bass |
| | 2.0–3.5 kHz | Gentle boost | Brings the guitar forward |
| | 6.5 kHz | High Cut | Removes digital amp-modeler fizz |

---

## 5. Dynamics: Compressor, Limiter & Parallel Compression

The channel compressor controls dynamic range, levels erratic performances, and adds sustain or punch.

### Core Parameters:
- **Threshold** (-60 dB to 0 dB): Level where compression starts.
- **Ratio** (1.1:1 to 100:1 / Limiter): Amount of gain reduction applied above threshold.
  - *2:1*: Gentle leveling for acoustic guitars and backing vocals.
  - *3:1 to 4:1*: Standard live vocal and bass guitar compression.
  - *8:1 to 10:1*: Aggressive drum control.
  - *100:1*: Peak brick-wall limiting.
- **Attack** (0 to 120 ms): Time before compression clamps down.
  - *Fast (0–5 ms)*: Catches transient spikes; smoothens vocals.
  - *Slow (20–50 ms)*: Lets the initial stick transient pass through before clamping down, making drums punch harder.
- **Hold** (0 to 2000 ms) & **Release** (10 to 4000 ms): Release time recovery. (Set release to breathe naturally with the song tempo; typically 100–200 ms for vocals).
- **Knee** (0 = Hard Knee to 5 = Soft Knee): Soft knee transitions into compression gradually before the threshold is breached.
- **Detection**: **RMS** (smooth, musical average level detection) vs. **Peak** (ultra-fast transient catching).
- **Make-up Gain** (0 dB to 24 dB): Compensates for lost level caused by gain reduction.

### Integrated Parallel Compression (The MIX Knob):
The X32 features an onboard **MIX (0% to 100%)** parameter inside every channel compressor.
- **100%**: Normal full serial compression.
- **50%**: Blends 50% uncompressed dry transient signal with 50% heavily compressed signal (New York parallel compression).
- *Benefit*: You can crush a snare drum or vocal with a 10:1 ratio and 10 dB of gain reduction, then roll the MIX knob back to **40%**. You get maximum punch, transient clarity, and endless sustain without sounding squeezed or choked.

### Recipe: A Fat Snare
A setting that lengthens the "note" of the shell without choking the stick attack:

| Parameter | Value |
|---|---|
| **Ratio** | 5:1 |
| **Attack** | 20–30 ms |
| **Release** | 80–125 ms |
| **Knee** | 4 (soft) |
| **Gain reduction** | 3–6 dB on a normal backbeat |

- **Why the soft knee:** a set moves between quiet and loud songs. With Knee 4 the compression sets in gradually, so it works on soft passages and on loud backbeats without re-adjusting the threshold.
- **Release shapes the ring:** shorter release brings the shell's sustain up faster; longer release keeps it tighter.
- This only works on a clean signal. If the snare mic is full of hi-hat, the compressor lifts the hi-hat too: fix the mic position first ([Chapter 05](05_Gain_Staging_and_Preamps.md)).

### De-Essing: Dynamic Beats Static
A fixed EQ cut at 4–7 kHz reduces sibilance, but it also dulls every other syllable. A de-esser from the effects rack ([Chapter 09](09_Effects_Rack_and_Plugins.md)) inserted on the vocal channel only turns the band down while an "S" is actually sounding.

---

## 6. Channel Inserts

Every channel can insert one of the 8 internal virtual FX rack processors or an external analog hardware device:
1. Navigate to **Channel → Config**.
2. Set **Insert**: Select `FX 1L` through `FX 8R` or physical `Aux 1` through `Aux 6`.
3. Set **Insert Position**:
   - **PRE**: Inserted before EQ and Dynamics.
   - **POST**: Inserted after EQ and Dynamics.
4. Toggle the illuminated **INSERT ON** button to engage the processor.

---

## 7. Stereo Channel Linking

Odd and even channel pairs (e.g., 1+2, 3+4, 15+16) can be linked into a unified stereo channel:
1. Select an odd channel (e.g., Channel 1).
2. On the **Config** screen, press the **Link** encoder and confirm `YES`.
3. Both scribble strips update to show linked brackets.
4. **Link Behavior**: Faders, mutes, EQ, dynamics, and preamp gains move in unison.
5. **Pan Independence**: Channel pans are automatically unlinked and mirrored (Channel 1 hard Left, Channel 2 hard Right) to preserve true stereo imaging. Configure link rules under **SETUP → CONFIG → Link Preferences**.

---

## 8. Aux In Channels & FX Returns: Reduced Processing

Everything above describes input channels **1–32**. The 8 Aux In channels (Aux 1–6 plus USB L/R) and the FX returns are lighter strips:

| Block | Channels 1–32 | Aux In 1–8 | FX Returns 1–4 (L/R) |
|---|---|---|---|
| **Gain / trim** | ✔ | ✔ | — |
| **Polarity** | ✔ | ✔ | — |
| **Low Cut** | ✔ | — | — |
| **Input delay** | ✔ | — | — |
| **Gate / ducker** | ✔ | — | — |
| **Insert** | ✔ | — | — |
| **4-band EQ** | ✔ | ✔ | ✔ |
| **Compressor** | ✔ | — | — |
| **Bus sends, pan, fader, mute** | ✔ | ✔ | ✔ |

What this means in practice:
- **Low cut on an aux channel:** switch EQ band 1 to **Low Cut**.
- **Anything that needs dynamics, a gate, an insert or delay** (a keyboard that needs compression, music that should duck under speech, a playback track that must be time-aligned) belongs on a regular channel. A channel's source on the **Config** page can be an Aux In or the USB player, so the jack on the rear panel doesn't have to change.
- Plan the input list accordingly: Aux Ins are ideal for walk-in music, click and talkback returns, and other sources that need level and EQ only.
