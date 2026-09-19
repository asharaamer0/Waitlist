# Mistral — Design System & Specification
> AI-powered voice and text note-taking for mobile

---

## 1. Brand Foundation

### What Mistral is

Mistral is an AI note-taking app that listens when you speak, reads what you share, and structures everything into clean, usable notes. The product lives between journaling and productivity — it is personal, quiet, and intelligent. The design reflects that: no flair, no dashboard energy, nothing that competes with thought. The interface recedes so the content can breathe.

### Who uses it

People who think out loud. Researchers, writers, students, and professionals who generate more ideas than they can type. They trust their tools to stay out of the way.

### The one design bet

Almost everything in the UI is the same mid-toned grey. The accent — a low-saturation dark green — earns attention precisely because it appears selectively. The product's restraint *is* the personality.

---

## 2. Color

| Name | Hex | Role |
|------|-----|------|
| Background | `#D9D9D9` | Primary canvas — all screens |
| Accent | `#374933` | Primary actions, active states, titles, icons |
| Surface | `#CACACA` | Cards, inputs, sheet backgrounds — 8% darker than background |
| Muted | `#6B6B6B` | Supporting text, captions, metadata |
| Ghost | `#A8A8A8` | Placeholder text, inactive nav, disabled states |
| White | `#F5F5F0` | Text on accent-filled backgrounds |
| Destructive | `#7A3030` | Delete, sign out, irreversible actions |

### Color rules

- `#374933` is never used decoratively. It carries meaning: interactive, active, important.
- `#D9D9D9` does the heavy lifting. It is the canvas, not the void.
- Cards (`#CACACA`) are distinguished from the background by color alone — no shadows, no elevation.
- The accent-on-background contrast ratio meets WCAG AA for text sizes 16px and above.

### What we don't use

No gradients. No drop shadows. No blur. No tints or washes. No secondary accent colors.

---

## 3. Typography

### Typefaces

| Typeface | Role | Rationale |
|----------|------|-----------|
| **Playfair Display** | Display, H1, H2, H3, note titles | Serif with editorial warmth. Anchors the emotional register. Used wherever hierarchy and personality matter. |
| **Gorestka** | Body, UI labels, captions, buttons, inputs | Geometric, low-key, highly legible at small sizes. Handles all functional text. |

These two faces are clearly distinct — one serif for feeling, one geometric for function. They never overlap in semantic role.

### Type scale

| Level | Typeface | Size | Weight | Line height | Usage |
|-------|----------|------|--------|-------------|-------|
| Display | Playfair Display | 48px | 700 | 1.1 | Welcome screen wordmark |
| H1 | Playfair Display | 26px | 600 | 1.2 | Screen titles (Home, Notes) |
| H2 | Playfair Display | 22px | 600 | 1.25 | Sheet titles, modal headers |
| H3 | Playfair Display | 17px | 500 italic | 1.3 | Note titles in cards, section headings |
| Body | Gorestka | 15px | 400 | 1.65 | Note content, body copy |
| Label | Gorestka | 13px | 500 | 1.4 | Section labels, filter chips, metadata |
| Caption | Gorestka | 11px | 400 | 1.4 | Timestamps, file size, secondary metadata |
| Button | Gorestka | 14px | 600 | 1 | All interactive button text |
| Input | Gorestka | 15px | 400 | 1.5 | All text field content and placeholders |

### Typographic rules

- Sentence case everywhere. No ALL CAPS labels, no Title Case in body content.
- Maximum line length: 72 characters for body copy, 52 for captions.
- Playfair Display never appears smaller than 17px. Below that, use Gorestka.
- Never mix Playfair and Gorestka in the same semantic role (e.g., a heading is one or the other, not both).
- Placeholder text uses `#A8A8A8` (Ghost). Active input text uses `#374933`.
- Section labels use Gorestka 11px, `#374933`, letter-spacing 0.08em — this is the only place we use tracked letterforms.

---

## 4. Spacing & Layout

### Grid

- Horizontal gutter: **20px** (left and right margin on all screens)
- Vertical section gap: **24px**
- Internal card padding: **16px** all sides
- Spacing unit: **8px** base grid

### Spacing tokens

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px | Icon-to-label gaps, tight pairs |
| `space-sm` | 8px | Between related elements, card gaps |
| `space-md` | 16px | Card padding, between grouped items |
| `space-lg` | 24px | Between sections |
| `space-xl` | 40px | Between major zones |

### Border radius

| Element | Radius |
|---------|--------|
| Cards, bottom sheets | 16px |
| Buttons | 12px |
| Text inputs | 12px |
| Pills, chips, tags | 999px (full round) |
| FAB | 24px |
| Toggles | 999px |

### Borders

Cards and inputs use a 1px inset border: `rgba(55, 73, 51, 0.10)`. This is not a shadow — it is a structural edge, drawn from the accent color at low opacity so it reads as deliberate rather than mechanical.

No element in the UI uses `box-shadow`. Elevation is implied by the color step between background and surface.

---

## 5. Components

### Note Card

The fundamental unit of the product. Appears on Home, Notes list, and Search results.

```
┌─────────────────────────────────────────┐  ← #CACACA bg, 16px radius,
│  Product roadmap discussion             │    1px inset border rgba(55,73,51,0.10)
│  ─ Playfair Display 17px #374933        │
│                                         │
│  Key themes included user onboarding    │  ← Gorestka 13px #6B6B6B
│  friction and the new search arch…      │    2-line clamp, line-height 1.5
│                                         │
│  🎙 Voice · 3 min          2h ago       │  ← Gorestka 11px #A8A8A8
└─────────────────────────────────────────┘
```

**Anatomy:**
- Title: Playfair Display 17px, `#374933`, 1-line clamp with ellipsis
- Preview: Gorestka 13px, `#6B6B6B`, 2-line clamp
- Footer: source icon (16px outline) + source label + duration, right-aligned timestamp
- Padding: 16px all sides
- Swipe left: reveals red delete (`#7A3030`) and green star (`#374933`) actions

---

### Primary Button

```
┌─────────────────────────────────────────┐
│           Create account                │  ← Gorestka 14px 600, #F5F5F0
└─────────────────────────────────────────┘
  Fill: #374933  Height: 52px  Radius: 12px  Width: full (350px max)
```

---

### Ghost Button

```
┌─────────────────────────────────────────┐
│              Sign in                    │  ← Gorestka 14px 600, #374933
└─────────────────────────────────────────┘
  Fill: transparent  Border: 1px solid #374933  Height: 52px  Radius: 12px
```

---

### Text Input

```
┌─────────────────────────────────────────┐
│  ada@email.com                          │
└─────────────────────────────────────────┘
  Fill: #CACACA  Height: 52px  Radius: 12px
  Border: 1px inset rgba(55,73,51,0.15)
  Focus border: 2px solid #374933
  Font: Gorestka 15px #374933
  Placeholder: Gorestka 15px #A8A8A8
```

---

### Filter Chip

Active state (selected):
```
 ┌──────────┐
 │  Voice   │   Fill: #374933  Text: #F5F5F0  Gorestka 12px 600
 └──────────┘   Radius: 999px  Padding: 8px 16px
```

Inactive state:
```
 ┌──────────┐
 │  Voice   │   Fill: #CACACA  Text: #6B6B6B  Gorestka 12px 500
 └──────────┘   Border: 1px rgba(55,73,51,0.15)
```

---

### Section Label

Used above grouped content throughout the app. Never as decoration — only when it introduces content the user needs to navigate.

```
  SUMMARY                               ← Not ALL CAPS — this is:
                                           Gorestka 11px, #374933, letter-spacing 0.08em
```

---

### Bottom Navigation Bar

Height: 80px (including safe area). Background: `#D9D9D9`. Top border: `1px solid rgba(55,73,51,0.12)`.

```
 ┌────────────────────────────────────────────────┐
 │   🏠 Home   📓 Notes   🔍 Search   ⚙ Settings │
 │   (active)                                     │
 └────────────────────────────────────────────────┘
```

- Active tab: icon + label, `#374933`
- Inactive tab: icon + label, `#A8A8A8`
- Labels: Gorestka 10px
- No pill background on active — color change only

---

### Floating Action Button (FAB)

```
    ╭────╮
    │ ＋ │   56px circle, #374933 fill, white plus icon (20px)
    ╰────╯   Border: 1px inset rgba(0,0,0,0.15)
```

Position: 20px from bottom navbar, 20px from right edge.

---

### Toggle Switch

Width: 44px. Height: 26px. Radius: 999px.

- On: `#374933` track, white thumb
- Off: `#A8A8A8` track, white thumb
- Transition: 200ms ease

---

### Waveform Recording Animation

The centrepiece of the Recording screen. Not decorative — it is the primary feedback mechanism telling the user the app is listening.

**Structure:** 14 vertical bars, 2px wide, 4px gap, full-round ends, arranged in a horizontal cluster 120px wide.

**Colors:** `#374933`

**Animation behaviour:**
- Each bar animates height between 12% and 85% of max height (max: 64px)
- Each bar runs on an independent sine curve with a unique phase offset (distributed 0–2π)
- Period: 2.2–3.4 seconds per bar (slightly randomised)
- Easing: `ease-in-out` on each keyframe
- Overall impression: a slow, breathing organism — not a mechanical equaliser

**Paused state:** All bars settle to 30% height over 400ms. The animation holds, not stops.

**Processing state:** Bars compress horizontally to a single point over 600ms, then expand into a circular progress ring.

---

### Refine Bar

Pinned above the tab bar on the Note Detail screen. The AI prompt interface.

```
┌───────────────────────────────────┬───┐
│  Refine or ask about this note…   │ ↑ │
└───────────────────────────────────┴───┘
  Height: 52px  Fill: #CACACA  Radius: 12px  Margin: 12px horizontal
  Font: Gorestka 14px  Placeholder: #A8A8A8
  Send icon: ti-send, #374933, 20px, right-padded 14px
```

---

### Settings Row

```
  Default input mode                    Voice  ›
  ─────────────────────────────────────────────
  Auto-title notes                     [ ON ]
```

- Label: Gorestka 15px, `#374933`
- Value: Gorestka 14px, `#A8A8A8`
- Chevron: `ti-chevron-right`, 16px, `#A8A8A8`
- Divider: 1px `rgba(55,73,51,0.08)`, full width, inset 0px left
- Row height: 52px

---

## 6. Icons

**Style:** Outline only. 1.5px stroke. Geometric, minimal. No filled variants.

**Library:** Tabler Icons (outline subset)

| Context | Icon | Size |
|---------|------|------|
| Navigation: Home | `ti-home` | 22px |
| Navigation: Notes | `ti-notebook` | 22px |
| Navigation: Search | `ti-search` | 22px |
| Navigation: Settings | `ti-settings` | 22px |
| New note FAB | `ti-plus` | 20px |
| Back navigation | `ti-chevron-left` | 20px |
| Overflow menu | `ti-dots` | 20px |
| Note source: voice | `ti-microphone` | 16px |
| Note source: text | `ti-pencil` | 16px |
| Note source: PDF | `ti-file-type-pdf` | 16px |
| Note source: YouTube | `ti-brand-youtube` | 16px |
| Starred | `ti-star` | 16px |
| Refine/send | `ti-send` | 20px |
| Settings chevron | `ti-chevron-right` | 16px |
| Search field | `ti-search` | 16px |
| Recent search | `ti-clock` | 14px |
| Dismiss | `ti-x` | 14px |
| Pause recording | `ti-player-pause` | 20px |
| Stop recording | `ti-square` | 20px |
| Bookmark/flag | `ti-flag` | 20px |
| Password toggle | `ti-eye` / `ti-eye-off` | 16px |

All icons: color inherits from context. Decorative icons carry `aria-hidden="true"`. Icon-only buttons carry `aria-label`.

---

## 7. Motion

### Principles

Motion communicates state change, not style. One transition does one job. We don't animate things just because we can.

### Transition defaults

| Property | Value |
|----------|-------|
| Duration | 280ms |
| Easing | `ease-in-out` |
| Reduced motion | All transitions collapse to instant (respects `prefers-reduced-motion`) |

### Specific transitions

| Interaction | Animation |
|-------------|-----------|
| Bottom sheet open | Slide up from bottom + opacity 0→1, 280ms ease-in-out |
| Bottom sheet close | Slide down + opacity 1→0, 220ms ease-in |
| Note card entry | Translate Y +12px → 0, opacity 0→1, 240ms ease-out |
| Tab switch | Horizontal slide: departing screen exits at -20px, entering at +20px. No bounce. |
| FAB tap | Scale 0.95 for 100ms, then release |
| Recording bars | Continuous sine animation — see Waveform spec above |
| Processing animation | 600ms bar collapse → ring expand, `ease-in-out` |
| Toggle switch | 200ms linear thumb slide |
| Filter chip activation | Background color transition, 150ms |

### What we don't animate

- Page-load fade-ins per section
- Hover states on cards (mobile — no hover)
- Skeleton loaders (use simple "Curating…" loading state instead)

---

## 8. Screens

### 8.1 Welcome / Splash

**Purpose:** Single first impression. Typographic only — no illustration, no icon.

**Layout:** Centered vertical stack on `#D9D9D9`.

```
                    [status bar — 44px]


           Mistral
        ─────────────              ← 1px rule, 60px wide, #374933 40% opacity

  Think out loud. Read anything.
      Remember everything.

                                   ← 64px gap

  ┌─────────────────────────────┐
  │        Get started          │  ← Primary button
  └─────────────────────────────┘

  ┌─────────────────────────────┐
  │           Sign in           │  ← Ghost button
  └─────────────────────────────┘

      By continuing, you agree
      to our Terms & Privacy

```

**Copy:**
- Wordmark: "Mistral" — Playfair Display 48px, `#374933`, weight 700
- Tagline: "Think out loud. Read anything. Remember everything." — Gorestka 15px, `#6B6B6B`, centered, max 240px wide
- Footer: "By continuing, you agree to our Terms & Privacy" — Gorestka 11px, `#A8A8A8`

---

### 8.2 Sign Up

**Purpose:** Account creation with minimal friction.

```
  [status bar]
  Create your account
  Your notes. Private, fast, always with you.

  ┌─────────────────────────────┐
  │  Full name                  │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │  Email                      │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │  Password              👁   │
  └─────────────────────────────┘

  ┌─────────────────────────────┐
  │        Create account       │
  └─────────────────────────────┘

  ───────── or continue with ─────────

  ┌────────────┐   ┌────────────┐
  │  G Google  │   │  A Apple   │
  └────────────┘   └────────────┘

  Already have an account? Sign in
```

**Field placeholders:** "Ada Lovelace" / "ada@email.com" / "At least 8 characters"

---

### 8.3 Sign In

```
  [status bar]
  Welcome back.
  Your notes are waiting.

  ┌─────────────────────────────┐
  │  Email                      │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │  Password  Forgot? ────────→│
  └─────────────────────────────┘

  ┌─────────────────────────────┐
  │           Sign in           │
  └─────────────────────────────┘

  ───────── or continue with ─────────

  ┌────────────┐   ┌────────────┐
  │  G Google  │   │  A Apple   │
  └────────────┘   └────────────┘

  Don't have an account? Get started
```

"Forgot?" appears right-aligned inline with the Password label. Gorestka 12px, `#374933`.

---

### 8.4 Home

```
  [status bar — 44px]

  Good morning,                         [AL]
  Ada.

  ┌─────────┐  ┌─────────┐  ┌─────────┐
  │   28    │  │    6    │  │   4h    │
  │  notes  │  │ this wk │  │recorded │
  └─────────┘  └─────────┘  └─────────┘

  Recent                            See all

  ┌─────────────────────────────────────┐
  │  Product roadmap discussion         │
  │  Key themes included user onboard…  │
  │  🎙 Voice · 3 min         2h ago    │
  └─────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │  Book notes: Thinking Fast and Slow │
  │  Kahneman distinguishes between Sy… │
  │  📄 PDF · 4 pages       Yesterday   │
  └─────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │  Research: neural scaling laws      │
  │  The relationship between model si… │
  │  ✏️ Text                  5 min ago  │
  └─────────────────────────────────────┘

                                      ╭─╮
                                      │+│  ← FAB
                                      ╰─╯
  ─────────────────────────────────────────
    🏠 Home    📓 Notes   🔍    ⚙
```

**Stats strip:** Metric cards in a row, 8px gaps. Numeral: Playfair Display 18px `#374933`. Label: Gorestka 10px `#6B6B6B`. Card: `#CACACA`, 12px radius, 40px tall.

---

### 8.5 New Note — Mode Selection Sheet

Triggered by FAB. Bottom sheet, 340px height.

```
                  ────           ← 4×40px handle, #A8A8A8

              New note
        How do you want to capture?

    ┌──────────────┐  ┌──────────────┐
    │              │  │              │
    │  🎙 Record   │  │  ✏ Text      │
    │  Speak free  │  │  Type, paste │
    │              │  │  or import   │
    └──────────────┘  └──────────────┘

                Cancel
```

Tiles: `#CACACA` bg, 16px radius, 120px tall. Equal width (calc 50% - 4px).

---

### 8.6 Recording Screen

```
  Cancel     Untitled recording       0:42

  ┌─────────────────────────────────────┐
  │                                     │
  │                                     │
  │   ▁▃▇▅▂▆▃▇▄▁▅▃▆▄                   │  ← Waveform bars, animating
  │                                     │
  │           Listening…                │
  │                                     │
  └─────────────────────────────────────┘

       ╭─────╮   ╭─────────╮   ╭─────╮
       │  ⏸  │   │  ■ Stop │   │  🚩 │
       ╰─────╯   ╰─────────╯   ╰─────╯
                 Stop & generate notes
```

**Controls:**
- Pause: 48px circle, 1px border `#374933`, pause icon
- Stop: 64px circle, `#374933` fill, white stop icon, 20px radius (squircle feel)
- Flag: 48px circle, 1px border `#374933`, flag icon — marks a timestamp
- "Listening…": Gorestka 13px `#374933` italic

---

### 8.7 Processing Screen

```
  [status bar]




        [waveform bars collapsing → spinner ring]

          Curating your notes…
      This usually takes 10–30 seconds




                  Cancel
```

Centered layout. Playfair Display 22px title. Gorestka 13px muted subtitle. The animation bridges the Recording screen visually — same bar cluster, now closing.

---

### 8.8 Text Input Mode

```
  ← Back          New note         Save

  ─────────────────────────────────────
  Title your note…
  ─────────────────────────────────────

  Start writing…




  ─────────────────────────────────────
  [↑ PDF]  [▶ YouTube]  [📋 Paste]
```

- Title: Playfair Display 22px, `#374933`, no border — full width, underline only on focus
- Body: Gorestka 15px, `#374933`, line-height 1.7, full-height scrollable
- Import chips: pinned above keyboard, horizontally scrollable
- Chip style: `#CACACA` bg, 1px border `rgba(55,73,51,0.20)`, Gorestka 12px `#374933`, full-round

---

### 8.9 Note Detail — Open Note

```
  ← Product roadmap discussion       ···

  Voice · Mon, 4 Nov · 3 min recorded

  ─────────────────────────────────

  Summary
  The session covered three primary themes:
  search architecture, onboarding friction,
  and the Q4 roadmap structure…

  ─────────────────────────────────

  Key points
  ● Onboarding drop-off at step 3 is 42%
  ● Search latency target: under 200ms
  ● New IA proposal reviewed positively
  ● Design review scheduled for Thursday

  ─────────────────────────────────

  Action items
  ☑  Share updated IA doc with team
  ☐  Book design review for Thursday
  ☐  Write brief for onboarding audit

  ─────────────────────────────────

  Full transcript                       ›

  ─────────────────────────────────

  ┌─────────────────────────────┬───┐
  │  Refine or ask about this…  │ ↑ │
  └─────────────────────────────┴───┘

  ─────────────────────────────────────
    🏠 Home   📓 Notes   🔍   ⚙
```

**Key points:** 6px circle bullet, `#374933`, 12px gap. Gorestka 15px body.

**Action items:** Checkbox rows — unchecked: 1px border `#374933`; checked: `#374933` fill, white tick, label `#A8A8A8` with strikethrough.

**Transcript row:** Gorestka 14px `#374933`, chevron right — collapsed by default, expands inline.

---

### 8.10 Notes Page

```
  [status bar]
  Notes

  [All] [Voice] [Text] [PDF] [YouTube] [★]    Recent ↓

  Today

  ┌──────────────────────────────────────┐
  │  Product roadmap discussion          │
  │  Key themes included user onboardi…  │
  │  🎙 Voice · 3 min           2h ago   │
  └──────────────────────────────────────┘

  ┌──────────────────────────────────────┐
  │  Research: neural scaling laws       │
  │  The relationship between model siz… │
  │  ✏ Text                   5 min ago  │
  └──────────────────────────────────────┘

  Yesterday

  ┌──────────────────────────────────────┐
  │  Book notes: Thinking Fast and Slow  │
  │  Kahneman distinguishes between Sy…  │
  │  📄 PDF · 4 pages         Yesterday  │
  └──────────────────────────────────────┘

  ─────────────────────────────────────────
    🏠 Home   📓 Notes   🔍   ⚙
```

Date group headers: Gorestka 11px, `#A8A8A8`, letter-spacing 0.08em.
Swipe-left actions: Delete (`#7A3030`), Star (`#374933`). Each: 72px wide, label Gorestka 13px white.

---

### 8.11 Search Page

```
  [status bar]
  Search

  ┌🔍─────────────────────────────────────┐
  │  Search notes, transcripts, PDFs…     │
  └───────────────────────────────────────┘

  Recent
  🕐 scaling laws                         ×
  🕐 meeting notes oct                    ×
  🕐 book summary                         ×

  Topics in your notes

  ┌──────────────┐  ┌──────────────┐
  │  AI research │  │    Product   │
  └──────────────┘  └──────────────┘
  ┌──────────────┐  ┌──────────────┐
  │     Books    │  │   Personal   │
  └──────────────┘  └──────────────┘
  ┌──────────────┐  ┌──────────────┐
  │   Meetings   │  │     Ideas    │
  └──────────────┘  └──────────────┘

  ─────────────────────────────────────────
    🏠 Home   📓 Notes   🔍   ⚙
```

Topic chips: `#CACACA` bg, full-round, Gorestka 13px `#374933`. 2-column grid, 8px gap.

---

### 8.12 Settings Page

```
  [status bar]
  Settings

  ┌────────────────────────────────────┐
  │  [AL]  Ada Lovelace             ›  │
  │        ada@mistral.app             │
  └────────────────────────────────────┘

  ┌────────────────────────────────────┐  Notes
  │  Default input mode    Voice    ›  │
  │  ─────────────────────────────     │
  │  Auto-title notes        [ON]      │
  │  ─────────────────────────────     │
  │  Language            English    ›  │
  └────────────────────────────────────┘

  ┌────────────────────────────────────┐  AI
  │  Refinement model   Mistral 7B  ›  │
  │  ─────────────────────────────     │
  │  Auto-summarize          [ON]      │
  │  ─────────────────────────────     │
  │  Action item detection   [ON]      │
  └────────────────────────────────────┘

  ┌────────────────────────────────────┐  Account
  │  Subscription  Free plan [Upgrade] │
  │  ─────────────────────────────     │
  │  Notifications           [ON]      │
  │  ─────────────────────────────     │
  │  Export all notes               ›  │
  │  ─────────────────────────────     │
  │  Delete account                    │  ← #7A3030
  └────────────────────────────────────┘

  ┌────────────────────────────────────┐  App
  │  Appearance          System     ›  │
  │  ─────────────────────────────     │
  │  Haptic feedback         [ON]      │
  │  ─────────────────────────────     │
  │  App version             1.0.0     │
  └────────────────────────────────────┘

              Sign out                    ← Gorestka 14px #7A3030

  ─────────────────────────────────────────
    🏠 Home   📓 Notes   🔍   ⚙
```

Group section labels: Gorestka 11px `#374933`, letter-spacing 0.08em, above each card.
Upgrade badge: `#374933` fill, Gorestka 11px white, 4px × 10px padding, full-round.

---

### 8.13 Empty State

```
  [status bar — Notes tab active]
  Notes

                  [All] [Voice] [Text]…

          ┌──────────────────────────┐
          │                          │
          │       🎙 📓              │  ← Outline icon, 64×64px, #374933 20% opacity
          │  Your notes will         │
          │      live here           │
          │                          │
          │  Start a recording or    │
          │  type a note — Mistral   │
          │  will organise it all.   │
          │                          │
          │  ┌─────────────────┐     │
          │  │ Create a note   │     │  ← Full-round pill, #374933, 200px
          │  └─────────────────┘     │
          └──────────────────────────┘

  ─────────────────────────────────────────
    🏠 Home   📓 Notes   🔍   ⚙
```

Title: Playfair Display 20px `#374933`. Body: Gorestka 14px `#6B6B6B`, centered, max 260px.

---

### 8.14 PDF Import Sheet

Shown after tapping "Upload PDF" on the Text Input screen. Slides up 240px.

```
  ╔═══════════════════════════════════════╗  ← 240px sheet from bottom
  ║            ────                       ║
  ║                                       ║
  ║   ┌  ─  ─  ─  ─  ─  ─  ─  ─  ┐      ║  ← Dashed border, 1px #374933 40%
  ║   │   Drop your PDF here       │      ║
  ║   │          or                │      ║
  ║   │      Browse files          │      ║
  ║   └  ─  ─  ─  ─  ─  ─  ─  ─  ┘      ║
  ║                                       ║
  ║   Mistral will read and summarise     ║
  ║   this document.                      ║
  ║                                       ║
  ║  ┌─────────────────────────────────┐  ║
  ║  │    Import & generate notes      │  ║
  ║  └─────────────────────────────────┘  ║
  ╚═══════════════════════════════════════╝
```

Post-selection state (file chosen): Replace the drag zone with a file preview card:
```
  ┌─────────────────────────────────────┐
  │  📄  research_paper.pdf          ×  │
  │      24 pages · 1.2 MB              │
  └─────────────────────────────────────┘
```

File name: Playfair Display 15px. Metadata: Gorestka 12px `#6B6B6B`. Dismiss: `ti-x`, 14px, `#A8A8A8`.

---

## 9. Content & Copy

### Voice principles

- Sentence case always. "Create account" not "Create Account".
- No exclamation marks in system copy.
- Active, specific CTAs: "Stop & generate notes" not "Submit recording".
- Empty states are invitations, not apologies. Name the space, then tell the user what to do.

### Sample note titles (use throughout mocks)

- "Product roadmap discussion"
- "Book notes: Thinking Fast and Slow"
- "Research: neural scaling laws"
- "Weekly review — November"
- "Ideas for the search redesign"
- "Phone call with Priya"

### Placeholder inputs

- Full name: "Ada Lovelace"
- Email: "ada@mistral.app"
- Password: "At least 8 characters"
- Note title: "Title your note…"
- Body: "Start writing…"
- Refine bar: "Refine or ask about this note…"
- Search: "Search notes, transcripts, PDFs…"

---

## 10. Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Colour contrast (text) | `#374933` on `#D9D9D9`: 5.2:1 — passes WCAG AA |
| Colour contrast (muted) | `#6B6B6B` on `#D9D9D9`: 4.6:1 — passes WCAG AA |
| Minimum tap target | 44×44px (all interactive elements) |
| Focus indicators | 2px solid `#374933` outline, 2px offset |
| Motion | All animations respect `prefers-reduced-motion: reduce` — transitions collapse to instant |
| Screen reader | Decorative icons carry `aria-hidden="true"`; icon-only buttons carry descriptive `aria-label` |
| Input labels | All inputs have visible or `aria-label` labels — no label-less inputs |

---

## 11. File & Asset Naming

```
mistral/
├── design.md                   ← This file
├── tokens/
│   ├── colors.json
│   ├── typography.json
│   └── spacing.json
├── components/
│   ├── note-card.figma
│   ├── bottom-nav.figma
│   ├── buttons.figma
│   └── recording-waveform.figma
└── screens/
    ├── 01-welcome.figma
    ├── 02-signup.figma
    ├── 03-signin.figma
    ├── 04-home.figma
    ├── 05-new-note-sheet.figma
    ├── 06-recording.figma
    ├── 07-processing.figma
    ├── 08-text-input.figma
    ├── 09-note-detail.figma
    ├── 10-notes-list.figma
    ├── 11-search.figma
    ├── 12-settings.figma
    ├── 13-empty-state.figma
    └── 14-pdf-import.figma
```

---

## 12. Design Decisions Log

**Why no shadows?**
Shadows imply depth — a visual language that suggests the UI has layers to explore. Mistral has no layers to explore; it has content to focus on. The colour step between `#D9D9D9` (background) and `#CACACA` (surface) communicates elevation without competing with the content.

**Why Playfair Display for a productivity app?**
Most note-taking apps reach for a system sans-serif or a humanist face and end up feeling like a generic tool. Mistral is personal — it captures thought. Playfair gives the screen warmth and editorial weight without sacrificing legibility. It also pairs with Gorestka in a way that creates genuine typographic hierarchy rather than just size variation.

**Why is the accent so dark?**
`#374933` is desaturated and deep. On `#D9D9D9`, it reads clearly without visual aggression. It feels like a pencil mark on paper, not a UI affordance screaming for attention. That quiet authority is the product's register.

**Why 14 waveform bars instead of, say, 30?**
Too many bars become noise. 14 bars with meaningful phase offsets create a readable, organic rhythm that the eye can track. More bars would read as a stock equaliser. The goal is "the app is listening"; not "the app is processing audio".

**Why no skeleton loaders?**
A processing screen with animated content creates anxiety — it implies unknown duration. A simple "Curating your notes… this usually takes 10–30 seconds" with a single animation gives the user a frame. The waveform-to-spinner transition signals the same state change with less UI overhead.
