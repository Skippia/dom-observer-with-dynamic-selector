/**
 * @description Browser helpers (DOM, Chrome API, ...)
 */
const BrowserH = (() => {
  const getElementBySelector = selector => document.querySelector(selector)
  const getValueBySelector = selector => getElementBySelector(selector).value.trim()
  const updateElValue = (el, value) => el.value = value

  const updateStatus = (message) => {
    const statusEl = getElementBySelector('#status')
    statusEl.textContent = message
    setTimeout(() => {
      statusEl.textContent = ''
    }, 3000)
  }

  const setClickOnSelector = (selector, cb) => {
    document.querySelector(selector).addEventListener('click', cb)
  }

  const chromeSendMessage = ({
    statusMessageBefore,
    action,
    data,
    statusMessageAfter,
  }) => {
    if (statusMessageBefore) updateStatus(statusMessageBefore)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const context = data ? { action, data } : { action }

      chrome.tabs.sendMessage(tabs[0].id, context, () => {
        if (statusMessageAfter) updateStatus(statusMessageAfter)
      })
    })
  }

  function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioCtx.createOscillator()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime)
    oscillator.connect(audioCtx.destination)
    oscillator.start()

    setTimeout(() => {
      oscillator.stop()
      audioCtx.close()
    }, 500)
  }

  const ChromeStorage = {
    set(key, cb) {
      chrome.storage.local.set(key, cb)
    },
    get(key, cb) {
      chrome.storage.local.get(key, cb)
    },
  }

  return {
    chromeSendMessage,
    getElementBySelector,
    getValueBySelector,
    setClickOnSelector,
    updateElValue,
    updateStatus,
    playBeep,
    // ...
    ChromeStorage,
  }
})()

/**
 * @description Application helpers
 */
const AppH = (() => {
  const debounce = (fn, ms) => {
    let timeoutId

    return (...args) => {
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        fn(...args)
      }, ms)
    }
  }

  const configureFlashNode = (node) => {
    let isAlreadyRun = false
    let originalBorder
    let originalBorderRadius

    const clearFlash = debounce(() => {
      if (!node) return

      node.style.border = originalBorder
      node.style.originalBorderRadius = originalBorderRadius
    }, 1000)

    const runFlash = () => {
      if (!isAlreadyRun) {
        originalBorder = node.style.border
        originalBorderRadius = node.style.borderRadius
        isAlreadyRun = true
      }

      node.style.border = '5px solid #dd0930'
      node.style.borderRadius = '5px'

      setTimeout(() => {
        clearFlash()
      }, 3000)
    }

    return {
      clearFlash,
      runFlash,
    }
  }

  const stopApp = (observer, flashNode) => {
    if (observer) {
      observer.disconnect()
      observer = null

      if (flashNode) flashNode.clearFlash()
    }
  }

  const parseCurrencyString = val => Math.abs(val.replace(/[^0-9.-]+/g, ''))

  const getCurrentParsedDate = () => new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'long',
  }).format(new Date())

  return {
    configureFlashNode,
    stopApp,
    parseCurrencyString,
    getCurrentParsedDate,
  }
})()
