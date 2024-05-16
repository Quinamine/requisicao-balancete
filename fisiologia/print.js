"use strict";
let _1o_cabecalho_da_ficha, _2o_cabecalho_da_ficha, rodape_da_ficha;
function start() {
    _1o_cabecalho_da_ficha = document.querySelector("div.container > header"),
    _2o_cabecalho_da_ficha = document.querySelector("div.main header"),
    rodape_da_ficha = document.querySelector("div.main footer")
}
function cloneAndInsertHeader() {
    let e = document.querySelectorAll("div.page-break");
    for (let t of e) {
        let o = _2o_cabecalho_da_ficha.cloneNode(!0);
        t.insertAdjacentElement("beforeBegin", o)
    }
}
function cloneAndInsertFooter() {
    let e = document.querySelectorAll("div.main header:nth-child(n+2)");
    for (let t of e) {
        let o = rodape_da_ficha.cloneNode(!0);
        t.insertAdjacentElement("beforeBegin", o)
    }
}
function cloneAndPasteFooterContent() {
    let e = document.querySelectorAll("div.main footer:last-child input");
    for (let t of e)
        t.addEventListener("input", ()=>{
            let e = document.querySelectorAll("div.main footer input");
            for (let o = 0; o < e.length; o++)
                o <= 19 && t.id === e[o].id && (e[o].value = t.value)
        }
        )
}
window.addEventListener("load", ()=>{
    start(),
    cloneAndInsertHeader(),
    cloneAndInsertFooter(),
    cloneAndPasteFooterContent()
}
);
