const session = require("express-session")

const formProgressStorage = {}
const saveStep =(sessionId, step, formData) => {
  if (!formProgressStorage[sessionId]) {
    formProgressStorage[sessionId] = {
        currentStep: step,
        personalDetails:{}
    }
  }
 formProgressStorage[sessionId].currentStep = Math.max(formProgressStorage[sessionId].currentStep, step)
 if (step === 1) {
    formProgressStorage[sessionId].personalDetails = {
      ...formProgressStorage[sessionId].personalDetails,
      ...formData
  }
}
else if (step === 2) {
    formProgressStorage[sessionId].addressDetails = {
      ...formProgressStorage[sessionId].addressDetails,
      ...formData
    }
  }
    else if (step === 3) {  
    formProgressStorage[sessionId].completeFormData = {
            personalDetails: formProgressStorage[sessionId].personalDetails,
            addressDetails: formProgressStorage[sessionId].addressDetails
        } 
  
}
}
const getProgress = (sessionId) => {
    return formProgressStorage[sessionId] || null
}

const resetStorage = () => {
  Object.keys(formProgressStorage).forEach(key => delete formProgressStorage[key])
}
module.exports = {
  saveStep,
  getProgress,
  resetStorage
}