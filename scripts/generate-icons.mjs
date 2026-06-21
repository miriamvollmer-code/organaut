import sharp from "sharp";

for (const size of [512, 192]) {
  const padding = Math.round(size * 0.1);
  const bulldogge = size - padding * 2;

  // Runder orangebrauner Hintergrund + Franz drauf
  const hintergrund = Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="#C4622A"/>
      <rect width="${size}" height="${size * 0.5}" rx="${Math.round(size * 0.2)}" fill="#D4732A" opacity="0.4"/>
      <rect y="${size * 0.5}" width="${size}" height="${size * 0.5}" rx="${Math.round(size * 0.2)}" fill="#C4622A"/>
    </svg>`
  );

  const franzSkaliert = await sharp("public/Franz.png")
    .resize(bulldogge, bulldogge, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(hintergrund)
    .png()
    .composite([{ input: franzSkaliert, top: padding, left: padding }])
    .toFile(`public/icon-${size}.png`);

  console.log(`✓ icon-${size}.png`);
}
