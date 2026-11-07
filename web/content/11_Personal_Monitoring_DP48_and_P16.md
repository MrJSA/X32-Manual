# Chapter 11: Personal Monitoring: Ultranet P16 & Midas DP48

Personal monitoring systems empower musicians on stage to create and control their own customized in-ear mixes without requiring the Front of House engineer's attention. The Behringer X32 and Midas M32 natively support two industry-standard digital personal monitoring architectures: the **Behringer Powerplay P16** (via Ultranet) and the **Midas DP48** (via AES50).

This chapter details the Ultranet protocol, P16 patching strategies, the "16-channel squeeze" technique, and Midas DP48 dual-mix integration.

---

## 1. The Ultranet Powerplay P16 System

The proprietary **Ultranet** digital audio bus carries 16 channels of uncompressed 24-bit 48 kHz digital audio over standard Cat5e cable:

```
┌─────────────────────────────────────────────────────────────┐
│ CONSOLE: [ULTRANET OUT] (EtherCON RJ45)                     │
│    │                                                        │
│    ▼ (Shielded Cat5e Cable)                                 │
│ [P16-D DISTRIBUTION HUB] ──► Delivers Audio + Remote Power  │
│    ├──► Cat5e ──► P16-M Personal Mixer (Drummer)            │
│    ├──► Cat5e ──► P16-M Personal Mixer (Bass Player)         │
│    ├──► Cat5e ──► P16-M Personal Mixer (Lead Singer)        │
│    └──► Cat5e ──► P16-M Personal Mixer (Keyboardist)        │
└─────────────────────────────────────────────────────────────┘
```

### The P16-M Personal Mixer Hardware:
- **16 Channel Select Buttons**: Individual volume, stereo panning, solo, and mute per channel.
- **3-Band EQ with Sweepable Mid**: Independent tone shaping on every channel without affecting FOH.
- **Master Brick-Wall Limiter**: Built-in peak limiter dedicated to protecting the performer's hearing.

---

## 2. Ultranet Output Routing & Optimal Tap Points

Navigate to **ROUTING → ULTRANET** to configure the 16 P16 channels:

```
┌─────────────────────────────────────────────────────────────┐
│ ULTRANET PATCHING RULES:                                    │
│ - Category: Channel, Mix Bus, Matrix, Direct Out, or Main   │
│ - Tap Point: MUST BE SET TO [POST-EQ] or [PRE-FADER]!       │
└─────────────────────────────────────────────────────────────┘
```

### The Tap Point Rule for Personal Mixers:
- **Never use Post-Fader**: If Ultranet taps are set to Post-Fader, every time the FOH engineer adjusts a fader in the house mix, the musician's in-ear level shifts erratically.
- **Use Pre-Fader or Post-EQ**: Delivers clean, finished tone with channel EQ intact, while isolating the performer from FOH volume adjustments.

---

## 3. The "16-Channel Squeeze" Strategy

A full band often exceeds 24 to 32 inputs. Fitting a complex lineup into the 16 slots of the P16 requires smart consolidation:

```
┌─────┬──────────────────────┬───────────────────────────────┐
│ P16 │ Signal Source        │ Routing Method                │
├─────┼──────────────────────┼───────────────────────────────┤
│ 01  │ Kick Drum            │ Direct Out (Channel 1)        │
│ 02  │ Snare Drum           │ Direct Out (Channel 2)        │
│ 03  │ Drums Stem (Toms/OH) │ Mix Bus 11 (Summed Subgroup)  │
│ 04  │ Bass Guitar          │ Direct Out (Channel 4)        │
│ 05  │ Electric Guitar 1    │ Direct Out (Channel 5)        │
│ 06  │ Electric Guitar 2    │ Direct Out (Channel 6)        │
│ 07  │ Acoustic Guitar      │ Direct Out (Channel 7)        │
│ 08  │ Keyboards / Piano    │ Mix Bus 12 (Stereo/Mono Sum)  │
│ 09  │ Click & Guide Cues   │ Direct Out (Aux In / Ch 9)    │
│ 10  │ Backing Tracks       │ Mix Bus 13 (Stereo Sum)       │
│ 11  │ Lead Vocal 1         │ Direct Out (Channel 16)       │
│ 12  │ Lead Vocal 2 / Guest │ Direct Out (Channel 17)       │
│ 13  │ Backing Vocals Stem  │ Mix Bus 14 (Summed Subgroup)  │
│ 14  │ Pastor / MC Speech   │ Direct Out (Channel 32)       │
│ 15  │ Stage Ambient Mics   │ Direct Out (Crowd Mic Ch 30)  │
│ 16  │ Vocal Reverb Return  │ Direct Out (FX 1L Return)     │
└─────┴──────────────────────┴───────────────────────────────┘
```

### Why Include Stage Ambient Microphones (P16 Ch 15)?
When performers switch to sealed molded in-ear monitors (IEMs), they are isolated from acoustic room reflections. They cannot hear the congregation singing, audience applause, or spoken comments between songs, leading to a claustrophobic feeling.
- Place two condenser microphones on stage pointing out toward the audience.
- Route them **only** to P16 Channel 15 (never route them to Main LR!).
- Musicians can dial in just enough audience ambiance to feel naturally connected to the room.

---

## 4. Midas DP48 Dual 48-Channel Personal Mixer

The **Midas DP48** represents a quantum leap beyond the P16, operating over **AES50** rather than Ultranet:

```
┌─────────────────────────────────────────────────────────────┐
│ MIDAS DP48 ADVANCED CAPABILITIES:                           │
│ 1. 48-Channel Capacity over AES50 (Cat5e).                  │
│ 2. DUAL INDEPENDENT MIXES (Mix A and Mix B):                │
│    Two performers (e.g., Drummer & Bassist) share ONE DP48  │
│    unit, with independent 1/4" and 3.5mm stereo outputs!    │
│ 3. 12 STEREO GROUPS: Groups channels into 12 faders.        │
│ 4. BUILT-IN STEREO AMBIENT MIC: Blends room sound directly. │
│ 5. ONBOARD SD CARD RECORDER: Records live rehearsal stems.  │
└─────────────────────────────────────────────────────────────┘
```

### Connecting DP48 to the X32 / M32:
1. Connect a shielded Cat5e cable from console **AES50 Port B** to the DP48 input (or daisy-chain through stageboxes).
2. On the console, navigate to **ROUTING → AES50 B OUT**.
3. Send the desired channel blocks (Channels 1–32 and Buses 1–16) across AES50 B 1–48.
4. On the DP48, assign channels to the **12 Groups** (e.g., Group 1 = Drums, Group 2 = Bass, Group 3 = Guitars, Group 4 = Vocals).
5. Performers use the rotary encoders and high-contrast color screen to balance their IEM mixes with full stereo panning, EQ, reverb, and limiting per group.
