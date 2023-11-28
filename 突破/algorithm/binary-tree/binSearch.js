let arr = [1,2,5,6,8,9]


function binSearch(arr,l,r,target){
    if(l > r){
        return -1
    } 

    let mid = Math.floor((l + r) / 2);
    if(arr[mid] == target){
        return mid
    } else if(arr[mid] > target){
        return binSearch(arr,l,mid-1,target)
    } else {
        return binSearch(arr,mid+1,r,target)
    }
}

console.log(binSearch(arr,0,arr.length-1,9))
