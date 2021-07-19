let personDataList;
window.addEventListener('DOMContentLoaded',(event) => {
    personDataList = getPersonDataFromStorage();
    createInnerHtml();
});

const getPersonDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
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
          <img src="delete-black-18dp.svg" alt="delete" id="1" onclick="remove(this)">
          <img src="create-black-18dp.svg" alt ="update" id="1" onclick="update(this)">
          </td>
        </tr>
       `;
    }    
    document.querySelector('#display').innerHTML = innerHtml;
} 