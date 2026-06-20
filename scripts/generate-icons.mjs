import sharp from "sharp";
import { writeFileSync } from "fs";

const svg = (size) => {
  const s = size;
  const cx = s / 2;
  const r = s * 0.44; // Kopf-Radius

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <!-- Hintergrund -->
  <rect width="${s}" height="${s}" rx="${s * 0.2}" fill="#C4622A"/>
  <rect width="${s}" height="${s * 0.5}" rx="${s * 0.2}" fill="#D4732A" opacity="0.4"/>
  <rect y="${s * 0.5}" width="${s}" height="${s * 0.5}" rx="${s * 0.2}" fill="#C4622A"/>

  <!-- Körper -->
  <ellipse cx="${cx}" cy="${s * 0.78}" rx="${s * 0.38}" ry="${s * 0.2}" fill="#9B4414"/>
  <ellipse cx="${cx}" cy="${s * 0.76}" rx="${s * 0.34}" ry="${s * 0.17}" fill="#B5541E"/>

  <!-- Kopf -->
  <ellipse cx="${cx}" cy="${s * 0.52}" rx="${r}" ry="${r * 0.95}" fill="#B5541E"/>
  <ellipse cx="${cx - r * 0.56}" cy="${s * 0.56}" rx="${r * 0.42}" ry="${r * 0.37}" fill="#9B4414"/>
  <ellipse cx="${cx + r * 0.56}" cy="${s * 0.56}" rx="${r * 0.42}" ry="${r * 0.37}" fill="#9B4414"/>

  <!-- Brindle -->
  <path d="M${cx - r * 0.44} ${s * 0.38} Q${cx - r * 0.38} ${s * 0.56} ${cx - r * 0.42} ${s * 0.68}" stroke="#5A2008" stroke-width="${s * 0.012}" fill="none" opacity="0.4" stroke-linecap="round"/>
  <path d="M${cx - r * 0.12} ${s * 0.32} Q${cx - r * 0.08} ${s * 0.52} ${cx - r * 0.14} ${s * 0.7}" stroke="#5A2008" stroke-width="${s * 0.01}" fill="none" opacity="0.32" stroke-linecap="round"/>
  <path d="M${cx + r * 0.14} ${s * 0.32} Q${cx + r * 0.1} ${s * 0.52} ${cx + r * 0.16} ${s * 0.7}" stroke="#5A2008" stroke-width="${s * 0.01}" fill="none" opacity="0.32" stroke-linecap="round"/>

  <!-- Ohren -->
  <path d="M${cx - r * 0.72} ${s * 0.42} Q${cx - r} ${s * 0.52} ${cx - r * 0.94} ${s * 0.64} Q${cx - r * 0.72} ${s * 0.56} ${cx - r * 0.7} ${s * 0.46}Z" fill="#5A2008"/>
  <path d="M${cx + r * 0.72} ${s * 0.42} Q${cx + r} ${s * 0.52} ${cx + r * 0.94} ${s * 0.64} Q${cx + r * 0.72} ${s * 0.56} ${cx + r * 0.7} ${s * 0.46}Z" fill="#5A2008"/>

  <!-- Stirnfalten -->
  <path d="M${cx - r * 0.62} ${s * 0.37} Q${cx} ${s * 0.3} ${cx + r * 0.62} ${s * 0.37}" stroke="#5A2008" stroke-width="${s * 0.014}" fill="none" stroke-linecap="round" opacity="0.6"/>
  <path d="M${cx - r * 0.52} ${s * 0.43} Q${cx} ${s * 0.37} ${cx + r * 0.52} ${s * 0.43}" stroke="#5A2008" stroke-width="${s * 0.01}" fill="none" stroke-linecap="round" opacity="0.5"/>

  <!-- Augen weiss -->
  <ellipse cx="${cx - r * 0.44}" cy="${s * 0.5}" rx="${r * 0.36}" ry="${r * 0.38}" fill="#F5EDD6"/>
  <ellipse cx="${cx + r * 0.44}" cy="${s * 0.5}" rx="${r * 0.36}" ry="${r * 0.38}" fill="#F5EDD6"/>
  <!-- Iris -->
  <ellipse cx="${cx - r * 0.42}" cy="${s * 0.51}" rx="${r * 0.26}" ry="${r * 0.28}" fill="#3D1A00"/>
  <ellipse cx="${cx + r * 0.42}" cy="${s * 0.51}" rx="${r * 0.26}" ry="${r * 0.28}" fill="#3D1A00"/>
  <!-- Pupille -->
  <ellipse cx="${cx - r * 0.42}" cy="${s * 0.52}" rx="${r * 0.17}" ry="${r * 0.19}" fill="#0D0500"/>
  <ellipse cx="${cx + r * 0.42}" cy="${s * 0.52}" rx="${r * 0.17}" ry="${r * 0.19}" fill="#0D0500"/>
  <!-- Glanzpunkte -->
  <circle cx="${cx - r * 0.54}" cy="${s * 0.46}" r="${r * 0.11}" fill="white"/>
  <circle cx="${cx + r * 0.32}" cy="${s * 0.46}" r="${r * 0.11}" fill="white"/>
  <circle cx="${cx - r * 0.34}" cy="${s * 0.49}" r="${r * 0.045}" fill="white" opacity="0.7"/>
  <circle cx="${cx + r * 0.52}" cy="${s * 0.49}" r="${r * 0.045}" fill="white" opacity="0.7"/>

  <!-- Wimpern -->
  <path d="M${cx - r * 0.76} ${s * 0.44} Q${cx - r * 0.6} ${s * 0.38} ${cx - r * 0.46} ${s * 0.41}" stroke="#5A2008" stroke-width="${s * 0.009}" fill="none" stroke-linecap="round"/>
  <path d="M${cx - r * 0.82} ${s * 0.49} Q${cx - r * 0.68} ${s * 0.44} ${cx - r * 0.58} ${s * 0.47}" stroke="#5A2008" stroke-width="${s * 0.008}" fill="none" stroke-linecap="round"/>
  <path d="M${cx + r * 0.76} ${s * 0.44} Q${cx + r * 0.6} ${s * 0.38} ${cx + r * 0.46} ${s * 0.41}" stroke="#5A2008" stroke-width="${s * 0.009}" fill="none" stroke-linecap="round"/>
  <path d="M${cx + r * 0.82} ${s * 0.49} Q${cx + r * 0.68} ${s * 0.44} ${cx + r * 0.58} ${s * 0.47}" stroke="#5A2008" stroke-width="${s * 0.008}" fill="none" stroke-linecap="round"/>

  <!-- Nase -->
  <ellipse cx="${cx}" cy="${s * 0.615}" rx="${r * 0.32}" ry="${r * 0.22}" fill="#1A0800"/>
  <ellipse cx="${cx - r * 0.12}" cy="${s * 0.605}" rx="${r * 0.09}" ry="${r * 0.06}" fill="#2A1008" opacity="0.5"/>
  <ellipse cx="${cx + r * 0.12}" cy="${s * 0.605}" rx="${r * 0.09}" ry="${r * 0.06}" fill="#2A1008" opacity="0.5"/>

  <!-- Mund -->
  <path d="M${cx - r * 0.3} ${s * 0.672} Q${cx} ${s * 0.71} ${cx + r * 0.3} ${s * 0.672}" stroke="#1A0800" stroke-width="${s * 0.014}" fill="none" stroke-linecap="round"/>
  <path d="M${cx - r * 0.3} ${s * 0.672} Q${cx - r * 0.2} ${s * 0.69} ${cx - r * 0.1} ${s * 0.683}" stroke="#1A0800" stroke-width="${s * 0.009}" fill="none" stroke-linecap="round"/>
  <path d="M${cx + r * 0.3} ${s * 0.672} Q${cx + r * 0.2} ${s * 0.69} ${cx + r * 0.1} ${s * 0.683}" stroke="#1A0800" stroke-width="${s * 0.009}" fill="none" stroke-linecap="round"/>

  <!-- Wangen rosa -->
  <ellipse cx="${cx - r * 0.7}" cy="${s * 0.64}" rx="${r * 0.26}" ry="${r * 0.18}" fill="#E8A0BF" opacity="0.5"/>
  <ellipse cx="${cx + r * 0.7}" cy="${s * 0.64}" rx="${r * 0.26}" ry="${r * 0.18}" fill="#E8A0BF" opacity="0.5"/>

  <!-- Rakete oben rechts -->
  <text x="${s * 0.79}" y="${s * 0.28}" font-size="${s * 0.18}" text-anchor="middle" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif">🚀</text>

  <!-- Pfoten -->
  <ellipse cx="${cx - r * 0.58}" cy="${s * 0.91}" rx="${r * 0.36}" ry="${r * 0.2}" fill="#9B4414"/>
  <ellipse cx="${cx + r * 0.58}" cy="${s * 0.91}" rx="${r * 0.36}" ry="${r * 0.2}" fill="#9B4414"/>
</svg>`;
};

for (const size of [512, 192]) {
  await sharp(Buffer.from(svg(size)))
    .png()
    .toFile(`public/icon-${size}.png`);
  console.log(`✓ icon-${size}.png`);
}
