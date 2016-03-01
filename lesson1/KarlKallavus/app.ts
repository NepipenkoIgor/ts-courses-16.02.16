type menuList = Array<{ title: string, items?: menuList }>;

let menuList:menuList = [
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
]


function generateMenu(list: menuList): string {
    let z: string = `<ul>`;
    for (let a of list) {
        z += `<li><a class=title>${a.title}</a>`;
        if (a.items) {
            z += generateMenu(a.items);
        }
        z += `</li>`
    }
    z += `</ul>`;
    return z;
}

let navMenu = <HTMLElement>document.querySelector('.menu');
navMenu.innerHTML = generateMenu(menuList);
navMenu.onclick = (e: MouseEvent) => {
    let el = <HTMLElement>e.target;
    let classlList = el.classList;
    if (classlList.contains('title')) {
        let parenLi = <HTMLElement>el.parentNode;
        parenLi.classList.toggle('menu-open')
    }
};
