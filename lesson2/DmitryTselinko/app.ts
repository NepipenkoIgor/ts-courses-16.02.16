/*
1) Написать функцию summator(), которая суммирует переданные ей аргументы.
Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
*/
function summator<T extends string | number>(...elements: Array<T>): T;
function summator(...elements: Array<any>): any {
    return elements.reduce(function(x, y){
        return x + y;
    });
}

/*
2) Написать функцию getUnique(arr), которая принимает аргументом неограниченное число аргументов,
и возвращает массив уникальных элементов. Аргумент не должен изменяться.
Порядок элементов результирующего массива должен совпадать с порядком,
в котором они встречаются в оригинальной структуре. Специально обрабатывать значение NaN не обязательно.
*/
function getUnique<T extends string | number | boolean>(...elements: Array<T>): Array<T> {
    let result: Array<T> = [],
        i = 0;
    elements.forEach(function(el, i){
        if (elements.indexOf(el) === i) {
            result.push(el);
        }
    });
    return result;
}

/*
3) Улучшите класс с менюшкой добавив публичные методы
 getElem -возвращает елемент в котором генерится меню;
    toggle открыть/закрыть элемент меню по метке;
    close закрыть элемент меню по метке;
    open открыть элемент меню по метке

в интерфейсе реализуйте кнопками вызов этих методов ( например над меню)
P.S. для демонстрации
*/
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
        this.element.addEventListener('click', this.clickHandler.bind(this));
    }

    private execAction(el: HTMLElement, action: string = 'toggle') :boolean {
        let classList = el.classList,
            availableActions = ['add', 'remove', 'toggle'];
        if (availableActions.indexOf(action) === -1) {
            return false;
        }
        if (classList.contains('title')) {
            let parentLi = el.parentNode as HTMLElement,
                fn = parentLi.classList[action].bind(parentLi.classList);
            if (typeof fn !== 'function') {
                return false;
            }
            fn('menu-open');
        }
        return true;
    }

    protected clickHandler(e:MouseEvent):void {
        this.execAction(e.target as HTMLElement);
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

    public getElem(index: number): Element {
        return this.element.querySelectorAll('.title').item(index);
    }

    public toogle(el: HTMLElement): void {
        this.execAction(el);
    }

    public open(el: HTMLElement): void {
        this.execAction(el, 'add');
    }

    public close(el: HTMLElement): void {
        this.execAction(el, 'remove');
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
let renderedMenu = new Menu({element: <HTMLElement>element, menuList: menu})
let buttons = document.querySelector('.j-buttons');
buttons && buttons.addEventListener('click', function(e:MouseEvent){
    let target = e.target as HTMLElement,
        isButton = target.nodeName.toLowerCase() === 'button',
        action = target.getAttribute('data-action');
    if (isButton && action && typeof renderedMenu[action] === 'function') {
        renderedMenu[action](renderedMenu.getElem(0));
    }
});


/*
4) Реализуйте слайдер
http://learn.javascript.ru/task/slider
*/
class Slider {
    private innerLeft: number;
    private pressPosition: number;
    protected pointer: HTMLElement;
    constructor(protected element: HTMLElement) {
        this.pointer = <HTMLElement>element.querySelector('.j-pointer');
        this.updateRelative();
        this.addEventListeners();
    }

    private updateRelative(): void {
        this.innerLeft = this.pointer.offsetLeft - this.element.offsetLeft;
    }

    private addEventListeners(): void {
        this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.element.addEventListener('mouseout', this.onMouseOut.bind(this));
        this.element.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.pointer.addEventListener('mousedown', this.onMouseDown.bind(this));
    }

    private onMouseMove(e: MouseEvent): void {
        if (typeof this.pressPosition === 'number') {
            let delta = e.clientX - this.pressPosition,
                left = this.innerLeft + delta;
            if (left > 0 && left < this.element.offsetWidth) {
                this.pointer.style.left = this.innerLeft + delta + 'px';
            }
        }
    }

    private onMouseOut(e: MouseEvent): void {
        let target = <HTMLElement>e.target,
            toElement = <HTMLElement>e.toElement;
        if (!toElement.classList.contains('j-pointer') && !toElement.classList.contains('j-slider')) {
            this.pressPosition = null;
            this.updateRelative();
        }
    }

    private onMouseUp(e: MouseEvent): void {
        this.pressPosition = null;
    }

    private onMouseDown(e: MouseEvent): void {
        this.pressPosition = e.clientX;
    }
}

let sliderNode = document.querySelector('.j-slider');
let slider = new Slider(<HTMLElement>sliderNode);
