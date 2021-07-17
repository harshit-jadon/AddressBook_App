class AddressBookData{

    get fullName(){ return this._fullName};
    set fullName(fullName)
    {  
        let nameRegEx = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegEx.test(fullName)){
            this._fullName = fullName;
        }
        else{throw "Incorrect name";}
    };
    
    // get phoneNumber(){ return this._phoneNumber};
    // set phoneNumber(phoneNumber){  
    //     let phoneRegex = RegExp("\\d{2}\\d{10}");
    //     if(phoneRegex.test(phoneNumber)){
    //         this._phoneNumber = phoneNumber;
    //     }else{throw "Incorrect PhoneNumber";}
    //     };
    get phoneNumber(){ return this._phoneNumber};
    set phoneNumber(phoneNumber){  this._phoneNumber = phoneNumber;};
    get address(){ return this._address};
    set address(address){  this._address = address};

    get city(){ return this._city};
    set city(city){  this._city = city};

    get state(){ return this._state};
    set state(state){  this._state = state};

    get zipCode(){ return this._zipCode};
    set zipCode(zipCode){ this._zipCode = zipCode};

    
    toString(){
        return "Name= " + this.fullName 
            + ",Phone Number= " + this.phoneNumber 
        + ",Address= "+ this.address
        +",City= " + this.city
        +",State= " + this.state 
        +",Zip Code= "+ this.zipCode;
    }
}
