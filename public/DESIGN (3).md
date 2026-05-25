---
name: Urban Fast Food System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5d3f3b'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#926e6a'
  outline-variant: '#e7bdb7'
  surface-tint: '#c0000f'
  primary: '#be000e'
  on-primary: '#ffffff'
  primary-container: '#e62020'
  on-primary-container: '#fffeff'
  inverse-primary: '#ffb4aa'
  secondary: '#6a5e2a'
  on-secondary: '#ffffff'
  secondary-container: '#f1df9e'
  on-secondary-container: '#6f622d'
  tertiary: '#5d5c5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#767575'
  on-tertiary-container: '#fbfeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930008'
  secondary-fixed: '#f4e2a1'
  secondary-fixed-dim: '#d7c687'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#514614'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  pure-black: '#000000'
  deep-gray: '#333333'
  ketchup-red: '#E62020'
  mustard-cream: '#FCEAA8'
typography:
  display-lg:
    fontFamily: bebasNeue
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: bebasNeue
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: bebasNeue
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
  headline-md:
    fontFamily: bebasNeue
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 28px
  accent-text:
    fontFamily: bricolageGrotesque
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: montserrat
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: montserrat
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
---

## Brand & Style
This design system captures the raw energy of urban street food culture. It is built for a high-intensity, "fast-casual" digital experience that prioritizes appetite appeal and immediate action. The brand personality is unapologetically bold, vibrant, and efficient, reflecting a "Doggy's" lifestyle that is both accessible and trend-forward.

The visual direction employs a **High-Contrast / Bold** style. We utilize massive, condensed typography and a saturated color palette to create a sense of urgency and excitement. This is balanced with generous white space and clean layouts to ensure the product remains the hero, avoiding the cluttered feel of traditional fast-food menus. The emotional goal is to evoke hunger, speed, and a modern urban vibe.

## Colors
The palette is driven by a high-energy "Ketchup and Mustard" classic fast-food pairing, modernized for digital screens. 

- **Primary (Intense Red):** Used for primary actions, branding, and highlighting key offers. It is designed to trigger appetite and urgency.
- **Secondary (Cream Yellow):** Provides a soft, appetizing contrast to the red. It should be used for card backgrounds, promotional banners, and secondary highlights to prevent the UI from feeling too aggressive.
- **Neutral/Dark:** We utilize a stark "Snow White" for clean backgrounds and "Deep Gray" or "Pure Black" for high-legibility typography and structure. 

Color usage should be purposeful: Red for "buy," Cream for "content," and Black for "information."

## Typography
The typography strategy relies on a dramatic scale contrast between the headlines and the body text.

- **Headlines:** We use **Bebas Neue** for all primary headers. This condensed, all-caps sans-serif brings an industrial, impactful, and "urban" feel to the interface. It should be used for product names, price points, and section titles.
- **Accent/Combo Names:** To inject personality and a "handcrafted" feel for special items or combos, **Bricolage Grotesque** is used. Its quirky characteristics serve as a substitute for the energetic script vibe requested, providing a distinct visual break.
- **Body & Labels:** **Montserrat** provides high legibility and a modern, geometric feel. It is used for descriptions, technical information, and navigation. 

All headings should favor tight line-heights to maintain the "condensed" aesthetic.

## Layout & Spacing
This design system follows a **Mobile-First Fluid Grid** philosophy. Given the nature of fast-food ordering, the layout is optimized for thumb-driven navigation and quick vertical scrolling.

- **Grid:** A 12-column grid is used for desktop (max-width 1200px), collapsing to a single or dual-column layout on mobile.
- **Rhythm:** A 4px baseline grid ensures tight, consistent spacing. Gutters are kept at 16px to allow content to feel dense but structured.
- **Margins:** Wider side margins (20px mobile / 40px desktop) are utilized to "frame" the content, making the vibrant cards and imagery pop against the neutral background.
- **Fixed Elements:** The navigation and "View Cart" buttons remain fixed to the bottom of the viewport on mobile devices to ensure a "sticky" conversion path.

## Elevation & Depth
Depth in this design system is handled through **Tonal Layers** supplemented by **Ambient Shadows**. 

- **Surfaces:** We use a flat base (White) with secondary containers (Cream Yellow) to define product areas.
- **Shadows:** Cards and primary buttons use extra-diffused, soft shadows with a slight warm tint (using the Deep Gray with a hint of Red/Yellow). This prevents the high-contrast elements from feeling "harsh" and gives them a tactile, reachable quality.
- **Zero-Elevation:** Inputs and secondary containers remain flat with subtle 1px borders (#EEEEEE) to maintain a clean, organized look.

## Shapes
The shape language is "Friendly-Modern." While the typography is sharp and condensed, the UI elements use significant roundedness to feel approachable and "soft," much like the products themselves (buns, snacks).

- **Standard Elements:** Buttons and input fields use a **0.5rem (8px)** corner radius.
- **High-Impact Cards:** Use **1rem (16px)** for `rounded-lg` to create a distinct, modern container for food photography.
- **Interactive Pill:** Small chips or status indicators should use the full pill-shape (999px) to contrast against the blocky headlines.

## Components

- **Buttons:** Primary buttons are large, using the Intense Red background with White Bebas Neue text. They feature a generous padding and a soft shadow to appear "pressable."
- **Cards:** Food cards are the heart of the system. They feature full-bleed imagery at the top, a Cream Yellow content area at the bottom, and a soft elevation shadow.
- **Chips:** Used for categories (e.g., "Vegan," "Spicy," "Best Seller"). These are pill-shaped with bold Montserrat labels.
- **Fixed Navigation:** A simplified mobile bar with high-contrast icons and a centered, floating action button for the "Cart."
- **Inputs:** Clean, white backgrounds with 1px Deep Gray borders. On focus, the border transitions to Intense Red.
- **Lists:** Order history and menu lists use thin dividers and large-format text for easy reading while on the move.
- **Appetite Graphics:** Incorporate "sticker-style" badges—round, slightly tilted graphics in Intense Red—to highlight discounts or new items.