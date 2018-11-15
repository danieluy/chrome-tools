/**
 * Inject page script
 */
const s = document.createElement('script');
s.src = chrome.extension.getURL('page-script.js');
(document.head || document.documentElement).appendChild(s);


chrome.runtime.onMessage.addListener(handleMessageRequest);

function handleMessageRequest(request, sender, sendResponse) {
  // console.log('handleMessageRequest', { request: request, sender: sender, sendResponse: sendResponse });
  switch (request) {
    case 'LOG_METADATA_CAMPO':
      logCampoMetadata(request, sender, sendResponse)
      break;
    case 'INIT_VALUE_HANDLER':
      initValueHandler(request, sender, sendResponse)
      break;
    case 'LOG_VALUE':
      logValue(request, sender, sendResponse)
      break;
    case 'TEST':
      test(request, sender, sendResponse)
      break;
    default:
      sendResponse({ success: false, message: 'Missing request definition.' });
      break;
  }
}

function test(request, sender, sendResponse) {
  // console.log('test', { request: request, sender: sender, sendResponse: sendResponse });
  getVariables(['lalala'])
    .then(variables => console.log({ variables: variables }));
}

function logCampoMetadata(request, sender, sendResponse) {
  let index = getIndexFromCampoMetadata();
  if (index || index === 0)
    logMetadataByIndex(index);
  else
    console.error('Couldn\'t find a auxBinder index on the element.');
}

function initValueHandler(request, sender, sendResponse) {
  let index = getIndexFromCampoMetadata();
  if (index || index === 0)
    initValueHandlerByIndex(index);
  else
    console.error('Couldn\'t find a auxBinder index on the element.');
}

function logValue(request, sender, sendResponse) {
  let index = getIndexFromCampoMetadata();
  if (index || index === 0)
    logValueByIndex(index);
  else
    console.error('Couldn\'t find a auxBinder index on the element.');
}

function getIndexFromCampoMetadata() {
  let element = rightClicked.parentElement;
  let index = null;
  while (element && index === null) {
    const attribute = element.getAttribute('campo-metadata');
    if (attribute) {
      const match = attribute.match(/auxBinder\[(\d+)\]/);
      if (match)
        index = match[1];
    }
    element = element.parentElement;
  }
  return index;
}

/**
 * Fetchs the required variables from the page script
 * @param {Array<String>} variableNames 
 */
function getVariables(variableNames) {
  return new Promise((resolve, reject) => {
    window.addEventListener('message', handleMessage, false);

    const evt = new CustomEvent('GET_VARIABLES', { detail: variableNames });

    window.dispatchEvent(evt);

    function handleMessage(evt) {
      window.removeEventListener('message', handleMessage);
      if (evt.data.action === 'GOT_VARIABLES')
        resolve(evt.data.payload);
    }
  });
}