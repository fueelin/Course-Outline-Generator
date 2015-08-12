chrome.pageAction.onClicked.addListener(onPageActionClicked);
chrome.tabs.onUpdated.addListener(onTabUpdate);

function onPageActionClicked(tab){
  messageTab({ makeTemplate: true });
}

function onTabUpdate( tabId, changeInfo, tab ) {

  if(
  //*TCB* Improve.  Ideally would be based off values in manifest.json or some other config...  Worst case, build process?
      (tab.url.indexOf('https://class.coursera.org/') !== -1 && tab.url.indexOf('/lecture') !== -1) ||
      (tab.url.indexOf('https://www.coursera.org/learn/') !== -1 && tab.url.indexOf('/outline') !== -1) ||
      (tab.url.indexOf('http://www.pluralsight.com/courses/') !== -1)
  ) {
    chrome.pageAction.show(tabId);
  }
}

function messageTab(message) {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      console.log(response);
    });
  });
}

