import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE_OUT, ease } from "../anim";
import { FPS, monoFamily } from "../theme";

export type HudChapter = { at: number; label: string };

const timecode = (f: number) => {
  const s = Math.floor(f / FPS);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(f % FPS)}`;
};

const Corner: React.FC<{ x: "l" | "r"; y: "t" | "b"; color: string; t: number }> = ({ x, y, color, t }) => {
  const len = 34 * t;
  return (
    <div
      style={{
        position: "absolute",
        [x === "l" ? "left" : "right"]: 40,
        [y === "t" ? "top" : "bottom"]: 40,
        width: len,
        height: len,
        borderColor: color,
        borderStyle: "solid",
        borderWidth: 0,
        [x === "l" ? "borderLeftWidth" : "borderRightWidth"]: 2,
        [y === "t" ? "borderTopWidth" : "borderBottomWidth"]: 2,
      }}
    />
  );
};

/**
 * Moldura de "motion designer": cantoneiras, capítulo, timecode e progresso.
 * A cor acompanha o fundo (passe a cor de contraste do frame).
 */
export const Hud: React.FC<{ color: string; chapters: HudChapter[]; title?: string }> = ({
  color,
  chapters,
  title = "MOTION",
}) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = ease(f, 0, 10, EASE_OUT);
  let idx = 0;
  chapters.forEach((c, i) => {
    if (f >= c.at) idx = i;
  });
  const ch = chapters[idx];
  const swap = ease(f, ch.at, 8, EASE_OUT);
  const text: React.CSSProperties = {
    position: "absolute",
    fontFamily: monoFamily,
    fontSize: 17,
    fontWeight: 500,
    letterSpacing: "0.12em",
    color,
    opacity: 0.85 * t,
    whiteSpace: "nowrap",
  };
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Corner x="l" y="t" color={color} t={t} />
      <Corner x="r" y="t" color={color} t={t} />
      <Corner x="l" y="b" color={color} t={t} />
      <Corner x="r" y="b" color={color} t={t} />
      <div style={{ ...text, left: 92, top: 52 }}>
        {title} <span style={{ opacity: 0.5 }}>—</span> {String(idx + 1).padStart(2, "0")}/{String(chapters.length).padStart(2, "0")}
      </div>
      <div style={{ ...text, right: 92, top: 52, overflow: "hidden" }}>
        <span style={{ display: "inline-block", transform: `translateY(${(1 - swap) * 100}%)` }}>{ch.label}</span>
      </div>
      <div style={{ ...text, left: 92, bottom: 50, fontVariantNumeric: "tabular-nums" }}>{timecode(f)}</div>
      <div style={{ ...text, right: 92, bottom: 50 }}>1920×1080 · 30 FPS</div>
      {/* barra de progresso */}
      <div style={{ position: "absolute", left: 92, right: 92, bottom: 40, height: 2, background: `${color}22` }}>
        <div style={{ width: `${(f / durationInFrames) * 100}%`, height: "100%", background: color, opacity: 0.8 }} />
      </div>
    </AbsoluteFill>
  );
};
