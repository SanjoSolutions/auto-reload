const lastReloadDateKey = 'lastReloadDate'

function getLastReloadDate() {
  const value = localStorage.getItem(lastReloadDateKey)
  let result
  if (value) {
    result = new Date(value)
  } else {
    result = null
  }
  return result
}

function setLastReloadDate(lastReloadDate) {
  let value
  if (lastReloadDate) {
    value = lastReloadDate.toISOString()
  } else {
    value = null
  }
  localStorage.setItem(lastReloadDateKey, value)
}

if (!getLastReloadDate()) {
  setLastReloadDate(new Date())
}

const port = window.AUTO_RELOAD_PORT || 8080
const webSocket = new WebSocket(
  `ws://localhost:${port}`
)
webSocket.onerror = function (event) {
  console.error('WebSocket error:', event)
}
webSocket.onmessage = function (event) {
  const lastChangedText = event.data
  const lastChanged = new Date(lastChangedText)
  const lastReloadDate = getLastReloadDate()
  if (lastChanged > lastReloadDate) {
    setLastReloadDate(lastChanged)
    location.reload()
  }
}
