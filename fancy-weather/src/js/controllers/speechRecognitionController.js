/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import state from '../state';
import updateView from '../view/updateView';

export default function (chain) {
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  document.querySelector('.voice-search').addEventListener('click', (event) => {
    event.preventDefault();
    recognition.start();
    recognition.onresult = (e) => {
      if (e.results['0']['0'].transcript) {
        const result = e.results['0']['0'].transcript;
        state.searchValue = result;
        updateView.voiceSearchUpdate(result);
        chain(false, false);
      }
    };
  });
}
