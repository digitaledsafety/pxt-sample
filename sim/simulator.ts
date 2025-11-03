/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
import { createScene } from "./scene";
import type { Mesh } from "@babylonjs/core";

namespace pxsim {
    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        runtime.board = new Board();
    };

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    }

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public box: Mesh;
        public torus: Mesh;
        public cylinder: Mesh;
        
        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
            const scene = createScene(canvas);

            this.box = scene.box;
            this.torus = scene.torus;
            this.cylinder = scene.cylinder;

            return Promise.resolve();
        }       
        
        updateView() {
            // The scene is self-animated, so nothing to do here for now.
        }
    }
}
