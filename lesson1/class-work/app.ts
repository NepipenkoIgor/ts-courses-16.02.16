/**
 * Created by igor on 2/16/16.
 */

type menuList={title:string,items:string[]}[]
let menuList:menuList = [{
    title: 'Животные', items: [
        'кошки',
        'собаки'
    ]
}, {
    title: 'Рыбы', items: [
        'Aкула',
        'Треска'
    ]
}]

function generateMenu(list:menuList):string {
    let z:string = `<ul>`;
    for (let a of list) {
        z += `<li><a class=title>${a.title}</a>`;
        z += '<ul>';
        for (let item of a.items) {
            z += `<li><a>${item}</a></li>`
        }
        z += `</li></ul>`
    }
    z += `</ul>`;
    return z;
}

let navMenu = <HTMLElement>document.querySelector('.menu');
navMenu.innerHTML = generateMenu(menuList);
navMenu.onclick = (e:MouseEvent)=> {
    let el = <HTMLElement>e.target;
    let classlList = el.classList;
    if (classlList.contains('title')) {
        let parenLi = <HTMLElement>el.parentNode;
        parenLi.classList.toggle('menu-open')
    }
};