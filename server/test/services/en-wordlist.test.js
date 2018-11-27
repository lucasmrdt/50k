const assert = require('assert');
const app = require('../../src/app');

describe('\'en-wordlist\' service', () => {
  it('registered the service', () => {
    const service = app.service('en-wordlist');

    assert.ok(service, 'Registered the service');
  });
});
