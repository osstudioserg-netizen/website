"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trailCount = 45; // Количество точек в шлейфе

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Проверяем, что это десктоп (не тач устройство)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return; // Отключаем на мобильных устройствах
    }

    const trails: Array<{ x: number; y: number; element: HTMLDivElement }> = [];
    
    // Создаем элементы шлейфа
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail-point";
      trail.style.cssText = `
        position: fixed;
        width: ${20 - i * 0.3}px;
        height: ${20 - i * 0.3}px;
        border-radius: 50%;
        background: radial-gradient(circle, 
          rgba(215, 240, 0, ${Math.max(1 - i * 0.02, 0)}) 0%, 
          rgba(215, 240, 0, ${Math.max(0.6 - i * 0.013, 0)}) 30%, 
          transparent 70%);
        filter: blur(${Math.max(8 - i * 0.15, 0.5)}px);
        mix-blend-mode: screen;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s;
      `;
      container.appendChild(trail);
      trails.push({ x: 0, y: 0, element: trail });
    }

    let mouseX = 0;
    let mouseY = 0;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isVisible) {
        isVisible = true;
        trails.forEach(trail => {
          trail.element.style.opacity = "1";
        });
      }
    };

    const animate = () => {
      let prevX = mouseX;
      let prevY = mouseY;

      trails.forEach((trail, i) => {
        const speed = 0.1 + (i * 0.05); // Увеличиваем задержку для каждого элемента
        
        trail.x += (prevX - trail.x) * speed;
        trail.y += (prevY - trail.y) * speed;

        trail.element.style.left = `${trail.x}px`;
        trail.element.style.top = `${trail.y}px`;

        prevX = trail.x;
        prevY = trail.y;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animate();

    // Скрываем при выходе курсора за пределы окна
    const handleMouseLeave = () => {
      trails.forEach(trail => {
        trail.element.style.opacity = "0";
      });
      isVisible = false;
    };

    const handleMouseEnter = () => {
      if (isVisible) {
        trails.forEach(trail => {
          trail.element.style.opacity = "1";
        });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      trails.forEach(trail => {
        if (trail.element.parentNode) {
          trail.element.parentNode.removeChild(trail.element);
        }
      });
    };
  }, []);

  return <div ref={containerRef} />;
}