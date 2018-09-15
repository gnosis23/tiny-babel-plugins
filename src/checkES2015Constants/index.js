
module.exports = function testPlugin({ messages }) {
  return {
    visitor: {
      Scope({ scope }) {
        for (const name in scope.bindings) {
          const binding = scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (const violation of (binding.constantViolations)) {
            throw violation.buildCodeFrameError(messages.get("readOnly", name));
          }
        }
      }
    }
  };
};

