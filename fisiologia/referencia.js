"use strict"

const referencia = {
    retornarIndicadorEcoluna(inputTarget) {
        const colunas = ["Stock no Início do Período", "Soma das Entradas", "Soma das Saídas", "Stock Teórico Fim do Período", "Total dos Pedidos", "Inventário do Stock", "Diferença", "Quantidade a Requisitar", "Quantidade Pedida", "Qtd Autorizada pelo Responsável Clínico"];
        const indicadorOutput = document.querySelector(".reference-row__output--indicador");
        const colunaOutput = document.querySelector(".reference-row__output--coluna");

        const inputTargetAndSiblings = inputTarget.parentElement.children;

        let inputTargetIndex = 0;
        for (let i = 0; i < inputTargetAndSiblings.length; i++) {
            if(inputTargetAndSiblings[i] === inputTarget) {
                inputTargetIndex = i - 2;
            }
        }

        let indicador = inputTargetAndSiblings[1].value;
        let coluna = colunas[inputTargetIndex];
   
        indicadorOutput.value = indicador;
        colunaOutput.value = coluna;

    },

    retornarVazio() {
        const outputs = document.querySelectorAll(".reference-row__output");
        for (const o of outputs) o.value = "";
    }
}

function events() {
    const inputsCelulares = document.querySelectorAll(".ficha__linha-de-inputs input");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {;
            !inputCelular.matches("[readonly]") && referencia.retornarIndicadorEcoluna(inputCelular);
        });
    });

    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}

window.onload = events;

/*"use strict";
let celulas, outputRow, outputCol;
function inicializacao() {
    celulas = document.querySelectorAll("div.body div.row input[type=number]"),
    outputRow = document.querySelector("span.output-row"),
    outputCol = document.querySelector("span.output-col")
}
const referencia = {
    retornarLinha(e) {
        let t = e.parentElement
          , o = t.querySelectorAll("input");
        outputRow.textContent = "Linha: " + o[1].value
    },
    retornarColuna(e) {
        let t = e.parentElement, o = t.querySelectorAll("input"), r;
        for (let n = 0; n < o.length; n++)
            n >= 2 && e === o[n] && (r = n);
        outputCol.textContent = "Coluna: " + ["Stock no In\xedcio do Per\xedodo", "Soma das Entradas", "Soma das Sa\xeddas", "SF", "Total dos Pedidos", "Invent\xe1rio do Stock", "Diferen\xe7a", "Quantidade a Requisitar", "Quantidade Pedida", "Qtd Autorizada pelo Respons\xe1vel Cl\xednico"][r - 2]
    },
    retornarVazio() {
        outputRow.textContent = "",
        outputCol.textContent = ""
    }
};
function escutadores() {
    celulas.forEach(e=>{
        e.addEventListener("focus", ()=>{
            if (e.hasAttribute("readonly"))
                return referencia.retornarVazio(),
                !1;
            referencia.retornarLinha(e),
            referencia.retornarColuna(e)
        }
        )
    }
    )
}

/*
window.addEventListener("load", ()=>{
    inicializacao(),
    escutadores()
}
),
window.addEventListener("click", e=>{
    e.target.hasAttribute("min") || referencia.retornarVazio()
}
),
window.addEventListener("scroll", ()=>{
    let e = document.querySelector("main > div.container")
      , t = e.getBoundingClientRect().bottom
      , o = document.querySelector("div.reference-container");
    try {
        t < 0 ? o.classList.add("hidden") : o.classList.remove("hidden")
    } catch (r) {
        console.log("")
    }
}
);*/
