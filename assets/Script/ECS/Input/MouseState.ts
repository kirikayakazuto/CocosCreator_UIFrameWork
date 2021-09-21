export enum ButtonState {
    pressed,
    released,
}

export class MouseState {
    public leftButton: ButtonState = ButtonState.released;
    public rightButton: ButtonState = ButtonState.released;

    public clone() {
        let mouseState = new MouseState();
        mouseState.leftButton = this.leftButton;
        mouseState.rightButton = this.rightButton;
        return mouseState;
    }
}