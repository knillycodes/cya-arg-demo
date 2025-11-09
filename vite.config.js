// vite.config.js
import { defineConfig } from 'vitest/config';
import storyBuilderPlugin from './story-builder-plugin';

export default defineConfig({
  base: "/cya-arg-demo/",
  plugins: [storyBuilderPlugin()]
});