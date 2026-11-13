/*
  ===== Mini-analisador do treino (Aula 09 – Lógica de Programação) =====

  Tema: Meu Treino, ficha de academia do dia.

  Entrada: pelo prompt, o volume mínimo (em kg) para um exercício ser
           considerado "Pesado" (entre 100 e 10000). Depois, os tempos de
           descanso entre séries, em segundos, até a pessoa digitar "sair".
  Processamento: calcula o volume de cada exercício (séries x repetições x carga),
                 classifica cada um em Pesado / Moderado / Leve, gera uma dica
                 pelo grupo muscular e resume a ficha (volume total, quantos
                 pesados e qual o exercício de maior volume).
  Saída: frases no console (template literal) e uma tabela (console.table).

  Pseudocódigo:
  1. Pedir o volume mínimo e converter para número
  2. Se for cancelado, vazio, não numérico ou fora da faixa: avisar e parar
  3. Para cada exercício da ficha: calcular o volume
  4.   Se volume >= mínimo: "Pesado"; senão se >= metade do mínimo: "Moderado"; senão "Leve"
  5.   Somar no total, contar os pesados e guardar o de maior volume
  6. Mostrar a tabela e o resumo
  7. Pedir tempos de descanso até "sair" e mostrar a média

  Como rodar: abra a página, aperte F12 e digite analisarTreino() no Console.
*/

// Dados: a ficha do dia (6 exercícios, 5 propriedades cada)
const fichaDoDia = [
  { nome: "Agachamento livre", grupo: "pernas", series: 4, repeticoes: 10, carga: 60 },
  { nome: "Supino reto", grupo: "peito", series: 4, repeticoes: 8, carga: 40 },
  { nome: "Remada curvada", grupo: "costas", series: 3, repeticoes: 12, carga: 35 },
  { nome: "Leg press", grupo: "pernas", series: 4, repeticoes: 12, carga: 120 },
  { nome: "Rosca direta", grupo: "bracos", series: 3, repeticoes: 12, carga: 12 },
  { nome: "Desenvolvimento", grupo: "ombros", series: 3, repeticoes: 10, carga: 20 }
];

const VOLUME_MINIMO_PERMITIDO = 100;
const VOLUME_MAXIMO_PERMITIDO = 10000;

// Pede o volume mínimo e devolve um número válido, ou null se a entrada for inválida
function pedirVolumeMinimo() {
  const entrada = prompt("A partir de quantos kg de volume um exercício é Pesado? (100 a 10000)", "2000");

  // Cancelar devolve null: não dá pra converter, então paramos aqui
  if (entrada === null) {
    console.warn("Análise cancelada.");
    return null;
  }

  // Number("") vira 0, por isso o texto vazio é conferido antes (Erro 2)
  if (entrada.trim() === "") {
    console.warn("Você não digitou nada.");
    return null;
  }

  const volumeMinimo = Number(entrada);

  if (Number.isNaN(volumeMinimo)) {
    console.warn(`"${entrada}" não é um número.`);
    return null;
  }

  if (volumeMinimo < VOLUME_MINIMO_PERMITIDO || volumeMinimo > VOLUME_MAXIMO_PERMITIDO) {
    console.warn(`Use um valor entre ${VOLUME_MINIMO_PERMITIDO} e ${VOLUME_MAXIMO_PERMITIDO}.`);
    return null;
  }

  return volumeMinimo;
}

// Classifica o volume em 3 faixas. A ordem importa: testa a maior primeiro
function classificarVolume(volume, volumeMinimo) {
  if (volume >= volumeMinimo) {
    return "Pesado";
  } else if (volume >= volumeMinimo / 2) {
    return "Moderado";
  } else {
    return "Leve";
  }
}

// Dá uma dica diferente para cada grupo muscular (break em todos os cases: Erro 5)
function dicaDoGrupo(grupo) {
  let dica;

  switch (grupo) {
    case "pernas":
      dica = "Aqueça bem joelhos e quadril antes.";
      break;
    case "peito":
      dica = "Mantenha as escápulas encaixadas no banco.";
      break;
    case "costas":
      dica = "Puxe com as costas, não só com os braços.";
      break;
    case "ombros":
      dica = "Carga moderada: ombro machuca fácil.";
      break;
    case "bracos":
      dica = "Sem balançar o tronco para ajudar.";
      break;
    default:
      dica = "Capriche na execução.";
      break;
  }

  return dica;
}

// Pede os tempos de descanso até a pessoa digitar "sair" e mostra a média
function registrarDescansos() {
  let soma = 0;
  let quantidade = 0;
  let entrada = prompt('Quantos segundos você descansou entre as séries? (ou "sair")');

  while (entrada !== null && entrada.trim().toLowerCase() !== "sair") {
    const segundos = Number(entrada);
    const invalido = entrada.trim() === "" || Number.isNaN(segundos) || segundos <= 0 || segundos > 600;

    if (invalido) {
      console.warn(`"${entrada}" não é um tempo válido (1 a 600 segundos).`);
    } else {
      soma += segundos;
      quantidade++;
    }

    // ATUALIZA a condição do laço: sem esta linha ele nunca acabaria (Erro 4)
    entrada = prompt('Outro descanso em segundos (ou "sair")');
  }

  if (quantidade > 0) {
    const media = soma / quantidade;
    console.log(`Descanso médio: ${media.toFixed(0)} segundos em ${quantidade} registro(s).`);
  } else {
    console.log("Nenhum descanso registrado.");
  }
}

// Função principal: junta tudo
function analisarTreino() {
  const volumeMinimo = pedirVolumeMinimo();

  // Se a entrada foi inválida, nenhuma conta é feita
  if (volumeMinimo === null) {
    return;
  }

  let volumeTotal = 0;      // acumulador
  let totalPesados = 0;     // contador
  let maiorExercicio = null; // máximo
  const relatorio = [];

  // for...of percorre todos os itens sem risco de errar o índice (Erro 3)
  for (const exercicio of fichaDoDia) {
    const volume = exercicio.series * exercicio.repeticoes * exercicio.carga;
    const classe = classificarVolume(volume, volumeMinimo);

    volumeTotal += volume;

    if (classe === "Pesado") {
      totalPesados++;
    }

    if (maiorExercicio === null || volume > maiorExercicio.volume) {
      maiorExercicio = { nome: exercicio.nome, volume: volume };
    }

    relatorio.push({
      exercicio: exercicio.nome,
      volume: volume,
      classe: classe,
      dica: dicaDoGrupo(exercicio.grupo)
    });
  }

  console.table(relatorio);
  console.log(`Volume total do treino: ${volumeTotal} kg`);
  console.log(`Exercícios pesados (volume >= ${volumeMinimo} kg): ${totalPesados} de ${fichaDoDia.length}`);
  console.log(`Maior volume: ${maiorExercicio.nome} (${maiorExercicio.volume} kg)`);

  registrarDescansos();
}

/*
  Teste de mesa do laço principal (for...of), com volume mínimo = 2000:

  Volta | exercício          | volume         | classe   | volumeTotal  | totalPesados | maiorExercicio
  ------|--------------------|----------------|----------|--------------|--------------|------------------------
    1   | Agachamento livre  | 4x10x60 = 2400 | Pesado   | 0 -> 2400    | 0 -> 1       | Agachamento livre (2400)
    2   | Supino reto        | 4x8x40  = 1280 | Moderado | 2400 -> 3680 | 1            | Agachamento livre (2400)
    3   | Remada curvada     | 3x12x35 = 1260 | Moderado | 3680 -> 4940 | 1            | Agachamento livre (2400)

  Conferido no console: as 3 primeiras linhas do console.table mostram
  2400 Pesado, 1280 Moderado e 1260 Moderado. No fim: total 11732 kg,
  2 pesados de 6, maior volume Leg press (5760 kg).
*/

console.log("Mini-analisador pronto. Digite analisarTreino() para começar.");
