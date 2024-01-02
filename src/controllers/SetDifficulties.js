export class SetDifficulties {
    speed = 800;

    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        this.easy = this.model.TETROMINO_EASY;
        this.middle = this.model.TETROMINO_MIDDLE;
        this.hard = this.model.TETROMINO_HARD;
        this.names = this.model.TETROMINO_NAMES;
    }

    comutate(score, speed) {
        switch (score) {
            case 0:
                this.model.TETROMINO_NAMES = this.easy;
                this.speed = speed;
                break;
            case 100:
                this.model.TETROMINO_NAMES = this.middle;
                this.speed = 700;
                break;
            case 140:
                this.model.TETROMINO_NAMES = this.hard;
                this.speed = 600;
                break;
            case 190:
                this.model.TETROMINO_NAMES = this.hard;
                this.speed = 500;
                break;
        }
    }
}
