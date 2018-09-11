// plugin 默认参数为 babel
module.exports = function({ types: t }) {
  return {
    visitor: {
      MemberExpression: {
        // 访问AST分为enter、exit阶段
        exit({ node }) {
          // 形式如 object.prop
          // 会得出 node{object, property}
          // 此处的 property 就是 identifier
          // 可以参考 ast explorer
          const prop = node.property;
          if (
            !node.computed &&
            t.isIdentifier(prop) &&
            !t.isValidIdentifier(prop.name)
          ) {
            // foo.default -> foo["default"]
            node.property = t.stringLiteral(prop.name);
            node.computed = true;
          }
        }
      }
    }
  };
};
