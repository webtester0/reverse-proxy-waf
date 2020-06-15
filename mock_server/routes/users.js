let express = require('express');
let router = express.Router();

/* GET userlist. */
router.post("/signup",function (req, res) {
    let db = req.db;
    let collection = db.get('users');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: 'User Created'} : {msg: err}
        );
    });
});

router.post("/login",function (req, res) {
    let username = req["body"]["username"];
    let password = req["body"]["password"];
    console.log(username);
    console.log(password);
    let db = req.db;
    let collection = db.get('users');
    collection.find({username:username,password:password}, {}, function (e, docs) {
        console.log(docs);
        if(docs.length>0){
            res.send({msg:"logged in"});
        }else{
            res.send({msg:"not logged in"});
        }
    });
});

router.get('/userlist', function (req, res) {
    let db = req.db;
    let collection = db.get('userlist');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get("/", function (req, res, next) {
    let db = req.db;
    let collection = db.get('userlist');

    let user_name = req.query.user;
    console.log(user_name);

    collection.find({username:user_name}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* POST to adduser. */
router.post('/adduser', function (req, res) {
    let db = req.db;
    let collection = db.get('userlist');
    console.log(req.body);
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

/* DELETE to deleteuser. */
router.delete('/deleteuser/:id', function (req, res) {
    let db = req.db;
    let collection = db.get('userlist');
    let userToDelete = req.params.id;
    collection.remove({'_id': userToDelete}, function (err) {
        res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
    });
});



module.exports = router;