const CLASS_SEPARATOR = '-';

const flattenArray = list => list.reduce((reduced, value) => {
  return reduced.concat(Array.isArray(value) ? flattenArray(value) : value);
}, []);

function flattenClassNames(classNames, prefix = '') {
  return flattenArray(classNames).reduce((reduced, className) => {
    const type = typeof className;

    if (type === 'string' || type === 'number') {
      reduced.push(prefix + '' + className);
      return reduced;
    }

    if (type === 'object') {
      if (typeof className.toClassList === 'function') {
        return reduced.concat(className.toClassList());
      }

      if (Array.isArray(className)) {
        return reduced.concat(flattenClassNames(className, prefix));
      }

      if (className !== null) {
        return reduced.concat(flattenObject(className, prefix));
      }
    }

    return reduced;
  }, []);
};

function flattenObject(obj, prefix = '') {
  let classNames = [];

  for (const key in obj) {
    const value = obj[key];

    if (Array.isArray(value)) {
      const flattened = flattenClassNames(value, prefix + key + CLASS_SEPARATOR);

      if (flattened.length) {
        classNames = classNames.concat(flattened);
      }
    } else if (typeof value === 'object') {
      const nested = flattenObject(value, prefix + key + CLASS_SEPARATOR);

      if (nested.length) {
        classNames = classNames.concat(nested);
      }
    } else if (value) { // any truthy value
      classNames.push(prefix + key + ((typeof value !== 'boolean') ? CLASS_SEPARATOR + value : ''));
    }
  }

  return classNames;
};

export default function className(...initialClassNames) {
  const map = {};
  const array = [];

  let joined;
  let instance;

  const add = (...newClassNames) => {
    const flatten = flattenClassNames(newClassNames);

    for (let index = 0; index < flatten.length; index++) {
      if (typeof map[flatten[index]] === 'undefined') {
        return className(array.slice(0).concat(flatten));
      }
    }

    return instance;
  }

  const has = (className) => typeof map[className] !== 'undefined';
  const toClassList = () => array;

  const toString = () => {
    if (typeof joined !== 'string') {
      joined = array.join(' ');
    }

    return joined;
  };

  const classNames = flattenClassNames(initialClassNames);

  if (classNames.length) {
    for (let index = 0; index < classNames.length; index++) {
      const className = classNames[index];

      if (typeof map[className] === 'undefined') {
        map[className] = true;
        array.push(className);
      }
    }
  }

  instance = { add, has, toClassList, toString };

  return instance;
}
