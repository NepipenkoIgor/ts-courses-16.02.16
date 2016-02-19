type menuList = Array<{title: string, items?: menuList}>
let menu:menuList = [
    {
        "title": "Животные",
        "items": [
            {
                "title": "Млекопитающие",
                "items": [
                    {
                        "title": "Коровы"
                    },
                    {
                        "title": "Ослы"
                    },
                    {
                        "title": "Собаки"
                    },
                    {
                        "title": "Тигры"
                    }
                ]
            },
            {
                "title": "Другие",
                "items": [
                    {
                        "title": "Змеи"
                    },
                    {
                        "title": "Птицы"
                    },
                    {
                        "title": "Ящерицы"
                    }
                ]
            }
        ]
    },
    {
        "title": "Рыбы",
        "items": [
            {
                "title": "Аквариумные",
                "items": [
                    {
                        "title": "Гуппи"
                    },
                    {
                        "title": "Скалярии"
                    }
                ]
            },
            {
                "title": "Форель",
                "items": [
                    {
                        "title": "Морская форель"
                    }
                ]
            }
        ]
    }
];

function generateMenu(menu:menuList):string {
    let menuHtml:string = `<ul>`;

    for (let menuItem of menu) { // {title: 'Birds', items: [...]}
        let className = menuItem.items && 'title';
        // Title
        menuHtml += `<li><a class="${className}">${menuItem.title}</a>`;

        // Items
        if(menuItem.items) {
            menuHtml += generateMenu(menuItem.items);
        }

        menuHtml += '</li>';
    }

    menuHtml += `</ul>`;

    return menuHtml;
}



let navMenu = <HTMLElement>document.querySelector('.menu');
navMenu.innerHTML = generateMenu(menu);
navMenu.onclick = (e:MouseEvent)=> {
    let el = <HTMLElement>e.target;
    let classlList = el.classList;
    if (classlList.contains('title')) {
        let parenLi = <HTMLElement>el.parentNode;
        parenLi.classList.toggle('menu-open')
    }
};
