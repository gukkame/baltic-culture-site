# Painted homepage — first local design study

2026-09-20. Built on main at 079e573 for visual review, following the supplied municipality-approved reference and the request for a more painted treatment. This first homepage design iteration was approved for committing and pushing to main.

## Review scope

- Homepage only: painted Baltic landscape, wooden tabletop, raised Latvia and Lithuania pieces, localized LV/LT copy, introductory section, and a clearly marked forthcoming quiz area.
- Country pieces use SVG links to the existing country routes. Raster painting fills the geographic shapes; layered edges and shadows create the raised appearance. Focus and hover lift each piece. Text stays selectable and responsive.
- Country/detail pages, content data, quiz implementation and collection remain under the existing structure.
- The homepage components and copy are in src/components/home/. src/App.vue selects the homepage shell; src/views/Home.vue assembles it. No dependency changes.
- New copy and artwork are drafts for review. The landscape is an illustrative scene and does not document a specific regional costume or location.

## Artwork files

Generated using the built-in imagegen tool, using the supplied reference image for composition, then the new hero for texture/style consistency. Original generated files remain in the local imagegen output directory.

- public/artwork/baltic-table-painted-v1.webp — painted scene and empty table (1586x992, WebP q75).
- public/artwork/painted-land-v1.webp — painted land texture clipped to the country shapes (pre-cropped to the map's 800:360 ratio, 1536x691).

The raster files are separate from all interface text, labels, and interactive controls.

The original lossless PNGs (about 3 MB each) and the 2.3 MB paper-bg.jpg were replaced by the optimized files above, cutting the homepage image weight from roughly 8.8 MB to about 0.56 MB. The originals are still in git history if the artwork ever needs re-exporting.

## Map geometry

Country outlines: [Natural Earth 1:50m Admin 0 countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson), public domain. Only Latvia and Lithuania were extracted. This is a decorative map, with a compressed vertical axis to suggest a tabletop perspective.

Stored geometry: src/components/home/countryGeometry.json. Projection across the joint bounding box: x = 55 + normalized longitude * 680 - normalized north-to-south latitude * 30; y = 28 + normalized north-to-south latitude * 275. Country labels are placed using geographic anchor points. The two pieces receive small vertical offsets for separation.

## Hero generation prompt

Use case: illustration-story / style-transfer
Asset type: wide painted background artwork for a real interactive Baltic folklore homepage. Landscape 16:10 or 3:2, very high resolution.
Input image 1 is a COMPOSITION AND SUBJECT REFERENCE, not a request to reproduce the collage or its interface. Use only the mood of the large top-left scene.
Primary request: Reimagine that scene as an authentic hand-painted gouache and tempera book-cover illustration. Confident broad brush strokes, dry brush, paper tooth, flattened painterly colour shapes, subtle imperfect edges, richly composed but deliberately simplified, mature editorial folk-art sensibility. Absolutely not photoreal, not glossy digital fantasy, no hyper-detailed AI look.
Scene: late-summer Baltic river valley, distant low hills, patchwork fields, dark pine and birch woods, soft cream clouds. A wide rustic wooden table occupies the lower 40% foreground and recedes into the landscape, warm worn oak plank surface with beautifully painted visible wood grain, inviting light. Its right two-thirds MUST be clear empty tabletop where interactive map pieces will be placed later.
One young adult woman seen from behind, in modest traditional-inspired white linen blouse and deep muted madder red woven vest with a small wildflower wreath and braid, placed at the far right, around x=80%, behind the tabletop. Simple painted silhouette, no face, restrained costume details.
Composition: top-left 45% stays spacious, deep muted blue teal sky and distant simplified landscape for cream website headline to overlay. Rich scenery and woman concentrated to right. Table spans bottom width, front edge near bottom of frame. Camera slightly elevated so a tabletop map will read well. Keep all important imagery inside full canvas.
Palette: muted indigo petrol blue, dusty forest green, warm ivory, antique ochre, muted brick red, umber wood. Quiet natural late-afternoon light without glowing fantasy.
Constraints: NO maps on the table, NO text, NO typography, NO UI, NO logos, NO icons, NO borders, NO collage, NO photos, NO lettering, NO mountains, NO dramatic sunset glare. The output is one seamless painted scene. The table is an essential compositional feature.

## Land texture generation prompt

Use case: illustration-story
Asset type: seamless-looking painted land surface for the upper face of a miniature raised map on a wooden table in a folklore website.
Generate a landscape 3:2 image of a Baltic countryside miniature viewed from nearly directly above. This will be clipped to real country outlines by website code. It must fill the entire rectangle edge to edge, with NO country outline, NO coastlines, NO sky, NO table, NO labels, NO letters, NO text, NO borders.
Style: hand-painted gouache and tempera, matte paper grain, beautiful broad confident strokes on the large scale and small dabbed marks for trees, restrained vintage storybook illustration. NOT photorealistic, NOT a glossy 3D render. Palette antique ochre grassy fields and dense deep muted pine green woods, a little blue-green winding river, pale paths, tiny dots of cream wildflowers. Small clusters of pine and birch trees especially at the left and right margins, open fields through centre for future labels. The landscape should feel lush, tangible, slightly raised, richly painted. Dappled soft afternoon light.
The attached painting is only a STYLE REFERENCE: match its painterly technique, restrained palette and natural texture. Do not copy its woman, table or sky. Create only an overhead land texture.
