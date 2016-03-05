type Point = {
    top: number,
    left: number
}

class Slider {
    protected elem:HTMLElement;
    protected area: HTMLElement;
    protected control: HTMLElement;
    protected isListening: boolean;
    protected shift: number;
    protected areaPos: number;
    protected areaSize: number;

    constructor(elem:HTMLElement) {
        if (!elem) {
            return;
        }

        this.elem = elem;
        this.area = this.elem.querySelector('.js-slider-area') as HTMLElement;
        this.control = this.elem.querySelector('.js-slider-control') as HTMLElement;

        if (!this.area || !this.control) {
            return;
        }

        this.isListening = false;
        this.shift = parseInt(this.control.style.left, 10)|| 0;
        this.areaPos = this.getAreaPos().left;
        this.areaSize = this.area.offsetWidth;

        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.clearListeners = this.clearListeners.bind(this);

        this.control.addEventListener('click', (ev:MouseEvent):void => {
            ev.preventDefault();
            ev.stopPropagation();
            if (this.isListening) {
                this.clearListeners();
            } else {
                this.attachListeners();
            }
        });
    }

    protected attachListeners():void {
        if (this.isListening) {
            return;
        }
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('click', this.clearListeners);
        this.control.classList.add('mod-active');
        this.isListening = true;
    }

    protected clearListeners():void {
        if (!this.isListening) {
            return;
        }
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('click', this.clearListeners);
        this.control.classList.remove('mod-active');
        this.isListening = false;
    }

    protected mouseMoveHandler(ev:MouseEvent):void {
        this.shift = range(0, ev.pageX - this.areaPos, this.areaSize);
        this.control.style.left = `${this.shift}px`;
    }

    protected getAreaPos():Point {
        let box = this.area.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }
}

function range(min:number, val:number, max:number):number {
    if (val < min) {
        return min;
    }
    if (val > max) {
        return max;
    }
    return val;
}


const sliderElem = document.querySelector('.js-slider') as HTMLElement;
let slider = new Slider(sliderElem);