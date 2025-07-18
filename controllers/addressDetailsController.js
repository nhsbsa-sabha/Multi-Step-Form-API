const { validationResult } = require('express-validator')
const formStorage = require('../storage/formStorage')
const { getOrCreateSessionUserId } = require('../helpers/sessionHelpers')

const postAddressDetails = async (req, res) => {
  try {
    const userId = getOrCreateSessionUserId(req)
    const formData = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const personalDetails = {
      street: formData.street,
      city: formData.city,
      postCode: formData.postCode,
      userId: userId,
      errors: {}
    }

    
    await formStorage.saveStep(userId, 2, formData)

    console.log(`Address details saved for user ${userId}:`, formData)

    res.status(200).send({ message: 'Address details saved successfully' })
  } catch (error) {
    console.error('Error saving address details:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  postAddressDetails
}
