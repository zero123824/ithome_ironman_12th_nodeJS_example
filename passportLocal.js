const passport = require('passport')
const LocalStrategy = require('passport-local')
const bodyParser = require('body-parser');
const {knex,connectionConfig} = require('./knexConfig')

const helmet = require('helmet');

const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(
  connectionConfig
)

const app = express()
const port = 3310

app.use(helmet());

app.use(session({
  secret: 'its a expressPassport auth' ,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  // cookie: {
  //     maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
  // }
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * This function is used in conjunction with the `passport.authenticate()` method.  See comments in
 * `passport.use()` above ^^ for explanation
 */
passport.serializeUser(function (user, cb) {
  cb(null, user.userId);
});

/**
* This function is used in conjunction with the `app.use(passport.session())` middleware defined below.
* Scroll down and read the comments in the PASSPORT AUTHENTICATION section to learn how this works.
* 
* In summary, this method is "set" on the passport object and is passed the user ID stored in the `req.session.passport`
* object later on.
*/
passport.deserializeUser(async function (id, cb) {
  var user = await knex('user').select('*').where('user_id', id).limit(1)
  cb(null, user[0])
});

passport.use(new LocalStrategy(
  // customize user field，預設使用 username 和 password 作為驗證的欄位
  {
    // usernameField: 'email',
    // passportField: 'password',
    passReqToCallback: true, // 如果需要在 verify callback 中取得 req
  },
  // // customize verify callback
  // // 因為上面有註明 passReqToCallback: true，所以第一個參數會是 req
  // async (req, username, password, done) => {
  //   try {
  //     const user = await User.findOne({ where: { email: username } });
  //     if (!user) {
  //       return done(null, false,
  //         // { message: 'Incorrect username.' }
  //         req.flash('error_messages', '帳號或密碼輸入錯誤'),
  //       );
  //     }
  //     if (!bcrypt.compareSync(password, user.password)) {
  //       return done(null, false,
  //         // { message: 'Incorrect password.' }
  //         req.flash('error_messages', '帳號或密碼輸入錯誤'),
  //       );
  //     }
  //     return done(null, user, req.flash('success_messages', '登入成功'));
  //   } catch (error) {
  //     return done(error);
  //   }
  // },
  function (req, username, password, done) {
    // Would perform lookup and verification here.
    // Instead return a valid user object every time.
    console.log(username + ' ; ' + password)

    knex('user').select('*')
    .where('user_name', username)
    .andWhere('password', password)
    .then((resultArray) => {
      if(resultArray.length < 1) {
        return done(null, user, {'message': '帳號或密碼輸入錯誤'});
      } else {
        var user = { username: username, userId: resultArray[0].user_id};
        return done(null, user, {'message': '登入成功'});
      }
    }).catch((error) => {
      return done(null, false, {'message': error});
    })
  }
));


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', (req, res, next) => {
  // res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
    //獲取session
    console.log(req.user)
	if(req.session.passport && req.session.passport.user){
		res.send('hello ' + req.user.user_name + '，welcome to index  <br> <a href="/logout">登出</a>');
	}else{
    res.send('<h1>Home</h1><p>未登入 <br>Please <a href="/login">login</a></p>');
	}
  // res.send(req.connect)
});

app.get('/login', (req, res, next) => {
  console.log(req.session)
  const form = '<h1>Login Page</h1><form method="POST" action="/login">\
  Enter Username:<br><input type="text" name="username">\
  <br>Enter Password:<br><input type="password" name="password">\
  <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
});

// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/register'}, 
//     (err, user, info) => {
//     if (err) { return next(err) }
//     if (!user) { return res.json( { message: info.message }) }
//     res.json(user);
//     }),
//   ((req, res, next) => {
//     // console.log(req)
//     console.log(res)  
//     res.redirect('/');
//   })
// )

app.post('/api/login', function(req, res, next){
  console.log(req.session)
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.json( { message: info.message }) }

    req.logIn(user, function(err) {
      if (err) return next(err);
      user.token = req.session.id
      // return res.send('<div>登入成功 user information : ' + JSON.stringify(user) + '</div> <br> <a href="/"> return homepage</a>');
      return res.send(JSON.stringify(user));
    })
  })(req, res, next);
});

app.get('/register', (req, res, next) => {

  const form = '<h1>Register Page</h1><form method="post" action="register">\
                  Enter Username:<br><input type="text" name="username">\
                  <br>Enter Password:<br><input type="password" name="password">\
                  <br><br><input type="submit" value="Submit"></form>';

  res.send(form);

});

app.get('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})