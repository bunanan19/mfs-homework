function selectionSort(arr){
    for(let i = 0; i<arr.length; i++){
        let minIdx = i// 无序区中最小元素位置
        for(let j = i+1; j <arr.length; j++){// 找出"a[i+1] ... a[n]"之间的最小元素，并赋值给minIdx。
            if(arr[j]<arr[minIdx]){
                minIdx = j
            }
        }
        // 若minIdx!=i，则交换 a[i] 和 a[min]。
        // 交换之后，保证了a[0] ... a[i] 之间的元素是有序的。
        if(minIdx != i){           
            let val = arr[i]
            arr[i] = arr[minIdx]
            arr[minIdx] = val
        }
        console.log(arr)//观察选择排序过程
    }
}
let arr = [8,0,5,1,5,8,9,0,7,3]

selectionSort(arr)

console.log(arr)