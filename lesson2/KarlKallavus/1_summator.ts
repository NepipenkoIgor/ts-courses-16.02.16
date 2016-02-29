// 1) Написать функцию summator(), которая суммирует переданные ей аргументы.
// Аргументы могут быть либо строкового либо числового типа.Количество их не ограничено

function summator(...elements:number[]):number;
function summator(...elements:string[]):number;
function summator(...elements:any[]):number {
    let sum = 0;
    for (let el of elements) {
        let parseEl = parseFloat(el);
        if (isNaN(parseEl)) {
            sum += 0;
            continue;
        }
        sum += parseEl;
    }
    return sum;
};

