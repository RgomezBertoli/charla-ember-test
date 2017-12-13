import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({

  error: undefined,

  showError: false,

  actions: {
    login(username, password){

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

      $.ajax(url, hash)
        .then(() => {
          this.transitionToRoute('home');
        })
        .catch((error) => {
          this.set('showError', true);
          this.set('error', error.responseJSON);
        });
    }
  }
});
