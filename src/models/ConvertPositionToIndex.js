export class ConvertPositionToIndex {
    constructor(row, columns, column) {
        this.row = row;
        this.column = column;
        this.columns = columns;
    }

    getIndex() {
        return this.row * this.columns + this.column;
    }
}
