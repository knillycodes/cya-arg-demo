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
    scrollToBottom()
  }
}

scrollToBottom();
userInEl.addEventListener('keyup', intakeUserInput);
userInBtnEl.addEventListener('click', intakeUserInput);

