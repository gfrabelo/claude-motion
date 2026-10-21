import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * Renderiza os filhos só entre `from` e `to` (frames GLOBAIS).
 * Diferente de <Sequence>, não reinicia o relógio: as cenas trabalham
 * direto com as deixas da narração, e cenas vizinhas podem se sobrepor
 * para que um elemento "vire" o próximo.
 */
export const Window: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({
  from,
  to,
  children,
}) => {
  const f = useCurrentFrame();
  if (f < from || f >= to) return null;
  return <AbsoluteFill>{children}</AbsoluteFill>;
};
