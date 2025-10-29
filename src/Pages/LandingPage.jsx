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

    const particles = [];
    const mouse = { x: null, y: null };

    // Adjust number of particles based on screen size
    const numParticles =
      window.innerWidth < 480
        ? 100
        : window.innerWidth < 1024
        ? 250
        : 500;

    // Track mouse movement for interactivity
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.8;
        this.speedX = (Math.random() - 0.5) * 1.6;
        this.speedY = (Math.random() - 0.5) * 1.6;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Mouse interaction (mild on mobile)
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 80) {
            this.x += dx / 12;
            this.y += dy / 12;
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
          this.size * 4
        );
        glow.addColorStop(0, "rgba(0,255,255,0.9)");
        glow.addColorStop(1, "rgba(0,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#000000ff");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      {/* Particle background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>

      {/* Main Content */}
      <div className="relative z-10 text-white px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
  Reversing <span className="text-cyan-400">Limits</span>
  <br />
  <span className="text-cyan-400">Creating</span> Possibilities
</h1>

        <p className="max-w-md sm:max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-300 mb-6 md:mb-8">
          Unite under the neon glow of innovation — where visionaries code beyond limits, shaping a future powered by imagination and intelligence..
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
