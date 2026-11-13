# Resposta ao prompt vago

**Prompt:** `faz um cronômetro em javascript`

Resposta recebida (copiada sem alterações):

---

Aqui está um cronômetro simples em um único arquivo HTML. Salve como `cronometro.html` e abra no navegador:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Cronômetro</title>
  <style>
    body { font-family: sans-serif; text-align: center; margin-top: 80px; }
    #display { font-size: 64px; font-variant-numeric: tabular-nums; }
    button { font-size: 18px; padding: 8px 20px; margin: 6px; }
  </style>
</head>
<body>
  <div id="display">00:00:00.000</div>
  <button id="iniciar">Iniciar</button>
  <button id="pausar">Pausar</button>
  <button id="zerar">Zerar</button>

  <script>
    let inicio = 0;        // momento em que começou a contar
    let acumulado = 0;     // tempo já contado antes de pausar
    let timer = null;

    const display = document.getElementById('display');

    function formatar(ms) {
      const h = Math.floor(ms / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      const milis = ms % 1000;
      const p = (n, t = 2) => String(n).padStart(t, '0');
      return `${p(h)}:${p(m)}:${p(s)}.${p(milis, 3)}`;
    }

    function atualizar() {
      display.textContent = formatar(acumulado + Date.now() - inicio);
    }

    document.getElementById('iniciar').onclick = () => {
      if (timer) return;               // já está rodando
      inicio = Date.now();
      timer = setInterval(atualizar, 10);
    };

    document.getElementById('pausar').onclick = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
      acumulado += Date.now() - inicio;
    };

    document.getElementById('zerar').onclick = () => {
      clearInterval(timer);
      timer = null;
      acumulado = 0;
      display.textContent = formatar(0);
    };
  </script>
</body>
</html>
```

Como funciona:
- **Iniciar** guarda o horário atual com `Date.now()` e atualiza a tela a cada 10 ms.
- **Pausar** soma o tempo decorrido em `acumulado` e para o intervalo.
- **Zerar** para tudo e volta o display para `00:00:00.000`.
- O tempo é calculado pela diferença de `Date.now()`, e não contando ticks do `setInterval`. Assim ele não perde precisão, mesmo que o navegador atrase algum tick.

Se quiser, posso adicionar voltas (lap), atalhos de teclado ou uma versão em Node.js para o terminal.
