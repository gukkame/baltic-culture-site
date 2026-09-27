# Greener Latvia map artwork

2026-09-27. The country map labels no longer include star symbols. The name, subtitle and arrow are vertically centered as a group, with a separate mobile adjustment when the subtitle is hidden.

## Terrain assets

- Latvia: `public/artwork/painted-latvia-forest-v2.webp` (1536 × 691, WebP quality 82; 252,470 bytes).
- Lithuania: original `public/artwork/painted-land-v1.webp`.
- The new forest texture was edited with the built-in imagegen tool from the original terrain, preserving the river's course and framing. Sharp exports it at the original texture dimensions without cropping.
- Both SVG patterns use the same 800 × 360 coordinate space and placement. This retains the winding river's alignment across the country pieces.
- Latvia now uses a subtle green tint instead of the previous red-brown tint. Lithuania's artwork and tint are unchanged.
- The country geometry, raised wooden edges, country routes and hover/focus behaviour remain in `src/components/home/CountryMap.vue`.
- Original generated PNG: `exec-073f7d64-fc17-44f7-be57-ca847c162750.png` in the local imagegen output directory.

## Final imagegen prompt

Use case: precise-object-edit.
Asset type: painted terrain texture clipped by SVG country outlines on a Baltic folklore website.
Input image 1 is the EDIT TARGET. Preserve its exact wide panoramic framing, overhead viewpoint, scale and alignment, approximately 1536 x 691, ratio 2.223:1.

Primary request: turn the golden/yellow harvested land in the UPPER HALF of this image into lush green Latvian woodland and grassy clearings. Add natural mixed pine and birch forest clusters, especially across the upper-left and upper-middle fields, with rich green meadow gaps rather than a uniform wall of trees. Use cool pine green, fresh leafy green and soft moss green. Make the upper half feel as green and inviting as the lower half. Keep open readable terrain around the upper central area where a country name will be placed by the website.

CRITICAL INVARIANTS: The existing blue-green winding RIVER must stay in exactly its existing position, with the same bends, banks, width, course and visible water, across the ENTIRE canvas. Do not shift, reroute, widen, narrow, cover, interrupt or add to the river. Leave a small unchanged grassy riverbank margin around its entire course. Keep the original lower half of the image unchanged, particularly all land below about 52% canvas height; the lower portion is the Lithuanian side. Preserve the same tiny cottages and paths.
Do not shift, crop, rotate, rescale or reframe the scene. This new image must line up spatially with the original texture so the same river crosses between the two country pieces.

Style: match the original painted gouache/tempera texture, broad matte brush marks and miniature overhead countryside, coherent soft natural daylight. Keep the dimensional little trees and restrained painterly detail. No realistic photography.
Avoid: no autumn colours, golden harvest fields in the upper half, no brown/red tint, no text, labels, lettering, stars, symbols, map outlines, borders, UI, tabletop, mountains, additional rivers, roads crossing or obscuring the river.
Only edit the upper-half land cover and colour as described.
