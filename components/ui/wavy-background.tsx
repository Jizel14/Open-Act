"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill,
  blur = 10,
  speed = "slow",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const defaultColors = colors || [
      "#22c55e", // primary green
      "#3b82f6", // ngo blue
      "#10b981", // emerald
      "#60a5fa", // light blue
    ];

    const waveSpeed = speed === "fast" ? 0.05 : 0.02;

    const drawWave = (y: number, color: string, amplitude: number, frequency: number) => {
      ctx.beginPath();
      ctx.moveTo(0, y);

      for (let x = 0; x < canvas.width / (window.devicePixelRatio || 1); x += 1) {
        const wave = Math.sin((x * frequency + time) * waveSpeed) * amplitude;
        ctx.lineTo(x, y + wave);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = waveWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = waveOpacity;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, backgroundFill || "rgba(34, 197, 94, 0.05)");
      gradient.addColorStop(0.5, backgroundFill || "rgba(59, 130, 246, 0.03)");
      gradient.addColorStop(1, backgroundFill || "rgba(16, 185, 129, 0.05)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw waves
      defaultColors.forEach((color, index) => {
        const y = (height / (defaultColors.length + 1)) * (index + 1);
        const amplitude = 40 + index * 15;
        const frequency = 0.008 + index * 0.003;
        drawWave(y, color, amplitude, frequency);
      });

      time += 0.5;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-ngo-50",
        containerClassName
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: `blur(${blur}px)` }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
