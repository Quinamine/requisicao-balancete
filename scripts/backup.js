"use strict";

const backup = {
    mainData() {
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

    aditionalData() {
        for (let i = 0; i < aditionalData.length; i++) {
            aditionalData[i].addEventListener("input", () => {
                localStorage.setItem(`rb-${aditionalData[i].id}`,`${aditionalData[i].value}`);
            }); 
            aditionalData[i].value = localStorage.getItem(`rb-${aditionalData[i].id}`);
        }
    },

    destaqueDeAutoCels() {
        readonlyCelsDarker.addEventListener("change", ()=>{
            readonlyCelsDarker.checked ? localStorage.setItem("rb-destaque", "on") : localStorage.removeItem("rb-destaque")
        }
        ),
        localStorage.getItem("rb-destaque") && (readonlyCelsDarker.setAttribute("checked", ""),
        menu.destacarFundoDeTotais());
    },

    tipoOuCorDaReq(tiposOuCores, localStorageKey) {
        for (let i = 0; i < tiposOuCores.length; i++) {
            // Resetar todos inputs checkbox do container 'col-tipo-de-requisicao'
            tiposOuCores.forEach(tipoOuCor => {
                tipoOuCor.addEventListener("change", () => {
                    localStorage.removeItem(localStorageKey);

                    // Salvar o check do input activado
                    localStorage.setItem(localStorageKey, `${tipoOuCor.id}`);
                });

                // Retornar o tipo activado
                if(localStorage.getItem(localStorageKey) == tipoOuCor.id) {
                    tiposOuCores[i].removeAttribute("checked");
                    tipoOuCor.setAttribute("checked", "");
                    // Aplicar fundo se for tipo Original, Duplicado ou Triplicado
                    balancete.mudarCorDeFundoDaPagina(tipoOuCor.id);
                }
            });
        }         
    }
}

let mainCels, aditionalData, tiposDeRequisicao, coresDeFundoDaRequisicao;
window.addEventListener("load", () => {

    // INICIALIZAÏÇÃO DE VARIÁVEIS
    mainCels = document.querySelectorAll("div.body .row input");
    aditionalData = document.querySelectorAll("div.container > header input[type=text], header input[type=number], footer input");
    tiposDeRequisicao = document.querySelectorAll("div.col-tipo-de-requisicao input[type=checkbox]");
    coresDeFundoDaRequisicao = document.querySelectorAll("div.container aside input[type=checkbox]");

    // INVOCAÇÕES
    // Backup de fármacos da lista padrão
    if(typeof Storage != "undefined") {
        backup.mainData();
        backup.aditionalData();
        backup.destaqueDeAutoCels();

        for(let i = 0; i < tiposDeRequisicao.length; i++) {
            backup.tipoOuCorDaReq(tiposDeRequisicao, "tipo-de-req");
        }
        
        for(let i = 0; i < coresDeFundoDaRequisicao.length; i++) {
            backup.tipoOuCorDaReq(coresDeFundoDaRequisicao, "cor-da-ficha");
        }
    }
    
});