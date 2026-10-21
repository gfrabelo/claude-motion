import React from "react";
import { useCurrentFrame } from "remotion";
import { EASE_OUT, ease, mix } from "../anim";
import { msToFrame, Word, WORDS } from "../sync/cues";
import { C, fontFamily } from "../theme";

type Chunk = { words: Word[]; start: number; end: number };

/**
 * Agrupa palavras em blocos de 2-4: quebra em pontuação, pausas
 * e no limite de palavras, e junta blocos de 1 palavra ao vizinho.
 */
export const chunkWords = (words: Word[], max = 4, pauseMs = 280): Chunk[] => {
  const groups: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const next = words[i + 1];
    const punct = /[.,?!:;]$/.test(w.text.trim());
    const pause = next ? next.startMs - w.endMs > pauseMs : true;
    if (cur.length >= max || punct || pause || !next) {
      groups.push(cur);
      cur = [];
    }
  });
  // junta órfãos de 1 palavra
  const merged: Word[][] = [];
  for (const g of groups) {
    const prev = merged[merged.length - 1];
    if (g.length === 1 && prev && prev.length < max) prev.push(...g);
    else if (prev && prev.length === 1 && prev.length + g.length <= max) prev.push(...g);
    else merged.push([...g]);
  }
  return merged.map((g) => ({
    words: g,
    start: msToFrame(g[0].startMs),
    end: msToFrame(g[g.length - 1].endMs),
  }));
};

const CHUNKS = chunkWords(WORDS);

type Props = {
  /** Palavras que ficam em ciano (comparação exata, sem pontuação: "VIDEO" ≠ "vídeo"). */
  keywords: string[];
  /** Intervalos [de, até] em que a legenda some (ex.: frame final limpo). */
  hidden?: [number, number][];
  /** Distância da base da tela. */
  bottom?: number;
};

/** Legenda palavra a palavra no terço inferior. */
export const Captions: React.FC<Props> = ({ keywords, hidden = [], bottom = 92 }) => {
  const f = useCurrentFrame();
  const bare = (s: string) => s.trim().replace(/[.,?!:;]/g, "");
  const kw = new Set(keywords.map(bare));

  // bloco ativo: o último que já começou, enquanto o próximo não começa
  let idx = -1;
  for (let i = 0; i < CHUNKS.length; i++) if (f >= CHUNKS[i].start - 2) idx = i;
  if (idx < 0) return null;
  const chunk = CHUNKS[idx];
  const nextStart = CHUNKS[idx + 1]?.start ?? chunk.end + 30;
  const holdEnd = Math.min(nextStart - 2, chunk.end + 24);

  const vis = 1 - ease(f, holdEnd, 6);
  const hide = hidden.reduce((acc, [a, b]) => acc * (1 - ease(f, a, 8) * (1 - ease(f, b, 8))), 1);
  if (vis * hide <= 0.001) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom,
        display: "flex",
        justifyContent: "center",
        opacity: vis * hide,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "14px 28px",
          borderRadius: 18,
          background: "rgba(11,15,20,0.9)",
          
          fontFamily,
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        {chunk.words.map((w, i) => {
          const s = msToFrame(w.startMs);
          const t = ease(f, s - 1, 7, EASE_OUT);
          const isKw = kw.has(bare(w.text));
          const active = f >= s && f < msToFrame(w.endMs) + 3;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                color: isKw ? C.cyan : C.white,
                opacity: mix(t, 0.0, 1),
                transform: `translateY(${mix(t, 14, 0)}px) scale(${active ? 1.04 : 1})`,
                textShadow: isKw && active ? `0 0 22px ${C.cyan}88` : undefined,
              }}
            >
              {w.text.trim()}
            </span>
          );
        })}
      </div>
    </div>
  );
};
