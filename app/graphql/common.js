exports.resolver = {
  Date: require('./common/scalars/date'),
};

exports.schemaDirective = {
  auth: require('./common/visitors/auth_directive'),
};
