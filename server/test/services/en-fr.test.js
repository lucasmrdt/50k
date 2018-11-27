const assert = require('assert');
const app = require('../../src/app');

describe('\'en-fr\' service', () => {
  it('registered the service', () => {
    const service = app.service('en-fr');

    assert.ok(service, 'Registered the service');
  });
});
