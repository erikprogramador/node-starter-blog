var express = require('express')
var router = express.Router()
var moment = require('moment')
var Post = require('../models/Post')

moment.locale('pt-BR')

router.get('/', (request, response) => {
  Post.find({})
    .sort({ created_at: 'desc' })
    .then(posts => {
      posts = posts.map(post => {
        post.body = post.body.slice(0, 200)
        post.createdAt = moment(post.created_at).format('DD MMMM YYYY')
        return post
      })
      response.render('index', { posts })
    })
    .catch(error => console.log(error))
})

router.get('/posts/create', (request, response) => {
  response.render('create')
})

router.post('/posts', (request, response) => {
  const { slug, title, body } = request.body
  const created_at = new Date()
  const updated_at = created_at

  const post = Post({ slug, title, body, created_at, updated_at })
    .save()
    .then(data => response.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/posts/:slug', (request, response) => {
  Post.findOne({ slug: request.params.slug })
    .then(post => {
      post.createdAt = moment(post.created_at).format('DD MMMM YYYY hh:mm:ss')
      response.render('show', { post })
    })
    .catch(error => console.log(error))
})

module.exports = router
