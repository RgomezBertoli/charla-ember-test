import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({

  error: undefined,

  showError: false,

  actions: {
    login(username, password){
      this.set('showError', false);
      const body = {
        username,
        password
      };
      const url = '/login';

      const hash = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        data: body
      }

      hash.error = (error) => {
        this.set('showError', true);
        this.set('error', error.responseJSON);
      };

      hash.success = () => {
        this.transitionToRoute('home');
      };

      return $.ajax(url, hash);
    }
  }
});
