function retornarVazio() {
    outputRow.textContent = "";
    outputCol.textContent = "";
}


let celulas, outputRow, outputCol;
window.addEventListener("load", () => {
    celulas = document.querySelectorAll("div.body div.row input[type=number]");
    outputRow = document.querySelector("span.output-row");
    outputCol = document.querySelector("span.output-col");

    celulas.forEach(cel => {
        cel.addEventListener("focus", () => {
            const parent = cel.parentElement;
            const parentChildren = parent.querySelectorAll("input");
            

            if(cel.hasAttribute("readonly")) {
                retornarVazio();
                return false;
            }
            outputRow.textContent = "Linha: " + parentChildren[1].value;

            /* COluna */

            const colunas = ["Stock no Início do Período", "Soma das Entradas", "Soma das Saídas", "SF", "Total dos Pedidos", "Inventário do Stock", "Dif", "Qtd a Requisitar", "Quantidade Pedida", "Qtd Autorizada pelo Responsável Clínico"];

            let colIndex;
            for (let i = 0; i < parentChildren.length; i++) { 
                
                if(i >= 2 && cel === parentChildren[i]) {
                    colIndex = i;
                }
            }

            outputCol.textContent = "Coluna: " + colunas[colIndex - 2] ; 
        })
    });
});


window.addEventListener("click", (event) => {
    if(!event.target.hasAttribute("min")) {
        retornarVazio();
    }
});


window.addEventListener("scroll", () => {
    const container = document.querySelector("main > div.container");
    let containerPosition = container.getBoundingClientRect().bottom;
    const referenceContainer = document.querySelector("div.reference-container");

    if(containerPosition < 0) {
        referenceContainer.classList.add("hidden");
    } else {
        referenceContainer.classList.remove("hidden");
    }

})