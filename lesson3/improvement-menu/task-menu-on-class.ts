/**
 * Created by igor on 1/10/16.
 */


/**
 * todo
 *
 */

/* tslint:disable */
type menu={ title: string, link?: string, items?: menu}[];
/* tslint:enable */
type menuOption = {element:HTMLElement, menuList: menu}
class Menu1 implements IMenu {
    protected element:HTMLElement;
    protected menuList: menu;
    protected listCount:number = 1;

    constructor(opt:menuOption) {
        let {element, menuList} = opt;
        this.element = element;
        this.menuList = menuList;
        this.element.innerHTML = this.generateMenuHTMl(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }


    /**
     * todo
     *
     */

    protected clickHandler(e:MouseEvent):void {
        let el = <HTMLElement>e.target;
        let classList = el.classList;
        if (classList.contains('title')) {
            let parentLi = <HTMLElement>el.parentNode;
            parentLi.classList.toggle('menu-open');
        }
    }

    protected generateMenuHTMl(menuList: menu):string {
        let z:string = `<ul>`;
        for (let a of menuList) {
            z += `<li ${a.items ? `class=list-${this.listCount++}` : ''}><a ${a.items ? 'class=title' : ''}
            ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += this.generateMenuHTMl(a.items) + `</li>`;
        }
        return z + `</ul>`;
    }
}

let menuTree: menu = [
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
let elem = <HTMLElement>document.querySelector('.menu');
/* tslint:disable */
let menu2 = new Menu1({element: elem, menuList: menuTree});
/* tslint:enable */

/**
 *  todo
 */

