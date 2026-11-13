# Resposta ao prompt reforçado

**Prompt:** `Crie um cronômetro de descanso em HTML, CSS e JavaScript puro (sem React), com botões Iniciar, Pausar e Zerar usando <button>, acessível por teclado (Tab + Enter/Espaço), com aria-live anunciando o tempo, usando textContent, para encaixar num projeto que já usa Bootstrap 5 via CDN.`

Resposta recebida (copiada sem alterações):

---

Aqui está o cronômetro completo em um único bloco, pronto para colar no seu projeto com Bootstrap 5. Não executei nem testei o código, porque o pedido era só em texto.

```html
<section class="card shadow-sm mx-auto" style="max-width: 24rem;" aria-labelledby="cron-titulo">
  <div class="card-body text-center">
    <h2 id="cron-titulo" class="h5 card-title">Cronômetro de descanso</h2>

    <!-- Display visual: escondido dos leitores de tela para não anunciar a cada segundo -->
    <p id="cron-display" class="display-3 font-monospace my-3" aria-hidden="true">00:00</p>

    <!-- Região viva: anuncia só em eventos e a cada 15 s, evitando ruído -->
    <p id="cron-status" class="visually-hidden" role="status" aria-live="polite" aria-atomic="true"></p>

    <div class="d-flex justify-content-center gap-2" role="group" aria-label="Controles do cronômetro">
      <button type="button" id="btn-iniciar" class="btn btn-success">Iniciar</button>
      <button type="button" id="btn-pausar" class="btn btn-warning" disabled>Pausar</button>
      <button type="button" id="btn-zerar" class="btn btn-outline-secondary" disabled>Zerar</button>
    </div>
  </div>
</section>

<script>
(function () {
  const display = document.getElementById('cron-display');
  const status  = document.getElementById('cron-status');
  const btnIniciar = document.getElementById('btn-iniciar');
  const btnPausar  = document.getElementById('btn-pausar');
  const btnZerar   = document.getElementById('btn-zerar');

  let acumulado = 0;      // ms acumulados antes da última retomada
  let inicio = 0;         // timestamp da última retomada
  let intervalo = null;

  const total = () => acumulado + (intervalo ? Date.now() - inicio : 0);

  function formatar(ms) {
    const s = Math.floor(ms / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return mm + ':' + ss;
  }

  function falado(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return (m ? m + (m === 1 ? ' minuto e ' : ' minutos e ') : '') +
           r + (r === 1 ? ' segundo' : ' segundos');
  }

  function atualizar() {
    const ms = total();
    display.textContent = formatar(ms);
    const s = Math.floor(ms / 1000);
    if (s > 0 && s % 15 === 0 && ms % 1000 < 300) {
      status.textContent = falado(ms);
    }
  }

  function iniciar() {
    if (intervalo) return;
    inicio = Date.now();
    intervalo = setInterval(atualizar, 200);
    btnIniciar.disabled = true;
    btnPausar.disabled = false;
    btnZerar.disabled = false;
    status.textContent = 'Cronômetro iniciado';
    btnPausar.focus();
  }

  function pausar() {
    if (!intervalo) return;
    acumulado = total();
    clearInterval(intervalo);
    intervalo = null;
    display.textContent = formatar(acumulado);
    btnIniciar.disabled = false;
    btnIniciar.textContent = 'Continuar';
    btnPausar.disabled = true;
    status.textContent = 'Pausado em ' + falado(acumulado);
    btnIniciar.focus();
  }

  function zerar() {
    clearInterval(intervalo);
    intervalo = null;
    acumulado = 0;
    display.textContent = '00:00';
    btnIniciar.disabled = false;
    btnIniciar.textContent = 'Iniciar';
    btnPausar.disabled = true;
    btnZerar.disabled = true;
    status.textContent = 'Cronômetro zerado';
    btnIniciar.focus();
  }

  btnIniciar.addEventListener('click', iniciar);
  btnPausar.addEventListener('click', pausar);
  btnZerar.addEventListener('click', zerar);
})();
</script>
```

Decisões principais:

- **Teclado:** são `<button type="button">` nativos, então Tab move o foco e Enter ou Espaço ativam, sem precisar de `keydown`. O foco passa para o botão que fica ativo depois de cada ação, para não se perder num botão desabilitado.
- **`aria-live`:** o relógio visual tem `aria-hidden="true"`, e um `<p role="status" aria-live="polite">` anuncia o tempo por extenso. Se o próprio display fosse a região viva, o leitor de tela falaria a cada segundo. Por isso o anúncio acontece ao iniciar, pausar e zerar, e a cada 15 s durante a contagem. Para mudar a frequência, ajuste `s % 15`.
- **`textContent`:** todas as atualizações usam `textContent`, nunca `innerHTML`.
- **Precisão:** o tempo é calculado com `Date.now()` e não pela contagem de ticks. Assim ele não desvia se a aba ficar em segundo plano e o navegador atrasar o `setInterval`.
- **Bootstrap:** usa só classes utilitárias (`card`, `btn`, `gap-2`, `visually-hidden`, `display-3`). Não precisa do JS do Bootstrap, apenas do CSS. A IIFE evita poluir o escopo global.

Se quiser, adapto para uma contagem regressiva, que é o mais comum em descanso entre séries, por exemplo 60 s com um aviso ao chegar em zero.
