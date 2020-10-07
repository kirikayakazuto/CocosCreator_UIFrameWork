import { threadId } from "worker_threads";
import BlockModel from "./BlockModel";
import { BlockState } from "./BlockType";

namespace Block {
    export class Look extends b3.Action {

        tick(tick: b3.Tick) {
            let whiteBlock = BlockModel.getModel("WhiteBlock");
            let blackBlock = BlockModel.getModel("BlackBlock");

            let len = whiteBlock.node.position.sub(blackBlock.node.position).len();
            if(len <= this.properties.size) return b3.SUCCESS;

            BlockModel.changeState(BlockState.Stand);
            return b3.FAILURE;
        } 
    }
    export class Attack extends b3.Action {

        tick(tick: b3.Tick) {            
            BlockModel.changeState(BlockState.Attack);
            return b3.SUCCESS;
        }

    }

    export class Stand extends b3.Action {
        enter(tick: b3.Tick) {
            console.log("Stand enter");
        }

        open(tick: b3.Tick) {
            console.log("Stand open");
        }

        tick(tick: b3.Tick) {
            console.log("Stand tick");
        }

        close(tick: b3.Tick) {
            console.log("Stand close");
        }

        exit(tick: b3.Tick) {
            console.log("Stand exit");
        }
    }

    export class Patrol extends b3.Action {
        enter(tick: b3.Tick) {
            console.log("Patrol enter");
        
        }

        open(tick: b3.Tick) {
            console.log("Patrol open");
        }

        tick(tick: b3.Tick) {
            console.log("Patrol tick");
        }

        close(tick: b3.Tick) {
            console.log("Patrol close");
        }

        exit(tick: b3.Tick) {
            console.log("Patrol exit");
        }
    }

    export class Dodge extends b3.Action {
        enter(tick: b3.Tick) {
            console.log("Dodge enter");
        }

        open(tick: b3.Tick) {
            console.log("Dodge open");
        }

        tick(tick: b3.Tick) {
            console.log("Dodge tick");
        }

        close(tick: b3.Tick) {
            console.log("Dodge close");
        }

        exit(tick: b3.Tick) {
            console.log("Dodge exit");
        }
    }
}
window["Block"] = Block