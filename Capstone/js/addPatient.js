const url = 'https://oogdoy2soj.execute-api.us-east-1.amazonaws.com/items';

var form = document.getElementById('patient_details');
var sendButton = document.getElementById('send');
var fdata = {};
sendButton.addEventListener('click',async function(){
    console.log("hi");
    var formData = new FormData(form);
    for (var pair of formData.entries()) 
        fdata[pair[0]] = pair[1];
    
    console.log(fdata);
    if(validate(fdata)){
        var response = await fetch(url,{
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(fdata)
    });
        console.log(await response.json());
        alert('Request created successfully!!');
    }
});


function validate(formData) {
    if(formData['patient_name'] == '' || formData['guardian_name'] == '' || formData['required_date'] == '' || formData['patient_contact'] == '' || formData['guardian_contact'] == '' || formData['quantity'] == 0){
        alert('Enter all fields');
        return false;
    }
    else if(formData['blood_grp'] == ''){
        alert('Enter blood group');
        return false;
    }
    else if(formData['patient_contact'].toString().length != 10 || formData['guardian_contact'].toString().length != 10 ){
        alert('Enter valid number');
        return false;
    }
    return true;
}