// Dados de entrada
/* document.getElementById("---").value puxa
   dados colocados no site pelo ID do elemento */
const inputNome = document.getElementById("inputNome");
const inputIdade = document.getElementById("inputIdade");
const inputValor = document.getElementById("inputValor");
const inputCupom = document.getElementById("inputCupom");
const modal = document.getElementById("modal");
const btnFechar = document.getElementById("btn-fechar");
const conteudoModal = document.getElementById("conteudo-modal");

// Dados de saída
const msg = document.getElementById("mensagem-autorizacao");
const lista = document.getElementById("lista-estoque");
const relatorio = document.getElementById("relatorio-final");

const btnFinalizar = document.getElementById("btnFinalizar");
const btnHistorico = document.getElementById("btnHistorico");



btnFinalizar.addEventListener('click', executarSistema);



function executarSistema() {

    // Tratamento de erros para o sistema não quebrar vvv
    try {

        btnFinalizar.disable = true;
        btnFinalizar.innerText = "Processando...";

        // trim() remove os espaços em branco
        const nome = inputNome.value.trim();
        const idade = parseInt(inputIdade.value);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";


        // Validação para campos vazios
        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "Preencha todos os campos corretamente!";
            msg.style.color = "#ff4444";

            // Pro botão voltar vvv
            btnFinalizar.disabled = false;
            btnFinalizar.innerText = "Finalizar";
            return;
        }

        // Regra de negócio - caso a venda for autorizada
        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#7aff77";

            // Desconto
            let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

            // Estoque
            let estoque = ["Placa de vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = ""; // Limpa a lista anterior

            // forEach: percorre o array e aplica uma ação pra cada elemento
            estoque.forEach(item => {
                let li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li);  // usado para adicionar novo elemento
            });

            // Relatório
            relatorio.style.display = "block";
            relatorio.innerHTML = `
            <strong> RESUMO DO PEDIDO </strong><br>
            Cliente: ${nome} <br>
            Total Original: R$ ${valor.toFixed(2)} <br>
            <strong> Total com Desconto: R$ ${valorFinal.toFixed(2)} </strong>`;

            btnFinalizar.disabled = false;
            btnFinalizar.innerText = "Processando...";

            // Parte do salvamento - apenas se venda autorizada
            const dadosUsuario = {
                nome: inputNome.value,
                idade: inputIdade.value,
                valor: inputValor.value,
                valorFinal: valorFinal.toFixed(2)
            };

            // Isso pega o histórico salvo / cria uma nova lista caso vazia:
            let historicoVendas = JSON.parse(localStorage.getItem('userInfoLista')) || [];

            // .unshift adiciona itens ao histórico, mais recente 1°
            historicoVendas.unshift(dadosUsuario);

            // Limita a lista para 5
            historicoVendas = historicoVendas.slice(0,5);

            // Salva o objeto acima como uma string:
            localStorage.setItem('userInfoLista', JSON.stringify(historicoVendas));


            // Isso limpa os textos escritos pelo 'cliente':
            inputNome.value = "";
            inputIdade.value = "";
            inputValor.value = "";


        } else {
            msg.innerText = `Venda bloqueada: Menor de 16 anos.`;
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = "";
        }

        btnFinalizar.disabled = false;
        btnFinalizar.innerText = "Finalizar";

    } catch (error) {
        // Caso um erro seja encontrado, isso acontecerá
        console.error("Erro no sistema:", error);
        btnFinalizar.disabled = false;
        btnFinalizar.innerText = "Finalizar";
    }

}


btnHistorico.addEventListener('click', mostrarHistorico);

function mostrarHistorico(){

    const dadosSalvos = localStorage.getItem('userInfoLista');

    conteudoModal.innerHTML = "";

    if(dadosSalvos){
        // Converte para objeto JS novamente
        const venda = JSON.parse(dadosSalvos);

        relatorio.style.display = "block";
        let textoRelatorio = `<strong> HISTÓRICO DE VENDAS </strong><br><br>`

        // Como há uma lista, precisa-se de um laço de repetição para correr por ela
        venda.forEach((venda, index) => {
            textoRelatorio += `
            <strong> ${index + 1}° Venda: </strong><br>
            Cliente: ${venda.nome} <br>
            Idade: ${venda.idade} anos <br>
            Total Final: R$ ${venda.valorFinal} <br>
            ---------------------------------<br>`;
        });

        conteudoModal.innerHTML = textoRelatorio;

    } else {
        msg.innerText = `Nenhum histórico de venda encontrado no navegador!`;
        msg.style.color = "#ff4444";
        relatorio.style.display = "none";
        lista.innerHTML = "";
    }

    modal.showModal();
}

btnFechar.addEventListener('click', () => {
    modal.close();
});