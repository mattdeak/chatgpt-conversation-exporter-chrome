function extractText() {
  const elements = document.querySelectorAll('.items-start'); // Adjust the selector to match the target elements
  const texts = Array.from(elements).map(element => element.innerText);
  return texts;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'export_conversation') {
    console.log('Received request to export conversation')
    const texts = extractText();
    sendResponse({ data: texts });
  } else {
    console.error('Unknown action:', request.action);
  }

  
});
