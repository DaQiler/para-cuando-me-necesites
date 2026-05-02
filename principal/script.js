const bg = document.querySelector(".background");
const jar = document.getElementById("jar");
const wrapper = document.querySelector(".jar-wrapper");

/* fondo de corazón flotando */
for(let i=0; i<40; i++){
    let heart = document.createElement("span");

    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (6 + Math.random()*6) + "s";
    heart.style.fontSize = (10 + Math.random()*10) + "px";

    bg.appendChild(heart);
}

/* corazones dentro del tarro */

const tipos = [
    {clase:"heart-feliz", link:"feliz/feliz.html"},
    {clase:"heart-triste", link:"triste/triste.html"},
    {clase:"heart-enojada", link:"enojada/enojada.html"},
    {clase:"heart-animo", link:"desmotivada/desmotivada.html"},
    {clase:"heart-calma", link:"preocupada/preocupada.html"}
];

const total = 550; // cantidad de corazones

for(let i=0; i<total; i++){

    let tipo = tipos[Math.floor(Math.random()*tipos.length)];
    let heart = document.createElement("a");
    heart.innerHTML = "❤";
    heart.href = "#";
    heart.dataset.link = tipo.link;
    heart.classList.add("heart-note", tipo.clase);
    /* posición */
    heart.style.left = (Math.random()*90) + "%";
    heart.style.top  = (Math.random()*100) + "%";
    /* tamaños*/
    heart.style.fontSize = (35 + Math.random()*16) + "px";
    heart.style.transform = `rotate(${Math.random()*40 - 20}deg)`;
    jar.appendChild(heart);
}

/*Animacion cuando le das click */
jar.addEventListener("click", function(e){
    if(e.target.classList.contains("heart-note")){
        e.preventDefault();
        let link = e.target.dataset.link;
        if(wrapper.classList.contains("abriendo")) return;
        wrapper.classList.add("abriendo");
        setTimeout(() => {
            window.location.href = link;
        }, 1100); 
    }

});

window.addEventListener("load", () => {
    setTimeout(() => {
        wrapper.classList.add("cerrando");
    }, 300);
});

