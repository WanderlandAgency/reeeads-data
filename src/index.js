var items = document.querySelectorAll('[reeeads-data]')
const itemsData = {};
const nextButton = document.querySelector('[reeeads-button="next"]');
const prevButton = document.querySelector('[reeeads-button="previous"]');
let filterButtons = document.querySelectorAll('.ad-category__tag');
let resetButton = document.querySelector('.reset-button');
// INIT SCRIPT
loadScript();


// IF FILTER BUTTON IS CLICKED THEN RELOAD SCRIPT
filterButtons.forEach((button) => {
     button.addEventListener('click', (e) => {
          setTimeout(() => {
               items = document.querySelectorAll('[reeeads-data]');
               loadScript();
          }, 300); 
     });
});

// IF RESET BUTTON IS CLICKED THEN RELOAD SCRIPT
resetButton.addEventListener('click', (e) => {
     setTimeout(() => {
          items = document.querySelectorAll('[reeeads-data]');
          loadScript();
     }, 300); 
});

// IF NEXT BUTTON IS CLICKED THEN RELOAD SCRIPT
nextButton.addEventListener('click', (e) => {
     setTimeout(() => {
          items = document.querySelectorAll('[reeeads-data]');
          loadScript();
     }, 300); 
});

// IF PREVIOUS BUTTON IS CLICKED THEN RELOAD SCRIPT
prevButton.addEventListener('click', (e) => {
     setTimeout(() => {
          items = document.querySelectorAll('[reeeads-data]');
          loadScript();
     }, 300); 
});

// LOAD SCRIPT
async function loadScript(){
     // GET JSON DATA
     items.forEach((item) => {
          jsonUrl = item.getAttribute('reeeads-data');
          let figmaButton = item.querySelector('[reeeads-button="figma"]');
          let canvaButton = item.querySelector('[reeeads-button="canva"]');
     
          // GET CANVA URL FROM JSON FILE AND ADD IT TO CANVA BUTTON
          if(jsonUrl !== null && jsonUrl !== undefined) {
               fetch(jsonUrl)
               .then(response => response.json())
               .then(data => {
                    canvaButton.href = data.canva.url;
               })
               .catch(error => {
                    // console.error(error);
               });
          }
          // ADD EVENT LISTENER TO FIGMA BUTTON TO COPY FIGMA DATA TO CLIPBOARD
          figmaButton.addEventListener('click', (e) => {
               fetch(item.getAttribute('reeeads-data'))
                    .then(response => response.json())
                    .then(data => {
                         copyToClipboard(data.figma.text, data.figma.html);
                         item.querySelector('.button__label').innerHTML = 'Copied!';
                         setTimeout(() => {
                              item.querySelector('.button__label').innerHTML = 'Copy';
                         }, 2000);
                    })
                    .catch(error => {
                         // console.error(error);
                    });
          });
     });
}

// COPY TO CLIPBOARD
async function copyToClipboard(text, html) {
     const blob = new Blob([html], { type: 'text/html' });
   
     try {
       await navigator.clipboard.write([
         new ClipboardItem({
           'text/plain': new Blob([text], { type: 'text/plain' }),
           'text/html': blob
         })
       ]);
     } catch (err) {
     //   console.error('Failed to copy text and HTML: ', err);
     }
   }