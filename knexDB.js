const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'demo'
  }
});

// console.log(knex('user').select());

// knex('user').select('*').
//     where({
//       user_name: 'cat'
//     })
//     .then((projectNames) => {
//       // console.log(projectNames)
//       for(result in projectNames) {
//         console.log(projectNames[result]);
//       }
//     }).catch((err) => {
//       console.error(err)
//     })

// knex('user')
//     .insert({user_name: 'knexUserName'})
//     .then(result => {
//       console.log(result)
//     })

// knex('user')
//   .where('user_id', '16')
//   .update({
//     user_name: 'zhang',
//   }).then(result => {
//     console.log(result)
//   })

// knex('user')
//   .where('user_id', '16')
//   .del()
//   .then(result => {
//     console.log(result)
//   })

knex('user')
  .select('*')
  .leftJoin('user_ii', 'user.user_id', 'user_ii.user_id')
  .where('user.user_id', '<' , '16')
  .andWhere((builder) => {
    builder.whereIn('gender', ['2','3','4'])
  })
  .then((projectNames) => {
        for(result in projectNames) {
          console.log(projectNames[result]);
        }
      }).catch((err) => {
        console.error(err)
      })