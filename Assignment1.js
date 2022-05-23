
// Function as a perameter


function function1(param){
    param();
}


function function_as_a_param(){
    console.log("Hello");
}


function1(function_as_a_param);


//Arrow fn


const x =(a ,b) =>a[0]+b[0];

console.log(x("aa","bb"));