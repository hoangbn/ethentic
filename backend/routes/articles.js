const express = require('express');
const router = express.Router();
let Article = require('../models/articleModel');

router.get('/', (req, res) => {
    Article.find()
        .then(articles => res.send(articles))
        .catch(err => res.status(500).send(err));
});

router.post('/', (req, res) => {
    const { title, content } = req.body;
    const newArticle = new Article({title, content, userReviewCount: 0});
    newArticle.save()
        .then(article => res.send(article))
        .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    Article.findOne({ _id: req.params.id })
        .then(article => res.send(article))
        .catch(err => res.status(500).send(err));
});

router.put('/:id/addUserReview', async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id });
        if (!article) return res.status(404).send("article not found");
        article.userReviewCount++;
        res.send(await article.save());
    } catch(err) {
        res.status(500).send(err)
    }
});

module.exports = router;
