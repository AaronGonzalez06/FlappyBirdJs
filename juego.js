var contexto = document.getElementById("lienzoJuego").getContext("2d");
contexto.canvas.width = 300;
contexto.canvas.height = 530;
var FPS = 60;
var gravedad = 1.5;
var scope = 0;

var personaje = {
    x:50,
    y:150,
    w:50,
    h:50
}

var tuberias = new Array();
tuberias[0] = {
    x: contexto.canvas.width,
    y:0
}

//variables imagenes.
var bird = new Image();
bird.src = "imagenes/bird.png";

var background = new Image();
background.src = "imagenes/background.png";

var tuberiaNorte = new Image();
tuberiaNorte.src = "imagenes/tuberiaNorte.png";

var tuberiaSur = new Image();
tuberiaSur.src = "imagenes/tuberiaSur.png";

var suelo = new Image();
suelo.src = "imagenes/suelo.png";

//variable audio

var punto = new Audio();
punto.src = "audios/punto.mp3";


setInterval(loop,1000/FPS);

function presionar(){
    personaje.y -=35;
}

function loop(){
    contexto.clearRect(0,0,300,700);
        //fondo
        contexto.drawImage(background,0,0);
        contexto.drawImage(suelo,0,contexto.canvas.height - suelo.height)
    //personaje    
    //contexto.fillStyle = "red";
    //contexto.fillRect(personaje.x,personaje.y,personaje.w,personaje.h);
    contexto.drawImage(bird, personaje.x, personaje.y);

    //tuberias
    for(var i =0; i <tuberias.length;i++){
        var constante = tuberiaNorte.height + 80;
        contexto.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y);
        contexto.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y + constante);
        tuberias[i].x--;

        if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias[i].y = 0
        }


        if(tuberias[i].x == 150){
            tuberias.push({
                x: contexto.canvas.width,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            
            })
        }
        
            //condiciones
    if(personaje.x + bird.width >= tuberias[i].x &&
        personaje.x <= tuberias[i].x + tuberiaNorte.width &&
        (personaje.y <= tuberias[i].y + tuberiaNorte.height ||
            personaje.y + bird.height >= tuberias[i].y + constante)
            || personaje.y + bird.height >= contexto.canvas.height - suelo.height
            ){
        location.reload();
    }

    if( tuberias[i].x == personaje.x){
        scope++;
        punto.play();
    }

  

    }



    personaje.y += gravedad;
    contexto.fillStyle = "black";
    contexto.font = "25px Arial";
    contexto.fillText("Score: "+scope,10,contexto.canvas.height-40)


}


//eventos
window.addEventListener("keydown",presionar);
