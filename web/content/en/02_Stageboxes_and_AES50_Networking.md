# Chapter 02: Digital Snakes, Stageboxes & AES50 Networks

The SuperMAC AES50 networking protocol, developed by Sony Pro Audio and refined by Klark Teknik, is the digital backbone of the Behringer X32 and Midas M32 ecosystems. Carrying 48 channels of bidirectional 24-bit 48 kHz digital audio over a single network cable with sub-millisecond latency, AES50 replaces heavy analog copper snake multicables with lightweight, interference-free digital connections.

This chapter details the AES50 protocol, stagebox hardware (S16, S32, SD8/16, DL16, DL32), mandatory shielded cabling requirements, master/slave clock synchronization, cascading, and multi-console gain sharing.

---

## 1. The SuperMAC AES50 Protocol

Each AES50 port (Port A and Port B) transmits and receives:
- **48 Bidirectional Channels**: 48 channels in, 48 channels out at 48 kHz (or 44.1 kHz) 24-bit PCM.
- **Ultra-Low Latency**: Latency across the link is deterministic: exactly 3 samples (~62.5 microseconds at 48 kHz).
- **Control Data**: Carries headamp remote commands (gain, +48V phantom power, stagebox status) multiplexed directly inside the audio stream.

```
┌─────────────────────────────────────────────────────────────┐
│ CONSOLE REAR PANEL:                                         │
│ [ AES50 PORT A ] ──► 48 In / 48 Out (Neutrik EtherCON)      │
│ [ AES50 PORT B ] ──► 48 In / 48 Out (Neutrik EtherCON)      │
│                                                             │
│ Total Network Capacity: 96 Channels In / 96 Channels Out!   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Stagebox Hardware Models Compared

| Model | Analog Inputs | Analog Outputs | Preamp Class | Key Features |
|---|---|---|---|---|
| **Behringer S16** | 16 XLR Mic/Line | 8 XLR Line | Midas-designed programmable | Ultranet P16 port, dual ADAT optical outs, cascade port. |
| **Behringer S32** | 32 XLR Mic/Line | 16 XLR Line | Midas-designed programmable | Dual AES50 ports, Ultranet port, dual ADAT outs, compact 3U chassis. |
| **Behringer SD8** | 8 Combo (XLR/TRS)| 8 XLR Line | Midas-designed programmable | 2 Hi-Z instrument inputs, 2 built-in Ultranet distribution ports. |
| **Behringer SD16**| 16 Combo (XLR/TRS)| 8 XLR Line | Midas-designed programmable | 4 Hi-Z instrument inputs, 4 built-in Ultranet distribution ports. |
| **Midas DL16** | 16 XLR Mic/Line | 8 XLR Line | **Genuine Midas Pro Preamps**| Warm analog saturation characteristics, gold-plated Neutrik connectors. |
| **Midas DL32** | 32 XLR Mic/Line | 16 XLR Line | **Genuine Midas Pro Preamps**| 32 Pro preamps, 16 balanced XLR outs, dual AES50, dual ADAT. |

---

## 3. MANDATORY REQUIREMENT: Shielded Cable & EtherCON

> **CRITICAL WARNING:** You **MUST NEVER** use standard unshielded (UTP) computer network cable for AES50 connections!

```
┌─────────────────────────────────────────────────────────────┐
│              THE ELECTROSTATIC DISCHARGE THREAT             │
├─────────────────────────────────────────────────────────────┤
│ 1. As audio snakes are pulled across stages or uncoiled,     │
│    massive static electricity (up to 15,000 volts) builds   │
│    up along the PVC outer cable jacket.                     │
├─────────────────────────────────────────────────────────────┤
│ 2. If the cable is UNSHIELDED (UTP), this static charge     │
│    sparks directly into the data pins of the console port.   │
├─────────────────────────────────────────────────────────────┤
│ 3. THE DISASTER:                                            │
│    - Instant digital clock sync loss (a deafening loud POP) │
│    - Complete audio muting on stage                         │
│    - Permanent hardware destruction of the AES50 transceiver│
│      chips (Cirrus Logic / Klark Teknik)!                   │
└─────────────────────────────────────────────────────────────┘
```

### Mandatory Cable Specifications:
1. **Shielded Twisted Pair**: **STP, FTP, or SF/UTP** Cat5e or Cat6 cable with foil or braided shield.
2. **Neutrik EtherCON Shells**: Metal EtherCON barrel connectors on both ends.
3. **Continuous Grounding**: The metal shell of the connector **must be physically soldered to the cable shield wire** on both ends to drain static charges harmlessly into the chassis ground before reaching data pins.
4. **Maximum Cable Run**: Maximum certified distance is **100 meters (330 feet)**.

---

## 4. Master / Slave Clock Synchronization

In digital audio networking, **exactly one device can serve as the Clock Master**. All other devices must operate as Clock Slaves.

```
┌───────────────────────────┐         AES50 Cat5e         ┌───────────────────────────┐
│ FRONT OF HOUSE CONSOLE    ├────────────────────────────►│ MONITOR CONSOLE           │
│ Synchronization: INTERNAL │                             │ Synchronization: AES50 A  │
│ (CLOCK MASTER: 48 kHz)    │                             │ (CLOCK SLAVE: 48 kHz)     │
└─────────────┬─────────────┘                             └───────────────────────────┘
              │ AES50 Cat5e
              ▼
┌───────────────────────────┐
│ STAGEBOX (S32 / DL32)     │
│ (Automatically Slaves to  │
│  incoming AES50 stream)   │
└───────────────────────────┘
```

### How to Configure Clocking:
1. **Front of House (Master Console)**:
   - Navigate to **SETUP → CONFIG**.
   - Set **Sample Rate** to `48 kHz` (or `44.1 kHz`).
   - Set **Synchronization** to **INTERNAL**. (A green icon appears next to Internal).
2. **Secondary / Monitor Console (Slave)**:
   - Navigate to **SETUP → CONFIG**.
   - Set **Synchronization** to **AES50 A** (or **AES50 B**, matching the cable connection).
   - Verify that the green `AES50` lock indicator illuminates solidly on the top status bar.

---

## 5. Cascading Multiple Stageboxes

You can chain two 16-channel stageboxes (e.g., two Behringer S16s or Midas DL16s) to create a 32-input / 16-output digital snake over a single run of cable back to the console:

```
[CONSOLE] (AES50 Port A)
    │
    ▼ (Shielded Cat5e Cable)
[STAGEBOX 1: S16 #1]
  - Port A: Connected to Console
  - Port B: Connected to Stagebox 2
  - Mode Switch: Standard Mode (Inputs 1–16, Outputs 1–8)
    │
    ▼ (Shielded Cat5e Jumper Cable)
[STAGEBOX 2: S16 #2]
  - Port A: Connected to Stagebox 1 Port B
  - Mode Switch: Mode "+8" (Inputs 17–32, Outputs 9–16)
```

### On the Mixing Console:
- Navigate to **ROUTING → HOME**:
  - `Inputs 1-8`   = **AES50 A 1-8** (Stagebox 1)
  - `Inputs 9-16`  = **AES50 A 9-16** (Stagebox 1)
  - `Inputs 17-24` = **AES50 A 17-24** (Stagebox 2)
  - `Inputs 25-32` = **AES50 A 25-32** (Stagebox 2)
- Navigate to **ROUTING → AES50 A OUT**:
  - `Outputs 1-8`  = **Out 1-8** (Feeds XLR Outs 1–8 on Stagebox 1)
  - `Outputs 9-16` = **Out 9-16** (Feeds XLR Outs 1–8 on Stagebox 2)

---

## 6. Multi-Console AES50 Network (FOH, Monitors & Broadcast)

Connecting Front of House, Monitor, and Broadcast desks to share stage inputs:

```
[STAGEBOX S32] ──► (Port A) ──► [MONITOR DESK] (Port A)
                                [MONITOR DESK] (Port B) ──► [FOH DESK] (Port A)
                                                            [FOH DESK] (Port B) ──► [BROADCAST]
```

1. **Monitor Console Pass-Through Routing**:
   - The Monitor Desk receives the stagebox on **AES50 Port A**.
   - To pass the raw stage inputs along to FOH, navigate on the Monitor Desk to **Routing → AES50 B Out**.
   - Route `Outputs 1-32` directly from `AES50 A 1-32`.
   - *Result*: The FOH console receives the untouched stagebox streams transparently!
2. **Gain Sharing Protection**:
   - The Monitor Desk controls physical preamps.
   - On the FOH and Broadcast desks, navigate to **SETUP → PREAMPS** and engage **HA Gain Split**.
   - FOH and Broadcast adjust independent digital trim (-18 dB to +18 dB) without disturbing the stage monitor mix.
