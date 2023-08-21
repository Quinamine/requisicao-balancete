"use strict";

const backup = {
    saveMainData() {
        for (let i = 0; i < mainCels.length; i++) {
            // Adicionar a lista padrão dos fármacos ao localStorage caso não esteja adicionada
            if(mainCels[i].type == "text" && !localStorage.getItem(`rb-cel${i}`)){
                localStorage.setItem(`rb-cel${i}`,`${mainCels[i].value}`);
            }

            // Evento input para backup dos valores dos campos no localStorage
            mainCels[i].addEventListener("input", () => {
                localStorage.setItem(`rb-cel${i}`,`${mainCels[i].value}`);
            }); 
            mainCels[i].value = localStorage.getItem(`rb-cel${i}`);
        }
    },

    saveAditionalData() {
        for (let i = 0; i < aditionalData.length; i++) {
            aditionalData[i].addEventListener("input", () => {
                localStorage.setItem(`rb-${aditionalData[i].id}`,`${aditionalData[i].value}`);
            }); 
            aditionalData[i].value = localStorage.getItem(`rb-${aditionalData[i].id}`);
        }
    }
}

let mainCels, aditionalData;
window.addEventListener("load", () => {

    // INICIALIZAÏÇÃO DE VARIÁVEIS
    mainCels = document.querySelectorAll("div.body .row input");
    aditionalData = document.querySelectorAll("div.container header input[type=text], footer input[type=text], input[type=date], input#numero-de-requisicao, input[type=checkbox]");

    // INVOCAÇÕES
    // Backup de fármacos da lista padrão
    if(typeof Storage != "undefined") {
        backup.saveMainData();
        backup.saveAditionalData();
        menu.destacarFundoDeTotais()
    }
    
});