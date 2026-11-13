# Chapter 18: SuperRack Latency, Buffer Size & A/V Sync

Every digital console has latency, and every insert (internal FX, an external analog loop, or a computer running SuperRack Performer) adds a little more. With SuperRack, the **buffer size** is the main lever: it trades latency against CPU load.

---

## 1. What the Buffer Does

SuperRack processes audio in chunks ("buffers"). A chunk must be fully received before it can be processed and sent back.

| | Small buffer (32 samples) | Large buffer (1024+ samples) |
|---|---|---|
| **Latency** | ✔ Low | ✘ High |
| **CPU load** | ✘ High | ✔ Very low |
| **Stability** | ✘ Risk of clicks and dropouts | ✔ Very stable |

Example from practice: with 32 channels loaded, CPU usage was about 12 % at 512 samples and about 31 % (with red overload warnings) at 32 samples on the same computer. With no plugins at all: about 0 % at 2048 vs. about 12 % at 32.

---

## 2. Round-Trip Latency (X32 at 48 kHz, Direct Input Method)

| Buffer (samples) | Total latency | Equivalent distance* |
|---:|---:|---|
| 32 | **5.9 ms** | ≈ 2 m / 7 ft |
| 64 | **7.2 ms** | ≈ 2.5 m / 8 ft |
| 96 | **8.56 ms** | ≈ 3 m / 10 ft |
| 128 | **9.9 ms** | ≈ 3.4 m / 11 ft |
| 192 | **12.5 ms** | ≈ 4.3 m / 14 ft |
| 256 | **15.2 ms** | ≈ 5.2 m / 17 ft |
| 512 | **25 ms** | ≈ 8.6 m / 28 ft |
| 1024 | **47.23 ms** | ≈ 16 m / 53 ft |
| 2048 | **89.9 ms** | ≈ 31 m / 101 ft |

\* *Sound travels about 34 cm (roughly 1 ft) per millisecond. 5.9 ms of latency sounds like standing about 2 m away from a floor wedge, which is normal on most stages anyway.*

### Method Differences
- **Direct Input** ([Chapter 17, Method A](17_SuperRack_Routing_Methods.md#method-a-direct-input-all-32-channels)): the values above.
- **Aux Insert** ([Method B](17_SuperRack_Routing_Methods.md#method-b-aux-insert-6-insert-points)): about **+0.37 ms** (e.g. 6.27 ms instead of 5.9 ms at 32 samples), because the console processes the channel, sends it out, and receives it back before continuing.
- **X-DANTE + Dante Virtual Soundcard:** about **10 ms** at 32 samples (DVS 4 ms + card 0.25 ms + buffer); 128 samples adds about 4 ms.
- **Multiple passes** (input rack + insert + group + Main LR insert) add up: each pass costs a full round trip.
- **Plugins with look-ahead** add their own latency on top (e.g. Waves **L2** adds 64 samples, about 1.3 ms).
- **For comparison:** the console alone has about 0.83 ms from analog in to analog out, and an X-WSG card with a SoundGrid server adds only about 0.86 ms (1.69 ms in total). That is the price difference between a server-based system and a native host on a laptop ([Chapter 13](13_Recording_and_Expansion_Cards.md)).

### Sample Rate
Run the X32 at **48 kHz**. At 44.1 kHz, latency throughout the system (console I/O, SuperRack and plugins) increases by roughly **9 %**.

---

## 3. What Latency Is Acceptable?

| Use case | Tolerance | Recommendation |
|---|---|---|
| **In-ear monitors (IEM)** | Very low | Keep SuperRack **out** of the IEM path (double patch) |
| **Floor wedges** | Below 10–15 ms | ≤ 128 samples |
| **Front of house** | Up to about 15 ms is unnoticeable | ≤ 256 samples; smaller is always better |
| **Broadcast / livestream** | Often more than 50 ms is **beneficial** | Large buffers are fine (see A/V sync below) |

### Front of House
Up to about **15 ms** the audience won't notice. Only listeners in the front row hear the direct stage sound followed slightly later by the PA; most of the audience mainly hears the PA. For corporate events with lavalier mics, about 10 ms is perfectly usable.

### Floor Wedges
Above roughly **10–15 ms** musicians start to notice a difference in their wedge.

### In-Ear Monitors: the Double-Patch Strategy
IEM users notice latency much earlier, because they hear their own voice through bone conduction plus the delayed IEM signal. The solution is to feed the same microphone to two channels:

| Channel | Processing | Feeds |
|---|---|---|
| **Channel A** | SuperRack plugins | Main LR (FOH) |
| **Channel B** | X32 onboard gate, EQ and dynamics only, no SuperRack | Mix buses → IEMs |

- Patch the same source to **two channels**, with User Routing ([Chapter 04](04_Firmware_4x_User_Routing.md)) or by setting a second channel's source.
- With aux inserts, an alternative is to take the monitor sends **before** the insert point: process the vocal on the console first, send it to the monitors, then insert SuperRack for FOH.

---

## 4. Broadcast: Using Latency to Your Advantage

In streaming environments **audio almost always arrives before video**, because cameras, switchers, routers and embedders each add frames of delay. Instead of adding an audio delay on the console output, you can run SuperRack at a **larger buffer**: the CPU load drops dramatically and the audio moves closer to the video.

### Frame Duration

**Frame duration (ms) = 1000 / frame rate (fps)**

| Frame rate | 1 frame | 2 frames | 3 frames |
|---|---:|---:|---:|
| 59.94 fps | 16.7 ms | 33.4 ms | **≈ 50 ms** |
| 29.97 fps | 33.4 ms | 66.7 ms | **≈ 100 ms** |
| 24 fps | 41.7 ms | 83.3 ms | **≈ 125 ms** |

Typical video systems run **2–3 frames** behind. Example: a 59.94 fps system with 3 frames of delay (about 50 ms) → a SuperRack buffer of **1024** (47.2 ms) gets the audio almost exactly in sync, at near-zero CPU load.

> **Warning:** Only do this on a **dedicated broadcast mix** (e.g. a separate console or a broadcast-only signal path). The same latency in the room or in the monitors would be unacceptable.

---

## 5. Practical Recommendations

1. Start at **64** samples and check the CPU. Go to **32** if the computer has headroom, or **128** if it struggles.
2. Never accept red CPU warnings or audible clicks: increase the buffer instead.
3. Keep the SuperRack computer dedicated (no screen recording, no OBS). Screen recording alone can force buffers of 512–1024.
4. Use as few racks as needed (`Setup → Settings → 8/32/64 racks`).
5. Keep IEM feeds out of the SuperRack path.
6. Always have a fallback. With aux inserts, press `INSERT` to bypass SuperRack instantly ([Chapter 17, Method B](17_SuperRack_Routing_Methods.md#method-b-aux-insert-6-insert-points)). With the direct input method, store a **Snippet** that switches the input blocks back to `Local` / `AES50` ([Chapter 12](12_Scenes_Cues_and_Snippets.md)).
