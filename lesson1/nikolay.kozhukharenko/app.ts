type menuListItems = { title: string, items?: menuListItems  }[]

let firstMenu:menuListItems = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие',
                items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
                ],
            },
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель',
                items: [
                    { title: 'Морская форель' }
                ]
            },
        ]
    },
    {
        title: 'Звери'
    }
];

class ContextMenu {
    private menuItems:menuListItems;
    private requireMenu:HTMLElement;
    constructor(menuItems: menuListItems, requireMenu: HTMLElement) {
        this.menuItems = menuItems;
        this.requireMenu = requireMenu;
        let menu = this.buildMenuTree(this.menuItems);
        requireMenu.appendChild(menu);
        console.log('menu', menu);
        this.addToggleToMenu();
    }
    private addToggleToMenu = ():void => {
        console.log('add toggle');
    };
    private buildMenuTree = (menuItems: menuListItems):HTMLElement => {
        let menuContainer = document.createElement('ul');
        let menuItemContainer:HTMLElement;
        for (let item of menuItems) {
            menuItemContainer =  document.createElement('li');
            if (item.hasOwnProperty('items')) {
                menuItemContainer.appendChild(this.buildMenuTree(item.items));
            } else {
                menuItemContainer.innerHTML = `<li><a>${item.title}</a></li>`;
            }
            menuContainer.appendChild(menuItemContainer);
        }
        return menuContainer;
    };
}


let requireMenu = <HTMLElement>document.querySelector('.menu');
new ContextMenu(firstMenu, requireMenu);