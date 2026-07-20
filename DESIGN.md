---
name: Cinava
description: A fast, minimalist video streaming experience.
colors:
  primary: "#7C5CFF"
  primary-hover: "#9272FF"
  primary-pressed: "#5D3FFF"
  background: "#07080C"
  background-secondary: "#0E121A"
  background-card: "#161B24"
  background-hover: "#1D2430"
  foreground: "#fafafa"
  border: "rgba(255, 255, 255, 0.08)"
  accent-blue: "#42A5FF"
  accent-orange: "#FF9F43"
  accent-green: "#37D67A"
  accent-red: "#FF4D67"
typography:
  sans:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
  mono:
    fontFamily: "var(--font-geist-mono), monospace"
rounded:
  card: "18px"
  button: "14px"
  poster: "16px"
  input: "14px"
  modal: "24px"
spacing: {}
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.button}"
    padding: "16px 32px"
  card:
    backgroundColor: "{colors.background-card}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: Cinava

## 1. Overview

**Creative North Star: "The Dark Room"**

Deep, ambient space with rich content making up the primary light. No distractions. The design is minimalist, utilitarian, and relies on high contrast to put the content forward. The system explicitly rejects cluttered interfaces with too many menus (traditional cable TV UIs) and avoids any elements that delay playback or distract the user.

**Key Characteristics:**
- Minimalist and utilitarian
- High contrast, dark-themed
- Tactile and confident interactions

## 2. Colors

The palette is anchored in deep space, allowing vibrant accents to punch through.

### Primary
- **Electric Indigo** (#7C5CFF): The core interactive color, used sparingly to draw the eye to primary actions without overpowering the content.

### Accent (optional)
- **Blue Accent** (#42A5FF): Secondary interactions and data highlights.
- **Orange Accent** (#FF9F43): Warnings or active states.
- **Green Accent** (#37D67A): Success states.
- **Red Accent** (#FF4D67): Destructive actions or errors.

### Neutral
- **Obsidian** (#07080C): The primary background, setting the deep ambient space.
- **Midnight Blue** (#0E121A): Secondary background for sidebars or layered regions.
- **Card Background** (#161B24): Elevated surfaces like cards and modals.
- **Foreground** (#fafafa): Primary text and icons, providing crisp contrast against the dark.
- **Border** (rgba(255, 255, 255, 0.08)): Subtle definition for structural elements.

## 3. Typography

**Body Font:** Inter (with system-ui, sans-serif fallback)
**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** Highly legible, modern, and unobtrusive, designed to stay out of the way of the content.

### Hierarchy
- **Body** (400): Primary reading text, max line length 65–75ch where applicable.
- **Label** (500, tighter tracking): Small UI elements and metadata.

## 4. Elevation

The system is layered. Deep shadows create separation for modals and hovered items against the dark background.

### Shadow Vocabulary
- **Default Shadow** (`0 20px 40px rgba(0, 0, 0, 0.35)`): Ambient separation for elevated surfaces like modals.
- **Hover Shadow** (`0 32px 64px rgba(0, 0, 0, 0.45)`): Intensified depth when elements are interacted with.

**The Layered Space Rule.** Flat by default on the base layer, with shadows only appearing to separate elevated content or respond to hover states.

## 5. Components

### Buttons
- **Shape:** Distinctly rounded corners (14px).
- **Primary:** Electric Indigo background with generous padding (16px 32px) and crisp white text.
- **Hover / Focus:** Deepens in color and elevates with a hover shadow.

### Cards / Containers
- **Corner Style:** Distinctly rounded (18px).
- **Background:** Card Background (#161B24).
- **Shadow Strategy:** Elevated with Default Shadow; increases on hover.
- **Border:** Subtle translucent border (rgba(255, 255, 255, 0.08)).
- **Internal Padding:** Generous padding to let content breathe.

### Inputs / Fields
- **Shape:** Distinctly rounded corners (14px).
- **Style:** Tactile with soft glassmorphic touches.

## 6. Do's and Don'ts

### Do:
- **Do** use deep shadows to create separation for modals and hovered items against the dark background.
- **Do** focus on the content, ensuring the UI gets out of the way of the video.
- **Do** prioritize cinematic immersion using dark, premium aesthetics that make the content pop.
- **Do** use generous padding and distinctly rounded corners (14-18px) for tactile elements.

### Don't:
- **Don't** use cluttered interfaces with too many menus (avoid traditional cable TV UIs).
- **Don't** use overly bright or harsh colors.
- **Don't** use slow, animation-heavy transitions that delay playback.
