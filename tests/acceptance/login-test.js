import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login', {
  beforeEach() {
    visit('/');
  }
});

test('visitamos index', function(assert){
  assert.expect(7);

  assert.equal(currentURL(), '/');
  assert.equal(getNodeText(findDataId('header-login')), 'LOGIN');
  assert.equal(find('[data-id=label-name]').text().trim(), 'Usuario');
  assert.ok(find('#user-name').length > 0);
  assert.equal(find('[data-id=label-pass]').text().trim(), 'Contraseña');
  assert.ok(find('#user-pass').length > 0);
  assert.ok(find('[data-id=btn-accept]').length > 0);
  server.shutdown();
});

test('Hacemos login con un usuario', function(assert){
  assert.expect(2);

  fillIn('#user-name', 'asdf');
  fillIn('#user-pass', 'asfd1234');
  click('[data-id=btn-accept]');

  andThen(function(){
    assert.equal(currentURL(), '/home');
    assert.equal(find('[data-id=header-home]').text().trim(), 'HOME');
    server.shutdown();
  });
});

test('Hacemos login con un usuario pero da error generico', function(assert){
  server.create('error');

  assert.expect(2);

  fillIn('#user-name', 'asdf');
  fillIn('#user-pass', 'asfd1234');
  click('[data-id=btn-accept]');

  andThen(function(){
    assert.equal(currentURL(), '/');
    assert.equal(find('[data-id=error-msg]').text().trim(), 'Se ha producido un error');
    server.shutdown();
  });

});

test('Hacemos login con un usuario pero da error especifico', function(assert){
  server.create('error', {
    msg: 'Usuario no encontrado'
  });

  assert.expect(2);

  fillIn('#user-name', 'asdf');
  fillIn('#user-pass', 'asfd1234');
  click('[data-id=btn-accept]');

  andThen(function(){
    assert.equal(currentURL(), '/');
    assert.equal(find('[data-id=error-msg]').text().trim(), 'Usuario no encontrado');
    server.shutdown();
  })
});
