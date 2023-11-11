class TreeNode{
    constructor(left,val,right){
        this.val = val;
        this.left  = left;
        this.right = right;
    }
}

let tree =new TreeNode(null,3,null)

tree.left = new TreeNode(null,8,null)

tree.right = new TreeNode(new TreeNode(null,1,null),9,new TreeNode(null,2,null))

tree.left.left = new TreeNode(new TreeNode(null,1,null),3,new TreeNode(null,1,null))

tree.left.right = new TreeNode(null,5,null)

function levelVisit(tree){
    let arr = [];
    arr.push(tree);

    while(arr.length){
        let t = arr.shift()
        console.log(t.val)
        if(t.left){
            arr.push(t.left)
        }
        if(t.right){
            arr.push(t.right)
        }
    }
}

levelVisit(tree)
