# projeto-integrador-frontend-thiago

**Meu Treino** é um site estático para organizar treinos de academia.
Nele dá para ver a ficha de treino do dia, consultar um catálogo de exercícios,
marcar os exercícios favoritos e mandar uma mensagem para o personal pelo formulário de contato.
Projeto Integrador da disciplina Desenvolvimento Front-End para Web (Cruzeiro do Sul), feito só com HTML, CSS e JavaScript.

**Gráficos:** o logo é SVG inline (desenho estático, escala sem perder nitidez e pode ser estilizado pelo CSS). O gráfico de volume é Canvas 2D, barras desenhadas pelo JavaScript, com texto de fallback dentro do `<canvas>`.

**Componente de IA:** o cronômetro de descanso da home foi gerado com IA e adaptado. Prompts, respostas e comparação em [docs/prompts-ia.md](docs/prompts-ia.md).

## Público

Quem treina musculação, iniciante ou intermediário, e já tem uma ficha passada por um profissional.
A ideia é consultar a ficha no celular durante o treino, sem instalar app e sem criar conta.

## Funcionalidades

- **Início:** ficha do dia com volume calculado (séries × reps × carga), gráfico de volume em canvas, cronômetro de descanso, vídeo do ritmo do agachamento e bipe de descanso.
- **Exercícios:** catálogo com descrição e modal "Como executar", botão Favoritar e formulário para adicionar exercícios próprios (salvos só no navegador, via `localStorage`).
- **Contato:** formulário para o personal (demonstrativo: não envia dados para nenhum servidor).

## Como visualizar

- Online: https://thiago536.github.io/projeto-integrador-frontend-thiago/
- Local: clone o repositório e abra o `index.html` no navegador. Não precisa instalar nada.

```bash
git clone https://github.com/thiago536/projeto-integrador-frontend-thiago.git
```

## Créditos

| Material | Origem | Licença |
| --- | --- | --- |
| [Bootstrap 5.3.3](https://getbootstrap.com/) (CSS e JS, via CDN jsDelivr, só em `exercicios.html`) | The Bootstrap Authors | [MIT](https://github.com/twbs/bootstrap/blob/main/LICENSE) |
| Logo e ícones SVG | Desenhados no projeto | Próprios |
| Vídeo, poster e bipe (`media/`, `assets/images/agachamento-poster.jpg`) | Gerados no projeto com FFmpeg | Próprios |
| Textos e dados da ficha | Escritos no projeto (dados fictícios) | Próprios |
| Fontes | Arial e Courier New, do sistema | Não distribuídas |
| Cronômetro de descanso | Gerado com IA (Claude) e adaptado | Ver [docs/prompts-ia.md](docs/prompts-ia.md) |

## Decisões éticas e profissionais (resumo)

- **Sem coleta de dados pessoais:** sem login, cadastro ou analytics; favoritos ficam só no aparelho (princípio da necessidade, LGPD art. 6º, III).
- **Acessibilidade:** link para pular conteúdo, foco visível, rótulos em todos os campos, `alt` nas imagens e nomes únicos nos botões.
- **Peso leve:** mídia com `preload="metadata"`/`"none"`, SVG no lugar de imagens, fontes do sistema.
- **Saúde:** cargas e instruções são exemplos; siga a orientação do seu profissional de Educação Física.
- **Uso de IA:** declarado em [docs/prompts-ia.md](docs/prompts-ia.md) e no relatório final.

A análise completa está no relatório em PDF entregue na disciplina.

## Licença

Código sob licença [MIT](LICENSE). Autor: José Thiago De Oliveira Souza.


## Histórico do projeto

Comecei o Projeto Integrador em 31/08/2026 com outro tema, um dashboard de finanças pessoais,
no repositório [projeto-integrador-frontend-thiagooliveira](https://github.com/thiago536/projeto-integrador-frontend-thiagooliveira).
Cheguei até o início da barra lateral (último commit em 09/09/2026) e desisti desse tema.
Recomecei do zero com o **Meu Treino** em 13/11/2026, neste repositório, refazendo as entregas aula por aula (um PR por aula).
