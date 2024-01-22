import { ConvertPositionToIndex } from "../models/ConvertPositionToIndex";

export class GameFieldGenerator {
    tetris = document.querySelector(".tetris");
    constructor(model) {
        this.rows = model.getRows();
        this.columns = model.getColumns();
        this.playField = model.getPlayField();
        this.model = model;
        this.convertorPositionToIndex = new ConvertPositionToIndex();
    }

    reset() {
        this.tetris.innerHTML = "";
    }

    generate() {
        for (let i = 0; i < this.rows * this.columns; i++) {
            const div = document.createElement("div");
            this.tetris.append(div);
        }

        this.playField = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));

        return this.playField;
    }

    draw() {
        const cells = this.model.getCells();
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const name = this.playField[row][column];
                const cellIndex = this.convertorPositionToIndex.getIndex(row, this.columns, column);

                cells[cellIndex].classList.add(name);
            }
        }
    }
}
