function bubbleSort(arr){
    for(let i = arr.length-2; i >=0; i--){//arr.length-2是因为可以只遍历n-1次(n-2到0有n-1位)就可以得到n-1个大的值，剩下一个肯定是最小的值，不需要再遍历一次了
        for(let j = 0; j < i; j++){//j<i是因为，每一次i的遍历，i后面的数据段都是冒泡完成有序的，不需要浪费时间去遍历已经排好了的
            if(arr[j] > arr[j+1]){
                let v = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = v//若前者比后者大，arr[j+1]和arr[j]换值，大的值冒泡，每轮找出无序段的最大值
            }
        }
        console.log(arr)//观察冒泡过程
    }
}
let arr = [8,0,5,1,5,8,9,0,7,3]

bubbleSort(arr)

console.log(arr)