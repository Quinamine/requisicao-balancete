"use strict"

const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll(".ficha__linha-de-inputs input");

        for (let i = 0; i < inputsCelulares.length; i++) {
            inputsCelulares[i].type === "text" && localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            

            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
        
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        inputsNaoCelulares.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}

const balancete = {
    toRadioCheckboxes(checkboxes, checkboxTarget) {
        for (const c of checkboxes) {
            c.checked = false;
        }
        checkboxTarget.checked = true;
    },

    filtrarEtotalizarCelulas(inputTarget) {
        if(inputTarget.dataset.stfp) {
            const classNameDosOperandos = inputTarget.dataset.stfp;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const classNameDeSomaDasSaidas = classNameDosOperandos.split("-menos-")[1];

            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const somaDasSaidas = document.querySelector(`.${classNameDeSomaDasSaidas}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.stfpoutput}`);
            

            let soma = 0;
            for (const operando of operandos) {
                soma+= Number(operando.value)
            }

            let stfp = soma - Number(somaDasSaidas.value) * 2;
            celulaDeSaida.value = stfp;
        }

        if(inputTarget.dataset.diferenca) {
            const classNameDosOperandos = inputTarget.dataset.diferenca;
            const classNameDeInventario = classNameDosOperandos.split("-menos-")[0];
            const classNameDeStockTeorico = classNameDosOperandos.split("-menos-")[1];
            

            const inventario = document.querySelector(`.${classNameDeInventario}`);
            const stockTeorico = document.querySelector(`.${classNameDeStockTeorico}`);
            let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.diferencaoutput}`);

            let diferenca = inventario.value - stockTeorico.value;

            celulaDeSaida.value = diferenca;
        }

        if(inputTarget.dataset.qtdarequisitar) {
            const classNameDosOperandos = inputTarget.dataset.qtdarequisitar;
            const classNameDeSomaDasSaidas = classNameDosOperandos.split("-menos-")[0];
            const classNameDeInventario = classNameDosOperandos.split("-menos-")[1];
            
            const somaDasSaidas = document.querySelector(`.${classNameDeSomaDasSaidas}`);
            const inventario = document.querySelector(`.${classNameDeInventario}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.qtdarequisitaroutput}`);

            let qtdArequisitar = somaDasSaidas.value * 2 - inventario.value;

            if(qtdArequisitar < 0) qtdArequisitar = 0;
            
            celulaDeSaida.value = qtdArequisitar;
        }
    },

  
    
}


function escutarEventos() {
    // Tipo de Requisição
    const checkboxesTipoDeReq = document.querySelectorAll(".input-tipo-de-requisicao");
    checkboxesTipoDeReq.forEach( checkbox => {
        checkbox.addEventListener("change", () => {
            balancete.toRadioCheckboxes(checkboxesTipoDeReq, checkbox);
        });
    });

    // Cor da Requisição 
    const checkboxesBgcModifiers = document.querySelectorAll(".checkbox-modificador-de-cor-da-ficha");
    const ficha = document.querySelector(".ficha");
    checkboxesBgcModifiers.forEach( checkbox => {
        checkbox.addEventListener("change", () => {
            balancete.toRadioCheckboxes(checkboxesBgcModifiers, checkbox);
    
            let copiaDaFicha = checkbox.dataset.copiadaficha;
            ficha.classList.remove("ficha--duplicado");
            ficha.classList.remove("ficha--triplicado");
            ficha.classList.add(`${copiaDaFicha}`);
           
        });
    });

    // Balancete propriamente dito
    const inputsCelulares = document.querySelectorAll(".ficha__linha-de-inputs input");
    inputsCelulares.forEach (inputCelular => {
        inputCelular.addEventListener("input", () => {
            balancete.filtrarEtotalizarCelulas(inputCelular)
        })
        inputCelular.value !== "" && balancete.filtrarEtotalizarCelulas(inputCelular);
    })

}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




