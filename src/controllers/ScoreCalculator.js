export class ScoreCalculator {
    score;
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
    }

    calculate(filledRows) {
        this.score = this.model.getScore();
        switch (filledRows.length) {
            case 1:
                this.model.setScore((this.score += 10));
                break;
            case 2:
                this.model.setScore((this.score += 30));
                break;
            case 3:
                this.model.setScore((this.score += 50));
                break;
            case 4:
                this.model.setScore((this.score += 100));
                break;
        }
        this.model.setScore(this.score);
    }
}
