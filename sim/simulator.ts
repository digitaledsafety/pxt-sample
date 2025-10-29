/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../libs/babylonjs/index.d.ts"/>

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

        constructor() {
            super();
            this.element = <SVGSVGElement><any>document.getElementById('svgcanvas');
            this.spriteElement = <SVGCircleElement>this.element.getElementById('svgsprite');
            this.hareElement = <SVGCircleElement>this.element.getElementById('svgsprite2');
            this.sprite = new Sprite()
            this.hare = new Sprite();
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

            engine.runRenderLoop(() => {
                this.scene.render();
            });

            return Promise.resolve();
        }       
        
        updateView() {
            this.spriteElement.cx.baseVal.value = this.sprite.x;
            this.spriteElement.cy.baseVal.value = this.sprite.y;

            this.hareElement.cx.baseVal.value = this.hare.x;
            this.hareElement.cy.baseVal.value = this.hare.y;
        }
    }
}