"use strict";

// INICIALIZAÇÃO DE VARIÁVEIS 
let _1o_cabecalho_da_ficha, _2o_cabecalho_da_ficha, rodape_da_ficha;
function start() {
    _1o_cabecalho_da_ficha = document.querySelector("div.container > header");
    _2o_cabecalho_da_ficha = document.querySelector("div.main header");
    rodape_da_ficha = document.querySelector("div.main footer");
}
// Clonar o cabeçalho e adicioná-lo a cada página para servir como referencia para as colunas
function cloneAndInsertHeader() {
    const first_lines_of_each_page = document.querySelectorAll("div.page-break");
    for(const firstLine of first_lines_of_each_page) {
        let newHeader = _2o_cabecalho_da_ficha.cloneNode(true);
        firstLine.insertAdjacentElement("beforeBegin", newHeader);
    }
}

// Usar os clones dos cabeçalhos como ponto de referência para adicionar footers da página anterior
function cloneAndInsertFooter() {
    const newheaders = document.querySelectorAll("div.main header:nth-child(n+2)");
    for(const newHeader of newheaders) {
        let newFooter = rodape_da_ficha.cloneNode(true);
        newHeader.insertAdjacentElement("beforeBegin", newFooter);
    }
}

function cloneAndPasteFooterContent() {
    const lastFooterChildren = document.querySelectorAll("div.main footer:last-child input");

    for (const child of lastFooterChildren) {
        child.addEventListener("input", () => {
            const allFootersChildren = document.querySelectorAll("div.main footer input");
            
            for (let i = 0; i < allFootersChildren.length; i++) {
                // Excluir os inputs do último footer
                if(i <= 19) {
                    if(child.id === allFootersChildren[i].id) {
                        allFootersChildren[i].value = child.value;
                    }
                }
            }
        });
    }
}

window.addEventListener("load", () => {
    start();
    cloneAndInsertHeader();
    cloneAndInsertFooter();
    cloneAndPasteFooterContent();
});
