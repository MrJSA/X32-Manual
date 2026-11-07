# Chapter 3: Routing, Patching & Signal Distribution

The routing matrix of the Behringer X32 and Midas M32 is one of the most flexible and misunderstood components of the console. Firmware 4.x expanded the original "blocks-of-eight" architecture by introducing **User 1:1 Routing**, allowing any physical connector (local XLR, stagebox AES50, expansion card, or auxiliary jack) to be patched to any channel or output independently.

This chapter breaks down the routing architecture, tap points, input and output patching, and real-world stage setups.

---

## 1. Routing Architecture Overview

The console distinguishes between three separate stages: **Physical Hardware**, the **Patchbay**, and the **Console Channel Strip**:

```
[PHYSICAL CONNECTORS]
Local XLR (1-32)
AES50 A (1-48)
AES50 B (1-48)
Card Out/In (1-32)
Aux In (1-6)
       │
       ▼
┌─────────────────────────┐
│ USER INPUT PATCH        │  Firmware 4.x: Assigns any physical socket to User In 1–32
│ (Routing → User Tab)    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ INPUT BLOCKS (Home Tab) │  Assigns 4 blocks of 8:
│ Inputs 1-8, 9-16,       │  - Local 1-8, 9-16, 17-24, 25-32
│ Inputs 17-24, 25-32     │  - AES50 A/B 1-8 ... 41-48
│                         │  - Card 1-8 ... 25-32
│                         │  - User In 1-8, 9-16, 17-24, 25-32
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ CHANNEL STRIP SOURCE    │  Channel → Config → Source
│ (Channels 1–32)         │  (Leave set 1:1: Ch 1 = In 1, Ch 2 = In 2!)
└─────────────────────────┘
```

> **Rule of Thumb:** Never change individual channel sources in the **Channel → Config** screen unless doing complex channel-splitting. Keep channel sources mapped 1:1 (`In 1` through `In 32`) and perform all custom patching in the **ROUTING** menu. This prevents ghost patches and muted-channel troubleshooting headaches.

---

## 2. Block Routing vs. User 1:1 Routing

### Legacy Block Routing (Firmware 1.x – 3.x):
Inputs and outputs were routed strictly in groups of eight:
- Inputs 1–8 = Local 1–8
- Inputs 9–16 = Local 9–16
- Inputs 17–24 = AES50 A 1–8
- Inputs 25–32 = AES50 A 9–16

*The limitation:* If you had a 28-channel digital snake on stage and 4 wireless microphone receivers at Front of House, bringing in the 4 wireless mics forced you to sacrifice an entire block of 8 stagebox channels.

### Firmware 4.x User Routing:
User Routing provides complete 1:1 freedom:
- **User In (32 Slots)**: Each slot can select any physical input on the console (Local 1–32, AES50 A 1–48, AES50 B 1–48, Card 1–32, Aux In 1–6, Talkback).
- **User Out (48 Slots)**: Custom output patch selecting from physical inputs, internal mix buses, matrices, Main LR, monitor bus, or direct outputs.

---

## 3. Output Tap Points (Signal Pick-Off Positions)

When routing any signal to an analog XLR output, Aux output, P16 Ultranet bus, or Card track, you must specify its **Tap Point**. Choosing the wrong tap point is the number one cause of monitor and recording issues.

```
[Input Preamp]
      │
      ├──► [IN / LC] (Direct out after Headamp & Low Cut; pre-gate, pre-EQ, pre-dyn)
      ▼
   [Gate]
      │
      ├──► [PRE EQ] (Post-gate, before EQ and Compressor)
      ▼
    [EQ]
      │
      ├──► [POST EQ] (After EQ, before Compressor)
      ▼
  [Dynamics]
      │
      ├──► [PRE FADER] (After EQ & Dynamics; BEFORE Fader & Mute)
      ▼
   [Mute]
      │
   [Fader]
      │
      └──► [POST FADER] (After Fader, Pan, and Mute)
```

| Tap Point | Characteristics | Recommended Application |
|---|---|---|
| **IN / LC** | Completely clean, untouched raw audio directly after preamp and low cut. Fader movements, mutes, EQ, and compressors have zero effect. | **Multitrack DAW Recording**: Guarantees raw tracks for post-production re-mixing. |
| **PRE EQ** | Includes preamp and gate; bypasses EQ and dynamics. | Specialty monitoring or parallel external processing. |
| **POST EQ** | Includes preamp, gate, and EQ; bypasses channel compressor. | Sending to broadcast or external recording when EQ is desired without channel compression pumping. |
| **PRE FADER** | Includes EQ and compression; **independent** of channel fader movements and mutes. | **Stage Floor Wedges & In-Ear Monitors (IEMs)**: Ensures the FOH engineer's fader rides do not alter stage musicians' monitor volumes. |
| **POST FADER** | Dependent on channel fader, pan, and mute status. | **Reverb/Delay FX Sends**, **Main PA Speakers**, **Matrix Feeds**, **Delay Towers**, and **Live Stream Mixes**. |
| **SUBGROUP** | Direct audio summing without variable send level (fixed unity gain). | Drum subgroups, horn sections, or choir stems. |

---

## 4. Output Routing Tabs Explained

Press the **ROUTING** button to view the output tabs:

### A. Out 1–16 Tab (Analog XLR Outputs)
Controls the 16 physical XLR male outputs on the rear panel (or routed to digital stageboxes via AES50):
- **Output 1–16**: Assign Category (Main, Mix Bus, Matrix, Direct Out) and Tap Point.
- Standard assignment:
  - Outs 1–8: Mix Buses 1–8 (Stage monitors / IEMs).
  - Outs 9–12: Mix Buses 9–12 (Additional monitors / Subgroups).
  - Out 13: Matrix 1 (Front Fills).
  - Out 14: Mono/Center Bus (Subwoofers).
  - Out 15 & 16: Main Left & Main Right (Main PA).

### B. Aux Out Tab (1/4" TRS Outputs)
Controls the 6 balanced 1/4" TRS jacks on the rear panel:
- Perfect for feeding green rooms, lobby speakers, video feeds, or hardware outboard processors.
- Aux 5 and Aux 6 include parallel RCA jacks for consumer recording decks.

### C. Ultranet Tab (P16 Personal Monitoring)
Assigns 16 discrete audio streams to the Ultranet EtherCON port. Connects directly to Behringer P16-D distribution hubs and P16-M personal mixers:
- Standard practice: Tap channels at **Pre-Fader** or **Post-EQ** so stage performers hear their tone without being affected by FOH fader balancing.

### D. Card Out Tab (32-Channel DAW / USB Expansion)
Assigns 32 audio channels sent over the expansion card (X-USB, X-LIVE, X-DANTE):
- For live recording, route **Local 1–32** or **AES50 A 1–32** directly to Card Out.
- Tap channels at **IN / LC** to record pristine preamps without console compression or EQ.

### E. AES50 A Out & AES50 B Out Tabs (48 Channels Each)
Transmits digital audio out of the EtherCON snake ports to stageboxes, personal monitor systems (DP48), or secondary mixing consoles.

---

## 5. Practical Routing Recipes

### Recipe 1: 28 Stagebox Inputs + 4 FOH Wireless Microphones
*Scenario:* An S32 stagebox on stage carries 28 inputs over AES50 Port A. Four wireless handheld receivers sit locally in the FOH rack plugged into Local XLR inputs 1–4.

1. Press **ROUTING** and page to the **User** tab.
2. Select **User In** (first encoder).
3. Set **Inputs 1 through 28** to `AES50 A 1` through `AES50 A 28`.
4. Set **Inputs 29 through 32** to `Local In 1` through `Local In 4`.
5. Page to the **Home** (Inputs) tab.
6. Set the four input blocks:
   - `Inputs 1-8`   = **User In 1-8**
   - `Inputs 9-16`  = **User In 9-16**
   - `Inputs 17-24` = **User In 17-24**
   - `Inputs 25-32` = **User In 25-32**
7. *Result:* Channels 1–28 mix the stage snake; channels 29–32 mix the local wireless microphones without wasting an entire block of 8 stagebox inputs!

### Recipe 2: Recording 30 Inputs + Main PA Mix over USB
*Scenario:* You want to multitrack 30 channels into a laptop DAW via USB, but want Card Tracks 31 and 32 to record the final stereo house mix.

1. Route Main L/R to Aux Out:
   - Go to **Routing → Aux Out**.
   - Set `Aux Out 5` = **Main L**, Tap: **Post Fader**.
   - Set `Aux Out 6` = **Main R**, Tap: **Post Fader**.
2. Build User Output Patch:
   - Go to **Routing → User** and select **User Out**.
   - Set Slots 1–30 to `Local In 1–30` (or `AES50 A 1–30`).
   - Set Slot 31 to `Aux Out 5`.
   - Set Slot 32 to `Aux Out 6`.
3. Assign Card Outputs:
   - Go to **Routing → Card Out**.
   - Set all 4 card blocks to **User Out 1–8**, **User Out 9–16**, **User Out 17–24**, and **User Out 25–32**.
4. *Result:* Your DAW records 30 pristine raw input tracks on tracks 1–30, and the fully processed stereo board mix on tracks 31–32!

### Recipe 3: Instant Virtual Soundcheck Toggle
*Scenario:* Instantly switch all 32 console channels from live stage preamps to multitrack DAW playback from your computer.

1. **Live Performance Setting**:
   - `Routing → Home`: Inputs 1–32 set to `AES50 A 1–32` (or `Local 1–32`).
2. **Virtual Soundcheck Setting**:
   - `Routing → Home`: Inputs 1–32 switched to `Card 1–8`, `Card 9–16`, `Card 17–24`, and `Card 25–32`.
3. Store this toggle into two Snippets (e.g., `Snippet 01: VSC ON`, `Snippet 02: VSC OFF`) targeting only the **Routing** parameter. You can now toggle the entire console between live and playback with a single button press!
