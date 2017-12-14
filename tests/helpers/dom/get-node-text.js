import { registerHelper } from '@ember/test';

export default registerHelper('getNodeText', function(app, node) {
  let text = undefined;
  if (typeof node.text === 'function') {
    text = node.text().trim();
  } else if (node.textContent !== undefined) {
    text = node.textContent.trim();
  }
  return text;
});
