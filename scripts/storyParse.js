import { marked, options } from 'marked';

const RX_PROMPT = /\[PROMPT-(\d+)\]/;
const RX_OPTIONS = /\[(\w+)\](.+)\[\[GOTO#(\d+)\]\]/;
const PROMPT_SPLIT = '===';
const OPTIONS_PREFIX = '```OPTIONS';
const OPTIONS_SUFFIX = '```';

function parseOptions(promptKey, promptText) {
  const pkEnd = promptText.indexOf(promptKey) + promptKey.length;
  const optionsStart = promptText.indexOf(OPTIONS_PREFIX);
  const optionsEnd = promptText.indexOf(
    OPTIONS_SUFFIX, optionsStart + OPTIONS_PREFIX.length + 1
  );

  const promptCopy = promptText.substring(pkEnd + 1, optionsStart).trim();
  const optionsText = promptText.substring(
    optionsStart + OPTIONS_PREFIX.length, optionsEnd
  ).trim();

  return { promptCopy, optionsText };
}

function buildOptions(optionsText) {
  const options = optionsText.split('\n')
    .map(ot => {
      const otmatch = ot.match(RX_OPTIONS);
      if(otmatch) {
        const optionKey = otmatch[1];
        const optionCopy = marked.parse(otmatch[2].trim());
        const goto = otmatch[3];

        return { optionKey, goto, optionCopy };
      }
      return {};
    });
  return options;
}

export function parseStoryMd(rawtext) {
  const output = new Map();
  const promptsRaw = rawtext.split(PROMPT_SPLIT)
    .map(promptText => {
      const ptext = promptText.trim();
      const pmatches = ptext.match(RX_PROMPT);
      const pkey = pmatches[1];
      const { promptCopy, optionsText } = parseOptions(pkey, ptext);
      const optionsArr = buildOptions(optionsText);
      const promptMd = marked.parse(promptCopy).replaceAll('\n', '');

      output.set(pkey, {
        'promptCopy': promptMd,
        optionsArr,
      });
    });
  console.log(output);
  return JSON.stringify(Object.fromEntries(output));
};