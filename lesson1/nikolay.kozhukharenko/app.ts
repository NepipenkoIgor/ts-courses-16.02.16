type menuListItems = { title: string, items?: menuListItems | { title: string } }[]

let firstMenu:menuListItems = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            { title: 'Коровы' },
            { title: 'Ослы' },
            { title: 'Собаки' },
            { title: 'Тигры' }
        ]
        },
        {
            title: 'Другие', items: [
            { title: 'Змеи' },
            { title: 'Птицы' },
            { title: 'Ящерицы' },
        ],
        },
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
            { title: 'Гуппи' },
            { title: 'Скалярии' }
        ]
        },
        {
            title: 'Форель', items: [
            { title: 'Морская форель' }
        ]
        },
    ]
    }
];

class ContextMenu {
    private menuItems:menuListItems;
    private requireMenu:HTMLElement;
    constructor(menuItems: menuListItems, requireMenu: HTMLElement) {
        this.menuItems = menuItems;
        this.requireMenu = requireMenu;
        this.buildMenuTree(this.menuItems);
        this.addToggleToMenu();
    }
    private addToggleToMenu = ():void => {
        console.log('add toggle');
    };
    private buildMenuTree = (menuItems: menuListItems):void => {
        console.log('building menu. menuItems', menuItems);
    };
}


let requireMenu = <HTMLElement>document.querySelector('.menu');
new ContextMenu(firstMenu, requireMenu);