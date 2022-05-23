const api_url =
   "https://random.dog/woof.json";

const arr = [];
async function getapi(url) {

   const response = await fetch(url);


   var data = await response.json();
   console.log(data);


   if (response) {
      hideloader();
   }

   arr.push(data.url);


}


getapi(api_url);


function hideloader() {
   document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show() {

   console.log(arr);
   let tab =
      `<tr>
          <td>Dogs</td>
         </tr>`;


   for (let r in arr) {
      console.log(r)
      tab += `<tr>
        <td>
         
            <img src=${arr[r]} width="400px" height="400px" display="visible"/>
    
        </td>
    </tr>`;

      document.getElementById("employees").innerHTML      = tab;

   }


}


let listOfImages = async () => {

   for (let i = 0; i <= 10; i++) {
      await getapi(api_url);
   }


   show();
}

listOfImages();