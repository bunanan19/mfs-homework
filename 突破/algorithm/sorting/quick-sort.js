function quickSort(arr,left,right){
    if(left>=right) return
    let i = left
    let j = right
    let pivot = arr[j]//随机或者最后一个都行
    while(i<j){
        while(i<j && arr[i]<=pivot) {i++}
        arr[j] = arr[i]
        while(i<j && arr[j]>=pivot) {j--}
        arr[i] = arr[j]
    }
    arr[j] = pivot
    quickSort(arr,left,j-1)
    quickSort(arr,j+1,right)
}
let arr = [3,4,1,9,5,0,4,5,7,8]
quickSort(arr,0,arr.length-1)
console.log(arr)



function quickSort2(arr){
    if(arr.length<=1) return arr

    let pivot = arr[arr.length-1]
    let leftArr = arr.filter(i=>i<pivot)
    let rightArr = arr.filter(i=>i>pivot)
    return [...quickSort2(leftArr), pivot, ...quickSort2(rightArr)]
}
let arr1 = [3,4,1,9,5,0,4,5,7,8]

console.log(quickSort2(arr1))