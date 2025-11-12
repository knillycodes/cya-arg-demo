import { options } from 'marked';
import { getStory } from 'virtual:story-parse';

const screenEl = document.getElementById('screen');
const userInEl = document.getElementById('user-input-field');
const userInBtnEl = document.getElementById('user-input-btn');
const screenContainer = document.getElementById('screen-container');

const ENTER_BTN_KEYCODE = 13;

function scrollToBottom() {
  screenContainer.scrollTop = screenContainer.scrollHeight
}

function intakeUserInput(ev) {
  if(
    ev.type === 'click' ||
    (ev.type === 'keyup' && ev?.keyCode === ENTER_BTN_KEYCODE)
  ) {
    let valEl = document.createElement('p');
    valEl.innerText = userInEl.value;
    screenEl.appendChild(valEl);
    userInEl.value = '';
    scrollToBottom();
  }
}

function displayEntry(prompt) {
  console.log('>> prompt', prompt);

  let pEl = document.createElement('div');
  pEl.className = 'prompt-container';
  pEl.innerHTML = prompt.promptCopy;

  let optionsEl = document.createElement('div');
  optionsEl.className = 'prompt-options';
  let allOptionsInnerHtml = prompt.optionsArr.reduce((str, curr) => {
    return str + curr.optionCopy;
  }, '');
  optionsEl.innerHTML = allOptionsInnerHtml;
  pEl.appendChild(optionsEl);
  screenEl.appendChild(pEl);
}

function runApp() {
  const story = JSON.parse(getStory());
  let currEntryIdx = 0;

  displayEntry(story[currEntryIdx]);

  scrollToBottom();
  userInEl.addEventListener('keyup', intakeUserInput);
  userInBtnEl.addEventListener('click', intakeUserInput);
}

runApp();

