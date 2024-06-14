const express = require('express');
const articleRouter = require("./routes/articles");
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/bharatInternDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set("views", "./views");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  console.log('Received request for /');
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    console.log('Articles fetched:', articles);
    res.render('articles/index', { articles: articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/articles', articleRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
