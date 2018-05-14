import { Agency } from '../domain/agency';


describe('Agency TESTS', () => {
    let agency1 = new Agency('undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');
    let agency2 = new Agency('undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');
    let agency3 = new Agency('undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');


  beforeEach(() => {

    /*
    * Setting all the user with the setter functions before using the getter functions
    * in our tests
    */
    /*----------*/
    agency1.setAgency_Name('Organize It');
    agency2.setAgency_Name('Extra Event');
    agency3.setAgency_Name('Profirst');
    /*----------*/
    agency1.setAdress('Rue de la ferme blanche, 10. 1490 Court-St-Etienne');
    agency2.setAdress('Rue des Pommiers, 20. 1348 Louvain-la-Neuve');
    agency3.setAdress('Rue des Voitures, 4. 1348 Louvain-la-Neuve');
    /*----------*/
    agency1.setEmail('contact@organizeit.be');
    agency2.setEmail('mgmt@extraevent.be');
    agency3.setEmail('contact@profirst.be');
    /*----------*/
    agency1.setWebsite('www.organizeit.be');
    agency2.setWebsite('www.extraevent.be');
    agency3.setWebsite('www.profirst.be');
    /*----------*/
    agency1.setNumber_VAT('BE1234567890');
    agency2.setNumber_VAT('BE0987654321');
    agency3.setNumber_VAT('BE1029384756');
        /*----------*/
    agency1.setPhone('+32477633634');
    agency2.setPhone('+32477633632');
    agency3.setPhone('+32477633631');


  });

   /*---------------AGENCY NAME-------------*/

it('It should return all correct agency name of the agencies', () => {
    console.log('-------------------------------------------');
    console.log('Entering the AGENCY NAME Test...');

    let result1 = agency1.getAgency_Name();
    let result2 = agency2.getAgency_Name();
    let result3 = agency3.getAgency_Name();


    expect(result1).toEqual('Organize It');
    console.log('! Agency Name - Organize It - returned successfully !');

    expect(result2).toEqual('Extra Event');
    console.log('! Agency Name - Extra Event - returned successfully !');

    expect(result3).toEqual('Profirst');
    console.log('! Agency Name - Profirst - returned successfully !');


    console.log('Exiting the AGENCY NAME Test...');
    console.log('-------------------------------------------');

  });


   /*---------------ADRESS TEST-------------*/

  it('It should return all correct adresses of the agencies', () => {
    console.log('-------------------------------------------');
    console.log('Entering the ADRESS Test...');

    let result1 = agency1.getAdress();
    let result2 = agency2.getAdress();
    let result3 = agency3.getAdress();

    expect(result1).toEqual('Rue de la ferme blanche, 10. 1490 Court-St-Etienne');
    console.log('! Agency Adress - Rue de la ferme blanche, 10. 1490 Court-St-Etienne - returned successfully !');

    expect(result2).toEqual('Rue des Pommiers, 20. 1348 Louvain-la-Neuve');
    console.log('! Agency Adress - Rue des Pommiers, 20. 1348 Louvain-la-Neuve - returned successfully !');

    expect(result3).toEqual('Rue des Voitures, 4. 1348 Louvain-la-Neuve');
    console.log('! Agency Adress - Rue des Voitures, 4. 1348 Louvain-la-Neuve - returned successfully !');

    console.log('Exiting the ADRESS Test...');
    console.log('-------------------------------------------');
  });

   /*---------------EMAIL TEST-------------*/

  it('It should return all correct usernames of the agencies', () => {
    console.log('-------------------------------------------');
    console.log('Entering the EMAIL Test...');

    let result1 = agency1.getEmail();
    let result2 = agency2.getEmail();
    let result3 = agency3.getEmail();

    expect(result1).toEqual('contact@organizeit.be');
    console.log('! Agency Email - contact@organizeit.be - returned successfully !');

    expect(result2).toEqual('mgmt@extraevent.be');
    console.log('! Agency Email - mgmt@extraevent.be - returned successfully !');

    expect(result3).toEqual('contact@profirst.be');
    console.log('! Agency Email - mgmt@extraevent.be - returned successfully !');

    console.log('Exiting the EMAIL Test...');
    console.log('-------------------------------------------');
  });


     /*---------------NUMBER VAT TEST-------------*/

  it('It should return all correct VAT number of the agencies', () => {
    console.log('-------------------------------------------');
    console.log('Entering the NUMBER VAT Test...');

    let result1 = agency1.getNumber_VAT();
    let result2 = agency2.getNumber_VAT();
    let result3 = agency3.getNumber_VAT();

    expect(result1).toEqual('BE1234567890');
    console.log('! Agency VAT Number - BE1234567890 - returned successfully !');

    expect(result2).toEqual('BE0987654321');
    console.log('! Agency VAT Number - BE0987654321 - returned successfully !');

    expect(result3).toEqual('BE1029384756');
    console.log('! Agency VAT Number - BE1029384756 - returned successfully !');

    console.log('Exiting the NUMBER VAT Test...');
    console.log('-------------------------------------------');
  });
     /*---------------PHONE TEST-------------*/

  it('It should return all correct phone of the agencies', () => {
    console.log('-------------------------------------------');
    console.log('Entering the PHONE Test...');

    let result1 = agency1.getPhone();
    let result2 = agency2.getPhone();
    let result3 = agency3.getPhone();

    expect(result1).toEqual('+32477633634');
    console.log('! Agency Phone Number - +32477633634 - returned successfully !');

    expect(result2).toEqual('+32477633632');
    console.log('! Agency Phone Number - +32477633632 - returned successfully !');

    expect(result3).toEqual('+32477633631');
    console.log('! Agency Phone Number - +32477633631 - returned successfully !');

    console.log('Exiting the PHONE Test...');
    console.log('-------------------------------------------');
  });

});
