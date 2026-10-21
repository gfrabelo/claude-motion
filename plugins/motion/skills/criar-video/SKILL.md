---
name: criar-video
description: Cria vídeos de motion graphics com cara de motion designer (tipografia cinética, fundos de cor chapada, transições motivadas) escritos em código com Remotion e sincronizados palavra a palavra com uma narração. Use quando pedirem "vídeo de motion", "animação para reels/anúncio/post", "motion a partir dessa narração/roteiro", ou para ajustar um vídeo feito com esta skill.
---

# Criar vídeo de motion

Você vai escrever um vídeo de motion graphics em código (Remotion + React) e renderizar um MP4.
O objetivo é que quem assiste pense "isso foi feito por um motion designer". Siga as etapas na ordem,
mostre o plano antes de codar e revise frames antes de entregar.

O template pronto está na pasta `template/` deste diretório da skill. As regras de design estão em
`references/linguagem-visual.md`. Leia esse arquivo antes da etapa 3.

## 0. Entender o pedido

Pergunte só o que faltar (uma mensagem, no máximo 4 perguntas):
- **Narração**: tem áudio (mp3/wav/m4a)? Se não tiver, peça o roteiro e avise que o vídeo vai ficar sem voz, com tempos fixos.
- **Formato**: 16:9 (YouTube, feed) ou 9:16 (Reels, TikTok, Shorts).
- **Marca**: cores, @ e CTA final ("comenta X", "link na bio").
- **Referência visual** (opcional): link ou print. Se não tiver, sugira navegar em https://motionvideo.xyz (ver `references/referencias.md`).

## 1. Preparar o projeto

1. A pasta de trabalho **não pode** estar em `~/Documents`, `~/Desktop` ou `~/Downloads` no Mac: o Chrome que renderiza não consegue ler arquivos ali e o render trava. Se estiver, avise e sugira `~/videos/<nome>`.
2. Copie o template para a pasta de trabalho: `cp -R "<diretório desta skill>/template/." .`
3. `npm install` (1-3 min). Rode `npx tsc --noEmit` para conferir.
4. Coloque a narração na raiz como `narracao.mp3`.
5. Em `src/theme.ts`, ajuste `FORMAT` e a paleta `C` com as cores da marca.

## 2. Sincronia com a narração

1. `npm run transcribe`. Na 1ª vez compila o whisper.cpp e baixa o modelo (~1,5 GB, alguns minutos). Gera `transcript.raw.json` (tempo por palavra) e `transcript.json`.
2. Leia a transcrição. Corrija nomes, marcas e @ que o Whisper errou em `fixes.json` e rode `npm run fix`.
3. Opcional, se a narração estiver lenta: `node scripts/speed.mjs 1.15` e coloque `SPEED = 1.15` em `src/sync/cues.ts`. Isso acelera sem mudar o tom.
4. As deixas usam frases, não índices: `cue("troca a cor")` devolve o frame em que a frase começa e dá erro se a frase não existir.

## 3. Plano de cenas (mostre antes de codar)

Divida a narração em cenas: cada frase ou bloco de ideia vira uma cena que começa na 1ª palavra do bloco.
Monte uma tabela curta e mostre ao usuário:

| # | Fala | Frame | O que aparece (na palavra exata) | Fundo | Como vira a próxima |
|---|---|---|---|---|---|

Regras do plano (detalhes em `references/linguagem-visual.md`):
- **Hook nos primeiros 3 s**: nada de fade a partir do preto. A primeira palavra já bate na tela.
- **O que aparece é o que está sendo dito.** Releia cada linha: a imagem contradiz ou inventa algo que a fala não diz? Corrija.
- **Uma ideia por tela**, tipografia gigante. Visual novo a cada 1-2 s.
- **Cada cena tem uma cor de fundo**, e a troca acontece numa palavra, com uma forma (círculo, barra, diagonal).
- **Toda transição é motivada**: um elemento vira o próximo (a caixa vira moldura, o fundo encolhe e vira botão...).
- Marcas de terceiros: só o nome em texto. Não recrie logos. A cor da marca pode ser usada.

## 4. Construir

- `src/sync/timeline.ts`: um objeto por cena com as deixas (`S1 = { start: 0, escrito: cue("escrito") }`).
- `src/sync/colors.ts`: `WIPES` (trocas de fundo presas às deixas) e `CHAPTERS` do HUD.
- `src/scenes/S1Nome.tsx` etc.: uma cena por arquivo, usando os componentes (API em `references/componentes.md`).
- `src/Video.tsx`: cada cena dentro de `<Window from to>` com frames **globais**. Cenas vizinhas podem se sobrepor alguns frames para passar o bastão. Apague a cena `Demo`.
- Use os componentes antes de criar novos. Se criar um, deixe reutilizável e com props claras.

## 5. Revisar (obrigatório antes de renderizar)

1. `node scripts/stills.mjs <frames>` e depois `npm run sheet`. Olhe `out/sheet.jpg`.
2. Escolha os frames: 1 no meio de cada cena + **3 em cada transição** (4 frames antes, no corte, 6 depois).
3. Passe o checklist de `references/revisao.md`: sobreposições, texto cortado na borda, acento aparecendo antes da letra, quadro vazio, fala × imagem.
4. Corrija e repita só nos frames afetados.

## 6. Renderizar e entregar

- `npm run render` gera `out/video.mp4` (cerca de 5-8 min por minuto de vídeo num notebook comum).
- Extraia 3-4 frames do MP4 final nas palavras-chave para confirmar a sincronia.
- Entregue: caminho do MP4, duração, o que cada cena mostra e o que não foi conferido (por exemplo, "não assisti em tempo real").

## Ajustes depois da entrega

O usuário vai pedir coisas como "mais rápido aqui", "troca a cor", "muda o final". Edite só a cena afetada,
revise os frames da transição dela e renderize de novo. Se algo travar ou der erro, veja `references/problemas.md`.
