const apiKey = "e76eab907b16b1abb091559851cb5f82"

const API = "https://rgw.k8s.apis.ng/centric-platforms/uat"

const createConsumerForm = document.querySelector("form[name='newUserForm']")
if (createConsumerForm !== null)
  createConsumerForm.addEventListener("submit", handleCreateConsumer)

const loanElegibilityForm = document.querySelector(
  'form[name="eligibilityForm"]'
)

if (loanElegibilityForm !== null)
  loanElegibilityForm.addEventListener("submit", handleEligibility)

const loanRequestForm = document.querySelector('form[name="eligibilityResult"]')
if (loanRequestForm !== null)
  loanRequestForm.addEventListener("submit", handleLoanRequest)

/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function postFormDataAsJson({ endpoint, formData }) {
  const plainFormData = Object.fromEntries(formData.entries())
  const formDataJsonString = JSON.stringify(plainFormData)

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ClientID: apiKey,
    },
    body: formDataJsonString,
  }

  const url = API + endpoint
  const response = await fetch(url, fetchOptions)

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage)
  }

  return response.json()
}

/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleCreateConsumer(event) {
  event.preventDefault()

  const form = event.currentTarget
  console.log(form)
  const endpoint = "/enaira-user/CreateConsumerV2"

  try {
    const formData = new FormData(form)
    console.log(formData.entries())
    const responseData = await postFormDataAsJson({ endpoint, formData })

    console.log({ responseData })
  } catch (error) {
    console.error(error)
  }
}

function handleEligibility(event) {}

function handleLoanRequest(event) {}

// const exampleForm = document.getElementById("example-form")
// exampleForm.addEventListener("submit", handleFormSubmit)
