import { Research } from '../domain/research';


describe('Research TESTS', () => {
    let research1 = new Research('undefined', 'undefined', 'undefined', 'undefined');
    let research2 = new Research('undefined', 'undefined', 'undefined', 'undefined');
    let research3 = new Research('undefined', 'undefined', 'undefined', 'undefined');


  beforeEach(() => {

    /*
    * Setting all the user with the setter functions before using the getter functions
    * in our tests
    */

    research1.setBudget(22000);
    research2.setBudget(10000);
    research3.setBudget(5000);
    /*----------*/
    research1.setKilometer_around(15);
    research2.setKilometer_around(20);
    research3.setKilometer_around(50);
    /*----------*/
    research1.setSurface(150);
    research2.setSurface(300);
    research3.setSurface(200);
    /*----------*/
    research1.setNumber_people(10);
    research2.setNumber_people(120);
    research3.setNumber_people(80);
  


  });

 /*---------------BUDGET TEST-------------*/

  it('It should return all correct budgets of the researches', () => {
    console.log('-------------------------------------------');
    console.log('Entering the BUDGET Test...');


    let result1 = research1.getBudget();
    let result2 = research2.getBudget();
    let result3 = research3.getBudget();

    expect(result1).toEqual(22000);
    console.log('! Budget - 22000 - returned successfully !');

    expect(result2).toEqual(10000);
    console.log('! Budget - 10000 - returned successfully !');

    expect(result3).toEqual(5000);
    console.log('! Budget - 5000 - returned successfully !');

    console.log('Exiting the BUDGET Test...');
    console.log('-------------------------------------------');
  });

   /*---------------KILOMETER AROUND TEST-------------*/

it('It should return all correct kilometers around of the researches', () => {
    console.log('-------------------------------------------');
    console.log('Entering the KILOMETER AROUND Test...');

    let result1 = research1.getKilometer_around();
    let result2 = research2.getKilometer_around();
    let result3 = research3.getKilometer_around();


    expect(result1).toEqual(15);
    console.log('! Kilometers around - 15km - returned successfully !');

    expect(result2).toEqual(20);
    console.log('! Kilometers around - 20km - returned successfully !');

    expect(result3).toEqual(50);
    console.log('! Kilometers around - 50km - returned successfully !');


    console.log('Exiting the KILOMETER AROUND Test...');
    console.log('-------------------------------------------');

  });


   /*---------------SURFACE TEST-------------*/

  it('It should return all correct surfaces of the researches', () => {
    console.log('-------------------------------------------');
    console.log('Entering the SURFACE Test...');

    let result1 = research1.getSurface();
    let result2 = research2.getSurface();
    let result3 = research3.getSurface();

    expect(result1).toEqual(150);
    console.log('! Surface - 150m2 - returned successfully !');

    expect(result2).toEqual(300);
    console.log('! Surface - 300m2 - returned successfully !');

    expect(result3).toEqual(200);
    console.log('! Surface - 200m2 - returned successfully !');

    console.log('Exiting the SURFACE Test...');
    console.log('-------------------------------------------');
  });

   /*---------------NUMBER PEOPLE TEST-------------*/

  it('It should return all correct number of people of the researches', () => {
    console.log('-------------------------------------------');
    console.log('Entering the NUMBER_PEOPLE Test...');

    let result1 = research1.getNumber_people();
    let result2 = research2.getNumber_people();
    let result3 = research3.getNumber_people();

    expect(result1).toEqual(10);
    console.log('! Number of people - 10 - returned successfully !');

    expect(result2).toEqual(120);
    console.log('! Number of people - 120 - returned successfully !');

    expect(result3).toEqual(80);
    console.log('! Number of people - 80 - returned successfully !');

    console.log('Exiting the NUMBER_PEOPLE Test...');
    console.log('-------------------------------------------');
  });

});