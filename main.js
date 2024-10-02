const inputNome = document.querySelector('#input-Nome');
const inputHorario = document.querySelector('#input-horario');
const inputServicos = document.querySelector('#input-servicos');
const inputManutencao = document.querySelector('#input-manutencao');
const form = document.querySelector('#form');
const tbody = document.querySelector('#t-body');

// Função para formatar a data no padrão brasileiro
function formatarDataBrasileira(data) {
    const partesData = data.split('-');
    return `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
}

// Função para salvar os dados no LocalStorage
function salvarDados() {
    const dados = {
        nome: inputNome.value,
        horario: inputHorario.value,
        servicos: inputServicos.value,
        manutencao: inputManutencao.value
    };

    let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
    listaDados.push(dados);
    localStorage.setItem('dadosForm', JSON.stringify(listaDados));
}

// Função para carregar os dados do LocalStorage
function carregarDados() {
    const listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
    listaDados.forEach((dados) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${dados.nome}</td>
            <td>${dados.horario}</td>
            <td>${dados.servicos}</td>
            <td>${formatarDataBrasileira(dados.manutencao)}</td>
            <td><button class="btn btn-danger" onclick="deletar(this)">EXCLUIR</button></td>
        `;
        tbody.appendChild(newRow);
    });
}

// Função para excluir um item e atualizar o LocalStorage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deletar(element) {
    const row = element.parentNode.parentNode;
    const nome = row.children[0].innerText;  // Pegando o nome da linha excluída

    // Remover a linha da tabela
    row.remove();

    // Atualizar o LocalStorage removendo o item com o mesmo nome
    let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
    listaDados = listaDados.filter((dados) => dados.nome !== nome);
    localStorage.setItem('dadosForm', JSON.stringify(listaDados));
}

// Evento de submissão do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${inputNome.value}</td>
        <td>${inputHorario.value}</td>
        <td>${inputServicos.value}</td>
        <td>${formatarDataBrasileira(inputManutencao.value)}</td>
        <td><button class="btn btn-danger" onclick="deletar(this)">EXCLUIR</button></td>
    `;

    tbody.appendChild(newRow);
    salvarDados();

    // Limpa os campos do formulário
    inputNome.value = '';
    inputHorario.value = '';
    inputServicos.value = '';
    inputManutencao.value = '';
});

// Carregar os dados ao carregar a página
window.onload = carregarDados;
