// Initializes the `en-fr` service on path `/en-fr`
const createService = require('feathers-mongoose');
const createModel = require('../../models/en-fr.model');
const hooks = require('./en-fr.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/en-fr', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('en-fr');

  service.hooks(hooks);
};
