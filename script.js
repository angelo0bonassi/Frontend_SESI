function executarSistema() {
    // tratamento de erros para o sistema nao parar de funcionar

    try {
        //dados
        const inputNome = document.getElementById("inputNome");
        const inputIdade = (document.getElementById("inputIdade"));
        const inputValor = (document.getElementById("inputValor"));
        const inputCupom = document.getElementById("inputCupom");

        // Dados de saída
        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById("btnfinalizar")

        btn.disable = true;
        btn.innerText = "Processando..."

            //remove os espaçoes em branco
        const nome = inputNome.value.trim();
        const idade = parseInt.inputIdade.value;
        const valor = parseFloat.inputValor.value;
        const cupom = inputCupom.value === "true";
        

        // Validação para campos vazios
        if (!nome || isNaN(idade) || isNaN(valor)) {
           msg.innerText="Preencha todos os campos corretamente";
           msg.style.color = "#ff4444"
            return;
        }

        // Regra de negócio
        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = " ";

            // Desconto
            let valorFinal = valor > 500 || cupom ? valor * 0.85 : valor;

            // Estoque
            let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = ""; // Limpa a lista anterior

            // forEach: Percorre um array e aplica uma ação para cada elemento
            estoque.forEach((item) => {
                let li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li); // usado para adicionar um novo elemento ou texto
            });

            // Relatório
            relatorio.style.display = "block";
            relatorio.innerHTML = `
                <strong> RESUMO DO PEDIDO <\strong><br>
                Cliente: ${nome} <br>
                Total Original: R$ ${valor.toFixed(2)} <br>
                <strong> Total com Desconto: R$ ${valorFinal.toFixed(
                2
            )} <\strong>
            `;
        } else {
            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = "";
        }
    } catch (error) { }
}

function mostrarHist() {
    window.sessionStorage
}