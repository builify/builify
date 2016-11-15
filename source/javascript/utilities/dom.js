/**
 * Sets the virtual parent of an element.
 * Pass `undefined` as the `parent` to clear the virtual parent.
 *
 * @export
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 */
export function setVirtualParent(child, parent) {
  let virtualChild = child;
  let virtualParent = parent;

  if (!virtualChild._virtual) {
    virtualChild._virtual = {
      children: []
    };
  }

  let oldParent = virtualChild._virtual.parent;

  if (oldParent && oldParent !== parent) {
    // Remove the child from its old parent.
    let index = oldParent._virtual.children.indexOf(virtualChild);

    if (index > -1) {
      oldParent._virtual.children.splice(index, 1);
    }
  }

  virtualChild._virtual.parent = virtualParent || undefined;

  if (virtualParent) {
    if (!virtualParent._virtual) {
      virtualParent._virtual = {
        children: []
      };
    }

    virtualParent._virtual.children.push(virtualChild);
  }
}

export function getVirtualParent(child) {
  let parent;

  if (child && isVirtualElement(child)) {
    parent = child._virtual.parent;
  }

  return parent;
}

/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @export
 * @param {HTMLElement} child
 * @param {boolean} [allowVirtualParents=true]
 * @returns {HTMLElement}
 */
export function getParent(child, allowVirtualParents = true) {
  return child && (
    allowVirtualParents && getVirtualParent(child) ||
    child.parentNode && child.parentNode
  );
}

let _isSSR = false;

/** Helper to set ssr mode to simulate no window object returned from getWindow helper. */
export function setSSR(isEnabled) {
  _isSSR = isEnabled;
}

/** Helper to get the window object. */
export function getWindow(rootElement) {
  if (_isSSR) {
    return undefined;
  } else {
    return (
      rootElement &&
        rootElement.ownerDocument &&
        rootElement.ownerDocument.defaultView ?
        rootElement.ownerDocument.defaultView :
        window
    );
  }
}

/** Helper to get the document object. */
export function getDocument(rootElement) {
  if (_isSSR) {
    return undefined;
  } else {
    return rootElement && rootElement.ownerDocument ? rootElement.ownerDocument : document;
  }
}

export function elementContains(parent, child, allowVirtualParents = true) {
  let isContained = false;

  if (parent && child) {
    if (allowVirtualParents) {
      isContained = false;

      while (child) {
        let nextParent = getParent(child);

        if (nextParent === parent) {
          isContained = true;
          break;
        }

        child = nextParent;
      }
    } else if (parent.contains) {
      isContained = parent.contains(child);
    }
  }

  return isContained;
}

/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @param {(HTMLElement | IVirtualElement)} element
 * @returns {element is IVirtualElement}
 */
function isVirtualElement(element) {
  return element && !!element._virtual;
}
