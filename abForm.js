window.addEventListener('DOMContentLoaded',(event) =>{

    const name = document.querySelector('#fullName');
    const nameError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
            try{
                (new AddressBookData()).fullName = name.value;
                nameError.textContent ="";
            }catch(e){ nameError.textContent = e;}
    });

    // const phone = document.querySelector('#phoneNumber');
    // const phoneError = document.querySelector('.tel-error');
    // phone.addEventListener('input',function(){
    //     try{
    //         (new AddressBookData()).phoneNumber = phone.value;
    //         phoneError.textContent ="";
    //     }catch(e){ phoneError.textContent = e;}
    // });

});

const save =() => {
    try{
        let addressBookData = createPersonDetails();
        createAndUpdateStorage(addressBookData);
    }catch(e){
        return;
    }
}

const createPersonDetails = () => {
    let addressBookData = new AddressBookData();
    addressBookData.fullName = getInputValueById('#fullName');
    addressBookData.address = getInputValueById('#address');
    addressBookData.city = getInputValueById('#city');
    addressBookData.state = getInputValueById('#state');
    addressBookData.zipCode = getInputValueById('#zipcode');
    addressBookData.phoneNumber = getInputValueById('#phoneNumber');
    alert(addressBookData.toString());
    return addressBookData;
}

const getInputValueById =(id) =>{
    let value = document.querySelector(id).value;
    return value;
}
function createAndUpdateStorage(addressBookData){
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList != undefined){
        addressBookList.push(addressBookData);
    }else{
        addressBookList = [addressBookData];
    }
    alert(addressBookData.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
} 