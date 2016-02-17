type menuList = { title:string, items?: menuList}[];

let menu:menuList = [
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

function generateMenu(menu:menuList):string {
    let res = '';

    for (let item of menu) {
        let title = item.title;
        let items = item.items;
        if (items) {
            res += `<li class="item"><span class="title js-title">${title}</span>`;
            res += `<ul class="menu">${generateMenu(items)}</ul>`;
        } else {
            res += `<li class="item"><span class="title last">${title}</span>`;
        }
        res += '</li>';
    }

    return res;
}

let res = generateMenu(menu);

let menuContainer = document.querySelector('#menu') as HTMLElement;
menuContainer.innerHTML = menuContainer.innerHTML + `<ul class="menu">${res}</ul>`;

menuContainer.addEventListener('click', function(ev:MouseEvent) {
    let targ = ev.target as HTMLElement;
    if (targ.classList.contains('js-title')) {
        let parent = targ.parentNode as HTMLElement;
        if (parent.querySelector('.menu')) {
            parent.classList.toggle('mod-open');
        }
    }
});