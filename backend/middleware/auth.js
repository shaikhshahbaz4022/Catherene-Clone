const jwt=require('jsonwebtoken')


const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        jwt.verify(token, "privateKey", function(err, decoded) {
            if(decoded){
                req.body.userID=decoded.userID
                req.body.quantity = 1
                next()
            }else{
                res.status(401).send({"msg":"Wrong Credentials"})
            }
          });
    }else{
        res.status(401).send({"msg":"Login First"})
    }
}
module.exports=auth