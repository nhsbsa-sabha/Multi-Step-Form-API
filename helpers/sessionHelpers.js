const getOrCreateSessionUserId = (req) => {
 return req.session.id
}
module.exports = {
    getOrCreateSessionUserId
}