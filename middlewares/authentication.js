import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.replace("Bearer ", "");
        if (!token) return res.status(401).send("No Token!");
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.authId = decoded?.userId;
        next();
    } catch (error) {
        res.status(403).send(error);
    }
}

export default authentication; 