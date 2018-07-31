export class Research {

  constructor(budget, kilometer_around, surface, number_people) {
    this.budget = budget;
    this.kilometer_around = kilometer_around;
    this.surface = surface;
    this.number_people = number_people;
  }

  /*---------------GETTERS-------------*/

  getBudget() {
    return this.budget;
  }

  getKilometer_around() {
    return this.kilometer_around;
  }

  getSurface() {
    return this.surface;
  }

  getNumber_people() {
    return this.number_people;
  }


  /*---------------SETTERS-------------*/

  setBudget(aBudget) {
    this.budget = aBudget;
  }

  setKilometer_around(aKilometer_around) {
    this.kilometer_around = aKilometer_around;
  }

  setSurface(aSurface) {
    this.surface = aSurface;
  }

  setNumber_people(aNumber_people) {
    this.number_people = aNumber_people;
  }

}
