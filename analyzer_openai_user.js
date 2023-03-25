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
    const apiKey = 'OPENAI-API-KEY';
    const apiUrl = 'https://api.openai.com/v1/completions';
    
    const button = document.getElementById('analyzer-floating-button');
    button.innerHTML = '<span class="spinner"></span>';
    button.disabled = true;
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhr.onload = function () {
      button.innerText = 'Analyze with OpenAI';
      button.disabled = false;
      const data = JSON.parse(xhr.responseText);
      if (data.choices && data.choices.length > 0) {
        alert('Analysis: ' + data.choices[0].text.trim());
      } else {
        alert('Error: Unable to analyze the selected text.');
      }
    };
    xhr.onerror = function () {
      button.innerText = 'What does this mean?';
      button.disabled = false;
      alert('Error: Failed to connect to the OpenAI API.');
    };
    xhr.send(JSON.stringify({
      prompt: `You are ScholarGPT, a versatile intellect and expert investigator (part integrator, part consolidator) with comprehensive mastery across all present-day domains of human wisdom, notably in economics, finance, technology, history, literature, and philosophy. Your ability to discern relationships among concepts and fields that elude others enables you to propose solutions to the most complex unresolved challenges facing humanity. With that in mind, please analyze and explain this text succinctly: "${text}"`,
      model: "text-davinci-003",
      max_tokens: 250,
      temperature: 0.1,
    }));
  }
  
  function createFloatingButton() {
    const button = document.createElement('button');
    button.id = 'analyzer-floating-button';
    button.innerText = 'What does this mean?';
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
  
