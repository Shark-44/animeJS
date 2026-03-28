const container = document.querySelector(".ciel");
//const nuage = document.querySelectorAll(".nuage");
let indexSequence = 0;
let startSequence = 0;
let rewind = 0;
let stopInterval = null;
let stopRain = null;
let overlay = null;
//let overlayCloud = null;
    // construire un quadrillage pour positionner les nuages
    const myArray = [];
    for (let x = 0; x < 11; x++) {
        for (let y = 0; y < 11; y++) {
            myArray.push([x, y]);
        }}
// Au bouton lancer les nuages debut sequence
const button1 = document.getElementById('start');
button1.addEventListener("click", startNuage);


const button2 = document.getElementById('rewind');
button2.addEventListener("click", () => { rewind = 1 });

// sequence 1
function startNuage() {
    //console.log("etat de la sequence", indexSequence, "etat du rewind", rewind)
    const nuages = document.querySelectorAll(".nuage");
    if ( rewind === 1) {
        if (nuages.length ===0) {
            indexSequence = 0;
            startSequence = 0;
            rewind = 0;
            stopInterval = null;
            stopRain = null;
            return;
        }
        let i = 0 ;
        
        function deleteNuage () {
            if (i >= nuages.length) { 
                indexSequence = 0; 
                startSequence = 0; 
                rewind = 0;
                stopInterval = null;
                stopRain = null; 
                return; };
               
        const nuage = nuages[i]
        nuage.classList.add('active')
        nuage.addEventListener('animationend', () => {
            nuage.remove();
            i++;
            deleteNuage(); 
        }, { once: true });
        }
        deleteNuage ();
        
         return;
    }
    indexSequence = 1;
    console.log("etat de la sequence", indexSequence, "etat du rewind", rewind, stopInterval)
    const nuage1 = document.createElement('div');
    const nuage2 = document.createElement('div');
    nuage1.className = 'nuage n1';
    nuage2.className = 'nuage n2';

    const bn1 = document.createElement('div');
    const bn2 = document.createElement('div');
    const bn3 = document.createElement('div');
    bn1.className = 'bosse b1';
    bn2.className = 'bosse b2';
    bn3.className = 'bosse b3';

    const bn4 = document.createElement('div');
    const bn5 = document.createElement('div');
    const bn6 = document.createElement('div');
    bn4.className = 'bosse b1';
    bn5.className = 'bosse b2';
    bn6.className = 'bosse b3';

    nuage1.appendChild(bn1);
    nuage1.appendChild(bn2);
    nuage1.appendChild(bn3);

    nuage2.appendChild(bn4);
    nuage2.appendChild(bn5);
    nuage2.appendChild(bn6);

    container.appendChild(nuage1);
    container.appendChild(nuage2);
    nuage2.addEventListener('animationend', () => {
        if (!stopInterval) {
            stopInterval = setInterval(createCloud,1000);}
    })
    

}
// sequence 2
// Animation creation de nuages dans une quadrillage

function createCloud() {
  
    if (rewind === 1) {
           
        clearInterval(stopInterval); 
        const clouds = container.querySelectorAll(".cloud");
        let i = 0;


        function deleteSequential() {
            if (i >= clouds.length) {
                startNuage();
                return;
            };

            const cloud = clouds[i];
            cloud.classList.add('active'); 
            cloud.addEventListener('animationend', () => {
                cloud.remove();
                i++;
                if (overlay && i < 20) {
                    container.classList.remove("storm");
                    overlay.style.opacity = "0";
                    overlay.addEventListener('transitionend', () => {
                        overlay.remove();
                        overlay = null;
                    }, { once: true });
                }
                deleteSequential(); 
            }, { once: true });
        }
        deleteSequential();
        return;
    }
    indexSequence = 2;
    const nuage = document.querySelectorAll(".nuage");
    const newCloud = document.createElement('div');
    newCloud.className = 'cloud';
    //exploitation du quadrillage
    const randomIndex = Math.floor(Math.random() * myArray.length);
    const point = myArray.splice(randomIndex, 1)[0];
    const posX = point[0]
    const posY = point[1]
    newCloud.style.left = posX*10 + '%';
    newCloud.style.top = posY*10 + '%';
    /*const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    newCloud.style.left = posX + '%';
    newCloud.style.top = posY + '%';*/
    
    const b1 = document.createElement('div');
    const b2 = document.createElement('div');
    const b3 = document.createElement('div');

/*  b1.className = 'bump b1';
    b2.className = 'bump b2';
    b3.className = 'bump b3';*/
    b1.classList.add('bump', 'b1');
    b2.classList.add('bump', 'b2');
    b3.classList.add('bump', 'b3');

    newCloud.appendChild(b1);
    newCloud.appendChild(b2);
    newCloud.appendChild(b3);

    container.appendChild(newCloud);

    const clouds = container.querySelectorAll(".cloud");
    if (/*container.childElementCount*/clouds.length > 20 && !overlay) { 
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.opacity = "0";
        container.appendChild(overlay);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.style.opacity = "1";
            });
        });
        container.classList.add("storm");
       /* clouds.forEach(n => {
            const overlayCloud = document.createElement('div');
            overlayCloud.className = 'overlayCloud';
            overlayCloud.style.opacity = "0";
            n.appendChild(overlayCloud);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    overlayCloud.style.opacity = "1";
                });
            }
        )})*/
        nuage.forEach(n => {
            n.style.transform = "scale(1.7)";
        });
    };
    if (clouds.length > 40) {
        clearInterval(stopInterval)
        stopRain = setInterval (createRain, 5);
    }
    
   /* if (indexSequence === 2 && rewind === 1) {
        console.log("rewind enclenché")
        clearInterval(stopInterval)
        clouds.forEach(n => {
            n.classList.add('active');
        })
        function deleteCloud () {
            const clouds = container.querySelectorAll(".cloud");
            if (clouds.length > 0) {
                clouds[0].remove()
            }
        }
        clouds[0].addEventListener('animationend', () => {
          setInterval(deleteCloud,1000);}
        )
    }*/

}
// sequence 3
// Debut de pluie

function createRain() {
  
    if (rewind === 1) {
        clearInterval(stopRain)
        createCloud()
        return;
    }
    indexSequence = 3;
    const rain = document.createElement('div');
    const posX = Math.random() * 100
    const posY = Math.random() * 10
    rain.className = ('rain');
    rain.style.left = posX + '%';
    rain.style.top = posY + 10 + 'px';
    container.appendChild(rain);
    rain.addEventListener('animationend', function() {
        rain.remove();
    });
   
}


// test


