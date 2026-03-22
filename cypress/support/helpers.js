/**
 * Generates a random UUID v4.
 * Used to simulate a unique device ID per request,
 * just like a real browser would on a new device.
 *
 * @returns {string}  e.g. "3f6b2c1d-4e5a-4b3c-8d9e-1f2a3b4c5d6e"
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

module.exports = { generateUUID }