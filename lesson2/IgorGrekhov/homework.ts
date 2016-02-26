type stringOrNumber = number | string;

function summator(...args:stringOrNumber[]):number {

    let sum = 0;

    for (let z of args) {
        /**
         * z as string?? кажется ли
         */
        sum = sum + parseInt(z as string, 10);
    }

    return sum;
}

console.info(summator(1, '2', 3, '4', 5, '6'));
console.info(summator('1', 2));

/**
 Написать функцию getUnique(arr), которая принимает аргументом неограниченное число аргументов,
 и возвращает массив уникальных элементов. Аргумент не должен изменяться.
 Порядок элементов результирующего массива должен совпадать с порядком,
 в котором они встречаются в оригинальной структуре. Специально обрабатывать значение NaN не обязательно.
 */

let isUnique = (item:any, collection:any[]):boolean => {
    for (let z of collection) {
        if (z === item) return false;
    }

    return true;
};

let getUnique = (...arr:any[]):any[] => {

    let result = [];

    for (let z of arr) {
        if (isUnique(z, result)) {
            result.push(z);
        }
    }

    return result;
};

console.info(getUnique('ll', 1, 2, 4, 'll', 6, 5, 2, 'ddd'));