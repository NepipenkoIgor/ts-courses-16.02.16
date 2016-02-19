/**
 * Created by igor on 2/16/16.
 */

type TMenuItem = {title: string; items?: Array<TMenuItem>};

/*use let or const*/
var menuList: Array<TMenuItem> = [
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
/*Лучше было использовать одну рекурсию без оберток */
function generateMenu<T extends TMenuItem>(list: Array<T>):string {
    let generateHTMLFromItem = (item: T): string => {
            let result: string = `<ul>`;
            result += `<li><a class=title>${item.title}</a>`;
            if (Array.isArray(item.items)) {
                result += generateHTMLFromList(<Array<T>>item.items);
            }
            result += `</ul>`;
            return result;
        },
        generateHTMLFromList = (list: Array<T>): string => {
            let r:string = "";
            for (let a of list) {
                r += generateHTMLFromItem(a);
            }
            return r;
        };
    return generateHTMLFromList(list);
}

let navMenu = <HTMLElement>document.querySelector('.menu');
navMenu.innerHTML = generateMenu<TMenuItem>(menuList);
navMenu.onclick = (e:MouseEvent)=> {
    let el = <HTMLElement>e.target;
    let classlList = el.classList;
    if (classlList.contains('title')) {
        let parenLi = <HTMLElement>el.parentNode;
        parenLi.classList.toggle('menu-open')
    }
};
