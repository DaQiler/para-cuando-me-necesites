const contenedor = document.getElementById("listaAudios");

/* 🎧 CONTROL AUDIO */
let audioActual = null;
let botonActual = null;

const totalAudios = 10;

for(let i=1; i<=totalAudios; i++){

    let card = document.createElement("div");
    card.classList.add("card");

    let titulo = document.createElement("h3");
    titulo.textContent = "Nota " + i;

    let boton = document.createElement("button");
    boton.textContent = "Escuchar 💙";
    boton.classList.add("play");

    let audio = new Audio(`triste${i}.mp3`);

    boton.addEventListener("click", () => {

        if(audioActual === audio){
            if(audio.paused){
                audio.play();
                boton.textContent = "Pausar 💙";
            }else{
                audio.pause();
                boton.textContent = "Reanudar 💙";
            }
            return;
        }

        if(audioActual){
            audioActual.pause();
            audioActual.currentTime = 0;
        }

        if(botonActual){
            botonActual.textContent = "Escuchar 💙";
        }

        audio.play();

        audioActual = audio;
        botonActual = boton;

        boton.textContent = "Pausar 💙";
    });

    audio.addEventListener("ended", () => {
        boton.textContent = "Escuchar 💙";
        audioActual = null;
        botonActual = null;
    });

    card.appendChild(titulo);
    card.appendChild(boton);
    contenedor.appendChild(card);
}

const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* NIEBLA */
let nubes = [];

for(let i=0; i<20; i++){
    nubes.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*200 + 150,
        speed: Math.random()*1.2 + 0.5,
        alpha: Math.random()*0.2 + 0.05
    });
}

function dibujarNube(n){
    let gradient = ctx.createRadialGradient(
        n.x, n.y, 0,
        n.x, n.y, n.size
    );

    gradient.addColorStop(0, `rgba(180,210,255,${n.alpha})`);
    gradient.addColorStop(1, "rgba(180,210,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.size, 0, Math.PI*2);
    ctx.fill();
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    nubes.forEach(n => {
        n.x += n.speed;

        if(n.x - n.size > canvas.width){
            n.x = -n.size;
            n.y = Math.random()*canvas.height;
        }

        dibujarNube(n);
    });

    requestAnimationFrame(animate);
}

animate();

/* RESPONSIVE */
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});