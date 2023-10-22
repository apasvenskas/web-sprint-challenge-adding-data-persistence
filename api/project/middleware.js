


const checkRouter = (req, res, next) => {
    const router = req.router; 
    if(!router || typeof router !== "function" || !router.post || !router.get) {
        res.status(400).json({message: 'Invalid router'});
    } else {
        next();
    }
};

module.exports = checkRouter;