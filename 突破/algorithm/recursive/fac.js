function fac(n){//求阶层
    let res = 1
    for(let i=2; i<=n ;i++){
        res *= i
    }
    return res
}
console.log(fac(4))

function fac_c(n){//迭代递归
    if(n<=1) return 1
    return fac_c(n-1) * n
}
console.log(fac_c(4))