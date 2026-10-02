"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  DEFAULT_OPTIONS,
  imageToAsciiFrame,
  renderFrameToCanvas,
} from "asciify-engine";
import { FluidField, paintLiquidSource } from "./fluid-field";

export interface AsciiSidePanelProps {
  side?: "left" | "right";
  className?: string;
  fontSize?: number;
  accentColor?: string;
  patternScale?: number;
}

export function AsciiSidePanel({
  side = "left",
  className = "",
  fontSize = 6,
  accentColor,
  patternScale = 2.5,
}: AsciiSidePanelProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  // Invert colors based on theme:
  // Dark mode: dark background (#09090b / zinc-950) with light glyphs (#fafafa)
  // Light mode: white background (#ffffff) with dark glyphs (#000000)
  const isDark = resolvedTheme === "dark";
  const effectiveGlyphColor = accentColor ?? (isDark ? "#fafafa" : "#000000");

  React.useEffect(() => {
    const host = containerRef.current;
    const target = canvasRef.current;
    if (!host || !target) return;

    const ctx = target.getContext("2d");
    if (!ctx) return;

    const source = document.createElement("canvas");
    const sourceCtx = source.getContext("2d", { willReadFrequently: true });
    if (!sourceCtx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let aspect = 1;
    let field = new FluidField(aspect);
    let pixels = sourceCtx.createImageData(1, 1);
    let raf = 0;
    let visible = true;
    let disposed = false;
    let time = side === "right" ? 42 : 12;
    let last = 0;

    const options = {
      ...DEFAULT_OPTIONS,
      fontSize,
      charAspect: 0.58,
      charset: " .:+-=xICA$FY#@",
      colorMode: "accent" as const,
      accentColor: effectiveGlyphColor,
      contrast: isDark ? 0.08 : 1.2,
      brightness: isDark ? 0 : 0.5,
      hoverStrength: 0,
    };

    const isResting = () => reduced.matches || document.hidden || !visible;

    const tick = (now: number) => {
      raf = 0;
      if (disposed || !visible || document.hidden) return;

      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      if (!isResting()) {
        time += dt;
      }

      field.step(dt);

      if (pixels.data.length && source.width > 0 && source.height > 0) {
        paintLiquidSource(
          pixels.data,
          source.width,
          source.height,
          aspect,
          time,
          field,
          patternScale,
        );
        sourceCtx.putImageData(pixels, 0, 0);

        const frameResult = imageToAsciiFrame(source, options, width, height);
        ctx.clearRect(0, 0, width, height);
        renderFrameToCanvas(
          ctx,
          frameResult.frame,
          options,
          width,
          height,
          time,
          null,
        );
      }

      if (!isResting()) {
        raf = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (!raf && visible && !disposed && !document.hidden) {
        raf = requestAnimationFrame(tick);
      }
    };

    const handleResize = () => {
      if (!host || !target) return;
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      aspect = width / height;

      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      target.width = Math.round(width * dpr);
      target.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const detail = Math.max(
        96,
        Math.min(192, Math.ceil(width / (options.fontSize * 0.8))),
      );
      source.width = Math.max(
        1,
        Math.round(aspect >= 1 ? detail : detail * aspect),
      );
      source.height = Math.max(
        1,
        Math.round(aspect >= 1 ? detail / aspect : detail),
      );
      pixels = sourceCtx.createImageData(source.width, source.height);

      field = new FluidField(aspect);
      wake();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          wake();
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(host);

    const handlePointerMove = (e: PointerEvent) => {
      if (isResting()) return;
      const rect = host.getBoundingClientRect();
      if (rect.width && rect.height) {
        field.move(
          (e.clientX - rect.left) / rect.width,
          (e.clientY - rect.top) / rect.height,
        );
        wake();
      }
    };

    const handlePointerLeave = () => {
      field.leave();
      wake();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && visible) {
        last = 0;
        wake();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    host.addEventListener("pointermove", handlePointerMove, { passive: true });
    host.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleResize();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [side, fontSize, effectiveGlyphColor, patternScale, isDark]);

  return (
    <div
      ref={containerRef}
      className={`ascii-side relative h-full w-full overflow-hidden bg-white dark:bg-zinc-950 select-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full pointer-events-none opacity-80 dark:opacity-60"
      />
    </div>
  );
}

export default AsciiSidePanel;
