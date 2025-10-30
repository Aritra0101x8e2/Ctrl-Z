import React, { useEffect, useRef } from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-5 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium transition ${
      className || "bg-violet-500 hover:bg-violet-400 text-white"
    }`}
  >
    {children}
  </button>
);

function LandingPage() {
  const canvasRef = useRef(null);
  const burstRef = useRef([]);

 useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d", { alpha: false });

  const colors = {
    backgroundTop: "#080011",
    backgroundBottom: "#000000",
    particleGlow: "rgba(170, 0, 255, 0.9)",
    connection: "rgba(170, 0, 255, 0.4)",
    textColor: "#B266FF",
    burstColors: [
      "rgba(200, 0, 255, 0.6)",
      "rgba(180, 0, 200, 0.5)",
      "rgba(160, 0, 255, 0.4)",
    ],
  };

  const setSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  setSize();
  window.addEventListener("resize", setSize);

  const mouse = { x: null, y: null };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  const numParticles =
    window.innerWidth < 480 ? 120 : window.innerWidth < 1024 ? 300 : 600;

  class Particle {
    constructor(x, y) {
      this.x = x ?? Math.random() * canvas.width;
      this.y = y ?? Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.8;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.speedY = (Math.random() - 0.5) * 1.2;
      this.baseX = this.x;
      this.baseY = this.y;
      this.targetX = null;
      this.targetY = null;
      this.phase = "free";
      this.fade = 1;
    }

    update() {
      if (this.phase === "free") {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            this.x += dx / 20;
            this.y += dy / 20;
          }
        }
      } else if (this.phase === "forming" && this.targetX !== null) {
        this.x += (this.targetX - this.x) * 0.08;
        this.y += (this.targetY - this.y) * 0.08;
      } else if (this.phase === "dispersing") {
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;
        this.fade -= 0.04;
        if (this.fade < 0) this.fade = 0;
      }
    }

    draw() {
      if (this.fade <= 0) return;
      const glow = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size * 5
      );
      glow.addColorStop(0, colors.particleGlow);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = this.fade;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // ✅ changed to let — needed for reassignment
  let particles = Array.from({ length: numParticles }, () => new Particle());

  // Text mapping for Ctrl Z
  const textCanvas = document.createElement("canvas");
  const textCtx = textCanvas.getContext("2d");
  const prepareTextTargets = () => {
    const text = "Ctrl Z";
    const fontSize = Math.min(canvas.width * 0.22, 200);
    textCanvas.width = canvas.width;
    textCanvas.height = canvas.height;
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textCtx.fillStyle = colors.textColor;
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";
    textCtx.font = `900 ${fontSize}px 'Segoe UI', Arial, sans-serif`;
    textCtx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);

    const { data, width, height } = textCtx.getImageData(
      0,
      0,
      textCanvas.width,
      textCanvas.height
    );
    const positions = [];
    const gap = 5;
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const i = (y * width + x) * 4;
        if (data[i + 3] > 150) positions.push({ x, y });
      }
    }
    return positions;
  };
  let textPoints = prepareTextTargets();
// Generate points along a rectangle around the "Ctrl Z" text
const prepareRectTargets = (padding = 70, gap = 8) => {
  const text = "Ctrl Z";
  const fontSize = Math.min(canvas.width * 0.22, 200);
  textCanvas.width = canvas.width;
  textCanvas.height = canvas.height;
  textCtx.font = `900 ${fontSize}px 'Segoe UI', Arial, sans-serif`;
  const metrics = textCtx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = fontSize * 0.8;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const rectW = textWidth + padding * 2;
  const rectH = textHeight + padding * 2;

  const left = cx - rectW / 2;
  const top = cy - rectH / 2;
  const right = cx + rectW / 2;
  const bottom = cy + rectH / 2;

  const pts = [];

  // Rectangle outline (top, right, bottom, left)
  for (let x = left; x <= right; x += gap) pts.push({ x, y: top });
  for (let y = top; y <= bottom; y += gap) pts.push({ x: right, y });
  for (let x = right; x >= left; x -= gap) pts.push({ x, y: bottom });
  for (let y = bottom; y >= top; y -= gap) pts.push({ x: left, y });

  // Shuffle for smoother fill
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }

  return pts;
};

  // Burst effect
  class Burst {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.max = 400 + Math.random() * 100;
      this.alpha = 0.8;
      this.color =
        colors.burstColors[
          Math.floor(Math.random() * colors.burstColors.length)
        ];
    }
    update() {
      if (this.radius < this.max) {
        this.radius += 8;
        this.alpha -= 0.01;
      }
    }
    draw() {
      const grad = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius
      );
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  const bursts = [];
  const triggerCornerBursts = () => {
    const w = canvas.width,
      h = canvas.height;
    bursts.push(new Burst(0, 0));
    bursts.push(new Burst(w, 0));
    bursts.push(new Burst(0, h));
    bursts.push(new Burst(w, h));
  };
  const triggerCenterBurst = () =>
    bursts.push(new Burst(canvas.width / 2, canvas.height / 2));

  const drawConnections = () => {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 70) {
          const opacity = 1 - dist / 70;
          ctx.strokeStyle = colors.connection.replace(
            /[\d.]+\)$/g,
            `${opacity * 0.5})`
          );
          ctx.lineWidth = 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  };

  let phase = "free";
  let timer = 0;

  const animate = () => {
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, colors.backgroundTop);
    grad.addColorStop(1, colors.backgroundBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    timer++;
    const sec = timer / 60;

    // 0–5s: Free float
    if (phase === "free" && sec > 5) {
      const mainText = document.getElementById("main-text");
      if (mainText) mainText.style.opacity = 0;

     phase = "forming";
timer = 0;

// Generate rectangle targets around "Ctrl Z"
const rectPoints = prepareRectTargets(70, 8); // padding=70, gap=8
particles.forEach((p, i) => {
  const target = rectPoints[i % rectPoints.length];
  p.targetX = target.x;
  p.targetY = target.y;
  p.phase = "forming";
  p.fade = 1;
});

triggerCornerBursts();


      const ctrlzText = document.getElementById("ctrlz-text");
      if (ctrlzText) {
        ctrlzText.style.transition =
          "opacity 1.2s ease-out, transform 1.2s ease-out";
        ctrlzText.style.opacity = 1;
        ctrlzText.style.transform = "translate(-50%, -50%) scale(1)";
      }
    }

    // 5–10s: Fade away
    else if (phase === "forming" && sec > 5) {
      phase = "dispersing";
      timer = 0;
      triggerCenterBurst();

      const ctrlzText = document.getElementById("ctrlz-text");
      if (ctrlzText) {
        ctrlzText.style.opacity = 0;
        ctrlzText.style.transform = "translate(-50%, -50%) scale(0.9)";
      }

      // particles fade
      particles.forEach((p) => {
        p.phase = "dispersing";
        p.fade = 1;
      });
    }

    // 10–15s: Reset cleanly
    else if (phase === "dispersing" && sec > 5) {
      // Completely fade out and clear any remnants
      particles.forEach((p) => (p.fade -= 0.2));
      particles = particles.filter((p) => p.fade > 0.05);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Reset phase
      phase = "free";
      timer = 0;
      particles = Array.from({ length: numParticles }, () => new Particle());

      const mainText = document.getElementById("main-text");
      if (mainText) mainText.style.opacity = 1;
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    drawConnections();

    bursts.forEach((b) => {
      b.update();
      b.draw();
    });
    for (let i = bursts.length - 1; i >= 0; i--) {
      if (bursts[i].alpha <= 0) bursts.splice(i, 1);
    }

    requestAnimationFrame(animate);
  };

  animate();

  return () => {
    window.removeEventListener("resize", setSize);
    window.removeEventListener("mousemove", () => {});
  };
}, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Glowing Ctrl Z */}
      <div
        id="ctrlz-text"
        className="absolute text-violet-400 font-extrabold tracking-wide text-[12vw] sm:text-[9vw] md:text-[7vw]
                   opacity-0 transition-opacity duration-1000 ease-out drop-shadow-[0_0_15px_rgba(180,0,255,0.8)]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.9)",
          fontFamily: "'Orbitron', 'Segoe UI', sans-serif",
          letterSpacing: "0.1em",
          textShadow:
            "0 0 20px rgba(180,0,255,0.8), 0 0 40px rgba(160,0,255,0.6), 0 0 60px rgba(180,0,255,0.4)",
        }}
      >
        Ctrl&nbsp;Z
      </div>

      {/* Main Text */}
      <div
        id="main-text"
        className="relative z-10 text-white px-4 sm:px-6 transition-opacity duration-1000 ease-out"
        style={{ opacity: 1 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          Reversing <span className="text-violet-400">Limits</span>
          <br />
          <span className="text-violet-400">Creating</span> Possibilities
        </h1>
        <p className="max-w-md sm:max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-300 mb-6 md:mb-8">
          Unite under the violet pulse of innovation — where visionaries code
          beyond limits, shaping a universe of intelligence and imagination.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button>Get Started</Button>
          <Button className="bg-transparent border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-black">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
