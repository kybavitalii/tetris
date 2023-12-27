import "../style.css";
import { GameModel } from "./models/GameModel.js";
import { GameController } from "./controllers/GameController.js";

class App {
    constructor() {
        this.model = new GameModel();
        this.controller = new GameController(this.model);
    }

    init() {
        this.controller.initGame();
    }
}

new App().init();
