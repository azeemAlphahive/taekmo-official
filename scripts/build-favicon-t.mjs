import sharp from "sharp";
import fs from "fs/promises";

async function makeFromGenerated() {
  const img = sharp(
    "C:/Users/Azeem/.cursor/projects/d-taekmo/assets/taekmo-favicon-t.jpg",
  );
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = data;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    if (r < 28 && g < 28 && b < 28) {
      px[i + 3] = 0;
    } else if (r < 55 && g < 55 && b < 55) {
      px[i + 3] = Math.round(((r + g + b) / 165) * 255);
    }
  }
  return sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toBuffer();
}

async function makeFromLogo() {
  const meta = await sharp("public/images/brand/taekmo-logo-light.png").metadata();
  const cropW = Math.round((meta.width || 1024) * 0.17);
  const extracted = await sharp("public/images/brand/taekmo-logo-light.png")
    .extract({ left: 0, top: 0, width: cropW, height: meta.height || 341 })
    .trim({ threshold: 8 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = extracted.data;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    if (r < 40 && g < 40 && b < 40) px[i + 3] = 0;
  }
  return sharp(px, {
    raw: {
      width: extracted.info.width,
      height: extracted.info.height,
      channels: 4,
    },
  })
    .trim()
    .png()
    .toBuffer();
}

async function fitOnCanvas(input, size, fillRatio = 0.9) {
  const maxSide = Math.round(size * fillRatio);
  const resized = await sharp(input)
    .resize({
      width: maxSide,
      height: maxSide,
      fit: "inside",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toBuffer();
}

const mark = await makeFromGenerated();
await fs.writeFile("public/favicon-t-source.png", mark);

try {
  const logoMark = await makeFromLogo();
  await fs.writeFile(
    "public/favicon-t-from-logo.png",
    await fitOnCanvas(logoMark, 512, 0.9),
  );
} catch (e) {
  console.warn("logo extract skipped:", e.message);
}

const outs = [
  ["public/icon.png", 512, 0.96],
  ["public/apple-icon.png", 180, 0.96],
  ["public/favicon-32.png", 32, 0.96],
  ["public/favicon-16.png", 16, 0.96],
  ["public/favicon-mark.png", 256, 0.96],
];

for (const [out, size, ratio] of outs) {
  await fs.writeFile(out, await fitOnCanvas(mark, size, ratio));
  console.log("wrote", out);
}

// Prefer PNG favicon; also overwrite .ico with 32px PNG bytes is invalid —
// generate a simple multi-res ico via png packing if to-ico unavailable.
try {
  const { default: toIco } = await import("to-ico");
  const buf = await toIco([
    await fitOnCanvas(mark, 16, 0.94),
    await fitOnCanvas(mark, 32, 0.94),
    await fitOnCanvas(mark, 48, 0.92),
  ]);
  await fs.writeFile("public/favicon.ico", buf);
  await fs.writeFile("src/app/favicon.ico", buf);
  console.log("wrote favicon.ico");
} catch {
  // Fallback: keep 32px png as favicon.ico is not ideal; copy mark and rely on layout png icons
  await fs.writeFile("public/favicon.ico", await fitOnCanvas(mark, 32, 0.94));
  console.log("wrote favicon.ico as png fallback (install to-ico for real ico)");
}
