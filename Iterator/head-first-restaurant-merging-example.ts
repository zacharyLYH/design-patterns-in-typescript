interface MyIterator<T> {
    hasNext(): boolean;
    next(): T;
}

interface Menu {
    createIterator(): MyIterator<string>;
}

class PancakeHouseMenu implements Menu {
    private menuItems: string[] = [
        "Pancake Breakfast",
        "Regular Pancake Breakfast",
    ];

    createIterator(): MyIterator<string> {
        return new PancakeHouseMenuIterator(this.menuItems);
    }
}

class DinerMenu implements Menu {
    private menuItems: Map<number, string> = new Map<number, string>();

    constructor() {
        this.addItem(1, "Vegetarian BLT");
        this.addItem(2, "BLT");
    }

    addItem(key: number, item: string): void {
        this.menuItems.set(key, item);
    }

    createIterator(): MyIterator<string> {
        return new DinerMenuIterator(this.menuItems);
    }
}

class PancakeHouseMenuIterator implements MyIterator<string> {
    private position: number = 0;

    constructor(private items: string[]) {}

    hasNext(): boolean {
        return this.position < this.items.length;
    }

    next(): string {
        const menuItem = this.items[this.position];
        this.position++;
        return menuItem;
    }
}

class DinerMenuIterator implements MyIterator<string> {
    private position: number = 0;

    constructor(private items: Map<number, string>) {}

    hasNext(): boolean {
        return this.position < this.items.size;
    }

    next(): string {
        const menuItem = this.items.get(this.position + 1);
        this.position++;
        return menuItem!;
    }
}

class Server {
    constructor(private pancakeHouseMenu: Menu, private dinerMenu: Menu) {}

    printMenu(): void {
        const pancakeIterator = this.pancakeHouseMenu.createIterator();
        const dinerIterator = this.dinerMenu.createIterator();

        console.log("MENU\n----\nBREAKFAST");
        this.printItems(pancakeIterator);

        console.log("\nLUNCH");
        this.printItems(dinerIterator);
    }

    private printItems(iterator: MyIterator<string>): void {
        while (iterator.hasNext()) {
            const menuItem = iterator.next();
            console.log(menuItem);
        }
    }
}

// Usage
const pancakeHouseMenu = new PancakeHouseMenu();
const dinerMenu = new DinerMenu();
const server = new Server(pancakeHouseMenu, dinerMenu);
server.printMenu();

/*
MENU
----
BREAKFAST
Pancake Breakfast
Regular Pancake Breakfast

LUNCH
Vegetarian BLT
BLT
*/
