import sharp from "sharp";
import path from "path";

const SRC = path.resolve("assets_src");
const OUT = path.resolve("public/images");

// Removes near-white background pixels by making them transparent,
// with a soft falloff near the threshold to avoid hard edges.
async function removeWhiteBackground(inputPath, outputPath, { threshold = 235, trim = true } = {}) {
  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const min = Math.min(r, g, b);
    if (min >= threshold) {
      data[i + 3] = 0;
    } else if (min >= threshold - 40) {
      const alpha = ((threshold - min) / 40) * 255;
      data[i + 3] = Math.min(data[i + 3], Math.round(alpha));
    }
  }

  let pipeline = sharp(data, { raw: { width, height, channels } });
  if (trim) pipeline = pipeline.trim();
  await pipeline.png().toFile(outputPath);
}

await removeWhiteBackground(
  path.join(SRC, "name-raw.png"),
  path.join(OUT, "name-rhinestone.png"),
  { threshold: 238 }
);

await removeWhiteBackground(
  path.join(SRC, "gemstone-raw.png"),
  path.join(OUT, "gemstone.png"),
  { threshold: 235 }
);

await removeWhiteBackground(
  path.join(SRC, "apple-raw.png"),
  path.join(OUT, "apple.png"),
  { threshold: 240 }
);

console.log("Done processing images.");
