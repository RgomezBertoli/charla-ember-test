import Mirage from 'ember-cli-mirage';

export default function() {
  this.post('/login', function(schema){
    const error = schema.db.errors[0];
    if (error) {
      return new Mirage.Response(500, error);
    }

    return new Mirage.Response(204, { token: '123456' });
  })
}
