const formStorage = require('../storage/formStorage')
const { getOrCreateSessionUserId } = require('../helpers/sessionHelpers')

const postFormReview = async (req, res) => {
  try {
    const userId = getOrCreateSessionUserId(req)

    const personalDetails = formStorage.getProgress(userId, 1) || {}
    const addressDetails = formStorage.getProgress(userId, 2) || {}

    const finalData = {
      ...personalDetails,
      ...addressDetails
    }

    formStorage.saveStep(userId, 3, finalData) 

    console.log(`Final submission for user ${userId}:`, finalData)

    res.status(200).json({
      message: 'Form review submitted successfully',
      submittedData: finalData
    })
  } catch (error) {
    console.error('Error submitting form review:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  postFormReview
}
