/**
 * Created by igor on 3/1/16.
 */

/**
 * method
 * declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
 * */

class MathLib {
    @logMethod
    public areaOfCircle(r:number):number {
        return Math.PI * r ** 2;
    }
}

function logMethod(target:any, key:string, descriptor:any):any {
    let originalDescriptor = descriptor.value;
    descriptor.value = function (...args:any[]):any {
        let b = args.map((a:any) => JSON.stringify(a)).join()
        let result = originalDescriptor.apply(this, args);
        let r = JSON.stringify(result);
        console.log(`Call:${key}(${b})=>${r}`);
        return result;
    }

    return descriptor;
}

let a = new MathLib();

a.areaOfCircle(3);


/**
 * property
 * declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
 * */

class Account {
    @logProperty
    public firstName:string;
    public lastName:string;

    constructor(firstName:string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

function logProperty(target:any, key:string):void {
    let _val = target[key];

    let getter = function ():typeof _val {
        console.log(`Get: ${key} => ${_val}`);
        return _val;
    }

    let setter = function (newVal:any):void {
        console.log(`Set: ${key} => ${newVal}`);
        _val = newVal;
    }

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })
}

let me = new Account('Igor', 'Nepipenko');

me.firstName = 'Vladimir'


/**
 * class
 * declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
 * */

@logClass
class Person {
    constructor(public name:string, public surname:string) {
    }
}

function logClass(target:any):any {
    return () => {
        console.log(`New instance of ${target.name}`)
        return target;
    }
}

let firstPerson = new Person('Igor', 'Nepipenko');
let secondPerson = new Person('Vlad', 'Zotke');


/**
 * args
 * declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
 * */


class PersonAccount {
    constructor(public name:string, public surname:string) {
    }

    @readMetaData
    public sayMessage(@logParametre msg:string):string {
        return `${this.name} ${this.surname} : ${msg}`
    }
}


function logParametre(target:any, key:string, index:number):void {
    console.log('!!!', key,target)
    let metadataKey = `__log_${key}_parameteres`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    } else {
        target[metadataKey] = [index];
    }
}

function readMetaData(target:any, key:string, descriptor:any):any {
    let metadataKey = `__log_${key}_parameteres`;
    let indices = target[metadataKey];
    let originalDescriptor = descriptor.value;
    descriptor.value = function (...args:any[]):any {
        console.log(`${key} arg[${indices}] : ${args[indices]}`);
        return originalDescriptor.apply(this, [args])
    }
    return descriptor;
}

let person = new PersonAccount('Igor', 'Nepipenko');
person.sayMessage('generics is good');
person.sayMessage('generics is good and we must use they');