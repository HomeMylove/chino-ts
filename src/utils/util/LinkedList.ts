export default class LinkedList<T> {
    head: N<T> | undefined;

    add(value: T) {
        if (this.head === undefined) {
            this.head = new N<T>(value)
            return
        } else {
            let temp: N<T> = this.head;
            while (true){
                if(temp.next === undefined){
                    break
                }
                temp = temp.next
            }
            temp.next = new N<T>(value)
        }
    }

    has(value:T):boolean{
        if(this.head === undefined){
            return false
        }
        let temp :N<T> = this.head
        while (true){
            if(temp.equals(value)){
                return true;
            }
            if(temp.next === undefined){
                break
            }
            temp = temp.next
        }
        return false
    }

    del(value:T):boolean{
        if(this.head === undefined){
            return false
        }

        if(this.head.equals(value)){
            this.head = undefined;
            return true;
        }else {
            let temp:N<T> = this.head
            let flag = false;
            while (true){
                if(temp.next === undefined){
                    break
                }
                if(temp.next.equals(value)){
                    flag = true
                    break
                }
                temp = temp.next
            }
            if(flag){
                temp.next = temp.next?.next
                return true
            }else return false
        }
    }


    list(){
        if(this.head === undefined){
            return
        }
        let temp:N<T> = this.head
        while (true){
            temp.show()
            if(temp.next===undefined){
                break
            }
            temp=temp.next
        }
    }
}

class N<T> {
    private readonly value: T;
    next: N<T> | undefined;

    constructor(value: T) {
        this.value = value
    }

    show() {
        console.log("\nvalue=", this.value)
    }

    equals(value:T):boolean{
        return this.value === value
    }
}
