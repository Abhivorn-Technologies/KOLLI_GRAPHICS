import * as THREE from "three";

// Canvas-based print textures so the Kolli Graphics logo appears on sheets, cartons and signage.

const CMYK = ["#1fa4dc", "#e5097f", "#ffe500", "#1d1d1b"];

function drawLogo(ctx: CanvasRenderingContext2D, img: HTMLImageElement | null, x: number, y: number, w: number) {
  if (img && img.complete && img.naturalWidth > 0) {
    const h = (img.naturalHeight / img.naturalWidth) * w;
    ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
    return;
  }
  ctx.fillStyle = "#c8202b";
  ctx.font = `700 ${w * 0.12}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("KOLLI GRAPHICS", x, y);
}

function colorBar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const n = 16;
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = CMYK[i % 4] ?? "#000";
    ctx.globalAlpha = 1 - Math.floor(i / 4) * 0.2;
    ctx.fillRect(x + (i * w) / n, y, w / n - 1, h);
  }
  ctx.globalAlpha = 1;
}

export type BrandTextures = {
  sheet: THREE.CanvasTexture;
  carton: THREE.CanvasTexture;
  side: THREE.CanvasTexture;
  banner: THREE.CanvasTexture;
  redraw: (img: HTMLImageElement | null) => void;
  dispose: () => void;
};

export function createBrandTextures(): BrandTextures {
  const make = (w: number, h: number) => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return { c, t };
  };
  const sheet = make(1024, 720);
  const carton = make(512, 512);
  const side = make(256, 512);
  const banner = make(1024, 320);

  const redraw = (img: HTMLImageElement | null) => {
    // Printed press sheet: 2x2 carton layouts, register marks and colour bar.
    let ctx = sheet.c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f7f5ef"; ctx.fillRect(0, 0, 1024, 720);
      for (let r = 0; r < 2; r++) for (let q = 0; q < 2; q++) {
        const x = 40 + q * 482, y = 50 + r * 310;
        ctx.fillStyle = "#ffffff"; ctx.fillRect(x, y, 462, 290);
        const g = ctx.createLinearGradient(x, y, x + 462, y);
        g.addColorStop(0, "#c8202b"); g.addColorStop(1, "#e5097f");
        ctx.fillStyle = g; ctx.fillRect(x, y + 238, 462, 52);
        drawLogo(ctx, img, x + 231, y + 118, 300);
        ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.setLineDash([8, 6]); ctx.strokeRect(x, y, 462, 290); ctx.setLineDash([]);
      }
      colorBar(ctx, 40, 680, 944, 22);
      ctx.strokeStyle = "#1d1d1b"; ctx.lineWidth = 2;
      for (const [mx, my] of [[18, 18], [1006, 18], [18, 702], [1006, 702]] as const) {
        ctx.beginPath(); ctx.arc(mx, my, 9, 0, Math.PI * 2); ctx.moveTo(mx - 14, my); ctx.lineTo(mx + 14, my); ctx.moveTo(mx, my - 14); ctx.lineTo(mx, my + 14); ctx.stroke();
      }
    }
    // Carton front panel.
    ctx = carton.c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 512, 512);
      drawLogo(ctx, img, 256, 210, 400);
      const g = ctx.createLinearGradient(0, 0, 512, 0);
      g.addColorStop(0, "#c8202b"); g.addColorStop(0.55, "#e5097f"); g.addColorStop(1, "#1fa4dc");
      ctx.fillStyle = g; ctx.fillRect(0, 410, 512, 102);
      ctx.fillStyle = "#ffffff"; ctx.font = "700 30px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("QUALITY & CUSTOMER FIRST", 256, 472);
    }
    // Carton side panel.
    ctx = side.c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 256, 512);
      CMYK.slice(0, 3).forEach((c, i) => { ctx!.fillStyle = c; ctx!.fillRect(0, 410 + i * 34, 256, 34); });
      ctx.save(); ctx.translate(128, 210); ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "#c8202b"; ctx.font = "700 44px sans-serif"; ctx.textAlign = "center"; ctx.fillText("KOLLI", -70, 16);
      ctx.fillStyle = "#6b6b6b"; ctx.fillText("GRAPHICS", 110, 16); ctx.restore();
    }
    // Factory wall banner.
    ctx = banner.c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 1024, 320);
      drawLogo(ctx, img, 330, 150, 520);
      ctx.fillStyle = "#1d1d1b"; ctx.font = "700 40px sans-serif"; ctx.textAlign = "left";
      ctx.fillText("Quality & Customer", 640, 140);
      ctx.fillStyle = "#c8202b"; ctx.fillText("Service First", 640, 192);
      colorBar(ctx, 0, 296, 1024, 24);
    }
    [sheet, carton, side, banner].forEach((s) => { s.t.needsUpdate = true; });
  };
  redraw(null);

  return {
    sheet: sheet.t, carton: carton.t, side: side.t, banner: banner.t, redraw,
    dispose: () => [sheet, carton, side, banner].forEach((s) => s.t.dispose()),
  };
}

export function createSignTexture(number: string, title: string) {
  const c = document.createElement("canvas");
  c.width = 768; c.height = 160;
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#15191b"; ctx.fillRect(0, 0, 768, 160);
    ctx.fillStyle = "#c8202b"; ctx.fillRect(0, 0, 14, 160);
    ctx.fillStyle = "#e8a04e"; ctx.font = "700 52px sans-serif"; ctx.fillText(number, 44, 100);
    ctx.fillStyle = "#f4f1ea"; ctx.font = "700 44px sans-serif"; ctx.fillText(title.toUpperCase(), 140, 98);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createFloorTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#2a2f31"; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1400; i++) { ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`; ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2); }
    ctx.strokeStyle = "#343a3c"; ctx.lineWidth = 3;
    for (let i = 0; i <= 512; i += 128) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke(); }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(16, 6);
  return t;
}
