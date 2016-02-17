var firstMenu = [
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
                ]
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
var ContextMenu = (function () {
    function ContextMenu(menuItems, requireMenu) {
        this.addToggleToMenu = function () {
            console.log('add toggle');
        };
        this.buildMenuTree = function (menuItems) {
            console.log('building menu. menuItems', menuItems);
        };
        this.menuItems = menuItems;
        this.requireMenu = requireMenu;
        this.buildMenuTree(this.menuItems);
        this.addToggleToMenu();
    }
    return ContextMenu;
})();
var requireMenu = document.querySelector('.menu');
new ContextMenu(firstMenu, requireMenu);
//# sourceMappingURL=app.js.map