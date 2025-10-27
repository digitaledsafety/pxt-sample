/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

declare var BABYLON: any;

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
        public engine: any; // BABYLON.Engine
        public scene: any; // BABYLON.Scene
        public box: any; // BABYLON.Mesh
        
        constructor() {
            super();
        }
        
        async initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            // Wait for Babylon.js to be loaded
            while (!window.hasOwnProperty("BABYLON")) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            let canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
            if (!canvas) {
                canvas = document.createElement("canvas");
                canvas.id = "renderCanvas";
                document.body.appendChild(canvas);
            }

            this.engine = new BABYLON.Engine(canvas, true, {
                preserveDrawingBuffer: false,
                alpha: true,
            });

            this.scene = new BABYLON.Scene(this.engine);
            this.scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

            const camera = new BABYLON.FreeCamera(
                "camera",
                new BABYLON.Vector3(0, 0, -10),
                this.scene
            );

            const light = new BABYLON.PointLight(
                "light",
                new BABYLON.Vector3(10, 10, 0),
                this.scene
            );

            this.box = BABYLON.Mesh.CreateBox("box", 2, this.scene);
            this.box.rotation.x = -0.2;
            this.box.rotation.y = -0.4;

            const boxMaterial = new BABYLON.StandardMaterial("material", this.scene);
            boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
            this.box.material = boxMaterial;

            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        }
        
        updateView() {
        }
    }
}
