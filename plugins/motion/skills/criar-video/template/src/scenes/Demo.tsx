import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EASE_OUT, ease } from "../anim";
import { Burst, Kick, SerifLine, Tag } from "../components/Accents";
import { BigType } from "../components/BigType";
import { DEMO } from "../sync/timeline";
import { C } from "../theme";

/**
 * Cena demo: mostra o vocabulário (slam, mask, stretch, serifa, tag, kick,
 * troca de fundo). Apague quando montar o vídeo de verdade.
 */
export const Demo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Kick hits={[DEMO.ola, DEMO.motion, DEMO.escrito]}>
        {f < DEMO.motion + 2 && (
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <BigType text="OLÁ" at={DEMO.ola} out={DEMO.motion - 4} size={320} color={C.white} mode="slam" />
          </AbsoluteFill>
        )}
        {f >= DEMO.motion && f < DEMO.escrito + 2 && (
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
            <SerifLine text="isso aqui é" at={DEMO.motion + 2} size={110} color={C.ink} />
            <BigType text="MOTION" at={DEMO.motion + 4} out={DEMO.escrito - 4} size={300} color={C.ink} mode="stretch" />
          </AbsoluteFill>
        )}
        {f >= DEMO.escrito && (
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 24 }}>
            <Tag text="// escrito em código" at={DEMO.escrito + 2} color={C.ink} />
            <BigType text="ESCRITO" at={DEMO.escrito + 2} size={280} color={C.ink} mode="mask" />
            <div style={{ transform: `scale(${ease(f, DEMO.escrito + 14, 10, EASE_OUT)})` }}>
              <Burst size={140} color={C.white} spin={4} />
            </div>
          </AbsoluteFill>
        )}
      </Kick>
    </AbsoluteFill>
  );
};
