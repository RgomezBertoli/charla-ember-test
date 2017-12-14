import { registerHelper } from '@ember/test';

export default registerHelper('findDataId', function(app, dataId, context) {
  return find(`[data-id=${dataId}]`, context);
});
