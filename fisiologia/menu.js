"use strict"
const menu = {
    realcarTotaisSe(condicao) {
        const totais = document.querySelectorAll("[readonly]");
        for (const t of totais) {
            if(condicao) {
                t.classList.add("--realcar-totais");
                localStorage.setItem(`${keyPrefix}-realcarTotais`, "true");
            } else {
                t.classList.remove("--realcar-totais");
                localStorage.removeItem(`${keyPrefix}-realcarTotais`);
            }
        }
    },

    irParaLinha() {
        return {
            dialogBox: document.querySelector(".dialog-box-ir-para"),
            inputNumLinha: document.querySelector(".dialog-box-ir-para__input-linha"),
            numerosDeLinha: document.querySelectorAll(".ficha__num-de-linha"),

            abrirDialogBox() { 
                menu.irParaLinha().dialogBox.classList.add("--open");
                menu.irParaLinha().inputNumLinha.value = "";
                menu.irParaLinha().inputNumLinha.focus();
            },

            fecharDialogBox() {
                menu.irParaLinha().dialogBox.classList.remove("--open");
                menu.irParaLinha().removeLnHighlight();
            },

            goToLn(numLinha) {
                if(numLinha < 1 || numLinha > 53) {
                    const lnNoFound = "Nenhuma linha corresponde ao número digitado."
                    alertarSobre(lnNoFound);
                    this.removeLnHighlight();

                } else {
                    numLinha = Number(numLinha) - 1;

                    this.highlightLnFound(this.numerosDeLinha[numLinha]);

                    if(window.innerWidth > 1304) {
                        numLinha -= 3;
                     }
                   
                    numLinha > 3 ? 
                        this.numerosDeLinha[numLinha].scrollIntoView() 
                        : document.body.scrollIntoView();
                    
                }
            },

            highlightLnFound(lnFound) {
                this.removeLnHighlight();
                lnFound.classList.add("--highlight");
            },

            removeLnHighlight() {
                for(const num of this.numerosDeLinha) {
                    num.classList.remove("--highlight");
                }
            }
        }
    },

    esvaziarFicha() {
        return {  
            dialogBox: document.querySelector(".dialog-box-esvaziar-ficha"),
            abrirDialogBox() { 
                const inputsDaFicha = document.querySelectorAll(".ficha input");

                let inputFilled = 0;
                for(const input of inputsDaFicha) {
                    input.value.length > 0 && inputFilled++;
                }

                if(inputFilled === 0) {
                    const noInputFilledMsg = "A ficha encontra-se vazia actualmente."
                    alertarSobre(noInputFilledMsg);
                    return false;
                } 

                menu.esvaziarFicha().dialogBox.classList.add("--open");
                desfoqueDoFundo("desfocar");
            },

            fecharDialogBox() {
                menu.esvaziarFicha().dialogBox.classList.remove("--open");
                desfoqueDoFundo("focar");
                removerDestaqueDeRedCells();
            },

            confirmar() {
                const inputsCelulares  = document.querySelectorAll(".ficha__linha-de-inputs input");
                const checkboxesParaInputsNaoCelulares = document.querySelectorAll("[data-for]");
       
                for (let i = 0; i < inputsCelulares.length; i++) {
                    inputsCelulares[i].value = "";
                    localStorage.removeItem(`${keyPrefix}-input${i}`);
                }

                for (const cb of checkboxesParaInputsNaoCelulares) {                    
                    if(cb.checked) {
                        let idDeInputNaoCelular = cb.dataset.for
                        let inputNaoCelular = document.getElementById(`${idDeInputNaoCelular}`);
                        inputNaoCelular.value = "";
                        localStorage.removeItem(`${keyPrefix}-${inputNaoCelular.id}`);
                    }
                }
                menu.esvaziarFicha().fecharDialogBox();
            }
        }
    },

    imprimirFicha() {
        window.print()
    },

    abrirArtigo(artigo) {
        const artigoSobre = document.querySelector(".artigo--sobre");
        const artigoAjuda = document.querySelector(".artigo--ajuda");
        const body = document.querySelector("body");

        artigo === "sobre" ? 
        artigoSobre.classList.add("--open") : 
        artigoAjuda.classList.add("--open");

        body.classList.add("--overflow-h");
        desfoqueDoFundo("desfocar");
    },

    fecharArtigo(artigo) {
        const artigoSobre = document.querySelector(".artigo--sobre");
        const artigoAjuda = document.querySelector(".artigo--ajuda");
        const body = document.querySelector("body");

        artigo === "sobre" && artigoSobre.classList.remove("--open");

        if(artigo === "ajuda") {
            const details = document.getElementsByTagName("details");
            for (const d of details) {
                d.removeAttribute("open");
            }
            artigoAjuda.classList.remove("--open");
        }

        body.classList.remove("--overflow-h");
        desfoqueDoFundo("focar");
    }
}

function eventos() {
    // REALCAR TOTAIS
    const checkboxRealcarTotais = document.getElementById("checkbox-realcar-totais");
    const cRt = checkboxRealcarTotais;
    cRt.addEventListener("change", () => cRt.checked ? menu.realcarTotaisSe(1) : menu.realcarTotaisSe(0));

    // Realcar totais no load do windows 
    if(localStorage.getItem(`${keyPrefix}-realcarTotais`)) {
        checkboxRealcarTotais.setAttribute("checked", "checked");
        menu.realcarTotaisSe(1);
    }

    // IR PARA LINHA
    const btnAbrirIrPara = document.querySelector(".header__menu__btn--ir-para");
    btnAbrirIrPara.addEventListener("click", menu.irParaLinha().abrirDialogBox);

    const btnFecharIrPara = document.querySelector(".dialog-box-ir-para__btn-fechar");
    btnFecharIrPara.addEventListener("click", menu.irParaLinha().fecharDialogBox);

    const inputNumLinha = document.querySelector(".dialog-box-ir-para__input-linha");
    inputNumLinha.addEventListener("input", () => {
        inputNumLinha.value !== "" ? 
            menu.irParaLinha().goToLn(inputNumLinha.value) 
            : menu.irParaLinha().removeLnHighlight();
    });

    // Fechar dialog-boxes-default
    const btnsFecharDialogBox = document.querySelectorAll(".dialog-box-default__btn");
    btnsFecharDialogBox.forEach( btn => {
        btn.addEventListener("click", () => {
            let btnParent = btn.parentElement;
            btnParent.parentElement.classList.remove("--open");
            clearInterval(btnAutoCloseLoop);
        });
    });

    // ESVAZIAR FICHA 
    const btnEsvaziarFicha = document.querySelector(".header__menu__btn--esvaziar-ficha");
    btnEsvaziarFicha.addEventListener("click", menu.esvaziarFicha().abrirDialogBox);

    const btnCancelar = document.querySelector(".dialog-box-esvaziar-ficha__btn--cancelar");
    btnCancelar.addEventListener("click", menu.esvaziarFicha().fecharDialogBox);

    const btnConfirmar = document.querySelector(".dialog-box-esvaziar-ficha__btn--confirmar");
    btnConfirmar.addEventListener("click", menu.esvaziarFicha().confirmar);

    // IMPRIMIR 
    const btnImprimir = document.querySelector(".header__menu__btn--imprimir");
    btnImprimir.addEventListener("click", menu.imprimirFicha);

    // Artigos
    const btnAbrirSobre = document.querySelector(".header__menu__btn--sobre");
    btnAbrirSobre.addEventListener("click", () => menu.abrirArtigo("sobre"));

    const btnFecharSobre = document.querySelector(".artigo__btn-fechar--sobre")
    btnFecharSobre.addEventListener("click", () => menu.fecharArtigo("sobre"));

    window.addEventListener("resize", () => {
        const artigoSobre = document.querySelector(".artigo--sobre");

        const itsMobile = window.innerWidth < 1024;
        const articleIsOpen = artigoSobre.matches(".--open");
        const body = document.querySelector("body");

        if(itsMobile && articleIsOpen) {
            desfoqueDoFundo("focar");
            location.href = `index.html#${artigoSobre.id}`;
            body.classList.remove("--overflow-h");
            
        } else if(!itsMobile && articleIsOpen) {
            desfoqueDoFundo("desfocar");
            body.classList.add("--overflow-h");
        }       
    });

    const btnAbrirAjuda = document.querySelector(".header__menu__btn--ajuda");
    btnAbrirAjuda.addEventListener("click", () => menu.abrirArtigo("ajuda"));

    const btnFecharAjuda = document.querySelector(".artigo__btn-fechar--ajuda")
    btnFecharAjuda.addEventListener("click", () => menu.fecharArtigo("ajuda"));

    // PARTILHAR 
    const data = {
        title: "Requisição/Balancete",
        text: "O Requisição/Balancete é um serviço online gratuito que auxilia na elaboração, como o nome sugere, da requisição/balancete, por meio do cálculo automático do Stock Teórico Fim do Período, Diferença entre o stock teórico e stock físico e Quantidade a Requisitar com base nos dados de controlo da ficha de stock e inventário preenchidos pelo usuário. Foi criado de acordo com o modelo da ficha de requisição/balancete actualmente vigente no Serviço Nacional de Saúde em Moçambique.",
        url: "https://quinamin.github.io/requisicao-balancete/index.html"
    }

    const btnPartilhar = document.querySelector(".header__menu__btn--partilhar");
    btnPartilhar.addEventListener("click", () => {
        try {
            navigator.share(data).then(()=>console.log("Requisição/Balancete partilhado com sucesso."))
            .catch(e=> console.log(`Não foi possivel partilhar o serviço devido ao erro: ${e}.`))
        } catch (e) {
            console.log("O seu navegador não tem suporte ao método 'navigator.share()'.")
        }
    })

};

window.addEventListener("load", eventos);

window.addEventListener("keydown", event => {

    // CONTROL = 17 && p = 80
    if(event.ctrlKey && event.keyCode === 80) {
        event.preventDefault();
        menu.imprimirFicha();
    }
})
