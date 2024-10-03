## DOM Observer with Dynamic Selector
An chrome extension that tracks changes in a user-defined DOM element on a webpage and plays a beep sound when a specified threshold condition is met.

### Features
- ***Dynamic Target Selection***: Set any DOM element to observe by entering a CSS selector in the extension's popup interface.
- ***Threshold Monitoring***: Define a threshold value; the extension alerts you when the observed element's value drops below this threshold.
- ***Visual and Audio Alerts***: Receive a visual flash on the element and an audible beep when the condition is triggered.
- ***Easy Control***: Start, stop, and configure the observer directly from the browser's toolbar.

### Installation
Clone or Download the Repository:

```bash
git clone git@github.com:Skippia/dom-observer-with-dynamic-selector-chrome-extension.git
```

### Load the Extension in Chrome:

1. Open Google Chrome and navigate to chrome://extensions/.
2. Enable Developer mode by toggling the switch in the upper right corner.
3. Click on Load unpacked and select the directory where you cloned/downloaded the extension.

### Usage
1. Navigate to the Desired Webpage:
2. Go to the website where you want to monitor a DOM element.
3. Open the Extension Popup:
   - Click on the extension icon in the Chrome toolbar to open the popup interface.
   - Set the Target Selector:
   - In the "Set Target Selector" field, enter the CSS selector of the DOM element you wish to monitor. Example: .price-value > span.current-price.
4. Set the Threshold:
   - In the "Enter minimal threshold" field, input the numerical threshold value. The extension will alert you when the observed value drops below this number.
5. Apply the Settings:
   - Click "Set Selector" and "Set Threshold" to start observing.

<p align="center">
  <img src="https://i.ibb.co/qMvbyxR/image.png" width="250" title="extension ui">
  <img src="https://i.ibb.co/pRDPmmJ/image.png" width="550" alt="usecase">
</p>


### Monitoring:
The extension will monitor the specified element.
If the element's value changes and falls below the threshold, you'll receive a visual flash and an audible beep.
*Current implementation supposes that you track down value with $ currency (f.e $150.24) and then compare parsed value (150.24) with threshold which you set before.* 

### Stop Monitoring:

To stop the observer, click the "Stop" button in the popup.

### Example Use Case
***Monitoring Stock Prices:***
  1. Set the DOM selector to the price element.
  2. Define a threshold to be notified when the stock price drops to a desired value.
