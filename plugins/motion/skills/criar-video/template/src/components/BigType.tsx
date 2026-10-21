import React from "react";
import { useCurrentFrame } from "remotion";
import { EASE_IN, EASE_OUT, ease, mix } from "../anim";
import { display } from "../theme";

type Mode = "mask" | "slam" | "stretch";

type Props = {
  text: string;
  /** Frame de entrada (normalmente a palavra falada). */
  at: number;
  /** Frame de saída (opcional). */
  out?: number;
  size: number;
  color: string;
  /**
   * mask: letras sobem por trás de uma máscara, em cascata.
   * slam: a palavra inteira bate na tela (escala + blur), com kick.
   * stretch: as letras nascem estreitas e esticam até a largura total.
   */
  mode?: Mode;
  stagger?: number;
  wdth?: number;
  wght?: number;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
  /** Saída: "up" (sobe pela máscara) ou "drop" (cai e some). */
  exit?: "up" | "drop" | "fade";
};

/** Tipografia gigante de display (Archivo larga e pesada). */
export const BigType: React.FC<Props> = ({
  text,
  at,
  out,
  size,
  color,
  mode = "mask",
  stagger = 1,
  wdth = 125,
  wght = 900,
  align = "center",
  style,
  exit = "up",
}) => {
  const f = useCurrentFrame();
  const chars = [...text];
  const slamT = ease(f, at, 7, EASE_OUT);
  const stretchT = ease(f, at, 14, EASE_OUT);
  const curW = mode === "stretch" ? mix(stretchT, 62, wdth) : wdth;

  const outT = out === undefined ? 0 : ease(f, out, 8, EASE_IN);
  const wholeStyle: React.CSSProperties =
    mode === "slam"
      ? {
          transform: `scale(${mix(slamT, 1.5, 1) * (exit === "drop" ? 1 : 1 + outT * 0.06)})`,
          filter: slamT < 0.98 ? `blur(${(1 - slamT) * 18}px)` : undefined,
          opacity: Math.min(1, slamT * 2) * (exit === "fade" ? 1 - outT : 1),
        }
      : mode === "stretch"
        ? { opacity: ease(f, at, 4) }
        : {};

  return (
    <div
      style={{
        ...display(curW, wght),
        fontSize: size,
        color,
        whiteSpace: "pre",
        display: "flex",
        justifyContent: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
        ...wholeStyle,
        ...style,
      }}
    >
      {chars.map((ch, i) => {
        const tIn = mode === "mask" ? ease(f, at + i * stagger, 9, EASE_OUT) : 1;
        const tOut = out === undefined ? 0 : ease(f, out + i * stagger * 0.5, 8, EASE_IN);
        let y = (1 - tIn) * 105;
        let rot = 0;
        if (exit === "up") y -= tOut * 105;
        if (exit === "drop") {
          y += tOut * 260;
          rot = tOut * (i % 2 ? 14 : -10);
        }
        return (
          <span key={i} style={{ display: "inline-block", overflow: mode === "mask" || exit === "up" ? "hidden" : "visible", padding: "0.04em 0" }}>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${y}%) rotate(${rot}deg)`,
                // a máscara não esconde acentos: some de vez antes de entrar
                opacity: (tIn > 0 ? 1 : 0) * (exit === "fade" || exit === "drop" ? 1 - tOut : 1),
              }}
            >
              {ch}
            </span>
          </span>
        );
      })}
    </div>
  );
};
