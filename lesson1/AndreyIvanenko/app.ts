//@see https://github.com/jonathantneal/closest/blob/master/closest.js
(function (ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
            var element = this;
            while (element) {
                if (element.matches(selector)) {
                    break;
                }
                element = element.parentElement;
            }
            return element;
        };
}(Element.prototype));

var menuList:{title:string, items?: typeof menuList}[];
var menu:typeof menuList = [{
    title: 'Животные', items: [{
        title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]
    }, {
        title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'}
        ]
    }
    ]
}, {
    title: 'Рыбы', items: [{
        title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]
    }, {
        title: 'Форель', items: [
            {title: 'Морская форель'}
        ]
    }
    ]
}
];

const MENU_OPEN:string = 'menu__active';
const MENU_WITH_SUBMENU:string = 'menu__with-submenu';

const generateMenu = (list:typeof menuList):Element => {
    const ul = document.createElement('ul');
    for (let subList of list) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = subList.title;
        li.appendChild(a);
        if (subList.items != null) {
            li.className = MENU_WITH_SUBMENU;
            li.appendChild(generateMenu(subList.items));
        }
        ul.appendChild(li);
    }
    return ul;
};

const documentFragment:DocumentFragment = document.createDocumentFragment();
const ul:Element = generateMenu(menu);
ul.addEventListener('click', (e:MouseEvent) => {
    const target = e.target as Element & {closest: (selector:string) => Element};
    const li = target.closest('li');
    li.classList.toggle(MENU_OPEN);
});

documentFragment.appendChild(ul);
const nav = document.querySelector('nav.menu');
nav.appendChild(documentFragment);
