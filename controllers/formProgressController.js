const formStorage = require('../storage/formStorage')
const { getOrCreateSessionUserId } = require('../helpers/sessionHelpers')

const getFormProgress = async (req, res) => {
    const userId = getOrCreateSessionUserId(req)
    const progress = formStorage.getProgress(userId)
  console.log(`Progress for user ${userId}:`, progress)
    res.status(200).json({
        progress: progress
    })
  
}

module.exports = {
    getFormProgress
}