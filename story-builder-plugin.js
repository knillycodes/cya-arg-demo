import { parseStoryMd } from './scripts/storyParse';
import fs from 'fs';

const storyRaw = fs.readFileSync('./adv/sample.cya.md', 'utf-8');

export default function storyParsePlugin() {
const virtualModuleId = 'virtual:story-parse'
const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'story-parse', // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const parsed = parseStoryMd(storyRaw);
        return `export const getStory = function() { return \`${parsed}\`};`;
      }
    }
  }
};