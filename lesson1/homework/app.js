var menu = [
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
function generateMenu(menu) {
    var res = '';
    for (var _i = 0; _i < menu.length; _i++) {
        var item = menu[_i];
        var title = item.title;
        var items = item.items;
        if (items) {
            res += "<li class=\"item\"><span class=\"title js-title\">" + title + "</span>";
            res += "<ul class=\"menu\">" + generateMenu(items) + "</ul>";
        }
        else {
            res += "<li class=\"item\"><span class=\"title last\">" + title + "</span>";
        }
        res += '</li>';
    }
    return res;
}
;
var res = generateMenu(menu);
var menuContainer = document.querySelector('#menu');
menuContainer.innerHTML = menuContainer.innerHTML + ("<ul class=\"menu\">" + res + "</ul>");
menuContainer.addEventListener('click', function (ev) {
    var targ = ev.target;
    if (targ.classList.contains('js-title')) {
        var parent_1 = targ.parentNode;
        if (parent_1.querySelector('.menu')) {
            parent_1.classList.toggle('mod-open');
        }
    }
});
