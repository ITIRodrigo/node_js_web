const express = require('express');
const router = express.Router();
const db = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.get('/add', isLoggedIn, (req, res) => {
    res.render('../views/links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.idUser
    }
    const r = await db.query('INSERT INTO links set ?', [newLink])
    req.flash('Exito!', 'Link guardado correctamente')
    res.redirect('/links');
    console.log(r);
});

router.get('', isLoggedIn, async (req, res) => {
    const links = await db.query('SELECT * FROM links where user_id = ?', [req.user.idUser]);
    res.render('../views/links/list', {links})
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE idlink = ?', [id])
    res.redirect('/links');
})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const link_by_id = await db.query('SELECT * FROM links WHERE idlink = ?', [id])
    res.render('../views/links/edit', {link: link_by_id[0]});
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    }
    await db.query('UPDATE links set ? WHERE idlink = ?', [newLink,id])
    res.redirect('/links');
})

module.exports = router;