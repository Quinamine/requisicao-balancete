

window.addEventListener("load", () => {
    const celulas = document.querySelectorAll("div.body div.row input[type=number]");

    celulas.forEach(cel => {
        cel.addEventListener("focus", () => {
            const parent = cel.parentElement;
            const parentChildren = parent.querySelectorAll("input");
            const outputRow = document.querySelector("span.output-row");
            const outputCol = document.querySelector("span.output-col");

            if(cel.hasAttribute("readonly")) {
                outputRow.textContent = "";
                outputCol.textContent = "";
                return false;
            }
            outputRow.textContent = "Linha: " + parentChildren[1].value;

            /* COluna */

            const colunas = ["Stock no Início do Período", "Soma das Entradas", "Soma das Saídas", "SF", "Total dos Pedidos", "Inventário", "Dif", "Qtd a Requisitar", "Quantidade Pedida", "Qtd Autorizada pelo Responsável Clínico"];

            let colIndex;
            for (let i = 0; i < parentChildren.length; i++) { 
                
                if(i >= 2 && cel === parentChildren[i]) {
                    colIndex = i;
                }
            }

            outputCol.textContent = "Coluna: " + colunas[colIndex - 2] ; 

            

        })
    })
})