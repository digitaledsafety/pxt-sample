// Auto-generated from simulator. Do not edit.
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //%
    //% shim=console::log
    function log(msg: string): void;

}
declare namespace box {
    /**
     * Rotates the box
     * @param axis the axis to rotate on
     * @param angle the angle to rotate by
     */
    //% blockId="boxRotate" block="rotate box on axis %axis|by %angle degrees"
    //% angle.min=-180 angle.max=180
    //% shim=box::rotate
    function rotate(axis: Axis, angle: number): void;

    /**
     * Scales the box
     * @param axis the axis to scale on
     * @param factor the factor to scale by
     */
    //% blockId="boxScale" block="scale box on axis %axis|by %factor"
    //% shim=box::scaling
    function scaling(axis: Axis, factor: number): void;

    /**
     * Sets the color of the box
     * @param color the color to set
     */
    //% blockId="boxColor" block="set box color %color=colorNumberPicker"
    //% shim=box::color
    function color(color: number): void;

}
declare namespace torus {
    /**
     * Rotates the torus
     * @param axis the axis to rotate on
     * @param angle the angle to rotate by
     */
    //% blockId="torusRotate" block="rotate torus on axis %axis|by %angle degrees"
    //% angle.min=-180 angle.max=180
    //% shim=torus::rotate
    function rotate(axis: Axis, angle: number): void;

    /**
     * Scales the torus
     * @param axis the axis to scale on
     * @param factor the factor to scale by
     */
    //% blockId="torusScale" block="scale torus on axis %axis|by %factor"
    //% shim=torus::scaling
    function scaling(axis: Axis, factor: number): void;

}
declare namespace cylinder {
    /**
     * Rotates the cylinder
     * @param axis the axis to rotate on
     * @param angle the angle to rotate by
     */
    //% blockId="cylinderRotate" block="rotate cylinder on axis %axis|by %angle degrees"
    //% angle.min=-180 angle.max=180
    //% shim=cylinder::rotate
    function rotate(axis: Axis, angle: number): void;

    /**
     * Scales the cylinder
     * @param axis the axis to scale on
     * @param factor the factor to scale by
     */
    //% blockId="cylinderScale" block="scale cylinder on axis %axis|by %factor"
    //% shim=cylinder::scaling
    function scaling(axis: Axis, factor: number): void;

}

// Auto-generated. Do not edit. Really.
