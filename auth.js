function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader =req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split ar the space
        const bearer =bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}

module.exports = verifyToken