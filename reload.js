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

async function check() {
  const response = await fetch('http://localhost:8080')
  const lastChangedText = await response.text()
  const lastChanged = new Date(lastChangedText)
  const lastReloadDate = getLastReloadDate()
  if (lastChanged > lastReloadDate) {
    setLastReloadDate(lastChanged)
    location.reload()
  }
  scheduleNextCheck()
}

function scheduleNextCheck() {
  setTimeout(check, 200)
}

if (!getLastReloadDate()) {
  setLastReloadDate(new Date())
}
scheduleNextCheck()
