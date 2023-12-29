import { ConvertPositionToIndex } from "../models/ConvertPositionToIndex";

export class GameFieldGenerator {
    constructor(model) {
        this.rows = model.getRows();
        this.columns = model.getColumns();
        this.playField = model.getPlayField();
        this.model = model;
    }

    generate() {
        for (let i = 0; i < this.rows * this.columns; i++) {
            const div = document.createElement("div");
            document.querySelector(".tetris").append(div);
        }

        this.playField = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));
        // console.table(this.playField);
        return this.playField;
    }

    draw() {
        const cells = this.model.getCells();
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const name = this.playField[row][column];
                const cellIndex = new ConvertPositionToIndex(row, this.columns, column).getIndex();
                // console.table(cells);
                cells[cellIndex].classList.add(name);
            }
        }
    }
}
