let personDataList;
window.addEventListener('DOMContentLoaded',(event) => {
    if(siteProperties.use_local_storage.match("true")){
        getPersonDataFromStorage();
    }else{
        getPersonDataFromServer();
    }

});

const getPersonDataFromStorage = () => {
    personDataList =  localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processPersonDataResponse();
}
const processPersonDataResponse = () => {
    createInnerHtml();
    localStorage.removeItem('editPerson');
}

const getPersonDataFromServer = () => {
    makeServiceCall("GET",siteProperties.server_url,true).then(responseText => {
         personDataList = JSON.parse(responseText);
            processPersonDataResponse();
    })
    .catch(error => {
        console.log("GET Error Status "+JSON.stringify(error));
        personDataList = [];
        processPersonDataResponse();
    });

}

const createInnerHtml = () => {
    if (personDataList.length == 0) return;
    const headerHtml = "<th>FullName</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const personData of personDataList){
        innerHtml = `${innerHtml}
         <tr>
          <td>${personData._fullName}</td>
          <td>${personData._address}</td>
          <td>${personData._city}</td>
          <td>${personData._state}</td>
          <td>${personData._zipCode}</td>
          <td>${personData._phoneNumber}</td>
          <td>
          <img id="${personData.id}" src="delete-black-18dp.svg" alt="delete" id="1" onclick="remove(this)">
          <img id="${personData.id}" src="create-black-18dp.svg" alt ="update" id="1" onclick="update(this)">
          </td>
        </tr>
       `;
    }    
    document.querySelector('#display').innerHTML = innerHtml;
} 

const remove = (node) => {
    let personData = personDataList.find(person => person.id == node.id);
    if(!personData) return;

    const index = personDataList.map(person => person.id)
                                .indexOf(personData.id);
    personDataList.splice(index,1);
    if(siteProperties.use_local_storage.match("true")){
        localStorage.setItem("AddressBookList",JSON.stringify(personDataList));
        createInnerHtml();
    }else{
        const deleteURL = siteProperties.server_url+"/"+personData.id.toString();
        makeServiceCall("DELETE",deleteURL,false)
         .then(responseText => {
             createInnerHtml();
         })
         .catch(error => {
             console.log("Delete error status :"+JSON.stringify(error));
         });
    }   
} 
const update = (node) => {
    let personData = personDataList.find(person => person.id == node.id);
    if(!personData) return;
    localStorage.setItem('editPerson',JSON.stringify(personData));
    window.location.replace(siteProperties.form);
}