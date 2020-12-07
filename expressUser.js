const express = require('express')
const bodyParser = require('body-parser')
const { knex } = require('./knexConfig')

var userApi = express.Router();
userApi.use(bodyParser.text({ type: '*/*' }))

userApi.get('/', (req, res) => {
  
  if(!req.body) {
    var request = JSON.parse(req.body)
    var userName = request.name
  }
  // console.log(getUser())
  getUser(userName)
    .then(rtn => {
      var results = new Array()
      for (var result in rtn) {
        results.push({
          'name': rtn[result].user_name,
          'id': rtn[result].user_id,
          'age':rtn[result].age,
        })
      }
      res.send(JSON.stringify(results))
    })
    .catch(err => {
      res.status(500).send(err.toString())
    })
})

userApi.post('/', (req, res) => {
  console.log(req.body)
  var user = JSON.parse(req.body)
  insertUser(user)
    .then(rtn => {
      res.send({userId : rtn})
    })
    .catch(err => {
      res.status(500).send(err.toString())
    })
})

userApi.put('/', (req, res) => {
  var user = JSON.parse(req.body)
  user.age += 1
  res.send('return user info is ' + JSON.stringify(user))
})

userApi.delete('/', (req, res) => {
  var userId = JSON.parse(req.body)
  deleteUser(userId).then(() => {
    res.send('user is deleted : ' + userId)
  }).catch(err => {
    console.log(err)
  })
})

async function getUser(conditions) {
  var results = []

  // if(!conditions) {
  //   conditions = ''
  // }
  
  await knex('user')
    .select('user.user_id', 'user.user_name', 'user_ii.gender', 'user_ii.age')
    .leftJoin('user_ii', 'user.user_id', 'user_ii.user_id')
    // .where('user.user_name', 'like', conditions)
    .then((resultArray) => {
      console.log(resultArray)
      results = resultArray
    }).catch((err) => {
      console.log(err)
      throw err
    })

  return results
}

async function insertUser(userInfo) {
  var successId
  // await knex('user')
  // .insert({ 
  //   'user.user_name' : userInfo.name
  // })
  // .returning('user_id')
  // .then((result) => {
  //   console.log(result)
  //   successId = result
  // }).catch((err) => {
  //   console.error(err)
  //   throw err
  // })

  // await knex('user_ii')
  // .insert({ 
  //   'user_ii.user_id' : successId,
  //   'user_ii.gender' : 'userInfo.gender'
  // })
  // .then((result) => {
  //   console.log(result)
  // }).catch((err) => {
  //   console.error(err)
  //   throw err
  // })

  await knex.transaction(async (trx) => {
    await knex('user')
      .transacting(trx)
      .insert({
        'user.user_name': userInfo.name,
        'user.password': '123456'
      })
      .returning('user_id')
      .then((result) => {
        successId = result
      }).catch((err) => {
        console.error(err)
        throw err
      })


    await knex('user_ii')
      .transacting(trx)
      .insert({
        'user_ii.user_id': successId,
        'user_ii.age': userInfo.age
      })
      .then((result) => {
        console.log(result)
      }).catch((err) => {
        console.error(err)
        throw err
      })
  })

  return successId
}

async function deleteUser(userId) {
  knex('user_ii')
    .where('user_id', userId)
    .del()
    .then(result => {
      console.log(result)
    })

  knex('user')
    .where('user_id', userId)
    .del().then(result => {
      console.log(result)
    })
}


module.exports = userApi;