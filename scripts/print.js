"use strict";

function isEdgeNavigator() {
    const navUserAgent = window.navigator.userAgent;
    if(navUserAgent.indexOf("Edg") != -1) return true;
}

let _1o_cabecalho_da_ficha, 
_2o_cabecalho_da_ficha, 
rodape_da_ficha;
window.addEventListener("load", () => {
    // INICIALIZAÇÃO DE VARIÁVEIS 
    _1o_cabecalho_da_ficha = document.querySelector("div.container > header");
    _2o_cabecalho_da_ficha = document.querySelector("div.main header");
    rodape_da_ficha = document.querySelector("div.main footer");

    // Variável referente a classe do elemento que ocupa a primeira linha de cada pagina
    let section_break = "div.section-break"; 
   
     if(isEdgeNavigator()){
        section_break = "div.edge-section-break";

        // Omissão das linhas da ultima pagina porque vao ate a metade desta.
        const rows = document.querySelectorAll("div.body div.row");
        for (let i = 0; i < rows.length; i++) {
            if(i >= 278) rows[i].classList.add("hidden");
        }
    }

    // Clonar o cabeçalho e adicioná-lo a cada página para servir como referencia para as colunas
    const sections_break = document.querySelectorAll(`${section_break}`);
    for(const section of sections_break) {
        let newHeader = _2o_cabecalho_da_ficha.cloneNode(true);
        section.insertAdjacentElement("beforeBegin", newHeader);
    }

    // Usar os clones dos cabeçalhos como ponto de referência para adicionar footers da página anterior
    const newheaders = document.querySelectorAll("div.main header:nth-child(n+2)");
    for(const newHeader of newheaders) {
        let newFooter = rodape_da_ficha.cloneNode(true);
        newHeader.insertAdjacentElement("beforeBegin", newFooter);
    }

    // No Edge, a ultima pagina tem poucas linhas, o script abaixo vai omití-las inclusive os seus respectivos Header e Footer
    if(isEdgeNavigator()) {
        const newFooters = document.querySelectorAll("div.main footer:nth-child(n+2)");
        newheaders[newheaders.length - 1].classList.add("hidden");
        newFooters[newFooters.length -1].classList.add("hidden");
        newFooters[newFooters.length -2].classList.add("no-border-bottom-on-edge")
    }
});

