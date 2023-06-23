/*
Imagine a file system. A file system consists of files and folders. A folder can subsequently contain folders and or files, while a file does not have any more items in it. Should this sound confusing, just observe your computer's file system and come back to us.

We're going to build a mock file system with the ability to print. We're not going to add more functionality here because it takes away from the point of studying design patterns, however the reader may adapt their needs to our example should they be interested. 
*/

abstract class FileSystemComponent {
    add(filesystemComponent: FileSystemComponent): void {
        throw new Error("Unsupported Operation");
    }
    print(): void {
        throw new Error("Unsupported Operation");
    }
}

class MockFile extends FileSystemComponent {
    private name: string;
    private description: string;
    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }
    print(): void {
        console.log(`${this.name}: ${this.description}`);
    }
}

class MockFolder extends FileSystemComponent {
    private name: string;
    private description: string;
    private folderContents: FileSystemComponent[];
    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
        this.folderContents = [];
    }
    add(filesystemComponent: FileSystemComponent): void {
        this.folderContents.push(filesystemComponent);
    }
    print(): void {
        console.log(`${this.name}: ${this.description}`);
        for (const content of this.folderContents) {
            content.print();
        }
    }
}

const folder1 = new MockFolder("folder1", "description of folder 1");
folder1.add(new MockFile("file1", "file 1 description"));
folder1.add(new MockFile("file2", "file 2 description"));

const folder2 = new MockFolder("folder2", "description of folder 2");
folder2.add(new MockFile("file3", "file 3 description"));

folder1.add(folder2);

folder1.print();

/*
folder1: description of folder 1
file1: file 1 description
file2: file 2 description
folder2: description of folder 2
file3: file 3 description
*/
