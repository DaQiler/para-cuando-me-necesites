const contenedor = document.getElementById("listaAudios");

/* 🎧 AUDIO */
let audioActual = null;
let botonActual = null;

const totalAudios = 10;

for(let i=1; i<=totalAudios; i++){

    let card = document.createElement("div");
    card.classList.add("card");

    let titulo = document.createElement("h3");
    titulo.textContent = "Nota " + i;

    let boton = document.createElement("button");
    boton.textContent = "Escuchar 💚";
    boton.classList.add("play");

    let audio = new Audio(`preocupada${i}.mp3`);

    boton.addEventListener("click", () => {

        if(audioActual === audio){
            if(audio.paused){
                audio.play();
                boton.textContent = "Pausar 💚";
            }else{
                audio.pause();
                boton.textContent = "Reanudar 💚";
            }
            return;
        }

        if(audioActual){
            audioActual.pause();
            audioActual.currentTime = 0;
        }

        if(botonActual){
            botonActual.textContent = "Escuchar 💚";
        }

        audio.play();

        audioActual = audio;
        botonActual = boton;

        boton.textContent = "Pausar 💚";
    });

    audio.addEventListener("ended", () => {
        boton.textContent = "Escuchar 💚";
        audioActual = null;
        botonActual = null;
    });

    card.appendChild(titulo);
    card.appendChild(boton);
    contenedor.appendChild(card);
}

/* FONDO*/
const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulas = [];
let mouse = { x: null, y: null };

/*MÁS PARTICULAS BASE */
const TOTAL = 200;

for(let i=0; i<TOTAL; i++){
    particulas.push(crearParticula());
}

/* FUNCION CREAR PARTICULA */
function crearParticula(x = null, y = null){
    return {
        x: x ?? Math.random()*canvas.width,
        y: y ?? Math.random()*canvas.height,
        baseX: Math.random()*canvas.width,
        baseY: Math.random()*canvas.height,
        size: Math.random()*2 + 1
    };
}

/*MOUSE */
window.addEventListener("mousemove", (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("touchmove", (e)=>{
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});

/*CLICK = CREAR PARTICULAS */
window.addEventListener("click", (e)=>{

    // evita clicks en UI
    if(e.target.closest(".card") || e.target.closest(".play")) return;

    for(let i=0; i<15; i++){
        particulas.push(crearParticula(e.clientX, e.clientY));
    }
});

/* ANIMACION */
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particulas.forEach(p => {

        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx*dx + dy*dy);

        /* INTERACCION */
        if(dist < 120){
            p.x += dx * 0.02;
            p.y += dy * 0.02;
        }else{
            p.x += (p.baseX - p.x) * 0.01;
            p.y += (p.baseY - p.y) * 0.01;
        }

        /* DIBUJO */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = "rgba(120,255,180,0.6)";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

/* 📱 RESPONSIVE */
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});