"use strict";

const backup = {
    saveMainData() {
        for (let i = 0; i < mainCels.length; i++) {
            if(typeof Storage != "undefined") {
                if(!mainCels[i].matches("[readonly]")){
                    localStorage.setItem(`rb-cel${i}`, `${mainCels[i].value}`);
                    mainCels[i].value = localStorage.getItem(`rb-cel${i}`);
                }
            }
        }
    },

    saveAdicionalData() {
        for (let i = 0; i < aditionalData.length; i++) {
            if(typeof Storage != "undefined") {
                localStorage.setItem(`rb-${aditionalData[i].id}`, `${aditionalData[i].value}`);
                aditionalData[i].value = localStorage.getItem(`rb-${aditionalData[i].id}`);
            }
        }
    }
}


let mainCels, aditionalData;
window.addEventListener("load", () => {

    // INICIALIZAÏÇÃO DE VARIÁVEIS
    mainCels = document.querySelectorAll("div.body .row input");
    aditionalData = document.querySelectorAll("div.container input[type=text], input[type=date], input#numero-de-requisicao");

    // INVOCAÇÕES
    mainCels.forEach( mc => {
        mc.addEventListener("input", () => {
            backup.saveMainData()
        });
    });

    aditionalData.forEach( ad => {
        ad.addEventListener("input", () => {
            backup.saveAdicionalData();
        });
    });

    // INVOCAÇÕES NO LOAD DO WINDOWS
    backup.saveMainData();
    backup.saveAdicionalData();

});