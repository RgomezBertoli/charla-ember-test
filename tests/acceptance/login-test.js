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
  assert.equal(getNodeText(findDataId('label-name')), 'Usuario');
  assert.ok(find('#user-name').length > 0);
  assert.equal(getNodeText(findDataId('label-pass')), 'Contraseña');
  assert.ok(find('#user-pass').length > 0);
  assert.ok(findDataId('btn-accept').length > 0);
  server.shutdown();
});

test('Hacemos login con un usuario', function(assert){
  assert.expect(2);

  fillIn('#user-name', 'asdf');
  fillIn('#user-pass', 'asfd1234');
  clickDataId('btn-accept');

  andThen(function(){
    assert.equal(currentURL(), '/home');
    assert.equal(getNodeText(findDataId('header-home')), 'HOME');
    server.shutdown();
  });
});

test('Hacemos login con un usuario pero da error generico', function(assert){
  server.create('error');

  assert.expect(2);

  fillIn('#user-name', 'asdf');
  fillIn('#user-pass', 'asfd1234');
  clickDataId('btn-accept');

  andThen(function(){
    assert.equal(currentURL(), '/');
    assert.equal(getNodeText(findDataId('error-msg')), 'Se ha producido un error');
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
  clickDataId('btn-accept');

  andThen(function(){
    assert.equal(currentURL(), '/');
    assert.equal(getNodeText(findDataId('error-msg')), 'Usuario no encontrado');
    server.shutdown();
  })
});
