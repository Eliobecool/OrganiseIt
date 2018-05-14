import { User } from '../domain/user';


describe('User TEST', () => {
    let user1 = new User('undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');
    let user2 = new User('undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');
    let user3 = new User('undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');


  beforeEach(() => {
 
    /*
    * Setting all the user with the setter functions before using the getter functions
    * in our tests
    */

    user1.setUsername('Andres95');
    user2.setUsername('Elio234');
    user3.setUsername('Vincent1976');
    /*----------*/
    user1.setName('Andres');
    user2.setName('Elio');
    user3.setName('Vincent');
    /*----------*/
    user1.setSurname('Fernandes');
    user2.setSurname('Pani');
    user3.setSurname('Verpoten');
    /*----------*/
    user1.setAdress('Rue de la ferme blanche, 10. 1490 Court-St-Etienne');
    user2.setAdress('Rue des Pommiers, 20. 1348 Louvain-la-Neuve');
    user3.setAdress('Rue des Voitures, 4. 1348 Louvain-la-Neuve');
    /*----------*/
    user1.setEmail('andres.fernandes@student.uclouvain.be');
    user2.setEmail('elio.pani@student.uclouvain.be');
    user3.setEmail('vincent.verpoten@student.uclouvain.be');
    /*----------*/
    user1.setGender('Male');
    user2.setGender('Male');
    user3.setGender('Male');
    /*----------*/
    user1.setPassword('1234');
    user2.setPassword('5678');
    user3.setPassword('9123');



  });

 /*---------------USERNAME TEST-------------*/

  it('It should return all correct usernames of the users', () => {
    console.log('-------------------------------------------');
    console.log('Entering the USERNAME Test...');


    let result1 = user1.getUsername();
    let result2 = user2.getUsername();
    let result3 = user3.getUsername();

    expect(result1).toEqual('Andres95');
    console.log('! Username - Andres95 - returned successfully !');

    expect(result2).toEqual('Elio234');
    console.log('! Username - Elio234 - returned successfully !');

    expect(result3).toEqual('Vincent1976');
    console.log('! Username - Vincent1976 - returned successfully !');

    console.log('Exiting the USERNAME Test...');
    console.log('-------------------------------------------');
  });

   /*---------------NAME AND SURNAME TEST-------------*/

it('It should return all correct names and surnames of the users', () => {
    console.log('-------------------------------------------');
    console.log('Entering the NAME and SURNAME Test...');

    let result1 = user1.getName();
    let result2 = user2.getName();
    let result3 = user3.getName();
    /*------------*/
    let result4 = user1.getSurname();
    let result5 = user2.getSurname();
    let result6 = user3.getSurname();



    expect(result1).toEqual('Andres');
    console.log('! Name - Andres - returned successfully !');

    expect(result2).toEqual('Elio');
    console.log('! Name - Elio - returned successfully !');

    expect(result3).toEqual('Vincent');
    console.log('! Name - Vincent - returned successfully !');

    expect(result4).toEqual('Fernandes');
    console.log('! Surname - Fernandes - returned successfully !');

    expect(result5).toEqual('Pani');
    console.log('! Surname - Pani - returned successfully !');

    expect(result6).toEqual('Verpoten');
    console.log('! Surname - Verpoten - returned successfully !');

    console.log('Exiting the NAME and SURNAME Test...');
    console.log('-------------------------------------------');

  });

  /*---------------COMPLETE NAME TO STRING TEST-------------*/

  it('It should return the complete correct name of the users', () => {
    console.log('-------------------------------------------');
    console.log('Entering the COMPLETE NAME TO STRING TEST...');

    let result1 = user1.completeNameToString();
    let result2 = user2.completeNameToString();
    let result3 = user3.completeNameToString();
    /*------------*/
    

    expect(result1).toEqual('Andres Fernandes');
    console.log('! Complete String Name - Andres Fernandes - returned successfully !');

    expect(result2).toEqual('Elio Pani');
    console.log('! Complete String Name - Elio Pani - returned successfully !');

    expect(result3).toEqual('Vincent Verpoten');
    console.log('! Complete String Name - Vincent Verpoten - returned successfully !');

    console.log('Exiting the COMPLETE NAME TO STRING Test...');
    console.log('-------------------------------------------');

  });

   /*---------------ADRESS TEST-------------*/

  it('It should return all correct adresses of the users', () => {
    console.log('-------------------------------------------');
    console.log('Entering the ADRESS Test...');

    let result1 = user1.getAdress();
    let result2 = user2.getAdress();
    let result3 = user3.getAdress();

    expect(result1).toEqual('Rue de la ferme blanche, 10. 1490 Court-St-Etienne');
    console.log('! Adress - Rue de la ferme blanche, 10. 1490 Court-St-Etienne - returned successfully !');

    expect(result2).toEqual('Rue des Pommiers, 20. 1348 Louvain-la-Neuve');
    console.log('! Adress - Rue des Pommiers, 20. 1348 Louvain-la-Neuve - returned successfully !');

    expect(result3).toEqual('Rue des Voitures, 4. 1348 Louvain-la-Neuve');
    console.log('! Adress - Rue des Voitures, 4. 1348 Louvain-la-Neuve - returned successfully !');

    console.log('Exiting the ADRESS Test...');
    console.log('-------------------------------------------');
  });

   /*---------------EMAIL TEST-------------*/

  it('It should return all correct usernames of the users', () => {
    console.log('-------------------------------------------');
    console.log('Entering the EMAIL Test...');

    let result1 = user1.getEmail();
    let result2 = user2.getEmail();
    let result3 = user3.getEmail();

    expect(result1).toEqual('andres.fernandes@student.uclouvain.be');
    console.log('! Email - andres.fernandes@student.uclouvain.be - returned successfully !');

    expect(result2).toEqual('elio.pani@student.uclouvain.be');
    console.log('! Email - elio.pani@student.uclouvain.be - returned successfully !');

    expect(result3).toEqual('vincent.verpoten@student.uclouvain.be');
    console.log('! Email - vincent.verpoten@student.uclouvain.be - returned successfully !');

    console.log('Exiting the EMAIL Test...');
    console.log('-------------------------------------------');
  });

      /*---------------GENDER TEST-------------*/

  it('It should return all correct gender of the users', () => {
    console.log('-------------------------------------------');
    console.log('Entering the GENDER Test...');

    let result1 = user1.getGender();
    let result2 = user2.getGender();
    let result3 = user3.getGender();

    expect(result1).toEqual('Male');
    console.log('! Gender - Male - returned successfully !');

    expect(result2).toEqual('Male');
    console.log('! Gender - Male - returned successfully !');

    expect(result3).toEqual('Male');
    console.log('! Gender - Male - returned successfully !');

    console.log('Exiting the Gender Test...');
    console.log('-------------------------------------------');
  });

     /*---------------PASSWORD TEST-------------*/

  it('It should return all correct passwords of the users', () => {
    console.log('-------------------------------------------');
    console.log('Entering the PASSWORD Test...');

    let result1 = user1.getPassword();
    let result2 = user2.getPassword();
    let result3 = user3.getPassword();

    expect(result1).toEqual('1234');
    console.log('! Password - 1234 - returned successfully !');

    expect(result2).toEqual('5678');
    console.log('! Password - 5678 - returned successfully !');

    expect(result3).toEqual('9123');
    console.log('! Password - 9123 - returned successfully !');

    console.log('Exiting the PASSWORD Test...');
    console.log('-------------------------------------------');
  });


});
