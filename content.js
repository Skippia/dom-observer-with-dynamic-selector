let observer = null
let targetSelector = null
let targetThreshold = null
let lastConfiguredFlashNode = null

const config = {
  childList: false,
  attributes: false,
  subtree: true,
  characterData: true,
}

function observeDOMNode() {
  if (!targetSelector || !targetThreshold) return

  const targetNode = BrowserH.getElementBySelector(targetSelector)
  lastConfiguredFlashNode = AppH.configureFlashNode(targetNode)

  if (!targetNode) {
    console.log(`DOM element "${targetSelector}" not found.`)
    return
  }

  console.log('\n#####################')
  console.log('Start application. Treshold: ', targetThreshold)
  console.log('Track down:', targetNode)
  console.log('#####################\n')

  const callback = function (mutationsList) {
    for (const mutation of mutationsList) {
      const targetValue = mutation.target.data

      if (targetValue) {
        const parsedNumber = AppH.parseCurrencyString(targetValue)

        if (parsedNumber < targetThreshold) {
          lastConfiguredFlashNode.runFlash()

          BrowserH.playBeep()

          console.log('Updated value', parsedNumber, AppH.getCurrentParsedDate())

          break
        }
      }
    }
  }

  observer = new MutationObserver(callback)
  observer.observe(targetNode, config)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateSelector') {
    targetSelector = request.data.targetSelector
    observeDOMNode()
    return
  }

  if (request.action === 'updateThreshold') {
    targetThreshold = request.data.threshold
    observeDOMNode()
    return
  }

  if (request.action === 'stopApp') {
    AppH.stopApp(observer, lastConfiguredFlashNode)
  }
})
