"use strict";

let _1o_cabecalho_da_ficha, _2o_cabecalho_da_ficha, rodape_da_ficha;
window.addEventListener("load", () => {
    _1o_cabecalho_da_ficha = document.querySelector("div.container > header");
    _2o_cabecalho_da_ficha = document.querySelector("div.main header");
    rodape_da_ficha = document.querySelector("div.main footer");


    const sessoes_de_quebra = document.querySelectorAll("div.section-break");

    for(const s of sessoes_de_quebra) {
        s.insertAdjacentElement("beforeBegin", _2o_cabecalho_da_ficha.cloneNode(true));
    }

    const headers = document.querySelectorAll("div.main header:nth-child(n+2)");

    for(const h of headers) {
        h.insertAdjacentElement("beforeBegin", rodape_da_ficha.cloneNode(true));
    }

});

