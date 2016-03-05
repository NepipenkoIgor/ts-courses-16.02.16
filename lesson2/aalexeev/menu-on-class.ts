type menu = { title:string, link?:string, items?:menu}[];

type menuOpt = {element:HTMLElement, menuList:menu};

class Menu {
    protected element:HTMLElement;
    protected menuList:menu;

    constructor(opt:menuOpt) {
        let {element, menuList} = opt;
        this.element = element;
        this.menuList = menuList;
        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', (this.clickHandler).bind(this));
        console.log(this.getNodeTree('Аквариумные'));
    }

    protected clickHandler(e:MouseEvent):void {
        let el = e.target as HTMLElement;
        let classList = el.classList;
        if (classList.contains('js-title')) {
            let parentLi = el.parentNode as HTMLElement;
            this.toggleNode(parentLi);
        }
    }

    protected generateMenu(menuList:menu):string {
        let z:string = `<ul class="menu">`;
        for (let a of menuList) {
            z += `<li class="item"><a data-node="${a.title}" class="title ${a.items ? 'js-title' : 'last'}"
            ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += this.generateMenu(a.items) + `</li>`
        }
        return z + `</ul>`
    }

    protected getNodeTree(name:string):HTMLElement[] {
        let node = this.element.querySelector(`[data-node="${name}"]`).parentNode as HTMLElement;
        let res = [];
        while (node !== this.element) {
            res.push(node);
            node = node.parentNode.parentNode as HTMLElement;
        }

        return res;
    }

    protected getNode(selector:string):HTMLElement {
        let titleElem = this.element.querySelector(`[data-node="${selector}"]`) as HTMLElement;
        return titleElem ? titleElem.parentNode as HTMLElement : null;
    }

    protected toggleNode(elem:HTMLElement):void {
        if (!elem) {
            return;
        }
        elem.classList.toggle('mod-open');
    }

    protected openNode(elem:HTMLElement):void {
        if (!elem) {
            return;
        }
        elem.classList.add('mod-open');
    }

    protected openNodeInDepth(elem:HTMLElement):void {
        let curNode = elem as HTMLElement;
        while (curNode !== this.element && curNode) {
            this.openNode(curNode);
            if (curNode && curNode.parentNode) {
                curNode = curNode.parentNode.parentNode as HTMLElement;
            } else {
                curNode = null;
            }
        }
    }

    protected closeNode(elem:HTMLElement):void {
        if (!elem) {
            return;
        }
        elem.classList.remove('mod-open');
    }

    protected closeNodeInDepth(elem:HTMLElement):void {
        if (!elem) {
            return;
        }
        elem.classList.remove('mod-open');
        const childNodes = elem.querySelectorAll('.item.mod-open') as HTMLCollection;
        for (let i = childNodes.length - 1; i >= 0; i--) {
        	this.closeNode(childNodes[i] as HTMLElement);
        }
    }


    public getElem():HTMLElement {
        return this.element;
    }

    public toggle(selector:string):void {
        const node = this.getNode(selector);
        //this.toggleNode(node);
        if (node && node.classList.contains('mod-open')) {
            this.closeNodeInDepth(node);
        } else {
            this.openNodeInDepth(node);
        }

    }

    public close(selector:string):void {
        const node = this.getNode(selector);
        this.closeNodeInDepth(node);
    }

    public open(selector:string):void {
        const node = this.getNode(selector);
        this.openNodeInDepth(node);
    }

}

const menu:menu = [
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

const menuContainer = document.querySelector('#menu') as HTMLElement;
const controls = document.getElementById('controls') as HTMLElement;
const renderedMenu = new Menu({element: menuContainer, menuList: menu});

for (let i = controls.children.length - 1; i >= 0; i--) {
	let btn = controls.children[i];
    btn.addEventListener('click', (ev:MouseEvent):void => {
        ev.preventDefault();
        const elem = ev.target as HTMLElement;
        let {method, target}= elem.dataset;
        if (renderedMenu[method]) {
            renderedMenu[method](target);
        }
    });
}

console.log('getElem -возвращает елемент в котором генерится меню;\n', renderedMenu.getElem());

