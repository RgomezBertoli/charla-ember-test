/* eslint-disable no-unused-vars */
import Application from '../../app';
import config from '../../config/environment';
import clickDataId from './dom/click-data-id';
import findDataId from './dom/find-data-id';
import getNodeText from './dom/get-node-text';
import { merge } from '@ember/polyfills';
import { run } from '@ember/runloop';
/* eslint-disable no-unused-vars */

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}
