const validationHelper = require('../helpers/validationHelper')
const formStorage = require('../storage/formStorage')
const { getOrCreateSessionUserId } = require('../helpers/sessionHelpers')

const postPersonalDetails = async (req, res) => {
  try {
    const userId = getOrCreateSessionUserId(req)
    const formData = req.body
    const errors = validationHelper.getValidationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const personalDetails = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      userId: userId,
      errors: {}
    }

    formStorage.saveStep(userId, 1, formData)

    console.log(`Personal details saved for user ${userId}:`, formData)

    res.status(200).send({ message: 'Personal details saved successfully' })
  } catch (error) {
    console.error('Error saving personal details:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  postPersonalDetails
}
