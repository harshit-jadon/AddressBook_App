let Update = false;
let personObj = {};
window.addEventListener('DOMContentLoaded',(event) =>{

    const name = document.querySelector('#fullName');
    const nameError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
            try{
                (new AddressBookData()).fullName = name.value;
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
        createAndUpdateStorage();
    }catch(e){
        return;
    }
}

const setPersonObj = () => {
    personObj._fullName = getInputValueById('#name');
    personObj._phoneNumber = getInputValueById('#number')
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
        let personData = addressBookList.find(person => person._id == personObj._obj);
        if(!personData){
            addressBookList.push(createContactData());
        }else{
            const index= addressBookList.map(person => person.id).indexOf(personData._id);
            addressBookList.splice(index,1,createContactData(personData._id));
        }
    }else{
        addressBookList =[createContactData()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

createContactData = (person) =>{
    person.fullName = personObj._fullName;
    person.address = personObj._address;
    person.city = personObj._city;
    person.state = personObj._state;
    person.pinCode = personObj._pinCode;
    person.phoneNumber = personObj._phoneNumber;
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
const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}