/* eslint-disable */

const stringHash = (str: string) => {
  let hash = 5381;
  let i = str?.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0;
};

const hslTriad = (h: number, s: number, l: number) => [
  [h, s, l],
  [(h + 120) % 360, s, l],
  [(h + 240) % 360, s, l],
];

const hue = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

  return p;
};

const hslRgb = (h: number, s: number, l: number) => {
  let r;
  let g;
  let b;
  h /= 360;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue(p, q, h + 1 / 3);
    g = hue(p, q, h);
    b = hue(p, q, h - 1 / 3);
  }

  return [
    Math.max(0, Math.min(Math.round(r * 255), 255)),
    Math.max(0, Math.min(Math.round(g * 255), 255)),
    Math.max(0, Math.min(Math.round(b * 255), 255)),
  ];
};

const uniqueID = () => Math.floor(Math.random() * Date.now());

export const generateAvatar = (str: string, size: number) => {
  const hash = stringHash(str);
  const colors = hslTriad(hash % 360, 1, 0.5);
  const color1 = hslRgb(colors[0][0], colors[0][1], colors[0][2]);
  const color2 = hslRgb(colors[1][0], colors[1][1], colors[1][2]);
  const color1str = `rgb(${color1[0]}, ${color1[1]}, ${color1[2]})`;
  const color2str = `rgb(${color2[0]}, ${color2[1]}, ${color2[2]})`;
  const id = uniqueID();

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg ${
    size !== undefined ? `width="${size}px" height="${size}px"` : 'class="w-[65px] h-[65px] lg:w-[75px] lg:h-[75px]"'
  } viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="${id}">
      <stop stop-color="${color1str}" offset="0%"></stop>
      <stop stop-color="${color2str}" offset="100%"></stop>
    </linearGradient>
  </defs>
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <rect id="Rectangle" fill="url(#${id})" x="0" y="0" width="80" height="80" rx="40" ry="40"></rect>
  </g>
</svg>`;
};
