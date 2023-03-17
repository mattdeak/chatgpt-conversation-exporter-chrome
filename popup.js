// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const exportButton = document.getElementById('exportButton');
  console.log('DOM loaded, exportButton:', exportButton)

  if (exportButton) {
    exportButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'export_conversation' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
          return;
        }

        if (response && response.data) {
          const jsonData = JSON.stringify(response.data, null, 2);
          const blob = new Blob([jsonData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'conversation.json';
          a.click();
          URL.revokeObjectURL(url);
        } else {
          console.error('No data found in the response object');
        }
      });
    });
  } else {
    console.error("Element with id 'exportButton' not found");
  }
});
