// Command interface
interface Command {
    execute(): void;
    undo(): void;
}

// Receiver class
class Light {
    on(): void {
        console.log("Light is on.");
    }

    off(): void {
        console.log("Light is off.");
    }
}

// Concrete command classes
class LightOnCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.on();
    }

    undo(): void {
        this.light.off();
    }
}

class LightOffCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.off();
    }

    undo(): void {
        this.light.on();
    }
}

// Invoker class
class RemoteControl {
    private commands: { [slot: number]: Command } = {};
    private lastCommand?: Command;

    setCommand(slot: number, command: Command): void {
        this.commands[slot] = command;
    }

    pressButton(slot: number): void {
        if (slot in this.commands) {
            const command = this.commands[slot];
            command.execute();
            this.lastCommand = command;
        }
    }

    pressUndoButton(): void {
        if (this.lastCommand) {
            this.lastCommand.undo();
        }
    }
}

// Usage example
const light = new Light();
const lightOn = new LightOnCommand(light);
const lightOff = new LightOffCommand(light);

const remote = new RemoteControl();
remote.setCommand(0, lightOn);
remote.setCommand(1, lightOff);

remote.pressButton(0); // Turns the light on
remote.pressUndoButton(); // Undoes the last command (turns the light off)
