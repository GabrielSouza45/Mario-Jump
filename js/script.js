function iniciar() {
    document.getElementById('boasVindas').style.display = 'none';

    const mario = document.querySelector(".mario");
    const pipe = document.querySelector(".pipe");
    const nuvens = document.querySelector(".nuvens");
    const tails = document.querySelector(".tails");
    const sun = document.querySelector(".sun");
    const sky = document.querySelector(".game-board");
    const star = document.querySelector(".star");


    // iniciar animacoes
    pipe.style.animationName = 'pipe-animation';
    sun.style.animation = 'sun-animation 15s infinite linear';
    nuvens.style.animation = 'nuvens-animation 30s infinite linear';

    mario.src = './img/mario.gif';
    mario.style.width = '150px';

    mario.style.left ='0';

    // menu de morte
    const aviso = document.getElementById('aviso');


    // audios
    const audioJump = new Audio('../audio/jump.wav');
    const audioDeath = new Audio('../audio/gameover.wav');
    const audioSpawn = new Audio('../audio/spawn.wav');
    const audioOverworld = new Audio('../audio/overworld.wav');



    // star.style.display = "none";
    // sky.style.background = "var(--noite)";
    sky.style.background = 'var(--dia)';





    const jump = () => {
        mario.classList.add('jump');
        audioJump.play();

        // setTimeout(funcao, tempo ms);
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }




    // background e sol/lua

    const diaNoite = setInterval(() => {

        if (sky.style.background == "var(--noite)") {
            sky.style.background = 'var(--dia)';
            sun.src = './img/sun.png';

        } else if (sky.style.background == 'var(--dia)') {
            sky.style.background = "var(--noite)";
            sun.src = './img/moon.png';
        }

    }, 15000);




    const starShine = setInterval(() => {

        if (sky.style.background == "var(--noite)") {

            // if (star.style.display == "none") {
            star.style.display = "block";
            // } else {
            //     star.style.display = "none"; 
            // }

        } else {
            star.style.display = "none";
        }

    }, 500);






    var contadora = 1  ;

    setTimeout(() => {
        document.querySelector('.counter h3 span').innerHTML = `1`;

    }, 1800);

    const pontos = setInterval(() => {

        document.querySelector('.counter h3 span').innerHTML = `${contadora}`;
        contadora++;

    }, 1800);




    const loop = setInterval(() => {
        const pipeposition = pipe.offsetLeft; // pega o deslocamento esquerdo do cano 
        const marioposition = +window.getComputedStyle(mario).bottom.replace('px', ' ');
        const nuvemposition = nuvens.offsetLeft;
        const tailsposition = tails.offsetLeft;
        const sunpositionLeft = sun.offsetLeft;
        const sunpositionTop = sun.offsetTop;
        let src = pipe.getAttribute('src');






        // obstaculos



        if (pipeposition <= -50) {


            audioSpawn.play();

            var random = Math.floor(Math.random() * 10); // Define a variavel com um numero variavel de 0 a 10

            console.log(random);

            if (random >= 0 && random < 3) { // koopa
                pipe.src = './img/koopa.gif';

            } else if (random >= 3 && random <= 6) {
                pipe.src = './img/bullet.png';

            } else {
                pipe.src = './img/pipe.png ';

            }


        }


        // levar dano
        if (pipeposition <= 120 && pipeposition > 0 && marioposition < 70) {


            audioDeath.play();

            document.removeEventListener('keydown', jump);
            document.querySelector('audio').src = " ";

            pipe.style.animation = "none";
            pipe.style.left = `${pipeposition}px`;

            nuvens.style.animation = "none";
            nuvens.style.left = `${nuvemposition}px`;

            sun.style.animation = "none";
            sun.style.left = `${sunpositionLeft}px`;
            sun.style.top = `${sunpositionTop}px`;

            mario.src = './img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';
            mario.classList.add('mario-dead');
            mario.style.bottom = '-150px';

            tails.style.left = `${tailsposition}px`;
            tails.src = './img/tails-top.gif';
            tails.classList.add('tails-top');
            tails.style.top = `-200px`;


            // finaliza a troca de dia e noite, e deixa as estrelas estaticas
            // clearTimeout(starShine);
            star.src = './img/star-shine.png';

            clearTimeout(diaNoite);



            // Caso o jogador morra com o koopa em campo
            if (src == './img/koopa.gif') { // koopa event
                pipe.src = './img/koopa-shell.gif';
                pipe.style.height = '60px';

                setTimeout(() => {
                    pipe.src = './img/shell2.gif'
                }, 1500);

            }

            setTimeout(() => {
                aviso.style.display = "flex";
            }, 1000);


            clearInterval(loop);
            clearInterval(pontos);
        }
    }, 10);

    document.addEventListener('keydown', jump);
}




function recarregar() {

    document.location.reload(true);
    aviso.style.display = 'none';
    audioOverworld.play();

}
