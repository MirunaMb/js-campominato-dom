/*
L'utente clicca su un bottone che genera una griglia quadrata.
1.definire in HTML un pulsante a cui assegniamo un ID.
2.all'evento click associamo un codice che genera una griglia.

GENERAZIONE GRIGLIA
Ogni cella ha un numero progressivo,da 1 a 100.
Ci saranno 10 caselle per ognuna delle 10 righe.
1) definiamo un contenitore con dimenssioni fisse.
2) contiamo da 1 a 100 per ogni ciclo.
a)creiamo una cella con dimenssioni fisse.
I) la larghezza la valutiamo con il calc (100% / 10)
II) la lunghezza con aspect-ratio : 1;
b) associamo l'indice ad una singola cella

QUANDO L'UTENTE CLICCA SU OGNI CELLA,LA CELLA CLICCATA SI COLORA DI AZZURO
 ED EMETTE UN MESSAGGIO CON IL N. DELLA CELLA IN CONSOLE.

 1)associamo all'evento click sulla cella un codice
 a)usiamo una classe per cambiare il colore alla cella
 b)usiamo il console.log sull'indice associato alla cella

*/
// DICHIARAZIONI
const button = document.getElementById('pulsante')
const grid = document.getElementById('griglia')
let choice = document.getElementById('select') // variabile legata al menu a tendina della difficolta
let bombArray = []

// Una volta clickato il bottone si genera la griglia
button.addEventListener('click', function () {
    const mode = choice.value; // modalita scelta dal menu a tendina
    const numberOfSquare = regulationGrid(mode) //richiamo la funzione per dare il numero di elementi della grid
    generaGriglia(numberOfSquare);

})
// La funzione della creazione della griglia
function generaGriglia(numberOfSquare) {
    grid.innerHTML = '';

    // genero array bombe (sempre 16, sempre tutte diverse, max totalSquares)
    const generateRandomNumber = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min


    // il ciclo che uso per identificare le bombe
    while (bombArray.length <= 15) {
        const randomBomb = generateRandomNumber(100, 1)
        if (!bombArray.includes(randomBomb)) {
            bombArray.push(randomBomb)
        }
    }
    console.log(bombArray)
    let freeCell = numberOfSquare - bombArray.length;
    // qui scopriamo il numere di celle rimaste libere

    // il ciclo della cella
    for (let index = 1; index <= numberOfSquare; index++) {
        // creamo una cella
        const cell = document.createElement('div')
        cell.classList.add('cell');
        cell.classList.add('cell-' + numberOfSquare);

        // Evento cella
        cell.addEventListener('click', function () {
            this.innerHTML = index;

            // se array bombe include index
            if (bombArray.includes(index)) {
                // sfondo rosso  
                this.classList.add('rosso');
                // stampo punteggio utente
                console.log(`Il tuo punteggio e : ${freeCell}`)
                gameOver(index)

            } else {
                // altrimenti
                this.classList.add('azzuro');
                console.log(index);
                freeCell--; // Decremento il numero di celle libere
            }
        })
        // mettiamo dentro la cella che abbiamo fatto in Js e la inseriamo dentro il contenitore
        grid.append(cell)
    }

}

// Creo una funzione per gestire la fine del gioco
function gameOver(index) {
    if (bombArray.includes(index)) {
        alert('Mi dispiace .HAI PERSO !')
    } else {
        alert('HAI VINTO!')
    }

}
// Creo funzione che in base alla scelta dell'utente mi cambia anche il numero degli elementi della grid
function regulationGrid(modeUser) {
    numberOfSquare = 0;
    if (modeUser === 'easy') {
        numberOfSquare = 100;
    } else if (modeUser === 'medium') {
        numberOfSquare = 81;
    } else if (modeUser === 'hard') {
        numberOfSquare = 49;
    }
    return numberOfSquare;
}


/*
Al click del bottone start devo :
1.generare le bombe
2.calcolare il numero massimo di click (non bombe)che si possono effetuare
3.generare array di non bombe cliccate dall utente.

Al click della cella devo:
1.prelevare il numero all interno della cella
2.SE il numero è nell array di bombe:
a) coloro la cella di rosso.
b) scrivo una alert per informare l'utente che ha perso
3.ALTRIMENTI  SE il numero non è nell array di bombe:
a)le celle diventano blu
b) incremento il punteggio
c)pusho il numero nell array di numeri gia cliccati
d)SE il punteggio === al numero di click massimo allora FINE GIOCO.

*/