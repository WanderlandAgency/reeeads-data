const fields = {
     name: document.querySelector('[jsonmaker="name"]'),
     id: document.querySelector('[jsonmaker="id"]'),
     figmaButton: document.querySelector('[jsonmaker="figma-button"]'),
     canvaUrl: document.querySelector('[jsonmaker="canva-url"]'),
     readyButton: document.querySelector('[jsonmaker="ready-button"]'),
}

const codeBlock = {
     text: document.getElementsByClassName('jsonmaker_code-text')[0].querySelector('span'),
     html: document.getElementsByClassName('jsonmaker_code-html')[0].querySelector('span'),
}

const copyField = document.querySelector('[jsonmaker="copy-field"]');

const hidden = document.querySelectorAll('[jsonmaker="hidden"]');

const state = {
     figmaFilled: false,
     figmaWaiting: false,
}

var data = {
     name: '',
     id: '',
     figma: {
          text: '',
          html: null,
     },
     canva: {
          url: '',
     },
}

hidden.forEach((element) => {
     element.style.display = 'none';
});

fields.figmaButton.addEventListener('click', () => {
     state.figmaWaiting = true
     fields.figmaButton.innerHTML = 'Ctrl + V <-> Cmd + V';
});

document.addEventListener('paste', (event) => {
     if (state.figmaWaiting) {
          state.figmaWaiting = false;

          data.figma.text = event.clipboardData.getData('text/plain');
          data.figma.html = event.clipboardData.getData('text/html');

          codeBlock.text.innerHTML = escapeXml(data.figma.text);
          codeBlock.html.innerHTML = escapeXml(data.figma.html);

          state.figmaFilled = true;
     }
});

fields.readyButton.addEventListener('click', () => {
     if (state.figmaFilled) {
          data.name = fields.name.value;
          data.id = fields.id.value;
          data.canva.url = fields.canvaUrl.value;
          downloadJSON(data);
     }
});

document.addEventListener('click', (event) => {
     if(event.target !== fields.figmaButton){
          if(state.figmaWaiting) {
               state.figmaWaiting = false;
               fields.figmaButton.innerHTML = 'Click on me !';
          }
     }
});

function downloadJSON(data) {
     const jsonString = JSON.stringify(data);
     const blob = new Blob([jsonString], { type: 'application/json' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'data.json';
     document.body.appendChild(a);
     a.click();
     URL.revokeObjectURL(url);
}

function escapeXml(xml) {
     return xml.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;');
 }