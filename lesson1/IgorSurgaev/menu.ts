type TMenuList = {title:string, items?:TMenuList[]};

let menuList:TMenuList[] = [
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

function generateMenu(menuList:TMenuList[]):string {
    let menuHtml:string = `<ul class="list">`;

    for (let menuItem of menuList) {

        let className:string = !!menuItem.items ? 'title' : '';

        menuHtml += `<li class="list__item"><a class="${className}">${menuItem.title}</a>`;

        menuItem.items && (menuHtml += generateMenu(menuItem.items));

        menuHtml += '</li>';
    }

    menuHtml += `</ul>`;

    return menuHtml;
}


let menuElem = document.getElementById('menu') as HTMLElement;

menuElem.innerHTML = generateMenu(menuList);

menuElem.onclick = (e:MouseEvent) => {

    let el = e.target as HTMLElement;

    let classlList = el.classList;

    if (classlList.contains('title')) {

        let parentLi = el.parentNode as HTMLElement;

        parentLi.classList.toggle('opened');

    }
};