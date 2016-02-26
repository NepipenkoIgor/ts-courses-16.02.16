interface IOpts {
    elem: HTMLElement,
    control: HTMLElement
}

interface IBoxCoordinates {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

class Slider {
    elem:HTMLElement = null;
    control:HTMLElement = null;
    controlWidth:number = 0;

    constructor(opts: IOpts) {
        this.elem = opts.elem;
        this.control = opts.control;
        this.controlWidth = this.control.clientWidth;
        this.attachHandlers();
    }

    static getCoords(elem: HTMLElement): IBoxCoordinates {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            bottom: box.bottom + pageYOffset,
            left: box.left + pageXOffset,
            right: box.right + pageXOffset
        };
    }

    private moveAt(cursorPositionX: number) {
        let boundaries = this.getBoundaries();

        let controlOffset = cursorPositionX - boundaries.left;

        switch (true) {
            case controlOffset <= 0:
                this.control.style.left = 0 + 'px';
                break;
            case controlOffset >= boundaries.right - this.controlWidth - boundaries.left:
                this.control.style.left = boundaries.right - boundaries.left - this.controlWidth + 'px';
                break;
            default:
                this.control.style.left = cursorPositionX - boundaries.left - this.controlWidth / 2 + 'px';
        }
    }

    private attachHandlers() {
        var self = this;

        this.elem.addEventListener('mousedown', (e) => {

            self.moveAt(e.pageX);

            let onMousemove = (e) => {
                self.moveAt(e.pageX);
            };

            let onMouseup = (e) => {
                document.removeEventListener('mousemove', onMousemove);
                document.removeEventListener('mouseup', onMouseup);
            };

            document.addEventListener('mousemove', onMousemove);
            document.addEventListener('mouseup', onMouseup);
        });
    }

    private getBoundaries(): {left: number; right: number;} {
        let left = Slider.getCoords(this.elem).left;
        let right = Slider.getCoords(this.elem).right;

        return {left, right};
    }
}

let slider = new Slider({elem: document.getElementById('slider'), control: document.getElementById('control')});