
const balancete = {

    mudarCorDaPagina(cor) {
        const pagina = document.querySelectorAll("body, div.container, div.container input");

        if(cor === "original") {
            cor = "pagina-original";
        } else if (cor === "duplicado") {
            cor = "pagina-duplicada";
        } else { 
            cor = "pagina-triplicada";
        }

        for (const p of pagina) {
            p.classList.remove("pagina-original");
            p.classList.remove("pagina-duplicada");
            p.classList.remove("pagina-triplicada");

            p.classList.add(`${cor}`);
        }
        
    }
}

window.addEventListener("load", () => {
    const bgcPageChangers = document.querySelectorAll("div.container aside input");

    bgcPageChangers.forEach( b => {

        b.addEventListener("change", () => {
            for (const bPc of bgcPageChangers) {bPc.checked = false;}
            b.checked = true;
            balancete.mudarCorDaPagina(b.id);
        })
    })
})