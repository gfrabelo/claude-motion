# Referências

## motionvideo.xyz

https://motionvideo.xyz reúne vídeos de motion feitos por IA, com o prompt ou a skill usados em cada um.
Use para escolher uma direção antes de começar.

- Filtre por categoria: **Kinetic type** (tipografia cinética), **Shapes**, **Particles**, **Product UI**, **Charts**, **Code**.
- Abra um vídeo e veja o **Prompt**: muitos são curtos e pedem ambição ("make a dynamic 15-second motion graphics video… go all out").
- Quando o usuário mandar um link de lá, abra a página, assista quadro a quadro (pause em 6-10 momentos) e descreva antes de copiar a linguagem:
  paleta, família tipográfica, tamanho da tipografia em relação à tela, ritmo de cortes, tipo de transição, elementos de acabamento (HUD, grade, grão).
- Não copie o vídeo. Traduza a linguagem para a narração e a marca do usuário.

O que costuma aparecer nos vídeos que mais impressionam:
- fundos chapados que trocam a cada 1-2 s (coral, creme, azul elétrico, limão, preto);
- grotesco largo e pesado ocupando a tela, com um acento em serifa itálica;
- moldura de HUD (cantoneiras, timecode, rótulos em mono, barra de progresso);
- formas simples morfando (estrela, asterisco, círculos), curvas de easing desenhadas e partículas.

## Como usar uma referência do usuário (print ou vídeo)

1. Descreva em 5 linhas: paleta, tipografia, ritmo, transições, acabamento.
2. Diga o que vai levar para o vídeo e o que não vai (e por quê).
3. Ajuste `src/theme.ts` (paleta) e as regras de ritmo antes de montar as cenas.
