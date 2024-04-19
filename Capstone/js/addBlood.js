const url = 'https://hc2g1ivpw5.execute-api.us-east-1.amazonaws.com/items';

var form = document.getElementById('blood_details');
var sendButton = document.getElementById('send');
var fdata = {};
sendButton.addEventListener('click',async function(){
    console.log("hi");
    var formData = new FormData(form);
    for (var pair of formData.entries()) 
        fdata[pair[0]] = pair[1];
    validate(fdata);
    
    console.log(fdata);
    if(validate(fdata)){
        var response = await fetch(url,{
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(fdata)
    });
    alert('Data added successfully!!');
    }
});


function validate(formData) {
    if(formData['donor_name'] == '' || formData['Location'] == '' || formData['donation_date'] == '' || formData['contact_no'] == '' || formData['blood_packet_id'] == ''){
        alert('Enter all fields');
        return false;
    }
    else if(formData['blood_grp'] == ''){
        alert('Enter blood group');
        return false;
    }
    else if(formData['contact_no'].toString().length != 10){
        alert('Enter valid number');
        return false;
    }
    return true;
}