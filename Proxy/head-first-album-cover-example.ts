interface AlbumCover {
    display(): void;
}

class RealAlbumCover implements AlbumCover {
    private album: string;

    constructor(album: string) {
        this.album = album;
        this.loadCoverFromDisk();
    }

    private loadCoverFromDisk(): void {
        console.log(`Initializing album cover for ${this.album}`);
        console.log(`Simulating long fetching operation...\n`);

        // Synchronously wait for 5 seconds using a while loop
        const startTime = Date.now();
        while (Date.now() - startTime < 5000) {
            // Do nothing, just wait
        }
    }

    public display(): void {
        console.log(`Displaying album cover for ${this.album}`);
    }
}

class AlbumCoverProxy implements AlbumCover {
    private album: string;
    private realAlbumCover: RealAlbumCover | null;

    constructor(album: string) {
        this.album = album;
        this.realAlbumCover = null;
    }

    public display(): void {
        if (this.realAlbumCover === null) {
            this.realAlbumCover = new RealAlbumCover(this.album);
        }
        this.realAlbumCover.display();
    }
}

// Usage
const albumCover: AlbumCover = new AlbumCoverProxy("The Beatles - Abbey Road");
albumCover.display();

/*
Initializing album cover for The Beatles - Abbey Road
Simulating long fetching operation...

Displaying album cover for The Beatles - Abbey Road
*/
