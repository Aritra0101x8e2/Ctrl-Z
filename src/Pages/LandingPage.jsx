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

    // Particle count scaling with screen size
    const numParticles =
      window.innerWidth < 480 ? 120 : window.innerWidth < 1024 ? 300 : 600;

    class Particle {
      constructor(depth = 1) {
        this.depth = depth; // gives parallax effect
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.8 * depth;
        this.speedY = (Math.random() - 0.5) * 0.8 * depth;
        this.hue = 170 + Math.random() * 40; // cyan to aqua range
      }

      update() {
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
        glow.addColorStop(0, `hsla(${this.hue},100%,60%,0.9)`);
        glow.addColorStop(1, `hsla(${this.hue},100%,50%,0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles in layers for depth
    const layers = [
      Array.from({ length: numParticles * 0.5 }, () => new Particle(0.5)),
      Array.from({ length: numParticles * 0.3 }, () => new Particle(1)),
      Array.from({ length: numParticles * 0.2 }, () => new Particle(1.5)),
    ];

    const drawConnections = (particles) => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const opacity = 1 - dist / 100;
            ctx.strokeStyle = `rgba(0,255,255,${opacity * 0.3})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Add a slow hue rotation for the entire canvas
    let hueShift = 0;

    const animate = () => {
      hueShift = (hueShift + 0.2) % 360;
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, `hsl(${200 + hueShift / 3}, 70%, 6%)`);
      bg.addColorStop(1, `hsl(${220 + hueShift / 3}, 70%, 3%)`);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      layers.forEach((layer) => {
        layer.forEach((p) => {
          p.update();
          p.draw();
        });
        drawConnections(layer);
      });

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
      <div className="relative z-10 text-white px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          Reversing <span className="text-cyan-400">Limits</span>
          <br />
          <span className="text-cyan-400">Creating</span> Possibilities
        </h1>
        <p className="max-w-md sm:max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-300 mb-6 md:mb-8">
          Unite under the neon glow of innovation — where visionaries code
          beyond limits, shaping a future powered by imagination and
          intelligence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button>Get Started</Button>
          <Button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
