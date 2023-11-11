class Node{
    constructor(val,next){
        this.val = val;
        this.next = next;
    }
}
let list = new Node();

list.next = new Node(1);

list.next.next = new Node(2);

list.next.next.next = new Node(3);

//list.next = new Node(1,new Node(2 ，new Node(3)));等价于上面两行代码

for(let i =list.next; i; i=i.next){
    console.log(i.val)
}