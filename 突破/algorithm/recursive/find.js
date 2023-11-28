function find(arr,k,left,right){
    if (left > right) return -1

    let idx = Math.floor((left+right)/2)
    var mid = arr[idx]
    if (mid == k) {
        return idx;
    } else if (mid < k){
        return find(arr,k ,idx+1,right)
    } else {
        return find(arr,k,left,idx-1)
    }
}
find([1,2,3,4,5,6],5,0,5)