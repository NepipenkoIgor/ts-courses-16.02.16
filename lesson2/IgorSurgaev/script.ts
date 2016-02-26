function summator(...args: string[]): number;
function summator(...args: number[]): number;
function summator(...args: any[]): number {
    let sum:number = 0;
    for (let arg of args) {
        sum += parseInt(arg);
    }
    return sum;
}

console.log(1, 2, 3, 4);
console.log ('4', '3', '2', '1');



type TArgs = string | number | boolean;
// есть еще какой-то формат записи для getUnique<T extends a> ?
// 3 и '3' - добавляем что-то одно или оба?

function getUniques(...args:TArgs[]):TArgs[] {
    let uniqueArr:TArgs[] = [];
    for (let arg of args) {
        !~uniqueArr.indexOf(arg) && uniqueArr.push(arg);
    }
    return uniqueArr;
}

console.log(getUniques(1,'1', 2, 3, 3, true, '3', 4, 5, 8,8,7));