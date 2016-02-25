/**
 * Created by igor on 2/19/16.
 *
 *
 * эту не успел доделать, и не до конца понял задачу и набросал примерно
 */
type menu = { title:string, id?: string; link?:string, items?:menu}[];

type menuOpt = {element:HTMLElement, menuList:menu};

class Menu {
    protected element:HTMLElement;
    protected menuList:menu;

    public getElem(): HTMLElement {
        return this.element;
    }

    public static toggle(id: string) {
        let menuItem = document.getElementById(id);
        menuItem.classList.toggle('menu-open');
    }

    public static close(id: string) {
        document.getElementById(id).className = '';
    }

    public static open(id: string) {
        document.getElementById(id).className = 'menu-open';
    }

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

            z += `<li ${a.items ? 'id="' + a.id + '"': ''}><a ${a.items ? 'class=title ' : ''}
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
        title: 'Животные', id: 'animals', items: [
        {
            title: 'Млекопитающие', id: 'milk', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', id: 'reptilia', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
        ],
        },
    ]
    },
    {
        title: 'Рыбы', id: 'fish', items: [
        {
            title: 'Аквариумные', id: 'aquarium', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]
        },
        {
            title: 'Форель', id: 'forel', items: [
            {title: 'Морская форель'}
        ]
        },
    ]
    }
];

let element = document.getElementById('menu');
let renderedMenu = new Menu({element: element, menuList: menu});