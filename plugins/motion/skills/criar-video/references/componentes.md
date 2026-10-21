# Componentes do template

Todos trabalham com **frames globais** (o frame do vídeo inteiro, igual ao da deixa `cue(...)`).

## Base (`src/anim.ts`)

- `ease(frame, start, dur = 11, easing = EASE_OUT)` → 0..1 com clamp.
- `presence(frame, inAt, outAt, inDur, outDur)` → 0 → 1 → 0 (entra e sai).
- `mix(t, a, b)`, `sp(frame, start)` (spring), `rand(seed)` (determinístico, igual em todo render).
- Curvas: `EASE_OUT`, `EASE_IN`, `EASE_IN_OUT`.

## Tema (`src/theme.ts`)

- `FORMAT`, `W`, `H`, `FPS`, paleta `C`, `on(bg)`, `isLight(color)`.
- `display(wdth, wght)` → estilo do display (Archivo, maiúsculas). Use `style={{ textTransform: "none" }}` para @ e nomes.
- `fontFamily` (Archivo), `serifFamily` (Instrument Serif itálico), `monoFamily` (Geist Mono).

## Sincronia (`src/sync`)

- `cue("frase", { after?, at?: "first" | "last" })` → frame em que a frase começa. `after` filtra ocorrências repetidas. `at: "last"` devolve a última palavra da frase.
- `cueEnd("frase")` → frame em que a frase termina.
- `AUDIO_END`, `SPEED`, `AUDIO_FILE`.

## Palco

- `<ColorStage base wipes />` + `bgAt(wipes, frame, base)`: fundo chapado com trocas.
  `Wipe = { at, color, kind: "circle" | "up" | "down" | "left" | "right" | "diag" | "cut", x?, y?, dur? }`.
- `<Hud color chapters title? />`: moldura de designer. `chapters = [{ at, label }]`.
- `<Window from to>`: mostra os filhos só nesse intervalo, sem reiniciar o relógio.

## Tipografia

- `<BigType text at out? size color mode="mask|slam|stretch" exit="up|drop|fade" align wdth wght stagger style />`
  - `exit="drop"`: as letras despencam girando (bom para "riscar" uma ideia).
- `<SerifLine text at out? size color />`: frase em serifa itálica que entra com blur.
- `<Tag text at color out? />`: rótulo mono digitado letra a letra (`01 / TEXTO`, `// comentário`).

## Acentos (`Accents.tsx`)

- `<Burst size color rays? spin? grow? />`: asterisco de raios arredondados girando. Use como "ponto final" de uma palavra, ou para preencher um canto vazio.
- `<Kick hits={[frames]} strength?>`: tranco de câmera nos impactos (envolve a cena).
- `kick(frame, hits)`: a mesma coisa como string de transform.

## Interface

- `<PromptBox cx cy w h text typing draw send active bg stroke textColor accent fontSize placeholder showCaret />`: caixa de pedido/comentário. `draw` desenha a borda; `send` acende o botão.
- `<Typewriter>`, `<Caret>`, `typedCount(frame, total, start, end)`: digitação.
- `<Screen cx cy w h rotY scale opacity label labelIn>`: tela flutuante em perspectiva (vitrine de anúncio/post/vinheta).
- `<Captions keywords hidden />`: legenda palavra a palavra (opcional).

## Padrões que funcionam

```tsx
// palavra que bate na deixa e sai antes da próxima cena
<BigType text="NENHUM" at={S2.start} out={S2.edicao + 10} size={210} color={C.ink} mode="slam" />

// fundo que encolhe e vira a caixa da próxima cena
const t = ease(f, S4.start, 14, EASE_IN_OUT);
<div style={{ left: mix(t, 0, boxX), top: mix(t, 0, boxY), width: mix(t, W, boxW), height: mix(t, H, boxH), borderRadius: mix(t, 0, 34), background: C.claude }} />

// mergulho dentro de uma palavra (transição para a próxima cor)
<AbsoluteFill style={{ transform: `scale(${mix(ease(f, next - 9, 11, EASE_IN), 1, 26)})`, transformOrigin: "50% 56%" }}>…</AbsoluteFill>

// conteúdo empurrado junto com a cortina do fundo
<AbsoluteFill style={{ transform: `translateY(${ease(f, troca, 12, EASE_IN_OUT) * H}px)` }}>…</AbsoluteFill>
```
