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
    
    get phoneNumber(){ return this.phoneNumber};
    set phoneNumber(phoneNumber){  
        let phoneRegex = RegExp('^([9]{1})([234789]{1})([0-9]{8})$');
        if(phoneRegex.test(phoneNumber)){
            this.phoneNumber = phoneNumber;
        }else{throw "Incorrect PhoneNumber";}
        };

    get address(){ return this.address};
    set address(address){  this.address = address};

    get city(){ return this.city};
    set city(city){  this.city = city};

    get state(){ return this.state};
    set state(state){  this.state = state};

    get zipCode(){ return this.zipCode};
    set zipCode(zipCode){  this.zipCode = zipCode};

    toString(){
        return "Name= " + this.fullName 
            + ",Phone Number= " + this.phoneNumber 
        + ",Address= "+ this.address
        +",City= " + this.city
        +",State= " + this.state 
        +",Zip Code= "+ this.zipCode;
    }
}
