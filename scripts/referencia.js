"use strict";

let celulas, outputRow, outputCol;
function inicializacao() {
    celulas = document.querySelectorAll("div.body div.row input[type=number]");
    outputRow = document.querySelector("span.output-row");
    outputCol = document.querySelector("span.output-col");
}

const referencia = {
    retornarLinha(celulaFocada) {
        const parent = celulaFocada.parentElement;
        const parentChildren = parent.querySelectorAll("input");

        outputRow.textContent = "Linha: " + parentChildren[1].value;
    },

    retornarColuna(celulaFocada) {
        const parent = celulaFocada.parentElement;
        const parentChildren = parent.querySelectorAll("input");

        const colunas = ["Stock no Início do Período", "Soma das Entradas", "Soma das Saídas", "SF", "Total dos Pedidos", "Inventário do Stock", "Diferença", "Quantidade a Requisitar", "Quantidade Pedida", "Qtd Autorizada pelo Responsável Clínico"];

        let colIndex;
        for (let i = 0; i < parentChildren.length; i++) { 

            if(i >= 2 && celulaFocada === parentChildren[i]) {
                colIndex = i;
            }
        }

        outputCol.textContent = "Coluna: " + colunas[colIndex - 2] ; 
    },

    retornarVazio() {
        outputRow.textContent = "";
        outputCol.textContent = "";
    }
}

function escutadores() {
    celulas.forEach(cel => {
        cel.addEventListener("focus", () => {
            if(cel.hasAttribute("readonly")) {
                referencia.retornarVazio();
                return false;
            }
            
            referencia.retornarLinha(cel);
            referencia.retornarColuna(cel);
        });
    });
}

window.addEventListener("load", () => {
    inicializacao();
    escutadores();
    
});


window.addEventListener("click", (event) => {
    if(!event.target.hasAttribute("min")) {
        referencia.retornarVazio();
    }
});


window.addEventListener("scroll", () => {
    const container = document.querySelector("main > div.container");
    let containerPosition = container.getBoundingClientRect().bottom;
    const referenceContainer = document.querySelector("div.reference-container");

    try {
        if(containerPosition < 0) {
            referenceContainer.classList.add("hidden");
        } else {
            referenceContainer.classList.remove("hidden");
        }
    } catch(e) {
        console.log("")
    }
})