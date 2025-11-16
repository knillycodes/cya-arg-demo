import { options } from 'marked';
import { getStory } from 'virtual:story-parse';

const screenEl = document.getElementById('screen');
const userInEl = document.getElementById('user-input-field');
const userInBtnEl = document.getElementById('user-input-btn');
const screenContainer = document.getElementById('screen-container');

const ENTER_BTN_KEYCODE = 13;

const story = JSON.parse(getStory());
let currEntryIdx = 0;

function scrollToBottom() {
  screenContainer.scrollTop = screenContainer.scrollHeight
}
function getPromptOptionsKeys(prompt){
  const options = prompt.optionsArr.map(o => {
    return o.optionKey.toLowerCase();
  });
  return options;
}

function intakeUserInput(ev) {
  if(
    ev.type === 'click' ||
    (ev.type === 'keyup' && ev?.keyCode === ENTER_BTN_KEYCODE)
  ) {
    let valEl = document.createElement('p');
    valEl.className = 'user-input';
    let selectedOption = getPromptOptionsKeys(story[currEntryIdx]).indexOf(userInEl.value.toLowerCase());
    if(
      selectedOption === -1
    ) {
      valEl.classList.add('error');
      // TODO: take copy from a configuration file
      // todo also sanitize text?
      valEl.innerText = 'Error accepting input. Please try again.';
    } else {
      valEl.innerText = userInEl.value;
      currEntryIdx = story[currEntryIdx].optionsArr[selectedOption].goto;
      displayEntry(story[currEntryIdx])
    }
    screenEl.appendChild(valEl);
    userInEl.value = '';
    scrollToBottom();
  }
}

function displayEntry(prompt) {
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

const bgmEl = document.getElementById('bgm');
const bgmPlay = document.getElementById('bgm-play');
const toggleMusic = function () {
  if (bgmEl.paused) {
    bgmPlay.innerHTML = "Pause";
    bgmPlay.classList.add("pausebtn")
    bgmPlay.classList.remove("playbtn")
    bgmEl.play();
  }
  else {
    bgmPlay.innerHTML = "Play";
    bgmPlay.classList.add("playbtn");
    bgmPlay.classList.remove("pausebtn")
    bgmEl.pause();
  }
}

function runApp() {
  displayEntry(story[currEntryIdx]);
  scrollToBottom();
  userInEl.addEventListener('keyup', intakeUserInput);
  userInBtnEl.addEventListener('click', intakeUserInput);
  bgmPlay.addEventListener('click', toggleMusic);
}

runApp();

