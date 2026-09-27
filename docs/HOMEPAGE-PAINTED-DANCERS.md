# Integrated painted dancer homepage

2026-09-27. At the user's request, the updated homepage at main 584c421 now uses one integrated painting of the folk dance circle in the forest/cabin setting. This supersedes the earlier local photographic cutout experiment. Only the hero asset and preload references were changed; the latest upstream layout and Tailwind implementation are preserved.

## Asset and implementation

- Active asset: `public/artwork/folk-dancers-table-painted-v4.webp` (1585 × 992, WebP quality 82; 368,908 bytes).
- Created with the built-in imagegen tool from the empty painted background and the user-supplied original dance photograph, `thumb_show (1).jpg`.
- The dancers now share the surrounding brushwork, warm lighting, matte pigment and ground contact. The source dance formation and clothing guide the illustration; faces are painted interpretations.
- Original generated PNG: `exec-5466a917-ca02-4ace-b23c-f009e03afb45.png` in the local imagegen output directory.
- `src/views/Home.vue` renders a single decorative hero image. The photographic dancer overlay and its proportional canvas have been removed from the active template.
- The image crop, positioning and readability shade use Tailwind utility classes. Country map components and routing are unchanged.
- `index.html` preloads the combined image. Earlier experimental assets remain preserved in the saved Git stash for comparison.

## Final imagegen prompt

Use case: compositing / style-transfer.
Asset type: one seamless painted background for a Baltic folklore website hero, landscape 1585:992 ratio.
Image 1 is the EDIT TARGET, environment and PAINTING STYLE reference: the empty painted woodland, mossy thatched timber building, meadow and foreground oak table.
Image 2 is the PEOPLE/POSE/COSTUME reference: the real linked folk dance circle. Transfer this same group into the meadow of image 1 and paint them into the scene.

Primary request: create a convincingly unified gouache/tempera painting where these dancers belong in the setting, rather than looking like photographic cutouts. Translate their skin, faces, hair, hands, linen shirts, striped waistcoats, green bodices, red plaid skirts, wreaths, ribbons, woven socks and boots into the same broad matte brushwork, pigment texture, simplified natural forms and soft edge handling as the trees, building and wood. Keep individual facial features natural and understated; no waxy, hyper-detailed or uncanny faces. Preserve recognizable poses, costume construction, linked hands and lifted legs from the original photo. Do not add new people or duplicate limbs.

Composition: place the dance circle in the middle-right meadow behind the table, occupying approximately x=46–96% and y=22–60% of the complete canvas. Preserve the arrangement: back-facing woman with braid and green bodice near the group's center; linked dancers around her; the left-facing/right-facing men and lifted feet from the reference. Show the circle as a collective dance with natural proportions. Feet that contact the ground must rest in the grass immediately behind the table, and lifted feet must read clearly as dance steps. Integrate soft contact shadows into the meadow beneath grounded feet and gentle surrounding warm-green reflected light. Slight grass overlap at shoe edges and painterly edge integration. Keep the left 42% quiet and empty of people for cream homepage text. Match the environment's soft warm daylight, tonal contrast, perspective and scale; avoid studio-photo lighting and bright cutout edges. Tone white linen to the same warm off-white pigments used in the painting.

STRICT invariants: keep image 1's forest, cabin, broad thatched roof, meadow, table, full framing, camera position and aspect ratio. In particular preserve the table in the lower 39%: exact rear-edge position around y=61%, perspective, warm oak grain, empty surface and foreground flowers. No human body, costume or foot should cover the tabletop. The interactive country maps are added by code later, so the table MUST remain empty. No previous standing children's choir.
Output ONE opaque integrated painting, not a transparent cutout, not a collage and not a photograph pasted onto art.
Avoid: text, lettering, logos, UI, map pieces, photo halos, glossy 3D rendering, new objects, extra dancers, altered dance formation, malformed faces/hands, mountains, indoor floor, projection wall.
