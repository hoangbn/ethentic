const express = require('express');
const router = express.Router();
const axios = require('axios');
let Article = require('../models/articleModel');

const GOOGLE_API_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search";

router.get('/', (req, res) => {
    Article.find()
        .then(articles => res.send(articles))
        .catch(err => res.status(500).send(err));
});

router.post('/', async (req, res) => {
    const { title, content, source } = req.body;
    try {
        const truthData = (await axios.get(GOOGLE_API_URL, {
            params: {
                query: content,
                key: process.env.GOOGLE_API_KEY
            }
        })).data;
        if (!truthData.claims) return res.status(404).send("Couldn't evaluate the truth of the article");
        const isTrue  = truthData.claims[0].claimReview[0].textualRating === "True";
        const newArticle = new Article({title, content, source, isTrue });
        res.send(await newArticle.save());
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', (req, res) => {
    Article.findOne({ _id: req.params.id })
        .then(article => res.send(article))
        .catch(err => res.status(500).send(err));
});

router.put('/:id/addUserReview', async (req, res) => {
    const review = req.body.review;
    try {
        const article = await Article.findOne({ _id: req.params.id });
        if (!article) return res.status(404).send("Article not found");
        article.userReviewCount++;
        if (review == true) article.userTrueCount++;
        res.send(await article.save());
    } catch(err) {
        res.status(500).send(err);
    }
});

router.delete('/:id', (req, res) => {
    Article.deleteOne({ _id: req.params.id }, err => {
        if (err) return res.status(500).send(err);
        res.end();
    })
});

router.delete('/', (req, res) => {
    Article.deleteMany({}, err => {
        if (err) return res.status(500).send(err);
        res.send("Deleted all documents");
    })
});


module.exports = router;
