const { defaultFieldResolver } = require('graphql');
const { SchemaDirectiveVisitor } = require('graphql-tools');

const SYMBOL_AUTH_PERMISSION = Symbol('Graphql#visitor#authPermission');
const SYMBOL_AUTH_WRAPPED = Symbol('Graphql#visitor#authWrapped');

/* eslint-disable no-param-reassign */

module.exports = class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type[SYMBOL_AUTH_PERMISSION] = this.args.require;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field[SYMBOL_AUTH_PERMISSION] = this.args.require;
  }

  ensureFieldsWrapped(objectType) {
    // 标记 GraphQLObjectType 对象以避免重新包装：
    if (objectType[SYMBOL_AUTH_WRAPPED]) return;
    objectType[SYMBOL_AUTH_WRAPPED] = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async (...args) => {
        // const ctx = args[2];
        // 如果该字段不需要角色，则返回 objectType：
        const requiredRole = field[SYMBOL_AUTH_PERMISSION] || objectType[SYMBOL_AUTH_PERMISSION];

        if (!requiredRole) {
          return resolve(...args);
        }

        // const user = await getUser(context.headers.authToken);
        // if (!user.hasRole(requiredRole)) {
        //   throw new Error('not authorized');
        // }

        return resolve(...args);
      };
    });
  }
};
