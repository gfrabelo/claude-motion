# Problemas comuns

## O render trava em "Getting composition" (Mac)
O projeto está em `~/Documents`, `~/Desktop` ou `~/Downloads`. O macOS bloqueia o Chrome headless de ler os
próprios arquivos nessas pastas. Mova o projeto, por exemplo para `~/videos/meu-video`. Se não puder mover,
aponte um Chrome fora dessas pastas: `REMOTION_CHROME=/caminho/chrome-headless-shell npm run render`.

## "GPU process isn't usable" / "Target closed"
Mesmo caso acima. Se persistir fora dessas pastas, tente `npx remotion render Video out/video.mp4 --gl=swangle`.

## `npm run transcribe` falha ao compilar
- Mac: instale as ferramentas de linha de comando: `xcode-select --install`.
- Windows: o `@remotion/install-whisper-cpp` baixa um binário pronto; rode o terminal como usuário normal e confira o antivírus.
- O Whisper só é usado quando há narração. Sem espaço: o modelo `medium` tem ~1,5 GB. Use `node scripts/transcribe.mjs narracao.mp3 small` (menos preciso).

## A transcrição errou nomes
Normal com marcas e @. Edite `fixes.json` e rode `npm run fix`. Use `"depoisDe"` para corrigir só uma ocorrência
(ex.: `{ "de": "vídeo", "para": "VIDEO", "depoisDe": "comenta" }`).

## `cue("...")` dá erro "não encontrada"
A frase não existe igual na transcrição. Confira o `transcript.json`: acentos e pontuação são ignorados, mas as palavras precisam bater.

## Fonte aparece diferente / delayRender timeout
As fontes vêm do Google Fonts e precisam de internet no render. Rode de novo; se persistir, confira a conexão.

## Texto estourando a largura
Use a conta `letras × 0,85 × size ≤ W - 240` e diminua o `size`, ou quebre em duas linhas.
