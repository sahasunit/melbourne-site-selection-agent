import { ApiError } from './ApiError'

// Base URL comes from the environment only — never hardcoded, per the API contract.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function askQuestion(question, conversationId) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, conversation_id: conversationId }),
    })
  } catch {
    throw new ApiError(null, "Couldn't reach the server. Check your connection and try again.")
  }

  let body = null
  try {
    body = await response.json()
  } catch {
    // some error responses may not carry a JSON body
  }

  if (!response.ok) {
    const detail = body?.detail ?? 'Something went wrong. Please try again later.'
    throw new ApiError(response.status, detail)
  }

  return body // { answer, conversation_id, results }
}
