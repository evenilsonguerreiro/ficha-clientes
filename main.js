const inputNome = document.querySelector('#input-Nome');
const inputHorario = document.querySelector('#input-horario');
const inputServicos = document.querySelector('#input-servicos');
const inputManutencao = document.querySelector('#input-manutencao');
const inputDia = document.querySelector('#input-dia');
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
        manutencao: inputManutencao.value,
        dia: inputDia.value
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
            <td class="data">${formatarDataBrasileira(dados.manutencao)}</td>
             <td>${dados.dia}</td>
            <td><button class="btn btn-danger" onclick="deletar(this, '${dados.nome}', '${dados.horario}')">EXCLUIR</button></td>
        `;
        tbody.appendChild(newRow);
    });
}


// Função para excluir um item da tabela e do LocalStorage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deletar(element, nome, horario) {
    // Remove a linha da tabela
    const row = element.parentNode.parentNode;
    row.remove();

    // Atualiza o LocalStorage removendo o item correspondente
    let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
    listaDados = listaDados.filter((dados) => !(dados.nome === nome && dados.horario === horario));
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
         <td>${inputDia.value}</td>
        <td><button class="btn btn-danger" onclick="deletar(this, '${inputNome.value}', '${inputHorario.value}')">EXCLUIR</button></td>
    `;

    tbody.appendChild(newRow);
    salvarDados();

    // Limpa os campos do formulário
    inputNome.value = '';
    inputHorario.value = '';
    inputServicos.value = '';
    inputManutencao.value = '';
    inputDia.value = '';
});

const anoAtual = new Date().getFullYear();
document.getElementById('ano-atual').textContent = anoAtual;

// Carregar os dados do LocalStorage ao carregar a página
window.onload = carregarDados;
