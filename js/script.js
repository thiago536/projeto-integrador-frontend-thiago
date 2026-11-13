// Ficha do dia (index)
const treino = [
  { series: 4, reps: 10, carga: 60 },
  { series: 4, reps: 8, carga: 40 },
  { series: 3, reps: 12, carga: 35 },
  { series: 4, reps: 12, carga: 120 }
];

function mostrarFicha() {
  const total = document.getElementById("volume-total");
  if (!total) {
    return;
  }

  const celulas = document.getElementsByClassName("volume");
  let soma = 0;

  for (let i = 0; i < treino.length; i++) {
    const volume = treino[i].series * treino[i].reps * treino[i].carga;
    celulas[i].textContent = volume + " kg";
    soma = soma + volume;
  }

  total.textContent = soma + " kg";
}

mostrarFicha();

// Cronômetro (index)
let segundos = 0;
let relogio = null;

function formata(n) {
  if (n < 10) {
    return "0" + n;
  }
  return "" + n;
}

function mostrarTempo() {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  document.getElementById("cron-display").textContent = formata(min) + ":" + formata(seg);
}

function iniciar() {
  if (relogio !== null) {
    return;
  }
  relogio = setInterval(function () {
    segundos = segundos + 1;
    mostrarTempo();
  }, 1000);
}

function pausar() {
  clearInterval(relogio);
  relogio = null;
}

function zerar() {
  pausar();
  segundos = 0;
  mostrarTempo();
}

const btnIniciar = document.getElementById("btn-iniciar");

if (btnIniciar) {
  btnIniciar.addEventListener("click", iniciar);
  document.getElementById("btn-pausar").addEventListener("click", pausar);
  document.getElementById("btn-zerar").addEventListener("click", zerar);
}

// Exercícios (exercicios)
const catalogo = [
  { id: "agachamento", nome: "Agachamento livre", grupo: "Pernas", descricao: "Trabalha quadríceps e glúteos.",
    execucao: "Pés na largura dos ombros, desça até a coxa ficar paralela ao chão e suba empurrando o chão." },
  { id: "supino", nome: "Supino reto", grupo: "Peito", descricao: "Trabalha peitoral, ombro e tríceps.",
    execucao: "Deitado no banco, desça a barra até o meio do peito e empurre de volta sem tirar o quadril do banco." },
  { id: "remada", nome: "Remada curvada", grupo: "Costas", descricao: "Trabalha dorsais e bíceps.",
    execucao: "Tronco inclinado e coluna reta, puxe a barra em direção ao umbigo." },
  { id: "leg-press", nome: "Leg press", grupo: "Pernas", descricao: "Quadríceps sem carregar a lombar.",
    execucao: "Costas no encosto, desça até os joelhos formarem 90 graus e empurre sem travar os joelhos." },
  { id: "desenvolvimento", nome: "Desenvolvimento com halteres", grupo: "Ombros", descricao: "Trabalha deltoides e tríceps.",
    execucao: "Sentado, halteres na altura das orelhas, empurre para cima e desça devagar." },
  { id: "rosca", nome: "Rosca direta", grupo: "Braços", descricao: "Isola o bíceps.",
    execucao: "Cotovelos colados ao corpo, suba a barra até o peito e desça sem balançar." }
];

const icones = {
  "Pernas": "img/icone-pernas.svg",
  "Peito": "img/icone-peito.svg",
  "Costas": "img/icone-costas.svg",
  "Ombros": "img/icone-ombros.svg",
  "Braços": "img/icone-bracos.svg"
};

const CHAVE_FAVORITOS = "meuTreino.favoritos";
const CHAVE_NOVOS = "meuTreino.personalizados";

function lerLista(chave) {
  const salvo = localStorage.getItem(chave);
  if (salvo === null) {
    return [];
  }
  return JSON.parse(salvo);
}

function salvarLista(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}

let favoritos = lerLista(CHAVE_FAVORITOS);
let novos = lerLista(CHAVE_NOVOS);

function ehFavorito(id) {
  return favoritos.indexOf(id) !== -1;
}

function alternarFavorito(id) {
  const pos = favoritos.indexOf(id);
  if (pos === -1) {
    favoritos.push(id);
  } else {
    favoritos.splice(pos, 1);
  }
  salvarLista(CHAVE_FAVORITOS, favoritos);
}

// Cria o cartão de um exercício. Texto entra com textContent
function criarCard(exercicio) {
  const coluna = document.createElement("div");
  coluna.className = "col-12 col-md-6 col-lg-4";

  const card = document.createElement("div");
  card.className = "cartao";

  const imagem = document.createElement("img");
  imagem.src = icones[exercicio.grupo] || "img/icone-geral.svg";
  imagem.width = 32;
  imagem.height = 32;
  imagem.alt = "";

  const titulo = document.createElement("h2");
  titulo.textContent = exercicio.nome;

  const grupo = document.createElement("span");
  grupo.className = "grupo";
  grupo.textContent = exercicio.grupo;

  const descricao = document.createElement("p");
  descricao.textContent = exercicio.descricao;

  // Favoritar: o clique é tratado pela lista (event delegation), por isso não tem listener aqui
  const botaoFavorito = document.createElement("button");
  botaoFavorito.type = "button";
  botaoFavorito.className = "botao-favorito";
  botaoFavorito.dataset.id = exercicio.id;
  if (ehFavorito(exercicio.id)) {
    botaoFavorito.textContent = "Favoritado";
  } else {
    botaoFavorito.textContent = "Favoritar";
  }

  // Detalhes: o Bootstrap abre o modal sozinho por causa dos data-bs-*
  const botaoDetalhes = document.createElement("button");
  botaoDetalhes.type = "button";
  botaoDetalhes.className = "botao-detalhes";
  botaoDetalhes.textContent = "Detalhes";
  botaoDetalhes.dataset.id = exercicio.id;
  botaoDetalhes.setAttribute("data-bs-toggle", "modal");
  botaoDetalhes.setAttribute("data-bs-target", "#modal-exercicio");

  card.appendChild(imagem);
  card.appendChild(titulo);
  card.appendChild(grupo);
  card.appendChild(descricao);
  card.appendChild(botaoFavorito);
  card.appendChild(botaoDetalhes);
  coluna.appendChild(card);
  return coluna;
}

// Apaga a lista e desenha tudo de novo (catálogo + exercícios criados pela pessoa)
function desenharExercicios() {
  const lista = document.getElementById("lista-exercicios");
  lista.textContent = "";

  const todos = catalogo.concat(novos);
  for (let i = 0; i < todos.length; i++) {
    lista.appendChild(criarCard(todos[i]));
  }
}

// Procura um exercício pelo id, no catálogo e nos novos
function buscarExercicio(id) {
  const todos = catalogo.concat(novos);
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return todos[i];
    }
  }
  return null;
}

function adicionarExercicio(evento) {
  evento.preventDefault();

  const form = evento.target;
  const nome = form.nome.value.trim();
  const aviso = document.getElementById("aviso");

  if (nome === "") {
    aviso.textContent = "Digite um nome.";
    return;
  }

  let descricao = form.descricao.value.trim();
  if (descricao === "") {
    descricao = "Exercício novo.";
  }

  novos.push({
    id: "novo" + Date.now(),
    nome: nome,
    grupo: form.grupo.value,
    descricao: descricao
  });

  salvarLista(CHAVE_NOVOS, novos);
  desenharExercicios();

  aviso.textContent = nome + " adicionado.";
  form.reset();
}

const lista = document.getElementById("lista-exercicios");

if (lista) {
  desenharExercicios();

  // Um único listener no <ul>/<div> pai trata o clique de todos os botões Favoritar
  lista.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".botao-favorito");
    if (botao) {
      alternarFavorito(botao.dataset.id);
      if (ehFavorito(botao.dataset.id)) {
        botao.textContent = "Favoritado";
      } else {
        botao.textContent = "Favoritar";
      }
    }
  });
}

// Modal: preenche com o exercício do botão Detalhes antes de abrir
const modal = document.getElementById("modal-exercicio");

if (modal) {
  modal.addEventListener("show.bs.modal", function (evento) {
    const exercicio = buscarExercicio(evento.relatedTarget.dataset.id);
    if (!exercicio) {
      return;
    }
    document.getElementById("modal-titulo").textContent = exercicio.nome;
    document.getElementById("modal-grupo").textContent = exercicio.grupo;
    document.getElementById("modal-descricao").textContent = exercicio.descricao;
    document.getElementById("modal-execucao").textContent = exercicio.execucao || "Sem instruções. Pergunte ao personal.";
  });
}

const formulario = document.getElementById("form-exercicio");
if (formulario) {
  formulario.addEventListener("submit", adicionarExercicio);
}
