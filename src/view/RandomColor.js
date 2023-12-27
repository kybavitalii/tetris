import { RandomGenerator } from "../models/RandomGenerator";

export class RandomColor {
    constructor() {
        this.minRange = 0;
        this.maxRange = 256;
    }

    getColor() {
        const r = new RandomGenerator(this.minRange, this.maxRange).getRandom();
        const g = new RandomGenerator(this.minRange, this.maxRange).getRandom();
        const b = new RandomGenerator(this.minRange, this.maxRange).getRandom();
        return `rgb(${r}, ${g}, ${b})`;
    }
}
