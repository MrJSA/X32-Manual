# Chapter 19: SuperRack Plugin Chains for Vocals & Main Bus

This chapter documents proven Waves plugin chains for live use with the X32 and SuperRack Performer: a complete **lead vocal chain** and a **Main LR / mix bus chain**. The values are starting points: always adjust by ear and by the gain-reduction meter.

---

## 1. Before You Start: Console vs. Waves Processing

With the **Direct Input method** ([Chapter 17, Method A](17_SuperRack_Routing_Methods.md#method-a-direct-input-all-32-channels)), SuperRack sits **before** the console's channel processing. If Waves handles gating, EQ and compression, switch these off on the X32 channel:

| X32 channel section | Setting |
|---|---|
| Low Cut | **Off** |
| Gate | **Off** |
| EQ | **Off** |
| Dynamics | **Off** |

This avoids double processing and keeps the signal chain predictable.

With an **aux insert** in **Post** position ([Method B](17_SuperRack_Routing_Methods.md#method-b-aux-insert-6-insert-points)), you can instead keep the console's EQ and dynamics and add Waves after them. This is useful for pitch correction, which tracks better on an already cleaned-up signal.

---

## 2. The Lead Vocal Chain

| # | Plugin | Type | Job |
|---|---|---|---|
| 1 | **PSE** | Gate / expander | Clean up noise and bleed |
| 2 | **F6 RTA** | EQ / dynamic EQ | Tone and mud control |
| 3 | **C6** | Multiband compressor | Tame the vocal range |
| 4 | **CLA-76** | FET compressor | In-your-face compression |
| 5 | **CLA-2A** | Opto leveler | Polish the peaks |
| 6 | **R-DeEsser** | De-esser | Tame sibilance |
| 7 | **Waves Tune Real-Time** | Pitch correction | Optional |

> **Tip:** The chain order follows the logic **clean up → EQ → multiband dynamics → main compression → peak polish → de-ess → tuning**. The de-esser and tuner can go wherever your workflow prefers; the important part is EQ before compression.

### 2.1 PSE (Primary Source Expander): Gate / Expander
Reduces stage bleed between phrases without the hard chopping of a classic gate.

| Parameter | Setting | Notes |
|---|---|---|
| **Range** | **−12 dB** (start) | Up to −20 dB on noisy stages; max. about −60 dB |
| **Threshold** | By ear | −60 to 0 dB; where the expander starts acting |
| **Release** | Slow / Medium / Fast | How quickly it closes after the vocal drops below the threshold |

### 2.2 F6 RTA: Floating-Band Dynamic EQ
Static EQ plus dynamic (level-dependent) EQ bands.

| Band | Setting | Purpose |
|---|---|---|
| **High-pass** | **≈ 110 Hz** (raised from 80 Hz) | Remove rumble and handling noise |
| **Dynamic band** | **220 Hz**, threshold **−31 dB**, max. **−4 dB** | Removes low-mid mud *only* when the singer gets loud; full body remains on quiet passages |
| **Mid scoop** | Gentle cut around **5–6 kHz** | Clean up harshness |

### 2.3 C6: Multiband Compressor
Compresses each part of the spectrum separately, so the vocal stays even across the singer's whole range (low notes are quieter, notes in the middle of the range louder).

| Band | Range (example) |
|---|---|
| Low | 16 Hz – 250 Hz |
| Low-mid | 250 Hz – 740 Hz |
| High-mid | 740 Hz – 2 kHz |
| High | 2 kHz – 20 kHz |
| Floating band 1 | ≈ 195 Hz (proximity effect control) |
| Floating band 2 | Free |

- **Release:** ARC (Auto Release Control) or manual. In manual mode you get attack, release, **range** (max. compression) and **gain** (EQ-like makeup per band).
- **Behavior:** **Opto**, **Knee 0.2**.
- **Target gain reduction:** **3–6 dB**, depending on how hard the singer pushes.
- Use the band **solo** buttons to hear what each band is doing (proximity, mids, syllables and sibilance).

### 2.4 CLA-76: FET Compressor (1176 Emulation)
The "in-your-face" main compressor that pushes the vocal forward in the mix. It is comparable to the X32's internal **Ultimo Compressor** ([Chapter 09](09_Effects_Rack_and_Plugins.md)).

| Parameter | Setting |
|---|---|
| **Ratio** | **12:1** |
| **Attack** | Mid-slow |
| **Release** | Fast |
| **Input / Output** | Drive the input for more compression, match the level with the output |
| **Target GR** | **3–10 dB** |

> **Note:** Like the hardware 1176, **higher numbers mean faster** attack and release (7 = fastest, 1 = slowest).

### 2.5 CLA-2A: Opto Leveler (LA-2A Emulation)
Catches only the loudest notes that get past the CLA-76, so no word spikes out of the mix.

- **Target GR:** **1–2 dB**, on the loudest passages only.

### 2.6 R-DeEsser (Renaissance DeEsser)
Tames loud "S" sounds, especially after heavy compression has brought sibilance forward.

### 2.7 Waves Tune Real-Time (Optional)
Real-time pitch correction.

| Parameter | Setting |
|---|---|
| **Key / Scale** | The song's key (e.g. B♭ major) for the best results |
| **Fallback** | **Chromatic**: tunes to the nearest semitone and works without knowing the key |
| **Note transition speed** | **≈ 50 ms** sounds natural; **0 ms** gives a hard "robot" effect with audible note jumps |

**Etiquette & practice:**
- Always agree with the artist or music director before using pitch correction.
- In a loud, reverberant room slightly off-pitch notes are masked; on a **livestream** they are clearly audible. Using Waves Tune (even in chromatic mode) on the broadcast mix is especially worthwhile.
- Pitch correction tracks better on a pre-cleaned signal, so consider an **aux insert in Post** position after the console's EQ and dynamics.

---

## 3. Main LR / Mix Bus Chain

Insert it via a **stereo aux insert** on Main LR (e.g. `Aux 3/4` or `Aux 5/6`, Post), with the SuperRack rack set to **Stereo**.

| # | Plugin | Job |
|---|---|---|
| 1 | **SSL G-Master Buss Compressor** | "Glue" compression |
| 2 | **L2 Ultramaximizer** | Brickwall limiter |

### 3.1 SSL G-Master Buss Compressor

| Parameter | Setting |
|---|---|
| **Attack** | **10 ms** |
| **Release** | **Auto** or **0.1 s** |
| **Ratio** | **4:1** |
| **Threshold** | A few dB of gentle "glue" compression |

### 3.2 L2 Ultramaximizer
A look-ahead brickwall limiter that controls the final level and reduces dynamics. It is useful for a consistent level, especially on streams.

> **Warning:** The L2 adds **64 samples** of latency (look-ahead) on top of the SuperRack buffer.

---

## 4. Failsafe Workflow

The big advantage of aux inserts: **one button press bypasses SuperRack**. If the computer crashes, the audio crackles or the laptop battery dies mid-show:

1. Select the channel or Main LR.
2. Press `INSERT` (Config/Preamp section) to disengage the insert.
3. Audio flows through the console again and the show continues.

For channels processed via the **direct input method**, prepare a Snippet that returns the input blocks to their physical sources ([Chapter 12](12_Scenes_Cues_and_Snippets.md)), and keep basic console EQ and dynamics settings stored in channel presets so you can re-enable them quickly.

---

## 5. Quick Reference

| Plugin | Role | Key setting | Target |
|---|---|---|---|
| PSE | Expander / gate | Range −12 dB | Remove bleed |
| F6 RTA | Dynamic EQ | HPF 110 Hz, 220 Hz dynamic −4 dB | Clarity |
| C6 | Multiband compressor | Opto, knee 0.2 | 3–6 dB GR |
| CLA-76 | FET compressor | 12:1, mid-slow attack, fast release | 3–10 dB GR |
| CLA-2A | Opto leveler | — | 1–2 dB GR |
| R-DeEsser | De-esser | — | Tame "S" sounds |
| Waves Tune RT | Pitch | Song key or chromatic, 50 ms | Optional |
| SSL Comp (Main) | Bus glue | 10 ms / Auto / 4:1 | Gentle GR |
| L2 (Main) | Limiter | — | Final level (+64 samples) |
