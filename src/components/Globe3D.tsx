import { useEffect, useRef } from 'react';

const Globe3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0.3, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.7;

    // Generate globe points
    const points: { lat: number; lon: number }[] = [];

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lon = 0; lon < 360; lon += 8) {
        points.push({ lat: lat * Math.PI / 180, lon: lon * Math.PI / 180 });
      }
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      for (let lat = -80; lat <= 80; lat += 8) {
        points.push({ lat: lat * Math.PI / 180, lon: lon * Math.PI / 180 });
      }
    }

    // Continent-like clusters (simplified land masses)
    const continents = [
      // North America
      { lat: 45, lon: -100, size: 25 },
      { lat: 35, lon: -90, size: 20 },
      // South America
      { lat: -15, lon: -60, size: 20 },
      { lat: -30, lon: -65, size: 15 },
      // Europe
      { lat: 50, lon: 10, size: 15 },
      { lat: 45, lon: 20, size: 12 },
      // Africa
      { lat: 10, lon: 20, size: 25 },
      { lat: -10, lon: 25, size: 20 },
      // Asia
      { lat: 40, lon: 100, size: 30 },
      { lat: 30, lon: 80, size: 20 },
      { lat: 25, lon: 120, size: 15 },
      // Australia
      { lat: -25, lon: 135, size: 18 },
    ];

    const landPoints: { lat: number; lon: number }[] = [];
    continents.forEach(c => {
      for (let i = 0; i < c.size * 3; i++) {
        const latOffset = (Math.random() - 0.5) * c.size;
        const lonOffset = (Math.random() - 0.5) * c.size * 1.5;
        landPoints.push({
          lat: (c.lat + latOffset) * Math.PI / 180,
          lon: (c.lon + lonOffset) * Math.PI / 180
        });
      }
    });

    const project3D = (lat: number, lon: number, rotX: number, rotY: number) => {
      // 3D coordinates on sphere
      let x = Math.cos(lat) * Math.sin(lon);
      let y = Math.sin(lat);
      let z = Math.cos(lat) * Math.cos(lon);

      // Rotate around Y axis
      const tempX = x * Math.cos(rotY) - z * Math.sin(rotY);
      const tempZ = x * Math.sin(rotY) + z * Math.cos(rotY);
      x = tempX;
      z = tempZ;

      // Rotate around X axis
      const tempY = y * Math.cos(rotX) - z * Math.sin(rotX);
      z = y * Math.sin(rotX) + z * Math.cos(rotX);
      y = tempY;

      return {
        x: centerX + x * radius,
        y: centerY - y * radius,
        z: z,
        visible: z > -0.1
      };
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      if (!isDraggingRef.current) {
        rotationRef.current.y += 0.003;
      }

      const { x: rotX, y: rotY } = rotationRef.current;

      // Draw glow effect
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.3);
      gradient.addColorStop(0, 'rgba(0, 209, 178, 0.15)');
      gradient.addColorStop(0.5, 'rgba(0, 209, 178, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 209, 178, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Draw globe outline
      ctx.strokeStyle = 'rgba(0, 209, 178, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw grid points
      points.forEach(p => {
        const proj = project3D(p.lat, p.lon, rotX, rotY);
        if (proj.visible) {
          const alpha = 0.1 + proj.z * 0.2;
          ctx.fillStyle = `rgba(0, 209, 178, ${alpha})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw land masses
      landPoints.forEach(p => {
        const proj = project3D(p.lat, p.lon, rotX, rotY);
        if (proj.visible) {
          const alpha = 0.4 + proj.z * 0.6;
          const size = 2 + proj.z * 2;
          ctx.fillStyle = `rgba(0, 209, 178, ${alpha})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw some connection lines
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < landPoints.length - 1; i += 15) {
        const p1 = project3D(landPoints[i].lat, landPoints[i].lon, rotX, rotY);
        const p2 = project3D(landPoints[i + 1].lat, landPoints[i + 1].lon, rotX, rotY);
        if (p1.visible && p2.visible && p1.z > 0.3 && p2.z > 0.3) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse handlers for rotation
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMouseRef.current.x;
        const deltaY = e.clientY - lastMouseRef.current.y;
        rotationRef.current.y += deltaX * 0.005;
        rotationRef.current.x += deltaY * 0.005;
        rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.touches[0].clientX - lastMouseRef.current.x;
        const deltaY = e.touches[0].clientY - lastMouseRef.current.y;
        rotationRef.current.y += deltaX * 0.005;
        rotationRef.current.x += deltaY * 0.005;
        rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    />
  );
};

export default Globe3D;
