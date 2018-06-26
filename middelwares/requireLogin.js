module.exports = (req, res, next) => {
    if (!req.user) {
        // forbidden, not signed in
        return res.status(401).send({ error: "You must log in to add credits!" })
    }

    // continue to next middelware
    next();
};