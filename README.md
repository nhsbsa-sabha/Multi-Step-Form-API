# Multi-Step Form API

A Node.js Express API backend to handle a multi-step form submission process with session management and validation.

---

## Features

- **Multi-step form** with session-based progress tracking
- Validation for personal details and address information using `express-validator`
- In-memory session storage (for demonstration purposes)
- Well-structured API routes and controllers
- Unit tests with Mocha, Chai, and Sinon

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/yourusername/multi-step-form-api.git
cd multi-step-form-api
npm install


### Running the API
npm start

### API Endpoints
* POST /form/save-step-1

- Save personal details.
- Body Parameters:
- firstName (string, required)
- lastName (string, required)
- email (string, required, valid email)

* POST /form/save-step-2
- Save address details.
- Body Parameters:
- street (string, required)
- city (string, required)
- postCode (string, required, UK postcode format)
- POST /form/save-step-3
- Finalize the form submission.

* GET /form/progress
- Get the current form progress stored in session.

### Validation Rules

* Personal Details:
- firstName and lastName: required, max 50 chars, letters and spaces only
- email: valid email format, max 100 chars

* Address Details:
- street: required, max 50 chars
- city: required, max 20 chars
- postCode: required, valid UK postcode format

### Running test
npm test

### Project Structure
├── routes/
│   └── apiRoutes.js            # Express routes for the API
├── controllers/
│   └── formController.js       # Controllers handling form logic
├── helpers/
│   ├── validationHelper.js    # Validation utility functions
│   └── sessionHelpers.js       # Session-related helper functions
├── storage/
│   └── formStorage.js          # In-memory storage for form progress
├── __test__/                   # Test files
│   ├── apiRoutes.test.js       # Tests for API routes and controllers
│   ├── formStorage.test.js     # Tests for formStorage functionality
│   ├── validationHelper.test.js # Tests for validationHelper functions
│   ├── sessionHelpers.test.js  # Tests for sessionHelpers functions
│   └── app.test.js             # Tests for Express app setup and middleware
├── app.js                      # Main Express app
├── package.json
└── README.md
