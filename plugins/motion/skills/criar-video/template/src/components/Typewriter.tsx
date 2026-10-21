import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";

/** Quantos caracteres já foram digitados entre `start` e `end`. */
export const typedCount = (frame: number, total: number, start: number, end: number) =>
  Math.floor(
    interpolate(frame, [start, end], [0, total], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

/** Cursor de texto piscando (pisca só quando está parado). */
export const Caret: React.FC<{
  height: number;
  color?: string;
  typing?: boolean;
  width?: number;
  style?: React.CSSProperties;
}> = ({ height, color = C.cyan, typing = false, width = 3, style }) => {
  const f = useCurrentFrame();
  const on = typing || Math.floor(f / 15) % 2 === 0;
  return (
    <span
      style={{
        display: "inline-block",
        width,
        height,
        marginLeft: 4,
        verticalAlign: "middle",
        background: color,
        opacity: on ? 1 : 0,
        boxShadow: `0 0 12px ${color}aa`,
        ...style,
      }}
    />
  );
};

/** Texto digitado letra a letra, com cursor. */
export const Typewriter: React.FC<{
  text: string;
  start: number;
  end: number;
  caret?: boolean;
  caretHeight?: number;
  style?: React.CSSProperties;
  caretColor?: string;
}> = ({ text, start, end, caret = true, caretHeight = 40, style, caretColor }) => {
  const f = useCurrentFrame();
  const n = typedCount(f, text.length, start, end);
  const typing = f >= start && f < end;
  return (
    <span style={{ whiteSpace: "pre", ...style }}>
      {text.slice(0, n)}
      {caret && <Caret height={caretHeight} typing={typing} color={caretColor} />}
    </span>
  );
};
