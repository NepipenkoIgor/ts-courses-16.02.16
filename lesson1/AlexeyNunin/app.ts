/**
 * Created by Alexey on 19.02.2016.
 */

var menuListType: { title:string, items?: typeof menuListType }[];

let menuList:typeof menuListType = [
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

let menu = document.querySelector(`[data-menu='toggle-menu']`) as HTMLElement;

menu.innerHTML = generateMenu(menuList);

menu.addEventListener('click', toggleMenu, false);

function generateMenu(list:typeof menuListType):string {
  let templateMenu:string = `<ul>`;
  for (let el of list) {
    templateMenu += `<li><a class="title" href="#">${el.title}</a>`;
    if (typeof el.items !== 'undefined') {
      templateMenu += generateMenu(el.items);
    }
    templateMenu += `</li>`;
  }
  templateMenu += `</ul>`;
  return templateMenu;
}

function toggleMenu(e) {
  e.preventDefault();
  let item = e.target as HTMLElement,
      parent = item.parentNode as HTMLElement;
  if (item.className === 'title') {
    parent.classList.toggle('show');
  }
}