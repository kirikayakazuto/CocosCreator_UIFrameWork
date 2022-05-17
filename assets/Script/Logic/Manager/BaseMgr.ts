import { Game } from "../Game"
export class BaseMgr {
    game: Game = null;
    constructor(game: Game) {
        this.game = game;
    }
}