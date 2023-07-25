// create web server with express
const express = require('express');
const app = express();
const port = 3000;
// import comments
const comments = require('./comments.json');
// import body-parser
const bodyParser = require('body-parser');
// import fs
const fs = require('fs');
// use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// use express.static
app.use(express.static('public'));
// set template engine
app.set('view engine', 'ejs');
// set template directory
app.set('views', './views');
// route
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/comments', (req, res) => {
  res.render('comments', {comments});
});
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id == id);
  res.render('comment', {comment});
});
app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    name: req.body.name,
    content: req.body.content
  };
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/comments');
});
// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});