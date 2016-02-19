/**
 * Created by igor on 2/19/16.
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

let element = document.querySelector('.menu');
let renderedMenu = new Menu({element: element, menuList: menu})