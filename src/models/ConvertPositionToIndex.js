export class ConvertPositionToIndex {
    constructor() {}

    getIndex(row, columns, column) {
        return row * columns + column;
    }
}
