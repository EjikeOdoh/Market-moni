const key = "e76eab907b16b1abb091559851cb5f82"

const API = "https://rgw.k8s.apis.ng/centric-platforms/uat"

const createConsumerForm = document.querySelector("#newUserForm")
const loanElegibilityForm = document.getElementById("eligibility-form")
const loanEligibilityResult = document.getElementById("eligibility-result")

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
      ClientID: key,
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
  const endpoint = form.action

  try {
    const formData = new FormData(form)
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
