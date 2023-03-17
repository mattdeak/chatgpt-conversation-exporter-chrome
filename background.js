chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'export_conversation') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error('No active tab found');
        return;
      }

      chrome.tabs.sendMessage(tabs[0].id, { action: 'export_conversation' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        sendResponse(response);
      });
    });

    return true; // Required to use sendResponse asynchronously
  }
});
