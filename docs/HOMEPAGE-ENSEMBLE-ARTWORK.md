# Latvian ensemble homepage artwork

2026-09-27. Replaces the homepage hero with a painterly interpretation of the user-supplied `thumb_show.jpg`. The folk ensemble, clothing and timber building are based on that photograph. This is an AI-generated painted interpretation, not a documentary reproduction or a verified regional costume reference.

## Files and integration

- Active hero: `public/artwork/latvian-ensemble-table-painted-v2.webp` (1585 × 992, WebP quality 82; 402,334 bytes).
- Generated with the built-in imagegen tool; exported to WebP with Sharp, without cropping or changing the composition.
- Input 1: previous `public/artwork/baltic-table-painted-v1.webp`, used as the painting style and table reference.
- Input 2: user-supplied `thumb_show.jpg`, used as the ensemble, costume and building reference.
- The original generated PNG remains in the local imagegen output directory as `exec-7b2981da-bae3-470a-8b3c-d3f9b5ad7de2.png`.
- `src/views/Home.vue` and the homepage preload in `index.html` reference the new asset.
- The wooden table remains in the painting. Country geometry, land texture and the clickable Latvia/Lithuania links remain separate live components.
- Navigation now uses cream text over the darker forest; the mobile shade uses forest tones to maintain readable copy over the ensemble.
- The previous hero asset and first design study are retained for comparison.

## Final imagegen prompt

Use case: style-transfer / compositing.
Asset type: replacement background painting for an existing Baltic folklore website hero. Landscape canvas, match the aspect ratio and table perspective of input image 1, about 16:10.
Input image 1: EDIT TARGET and PAINTING STYLE REFERENCE — the current painted river valley, woman and oak table.
Input image 2: PRIMARY SUBJECT REFERENCE — the supplied photograph of a Latvian folk ensemble standing in front of a low dark timber building with a broad moss-covered thatched roof and pine/birch forest.

Primary request: replace the river valley and single wreath-wearing woman ABOVE the table in image 1 with a painted rendition of the actual ensemble, costumes, timber building and forest in image 2. Translate the supplied photo into the SAME rich but restrained gouache/tempera brushwork, matte pigment, visible dry brush marks and paper texture as image 1. This must feel like a coherent hand-painted illustration, not a photograph with an art filter.

Preserve the wooden foreground table from image 1: same warm worn oak planks, wood grain, perspective, angle, broad empty upper surface, and position, beginning at approximately 61% canvas height and covering the bottom 39%. The table is crucial because the website adds interactive raised Latvia and Lithuania maps on top using code. Keep the tabletop completely empty and unobstructed. Keep the table's rear edge and front edge as close to image 1 as possible.

Composition: behind the table is a real Latvian folk singing ensemble based closely on image 2. Place the ensemble across the middle-right of the canvas, approximately x=43–96%, heads around y=32–39%, feet near y=61%, fully behind the rear table edge. Preserve the group character, age range, natural proportions and recognizable variety of white headscarves and aprons, white linen shirts, red/green/grey checked waistcoats, long plaid skirts, black caps and dark trousers from the source photo. Simplify small faces into dignified natural painted features. Do not invent fantasy costumes, flower crowns, stage decorations or additional characters.
Recompose the source building behind them: dark horizontal log walls, low long roof densely thatched with earthy moss, upright pine and birch trunks beyond. Use the left 40% of the upper scene as quiet dark muted forest and shadowed timber wall/roof, with broad low-detail tonal shapes and no people there, to support existing cream website text. The ensemble should be clearly visible to the right of this reading area. Leave a quiet uppermost strip for the website navigation.

Palette and lighting: natural soft daylight, forest greens, moss ochre, warm umber, muted red textile accents, off-white linen. Painterly atmosphere and material texture should match image 1. Authentic, grounded, warm and communal.

Invariants: keep the tabletop and its perspective, empty table surface, wide hero format, and the clothing details from the supplied ensemble photo. Change only the scene behind the table as described and blend it into one seamless painting.
Avoid: no river panorama, no lone woman, no added wreaths, no glossy 3D render, no photorealism, no text, no letters, no logos, no interface, no map shapes painted into the image, no extra objects on the table, no collage borders.
