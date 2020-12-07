var express = require('express');
const app = express()
const port = 3310
const multer = require('multer')
const fs = require('fs-extra')

const upload = multer({
  limit: {
    // 限制上傳檔案的大小為 10MB
    fileSize: 10000000
  }
})

app.set('view engine', 'ejs')

app.use('/api/user', require('./expressUser'));
app.use('/api/product', require('./expressProduct'));

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.render('homePage',{
    message: 'Hello World',
    button: '<button id="b1">我是按鈕</button>',
    countList:[0,1,1,2,3,5,8,13,21,34,55]
  })
})

app.post('/picture/upload', upload.single('avatar'), (req, res, next) => {
  var file = req.file.buffer
  fs.createWriteStream('./pic/upload.jpg').write(file)
  console.log(req.file)
  console.log(req.body)
  res.send('get it')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})