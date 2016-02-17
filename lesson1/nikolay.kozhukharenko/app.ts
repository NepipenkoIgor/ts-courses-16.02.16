type menuList = { title: string, items?: menuList | { title: string } }[]

let firstMenu:menuList = [
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
    private menuItems:menuList;
    private requireMenu:HTMLElement;
    constructor(menuItems: menuList, requireMenu: HTMLElement) {
        this.menuItems = menuItems;
        this.requireMenu = requireMenu;
        this.buildMenuTree(this.menuItems);
        this.addToggleToMenu();
    }
    private addToggleToMenu = ():void => {
        console.log('add toggle');
    };
    private buildMenuTree = (menuItems: menuList):void => {
        console.log('building menu. menuItems', menuItems);
    };
}


let requireMenu = <HTMLElement>document.querySelector('.menu');
new ContextMenu(firstMenu, requireMenu);