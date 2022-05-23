/**
*
* Assume we are fetching the data from a rest endpoint in the get data function.
* we can simulate the same by replacing the setTimeout with fetch api and executing the same in a browser.
*
*/

const getData = (uId) => {
    return new Promise((resolve,reject) =>{

        setTimeout(() => {
            console.log("Fetched the data!");
            resolve ("skc@gmail.com");
            }, 4000);

    });
    
    }


//Method 1
const main = async () =>{
    console.log("start");
    var email = await getData("skc");
    console.log("Email id of the user id is: " + email);
    console.log("end");
}

main();



//Method 2
// console.log("start");
// var email =getData("skc").then((message)=>message)
//                          .then((email)=>{console.log("Email id of the user id is: " + email)})
//                          .then(()=>{console.log("end")});