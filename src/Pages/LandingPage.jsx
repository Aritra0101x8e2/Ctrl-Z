import React, { useEffect, useRef } from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-5 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium transition ${
      className || "bg-cyan-500 hover:bg-cyan-400 text-white"
    }`}
  >
    {children}
  </button>
);

function LandingPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    // 🟩 EDITABLE COLOR PALETTE
    const colors = {
      backgroundTop: "#000010",
      backgroundBottom: "#000000",
      particleGlow: "rgba(0, 255, 255, 0.9)",
      connection: "rgba(0, 255, 255, 0.5)",
      textColor: "#00ffff",
    };

    // Resize canvas
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Mouse interactivity
    const mouse = { x: null, y: null };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    // Particle setup
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
        this.phase = "free"; // 'free' | 'forming' | 'dispersing'
      }

      update() {
        if (this.phase === "free") {
          this.x += this.speedX;
          this.y += this.speedY;

          // Wrap around edges
          if (this.x > canvas.width) this.x = 0;
          if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0;
          if (this.y < 0) this.y = canvas.height;

          // Mild mouse push
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
          // Move smoothly toward target
          this.x += (this.targetX - this.x) * 0.05;
          this.y += (this.targetY - this.y) * 0.05;
        } else if (this.phase === "dispersing") {
          // Return to random motion
          this.x += (this.baseX - this.x) * 0.02;
          this.y += (this.baseY - this.y) * 0.02;
        }
      }

      draw() {
        const glow = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 5
        );
        glow.addColorStop(0, colors.particleGlow);
        glow.addColorStop(1, "rgba(0,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    // 🧠 Hidden canvas to form text pixel map
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");
    const prepareTextTargets = () => {
      const text = "Ctrl Z";
      const fontSize = Math.min(canvas.width * 0.2, 180);
      textCanvas.width = canvas.width;
      textCanvas.height = canvas.height;

      textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      textCtx.fillStyle = colors.textColor;
      textCtx.textAlign = "center";
      textCtx.font = `bold ${fontSize}px Arial`;
      textCtx.fillText(text, textCanvas.width / 2, textCanvas.height / 2 + fontSize / 3);

      const imageData = textCtx.getImageData(
        0,
        0,
        textCanvas.width,
        textCanvas.height
      );
      const data = imageData.data;
      const positions = [];

      // Pick every few pixels for particle targets
      const gap = 6;
      for (let y = 0; y < textCanvas.height; y += gap) {
        for (let x = 0; x < textCanvas.width; x += gap) {
          const index = (y * textCanvas.width + x) * 4;
          if (data[index + 3] > 128) {
            positions.push({ x, y });
          }
        }
      }
      return positions;
    };

    let textPoints = prepareTextTargets();

    const drawConnections = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const opacity = 1 - dist / 80;
            ctx.strokeStyle = colors.connection.replace(
              /[\d.]+\)$/g,
              `${opacity * 0.3})`
            );
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let phase = "free";
    let phaseTimer = 0;

    const animate = () => {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, colors.backgroundTop);
      grad.addColorStop(1, colors.backgroundBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Manage phase timing
      phaseTimer += 1;
      const seconds = phaseTimer / 60; // assuming ~60fps

      if (phase === "free" && seconds > 30) {
        phase = "forming";
        phaseTimer = 0;
        textPoints = prepareTextTargets();
        particles.forEach((p, i) => {
          const target = textPoints[i % textPoints.length];
          p.targetX = target.x;
          p.targetY = target.y;
          p.phase = "forming";
        });
      } else if (phase === "forming" && seconds > 5) {
        phase = "dispersing";
        phaseTimer = 0;
        particles.forEach((p) => (p.phase = "dispersing"));
      } else if (phase === "dispersing" && seconds > 8) {
        phase = "free";
        phaseTimer = 0;
        particles.forEach((p) => (p.phase = "free"));
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();
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
      
    </section>
  );
}

export default LandingPage;
