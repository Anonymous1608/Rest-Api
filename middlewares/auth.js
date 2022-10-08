import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";
    
const auth = async (req, res, next)=> {
    let authHeader = req.headers.authorization;
    console.log('AUTH HEADER: ', authHeader);
// if header is not present
    if(!authHeader) {
        return next(CustomErrorHandler.unAuthorized())
    }

    //if header present

     const token = authHeader.match(/ey.*/g)[0];
     console.log(token[0]);
    
    try {
        const { _id, role } = JwtService.verify(token);
       //console.log(token[0]);
        const user = {
            _id,
            role
        }
        req.user = user;
        next();
    }
    catch(err) {
        return next(CustomErrorHandler.unAuthorized('Invalid token'));
    }
}



export default auth;