class TreeNode {
    constructor(val,left,right){
        this.val = val
        this.left = left
        this.right = right
    }
}
let left = new TreeNode('B',new TreeNode('D',null,null),null)
let right = new TreeNode('C',new TreeNode('E',null,null),null)
let root = new TreeNode('A',left,right)


let l = new TreeNode('2',new TreeNode('1',null,null),null)
let r = new TreeNode('5',new TreeNode('4',null,null),null)
let v = new TreeNode('3',l,r)


//先序遍历
function preVisit(root){
    if(!root){//递归终止条件：如果root为空，终止
        return
    }
    console.log(root.val)

    preVisit(root.left)
    preVisit(root.right)

    // if(root.left){//递归终止条件
    //     preVisit(root.left)//递归
    // }
    // if(root.right){
    //     preVisit(root.right)
    // }
}

preVisit(root)

console.log('---------------------------')

//中序遍历
function midVisit(root){
    if(!root){//递归终止条件：如果root为空，终止
        return
    }
    midVisit(root.left)
    console.log(root.val)
    midVisit(root.right)
}

midVisit(root)

console.log('---------------------------')

//后序遍历
function postVisit(root){
    if(!root){//递归终止条件：如果root为空，终止
        return
    }
    postVisit(root.left)
    postVisit(root.right)
    console.log(root.val)
}

postVisit(root)

console.log('---------------------------')

//层序遍历
function levelVisit(root){
    if(!root){//递归终止条件：如果root为空，终止
        return
    }
    let queue = [] //创建一个队列,进行暂存
    queue.push(root)//将根节点入队
    while(queue.length != 0){//当队列非空时
        let node = queue.shift()//将队头元素出队
        console.log(node.val)//输出当前节点的值
        
        if(node.left){//如果当前节点有左子节点
            queue.push(node.left)//将左子节点入队
        }
        if(node.right){//如果当前节点有右子节点
            queue.push(node.right)//将右子节点入队
        }
    }
}

levelVisit(root)

preVisit(v)
midVisit(v)
postVisit(v)
levelVisit(v)