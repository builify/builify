export function validateDOMElement (props, propName, componentName) {
  if (props[propName] instanceof Element === false) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`);
  }

  return true;
}
