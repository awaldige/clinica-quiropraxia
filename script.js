
/* =========================================================
   AW TECHNOLOGY - CLÍNICA DE QUIROPRAXIA
   JavaScript demonstrativo
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. MENU MOBILE
     ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNavigation = document.getElementById("mainNavigation");

  function abrirMenu() {
    if (!menuToggle || !mainNavigation) return;

    mainNavigation.classList.add("is-open");
    menuToggle.classList.add("is-active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu de navegação");
  }

  function fecharMenu() {
    if (!menuToggle || !mainNavigation) return;

    mainNavigation.classList.remove("is-open");
    menuToggle.classList.remove("is-active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
  }

  if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", () => {

      const menuAberto =
        mainNavigation.classList.contains("is-open");

      if (menuAberto) {
        fecharMenu();
      } else {
        abrirMenu();
      }

    });

    // Fecha o menu ao clicar em um link de navegação.
    mainNavigation.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        fecharMenu();
      });

    });

    // Fecha o menu ao clicar fora dele.
    document.addEventListener("click", event => {

      const menuAberto =
        mainNavigation.classList.contains("is-open");

      if (
        menuAberto &&
        !mainNavigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        fecharMenu();
      }

    });

  }


  /* =======================================================
     2. MODAL DE AGENDAMENTO DEMONSTRATIVO
     ======================================================= */

  const modal = document.getElementById("agendaModal");
  const fecharAgenda = document.getElementById("fecharAgenda");

  const formAgenda = document.getElementById("formAgenda");
  const confirmacao = document.getElementById("confirmacao");

  const campoData = document.getElementById("data");
  const campoHora = document.getElementById("hora");

  const botoesAbrirModal = document.querySelectorAll(
    ".btn-online, [data-open-agenda]"
  );

  let elementoAnterior = null;

  function limparFormulario() {

    if (formAgenda) {
      formAgenda.reset();
    }

    if (confirmacao) {
      confirmacao.textContent = "";
      confirmacao.hidden = true;
    }

    if (campoData) {
      campoData.setCustomValidity("");
    }

  }

  function abrirModal(botaoOrigem) {

    if (!modal) return;

    elementoAnterior = botaoOrigem || document.activeElement;

    limparFormulario();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    // Impede a rolagem do conteúdo de fundo.
    if (fecharAgenda) {
      fecharAgenda.focus();
    } else {
      modal.focus();
    }

  }

  function fecharModal() {

    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    limparFormulario();

    // Retorna o foco ao elemento que abriu a janela.
    if (
      elementoAnterior &&
      typeof elementoAnterior.focus === "function" &&
      elementoAnterior.isConnected
    ) {
      elementoAnterior.focus();
    }

    elementoAnterior = null;

  }

  // Configura os botões de abertura.
  botoesAbrirModal.forEach(botao => {

    botao.addEventListener("click", () => {

      fecharMenu();

      abrirModal(botao);

    });

  });

  // Botão de fechar.
  if (fecharAgenda) {

    fecharAgenda.addEventListener("click", fecharModal);

  }

  // Fecha ao clicar na área escura externa.
  if (modal) {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        fecharModal();
      }

    });

  }


  /* =======================================================
     3. FECHAMENTO COM TECLA ESC
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      if (
        modal &&
        modal.classList.contains("is-open")
      ) {
        fecharModal();
        return;
      }

      if (
        mainNavigation &&
        mainNavigation.classList.contains("is-open")
      ) {
        fecharMenu();
        menuToggle.focus();
      }

    }

  });


  /* =======================================================
     4. DATA MÍNIMA DO FORMULÁRIO
     ======================================================= */

  function obterDataLocal() {

    const agora = new Date();

    const ano = agora.getFullYear();

    const mes = String(
      agora.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
      agora.getDate()
    ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

  }

  if (campoData) {

    campoData.min = obterDataLocal();

  }


  /* =======================================================
     5. SIMULAÇÃO DO FORMULÁRIO
     ======================================================= */

  if (formAgenda) {

    formAgenda.addEventListener("submit", event => {

      event.preventDefault();

      if (!campoData || !campoHora || !confirmacao) {
        return;
      }

      const dataSelecionada = campoData.value;
      const horaSelecionada = campoHora.value;

      // Verifica se os campos foram preenchidos.
      if (!dataSelecionada || !horaSelecionada) {

        formAgenda.reportValidity();
        return;

      }

      // Impede a seleção de datas anteriores ao dia atual.
      if (dataSelecionada < obterDataLocal()) {

        campoData.setCustomValidity(
          "Selecione a data de hoje ou uma data futura."
        );

        campoData.reportValidity();

        campoData.setCustomValidity("");

        return;

      }

      // Formata a data para apresentação.
      const partesData = dataSelecionada.split("-");

      const dataFormatada =
        `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

      // Nenhum dado é enviado ou armazenado.
      confirmacao.textContent =
        `Demonstração concluída! Data ilustrativa: ${dataFormatada}, às ${horaSelecionada}. Nenhum agendamento foi realizado e nenhum dado foi enviado ou armazenado.`;

      confirmacao.hidden = false;

    });

  }

});
