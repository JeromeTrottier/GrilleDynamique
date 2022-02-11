let mapHeight = 500;
let mapWidth = 500;
let squareScale = 50;
let sliderWidth = document.querySelector('#inputWidth');
let sliderHeight = document.querySelector('#inputHeight');
let map = document.querySelector('#mapDiv');
let mapArray = [];

let startModeButton = document.querySelector('#chooseStart');
let goalModeButton = document.querySelector('#chooseGoal');

let modeButtons = document.querySelectorAll('.modeChooser');

let chooseStartMode = false;
let chooseGoalMode = false;
let drawButton = document.querySelector('#drawObstacles');
let drawPossibility = false;
let isDrawing = false;
setup()
addEventListenerOnNodes();

drawButton.addEventListener("click", function () {
    if (drawPossibility) {
        drawPossibility = false;
    } else {
        drawPossibility = true;
        chooseGoalMode = false;
        chooseStartMode = false;
    }
});
startModeButton.addEventListener("click", function () {
    if (chooseStartMode) {
        chooseStartMode = false;
    } else {
        chooseStartMode = true;
        chooseGoalMode = false;
        drawPossibility = false;
    }
});
map.addEventListener("mousedown", function () {
    if (drawPossibility) {
        isDrawing = true;
    }
})
window.addEventListener("mouseup", function () {
    if (drawPossibility) {
        isDrawing = false;
    }
})
goalModeButton.addEventListener("click", function () {
    if (chooseGoalMode) {
        chooseGoalMode = false;
    } else {
        chooseGoalMode = true;
        chooseStartMode = false;
        drawPossibility = false;
    }
});
document.querySelectorAll('.node').forEach(node => {
    node.addEventListener("mousemove", function () {
        if (isDrawing == true) {
            this.classList.add('obstacle');
        }
    })
});
function setup() {
    map.style.height = mapHeight + "px";
    map.style.width = mapWidth + "px";
    for (let i = 0; i < mapHeight / squareScale; i++) {
        mapArray.push([]);
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        map.appendChild(row);
        for (let j = 0; j < mapWidth / squareScale; j++) {
            let node = document.createElement('div');
            node.setAttribute('class', 'node');
            row.appendChild(node);
            mapArray[i].push(node);
        }
    }
}
sliderWidth.oninput = function determinWidthScale() {
    let rows = document.querySelectorAll('.row');
    mapWidth = roundToX(sliderWidth.value * 10, squareScale) + 100;
    map.style.width = mapWidth + "px";
    for (let i = 0; i < mapHeight / squareScale; i++) {
        for (let j = 0; j < mapWidth / squareScale; j++) {
            if (mapArray[i].length * squareScale < mapWidth) {
                let node = document.createElement('div');
                node.setAttribute('class', 'node');
                rows[i].appendChild(node);
                mapArray[i].push(node);
                addEventListenerOnNodes();
            }
            if (mapArray[i].length * squareScale > mapWidth) {
                mapArray[i][mapArray[i].length - 1].remove();
                if (rows[i].childElementCount < mapArray[i].length) {
                    mapArray[i].pop();
                }
            }
        }

    }

}

sliderHeight.oninput = function determineHeightScale() {
    let rows = document.querySelectorAll('.row');
    mapHeight = roundToX(sliderHeight.value * 10, squareScale) + 100;
    map.style.height = mapHeight + "px";
    if (map.childElementCount * squareScale < mapHeight) {
        mapArray.push([]);
        let newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        map.appendChild(newRow);
        for (let j = 0; j < mapWidth / squareScale; j++) {
            let newNode = document.createElement('div');
            newNode.setAttribute('class', 'node');
            newRow.appendChild(newNode);
            mapArray[mapArray.length - 1].push(newNode);
            addEventListenerOnNodes();
        }
    }
    if (map.childElementCount * squareScale > mapHeight) {
        rows[map.childElementCount - 1].remove();
        mapArray.pop();

    }
}

function roundToX(numberToRound, roundingTarget) {
    return Math.round(numberToRound / roundingTarget) * roundingTarget;
}

function addEventListenerOnNodes() {
    mapArray.forEach(row => {
        row.forEach(node => {
            node.addEventListener("click", givePosition);
        });
    });
}

function givePosition() {
    if (chooseStartMode) {
        let locationIndexDisplayStart = document.querySelector('#startingPosition');
        mapArray.forEach(row => {
            if (row.indexOf(this) != -1) {
                locationIndexDisplayStart.innerHTML = `(${mapArray.indexOf(row)}, ${row.indexOf(this)})`;
                let ancientStartingNode = document.querySelectorAll('.startingNode');
                if (ancientStartingNode != null) {
                    ancientStartingNode.forEach(node => {
                        node.classList.remove('startingNode');
                    });
                }
                this.classList.add("startingNode");
            }
        });
    }
    if (chooseGoalMode) {
        let locationIndexDisplayGoal = document.querySelector('#goalPosition');
        mapArray.forEach(row => {
            if (row.indexOf(this) != -1) {
                locationIndexDisplayGoal.innerHTML = `(${mapArray.indexOf(row)}, ${row.indexOf(this)})`;
                let ancientGoalNode = document.querySelectorAll('.goalNode');
                if (ancientGoalNode != null) {
                    ancientGoalNode.forEach(node => {
                        node.classList.remove('goalNode');
                    });
                }
                this.classList.add("goalNode");
            }
        });
    }
}