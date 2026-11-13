// ===== Meu Treino: script principal =====
// O arquivo é carregado com "defer", então o HTML já existe quando ele roda.

// ----- Menu do celular -----
const botaoMenu = document.querySelector(".botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");

// Abre ou fecha o menu e atualiza o aria-expanded para leitores de tela
function alternarMenu() {
  const estaAberto = menuPrincipal.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", estaAberto);
}

if (botaoMenu && menuPrincipal) {
  botaoMenu.addEventListener("click", alternarMenu);
}

// ----- Cálculo do volume do treino -----
// Volume = séries x repetições x carga (kg). Quanto maior, mais trabalho o músculo fez.

// Exercícios do treino de hoje (mesma ordem da tabela da ficha)
const treinoDeHoje = [
  { nome: "Agachamento livre", series: 4, repeticoes: 10, carga: 60 },
  { nome: "Supino reto", series: 4, repeticoes: 8, carga: 40 },
  { nome: "Remada curvada", series: 3, repeticoes: 12, carga: 35 },
  { nome: "Leg press", series: 4, repeticoes: 12, carga: 120 }
];

// Calcula o volume de um exercício
function calcularVolume(series, repeticoes, carga) {
  return series * repeticoes * carga;
}

// Soma o volume de todos os exercícios do treino
function calcularVolumeTotal(treino) {
  let total = 0;
  for (const exercicio of treino) {
    total += calcularVolume(exercicio.series, exercicio.repeticoes, exercicio.carga);
  }
  return total;
}

// Mostra o volume de cada exercício e o total na ficha do dia (só existe na home)
function mostrarVolumeNaFicha() {
  const celulasVolume = document.querySelectorAll("#tabela-ficha .volume");
  const campoTotal = document.querySelector("#volume-total");

  if (celulasVolume.length === 0 || !campoTotal) {
    return;
  }

  for (let i = 0; i < treinoDeHoje.length; i++) {
    const exercicio = treinoDeHoje[i];
    const volume = calcularVolume(exercicio.series, exercicio.repeticoes, exercicio.carga);
    celulasVolume[i].textContent = volume.toLocaleString("pt-BR") + " kg";
  }

  const total = calcularVolumeTotal(treinoDeHoje);
  campoTotal.textContent = total.toLocaleString("pt-BR") + " kg";
}

mostrarVolumeNaFicha();

// ----- Catálogo de exercícios (página exercicios.html) -----

// Exercícios que já vêm no site
const catalogoExercicios = [
  { id: "agachamento", nome: "Agachamento livre", grupo: "Pernas", descricao: "Trabalha quadríceps e glúteos." },
  { id: "supino", nome: "Supino reto", grupo: "Peito", descricao: "Trabalha peitoral, ombro e tríceps." },
  { id: "remada", nome: "Remada curvada", grupo: "Costas", descricao: "Trabalha dorsais e bíceps." },
  { id: "leg-press", nome: "Leg press", grupo: "Pernas", descricao: "Quadríceps forte sem carregar a lombar." },
  { id: "desenvolvimento", nome: "Desenvolvimento com halteres", grupo: "Ombros", descricao: "Trabalha deltoides e tríceps." },
  { id: "rosca", nome: "Rosca direta", grupo: "Braços", descricao: "Isola o bíceps." }
];

const listaExercicios = document.querySelector("#lista-exercicios");
const CHAVE_FAVORITOS = "meuTreino.favoritos";

// Lê uma lista salva no localStorage. Se não houver nada (ou der erro), devolve lista vazia
function lerLista(chave) {
  try {
    const texto = localStorage.getItem(chave);
    if (texto === null) {
      return [];
    }
    return JSON.parse(texto);
  } catch (erro) {
    return [];
  }
}

// Salva uma lista no localStorage como texto JSON
function salvarLista(chave, lista) {
  try {
    localStorage.setItem(chave, JSON.stringify(lista));
  } catch (erro) {
    console.warn("Não foi possível salvar no navegador.");
  }
}

const CHAVE_PERSONALIZADOS = "meuTreino.personalizados";

// Exercícios criados pela pessoa no formulário
let exerciciosPersonalizados = lerLista(CHAVE_PERSONALIZADOS);

// ids dos exercícios favoritos (continuam salvos depois do F5)
let favoritos = lerLista(CHAVE_FAVORITOS);

// Marca ou desmarca um exercício como favorito e salva
function alternarFavorito(id, botao) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(function (favorito) {
      return favorito !== id;
    });
  } else {
    favoritos.push(id);
  }
  salvarLista(CHAVE_FAVORITOS, favoritos);
  botao.setAttribute("aria-pressed", favoritos.includes(id));
}

// Escolhe o arquivo de ícone de acordo com o grupo muscular
function iconeDoGrupo(grupo) {
  switch (grupo) {
    case "Pernas":
      return "img/icone-pernas.svg";
    case "Peito":
      return "img/icone-peito.svg";
    case "Costas":
      return "img/icone-costas.svg";
    case "Ombros":
      return "img/icone-ombros.svg";
    case "Braços":
      return "img/icone-bracos.svg";
    default:
      return "img/icone-geral.svg";
  }
}

// Cria o <li> de um exercício. Todo texto entra com textContent (seguro)
function criarCardExercicio(exercicio) {
  const item = document.createElement("li");

  const card = document.createElement("article");
  card.className = "card card-exercicio";

  const icone = document.createElement("img");
  icone.className = "icone";
  icone.src = iconeDoGrupo(exercicio.grupo);
  icone.alt = ""; // decorativo: o grupo já aparece escrito no card
  icone.width = 32;
  icone.height = 32;

  const titulo = document.createElement("h2");
  titulo.textContent = exercicio.nome;

  const grupo = document.createElement("p");
  grupo.className = "etiqueta";
  grupo.textContent = exercicio.grupo;

  const descricao = document.createElement("p");
  descricao.textContent = exercicio.descricao;

  // Botão de favoritar: aria-pressed diz se está marcado
  const botaoFavorito = document.createElement("button");
  botaoFavorito.type = "button";
  botaoFavorito.className = "botao-favorito";
  botaoFavorito.textContent = "Favorito";
  botaoFavorito.setAttribute("aria-pressed", favoritos.includes(exercicio.id));
  botaoFavorito.dataset.id = exercicio.id; // guarda o id pra saber qual foi clicado

  card.appendChild(icone);
  card.appendChild(titulo);
  card.appendChild(grupo);
  card.appendChild(descricao);
  card.appendChild(botaoFavorito);
  item.appendChild(card);
  return item;
}

// Limpa a lista e desenha todos os exercícios do array
function renderizarExercicios() {
  listaExercicios.textContent = "";
  const todos = catalogoExercicios.concat(exerciciosPersonalizados);
  for (const exercicio of todos) {
    listaExercicios.appendChild(criarCardExercicio(exercicio));
  }
}

// Lê o formulário, cria o exercício novo, salva e redesenha a lista
function adicionarExercicio(evento) {
  evento.preventDefault(); // não recarrega a página

  const formulario = evento.target;
  const nome = formulario.nome.value.trim();
  const aviso = document.querySelector("#aviso-exercicio");

  if (nome === "") {
    aviso.textContent = "Digite o nome do exercício.";
    return;
  }

  const descricao = formulario.descricao.value.trim();
  const novoExercicio = {
    id: "personalizado-" + Date.now(),
    nome: nome,
    grupo: formulario.grupo.value,
    descricao: descricao === "" ? "Exercício personalizado." : descricao
  };

  exerciciosPersonalizados.push(novoExercicio);
  salvarLista(CHAVE_PERSONALIZADOS, exerciciosPersonalizados);
  renderizarExercicios();

  // textContent: o que a pessoa digitou aparece como texto, nunca como HTML
  aviso.textContent = `"${nome}" foi adicionado à lista.`;
  formulario.reset();
}

// Event delegation: UM único listener no <ul> trata o clique de todos os botões,
// inclusive dos cards criados depois
function tratarCliqueNaLista(evento) {
  const botao = evento.target.closest(".botao-favorito");
  if (botao) {
    alternarFavorito(botao.dataset.id, botao);
  }
}

if (listaExercicios) {
  renderizarExercicios();
  listaExercicios.addEventListener("click", tratarCliqueNaLista);
}

const formExercicio = document.querySelector("#form-exercicio");
if (formExercicio) {
  formExercicio.addEventListener("submit", adicionarExercicio);
}
