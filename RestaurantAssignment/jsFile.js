const RestaurantData = fetch("./data.json").then((response) => {
  return response.json();
});

const showData = async () => {
  var data = await RestaurantData.then((data) => data);
  // console.log(data)

  let tab = `<div> </div>`;

  for (let menu of data.array.categorys) {
    console.log(menu);

    for (let subMenu of menu["menu-items"]) {
      var id = `${subMenu.name}`
        .split(" ")
        .join("")
        .replace(/[^A-Za-z 4]/g, "")
        .replace("4", "four");
      console.log(id);
      tab += `<div class="cardCss" id=${id} draggable="true" ondragstart="drag(event)">
<p>${subMenu.name}</p>
<p> ${menu.name}</p>
<p> ${subMenu["sub-items"][0].price}</p>
</div>`;
      document.getElementById("Menu").innerHTML = tab;
    }
  }
};

showData();

const searchItem = () => {
  let filter = document.getElementById("searchItem").value.toLowerCase();

  let itemList = document.getElementById("Menu");
  let item = itemList.getElementsByClassName("cardCss");

  for (var i = 0; i < item.length; i++) {
    let p1 = item[i].getElementsByTagName("p")[0];
    let p2 = item[i].getElementsByTagName("p")[1];

    let textValue1 = p1.textContent || p1.innerText;
    let textValue2 = p2.textContent || p2.innerText;

    if (
      textValue1.toLowerCase().indexOf(filter) > -1 ||
      textValue2.toLowerCase().indexOf(filter) > -1
    ) {
      item[i].style.display = "";
    } else {
      item[i].style.display = "none";
    }
  }
};

const searchTable = () => {
  let filter = document.getElementById("searchTable").value.toLowerCase();

  let tableList = document.getElementById("tables");
  let table = tableList.getElementsByClassName("table");

  for (var i = 0; i < table.length; i++) {
    let p1 = table[i].getElementsByTagName("p")[0];

    let textValue1 = p1.textContent || p1.innerText;

    if (textValue1.toLowerCase().indexOf(filter) > -1) {
      table[i].style.display = "";
    } else {
      table[i].style.display = "none";
    }
  }
};

var total1 = document.getElementById("total1");
var price1 = document.getElementById("price1");
var total2 = document.getElementById("total2");
var price2 = document.getElementById("price2");
var total3 = document.getElementById("total3");
var price3 = document.getElementById("price3");
var modal = document.getElementById("modal-body");
var arr1 = [];
var arr2 = [];
var arr3 = [];
var temp = 1;

total1.innerHTML = 0;
price1.innerHTML = 0;
total2.innerHTML = 0;
price2.innerHTML = 0;
total3.innerHTML = 0;
price3.innerHTML = 0;

const table1Action = () => {
  AddModalData(arr1, "arr1");
};

const table2Action = () => {
  AddModalData(arr2, "arr2");
};

const table3Action = () => {
  AddModalData(arr3, "arr3");
};

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dragModalElement(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop1(ev) {
  transferDataToModal(ev, total1, price1, arr1);
}

function drop2(ev) {
  transferDataToModal(ev, total2, price2, arr2);
}

function drop3(ev) {
  transferDataToModal(ev, total3, price3, arr3);
}

function dropModalElement(event, arrayRef) {
  var item = document.getElementById(event.dataTransfer.getData("text"));
  item.parentNode.removeChild(item);

  arrayRef.pop(item);
}

const clearData = () => {
  document.getElementById("modal-body").innerHTML = "";

  calculateTotalPriseandTotalItems(total3, price3, arr3);
  calculateTotalPriseandTotalItems(total2, price2, arr2);
  calculateTotalPriseandTotalItems(total1, price1, arr1);
};

const transferDataToModal = (ev, total, price, arr) => {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  var quantity = document.createElement("p");

  quantity.id = "quantityItem";

  quantity.innerHTML = temp;

  var originalElement = document.getElementById(data);

  var clonedElement = originalElement.cloneNode(true);

  var flag = 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == clonedElement.id) flag = 0;
  }

  if (flag == 1) {
    clonedElement.appendChild(quantity);
    arr.push(clonedElement);
  } else duplicateFound();

  calculateTotalPriseandTotalItems(total, price, arr);
};

const AddModalData = (arr, arrayRef) => {
  tab = `<div class="cardTableHead"> <p>Sr.</p><p>Name</p><p>Category</p>
  <p> Price</p><p>Quantity</p></div><hr>`;

  var totalPrice = 0;

  console.log(arr);

  for (let index = 0; index < arr.length; index++) {
    var p1 = arr[index].getElementsByTagName("p")[0].innerText;
    var p2 = arr[index].getElementsByTagName("p")[1].innerText;
    var p3 = arr[index].getElementsByTagName("p")[2].innerText;
    var p4 = arr[index].getElementsByTagName("p")[3].innerText;
    var id = arr[index].id + "1";
    tab += `<div class="cardTable" id=${id} draggable="true" ondragstart="dragModalElement(event)">
    
    <p>${index + 1}</p> 
    <p>${p1}</p>
    <p>${p2}</p>
    <p>${p3}</p>
<div class="quantity"> 
<button class="btn" onclick=increment(${id},${index},${arrayRef})>+<button> 
<span class="para">${p4}<span>
<button class="btn" onClick=decrement(${id},${index},${arrayRef})>-<button>
</div>
</div>
<hr>`;
  }

  tab += `
<div
class="DeleteItem"
ondrop="dropModalElement(event,${arrayRef})"
ondragover="allowDrop(event)"
>
Drag Item to Delete 
</div>`;

  document.getElementById("exampleModalLongTitle").innerHTML =
    "Table-" + arrayRef[3] + " | " + "Order Details";
  document.getElementById("modal-body").innerHTML = tab;
};

const increment = (id, index, arrayRef) => {
  console.log(id);
  var data = Number(id.getElementsByTagName("span")[0].innerText);

  data += 1;
  id.getElementsByTagName("span")[0].innerHTML = data;

  temp = data;

  console.log(index);

  arrayRef[index].getElementsByTagName("p")[3].innerHTML = data;

  temp = 1;
};

const decrement = (id, index, arrayRef) => {
  var data = Number(id.getElementsByTagName("span")[0].innerText);

  data -= 1;

  if (data <= 0) {
    data = 1;
  }

  id.getElementsByTagName("span")[0].innerHTML = data;

  temp = data;

  console.log(index);

  arrayRef[index].getElementsByTagName("p")[3].innerHTML = data;

  temp = 1;
};

const calculateTotalPriseandTotalItems = (total, price, arr) => {
  var totalItems = 0;
  var totalPrice = 0;
  for (let i of arr) {
    var pricePerItem = parseInt(i.getElementsByTagName("p")[2].innerText);
    var totalNoofItems = parseInt(i.getElementsByTagName("p")[3].innerText);

    console.log(pricePerItem);
    totalItems += totalNoofItems;
    totalPrice += pricePerItem * totalNoofItems;
  }

  price.innerHTML = totalPrice;
  total.innerHTML = totalItems;
};

const duplicateFound = () => {
  alert("Item Already added");
};
