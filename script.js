let tile_size = 20;
let grid_width = 800 / tile_size;
let grid_height = (600 - 100) / tile_size;

let city = {
    grid: Array.from({ length: grid_width }, () => Array(grid_height).fill(null)),
    resources: { water: 100, electricity: 200 },
    population: 0,
    money: 500,
    income: 0
};

let selectedBuilding = null;
let buildings = {
    "Route": 10,
    "Maison": 50,
    "Usine": 100,
    "Centrale": 200,
    "Magasin": 50,
    "Aéroport": 100
};
let inhabitants_per_house = 5;
let income_per_inhabitant = 5;

function setup() {
    createCanvas(800, 600);
    frameRate(60);
}

function draw() {
    background(0);
    drawGrid();
    drawInfoBar();
}

function drawGrid() {
    for (let x = 0; x < grid_width; x++) {
        for (let y = 0; y < grid_height; y++) {
            let posX = x * tile_size;
            let posY = y * tile_size + 100;
            stroke(200);
            noFill();
            rect(posX, posY, tile_size, tile_size);

            if (city.grid[x][y]) {
                fill(getBuildingColor(city.grid[x][y]));
                rect(posX, posY, tile_size, tile_size);
            }
        }
    }
}

function getBuildingColor(building) {
    switch (building) {
        case 'Maison': return color(0, 255, 0);
        case 'Usine': return color(255, 0, 0);
        case 'Centrale': return color(255, 255, 0);
        case 'Route': return color(150, 150, 150);
        case 'Magasin': return color(0, 0, 200);
        default: return color(255);
    }
}

function mousePressed() {
    let gridX = floor(mouseX / tile_size);
    let gridY = floor((mouseY - 100) / tile_size);

    if (mouseY > 100 && gridX < grid_width && gridY < grid_height && selectedBuilding) {
        placeBuilding(gridX, gridY, selectedBuilding);
    }
}

function placeBuilding(x, y, building) {
    let cost = buildings[building];
    if (city.grid[x][y] === null && city.money >= cost) {
        city.grid[x][y] = building;
        city.money -= cost;
        document.getElementById('money').textContent = city.money;
        
        if (building === 'Maison') {
            city.population += inhabitants_per_house;
            document.getElementById('population').textContent = city.population;
        }
    }
}

function drawInfoBar() {
    fill(50);
    rect(0, height - 50, width, 50);
}

function selectBuilding(building) {
    selectedBuilding = building;
    console.log('Outil sélectionné :', building);
}
