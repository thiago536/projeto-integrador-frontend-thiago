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
