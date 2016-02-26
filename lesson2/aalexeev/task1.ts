/*
1) Написать функцию summator(), которая суммирует переданные ей аргументы.
    Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
*/
type stringNum = string | number;

function summator<T extends stringNum>(...elements:T[]): T;
function summator(...elements:any[]): any {
    if (!elements.length) {
        return '';
    }
    return elements.reduce((res:any, current:any) => {
        return res + current;
    });
}

console.log(summator());
console.log(summator(1, 1, 2, 3, 5, 8, 13));
console.log(summator("Эйяфьятлайокудль ", "эйяфьятлайокудляли, ", "эйяфьятлайокудляли,  ", "но ", "не ", "выэйяфьятлайокудляли. ", "\n", "Надо ", "эйяфьятлайокудль ", "переэйяфьятлайокудлевать ", "да ", "перевыэйяфьятлайокудлевать. "));
