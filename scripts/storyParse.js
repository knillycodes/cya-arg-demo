const RX_PROMPT = /\[PROMPT-(\d+)\]/;

export function parseStoryMd(rawtext) {
  const output = new Map();
  const promptsRaw = rawtext.split('===')
    .map(promptText => {
      const ptext = promptText.trim();
      const pkey = ptext.match(RX_PROMPT);
      // ptext.replace(pkey[0]+'\n', '')
      output.set(pkey[1], `this is prompt ${pkey[1]}`);
    });
  console.log(output);
  return JSON.stringify(Object.fromEntries(output));
};