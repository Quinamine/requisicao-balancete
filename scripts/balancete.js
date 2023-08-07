"use strict";

const balancete = {

    toRadioCheckboxes(checkboxes, checkboxTarget) {
        for (const c of checkboxes) {c.checked = false;}
        checkboxTarget.checked = true;
    },
    
    mudarCorDeFundoDaPagina(bgc) {
        const ficha = document.querySelectorAll("div.container, div.main header, div.container input");

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
    },

    calcularQtdArequisitar(somaDasSaidas, stockFisico, qtdArequisitarOutput) {
        let quantidade_a_requisitar = somaDasSaidas.value * 2 - stockFisico.value;
        if(quantidade_a_requisitar < 0) {
            quantidade_a_requisitar = 0;
        }
        qtdArequisitarOutput.value = quantidade_a_requisitar;
        
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

            if(input.dataset.diferenca) {

                let vetor_I_e_STFP = (input.dataset.diferenca).split("-menos-");

                const inventario = document.querySelector(`.${vetor_I_e_STFP[0]}`);
                const stfp = document.querySelector(`.${vetor_I_e_STFP[1]}`);
                const diferencaOutput = document.querySelector(`.${input.dataset.diferencaoutput}`);
                
                balancete.calcularDiferenca(inventario, stfp, diferencaOutput);
            }

            if(input.dataset.qtdarequisitar) {

                let vetor_S_I = (input.dataset.qtdarequisitar).split("-menos-");

                const soma_das_saidas = document.querySelector(`.${vetor_S_I[0]}`);
                const inventario_do_stock = document.querySelector(`.${vetor_S_I[1]}`);
                const qtdarequisitarOutput = document.querySelector(`.${input.dataset.qtdarequisitaroutput}`);
                
                balancete.calcularQtdArequisitar(soma_das_saidas, inventario_do_stock, qtdarequisitarOutput);
            }
        });
    });

    /* TO LABEL H1 */
    const h1 = document.querySelector("div.container > header h1");
    h1.addEventListener("click", () => {
        document.querySelector("input#numero-de-requisicao").focus();
    })
})