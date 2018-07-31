export class Agency {

  constructor(agency_name, adress, email, website, number_VAT, phone) {
    this.agency_name = agency_name;
    this.adress = adress;
    this.email = email;
    this.website = website;
    this.number_VAT = number_VAT
    this.phone = phone;
  }

  /*---------------GETTERS-------------*/

  getAgency_Name() {
    return this.agency_name;
  }
  getAdress() {
    return this.adress;
  }
  getEmail() {
    return this.email;
  }
  getWebsite() {
    return this.website;
  }
  getNumber_VAT() {
    return this.number_VAT;
  }
  getPhone() {
    return this.phone;
  }

  /*---------------SETTERS-------------*/

  setAgency_Name(aAgency_name) {
    this.agency_name = aAgency_name;
  }
  setAdress(aAdress) {
    this.adress = aAdress;
  }
  setEmail(aEmail) {
    this.email = aEmail;
  }
  setWebsite(aWebsite) {
    this.website = aWebsite;
  }
  setNumber_VAT(aNumber_VAT) {
    this.number_VAT = aNumber_VAT;
  }
  setPhone(aPhone) {
    this.phone = aPhone;
  }

  /*---------------ToStrings-------------*/


}
