# Chapter 16: Waves SuperRack Performer — Concept & First-Time Setup

**Waves SuperRack Performer** is a native (CPU-based) plugin host that turns a computer into an external effects rack for the X32. It was split out of the SoundGrid ecosystem as a standalone, much cheaper application (roughly US$100 plus the plugins you buy), and it works with the expansion card that is already installed in most X32 consoles: **no SoundGrid server and no X-WSG card required**.

This chapter covers what SuperRack Performer is, which hardware you need, and how to bring up the computer and console so that audio flows in both directions. The routing methods themselves are covered in [Chapter 17](17_SuperRack_Routing_Methods.md), latency in [Chapter 18](18_SuperRack_Latency_and_Buffer.md), and plugin chains in [Chapter 19](19_SuperRack_Plugin_Chains.md).

---

## 1. How It Works

The audio leaves the console through the expansion card, gets processed on the computer, and comes back through the same card.

| Step | Where | What happens |
|---|---|---|
| **1. Out** | `ROUTING → Card Out` | Preamp or stagebox signals are sent to the expansion card |
| **2. Process** | Computer running SuperRack Performer | The plugins run on the computer's CPU |
| **3. Back** | `ROUTING → Input` (Card 1–32) | The processed signals return from the card into the channel strips |

- The expansion card acts as a **32 × 32 audio interface** between the console and the computer.
- All plugin processing happens on the **computer's CPU** ("native" processing).
- The audio has to leave the console, pass through the computer, and come back, so **every path through SuperRack adds latency** (see [Chapter 18](18_SuperRack_Latency_and_Buffer.md)).

### Native (SuperRack Performer) vs. SoundGrid

| | SuperRack Performer (Native) | SuperRack SoundGrid |
|---|---|---|
| **Processing** | Computer CPU | Dedicated SoundGrid DSP server |
| **X32 card** | X-USB, X-UF, X-LIVE (stock USB cards) or X-DANTE via Dante Virtual Soundcard | X-WSG (Waves SoundGrid card) |
| **Extra hardware** | None | SoundGrid server + network switch |
| **Latency** | Higher, depends on buffer size | Lower and more consistent |
| **Cost** | Low | High |

> **Rule of thumb:** If a few milliseconds of extra latency are acceptable, native SuperRack Performer gives you the full Waves plugin catalogue without buying a server.

---

## 2. Hardware & Software Checklist

### Required
- X32 / M32 with a 32 × 32 expansion card: **X-USB**, **X-UF**, **X-LIVE** (in USB interface mode), or **X-DANTE** with Dante Virtual Soundcard
- A **dedicated** computer (macOS or Windows) with a fast CPU
- USB cable (or a network cable for X-DANTE)
- Waves SuperRack Performer and the plugins you want to use

### Strongly Recommended
- Console sample rate set to **48 kHz**
- Computer on mains power, with sleep and the screen saver disabled
- **No** streaming software (OBS etc.) on the same computer

> **Dedicated computer:** It is technically possible to run SuperRack and a streaming application (e.g. OBS fed from a Matrix over the same USB link) on the same machine, but it is strongly discouraged. A dedicated SuperRack computer gives the most robust and glitch-free result.

---

## 3. Console-Side Preparation

### Step 1: Set the Sample Rate to 48 kHz
`SETUP → Config → Sample Rate → 48 kHz`

Unless you have a very specific reason to run 44.1 kHz, use 48 kHz. At 44.1 kHz **all** console I/O, SuperRack and every plugin run roughly **9 % slower**, which means about 9 % more latency throughout the system.

### Step 2: Configure the Expansion Card for 32 × 32

| Card | Where | Setting |
|---|---|---|
| **X-USB / X-UF** | `SETUP → Card` | Channel configuration **32 in / 32 out** |
| **X-LIVE** | `SETUP → Card` | Channel config (second layer of the page) **32 in / 32 out**, and **Playback config = USB** (USB interface mode, not SD) |
| **X-DANTE** | Dante Controller | Patch channels to and from Dante Virtual Soundcard (see [Chapter 17, Method E](17_SuperRack_Routing_Methods.md#method-e-x-dante-card-dante-virtual-soundcard)) |

> **Symptom of a wrong card setting:** SuperRack's input selector only shows 2 or 8 channels of the X-LIVE / X-USB device instead of 32. Fix the channel config on the console first, then patch.

### Step 3: Set Preamp Gain Before Inserting SuperRack
Set all headamp gains while the channels still come straight from the preamps. Once the channel source is switched to `Card`, the channel's gain knob no longer controls the analog preamp.

If you need to adjust preamps after the routing is done, go to `SETUP → Preamps`, select the physical source block (e.g. `Local 9–16`, `AES50 A 1–8`) and adjust the gain per input there. See [Chapter 05](05_Gain_Staging_and_Preamps.md) for the background.

---

## 4. Computer-Side Setup (SuperRack Performer)

Open `Setup` in SuperRack Performer:

| Section | Setting | Value |
|---|---|---|
| **Audio Setup** | Device | X-LIVE / X-USB / X-UF / Dante Virtual Soundcard |
| | Sample Rate | **48 000 Hz** (must match the console) |
| | Buffer Size | 32 / 64 / 128 / 256 … (see [Chapter 18](18_SuperRack_Latency_and_Buffer.md)) |
| **Settings** | Number of racks | 8 / 32 / 64. Use only as many as you need: fewer racks mean lower CPU overhead |

### macOS Microphone Permission
On first launch macOS asks whether SuperRack Performer may access audio input. Click **Allow**. If you accidentally denied it, go to `Apple menu → System Settings → Privacy & Security → Microphone`, unlock, and enable **SuperRack Performer**.

### Buffer Size Starting Points

| Computer | Buffer |
|---|---|
| Very fast | **32** samples |
| Mid-range | **64** samples |
| Slower | **128–256** samples |

Watch the CPU meter in SuperRack. If it climbs high, or you see red overload indicators or hear clicks, increase the buffer one step.

---

## 5. Patching Racks

In `Overview`, each rack has an **Input** and an **Output** selector:

1. Choose **Mono** or **Stereo** and the device channel(s), e.g. `Mono → X-LIVE → Input 16`.
2. SuperRack automatically assigns the **same output** channel, which completes the return path to the console.
3. Name the rack (e.g. `Vocal 1`, `Main LR`).

**Stereo racks:** Select `Stereo` and the channel pair (e.g. 1–2). SuperRack warns about a duplicate output on the next rack. Confirm, and set that next rack to `None`.

---

## 6. The Mute Test: Verifying the Audio Path

The most reliable way to prove that the console is actually hearing SuperRack's output:

1. Talk into a microphone that is routed through SuperRack.
2. Watch the rack's input **and** output meters in SuperRack.
3. Press **Mute** on that rack in SuperRack.
4. Check the result:

| Result | Meaning |
|---|---|
| The channel goes silent on the console | The path is correct |
| You still hear the mic | The channel or insert is not returning from the card yet |

> **Note:** With the aux-insert method you may see signal in SuperRack *before* pressing `INSERT` on the console. The mute test only passes once the insert is engaged, because only then does the return replace the original signal.

---

## 7. Common Pitfalls

| Problem | Cause / Fix |
|---|---|
| Only 2 or 8 channels visible in SuperRack | Card not set to 32 × 32 (`SETUP → Card`) |
| X-LIVE connected but no return audio | Playback config still on SD; set it to **USB** |
| Gain knob doesn't change the mic level | Channel source is the card; adjust in `SETUP → Preamps` |
| Feedback / runaway signal | Card Out patched to the same signal that comes back from the card (e.g. Aux **In** instead of Aux **Out**) |
| Crackles, dropouts | Buffer too small for the CPU; increase the buffer and close other apps |
| macOS: no inputs at all | Microphone permission denied |
