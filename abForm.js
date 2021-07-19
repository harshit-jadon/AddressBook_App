let Update = false;
let personObj = {};
window.addEventListener('DOMContentLoaded',(event) =>{

    const name = document.querySelector('#fullName');
    const nameError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
            try{
                checkName(name.value);
                nameError.textContent ="";
            }catch(e){ nameError.textContent = e;}
    });
    checkForUpdate();
});

const save =(event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setPersonObj();
        if(siteProperties.use_local_storage.match("true")){
            createAndUpdateStorage();
            resetForm();
            window.location.replace(siteProperties.home_page);
        }else{
            createOrUpdatePerson();
        }
    }catch(e){
        return;
    }
}
const createOrUpdatePerson = () => {
    let postURL = siteProperties.server_url;
    let methodCall = "POST";
    if(Update){
        methodCall = "PUT";
        postURL = postURL+ "/"+personObj.id.toString();
    }
    makeServiceCall(methodCall,postURL,true,personObj)
     .then(responseText => {
         resetForm();
         window.location.replace(siteProperties.home_page);
     })
     .catch(error => {
         throw error;
     })
}

const setPersonObj = () => {
    if(!Update && siteProperties.use_local_storage.match("true")){
        personObj.id = getNewId();
    }
    personObj._fullName = getInputValueById('#name');
    personObj._phoneNumber = getInputValueById('#number');
    personObj._address = getInputValueById('#address');
    personObj._city = getInputValueById('#city');
    personObj._state = getInputValueById('#state');
    personObj._pinCode = getInputValueById('#pinCode');
}

const getInputValueById =(id) =>{
    let value = document.querySelector(id).value;
    return value;
}

const getNewId = () => {
    let personID = localStorage.getItem("PersonID");
    personID = !personID ? 1 : (parseInt(personID) + 1).toString();
    localStorage.setItem("PersonID",personID);
    return personID;
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
} 

function createAndUpdateStorage(addressBookData){
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList){
        let personData = addressBookList.find(person => person.id == personObj.obj);
        if(!personData){
            addressBookList.push(personObj);
        }else{
            const index= addressBookList.map(person => person.id).indexOf(personData.id);
            addressBookList.splice(index,1,personObj);
        }
    }else{
        addressBookList =[personObj];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

checkForUpdate = () =>{
    const personJson = localStorage.getItem('editPerson');
    Update = personJson ? true : false;
    if(!Update) return;
    personObj = JSON.parse(personJson);
    setForm();
}
const setForm = () => {
    setValue('#name',personObj._fullName);
    setValue('#address',personObj._address);
    setValue('#city',personObj._city);
    setValue('#state',personObj._state);
    setValue('#pinCode',personObj._pinCode);
    setValue('#number',personObj._phoneNumber);
} 
const resetForm = () => {
    setValue('#name','');
    setValue('#number','');
    setValue('#address','');
    setValue('#city','Select City');
    setValue('#state','Select State');
    setValue('#pinCode','Enter Zip Code');
}
const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}