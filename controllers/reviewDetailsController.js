const formStorage = require('../storage/formStorage')
const { getOrCreateSessionUserId } = require('../helpers/sessionHelpers')

const postFormReview = async (req, res) => {
  try {
    const userId = getOrCreateSessionUserId(req)

    // Retrieve saved data from step 1 and 2
    const personalDetails = formStorage.getProgress(userId, 1) || {}
    const addressDetails = formStorage.getProgress(userId, 2) || {}

    // Combine into a single final payload
    const finalData = {
      ...personalDetails,
      ...addressDetails
    }

    // Final save (could be to a DB or external service)
    formStorage.saveStep(userId, 3, finalData) // Optional: store final submission as step 3

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
