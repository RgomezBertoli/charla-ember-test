import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('clickDataId', function(app, dataId) {
  click(`[data-id=${dataId}]`);
});
