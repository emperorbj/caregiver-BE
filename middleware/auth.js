import jwt from 'jsonwebtoken';

export const authenticateToken = (request,response,next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return response.status(401).json({status:"false",message: "No token provided"});
    }

    try {
        const decoded = jwt.decode(token,process.env.JWT_SECRET_KEY)
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(403).json({status:"false",message: error.message});
    }
}



export const CheckRole = (roles) => {
    return (request,response,next) => {
        if(!roles.includes(request.user.role)){
            return response.status(403).json({status:"false",message: "Access Denied Role Required"});
        }
        next();
    }
}

export default {authenticateToken,CheckRole}