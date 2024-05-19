"use strict";
const balancete = {
    toRadioCheckboxes(e, t) {
        for (let a of e)
            a.checked = !1;
        t.checked = !0
    },
    relateLabelToInput(e, t) {
        e.addEventListener("click", ()=>t.focus())
    },
    mudarCorDeFundoDaPagina(e) {
        let t = document.querySelectorAll("div.container, div.main header, div.container input");
        for (let a of t)
            a.classList.remove("bgc-yellow"),
            a.classList.remove("bgc-bluelight"),
            a.classList.add(`${e}`)
    },
    calcularStockTeorico(e, t, a) {
        let l = 0;
        for (let r = 0; r < e.length; r++)
            l += Number(e[r].value);
        a.value = l - 2 * t.value
    },
    calcularDiferenca(e, t, a) {
        a.value = Number(e.value) - Number(t.value)
    },
    calcularQtdArequisitar(e, t, a) {
        let l = 2 * e.value - t.value;
        l < 0 && (l = 0),
        a.value = l
    },
    ifCelHasAttrData_Calc_SF_DIF_qtdAreq(e) {
        if (e.dataset.stfp) {
            e.classList.add(`${e.dataset.stfp}`);
            let t = document.querySelectorAll(`.${e.dataset.stfp}`)
              , a = document.querySelector(`.${e.dataset.stfpoutput}`)
              , l = e.dataset.stfp.split("-menos-")
              , r = document.querySelector(`.${l[1]}`);
            this.calcularStockTeorico(t, r, a)
        }
        if (e.dataset.diferenca) {
            let c = e.dataset.diferenca.split("-menos-")
              , o = document.querySelector(`.${c[0]}`)
              , i = document.querySelector(`.${c[1]}`)
              , u = document.querySelector(`.${e.dataset.diferencaoutput}`);
            this.calcularDiferenca(o, i, u)
        }
        if (e.dataset.qtdarequisitar) {
            let s = e.dataset.qtdarequisitar.split("-menos-")
              , d = document.querySelector(`.${s[0]}`)
              , n = document.querySelector(`.${s[1]}`)
              , q = document.querySelector(`.${e.dataset.qtdarequisitaroutput}`);
            this.calcularQtdArequisitar(d, n, q)
        }
    }
};
function eventos() {
    let e = document.querySelectorAll("div.container aside input");
    e.forEach(t=>{
        t.addEventListener("change", ()=>{
            balancete.toRadioCheckboxes(e, t),
            balancete.mudarCorDeFundoDaPagina(t.id)
        }
        )
    }
    );
    let t = document.querySelector("label.for-elaborador")
      , a = document.querySelector("input.elaborador");
    balancete.relateLabelToInput(t, a);
    let l = document.querySelector("label.for-visto")
      , r = document.querySelector("input.visto");
    balancete.relateLabelToInput(l, r);
    let c = document.querySelectorAll("div.container div.col-tipo-de-requisicao input[type=checkbox]");
    c.forEach(e=>{
        e.addEventListener("change", ()=>balancete.toRadioCheckboxes(c, e))
    }
    ),
    inputCels.forEach(e=>{
        e.addEventListener("input", ()=>balancete.ifCelHasAttrData_Calc_SF_DIF_qtdAreq(e)),
        "" !== e.value && balancete.ifCelHasAttrData_Calc_SF_DIF_qtdAreq(e)
    }
    );
    let o = document.querySelector("div.container > header h1");
    o.addEventListener("click", ()=>document.querySelector("input#numero-de-requisicao").focus())
}
window.addEventListener("load", ()=>eventos());