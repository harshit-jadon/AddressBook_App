window.addEventListener('DOMContentLoaded',(event) =>{

    const name = document.querySelector('#fullName');
    const nameError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
            try{
                (new AddressBookData()).fullName = name.value;
                nameError.textContent ="";
            }catch(e){ nameError.textContent = e;}
    });

    const phone = document.querySelector('#phoneNumber');
    const phoneError = document.querySelector('.tel-error');
    phone.addEventListener('input',function(){
        try{
            (new AddressBookData()).phoneNumber = phone.value;
            phoneError.textContent ="";
        }catch(e){ phoneError.textContent = e;}
    });

});
