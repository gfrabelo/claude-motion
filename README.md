# Motion com Claude

Crie vídeos de **motion graphics com cara de motion designer**, com tipografia cinética, cores fortes e transições
de verdade, **só conversando com o Claude**. Sem After Effects, sem timeline, sem arrastar nada na tela.

Você conta o que quer e manda uma referência. O Claude escreve a animação em código e entrega o MP4 pronto.
Se tiver narração, ele sincroniza cada elemento com a palavra falada.

> Feito por [@gabrielrabeloia](https://instagram.com/gabrielrabeloia)

---

## Instalação: 1 passo

**Você precisa de:** assinatura do Claude **Pro** ou **Max** e o app do Claude no computador
([claude.ai/download](https://claude.ai/download)), aba **Code**. Só isso. O resto o Claude instala.

Abra a aba **Code** e cole:

```
Instala pra mim a skill de motion deste repositório: https://github.com/gfrabelo/claude-motion
```

O Claude roda o instalador e cuida de tudo: Node.js, a skill e a pasta `videos`. Leva poucos minutos.

<details>
<summary>Prefere o Terminal? Um comando também resolve</summary>

Mac / Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/gfrabelo/claude-motion/main/install.sh | bash
```

Windows (PowerShell):
```powershell
irm https://raw.githubusercontent.com/gfrabelo/claude-motion/main/install.ps1 | iex
```
</details>

---

## Seu primeiro vídeo

### 1. Abra uma conversa nova no Claude
Na aba **Code**, escolha uma pasta dentro de **`videos`** (o instalador já criou).
Se não souber como, peça: *"cria a pasta videos/meu-primeiro-video e abre ela"*.

> No Mac, não use pastas dentro de *Documentos*, *Mesa* ou *Downloads*: o macOS bloqueia o render nelas.

### 2. Peça o vídeo
Exemplo de pedido:

```
/motion:criar-video
Um motion de 15s para Reels apresentando a minha hamburgueria.
Quero nessa linguagem: https://motionvideo.xyz/videos/stephanlivera-df17a2
Cores da marca: #FF5A36 e #0B0F14. No final: "@minhamarca" e "Peça pelo link da bio".
Vai com tudo.
```

**Tem narração?** Coloque o áudio (mp3) na pasta e diga *"sincroniza com a narração"*. O Claude prepara a transcrição
na hora (na 1ª vez baixa ~1,5 GB e, no Mac, pode pedir para instalar as ferramentas da Apple).

O Claude vai:
1. estudar a referência e preparar o projeto (1ª vez: alguns minutos);
2. **mostrar o plano de cenas** para você aprovar;
3. montar as cenas, revisar os quadros e renderizar `out/video.mp4`.

### 3. Ajuste conversando
Depois de assistir, peça mudanças em linguagem normal:
- "a cena 3 está lenta, acelera"
- "troca o fundo do final para preto"
- "o nome aparece antes de eu falar, sincroniza"
- "faz uma versão 16:9 para o YouTube"

Para ver o vídeo sendo montado antes do render final, peça *"abre o preview"* (Remotion Studio no navegador).

---

## Referências para se inspirar

- **[motionvideo.xyz](https://motionvideo.xyz)**: galeria de vídeos de motion feitos por IA, com o prompt de cada um. Filtre por *Kinetic type*, *Shapes* ou *Particles*, ache um que goste e mande o link junto com o seu pedido: *"quero nessa linguagem"*.
- Mande prints ou links de vídeos que você curte. O Claude descreve a linguagem (paleta, tipografia, ritmo, transições) antes de aplicar.

---

## Problemas comuns

| Sintoma | Solução |
|---|---|
| Render travado em "Getting composition" (Mac) | O projeto está em Documentos/Mesa/Downloads. Mova para `~/videos/...` |
| Erro ao transcrever a narração (Mac) | Rode `xcode-select --install` e tente de novo |
| Nomes errados na transcrição | Peça: *"corrige 'Cloud' para 'Claude' na transcrição"* |
| `/motion:criar-video` não aparece | Abra uma conversa nova (ou digite `/reload-plugins`) |
| Algo falhou na instalação | Peça ao Claude: *"roda o instalador da skill de motion de novo"* (ele pula o que já está pronto) |
| Fonte diferente / timeout | O render precisa de internet (as fontes vêm do Google Fonts) |

Mais detalhes em [`references/problemas.md`](plugins/motion/skills/criar-video/references/problemas.md).

---

## Para o Claude: como instalar

> Se alguém te mandou este repositório pedindo para instalar, siga estes passos. Não clone o repo nem copie arquivos à mão: o plugin cuida disso.

1. Rode o instalador (ele pula o que já está instalado):
   - Mac/Linux: `curl -fsSL https://raw.githubusercontent.com/gfrabelo/claude-motion/main/install.sh | bash`
   - Windows: `powershell -NoProfile -Command "irm https://raw.githubusercontent.com/gfrabelo/claude-motion/main/install.ps1 | iex"`
2. Ao terminar, confirme que `claude plugin list` mostra `motion@gabrielrabelo`. Se falhou, leia a última linha `✖` e resolva (ex.: sem internet, sem espaço) antes de rodar de novo.
3. Diga à pessoa, em poucas linhas: que está instalado; que precisa abrir uma **conversa nova** (ou `/reload-plugins`) para o comando `/motion:criar-video` aparecer; e como pedir o primeiro vídeo (uma pasta dentro de `~/videos` + o exemplo de pedido acima, com um link de referência). Ofereça já criar a pasta do primeiro vídeo.

---

## Como funciona (para os curiosos)

- **[Remotion](https://www.remotion.dev)**: vídeo feito em React; cada frame é uma página renderizada pelo Chrome.
- **Whisper (whisper.cpp)**, só quando há narração: transcrição local com tempo por palavra, para cada elemento entrar na palavra em que é dito.
- **A skill** ensina o Claude o processo (sincronia → plano de cenas → construção → revisão de quadros → render)
  e a linguagem visual (tipografia gigante, fundos chapados, transições motivadas, HUD), com componentes prontos.

```
plugins/motion/skills/criar-video/
├── SKILL.md                 # o processo que o Claude segue
├── references/              # linguagem visual, componentes, revisão, referências, problemas
└── template/                # projeto Remotion pronto (componentes + scripts)
```

## Licença

MIT. Use, adapte e venda vídeos feitos com isso à vontade. As fontes (Archivo, Instrument Serif, Geist Mono) são do Google Fonts (licença OFL).
