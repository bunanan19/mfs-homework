const shellSort = function (arr) {
    var gap = 1
    var len = arr.length
    //动态规划步长
    while (gap > len/3) {
        gap = gap*3 + 1
    }
    //步长组循环
    for(gap; gap > 0; gap = Math.floor(gap/3)) {
        //同步长循环
        for(i = gap; i < len; i++) {
            var temp = arr[i]
            var j
            //比较、并将数据后移
            for(j = i - gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j + gap] = arr[j]
            }
            arr[j + gap] = temp
        }
    }
    return arr
}
let arr = [8,0,5,1,5,8,9,0,7,3]
shellSort(arr)
console.log(arr)


var arr1 = [5, 4, 8, 1, 3, 7, 0, 9, 2, 6];
function shellSort(arr) {
    var len = arr.length;
    var tmp = undefined;
    var gap = Math.floor(len / 2);
    while (gap >= 1) {
        // console.log(`此时的gap为：${gap}`)
        for (var i = 0; i < len; i++) {
            for (var j = i; j >= gap; j = j - gap) {
                // console.log(`此时的j为：${j},此时的j-gap为：${j-gap}`)
                if (arr[j] < arr[j - gap]) {
                    tmp = arr[j];
                    arr[j] = arr[j - gap];
                    arr[j - gap] = tmp;
                    // console.log(`这个时候开始交换，${j}与${j-gap}交换后的数组`, arr)
                }
            }
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}
shellSort(arr1);

/*
 * 希尔排序
 *
 * 参数说明：
 *     a -- 待排序的数组
 *     n -- 数组的长度
 */
function shellSort1(a){
    let i,j,gap;
    let n = a.length
    // gap为步长，每次减为原来的一半。
    for (gap = n / 2; gap >= 1; gap /= 2){
        // 共gap个组，对每一组都执行直接插入排序
        for (i = 0 ;i < gap; i++){
            for (j = i + gap; j < n; j += gap) {
                // 如果a[j] < a[j-gap]，则寻找a[j]位置，并将后面数据的位置都后移。
                if (a[j] < a[j - gap]){
                    let tmp = a[j];
                    let k = j - gap;
                    while (k >= 0 && a[k] > tmp){
                        a[k + gap] = a[k];
                        k -= gap;
                    }
                    a[k + gap] = tmp;
                }
            }
        }
 
    }
}
var arr2 = [5, 4, 8, 1, 3, 7, 0, 9, 2, 6];
console.log(shellSort1(arr2))

function shellSort(arr){
    let len  = arr.length
    let gap = 1
    while (gap < len/3)
        gap = gap * 3 +1

    for(;gap>0;gap = Math.floor(gap/3))
        insertSort(arr,gap)
}