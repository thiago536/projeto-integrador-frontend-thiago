# Componente de IA: cronômetro de descanso (Aula 13)

Os dois prompts foram enviados para um assistente de IA (Claude), cada um numa conversa
nova e sem nenhum contexto do projeto. As respostas completas estão copiadas sem alteração em:

- [resposta-prompt-vago.md](resposta-prompt-vago.md)
- [resposta-prompt-reforcado.md](resposta-prompt-reforcado.md)

## 1. Prompt vago

> faz um cronômetro em javascript

## 2. Prompt reforçado

> Crie um cronômetro de descanso em HTML, CSS e JavaScript puro (sem React), com botões
> Iniciar, Pausar e Zerar usando `<button>`, acessível por teclado (Tab + Enter/Espaço),
> com `aria-live` anunciando o tempo, usando `textContent`, para encaixar num projeto que
> já usa Bootstrap 5 via CDN.

## 3. Comparação

- O vago **não** veio com React, mas veio como uma página HTML inteira e separada, com `<style>` e `<script>` dentro dela: não encaixa num projeto que já existe.
- O vago não tem nada de acessibilidade: o tempo fica numa `div` sem `aria-live` (leitor de tela não anuncia nada), os botões não têm `type` e nunca ficam desabilitados, e usa `onclick` direto no elemento.
- O vago mostra milésimos atualizando a cada 10 ms, exagero para contar descanso entre séries.
- O reforçado respeitou cada restrição pedida: `<button type="button">`, `aria-live` que anuncia só ao iniciar/pausar/zerar e a cada 15 s (em vez de a cada segundo), foco movido para o botão ativo e classes do Bootstrap.
- Conclusão: quanto mais contexto e restrições no prompt (tecnologia, acessibilidade, onde o código vai entrar), menos retrabalho depois.

## 4. O que eu adaptei no código do prompt reforçado

- Tirei o `style="max-width: 24rem"` inline e passei para o `css/style.css` (regra do projeto: sem estilo inline).
- Troquei a IIFE e as arrow functions por funções normais com nomes em português (`iniciarCronometro`, `tempoPorExtenso`).
- Usei o visual do site (`cartao`, `botao-primario`, `botao-secundario`) no lugar de `card`/`btn-success`/`btn-warning`.
- Corrigi o anúncio a cada 15 s: o original podia repetir o mesmo segundo. Agora guardo o último segundo anunciado em `ultimoAnuncio`.
- Movi o JavaScript para o `js/script.js` (que já carrega com `defer`).
