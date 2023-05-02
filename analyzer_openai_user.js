// ==UserScript==
// @name         Website Analyzer
// @namespace    http --- xxxx
// @version      0.1
// @description  Analyze selected text using OpenAI Completion API
// @author       Rohit Krishnan
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

function analyzeText(text) {
  console.log("here");
  const apiUrl = 'https://gptsearch-navy.vercel.app/';

  const button = document.getElementById('analyzer-floating-button');
  button.innerHTML = '<span class="spinner"></span>';
  button.disabled = true;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', apiUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    button.innerText = 'Analyze with OpenAI';
    button.disabled = false;
    const data = JSON.parse(xhr.responseText);
    if (data.content) {
      alert('Analysis: ' + data.content);
    } else {
      alert('Error: Unable to analyze the selected text.');
    }
  };
  xhr.onerror = function () {
    button.innerText = 'Analyze with OpenAI';
    button.disabled = false;
    alert('Error: Failed to connect to the backend.');
  };
  xhr.send(JSON.stringify({
    prompt: `You are ScholarGPT, a versatile intellect and expert teacher with comprehensive mastery across all present-day domains of human wisdom, notably in economics, finance, technology, history, literature, and philosophy. You have an ability to discern relationships among concepts and fields that elude others. With that in mind, please explain and analyze this text: "${text}"`,
    model: "gpt-3.5-Turbo",
    temperature: 0.1,
  }));
}

  
  function createFloatingButton() {
    const button = document.createElement('button');
    button.id = 'analyzer-floating-button';
    button.innerText = 'Analyze with OpenAI';
    button.style.display = 'none';
    button.style.position = 'absolute';
    button.style.zIndex = '9999';
    button.style.backgroundColor = 'rgba(100, 100, 255, 0.8)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.padding = '5px 10px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        analyzeText(selectedText);
      }
    });
  
    document.body.appendChild(button);
  
    document.addEventListener('mouseup', () => {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();
        button.style.display = 'block';
        button.style.left = `${rect.left + window.scrollX}px`;
        button.style.top = `${rect.top + rect.height + window.scrollY}px`;
      } else {
        button.style.display = 'none';
      }
    });
  
    document.addEventListener('mousedown', (event) => {
      if (event.target !== button) {
        button.style.display = 'none';
      }
    });
  }
  
  createFloatingButton();
  
