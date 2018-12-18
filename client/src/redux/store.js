const SURVEY_CLIENT_ID = 'SURVEY_CLIENT_ID'
let clientId = localStorage.getItem(SURVEY_CLIENT_ID)
if (!clientId) {
  clientId = '' + Date.now()
  localStorage.setItem(SURVEY_CLIENT_ID, clientId)
}

export const getClientId = () => clientId
