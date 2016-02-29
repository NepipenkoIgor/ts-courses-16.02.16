/*
 2) Написать функцию getUnique(arr), которая принимает аргументом неограниченное число аргументов,
 и возвращает массив уникальных элементов. Аргумент не должен изменяться.
 Порядок элементов результирующего массива должен совпадать с порядком,
 в котором они встречаются в оригинальной структуре. Специально обрабатывать значение NaN не обязательно.
 */

type primitive = string | number | boolean;

function getUnique(...elements:primitive[]):primitive[] {
    let res = [];

    for (let elem of elements) {
        if (res.indexOf(elem) === -1) {
            res.push(elem);
        }
    }

    return res;
};


console.log(getUnique(1, 1, 2 ,true, ' фывы', true, ' фывы' ));