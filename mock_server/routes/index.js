let express = require('express');
let router = express.Router();

/* GET home page. */
router.get("/",function (req, res) {
    res.render('login', { title: 'Login' });
});
router.get("/signup",function (req, res) {
    res.render('signup', { title: 'Signup' });
});


router.get('/dashboard', function(req, res) {
    res.render('index', { title: 'Dashboard' });
});

router.get('/user', function(req, res) {
    res.render('user',{title: 'Express',query:req.query.user});
});

module.exports = router;