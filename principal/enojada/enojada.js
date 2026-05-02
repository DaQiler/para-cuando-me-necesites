const contenedor = document.getElementById("listaAudios");

/* 🎧 CONTROL DE AUDIO */
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
    boton.textContent = "Escuchar 🤍";
    boton.classList.add("play");

    let audio = new Audio(`enojada${i}.mp3`);

    boton.addEventListener("click", () => {

        //AUDIO
        if(audioActual === audio){
            if(audio.paused){
                audio.play();
                boton.textContent = "Pausar 🤍";
            }else{
                audio.pause();
                boton.textContent = "Reanudar 🤍";
            }
            return;
        }

        //OTRO AUDIO
        if(audioActual){
            audioActual.pause();
            audioActual.currentTime = 0;
        }

        if(botonActual){
            botonActual.textContent = "Escuchar 🤍";
        }

        audio.play();

        audioActual = audio;
        botonActual = boton;

        boton.textContent = "Pausar 🤍";
    });

    // cuando termina
    audio.addEventListener("ended", () => {
        boton.textContent = "Escuchar 🤍";
        audioActual = null;
        botonActual = null;
    });

    card.appendChild(titulo);
    card.appendChild(boton);
    contenedor.appendChild(card);
}

/*ONDAS AL CLICK*/

const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ondas = [];

document.addEventListener("click", (e) => {
    if(e.target.closest(".card") || e.target.closest(".play")) return;
    ondas.push({
        x: e.clientX,
        y: e.clientY,
        radio: 1,
        alpha: 0.6
    });
});

/* animación */
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ondas.forEach((o, index) => {
        o.radio += 3.5;   
        o.alpha -= 0.008;

        // glow externo
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radio, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(255,120,120,${o.alpha})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255,80,80,0.6)";
        ctx.stroke();


        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radio * 0.7, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(255,180,180,${o.alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 0;

        if(o.alpha <= 0){
            ondas.splice(index,1);
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});