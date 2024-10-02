const inputNome = document.querySelector('#input-Nome');
const inputHorario = document.querySelector('#input-horario');
const inputServicos = document.querySelector('#input-servicos');
const inputManutencao = document.querySelector('#input-manutencao');
const form = document.querySelector('#form');
const tbody = document.querySelector('#t-body');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${inputNome.value}</td>
    <td>${inputHorario.value}</td>
    <td>${inputServicos.value}</td>
    <td>${inputManutencao.value}</td>
    <td><button class="btn btn-danger" onclick="deletar(this)">EXCLUIR</button></td>
  `;

  tbody.appendChild(newRow);

  // Limpa os campos do formulário
  inputNome.value = '';
  inputHorario.value = '';
  inputServicos.value = '';
  inputManutencao.value = '';
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deletar(element) {
  const row = element.parentNode.parentNode;
  row.remove();
}
