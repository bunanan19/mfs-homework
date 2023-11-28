function insertSort(arr){
    for(let i = 1; i < arr.length; i++){
        let key = arr[i]
        let j = i-1;//若放在循环条件里面，let块级作用域，在循环外访问不到j的值，所有放在外面
        while(j >= 0 && key < arr[j]){
            arr[j+1] = arr[j]
            console.log(arr)//观察数据处理的过程
            j--
        }
        arr[j+1] = key
    }
    return arr
}
let arr = [3,5,1,8,5,9,0,7]

insertSort(arr)

console.log(arr)