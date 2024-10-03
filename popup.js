const defaultSelector = '.PositionEditor-info-box > .Exchange-info-row.TradeFeesRow > .Exchange-info-value .Tooltip-handle'

BrowserH.setClickOnSelector('#setSelectorBtn', () => {
  const targetSelector = BrowserH.getValueBySelector('#selectorInput')

  if (!targetSelector) {
    BrowserH.updateStatus('Please enter a valid selector.')
    return
  }

  BrowserH.ChromeStorage.set({ targetSelector }, () =>
    BrowserH.chromeSendMessage({
      statusMessageAfter: 'Target selector set successfully',
      action: 'updateSelector',
      data: { targetSelector },
    }))
})

BrowserH.setClickOnSelector('#setThresholdBtn', () => {
  const threshold = BrowserH.getValueBySelector('#selectorThreshold')

  if (!threshold) {
    updateStatus('Please enter a valid threshold.')
    return
  }

  BrowserH.ChromeStorage.set({ threshold }, () =>
    BrowserH.chromeSendMessage({
      statusMessageAfter: 'Threshold set successfully.',
      action: 'updateThreshold',
      data: { threshold },
    }))
})

BrowserH.setClickOnSelector('#stopBtn', () => BrowserH.chromeSendMessage({
  action: 'stopApp',
  statusMessage: 'Observer stopped',
}))

document.addEventListener('DOMContentLoaded', () => {
  BrowserH.ChromeStorage.get('targetSelector', (data) => {
    BrowserH.updateElValue(
      BrowserH.getElementBySelector('#selectorInput'),
      data.targetSelector || defaultSelector,
    )
  })

  BrowserH.ChromeStorage.get('threshold', (data) => {
    BrowserH.updateElValue(
      BrowserH.getElementBySelector('#selectorThreshold'),
      data.threshold || 0,
    )
  })
})
