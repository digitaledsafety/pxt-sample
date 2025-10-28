/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/@types/babylonjs/index.d.ts"/>

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
        public scene: BABYLON.Scene;
        public box: BABYLON.Mesh;
        public torus: BABYLON.Mesh;
        public cylinder: BABYLON.Mesh;

        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
            const engine = new BABYLON.Engine(canvas, true, {
                preserveDrawingBuffer: false,
                alpha: true,
            });

            this.scene = new BABYLON.Scene(engine);
            this.scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
            const camera = new BABYLON.FreeCamera(
                "camera",
                new BABYLON.Vector3(0, 0, -10),
                this.scene,
            );
            const light = new BABYLON.PointLight(
                "light",
                new BABYLON.Vector3(10, 10, 0),
                this.scene,
            );

            this.box = BABYLON.Mesh.CreateBox("box", 2, this.scene);
            this.box.rotation.x = -0.2;
            this.box.rotation.y = -0.4;

            const boxMaterial = new BABYLON.StandardMaterial("material", this.scene);
            boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
            this.box.material = boxMaterial;

            this.torus = BABYLON.Mesh.CreateTorus("torus", 2, 0.5, 15, this.scene);
            this.torus.position.x = -5;
            this.torus.rotation.x = 1.5;

            const torusMaterial = new BABYLON.StandardMaterial("material", this.scene);
            torusMaterial.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            this.torus.material = torusMaterial;

            this.cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2, 2, 2, 12, 1, this.scene);
            this.cylinder.position.x = 5;
            this.cylinder.rotation.x = -0.2;

            const cylinderMaterial = new BABYLON.StandardMaterial("material", this.scene);
            cylinderMaterial.emissiveColor = new BABYLON.Color3(1, 0.58, 0);
            this.cylinder.material = cylinderMaterial;

            engine.runRenderLoop(() => {
                this.scene.render();
            });

            return Promise.resolve();
        }       
    }
}
