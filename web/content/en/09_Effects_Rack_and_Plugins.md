# Chapter 09: Virtual Effects Rack & Processors

The Behringer X32 and Midas M32 feature an internal **8-slot virtual 19" effects rack** powered by dedicated 40-bit DSP. The console eliminates the need for bulky outboard gear by faithfully modeling legendary vintage analog hardware—including UREI 1176, Teletronix LA-2A, Fairchild 670, Pultec EQP-1A / MEQ-5, SPL Transient Designer, BBE Sonic Maximizer, EMT 250, and 31-band true-response graphic equalizers.

This chapter details the rack architecture, send-versus-insert signal flow, in-depth parameter analysis for all 30+ virtual processors, and practical mixing workflows.

---

## 1. Virtual Rack Architecture & Routing Modes

The 8 FX slots operate under specific architectural rules:

| FX slots | Can be used as | Typical processors |
|---|---|---|
| **1–4** (dual purpose) | **Send / return** — fed from mix buses 13–16, returning on the FX 1–4 return faders | Reverbs, delays, modulation |
| | **Insert** — directly on channels, mix buses, matrices or Main LR | Any insert effect |
| **5–8** (insert only) | **Insert** on channels, buses, matrices or Main LR | Graphic EQs, vintage compressors, Pultec EQs, de-essers, enhancers |

### The Two Signal Workflows:

| Workflow | Signal path | What you control |
|---|---|---|
| **A. Send / return** (time-based effects) | Channel fader → Mix Bus 13 (post-fader send) → FX slot 1 (reverb) → FX 1 return fader (Aux/FX layer) | The return fader sets the overall reverb level in Main LR |
| **B. Insert** (dynamics & tone shapers) | Channel in → Low Cut → Gate → **insert point: FX 5 (1176)** → EQ → Fader | 100 % of the channel passes through the processor in series |

To insert an effect: select the channel or bus, open its **Config** page, choose the FX slot as the insert, set the position (Pre or Post EQ/dynamics) and switch the insert on ([Chapter 06](06_Channel_Processing.md)). A dual (mono/mono) effect offers its two sides separately, so one slot can serve two different channels.

---

## 2. Vintage Dynamics Processors

### A. Ultimo Compressor (UREI 1176LN Peak Limiter Emulation)
The fastest, punchiest analog compressor in recording history, modeling an ultra-fast Field Effect Transistor (FET) gain reduction circuit.

| Control | Range | Notes |
|---|---|---|
| **Input** | — | Drives the signal into the threshold: more input = more compression |
| **Output** | — | Make-up gain |
| **Attack** | 20–800 µs | **7 is fastest, 1 is slowest** |
| **Release** | 50–1100 ms | **7 is fastest, 1 is slowest** |
| **Ratio** | 4:1, 8:1, 12:1, 20:1, **ALL** | 4:1 is gentle; ALL is the British "all-buttons-in" slam |
- **Best For**: Snare drums (adds crack and body), aggressive rock vocals, bass guitar bite, and parallel drum subgroups.
- **The "All-Buttons-In" Mode**: Click the `ALL` ratio button. The compressor circuit distorts musically, drastically increasing room tone and creating the classic aggressive drum crush sound.

### B. Leisure Compressor (Teletronix LA-2A Leveling Amplifier Emulation)
Models the iconic electro-optical tube attenuator with its warm T4 optical cell.
- **Controls**: **Peak Reduction** (adjusts compression depth) and **Gain** (output make-up level), with a **Compress / Limit** switch.
- **Two-Stage Release**: Provides an initial 50% recovery in 60 ms, followed by a gradual release over several seconds depending on how hard the signal was hit.
- **Best For**: Smooth lead vocals, acoustic guitars, and upright bass. It is virtually impossible to make an LA-2A sound harsh or unmusical.

### C. Fair Compressor (Fairchild 670 Variable-Mu Tube Compressor)
Models the 65-pound, 20-tube stereo mastering compressor renowned for adding analog warmth, density, and cohesive "glue."
- **Controls**: Input Gain, Threshold, DC Bias, and **Time Constant (Presets 1–6)**.
  - *Time Constants 1–4*: Fixed attack with fast-to-slow release.
  - *Time Constants 5–6*: Program-dependent auto-release.
- **Operating Modes**: Dual Mono, Stereo Linked, or **Mid-Side (M/S)** processing.
- **Best For**: Master stereo bus glue, drum subgroups, and acoustic string ensembles.

### D. Combinator (5-Band Multiband Compressor)
Modeled after the Behringer **MDX8000** two-rack-unit multiband compressor; on the X32 it is a stereo (dual-channel) processor with five bands: **Low, Low-Mid, Mid, High-Mid and High**.
- **Global Controls**: Mix (0–100 % wet), dual-step Attack (0–19; initial attack ~0.5 ms at 19 to ~1.5 ms at 0, full compression within ~8 ms), Release (20 ms – 3 s, or Auto), Ratio, Crossover position and Crossover slope (**12 or 48 dB/oct** — adds ~0.7 ms of latency, keep this in mind on time-aligned inserts), and global output Gain.
- **Per-Band Controls**: Threshold and Band Gain for each band; the Peak meter display helps set thresholds.
- **Spectral Balance Control (SBC)**: Applies up to **10 dB** of automatic make-up gain independently per band, so heavy compression in one band doesn't change the overall tone.
- **Band Solo Caution**: Band solo is *destructive* — it changes the actual output of the processor, not just your headphones. Never use it on a live PA insert during the show.
- **Best For**: Master Main LR bus, live stream/broadcast matrix feeds, and smoothing erratic multi-singer backing groups.

---

## 3. Vintage Equalizers

### A. X-Tec EQ1 (Pultec EQP-1A Program Equalizer)
A faithful recreation of the passive tube equalizer that shaped recorded music history.
- **The Famous "Pultec Low-End Trick"**:
  - The Pultec features separate **Boost** and **Attenuate** knobs for the same low frequency (20, 30, 60, or 100 Hz).
  - Because the boost and cut curves have slightly different bandwidths and center slopes, **boosting and cutting simultaneously** creates a massive, focused low-end punch while scooping out the muddy lower-mids right above it!
- **High Frequency Section**: Selectable boost frequency (3 to 16 kHz) with variable bandwidth (Q), plus a separate High Attenuation shelf (5, 10, or 20 kHz).
- **Best For**: Kick drum (60 Hz trick), bass guitar, and adding silky "air" to vocals (12 kHz or 16 kHz boost).

### B. X-Tec EQ5 (Pultec MEQ-5 Mid-Range Equalizer)
Designed to complement the EQP-1A by focusing strictly on the critical mid-range frequencies.
- **Low Mid Peak**: Boost at 200, 300, 500, 700, or 1000 Hz.
- **Mid Dip (Notch)**: Cut at 200 Hz to 7 kHz (surgical mud and harshness removal).
- **High Mid Peak**: Boost at 1.5, 2, 3, 4, or 5 kHz.
- **Best For**: Electric guitars, snare body, vocal presence, and horn sections.

---

## 4. Precision Dynamics & Tone Processors

### A. Dual / Stereo De-Esser (SPL 1219 Emulation)
Automatically detects and attenuates harsh vocal sibilance ("S", "T", "Ch" sounds) using dynamic sidechain filtering.
- **Controls**: Tuning Frequency, Threshold, and Bandwidth.
- **Voice Gender Toggle**: Optimizes the detection envelope for male or female vocal ranges.
- **Benefit**: Transparently stops shrill sibilance from piercing the audience's ears without dulling the rest of the vocal performance.

### B. Wave Designer (SPL Transient Designer)
A level-independent transient envelope shaper that completely re-sculpts the attack and sustain of percussive sounds without altering their volume threshold.
- **ATTACK Knob (-100% to +100%)**:
  - Boost (+20% to +50%): Dramatically exaggerates stick snap and transient punch on kick and snare drums.
  - Cut (-20% to -40%): Softens abrasive pick attack on slap-bass or aggressively strummed acoustic guitars.
- **SUSTAIN Knob (-100% to +100%)**:
  - Boost: Pulls out room ambiance and cymbal wash.
  - Cut (-30% to -60%): Tightens ringy toms and eliminates boomy decay without using a traditional gate.

### C. Precision Limiter
A clean, lookahead brick-wall peak limiter with variable squeeze threshold and auto-release.
- **Best For**: Protecting musician In-Ear Monitors (IEMs) from hearing damage, and ensuring broadcast live stream matrices hit statutory loudness ceilings without clipping.

### D. Sound Maxer (BBE 482i Sonic Maximizer)
Phase-aligns incoming frequencies by delaying low and mid-frequencies slightly so that high frequencies reach the listener's ear first (replicating natural acoustic physics).
- **Controls**: Low Contour (tight bass boost) and Process (high-frequency clarity).
- **Best For**: Revitalizing dull acoustic guitars, active basses, backing tracks, and older PA systems.

### E. Dual / Stereo Enhancer (SPL Vitalizer Style)
Psychoacoustic harmonic generator that enriches bass frequencies and adds crystalline sparkle to upper harmonics through dynamic phase-filtering.

> **Use with care on a PA:** enhancers, exciters and stereo wideners (Sound Maxer, Enhancer, Stereo Imager) work with phase shifts and added harmonics. On a large system that easily turns into harsh highs, and widened signals can partly cancel for listeners off the center line. Use them on single sources in small doses, compare with the effect bypassed, and keep them off the main bus.

---

## 5. Graphic Equalizers (GEQ & TruEQ)

The console provides two distinct 31-band 1/3-octave graphic equalizer models:
- **Standard Stereo / Dual GEQ**: Traditional analog-modeled constant-Q graphic equalizer.
- **TruEQ (True Response GEQ)**: Patented algorithm that recalculates adjacent filter bands to eliminate adjacent filter overlap and ripple. When you pull down 1 kHz by -6 dB, *only* 1 kHz drops, leaving 800 Hz and 1.25 kHz untouched.
- **Best For**: Inserting on stage floor monitor mix buses to notch out acoustic feedback rings.

---

## 6. Time-Based Effects (Reverbs & Delays)

| Effect Processor | Character & Architecture | Optimal Use Case |
|---|---|---|
| **Vintage Reverb** | Emulation of the legendary **EMT 250** (1976), the first fully electronic (digital) reverb. Warm, velvety, open diffusion; decay 0.4–4.5 s. | Lead vocals, snare drum, acoustic guitars. |
| **Vintage Room** | Modeled on the **Quantec QRS** room simulator. Darker voiced and very natural: it sounds like a real room around the source instead of a tail behind it. Decay 0.1–20 s. | The go-to natural space for vocals and drums. |
| **Plate Reverb / Rich Plate** | Bright, dense mechanical plate with rapid build-up and shimmering high-end tail. | Rock drums, modern pop vocals, brass. |
| **Hall Reverb** | Expansive concert hall acoustic simulation with adjustable pre-delay and room dimensions. | Orchestral strings, choirs, ballads. |
| **Room Reverb / Ambience** | Tight acoustic room reflection without a long wash. | Adding natural drum booth room tone to dry direct inputs. |
| **Stereo Delay** | Dual independent delays with cross-feedback, low/high cut filters, and tempo tap sync. | Lead vocal slapback, stereo ping-pong guitar echoes. |
| **3-Tap Delay / Rhythm Delay**| Multi-tap tempo-synced delay with independent pan and level per tap. | Complex rhythmic repeats and atmospheric guitar swells. |
| **Tape Delay** | Warm vintage magnetic tape echo with tape flutter, wow, and saturation modeling. | Vintage rockabilly vocals, classic electric guitar solos. |

### Vintage Room in Detail

| Parameter | Range | What it does |
|---|---|---|
| **Reverb Delay** | 0–200 ms | Pre-delay: the gap between the dry signal and the start of the reverb |
| **Decay** | 0.1–20 s | Length of the tail (measured at 1 kHz) |
| **Size** | 2–100 | Size of the simulated room |
| **Density** | 1–30 | Number of reflections |
| **ER Level** | 0–100 % | Level of the early reflections |
| **Lo / Hi Multiply** | — | Decay of the lows (around 300 Hz) and highs (around 6 kHz) relative to the main decay |
| **Lo Cut / Hi Cut** | 10–500 Hz / 10–20 kHz | Filters on the reverb signal |
| **ER Left / ER Right** | 0–200 ms | Timing of the early reflections per side |
| **Freeze** | On / off | Holds the current reverb indefinitely |

Two starting points:

| | Reverb Delay | Decay | Size | Density | ER Level | Character |
|---|---|---|---|---|---|---|
| **Dark vocal room** | 16 ms | 1.75 s | 24 | 16 | 46 % | Longer, dark tail; set Hi Cut low |
| **Small bright room** | 0 ms | 0.75 s | 16 | 12 | 42 % | Short and bright, good for drums |

If the reverb clouds the mix: raise the Reverb Delay, shorten the Decay, raise the Lo Cut or lower the Hi Cut, in that order.

---

## 7. Modulation, Pitch & Special Processors

- **Chorus, Flanger & Phaser**: Classic analog bucket-brigade (BBD) modulation models with stereo cross-panning and speed controls.
- **Rotary Speaker**: Faithful Leslie 122 cabinet emulation with independent slow/fast rotor speed switching for Hammond organs and psychedelic guitars.
- **Sub Monster**: Subharmonic synthesizer that analyzes incoming low-end frequencies and generates a synthesised sub-octave tone below them. Incredible on thin kick drums and electric bass.
- **Pitch Shifter**: Dual-voice pitch transposer (-12 to +12 semitones, fine cents detune). Setting +4 cents on Left and -4 cents on Right creates lush 80s vocal doubling.
- **Guitar Amp & Tube Stage**: Valve saturation, cabinet emulations, and drive circuits for direct DI guitars and keyboards. Tube Stage adds harmonic saturation as an insert on bass, organ or snare.

> **Emergency amp:** if a guitar amp dies on stage, plug the guitar into a DI box, insert the **Stereo / Dual Guitar Amp** on that channel and the show goes on, in the PA and in the monitors. Sub Monster is a special effect; for solid low end in a live mix, aux-fed subs ([Chapter 07](07_Mixing_Buses_and_Sends.md)) are the more precise tool.

---

## 8. Sending Reverb to Musician In-Ear Monitors

Vocalists consistently perform better with reverb in their in-ear monitors. Here is the step-by-step workflow:

1. **Verify Reverb Rack**: Ensure FX Slot 1 is loaded with **Vintage Reverb**, fed from **Bus 13**, returning on **FX 1L / FX 1R**.
2. **Select the Performer's IEM Bus**: Select **Bus 1–2** (Lead Vocalist IEM).
3. **Engage Sends on Faders**: Press the **SENDS ON FADER** button (flashes red).
4. **Navigate to the FX Return Layer**: On the left fader bank, press the **AUX IN / FX RET** layer button.
5. **Raise the FX Return Fader**: Push the **FX 1L/R** return fader up to around -10 dB to -6 dB.
6. **Exit Sends on Faders**: Press **SENDS ON FADER** again to return to the house mix.
7. *Result:* The vocalist now hears beautiful stereo reverb in their ears, while the FOH engineer retains 100% independent control of the house reverb fader!
