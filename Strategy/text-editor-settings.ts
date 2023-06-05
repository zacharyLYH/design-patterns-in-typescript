/*
Imagine the settings on a text editor (VSCode, MSWord, Atom, Vim, etc..). 

This piece of code mocks "settings" on a text editing. To display the strength of the Strategy Pattern, the setting options displayed here have different behaviors for every setting. For example, the theme of an app could be light, dark, cyberpunk, etc. 

We'll not actually go the full distance and create the UI, instead only mocking its click. At the end, of every mock, we'll print a summary of the current state of all the settings.
*/

//declare the common features that all text editors have
interface Theme {
    theme: string;
}

interface Zoom {
    setZoom(curr: number): number;
}

interface Alignment {
    alignment: string;
}

//implement the strategies for each feature.
class DarkTheme implements Theme {
    theme: string;
    constructor() {
        this.theme = "Dark";
    }
}

class LightTheme implements Theme {
    theme: string;
    constructor() {
        this.theme = "Light";
    }
}

class ZoomIn implements Zoom {
    setZoom(curr: number): number {
        return curr + 1;
    }
}

class ZoomOut implements Zoom {
    setZoom(curr: number): number {
        return curr - 1;
    }
}

class AlignLeft implements Alignment {
    alignment: string;
    constructor() {
        this.alignment = "Left";
    }
}

class AlignRight implements Alignment {
    alignment: string;
    constructor() {
        this.alignment = "Right";
    }
}

class AlignMiddle implements Alignment {
    alignment: string;
    constructor() {
        this.alignment = "Middle";
    }
}

//Define a text editor and provide APIs to modify the strategies defined above
abstract class TextEditor {
    protected appTheme: Theme;
    protected appZoom: Zoom;
    protected appAlignment: Alignment;
    protected currZoom: number;
    protected sessionName: string;
    constructor(file_name: string) {
        this.currZoom = 0;
        this.appAlignment = new AlignLeft();
        this.appTheme = new LightTheme();
        this.appZoom = new ZoomIn();
        this.sessionName = file_name;
    }
    modifyTheme(theme: Theme): void {
        this.appTheme = theme;
    }
    modifyAlignment(alignment: Alignment): void {
        this.appAlignment = alignment;
    }
    modifyZoom(zoom: Zoom) {
        this.appZoom = zoom;
        this.currZoom = this.appZoom.setZoom(this.currZoom);
    }
    displaySettings(): void {
        console.log("Theme: ", this.appTheme.theme);
        console.log("Alignment: ", this.appAlignment.alignment);
        console.log("Zoom: ", this.currZoom);
        console.log(""); //new line
    }
    abstract printFileName(): void;
}

//define all the text editors you can think of
class MicrosoftWord extends TextEditor {
    constructor(file_name: string) {
        super(file_name);
    }
    printFileName(): void {
        console.log(this.sessionName + " is a Microsoft Word instance");
    }
}

class VSCode extends TextEditor {
    constructor(file_name: string) {
        super(file_name);
    }
    printFileName(): void {
        console.log(this.sessionName + " is a VSCode instance");
    }
}

//Watch it work

const mw_session1 = new MicrosoftWord("mw_session1");
mw_session1.modifyTheme(new DarkTheme());
mw_session1.modifyZoom(new ZoomIn());
mw_session1.modifyZoom(new ZoomIn());
mw_session1.modifyZoom(new ZoomIn());
//At this point, expect mw_sesion1 to have dark mode and 3 zoom
mw_session1.printFileName();
mw_session1.displaySettings();

const mw_session2 = new MicrosoftWord("mw_session2");
mw_session2.modifyZoom(new ZoomOut());
mw_session2.modifyAlignment(new AlignRight());
//At this point, expect mw_session2 to have a zoom of -1 and alignment of right
mw_session2.printFileName();
mw_session2.displaySettings();

const vscode_session1 = new VSCode("vscode_session1");
vscode_session1.modifyTheme(new DarkTheme());
vscode_session1.modifyZoom(new ZoomIn());
vscode_session1.modifyTheme(new LightTheme());
vscode_session1.modifyAlignment(new AlignMiddle());
//At this point, expect vscode_session1 to have a zoom of 1 and alignment of middle and theme light
vscode_session1.printFileName();
vscode_session1.displaySettings();

/* 
mw_session1 is a Microsoft Word instance
Theme:  Dark
Alignment:  Left
Zoom:  3

mw_session2 is a Microsoft Word instance
Theme:  Light
Alignment:  Right
Zoom:  -1

vscode_session1 is a VSCode instance
Theme:  Light
Alignment:  Middle
Zoom:  1
*/
