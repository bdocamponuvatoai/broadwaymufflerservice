# Image generation

Five images on the site were generated with an AI image tool on 2026-10-22, during the original ChatGPT build. They are the **final site assets** (client decision, 2026-10-23), so the site does not label them.

Rules that still apply:

- Never caption these as the shop's own jobs, staff or premises. The work gallery (`/work`) uses real photos only.
- Keep this file current if an image is regenerated or replaced.

| Image                        | Master (not deployed)                                    | Web asset                                       | Used on                                         |
| ---------------------------- | -------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `hero-exhaust-workshop`      | `source-assets/generated/hero-exhaust-workshop.png`      | `assets/images/hero-exhaust-workshop.webp`      | Home hero; Open Graph image (public/og.jpg)     |
| `custom-exhaust-welding`     | `source-assets/generated/custom-exhaust-welding.png`     | `assets/images/custom-exhaust-welding.webp`     | Custom fabrication service card and page        |
| `muffler-studio`             | `source-assets/generated/muffler-studio.png`             | `assets/images/muffler-studio.webp`             | Muffler & exhaust service card and page         |
| `catalytic-converter-studio` | `source-assets/generated/catalytic-converter-studio.png` | `assets/images/catalytic-converter-studio.webp` | Catalytic converter service card and page       |
| `classic-car-drive`          | `source-assets/generated/classic-car-drive.png`          | `assets/images/classic-car-drive.webp`          | Classics & specialty cars service card and page |

Web assets are WebP at quality 82, converted from the PNG masters. `next/image` serves AVIF/WebP at responsive sizes from them.

## Prompts

### `hero-exhaust-workshop`

Use case: photorealistic-natural. Asset type: premium muffler and exhaust service website hero photograph, wide landscape 16:9. Create a completely believable high-end commercial automotive editorial photograph. Low camera angle inside a clean but authentic independent exhaust workshop in California: the rear underside of an unbranded dark graphite performance coupe safely raised on a two-post automotive lift, unmistakable stainless steel dual exhaust tubing and muffler visible, realistic tires and suspension. One experienced adult mechanic in a plain navy work shirt, dark trousers and clear safety glasses at the far right carefully inspecting an exhaust joint with a small inspection light, plausible hands and posture. Strong composition: car and mechanic occupy center-right and right two-thirds, the LEFT third consists of very dark quiet workshop shadow suitable for white headline overlay. Floor and lift bases visible with authentic wear, distant tool storage softly blurred. Natural daylight from high workshop windows, cinematic soft directional light tracing metallic surfaces, subtle cool-blue reflections, black graphite and silver dominant. Quiet confident automotive advertising photography, tactile detail, physically plausible scale, 35mm lens. No words, labels, watermarks, logos, luxury car badges, excessive smoke, fantasy tubing, sparks, or oversaturated neon. This is illustrative service photography, not a depiction of the actual Broadway Muffler shop.

### `custom-exhaust-welding`

Use case: photorealistic-natural. Asset type: premium exhaust fabrication service website photograph, landscape 3:2. An exceptionally realistic close editorial photograph of a professional automotive fabricator TIG welding a stainless steel exhaust pipe joint securely held on a well-used steel workbench. Adult technician in dark navy flame-resistant workwear, lowered proper welding helmet, leather welding gloves; both hands clearly plausible, one holding TIG torch with visible ceramic cup and the other holding thin filler rod at the seam. Small bright precise welding arc, absolutely no shower of grinding sparks. A curved 2.5-inch stainless exhaust tube and visible fine previous weld bead dominate foreground, simple welding cables and soft workshop background. Focus on careful workmanship and brushed metal, cool silver, deep graphite, subtle blue reflections from shop daylight, extremely realistic natural surface marks, shallow depth of field, 50mm commercial editorial photograph, not glossy CGI. Composition with hands and joint central, enough surrounding context for crop. No text, no logos, no badges, no watermark. Illustrative service image, not an actual Broadway customer project.

### `muffler-studio`

Use case: product-mockup. Asset type: photorealistic muffler service website feature photograph, landscape 3:2. Premium automotive catalog photography of a single real-world universal stainless-steel oval exhaust muffler with one inlet and one outlet tube on opposite ends, resting naturally on a light cool-grey seamless studio floor. Three-quarter perspective, diagonally composed from lower left to upper right, off-center to right slightly, perfectly plausible geometry and scale. Brushed satin stainless body, rolled seams, gentle machining grain, subtle heat discoloration on welded tube collar, open dark bore at near outlet, crisp but natural contact shadow, very soft reflected blue light on one edge. Minimal high-end industrial studio photography, like an elegant performance engineering editorial, not a render, no extra parts, no floating pieces, no sci-fi. Fine silver, white and grey tones. No text, labels, logo, watermarks or decorative shapes. Accurate-looking illustrative automotive component image.

### `catalytic-converter-studio`

Use case: product-mockup. Asset type: photorealistic catalytic converter service website image, landscape 3:2. High-end realistic studio product photograph of a single unbranded new automotive universal catalytic converter lying naturally on a clean light cool-grey surface, full component visible. Oval brushed stainless steel converter housing tapering at each end into short round exhaust pipe necks, one near-side neck angled toward camera with a dark visible bore, finely formed welded seams. The outer geometry must look like a functional replacement exhaust catalytic converter, no cutaway, no glowing internals, no plastic pieces. Three-quarter horizontal composition centered with generous space all around. Soft overhead diffused photography light, realistic silver surface grain and contact shadow, tiny cool-blue reflected edge, exact tactile detail, premium automotive engineering catalog photography not CGI. No words, logos, labels, watermark, graphics or claims about certification. Illustrative service component.

### `classic-car-drive`

Use case: photorealistic-natural. Asset type: premium classic vehicle and exhaust service website editorial banner, wide landscape 16:9. Realistic cinematic commercial photograph of an elegant restored late-1960s American fastback coupe, deep midnight blue paint and polished chrome rear bumper with two understated round exhaust tips. Full rear three-quarter view parked on clean pavement near a modest unbranded California industrial workshop, low camera with natural 50mm lens perspective, vehicle center-right, long morning side light. No visible people. Perfectly believable period wheels, tires, body geometry and exhaust, no readable plate or manufacturer badge. Restrained background of textured grey concrete and dark open workshop bay, subtle vegetation far away, no palm-tree cliche. Beautiful tactile paint reflections, silver metal, dark graphite, cool blue highlights, calm editorial luxury automotive photography, no oversaturated neon, no smoke, no motion blur. No words, logos, watermark. An illustrative classic car scene, not a real Broadway shop project.
