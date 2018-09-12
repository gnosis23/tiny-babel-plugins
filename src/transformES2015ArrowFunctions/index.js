module.exports = function ({ types: t }) {
  return {
    visitor: {
      // state 怎么用？
      ArrowFunctionExpression(path, state) {
        // This option wraps the generated function in .bind(this) and
        // keeps uses of this inside the function as-is, instead of using
        // a renamed this. It also adds a runtime check to ensure the
        // functions are not instantiated.
        if (state.opts.spec) {
          // node: {params, body}
          const { node } = path;
          if (node.shadow) return;

          node.shadow = { this: false };
          node.type = "FunctionExpression";

          // t.thisExpression()
          const boundThis = t.thisExpression();
          boundThis._forceShadow = path;

          // make sure that arrow function won't be instantiated
          path.ensureBlock();
          // insert before the function's body
          path.get("body").unshiftContainer(
            "body",
            t.expressionStatement(t.callExpression(state.addHelper("newArrowCheck"), [
              t.thisExpression(),
              boundThis
            ]))
          );

          path.replaceWith(t.callExpression(
            t.memberExpression(node, t.identifier("bind")),
            [t.thisExpression()]
          ));
        } else {
          path.arrowFunctionToShadowed();
        }
      }
    }
  };
};
