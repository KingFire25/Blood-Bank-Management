const url = 'https://hc2g1ivpw5.execute-api.us-east-1.amazonaws.com/items';
let div = document.getElementById('quantity');
var response;
var data;
$(document).ready( async function () {
  var quantity = await loadData();
  div.innerHTML = `<p>Quantity: ${quantity}</p>`;
});
let table = document.getElementById("myTable");

async function loadData(){
  response = await fetch(url);
  data = await response.json();
  var c=0;
  //create table from existing data
  for(var i=0;i<data.length;i++){
    let row = table.insertRow(-1);
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    c1.innerText = data[i]['blood_packet_id'];
    c2.innerText = data[i]['blood_grp'];
    c++;
  }
  return c;
}


var selectBlood = document.querySelector('select');
selectBlood.addEventListener('change',async function(){
    console.log(selectBlood.value);
    var blood_grp = selectBlood.value;
    
    //clear table
    clearTable(table);
    
    if(blood_grp==='All'){
      var quantity = await loadData();
      div.innerHTML = `<p>Quantity: ${quantity}</p>`;
      return;
    }
    //get quantity
    var quantity = myFunction(data,blood_grp);

    //insert new data
    div.innerHTML = `<p>Quantity: ${quantity}</p>`;
    console.log(quantity);
    
});

function myFunction(data,blood_grp) {
  var quantity = 0;
    for(var i=0;i<data.length;i++){
      if(data[i]['blood_grp'] === blood_grp){
        addRow(data[i]['blood_packet_id'],blood_grp);
        quantity++;
      }
    }

  return quantity;
}

function addRow(blood_packet_id,blood_grp) {
  // Get the table element in which you want to add row

  // specify the index where you want to add the row
  let row = table.insertRow(-1); // We are adding at the end

  // Create table cells
  let c1 = row.insertCell(0);
  let c2 = row.insertCell(1);

  // Add data to c1 and c2
  c1.innerText = blood_packet_id;
  c2.innerText = blood_grp;
}

function clearTable(table) {
  var rows = table.rows;
  var i = rows.length;
  while (--i) {
    // rows[i].parentNode.removeChild(rows[i]);
    // // or
    table.deleteRow(i);
  }
}