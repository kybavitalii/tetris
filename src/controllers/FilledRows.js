import { ScoreCalculator } from "./ScoreCalculator";

export class FilledRows {
    playField;
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        this.rows = this.model.getRows();
        this.columns = this.model.getColumns();
        this.scoreCalculator = new ScoreCalculator(this.model, this);
    }

    find() {
        let filledRows = [];
        this.playField = this.model.getPlayField();
        for (let row = 0; row < this.rows; row++) {
            let filledColumns = 0;

            for (let column = 0; column < this.columns; column++) {
                if (this.playField[row][column] !== 0) {
                    filledColumns++;
                }
            }
            if (this.columns === filledColumns) {
                filledRows.push(row);
            }
        }

        this.scoreCalculator.calculate(filledRows);
        this.removeFillRows(filledRows);
        return filledRows;
    }

    removeFillRows(filledRows) {
        if (filledRows.length < 1) return;
        filledRows.forEach((row) => {
            this.dropRowsAbove(row);
        });
    }

    dropRowsAbove(rowDelete) {
        for (let row = rowDelete; row > 0; row--) {
            this.playField[row] = this.playField[row - 1];
        }
        this.playField[0] = new Array(this.columns).fill(0);
    }
}
