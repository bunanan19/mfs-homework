let queen = []
let methods = 0 //检验八皇后问题有多少个解
//冲突检查函数：
 function conflict(num){//新加的皇后的编码
    for(let i= 0; i<num; i++){//检查新加的皇后是否与之前的皇后冲突
        if(queen[i] == queen[num] || //是否在同一行
            num - i == queen[num] - queen[i]||//检查是否在对角线上，i-num的差值=横坐标差值，queen[num] - queen[i]=纵坐标差值
            i - num == queen[num] - queen[i]){
                return true//返回true表示新加的皇后在冲突的位置上
            }
    }
    return false//返回false表示新加的皇后不在冲突的位置上
 }

 function find(row, all){
    if(row == all){
        methods ++;//每一次寻找完八个皇后，即每一个正确解都会加一次
        return print(all)//八个皇后找完打印出来
    }
    for(let i=0; i<all; ++i){//在纵向的八个位置找满足要求的位置
        queen[row] = i;//row的值为0-7，当row=8时就打印结果了
        if(!conflict(row))//如果当前行数ruw的皇后不满足条件，就得继续i++
            find(row+1, all)//成功就找下一个皇后row+1
    }
 }
 function print(all){
    for(let i=0; i<all; ++i){//横坐标
        let str = ''
        for(let j = 0; j<all; ++j){//纵坐标
            if(j==queen[i]) str += ' #'//当第i列的i皇后在j行的位置上时
            else str += ' o'
        }
        console.log(str)
    }
    console.log()
 }

 find(0,8)

