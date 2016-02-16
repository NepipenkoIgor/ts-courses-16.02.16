/**
 * Created by igor on 2/16/16.
 */
var menuList = [{
        title: 'Животные', items: [
            'кошки',
            'собаки'
        ]
    }, {
        title: 'Рыбы', items: [
            'Aкула',
            'Треска'
        ]
    }];
function generateMenu(list) {
    var z = "<ul>";
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var a = list_1[_i];
        z += "<li><a class=title>" + a.title + "</a>";
        z += '<ul>';
        for (var _a = 0, _b = a.items; _a < _b.length; _a++) {
            var item = _b[_a];
            z += "<li><a>" + item + "</a></li>";
        }
        z += "</li></ul>";
    }
    z += "</ul>";
    return z;
}
var navMenu = document.querySelector('.menu');
navMenu.innerHTML = generateMenu(menuList);
navMenu.onclick = function (e) {
    var el = e.target;
    var classlList = el.classList;
    if (classlList.contains('title')) {
        var parenLi = el.parentNode;
        parenLi.classList.toggle('menu-open');
    }
};
