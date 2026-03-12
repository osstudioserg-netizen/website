/**
 * Копирует из public в assets для статического импорта (Next.js бандлит только не-public).
 * Запускается перед build (prebuild) и в CI.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const assetsDir = path.join(root, "assets");

const copies = [
  ["images", "images"],
  ["assets/services", "services"],
  ["assets/footer", "footer"],
  ["assets/gallery", "gallery"],
  ["icons", "icons"],
  ["gallery", "gallery"],
  ["videos", "videos"],
];

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

for (const [from, to] of copies) {
  const src = path.join(publicDir, from);
  const dest = path.join(assetsDir, to);
  copyDir(src, dest);
}
