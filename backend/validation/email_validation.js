
const test_email =  /^[a-zA-Z0-9_/*-+'#$%^{}]+@[a-z]+\.[a-zA-Z]+$/;
exports.email_test = (req , res , next) =>{
    // validation of email
    let valid = test_email.test(req.body.email);
    if(req.method == 'POST' && !valid){
        return res.status(400).json({'email_err' : 'Invalid email !'});
    }
    next();
}