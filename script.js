//torpedo jatek jatekosa:
class Player {
    constructor(name) {
        this.name = name;
        this.grid = this.createGrid();
        this.ships = [];
    }   
    createGrid() {
        const grid = [];
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push(null);
            }   
            grid.push(row);
        }
        return grid;
    }
    placeShip(ship, startX, startY, isVertical) {
        if (this.canPlaceShip(ship, startX, startY, isVertical)) {
            for (let i = 0; i < ship.size; i++) {
                const x = isVertical ? startX + i : startX;
                const y = isVertical ? startY : startY + i;
                this.grid[x][y] = ship;
            }   
            this.ships.push(ship);
            return true;
        }
        return false;
    }
    canPlaceShip(ship, startX, startY, isVertical) {
        for (let i = 0; i < ship.size; i++) {
            const x = isVertical ? startX + i : startX;
            const y = isVertical ? startY : startY + i;
            if (x < 0 || x >= 10 || y < 0 || y >= 10 || this.grid[x][y] !== null) {
                return false;
            }
        }
        return true;
    }
    receiveAttack(x, y) {
        const target = this.grid[x][y];
        if (target) {
            target.hit();
            return true;
        }
        return false;
    }
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}
// torpedo jateko szamitogep:
class ComputerPlayer extends Player {
    constructor(name) {
        super(name);
    }
    makeRandomAttack(opponent) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (opponent.grid[x][y] === 'attacked');
        const hit = opponent.receiveAttack(x, y);
        opponent.grid[x][y] = 'attacked';
        return { x, y, hit };
    }  
}
// hajok szama jatekosonkent: 3, hajo merete 1 mező( minden hajo csak egy negyzet foglal el), megjeleniteese a jatekos hajoi zold szinnel jelennek meg, a szamitogep hajoi piros szinnel jelennek meg.megjelenese teljesen veletlenszeruen a jatekos es a szamitogep jatekterein.
class Ship {
    constructor(size) {
        this.size = size;
        this.hits = 0;
    }
    hit() {
        this.hits++;
    }
    isSunk() {
        return this.hits >= this.size;
    }
}
module.exports = { Player, ComputerPlayer, Ship };
