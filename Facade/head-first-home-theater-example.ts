// Subsystem classes representing various components of the Home Theater system
class Amplifier {
    on(): void {
        console.log("Amplifier is turned on");
    }

    setVolume(volume: number): void {
        console.log("Setting amplifier volume to", volume);
    }

    off(): void {
        console.log("Amplifier is turned off");
    }
}

class DvdPlayer {
    on(): void {
        console.log("DVD player is turned on");
    }

    play(movie: string): void {
        console.log("Playing DVD:", movie);
    }

    stop(): void {
        console.log("DVD player stopped");
    }

    off(): void {
        console.log("DVD player is turned off");
    }
}

class Projector {
    on(): void {
        console.log("Projector is turned on");
    }

    setInput(input: string): void {
        console.log("Setting projector input to", input);
    }

    off(): void {
        console.log("Projector is turned off");
    }
}

class TheaterLights {
    dim(level: number): void {
        console.log("Setting theater lights to dim level", level);
    }

    on(): void {
        console.log("Theater lights are turned on");
    }

    off(): void {
        console.log("Theater lights are turned off");
    }
}

class TVScreen {
    up(): void {
        console.log("Screen is up");
    }

    down(): void {
        console.log("Screen is down");
    }
}

// Facade class that provides a simplified interface to the Home Theater system
class HomeTheaterFacade {
    private amplifier: Amplifier;
    private dvdPlayer: DvdPlayer;
    private projector: Projector;
    private theaterLights: TheaterLights;
    private screen: TVScreen;

    constructor(
        amplifier: Amplifier,
        dvdPlayer: DvdPlayer,
        projector: Projector,
        theaterLights: TheaterLights,
        screen: TVScreen
    ) {
        this.amplifier = amplifier;
        this.dvdPlayer = dvdPlayer;
        this.projector = projector;
        this.theaterLights = theaterLights;
        this.screen = screen;
    }

    watchMovie(movie: string): void {
        console.log("Get ready to watch a movie...");
        this.theaterLights.dim(10);
        this.screen.down();
        this.projector.on();
        this.projector.setInput("DVD");
        this.amplifier.on();
        this.amplifier.setVolume(5);
        this.dvdPlayer.on();
        this.dvdPlayer.play(movie);
    }

    endMovie(): void {
        console.log("Shutting down the movie theater...");
        this.theaterLights.on();
        this.screen.up();
        this.projector.off();
        this.amplifier.off();
        this.dvdPlayer.stop();
        this.dvdPlayer.off();
    }
}

// Usage
const amplifier = new Amplifier();
const dvdPlayer = new DvdPlayer();
const projector = new Projector();
const theaterLights = new TheaterLights();
const tvscreen = new TVScreen();

const homeTheater = new HomeTheaterFacade(
    amplifier,
    dvdPlayer,
    projector,
    theaterLights,
    tvscreen
);

homeTheater.watchMovie("Avatar");
console.log("----");
homeTheater.endMovie();

/*
  Get ready to watch a movie...
Setting theater lights to dim level 10
Screen is down
Projector is turned on
Setting projector input to DVD        
Amplifier is turned on
Setting amplifier volume to 5
DVD player is turned on
Playing DVD: Avatar
----
Shutting down the movie theater...
Theater lights are turned on
Screen is up
Projector is turned off
Amplifier is turned off
DVD player stopped
DVD player is turned off
*/
