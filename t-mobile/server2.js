import express from "express"
import bodyParser from 'body-parser'



var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//设置接口 返回值
app.post('/pubkey', function (req, res) {
  res.send('Hello World ')
})
//设置接口 返回值
app.post('/xAuthorization', function (req, res) {
  console.log(req.body.header)
  console.log(req.body.body)
  res.send('Hello World ')
})

var server = app.listen(7788, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(`Server running at http://${host}:${port}/`)
})