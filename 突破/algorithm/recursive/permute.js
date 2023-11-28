function permute(str){
    if( str.length == 0) return [[]]//该代码首先判断str长度是否为0，为0直接返回。

    let results = [];
    for(let i = 0; i< str.length; i++){//遍历字符串中的每个字符，并将其从str中移除，得到新的字符串newStr 
        let newStr = str.slice(0, i).concat(str.slice(i + 1));
        for(let j = 0; j < permute(newStr).length; j++ ){
            results.push([str[i]] + permute(newStr)[j]);
        }
    }
    return results;
}
console.log(permute(["a", "b", "c"]));



let arr = [];// 用于存储排列结果的数组
function conflict(num,thisLetter){//检查当前字母是否与之前的字母有重合
    for(let i = 0;i<num;i++){
        if(thisLetter == arr[i]){//检查已经已经写入数组的元素中是否已经有了该字母
            return true;
        }
    }
    return false;
}
function find(num,str){
    if (num == str.length){
        return console.log(arr); //当字母排完，输出当前的排列结果
    }
    for(let i = 0; i < str.length; i++){//遍历数组每个元素，在num这个位置上找到数组中符合的字母
        if (!conflict(num,str[i])){
            arr[num] = str[i];//将当前字符str[i]放入当前位置num
            find(num+1,str);// 递归调用，查找下一个位置的字母
        }
    }
}

let S = ['a','b','c'];
find(0,S);//从idx=0 的位置头部开始找合适的字母