function executarSistema() {

    //dados de entrada
    const nome = document.getElementById("inputNome").value;
    const idade = parseInt(document.getElementById("inputIdade").value);
    const valor = parseFloat(document.getElementById("inputValor").value);
    const cupom = document.getElementById("inputCupom").value === "true";

    //dados de saida
    const msg = document.getElementById("mensagem-autorizacao");
    const lista = document.getElementById("lista-estoque");
    const relatorio = document.getElementById("relatorio-final");

    //validação para campos de vazios
    if (!nome || isNaN(idade) || isNaN(valor)) {
        alert("Por favor, preencha todos os campos!");
        return;

    }

    //regra de negocio
    if (idade >= 16 && idade <=110) {
        msg.innerText = `Venda autorizada: ${nome}`;
        msg.style.color = "#00ff88";

        //desconto
        let valorfinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

        //estoque
        let estoque = ["Placa de video", "processdor", "Memoria RAM"];
        lista.innerHTML = ""; //limpar a lista anterior

        // forEach: Percorre um array e qaplica uma ação pra cada elemento
        estoque.forEach(item => {
            let li = document.createElement("li");
            li.innerText =`Item ${item} reservado`;
            lista.appendChild(li);// usado para adicionar um novo elemento ou texto
        })
        
        relatorio.style.display = "block";
        relatorio.innerHTML = `
        <strong> RESUMO DO PEDIDO <\strong><br>
        Cliente: ${nome} <br>
        Total Original: R$ ${valor.toFixed(2)} <br>
        <strong> Total com Desconto: R$ ${valorfinal.toFixed(2)} <\strong>
        `;
    }else if (idade >110){
        msg.innerText = 'Venda bloqueada! Isso realmente é a idade de alguém??';
        msg.style.color = "#ff4444";
        relatorio.style.display = "none";
        lista.innerHTML = "";
    } else{
        msg.innerText = 'Venda bloqueada: Menor de 16 anos.';
        msg.style.color = "#ff4444";
        relatorio.style.display = "none";
        lista.innerHTML = "";
    }

}