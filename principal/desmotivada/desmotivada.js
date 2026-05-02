const contenedor = document.getElementById("listaAudios");
const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");

/*AUDIO*/

let audioActual = null;
let botonActual = null;

const totalAudios = 10;

for(let i=1; i<=totalAudios; i++){

    let card = document.createElement("div");
    card.classList.add("card");

    let titulo = document.createElement("h3");
    titulo.textContent = "Nota " + i;

    let boton = document.createElement("button");
    boton.textContent = "Escuchar 🧡";
    boton.classList.add("play");

    let audio = new Audio(`desmotivada${i}.mp3`);

    boton.addEventListener("click", () => {

        if(audioActual === audio){
            if(audio.paused){
                audio.play();
                boton.textContent = "Pausar 🧡";
            }else{
                audio.pause();
                boton.textContent = "Reanudar 🧡";
            }
            return;
        }

        if(audioActual){
            audioActual.pause();
            audioActual.currentTime = 0;
        }

        if(botonActual){
            botonActual.textContent = "Escuchar 🧡";
        }

        audio.play();

        audioActual = audio;
        botonActual = boton;

        boton.textContent = "Pausar 🧡";
    });

    audio.addEventListener("ended", () => {
        boton.textContent = "Escuchar 🧡";
        audioActual = null;
        botonActual = null;
    });

    card.appendChild(titulo);
    card.appendChild(boton);
    contenedor.appendChild(card);
}

/* CANVAS*/

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dibujando = false;
let caminos = [];
let mouse = { x: canvas.width/2, y: canvas.height/2 };

/*  RAYOS AUTOMÁTICOS */

function crearRayoAutomatico() {

    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    let puntos = [{ x, y }];
    let longitud = Math.floor(Math.random() * 30) + 15;

    for(let i = 0; i < longitud; i++){
        let ultimo = puntos[puntos.length - 1];

        let nx = ultimo.x + (Math.random() - 0.5) * 50;
        let ny = ultimo.y + (Math.random() - 0.5) * 50;

        puntos.push({ x: nx, y: ny });
    }

    caminos.push({
        puntos,
        vida: 0,
        maxVida: 60 + Math.random()*60,
        activo: false
    });
}

/* MÁS FRECUENCIA + MÁS CANTIDAD */
setInterval(() => {

    let cantidad = Math.floor(Math.random() * 3) + 2; // 2 a 4 rayos

    for(let i = 0; i < cantidad; i++){
        crearRayoAutomatico();
    }

}, 400);

/* EVENTOS */

document.addEventListener("mousedown", (e) => {

    if(e.target.closest(".card") || e.target.closest(".play")) return;

    dibujando = true;

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    caminos.push({
        puntos: [{ x: mouse.x, y: mouse.y }],
        vida: 0,
        maxVida: 120,
        activo: true
    });
});

document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

document.addEventListener("mouseup", () => {
    dibujando = false;
    caminos.forEach(c => c.activo = false);
});

/* ANIMACIÓN */

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    /* FONDO OSCURO SUAVE */
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    caminos.forEach((c, index) => {

        let ultimo = c.puntos[c.puntos.length - 1];

        if(dibujando && c.activo){
            let nx = ultimo.x + (Math.random()-0.5)*20;
            let ny = ultimo.y + (Math.random()-0.5)*20;

            nx += (mouse.x - ultimo.x) * 0.05;
            ny += (mouse.y - ultimo.y) * 0.05;

            c.puntos.push({ x: nx, y: ny });
        }

        if(!c.activo){
            c.vida++;
        }

        let alpha = 1 - (c.vida / c.maxVida);

        ctx.beginPath();
        c.puntos.forEach((p, i) => {
            if(i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });

        let color = c.activo 
            ? `rgba(255,140,60,${alpha})`
            : `rgba(255,180,80,${alpha})`;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        if(c.vida > c.maxVida){
            caminos.splice(index,1);
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});