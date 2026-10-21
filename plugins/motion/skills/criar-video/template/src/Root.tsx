import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
import { END } from "./sync/timeline";
import { FPS, H, W } from "./theme";

export const Root: React.FC = () => (
  <Composition id="Video" component={Video} durationInFrames={END} fps={FPS} width={W} height={H} />
);
