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
