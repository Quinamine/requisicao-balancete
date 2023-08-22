"use strict";

let _1o_cabecalho_da_ficha, _2o_cabecalho_da_ficha, rodape_da_ficha;

window.addEventListener("load", () => {
    // INICIALIZAÇÃO DE VARIÁVEIS 
    _1o_cabecalho_da_ficha = document.querySelector("div.container > header");
    _2o_cabecalho_da_ficha = document.querySelector("div.main header");
    rodape_da_ficha = document.querySelector("div.main footer");

    // Clonar o cabeçalho e adicioná-lo a cada página para servir como referencia para as colunas
    const first_lines_of_each_page = document.querySelectorAll("div.page-break");
    for(const firstLine of first_lines_of_each_page) {
        let newHeader = _2o_cabecalho_da_ficha.cloneNode(true);
        firstLine.insertAdjacentElement("beforeBegin", newHeader);
    }

    // Usar os clones dos cabeçalhos como ponto de referência para adicionar footers da página anterior
    const newheaders = document.querySelectorAll("div.main header:nth-child(n+2)");
    for(const newHeader of newheaders) {
        let newFooter = rodape_da_ficha.cloneNode(true);
        newHeader.insertAdjacentElement("beforeBegin", newFooter);
    }
});
