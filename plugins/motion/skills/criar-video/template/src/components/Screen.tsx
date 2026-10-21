import React from "react";
import { C, fontFamily } from "../theme";

/**
 * Tela flutuante em perspectiva (vitrine). O conteúdo é desenhado no tamanho
 * `w×h` e a tela pode girar no eixo Y, escalar e subir/descer em profundidade.
 */
export const Screen: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  rotY?: number;
  scale?: number;
  opacity?: number;
  perspective?: number;
  label?: string;
  labelIn?: number;
  children: React.ReactNode;
}> = ({ cx, cy, w, h, rotY = 0, scale = 1, opacity = 1, perspective = 1600, label, labelIn = 0, children }) => (
  <div
    style={{
      position: "absolute",
      left: cx - w / 2,
      top: cy - h / 2,
      width: w,
      height: h,
      opacity,
      transform: `perspective(${perspective}px) rotateY(${rotY}deg) scale(${scale})`,
      fontFamily,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 18,
        overflow: "hidden",
        background: "#0D131B",
        border: `1.5px solid ${C.line}`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
      }}
    >
      {children}
    </div>
    {label && (
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: h + 26,
          textAlign: "center",
          color: C.gray,
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: labelIn,
          transform: `translateY(${(1 - labelIn) * 12}px)`,
        }}
      >
        {label}
      </div>
    )}
  </div>
);
