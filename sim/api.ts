/// <reference path="../libs/core/enums.d.ts"/>
/// <reference path="../node_modules/@types/babylonjs/index.d.ts"/>

async function delay<T>(duration: number, value: T | Promise<T>): Promise<T>;
async function delay(duration: number): Promise<void>
async function delay<T>(duration: number, value?: T | Promise<T>): Promise<T> {
    // eslint-disable-next-line
    const output = await value;
    await new Promise<void>(resolve => setTimeout(() => resolve(), duration));
    return output;
}

namespace pxsim.loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return delay(ms)
    }
}

function logMsg(m:string) { console.log(m) }

namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function log(msg:string) {
        logMsg("CONSOLE: " + msg)
        // why doesn't that work?
        board().writeSerial(msg + "\n")
    }
}

namespace pxsim._helpers {
    export function rotate(mesh: BABYLON.Mesh, axis: Axis, angle: number) {
        switch (axis) {
            case Axis.X:
                mesh.rotation.x += angle / 180 * Math.PI;
                break;
            case Axis.Y:
                mesh.rotation.y += angle / 180 * Math.PI;
                break;
            case Axis.Z:
                mesh.rotation.z += angle / 180 * Math.PI;
                break;
        }
    }

    export function scale(mesh: BABYLON.Mesh, axis: Axis, factor: number) {
        switch (axis) {
            case Axis.X:
                mesh.scaling.x *= factor;
                break;
            case Axis.Y:
                mesh.scaling.y *= factor;
                break;
            case Axis.Z:
                mesh.scaling.z *= factor;
                break;
        }
    }
}

namespace pxsim.box {
    /**
     * Rotates the box
     * @param axis the axis to rotate on
     * @param angle the angle to rotate by
     */
    //% blockId="boxRotate" block="rotate box on axis %axis|by %angle degrees"
    //% angle.min=-180 angle.max=180
    export function rotate(axis: Axis, angle: number) {
        _helpers.rotate(board().box, axis, angle);
    }

    /**
     * Scales the box
     * @param axis the axis to scale on
     * @param factor the factor to scale by
     */
    //% blockId="boxScale" block="scale box on axis %axis|by %factor"
    export function scaling(axis: Axis, factor: number) {
        _helpers.scale(board().box, axis, factor);
    }

    /**
     * Sets the color of the box
     * @param color the color to set
     */
    //% blockId="boxColor" block="set box color %color=colorNumberPicker"
    export function color(color: number) {
        let b = board();
        let material = b.box.material as BABYLON.StandardMaterial;
        material.emissiveColor = BABYLON.Color3.FromHexString("#" + color.toString(16));
    }
}

namespace pxsim.torus {
    /**
     * Rotates the torus
     * @param axis the axis to rotate on
     * @param angle the angle to rotate by
     */
    //% blockId="torusRotate" block="rotate torus on axis %axis|by %angle degrees"
    //% angle.min=-180 angle.max=180
    export function rotate(axis: Axis, angle: number) {
        _helpers.rotate(board().torus, axis, angle);
    }

    /**
     * Scales the torus
     * @param axis the axis to scale on
     * @param factor the factor to scale by
     */
    //% blockId="torusScale" block="scale torus on axis %axis|by %factor"
    export function scaling(axis: Axis, factor: number) {
        _helpers.scale(board().torus, axis, factor);
    }
}

namespace pxsim.cylinder {
    /**
     * Rotates the cylinder
     * @param axis the axis to rotate on
     * @param angle the angle to rotate by
     */
    //% blockId="cylinderRotate" block="rotate cylinder on axis %axis|by %angle degrees"
    //% angle.min=-180 angle.max=180
    export function rotate(axis: Axis, angle: number) {
        _helpers.rotate(board().cylinder, axis, angle);
    }

    /**
     * Scales the cylinder
     * @param axis the axis to scale on
     * @param factor the factor to scale by
     */
    //% blockId="cylinderScale" block="scale cylinder on axis %axis|by %factor"
    export function scaling(axis: Axis, factor: number) {
        _helpers.scale(board().cylinder, axis, factor);
    }
}
