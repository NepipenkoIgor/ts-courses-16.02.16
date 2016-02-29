/*
 1) Написать функцию summator(), которая суммирует переданные ей аргументы.
 Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
 */
function summator(...args:string[]):number;
function summator(...args:number[]):number;
function summator(...args:any[]):number {
    /**
     * типизируйте аргументы
     * */
    return args.reduce((sum, cv) => sum += parseFloat(cv), 0);
}
console.log(summator('3', '3', '4.5'));
console.log(summator(5, 5, 2));


/*
 2) Написать функцию getUnique(arr), которая принимает аргументом неограниченное число аргументов,
 и возвращает массив уникальных элементов. Аргумент не должен изменяться.
 Порядок элементов результирующего массива должен совпадать с порядком,
 в котором они встречаются в оригинальной структуре. Специально обрабатывать значение NaN не обязательно.
 */

/* если используешь generics(обобщения) то нужно прокидывать типы */
type Primitives = string|number|boolean;
function getUnique<T extends Primitives>(arr:T[]):T[] {
    return arr.filter((item:T, index:number, self:T[]) => self.indexOf(item) === index);
}
console.log(getUnique(['1', 2, '2', 2, 3, 4, 'one', true, true, 'one']));


/*
 3) Улучшите класс с менюшкой добавив публичные методы
 getElem -возвращает елемент в котором генерится меню;
 toggle открыть/закрыть элемент меню по метке;
 close закрыть элемент меню по метке;
 open открыть элемент меню по метке

 в интерфейсе реализуйте кнопками вызов этих методов ( например над меню)
 P.S. для демонстрации
 */
type MenuItem = { title: string, link?: string, items?: MenuItem[] };
type MenuOptions = { rootElement: HTMLElement, menuItems: MenuItem[] };

class Menu {
    protected rootElement:HTMLElement;
    protected menuItems:MenuItem[];

    constructor(options:MenuOptions) {
        let {rootElement, menuItems} = options;

        this.menuItems = menuItems;
        this.rootElement = rootElement;
        this.rootElement.innerHTML = this.generateMenu(this.menuItems);
        this.rootElement.addEventListener('click', this.clickHandler.bind(this));
    }

    private isValidMenuItem(element:HTMLElement):boolean {
        return element.classList.contains('title');
    }

    protected clickHandler(event:MouseEvent):void {
        let el = event.target as HTMLElement;
        this.toggle(el);
    }

    protected generateMenu(menuItems:MenuItem[]):string {
        let z:string = `<ul>`;
        for (let a of menuItems) {
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

    public toggle(element:HTMLElement):void {
        if (this.isValidMenuItem(element)) {
            let parentLi = element.parentNode as HTMLElement;
            console.log(parentLi);
            parentLi.classList.toggle('menu-closed');
        }
    }

    public open(element:HTMLElement):void {
        if (this.isValidMenuItem(element)) {
            let parentLi = element.parentNode as HTMLElement;
            parentLi.classList.remove('menu-closed');
        }
    }

    public close(element:HTMLElement):void {
        if (this.isValidMenuItem(element)) {
            let parentLi = element.parentNode as HTMLElement;
            parentLi.classList.add('menu-closed');
        }
    }

    public findMenuItemByText(textContent:string):HTMLElement {
        let elements = document.querySelectorAll('.title');
        for (let i = 0, count = elements.length; i < count; i++) {
            let element = <HTMLElement>elements[i];
            if (element.textContent === textContent) {
                return element;
            }
        }

        return null;
    }

}

let menuItems:MenuItem[] = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {title: 'Коровы'},
                    {title: 'Ослы'},
                    {title: 'Собаки'},
                    {title: 'Тигры'}
                ]
            },
            {
                title: 'Другие',
                items: [
                    {title: 'Змеи'},
                    {title: 'Птицы'},
                    {title: 'Ящерицы'},
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
                    {title: 'Гуппи'},
                    {title: 'Скалярии'}
                ]
            },
            {
                title: 'Форель',
                items: [
                    {title: 'Морская форель'}
                ]
            },
        ]
    }
];

let menuOptions:MenuOptions = {
    rootElement: document.querySelector('.menu') as HTMLElement,
    menuItems: menuItems
};

let menu:Menu = new Menu(menuOptions);

// Buttons
let toggleBtn:HTMLButtonElement = document.querySelector('#toggleBtn') as HTMLButtonElement;
let openBtn:HTMLButtonElement = document.querySelector('#openBtn') as HTMLButtonElement;
let closeBtn:HTMLButtonElement = document.querySelector('#closeBtn') as HTMLButtonElement;

toggleBtn.addEventListener('click', (event:MouseEvent) => {
    let element:HTMLElement = menu.findMenuItemByText('Другие');
    menu.toggle(element);
});
openBtn.addEventListener('click', (event:MouseEvent) => {
    let element:HTMLElement = menu.findMenuItemByText('Аквариумные');
    menu.open(element);
});
closeBtn.addEventListener('click', (event:MouseEvent) => {
    let element:HTMLElement = menu.findMenuItemByText('Аквариумные');
    menu.close(element);
});


/*
 4) Реализуйте слайдер
 http://learn.javascript.ru/task/slider
 */
type SliderOptions = {
    rootElement: HTMLElement,
    width?: number
}

type ElementCoordinates = {
    top: number,
    left: number
}

class Slider {

    protected rootElement:HTMLElement;
    protected sliderElement:HTMLElement;
    protected toggleElement:HTMLElement;
    protected template:string = `
    <div class="slider">
      <div class="slider__toggle"></div>
    </div>
  `;

    protected width:number;
    protected sliderCoordinates:ElementCoordinates;
    protected toggleCoordinates:ElementCoordinates;
    protected toggleShift:number;

    constructor(options:SliderOptions) {
        this.rootElement = options.rootElement;
        this.width = options.width || 400;

        this.rootElement.innerHTML = this.template;
        this.sliderElement = <HTMLElement>document.querySelector('.slider');
        this.sliderElement.style.width = this.width + 'px';

        this.toggleElement = <HTMLElement>document.querySelector('.slider__toggle');
        this.toggleElement.addEventListener('mousedown', this);
    }
    /**
     * почему бы не добавить модификаторы и let/const
     * */
    getElementCoordinates(element:HTMLElement):ElementCoordinates {
        var box = element.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }

    handleEvent(event:Event) {
        switch (event.type) {
            case 'mousedown':
                this.mouseDownHandler(<MouseEvent>event);
                break;

            case 'mouseup':
                this.mouseUpHandler();
                break;

            case 'mousemove':
                this.mouseMoveHandler(<MouseEvent>event);
                break;
        }
    }

    mouseDownHandler(event:MouseEvent) {
        this.sliderCoordinates = this.getElementCoordinates(this.sliderElement);
        this.toggleCoordinates = this.getElementCoordinates(this.toggleElement);
        this.toggleShift = event.pageX - this.toggleCoordinates.left;

        document.addEventListener('mouseup', this);
        document.addEventListener('mousemove', this);
    }

    mouseMoveHandler(event:MouseEvent) {
        this.moveToggle(event);
    }

    mouseUpHandler() {
        document.removeEventListener('mousemove', this);
        document.removeEventListener('mouseup', this);
    }

    moveToggle(event:MouseEvent) {
        let left = event.pageX - this.sliderCoordinates.left - this.toggleShift;
        if (left < 0) left = 0;
        if (left > this.width - this.toggleElement.clientWidth) left = this.width - this.toggleElement.clientWidth;
        this.toggleElement.style.left = left + 'px';
    }
}

let slider = new Slider({
    rootElement: <HTMLElement>document.querySelector('.slider-root')
});

