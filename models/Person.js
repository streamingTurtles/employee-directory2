const db = require('../config/connection');
require('dotenv').config();

// class Person {
//   getAll() {
//     return db.query(
//       ` SELECT 
//         people.id,
//         first_name,
//         last_name,
//         phone,
//         github_id,
//         addresses.*
//         FROM people INNER JOIN addresses ON people.id = addresses.person_id ORDER BY last_name DESC`
//     );
//   }

//   findUser({ github_id }) {
//     return db.query(
//       `SELECT 
//         github_id, 
//         first_name,
//         last_name
//         FROM people WHERE github_id = $1`,
//       [github_id]
//     );
//   }
//   create({ first_name, last_name, phone, github_id }) {
//     return db.query(
//       `INSERT INTO 
//         people(first_name, last_name, phone, github_id) 
//         VALUES (
//           $1,
//           $2, 
//           $3,
//           $4
//         )
//         RETURNING *`,
//       [first_name, last_name, phone, github_id]
//     );
//   }
// }


// updated above code at 4.2.3 to the following to accommodate the avatar image that
// is to be uploaded to the database.

class Person {
  getAll() {
    return db.query(
      ` SELECT 
        people.id,
        first_name,
        last_name,
        phone,
        github_id,
        avatar,
        addresses.*
        FROM people INNER JOIN addresses ON people.id = addresses.person_id ORDER BY last_name DESC`
    );
  }

  findUser({ github_id }) {
    return db.query(
      `SELECT 
        github_id, 
        first_name,
        last_name
        FROM people WHERE github_id = $1`,
      [github_id]
    );
  }

  create({ first_name, last_name, phone, github_id, avatar }) {
    return db.query(
      `INSERT INTO 
        people(first_name, last_name, phone, github_id, avatar) 
        VALUES (
          $1,
          $2, 
          $3,
          $4,
          $5
        )
        RETURNING *`,
      [first_name, last_name, phone, github_id, avatar]
    );
  }
}






module.exports = new Person();
