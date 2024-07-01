const container = document.querySelector('#morpion');
const replay = document.querySelector("#btnReplay");
const pve = document.querySelector("#pve");
const pvp = document.querySelector("#pvp");
const toggle = document.querySelector("#toggle");
let message = document.querySelector('#message');
let finito = false;
let vsrobot = false;
let morbion = true;
let tabGame = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];
let connect = [
    ['', '', '', '', '', '',],
    ['', '', '', '', '', '',],
    ['', '', '', '', '', '',],
    ['', '', '', '', '', '',],
    ['', '', '', '', '', '',],
    ['', '', '', '', '', '',],
    ['', '', '', '', '', '',]
];
let counter = 0;
let playerOne = "X";
let playerTwo = "O";
function createTab(tab) {
    container.innerHTML = '';
    let grid = document.createElement('div');
    grid.classList.add('grid');
    container.appendChild(grid);
    grid.classList.add(morbion ? 'morbion' : 'connect');
    tab.forEach((row, rowIndex) => {
        let line = document.createElement('div');
        line.classList.add('line');
        row.forEach((column, columnIndex) => {
            let cell = document.createElement('div');
            cell.addEventListener('click', () => {
                choicePlayer(rowIndex, columnIndex);
            });
            switch (column) {
                case playerOne:
                    cell.innerHTML = playerOne;
                    cell.setAttribute('data-player', playerOne)
                    break;

                case playerTwo:
                    cell.innerHTML = playerTwo;
                    cell.setAttribute('data-player', playerTwo)
                    break;
            }
            cell.classList.add('cell');
            line.appendChild(cell);
        });
        grid.appendChild(line);
    });
}

function choicePlayer(row, column) {
    if (morbion) {
        if (tabGame[row][column] === "" && !finito) {
            if (counter % 2 === 0) {
                tabGame[row][column] = playerOne;
                if (vsrobot) {
                   setTimeout(()=>{
                    robot(tabGame);
                    winner(tabGame);
                   },1000)
                }
            } else {
                tabGame[row][column] = playerTwo;
            }
            counter++;
            winner(tabGame);
            createTab(tabGame);
        }
    } else {
        if (connect[0][column] === "" && !finito) {
            let dispoRow = checkRow(column);
            if (dispoRow !== -1) {
                if (counter % 2 === 0) {
                    connect[dispoRow][column] = playerOne;
                    if (vsrobot) {
                        setTimeout(()=>{
                         robot(connect);
                         winner(connect);
                        },1000)
                     }
                } else {
                    connect[dispoRow][column] = playerTwo;
                }
                counter++;
                winnerConnect(connect);
                createTab(connect);
            }
        }
    }
}
function checkRow(column) {
    for (let i = connect.length - 1; i >= 0; i--) {
        if (connect[i][column] === "") {
            return i;
        }
    }
    return -1;
}
function winner(tab) {
    let winner = null;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i][0] && tab[i][0] === tab[i][1] && tab[i][0] === tab[i][2]) {
            winner = tab[i][0];
            break;
        }
    }
    if (!winner) {
        for (let j = 0; j < tab[0].length; j++) {
            if (tab[0][j] && tab[0][j] === tab[1][j] && tab[0][j] === tab[2][j]) {
                winner = tab[0][j];
                break;
            }
        }
    }
    if (!winner) {
        if (tab[0][0] && tab[0][0] === tab[1][1] && tab[0][0] === tab[2][2]) {
            winner = tab[0][0];
        } else if (tab[0][2] && tab[0][2] === tab[1][1] && tab[0][2] === tab[2][0]) {
            winner = tab[0][2];
        }
    }
    if (winner) {
        message.innerHTML = `${winner} Winner !!`;
        finito = true;
    } else if (tab.flat().every(cell => cell !== '')) {
        message.innerHTML = "Match Nul !!";
        finito = true;
    }
}
function winnerConnect(tab) {
    let winner = null;
    for (let row = 0; row < tab.length; row++) {
        for (let col = 0; col < tab[row].length - 3; col++) {
            if (tab[row][col] && tab[row][col] === tab[row][col + 1] && tab[row][col] === tab[row][col + 2] && tab[row][col] === tab[row][col + 3]) {
                winner = tab[row][col];
                break;
            }
        }
    }
    for (let col = 0; col < tab[0].length; col++) {
        for (let row = 0; row < tab.length - 3; row++) {
            if (tab[row][col] && tab[row][col] === tab[row + 1][col] && tab[row][col] === tab[row + 2][col] && tab[row][col] === tab[row + 3][col]) {
                winner = tab[row][col];
                break;
            }
        }
    }
    for (let row = 3; row < tab.length; row++) {
        for (let col = 0; col < tab[row].length - 3; col++) {
            if (tab[row][col] && tab[row][col] === tab[row - 1][col + 1] && tab[row][col] === tab[row - 2][col + 2] && tab[row][col] === tab[row - 3][col + 3]) {
                winner = tab[row][col];
                break;
            }
        }
    }
    for (let row = 0; row < tab.length - 3; row++) {
        for (let col = 0; col < tab[row].length - 3; col++) {
            if (tab[row][col] && tab[row][col] === tab[row + 1][col + 1] && tab[row][col] === tab[row + 2][col + 2] && tab[row][col] === tab[row + 3][col + 3]) {
                winner = tab[row][col];
                break;
            }
        }
    }
    if (winner) {
        message.innerHTML = `${winner} Winner !!`;
        finito = true;
    } else if (tab.flat().every(cell => cell !== '')) {
        message.innerHTML = "Match Nul !!";
        finito = true;
    }
}
function reset() {
    message.innerHTML = ''
    if (morbion) {
        tabGame = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        counter = 0;
        finito = false;
        createTab(tabGame);
    } else {
        connect = [
            ['', '', '', '', '', '',],
            ['', '', '', '', '', '',],
            ['', '', '', '', '', '',],
            ['', '', '', '', '', '',],
            ['', '', '', '', '', '',],
            ['', '', '', '', '', '',],
            ['', '', '', '', '', '',]
        ];
        counter = 0;
        finito = false;
        createTab(connect);
    }
}
function startGame() {
    if (morbion) {
        reset(tabGame);
    } else {
        reset(connect);
    }
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function robot(tab) {
    if (counter < 8 && morbion == true || counter < 42 && morbion == false) {
        let randomplayerX = random(0, tab.length - 1);
        let randomplayerY = random(0, tab[0].length - 1);
        while (tab[randomplayerX][randomplayerY] != "") {
            randomplayerX = random(0, tab.length - 1);
            randomplayerY = random(0, tab[0].length - 1);
        }
        if (morbion) {
            tab[randomplayerX][randomplayerY] = playerTwo;
        } else {
            let dispoRow = checkRow(randomplayerY);
            console.log(dispoRow);
            if (dispoRow !== -1) {

                connect[dispoRow][randomplayerY] = playerTwo;
            }
        }
        counter++;
        createTab(tab)
    }
}

pvp.addEventListener('click', () => {
    vsrobot = false;
    startGame();
});
pve.addEventListener('click', () => {
    vsrobot = true;
    startGame();
});

toggle.addEventListener('change', () => {
    morbion = !toggle.checked;
    startGame();
});
replay.addEventListener('click', () => {
    startGame();
});

