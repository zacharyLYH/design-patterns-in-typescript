abstract class MenuComponent {
    // Common operations for menu items and menu groups
    add(menuComponent: MenuComponent): void {
        throw new Error("Unsupported Operation");
    }

    remove(menuComponent: MenuComponent): void {
        throw new Error("Unsupported Operation");
    }

    getChild(index: number): MenuComponent {
        throw new Error("Unsupported Operation");
    }

    getName(): string {
        throw new Error("Unsupported Operation");
    }

    getDescription(): string {
        throw new Error("Unsupported Operation");
    }

    getPrice(): number {
        throw new Error("Unsupported Operation");
    }

    isVegetarian(): boolean {
        throw new Error("Unsupported Operation");
    }

    print(): void {
        throw new Error("Unsupported Operation");
    }
}

class MenuItem extends MenuComponent {
    constructor(
        private name: string,
        private description: string,
        private vegetarian: boolean,
        private price: number
    ) {
        super();
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getPrice(): number {
        return this.price;
    }

    isVegetarian(): boolean {
        return this.vegetarian;
    }

    print(): void {
        console.log(
            `Menu Item: ${this.name}, ${this.description}, Vegetarian: ${
                this.vegetarian ? "Yes" : "No"
            }, Price: $${this.price.toFixed(2)}`
        );
    }
}

class MenuGroup extends MenuComponent {
    private menuComponents: MenuComponent[] = [];
    private name: string;
    private description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }

    add(menuComponent: MenuComponent): void {
        this.menuComponents.push(menuComponent);
    }

    remove(menuComponent: MenuComponent): void {
        const index = this.menuComponents.indexOf(menuComponent);
        if (index !== -1) {
            this.menuComponents.splice(index, 1);
        }
    }

    getChild(index: number): MenuComponent {
        return this.menuComponents[index];
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    print(): void {
        console.log(`\nMenu Group: ${this.name}, ${this.description}`);
        console.log("---------------------");
        this.menuComponents.forEach((menuComponent) => {
            menuComponent.print();
        });
    }
}

// Usage
const pancakeHouseCompositeMenu = new MenuGroup(
    "Pancake House Menu",
    "Breakfast Menu"
);
const dinerCompositeMenu = new MenuGroup("Diner Menu", "Lunch Menu");
const dessertMenu = new MenuGroup("Dessert Menu", "Dessert Menu");

pancakeHouseCompositeMenu.add(
    new MenuItem(
        "Pancake Breakfast",
        "Pancakes with scrambled eggs and bacon",
        false,
        6.99
    )
);
pancakeHouseCompositeMenu.add(
    new MenuItem(
        "Regular Pancake Breakfast",
        "Pancakes with fried eggs and sausage",
        false,
        5.99
    )
);
dinerCompositeMenu.add(
    new MenuItem(
        "Vegetarian BLT",
        "(Fakin') Bacon with lettuce & tomato on whole wheat",
        true,
        5.99
    )
);
dinerCompositeMenu.add(
    new MenuItem(
        "BLT",
        "Bacon with lettuce & tomato on whole wheat",
        false,
        6.99
    )
);
dessertMenu.add(
    new MenuItem("Apple Pie", "Apple pie with a flaky crust", true, 3.99)
);

const allMenus = new MenuGroup("All Menus", "All menus combined");
allMenus.add(pancakeHouseCompositeMenu);
allMenus.add(dinerCompositeMenu);
dinerCompositeMenu.add(dessertMenu);

allMenus.print();

/*
Menu Group: All Menus, All menus combined
---------------------

Menu Group: Pancake House Menu, Breakfast Menu
---------------------
Menu Item: Pancake Breakfast, Pancakes with scrambled eggs and bacon, Vegetarian: No, Price: $6.99
Menu Item: Regular Pancake Breakfast, Pancakes with fried eggs and sausage, Vegetarian: No, Price: $5.99

Menu Group: Diner Menu, Lunch Menu
---------------------
Menu Item: Vegetarian BLT, (Fakin') Bacon with lettuce & tomato on whole wheat, Vegetarian: Yes, Price: $5.99
Menu Item: BLT, Bacon with lettuce & tomato on whole wheat, Vegetarian: No, Price: $6.99

Menu Group: Dessert Menu, Dessert Menu
---------------------
Menu Item: Apple Pie, Apple pie with a flaky crust, Vegetarian: Yes, Price: $3.99
*/
