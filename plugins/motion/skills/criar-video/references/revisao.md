# Checklist de revisão

Rode em cada folha de contato (`npm run sheet`) antes de renderizar.

## Por frame
- [ ] Nenhum texto cortado na borda. Exceção: sangria intencional de 1 palavra gigante.
- [ ] Nenhum texto passando por cima de outro texto legível.
- [ ] Contraste: texto escuro em fundo claro e vice-versa (`on(bg)`).
- [ ] Nada encostando no HUD (margem de ~110 px nas bordas).
- [ ] Nenhum acento (Á, Í, Ç) aparecendo antes da letra entrar.

## Por transição (4 frames antes, no corte, 6 depois)
- [ ] Quem sai terminou de sair antes de quem entra ficar legível.
- [ ] Nenhum quadro vazio por mais de 2 frames.
- [ ] O conteúdo acompanha a troca de fundo (não fica parado sobre a cor nova nem some num corte seco).
- [ ] A transição é motivada: dá para dizer qual elemento virou o próximo.

## Fala × imagem
- [ ] Cada elemento-chave entra na palavra em que é dito (±2 frames).
- [ ] Nenhum rótulo, número ou afirmação que a fala não faz.
- [ ] Sem som, a ideia de cada cena continua clara.

## Vídeo inteiro
- [ ] Hook: a 1ª palavra está na tela antes do frame 5.
- [ ] Nenhum trecho parado por mais de 1,5 s.
- [ ] O frame final é limpo: @/marca + CTA, sem restos de cenas anteriores.
- [ ] Duração do MP4 ≈ narração + ~1,5 s.
