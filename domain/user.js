export class User {

  constructor(username, name, surname, adress, email, gender, password) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.adress = adress;
    this.email = email;
    this.gender = gender;
    this.password = password;
  }

  /*---------------GETTERS-------------*/

  getUsername() {
    return this.username;
  }

  getName() {
    return this.name;
  }

  getSurname() {
    return this.surname;
  }

  getAdress() {
    return this.adress;
  }

  getEmail() {
    return this.email;
  }

  getGender() {
    return this.gender;
  }

  getPassword() {
    return this.password;
  }

  /*---------------SETTERS-------------*/

  setUsername(aUsername) {
    this.username = aUsername;
  }

  setName(aName) {
    this.name = aName;
  }

  setSurname(aSurname) {
    this.surname = aSurname;
  }

  setAdress(aAdress) {
    this.adress = aAdress;
  }

  setEmail(aEmail) {
    this.email = aEmail;
  }

  setGender(aGender) {
    this.gender = aGender;
  }

  setPassword(aPassword) {
    this.password = aPassword;
  }

  /*---------------ToStrings-------------*/

  completeNameToString() {
    let str = [this.name, this.surname].join(" ");
    return str;
  }

}
