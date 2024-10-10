let tileSize = 20;
let gridWidth;
let gridHeight;
let selectedBuilding = null;
let city = {
    grid: [],
    resources: { water: 100, electricity: 200 },
    population: 0,
    money: 500,
    income: 0
};
const buildings = {
    Route: 10,
    Maison: 50,
    Usine: 100,
    Centrale: 200,
    Magasin: 50,
    Aéroport: 100
};

function setup() {
    createCanvas(windowWidth, windowHeight - 100); // Ajuster la hauteur pour laisser de la place pour la barre d'outils
    gridWidth = Math.floor(width / tileSize);
    gridHeight = Math.floor(height / tileSize);

    // Initialiser la grille
    for (let x = 0; x < gridWidth; x++) {
        city.grid[x] = [];
        for (let y = 0; y < gridHeight; y++) {
            city.grid[x][y] = null;
        }
    }
}

function draw() {
    background(0);
    drawGrid();
    drawInfoBar();
}

function drawGrid() {
    stroke(200);
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            fill(50);
            if (city.grid[x][y] === "Maison") fill(0, 255, 0);
            else if (city.grid[x][y] === "Usine") fill(255, 0, 0);
            else if (city.grid[x][y] === "Centrale") fill(255, 255, 0);
            else if (city.grid[x][y] === "Route") fill(150);
            else if (city.grid[x][y] === "Magasin") fill(0, 0, 200);

            rect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

function mousePressed() {
    let x = Math.floor(mouseX / tileSize);
    let y = Math.floor(mouseY / tileSize);

    if (selectedBuilding && x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
        let cost = buildings[selectedBuilding];
        if (city.grid[x][y] === null && city.money >= cost) {
            city.grid[x][y] = selectedBuilding;
            city.money -= cost;
            if (selectedBuilding === "Maison") {
                city.population += 5;
            }
            updateInfoBar();
        }
    }
}

function selectBuilding(building) {
    selectedBuilding = building;
    console.log("Building selected: " + building);
}

function drawInfoBar() {
    document.getElementById('money').textContent = `Argent: $${city.money}`;
    document.getElementById('population').textContent = `Population: ${city.population}`;
    document.getElementById('income').textContent = `Revenu: $${city.income}`;
    document.getElementById('energy').textContent = `Énergie: ${city.resources.electricity}`;
}

function updateInfoBar() {
    city.income = city.population * 5;
    city.money += city.income;
} 
