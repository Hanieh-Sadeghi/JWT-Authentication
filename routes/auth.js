const router = require ('express').Router();

router.post('/signup' ,(req ,res) => {
    const {password , email} = req.body;

    console.log(password, email)
    
    res.send('Auth route working')
})


module.exports = router