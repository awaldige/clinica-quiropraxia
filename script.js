// --- MODAL DE AGENDAMENTO ---
const btnOnline = document.querySelectorAll('.btn-online');
const modal = document.getElementById('agendaModal');
const fechar = document.getElementById('fecharAgenda');

btnOnline.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
  });
});

fechar.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// --- CONFIRMAÇÃO DO FORMULÁRIO ---
const formAgenda = document.getElementById('formAgenda');
const confirmacao = document.getElementById('confirmacao');

formAgenda.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  confirmacao.innerHTML = `<p>Obrigado, <strong>${nome}</strong>! Sua consulta foi agendada com sucesso.</p>`;
  confirmacao.style.display = 'block';
  formAgenda.reset();
  setTimeout(() => { 
    modal.style.display = 'none'; 
    confirmacao.innerHTML = ''; 
    confirmacao.style.display = 'none';
  }, 4000);
});

// --- EFEITO HOVER NOS CARDS DE TRATAMENTO ---
const cards = document.querySelectorAll('.card-tratamento');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const titulo = card.querySelector('h3');
    const desc = card.querySelector('p');
    if(titulo) titulo.style.transform = 'translateY(-10px)';
    if(desc) desc.style.transform = 'translateY(-10px)';
  });
  card.addEventListener('mouseleave', () => {
    const titulo = card.querySelector('h3');
    const desc = card.querySelector('p');
    if(titulo) titulo.style.transform = 'translateY(0)';
    if(desc) desc.style.transform = 'translateY(0)';
  });
});
