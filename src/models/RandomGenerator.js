export class RandomGenerator {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    getRandom() {
        return Math.floor(Math.random() * (this.to - this.from) + this.from);
    }
}
