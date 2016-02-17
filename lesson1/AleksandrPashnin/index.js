/**
 * var MenuItem :{ title: string, items?: typeof MenuItem[] };
 * let menuItems: typeof MenuItem[]
 * */
var menuItems = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие',
                items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
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
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель',
                items: [
                    { title: 'Морская форель' }
                ]
            },
        ]
    }
];
function generateMenu(menuItems) {
    var menu = document.querySelector('.menu');
    // generate menu
    function parseDataTree(menuItems) {
        var html = "<ul>";
        menuItems.forEach(function (menuItem) {
            html += "<li>" + menuItem.title;
            if (menuItem.items && menuItem.items.length > 0) {
                html += parseDataTree(menuItem.items);
            }
            html += "</li>";
        });
        html += "</ul>";
        return html;
    }
    menu.innerHTML = parseDataTree(menuItems);
    // add event listener
    menu.addEventListener('click', function (event) {
        var element = event.target;
        if (element.firstElementChild && element instanceof HTMLLIElement) {
            element.classList.toggle('menu-closed');
        }
    });
}
generateMenu(menuItems);
