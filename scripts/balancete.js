"use strict";

const balancete = {

    toRadioCheckboxes(checkboxes, checkboxTarget) {
        for (const c of checkboxes) {c.checked = false;}
        checkboxTarget.checked = true;
    },
    
    mudarCorDeFundoDaPagina(bgc) {
        const ficha = document.querySelectorAll("div.container, div.container input");

        for (const f of ficha) {
            f.classList.remove("bgc-fff");
            f.classList.remove("bgc-yellow");
            f.classList.remove("bgc-bluelight");

            f.classList.add(`${bgc}`);
        }
        
    },

    calcularStockTeorico(vetor_SI_E_S, somaDaSaidas, stfpOutput) {

        let stfp = 0;

        for (let i = 0; i < vetor_SI_E_S.length; i++) {
            stfp += Number(vetor_SI_E_S[i].value);
        }
        stfpOutput.value = stfp - somaDaSaidas.value * 2;
    },

    calcularDiferenca(inventario, stfp, diferencaOutput) {
        diferencaOutput.value = Number(inventario.value - stfp.value);
    }
}

window.addEventListener("load", () => {
    const bgcTargets = document.querySelectorAll("div.container aside input");
    bgcTargets.forEach( bgcTarget => {
        bgcTarget.addEventListener("change", () => {
            balancete.toRadioCheckboxes(bgcTargets, bgcTarget);
            balancete.mudarCorDeFundoDaPagina(bgcTarget.id);
        })
    });

    const tipos_de_requisicao = document.querySelectorAll("div.container div.col-tipo-de-requisicao input");

    tipos_de_requisicao.forEach( tdR => {
        tdR.addEventListener("change", () => { balancete.toRadioCheckboxes(tipos_de_requisicao, tdR)});
    });

    /* Calcular Stock Teórico */
    inputCels.forEach( input => {

        input.addEventListener("input", () => {
            if(input.dataset.stfp) {
                input.classList.add(`${input.dataset.stfp}`);
                
                const stfp = document.querySelectorAll(`.${input.dataset.stfp}`);
                const stfpOutput = document.querySelector(`.${input.dataset.stfpoutput}`);
                      
                let vetor_SI_E_S = (input.dataset.stfp).split("-menos-");
                let soma_das_saidas = document.querySelector(`.${vetor_SI_E_S[1]}`);

                balancete.calcularStockTeorico(stfp, soma_das_saidas, stfpOutput);
            } 

            
        })


    });
})