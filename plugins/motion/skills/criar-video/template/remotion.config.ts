import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);

// Opcional: usar um Chrome específico (ex.: se o projeto estiver dentro de
// ~/Documents no Mac e o Chrome baixado não abrir).
if (process.env.REMOTION_CHROME) Config.setBrowserExecutable(process.env.REMOTION_CHROME);
