// Ficha do dia (index)
const treino = [
  { series: 4, reps: 10, carga: 60 },
  { series: 4, reps: 8, carga: 40 },
  { series: 3, reps: 12, carga: 35 },
  { series: 4, reps: 12, carga: 120 }
];

// Funções que calculam (não mexem na página e não alteram o array recebido)
// Volume = séries x repetições x carga. multiplicador tem valor padrão 1
function calcularVolume(exercicio, multiplicador = 1) {
  return exercicio.series * exercicio.reps * exercicio.carga * multiplicador;
}

// Classifica o volume em três faixas e devolve o nome da classe CSS
function classificarVolume(volume) {
  if (volume >= 4000) {
    return "pesado";
  }
  if (volume >= 2000) {
    return "medio";
  }
  return "leve";
}

// Função que mexe na página: usa map, reduce e filter sobre a ficha
function mostrarFicha() {
  const total = document.getElementById("volume-total");
  const resumo = document.getElementById("resumo-ficha");
  if (!total) {
    return;
  }

  const celulas = document.getElementsByClassName("volume");
  const volumes = treino.map(function (exercicio) {
    return calcularVolume(exercicio);
  });
  const soma = volumes.reduce(function (acc, volume) {
    return acc + volume;
  }, 0);
  const pesados = treino.filter(function (exercicio) {
    return classificarVolume(calcularVolume(exercicio)) === "pesado";
  });

  for (let i = 0; i < volumes.length; i++) {
    celulas[i].textContent = volumes[i] + " kg";
    celulas[i].classList.add("faixa-" + classificarVolume(volumes[i]));
  }

  total.textContent = soma + " kg";
  resumo.textContent = pesados.length + " exercício(s) em faixa pesada.";
}

mostrarFicha();

// Gráfico de volume no Canvas 2D (barras). Desenho estático: limpa e desenha uma vez
function desenharGrafico() {
  const canvas = document.getElementById("grafico-volume");
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const nomes = ["Agachamento", "Supino", "Remada", "Leg press"];
  const margem = 40;
  const espaco = (canvas.width - margem) / treino.length;

  // Maior volume da ficha define a altura de 100% das barras
  let maior = 0;
  for (let i = 0; i < treino.length; i++) {
    const volume = treino[i].series * treino[i].reps * treino[i].carga;
    if (volume > maior) {
      maior = volume;
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "14px Arial";

  for (let i = 0; i < treino.length; i++) {
    const volume = treino[i].series * treino[i].reps * treino[i].carga;
    const altura = (volume / maior) * (canvas.height - 60);
    const x = margem / 2 + i * espaco + espaco * 0.2;
    const y = canvas.height - 30 - altura;

    ctx.fillStyle = "#b83a12";
    ctx.fillRect(x, y, espaco * 0.6, altura);
    ctx.fillStyle = "#222";
    ctx.fillText(nomes[i], x, canvas.height - 10);
  }
}

desenharGrafico();

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
  "Pernas": "assets/images/icone-pernas.svg",
  "Peito": "assets/images/icone-peito.svg",
  "Costas": "assets/images/icone-costas.svg",
  "Ombros": "assets/images/icone-ombros.svg",
  "Braços": "assets/images/icone-bracos.svg"
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
  imagem.src = icones[exercicio.grupo] || "assets/images/icone-geral.svg";
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
  // Nome acessível único: o leitor de tela diz qual exercício é, não só "Favoritar"
  botaoFavorito.setAttribute("aria-label", botaoFavorito.textContent + " " + exercicio.nome);

  // Detalhes: o Bootstrap abre o modal sozinho por causa dos data-bs-*
  const botaoDetalhes = document.createElement("button");
  botaoDetalhes.type = "button";
  botaoDetalhes.className = "botao-detalhes";
  botaoDetalhes.textContent = "Detalhes";
  botaoDetalhes.setAttribute("aria-label", "Detalhes de " + exercicio.nome);
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
      const nome = buscarExercicio(botao.dataset.id).nome;
      if (ehFavorito(botao.dataset.id)) {
        botao.textContent = "Favoritado";
      } else {
        botao.textContent = "Favoritar";
      }
      botao.setAttribute("aria-label", botao.textContent + " " + nome);
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

// Menu hambúrguer: abre e fecha o menu no celular e atualiza aria-expanded
const botaoMenu = document.querySelector(".menu-toggle");

if (botaoMenu) {
  botaoMenu.addEventListener("click", function () {
    const menu = document.getElementById("menu-principal");
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
}
