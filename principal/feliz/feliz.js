const contenedor = document.getElementById("listaAudios");
const fondo = document.querySelector(".background");

/* corazones flotando */
for(let i=0; i<30; i++){
    let heart = document.createElement("span");
    heart.innerHTML = "💗";

    heart.style.left = Math.random()*100 + "vw";
    heart.style.fontSize = (10 + Math.random()*20) + "px";
    heart.style.animationDuration = (5 + Math.random()*5) + "s";

    fondo.appendChild(heart);
}

/* CONTROL GLOBAL */
let audioActual = null;
let botonActual = null;

/* LISTA DE AUDIOS */
const totalAudios = 10;

for(let i=1; i<=totalAudios; i++){

    let card = document.createElement("div");
    card.classList.add("card");

    let titulo = document.createElement("h3");
    titulo.textContent = "Nota " + i;

    let boton = document.createElement("button");
    boton.textContent = "Escuchar 💗";
    boton.classList.add("play");

    let audio = new Audio(`feliz${i}.mp3`);

    boton.addEventListener("click", () => {

        /*BOTÓN */
        if(audioActual === audio){
            if(audio.paused){
                audio.play();
                boton.textContent = "Pausar 💗";
            }else{
                audio.pause();
                boton.textContent = "Reanudar 💗";
            }
            return;
        }

        /* OTRO AUDIO */
        if(audioActual){
            audioActual.pause();
            audioActual.currentTime = 0;
        }

        if(botonActual){
            botonActual.textContent = "Escuchar 💗";
        }

        audio.play();

        audioActual = audio;
        botonActual = boton;

        boton.textContent = "Pausar 💗";
    });

    /* cuando termina el audio */
    audio.addEventListener("ended", () => {
        boton.textContent = "Escuchar 💗";
        audioActual = null;
        botonActual = null;
    });

    card.appendChild(titulo);
    card.appendChild(boton);
    contenedor.appendChild(card);
}