abstract class Animal{
    name:string;
    age:number;

    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }

    abstract sayHi():void;

    abstract run():void;
}

export default Animal