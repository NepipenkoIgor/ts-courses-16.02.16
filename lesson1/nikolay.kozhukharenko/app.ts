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
/*хотелось бы увидеть без классов*/
class ContextMenu {
    private menuItems:menuListItems;
    private requireMenu:HTMLElement;
    private menu:HTMLElement;
    constructor(menuItems: menuListItems, requireMenu: HTMLElement) {
        this.menuItems = menuItems;
        this.requireMenu = requireMenu;
        this.menu = this.buildMenuTree(this.menuItems);
        this.requireMenu.appendChild(this.menu);
        this.addToggleToMenu(this.requireMenu);
    }
    /* метод или свойства?*/
    private addToggleToMenu = (menu):void => {
        menu.onclick = ((e):void => {
            let target = <HTMLElement>e.target;
            if (target.classList.contains('title')) {
                let parenLi = <HTMLElement>target.parentNode;
                parenLi.classList.toggle('menu-open');
            }
        });
    };
    /*create + append хуже чем innerHTML*/
    private buildMenuTree = (menuItems: menuListItems): HTMLElement => {
        let menuContainer = document.createElement('nav');
        for (let item of menuItems) {
            let menuListContainer = document.createElement('ul');
            let menuItemContainer =  document.createElement('li');
            let menuTitleContainer = document.createElement('a');
            menuTitleContainer.innerText = item.title;
            menuItemContainer.appendChild(menuTitleContainer);
            menuListContainer.appendChild(menuItemContainer);
            if (item.hasOwnProperty('items')) {
                menuTitleContainer.classList.add('title');
                menuListContainer.appendChild(this.buildMenuTree(item.items));
            }
            menuContainer.appendChild(menuListContainer);
        }
        return menuContainer;
    };
}


let requireMenu = <HTMLElement>document.querySelector('.menu');
new ContextMenu(firstMenu, requireMenu);