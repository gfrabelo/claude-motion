import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { bgAt, ColorStage } from "./components/ColorStage";
import { Hud } from "./components/Hud";
import { Window } from "./components/Window";
import { Demo } from "./scenes/Demo";
import { BASE, CHAPTERS, WIPES } from "./sync/colors";
import { AUDIO_FILE, WORDS } from "./sync/cues";
import { END } from "./sync/timeline";
import { on } from "./theme";

const Chrome: React.FC = () => {
  const f = useCurrentFrame();
  return <Hud color={on(bgAt(WIPES, f, BASE))} chapters={CHAPTERS} />;
};

// Camadas: fundo de cor → cenas (frames globais, podem se sobrepor) → HUD → áudio.
export const Video: React.FC = () => (
  <AbsoluteFill>
    <ColorStage base={BASE} wipes={WIPES} />
    <Window from={0} to={END}>
      <Demo />
    </Window>
    <Chrome />
    {WORDS.length > 0 && <Audio src={staticFile(AUDIO_FILE)} />}
  </AbsoluteFill>
);
