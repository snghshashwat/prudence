"use client";

import { useEffect, useRef } from "react";
import { useWebGLCapability } from "@/lib/use-webgl-capability";

// Lightweight decorative WebGL backdrop: a few slow-drifting monochrome
// gradient lobes (white on navy/ink, no accent hue) plus film grain, drawn
// on a single full-screen triangle. No geometry, no textures, no libraries,
// one fragment shader.
//
// It is purely ornamental. `useWebGLCapability()` gates it off for
// reduced-motion, small screens, low-end devices, Save-Data, and anything
// without WebGL; those users keep the CSS gradient underneath (see hero.tsx).

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_dark;

float lobe(vec2 uv, vec2 c, float r) {
  return smoothstep(r, 0.0, length(uv - c));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  // Award-winning finance sites lean glacial, not lively: a mesh gradient
  // that's almost still, rather than something the eye tracks. Slower time
  // constant and a tighter drift radius than a consumer/crypto site would use.
  float t = u_time * 0.04;

  vec2 c1 = vec2(0.55 + sin(t * 0.9) * 0.15, 0.62 + cos(t * 0.7) * 0.11);
  vec2 c2 = vec2(0.95 + cos(t * 0.6) * 0.17, 0.30 + sin(t * 0.8) * 0.12);
  vec2 c3 = vec2(0.20 + sin(t * 0.5) * 0.12, 0.28 + cos(t * 0.55) * 0.09);

  float g1 = lobe(p, c1, 0.62);
  float g2 = lobe(p, c2, 0.50);
  float g3 = lobe(p, c3, 0.46);

  // Monochrome only: the lobes are white/light-navy highlights over the
  // dark base, no separate accent hue mixed in.
  vec3 highlight = vec3(0.94, 0.95, 0.97);
  vec3 cool = mix(vec3(0.086, 0.137, 0.247), vec3(0.09, 0.08, 0.06), u_dark);

  vec3 col = cool;
  col += highlight * g1 * 0.10;
  col += highlight * g2 * 0.07;
  col += highlight * g3 * 0.05;

  // Vignette so the effect fades into the section edges.
  float vig = smoothstep(1.15, 0.25, length(uv - 0.5));
  col *= mix(0.72, 1.0, vig);

  // Cheap dithered grain, breaks up banding in the gradients.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.015;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroCanvas() {
  const enabled = useWebGLCapability();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: true,
    }) ?? null) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One oversized triangle covers the viewport with no index buffer.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uDark = gl.getUniformLocation(prog, "u_dark");

    const resize = () => {
      // Cap DPR, the effect is soft, so extra pixels buy nothing.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let raf = 0;
    let last = 0;
    let visible = true;
    const start = performance.now();
    const FRAME_MS = 1000 / 30; // 30fps is plenty and halves GPU wakeups.

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (now - last < FRAME_MS) return;
      last = now;

      resize();
      const isDark = document.documentElement.classList.contains("dark");
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uDark, isDark ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(draw);

    // Stop drawing once the hero scrolls away.
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full opacity-55 transition-opacity duration-1000"
    />
  );
}
