/**
 * Created by Alexey on 19.02.2016.
 */

/**
 * 3) Улучшите класс с менюшкой добавив публичные методы
 * getElem -возвращает елемент в котором генерится меню;
 * toggle открыть/закрыть элемент меню по метке;
 * close закрыть элемент меню по метке;
 * open открыть элемент меню по метке
 */

type menuListType = { title:string, items?:menuListType }[];
type menuOptions = { element:HTMLElement };

/**
 * тут не вижу описание публичных методов, которые в заданиии
 * доделай toggle,close,open
 * Если не совсем понятно задание, напиши
 */

interface IMenu {
    menuList:menuListType;
    menuBlock:HTMLElement;
    getElem():void;
}

class Menu implements IMenu {
    /**
     * menuList надо передавать как параметр в класс, а ты жестко вшил его
     * Я хочу использовать твой класс со своими пунктами но не могу
     */
    public menuList:menuListType = [
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
    public menuBlock:HTMLElement;

    constructor(options:menuOptions) {
        this.menuBlock = options.element as HTMLElement;
        this.menuBlock.innerHTML = this._generateMenu(this.menuList);
    }

    public getElem():void {
        console.log(this.menuBlock);
    }

    public toggle(e:MouseEvent) {
        e.preventDefault();
        let item = e.target as HTMLElement,
            parent = item.parentNode as HTMLElement;
        if (item.className === 'title') {
            parent.classList.toggle('show');
        }
    }

    private _generateMenu(list:menuListType):string {
        let templateMenu:string = `<ul>`;
        for (let el of list) {
            templateMenu += `<li><a class="title" href="#">${el.title}</a>`;
            if (typeof el.items !== 'undefined') {
                templateMenu += this._generateMenu(el.items);
            }
            templateMenu += `</li>`;
        }
        templateMenu += `</ul>`;
        return templateMenu;
    }

}

let elementMenu = document.querySelector(`[data-menu='toggle-menu']`) as HTMLElement;
let btnGetElem = document.querySelector(`[data-action='get-elem']`) as HTMLElement;

let menu = new Menu({
    element: elementMenu
});

btnGetElem.addEventListener('click', menu.getElem.bind(menu));
elementMenu.addEventListener('click', menu.toggle.bind(menu));

/**
 1) Написать функцию summator(), которая суммирует переданные ей аргументы.
 Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
 **/

/**
* 
* Здесь использование generics можно, но лучше не усложнять и написать 
*/
type TSum = string|number;
function summator(...arr:TSum[]):TSum {
    let result;
    /**
     * не забывай писать типы
     * как я добавил ниже и для аргументов и для возвращаемого значения
     */
    result = arr.reduce((prev:TSum, curr:TSum):TSum => {
        return prev + curr;
    })
    return result;
}

console.log('summator number result: ', summator(1, 2, 3, 4, 5, 6, 7, 10));
console.log('summator string result: ', summator('hello, ', 'summator', '!'));


/**
 2) Написать функцию getUnique(arr), которая принимает аргументом неограниченное число аргументов,
 и возвращает массив уникальных элементов. Аргумент не должен изменяться.
 Порядок элементов результирующего массива должен совпадать с порядком,
 в котором они встречаются в оригинальной структуре. Специально обрабатывать значение NaN не обязательно.
 **/

type TArgsArr = (string|number|boolean)[];

/**
 * почему бы вместо any не описать TArgsArr как возвращаемое значение
 * ты же знаешь что возвращается
 *
 */

function getUnique(...a:TArgsArr):TArgsArr {
    let result:TArgsArr = [];
    for (let item of a) {
        if (result.indexOf(item) === -1) result.push(item);
    }
    return result;
}

console.log('getUnique result:', getUnique(1, 2, 3, 5, 5, 'www', 6, 6, 7, 8, 9, 9, true, true, 'www'));


/**
 4) Реализуйте слайдер
 http://learn.javascript.ru/task/slider
 **/

/**
 * подумай все ли методы публичные ? 
 * может стоит их делать protected хотя бы
 * Публичные методы - это те которые должны использовать другие виджеты у твоего
 * А если такого взаимодействия нет, то не надо все делать публичным
 * Изолируй свой виджет( класс)
 */

interface ISlider {
    slider:HTMLElement,
    sliderRange:HTMLElement,
    range(e:MouseEvent):void
}

class Slider implements ISlider {

    public slider:HTMLElement;
    public sliderRange:HTMLElement;
    private sliderCoords:any;
    private shiftX:number;

    constructor(options) {
        this.slider = options.element as HTMLElement;
        this.sliderRange = this.slider.querySelector('.slider-range') as HTMLElement;
        this.sliderRange.addEventListener('mousedown', this.range.bind(this));
    }

    /* а нужно ли например этот метод делать публичным? по идее здесь можно прекрасно обойтись только приватными. */
    public range(e:MouseEvent):void {

        this.sliderCoords = this._getCoords(this.slider);
        this.shiftX = e.pageX - this._getCoords(this.sliderRange).left;

        document.onmousemove = (e:MouseEvent) => {
            this._moveAt(e);
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };

        this.sliderRange.ondragstart = () => {
            return false;
        };

    }

    private _moveAt(e:MouseEvent):void {
        let newLeft = e.pageX - this.shiftX - this.sliderCoords.left,
            rightEdge = this.slider.offsetWidth - this.sliderRange.offsetWidth;
        if (newLeft < 0) {
            newLeft = 0;
        }
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        this.sliderRange.style.left = newLeft + 'px';
    }

    private _getCoords(element:HTMLElement):any {
        let box = element.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }

}

let slider = new Slider({
    element: document.querySelector(`[data-element='slider']`)
});