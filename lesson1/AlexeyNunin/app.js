/**
 * Created by Alexey on 19.02.2016.
 */
var menuList = [
    {
        title: 'Животные', items: [
            {
                title: 'Млекопитающие', items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие', items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
                ],
            },
        ]
    },
    {
        title: 'Рыбы', items: [
            {
                title: 'Аквариумные', items: [
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель', items: [
                    { title: 'Морская форель' }
                ]
            },
        ]
    }
];
var menu = document.querySelector("[data-menu='toggle-menu']");
menu.innerHTML = generateMenu(menuList);
menu.addEventListener('click', toggleMenu, false);
function generateMenu(list) {
    var templateMenu = "<ul>";
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var el = list_1[_i];
        templateMenu += "<li><a class=\"title\" href=\"#\">" + el.title + "</a>";
        if (typeof el.items !== 'undefined') {
            templateMenu += generateMenu(el.items);
        }
        templateMenu += "</li>";
    }
    templateMenu += "</ul>";
    return templateMenu;
}
function toggleMenu(e) {
    e.preventDefault();
    var item = e.target, parent = item.parentNode;
    if (item.className === 'title') {
        parent.classList.toggle('show');
    }
}
