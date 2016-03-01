/*
3) Улучшите класс с менюшкой добавив публичные методы
 getElem -возвращает елемент в котором генерится меню;
    toggle открыть/закрыть элемент меню по метке;
    close закрыть элемент меню по метке;
    open открыть элемент меню по метке

в интерфейсе реализуйте кнопками вызов этих методов ( например над меню)
P.S. для демонстрации
*/

type menu = { title:string, link?:string, items?:menu}[];

type menuOpt = {element:HTMLElement, menuList:menu};

class Menu {
    protected element:HTMLElement;
    protected menuList:menu;

    constructor(opt:menuOpt) {
        let {element, menuList} = opt;
        this.element = element;
        this.menuList = menuList;
        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }

    public getElem():HTMLElement {
        return this.element;
    }

    public toggle(className:string):void {
        let list = document.getElementsByClassName(className);
        for (let i = 0; i < list.length; i++) {
            list[i].classList.toggle('menu-open');
        }
    }

    public open(className: string): void {
        let list = document.getElementsByClassName(className);
        for (let i = 0; i < list.length; i++) {
            list[i].classList.add('menu-open');
        }
    }

    public close(className: string): void {
        let list = document.getElementsByClassName(className);
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove('menu-open');
        }
    }

    protected clickHandler(e:MouseEvent):void {
        let el = e.target as HTMLElement;
        let classList = el.classList;
        if (classList.contains('title')) {
            let parentLi = el.parentNode as HTMLElement;
            parentLi.classList.toggle('menu-open');
        }
    }

    protected generateMenu(menuList:menu):string {
        let z:string = `<ul>`;
        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title' : ''}
            ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += this.generateMenu(a.items) + `</li>`
        }
        return z + `</ul>`
    }
}

let menu:menu = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
        ],
        },
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]
        },
        {
            title: 'Форель', items: [
            {title: 'Морская форель'}
        ]
        },
    ]
    }
];

let element = document.querySelector('.menu') as HTMLElement;
let renderedMenu = new Menu({element: element, menuList: menu})
