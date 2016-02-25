/**
 * Created by igor on 2/19/16.
 */

// function getAverage(...a:Array<number>):string {
//     let total = 0;
//     let count = 0;
//     for (let i = 0; i < a.length; i++) {
//         total += a[i];
//         count++;
//     }
//     let average = total / count;
//     return `Your average:${average}`;
// }
// console.log(getAverage(2, 4,5,6,7,8,10,20,12))
//
// function getMessage(msg:'Hellow'):string;
// function getMessage(msg:'Good day'):string;
// function getMessage(msg:string):string;
// function getMessage(msg:string):string {
//     switch (msg) {
//         case 'Hellow' :
//             return 'Mike';
//         case 'Good day' :
//             return 'Lena';
//         default :
//             return 'dance';
//     }
// }

// type a = string|number|boolean;
//
// function isInArray<T extends a>(arr:T[], ...elements:T[]):boolean {
//     let inArr = true;
//     for (let el of elements) {
//         if (arr.indexOf(el) === -1) {
//             inArr = false;
//             break;
//         }
//     }
//     return inArr;
// }
//
// console.log(isInArray<number>([1, 2, 34, 5, 6], 3, 7, 5))
// console.log(isInArray<number|boolean>([true, false, 1], 3, 7, 5))

// class Point {
//
//     constructor(public x:number, public y:number) {}
//
//     add(point:Point):any {
//         return new Point(this.x + point.x, this.y + point.y)
//     }
// }
//
// let p1 = new Point(0, 10);
// let p2 = new Point(1, 3);
// let p3 = p1.add(p2);

// class FooBase {
//     protected z:number;
//     private y:number;
//     public x:number;
// }
//
//
// let foo = new FooBase();
//
// class FooChild extends FooBase {
//     constructor() {
//         super();
//         this.x
//         this.z
//     }
// }


// class Some{
//     static instances:number=0;
//     constructor(){
//         Some.instances++;
//     }
// }
//
// let s1= new Some();
// let s2= new Some();
//
// console.log(Some.instances)
// console.log(s1.instances)
// console.log(s2.instances)


// abstract class A {
//     abstract b():void;
// }
//
// class B extends A {
//     public b():void {
//         console.log(1);
//     }
// }


// interface Ic {
//     b():void;
// }
//
// interface Ic1 {
//     c():void;
// }
//
// class B implements Ic, Ic1 {
//     public b():void {
//         console.log(2)
//     }
//
//     public c():void {
//         console.log(1)
//     }
// }