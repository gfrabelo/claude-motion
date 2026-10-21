import React from "react";
import { C, fontFamily } from "../theme";
import { Caret } from "./Typewriter";

type Props = {
  /** Centro da caixa. */
  cx: number;
  cy: number;
  w: number;
  h: number;
  /** Texto já digitado (quem chama controla o ritmo). */
  text: string;
  typing?: boolean;
  /** 0..1: quanto da borda já foi desenhada. */
  draw?: number;
  /** 0..1: destaque do botão de enviar. */
  send?: number;
  opacity?: number;
  fontSize?: number;
  placeholder?: string;
  /** 0..1: borda acesa em ciano. */
  active?: number;
  showCaret?: boolean;
  textColor?: string;
  /** Cores da caixa (padrão: escura). */
  bg?: string;
  stroke?: string;
  accent?: string;
  radius?: number;
  style?: React.CSSProperties;
};

/**
 * Caixa de pedido: onde a pessoa "descreve o que quer".
 * A borda é um SVG para poder ser desenhada (draw 0→1).
 */
export const PromptBox: React.FC<Props> = ({
  cx,
  cy,
  w,
  h,
  text,
  typing = false,
  draw = 1,
  send = 0,
  opacity = 1,
  fontSize = 38,
  placeholder,
  active = 0,
  showCaret = true,
  textColor = C.white,
  bg = "rgba(17,24,33,0.88)",
  stroke = "#2A3646",
  accent = C.cyan,
  radius = 28,
  style,
}) => {
  const r = Math.min(h / 2, radius);
  const per = 2 * (w + h);
  const btn = Math.min(h - 28, 64);
  return (
    <div
      style={{
        position: "absolute",
        left: cx - w / 2,
        top: cy - h / 2,
        width: w,
        height: h,
        opacity,
        fontFamily,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: r,
          background: bg,
          opacity: draw,
          boxShadow: `0 30px 80px rgba(0,0,0,0.45), 0 0 ${40 * active}px rgba(62,230,240,${0.25 * active})`,
        }}
      />
      <svg width={w} height={h} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <rect
          x={0.75}
          y={0.75}
          width={w - 1.5}
          height={h - 1.5}
          rx={r}
          fill="none"
          stroke={active > 0.01 ? accent : stroke}
          strokeOpacity={0.5 + active * 0.5}
          strokeWidth={1.5}
          strokeDasharray={per}
          strokeDashoffset={per * (1 - draw)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 32,
          right: btn + 40,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize,
          fontWeight: 500,
          color: textColor,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          opacity: draw,
        }}
      >
        <span style={{ color: accent, fontWeight: 800 }}>›</span>
        <span>
          {text.length === 0 && placeholder ? <span style={{ color: C.gray }}>{placeholder}</span> : text}
          {showCaret && <Caret height={fontSize * 1.05} typing={typing} color={accent} />}
        </span>
      </div>
      {/* botão enviar */}
      <div
        style={{
          position: "absolute",
          right: 16,
          top: (h - btn) / 2,
          width: btn,
          height: btn,
          borderRadius: btn / 2,
          background: send > 0.01 ? accent : "rgba(128,140,160,0.25)",
          opacity: draw,
          transform: `scale(${1 + send * 0.08})`,
          boxShadow: send > 0.01 ? `0 0 ${30 * send}px ${accent}88` : undefined,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={btn * 0.42} height={btn * 0.42} viewBox="0 0 24 24">
          <path
            d="M12 19V5M5 12l7-7 7 7"
            fill="none"
            stroke={send > 0.01 ? C.ink : textColor}
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
