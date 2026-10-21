# Linguagem visual

O que separa um motion de "PowerPoint animado" de um motion de designer é quase sempre isto:
tipografia, cor, ritmo, easing e transições. Estas regras saíram de vídeos reais feitos com esta skill.

## Tipografia

- **Display gigante, largo e pesado**: Archivo com `display(125, 900)`. A palavra-chave ocupa de 60% a 90% da largura da tela.
- Tamanhos de referência em 16:9: palavra curta (até 6 letras) 280-380px; palavra média (7-9 letras) 200-260px; frase de 2 linhas 180-210px. Em 9:16, cerca de 60% disso.
- Conta de largura: cada letra maiúscula em `wdth 125 / wght 900` ocupa ~0,85 × o tamanho da fonte. `letras × 0,85 × size` precisa caber em `W - 240`.
- **Contraste de família**: uma linha em serifa itálica (`SerifLine`) para o tom de conversa ("ele foi", "e o melhor:") e o display para a palavra que importa.
- **Mono** só para rótulos técnicos (`Tag`, HUD, código).
- Animar a largura (`mode="stretch"`, de 62 para 125) é o recurso mais "motion designer" da fonte. Use em nomes e palavras de impacto.

## Cor

- Cada cena tem uma **cor de fundo chapada** que ocupa a tela toda. Sem gradiente arco-íris e sem fundo "bonitinho" com blur.
- Paleta: 1 escura (base), 1 clara neutra (creme) e 3-4 cores fortes. Alterne cena escura e cena colorida.
- A troca de fundo (`WIPES`) acontece numa palavra falada, com uma forma: `circle` (explosão a partir de um ponto, de preferência de um elemento), `left`/`right`/`up`/`down` (barra/cortina), `diag`, ou `cut` (quando a cena desenha a própria transição).
- O texto usa `on(bg)` para contrastar com o fundo do frame.
- Quando a fala cita uma marca, use a cor da marca naquela cena (ex.: Claude = laranja `#DA7757`).

## Ritmo

- **Hook (0-3 s)**: a primeira palavra bate na tela no frame 1-3 (`mode="slam"`). Troque de visual a cada 0,5-1 s, com uma palavra-chave por tela. Um contraste forte, como uma palavra riscada com glitch que despenca e é substituída, prende muito.
- Depois do hook: visual novo a cada 1-2 s. Nenhum frame parado por mais de 1,5 s (o HUD com timecode e os `Burst` girando ajudam).
- Um "kick" de câmera (`<Kick hits={[...]}>`) em cada palavra de impacto. Não em toda palavra.

## Movimento e easing

- Entradas de 6-11 frames com `EASE_OUT` (sai rápido, pousa suave). Saídas de 6-9 frames com `EASE_IN`.
- `mask`: letras sobem por trás de uma máscara, em cascata (1 frame por letra).
- `slam`: a palavra inteira bate (escala 1.5→1 + blur). Para o impacto principal de cada cena.
- `stretch`: estica a largura. Para nomes e revelações.
- Camadas e profundidade: perspectiva leve (`rotateX`/`rotateY` de 15-25°) em interfaces e telas, sombras longas.

## Transições (onde mais se erra)

1. **Quem sai, sai antes de quem entra.** Um elemento novo só aparece quando o anterior terminou de sair ou está a 1-2 frames disso. Nunca duas camadas de texto legíveis ao mesmo tempo.
2. **Nada some num corte seco.** Se o fundo troca por cortina, o conteúdo vai junto (empurrado, encolhido ou varrido).
3. **Motivada**: o elemento que fica vira o próximo. Exemplos que funcionam:
   - mergulho (zoom 1→26) dentro de uma palavra, saindo na próxima cor;
   - o fundo da cena encolhe e vira a caixa/botão da próxima;
   - a cabeça de leitura de uma timeline vira o cursor de texto;
   - uma preview encolhe em perspectiva e vira uma das telas de uma vitrine;
   - o círculo da próxima cor nasce do botão que acabou de ser clicado.
4. Sem quadro vazio: entre a saída de um e a entrada do outro, no máximo 2 frames sem conteúdo.

## Coerência (o vídeo precisa ser entendível)

- Leia a fala de cada cena e descreva o que aparece. Se um estranho só vir o vídeo sem som, ele entende a ideia?
- Não mostre números, rótulos ou afirmações que a fala não faz (ex.: um contador de "projetos entregues" quando a fala diz "quase nenhuma empresa tem quem faça").
- Rótulos visíveis usam palavras da fala sempre que possível.
- Legenda: o texto gigante já carrega a fala. Use `Captions` só se pedirem, e nunca por cima do elemento principal.

## HUD

O `Hud` (cantoneiras, capítulo da cena, timecode correndo, barra de progresso) dá o acabamento de "peça de designer"
e garante movimento constante. Os capítulos são rótulos curtos em maiúsculas: HOOK, PROBLEMA, SOLUÇÃO, CTA.
