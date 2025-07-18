### Importing the Collection
- The Postman collection file MultiStepFormAPI.postman_collection.json is included in the project.
- Import it into Postman:
- Open Postman → Import → Select the file → Import

### Environment Setup
- The collection uses the variable {{baseUrl}} for the server URL.
- Set this variable to your running server’s URL, e.g. http://localhost:3000.

### Available API Endpoints

| Endpoint            | Method | Description                          |
| ------------------- | ------ | ------------------------------------ |
| `/form/save-step-1` | POST   | Save personal details (Step 1)       |
| `/form/save-step-2` | POST   | Save address details (Step 2)        |
| `/form/save-step-3` | POST   | Complete and save full form (Step 3) |
| `/form/progress`    | GET    | Get current saved form progress      |

### Example Requests
- Save Step 1: Provide JSON with firstName, lastName, and email.
- Save Step 2: Provide JSON with street, city, and postCode.
- Save Step 3: Usually no body; finalizes and returns the full form data.
- Get Progress: No body; returns saved data and current step.