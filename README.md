# Motion com Claude

Crie vídeos de **motion graphics com cara de motion designer**, com tipografia cinética, cores fortes e transições
de verdade, **só conversando com o Claude**. Sem After Effects, sem timeline, sem arrastar nada na tela.

Você manda a narração e conta o que quer. O Claude escreve a animação em código, sincroniza cada
elemento com a palavra falada e entrega o MP4 pronto.

> Feito por [@gabrielrabeloia](https://instagram.com/gabrielrabeloia)

---

## O que você precisa

| | O quê | Custo |
|---|---|---|
| 1 | **Assinatura do Claude** Pro ou Max (inclui o Claude Code) | a partir de US$ 20/mês |
| 2 | **App do Claude no computador** (aba *Code*) ou Claude Code no terminal | grátis com a assinatura |
| 3 | **Node.js** (versão LTS) | grátis |
| 4 | Mac: **ferramentas de linha de comando da Apple** | grátis |
| 5 | ~3 GB livres e internet | |

Funciona em Mac e Windows. Num notebook comum, o render leva de 5 a 8 minutos por minuto de vídeo.

---

## Passo a passo da instalação (só na 1ª vez)

### 1. Assine o Claude
Entre em [claude.ai](https://claude.ai), faça login e assine o plano **Pro** ou **Max**.

### 2. Instale o Node.js
1. Acesse [nodejs.org](https://nodejs.org) e baixe a versão **LTS** (o botão verde da esquerda).
2. Abra o instalador e clique em *Continuar* até o fim.
3. Confira: abra o **Terminal** (Mac: `Cmd + Espaço`, digite "Terminal") ou o **PowerShell** (Windows) e rode:
   ```bash
   node -v
   ```
   Deve aparecer algo como `v22.x.x`. Qualquer versão 20 ou maior serve.

### 3. (Só Mac) Instale as ferramentas da Apple
No Terminal:
```bash
xcode-select --install
```
Clique em *Instalar* na janela que abrir. Se disser que já está instalado, pode seguir.

### 4. Instale o Claude Code
No Terminal:
```bash
npm install -g @anthropic-ai/claude-code
```
Depois rode `claude` uma vez e faça login com a sua conta do Claude. Se preferir usar o **app do Claude**,
baixe em [claude.ai/download](https://claude.ai/download): a aba **Code** usa a mesma instalação.

### 5. Instale a skill
No Terminal, rode as duas linhas:
```bash
claude plugin marketplace add SEU_USUARIO/claude-motion
claude plugin install motion@gabrielrabelo
```
Pronto: o comando `/motion:criar-video` está disponível no Claude Code e na aba Code do app.

<details>
<summary>Instalação manual (sem os comandos acima)</summary>

Baixe este repositório (botão verde **Code → Download ZIP**), descompacte e copie a pasta
`plugins/motion/skills/criar-video` para `~/.claude/skills/criar-video`
(no Windows: `C:\Users\SEU_NOME\.claude\skills\criar-video`). Nesse caso o comando é `/criar-video`.
</details>

---

## Seu primeiro vídeo

### 1. Grave a narração
- Grave no celular ou no computador, num lugar silencioso, e exporte em **mp3** (m4a e wav também servem).
- Frases curtas e diretas. Os primeiros 3 segundos são o gancho: comece com a frase mais forte.
- 30 a 60 segundos é o ideal para Reels.

### 2. Crie uma pasta para o vídeo
> ⚠️ No Mac, **não** crie dentro de *Documentos*, *Mesa* ou *Downloads*: o macOS bloqueia o render nessas pastas.

```bash
mkdir -p ~/videos/meu-primeiro-video
```
Coloque a narração dentro dela com o nome **`narracao.mp3`**.

### 3. Abra o Claude nessa pasta
- **App:** aba *Code* → escolha a pasta `videos/meu-primeiro-video`.
- **Terminal:** `cd ~/videos/meu-primeiro-video` e depois `claude`.

### 4. Peça o vídeo
Exemplo de pedido:

```
/motion:criar-video
Use a narracao.mp3. Formato 9:16 para Reels.
Cores da marca: #FF5A36 e #0B0F14. No final: "@minhamarca" e "Comenta MOTION".
Quero algo impressionante, com cara de motion designer. Vai com tudo.
```

O Claude vai:
1. preparar o projeto e instalar o que precisa (1ª vez: alguns minutos);
2. transcrever a narração com tempo por palavra (roda no seu computador, nada é enviado);
3. **mostrar o plano de cenas** para você aprovar;
4. montar as cenas, revisar os quadros e renderizar `out/video.mp4`.

### 5. Ajuste conversando
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
| Erro ao transcrever no Mac | Rode `xcode-select --install` e tente de novo |
| Nomes errados na transcrição | Peça: *"corrige 'Cloud' para 'Claude' na transcrição"* |
| `command not found: claude` / `node` | Feche e abra o Terminal de novo, ou refaça os passos 2 e 4 |
| Fonte diferente / timeout | O render precisa de internet (as fontes vêm do Google Fonts) |

Mais detalhes em [`references/problemas.md`](plugins/motion/skills/criar-video/references/problemas.md).

---

## Como funciona (para os curiosos)

- **[Remotion](https://www.remotion.dev)**: vídeo feito em React; cada frame é uma página renderizada pelo Chrome.
- **Whisper (whisper.cpp)**: transcrição local com tempo por palavra; cada elemento entra na palavra em que é dito.
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
