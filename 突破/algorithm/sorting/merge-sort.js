function merge(left, right){//其中的left和right为有序状态
    let result = [];
    while(left.length >0 && right.length>0){
        if(left[0]<right[0]){//在有序转台下不断从头部选出小值，
            //如left为[1,5],right为[2,4,6],首先1被shift入result，left为[5],然后left[0]=5,right[0]=2,2被shift，然后是5和4被比较，最后的结果为[1,2,4,5,6]
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    //当左右数组长度不等时，将比较完后剩下的数组项连接起来即可
    return result.concat(left).concat(right)//将两个数组连接起来，并返回结果数组。
}
function mergeSort(arr){
    if(arr.length == 1){return arr};//直到不能再分为止
    let mid = Math.floor(arr.length / 2);
    let left_arr = arr.slice(0,mid), right_arr = arr.slice(mid);
    return merge(mergeSort(left_arr),mergeSort(right_arr));
}
var arr = [12,20,30,21,15,33,26,19,40,25];
console.log(mergeSort(arr))