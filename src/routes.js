const express = require('express');
const router = express.Router();
const path = require('path'); 
router.use(express.json());
// router.use(express.static("express"));

const BasicUrlController = require('./controllers/BasicUrlController');
router.get('/',(req,res) =>{
    var options = { 
        root: path.join(__dirname) 
    }; 
    res.sendFile("\\views\\home.html",options);
});
router.get('/:id',BasicUrlController.redirect);
router.post('/url',BasicUrlController.store);

module.exports = router; 