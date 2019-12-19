const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Pagina principal'})
})

router.get('/contact', (req, res) => {
    res.render('contact.html', {title: 'Pagina de contacto'})
})

module.exports = router;