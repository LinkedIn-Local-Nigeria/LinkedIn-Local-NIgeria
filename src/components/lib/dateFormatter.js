// To convert a date in this format '2025-09-29T09:00:00.000Z' to '2025.09.29
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toISOString().split('T')[0].replace(/-/g, '.')
}

// To extract the time and convert to 12 hour
const formatTime = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

export {formatDate,formatTime}