/* если работаешь в области декларирования типов typeof не нужен
* type MenuItem = { title: string, items?: MenuItem[] }
* */
type MenuItem = { title: string, items?: typeof MenuItem[] };
/**
 * var MenuItem :{ title: string, items?: typeof MenuItem[] };
 * let menuItems: typeof MenuItem[]
 * */

let menuItems: MenuItem[] = [
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
/* no-shadowed-variable -> false либо по другому назвать*/
function generateMenu(menuItems: MenuItem[]): void {

  let menu: HTMLElement = document.querySelector('.menu') as HTMLElement;

  // generate menu
  function parseDataTree(menuItems: MenuItem[]): string {
    let html = `<ul>`;

    menuItems.forEach((menuItem: MenuItem) => {
      html += `<li>${menuItem.title}`;

      if (menuItem.items && menuItem.items.length > 0) {
        html += parseDataTree(menuItem.items);
      }
      html += `</li>`;
    });

    html += `</ul>`;

    return html;
  }

  menu.innerHTML = parseDataTree(menuItems);

  // add event listener
  menu.addEventListener('click', (event: MouseEvent) => {
    let element: HTMLElement = event.target as HTMLElement;
    if (element.firstElementChild && element instanceof HTMLLIElement) {
      element.classList.toggle('menu-closed');
    }
  });
}

generateMenu(menuItems);

