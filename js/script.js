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

function alternarFavorito(id) {
  const pos = favoritos.indexOf(id);
  if (pos === -1) {
    favoritos.push(id);
  } else {
    favoritos.splice(pos, 1);
  }
  salvarLista(CHAVE_FAVORITOS, favoritos);
}

function criarCard(exercicio) {
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

  const detalhes = document.createElement("details");
  const resumo = document.createElement("summary");
  resumo.textContent = "Como executar";
  const execucao = document.createElement("p");
  execucao.textContent = exercicio.execucao || "Sem instruções. Pergunte ao personal.";
  detalhes.appendChild(resumo);
  detalhes.appendChild(execucao);

  const botao = document.createElement("button");
  botao.type = "button";
  if (favoritos.indexOf(exercicio.id) !== -1) {
    botao.textContent = "Favoritado";
  } else {
    botao.textContent = "Favoritar";
  }
  botao.addEventListener("click", function () {
    alternarFavorito(exercicio.id);
    desenharExercicios();
  });

  card.appendChild(imagem);
  card.appendChild(titulo);
  card.appendChild(grupo);
  card.appendChild(descricao);
  card.appendChild(detalhes);
  card.appendChild(botao);
  return card;
}

function desenharExercicios() {
  const lista = document.getElementById("lista-exercicios");
  lista.textContent = "";

  const todos = catalogo.concat(novos);
  for (let i = 0; i < todos.length; i++) {
    lista.appendChild(criarCard(todos[i]));
  }
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

if (document.getElementById("lista-exercicios")) {
  desenharExercicios();
}

const formulario = document.getElementById("form-exercicio");
if (formulario) {
  formulario.addEventListener("submit", adicionarExercicio);
}
