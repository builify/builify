const exports = {
  getIFrame (iFrameName) {
    const frame = window.frames[String(iFrameName)];

    if (frame !== undefined) {
      return frame;
    } else {
      throw Error(`Could not find iFrame called ${iFrameName}`);
    }
  },

  getIFrameWindow (iFrame) {
    let doc;

    if (iFrame.contentWindow) {
      return iFrame.contentWindow;
    }

    if (iFrame.window) {
      return iFrame.window;
    }

    if (!doc && iFrame.contentDocument) {
      doc = iFrame.contentDocument;
    }

    if (!doc && iFrame.document) {
      doc = iFrame.document;
    }

    if (doc && doc.defaultView) {
     return doc.defaultView;
    }

    if (doc && doc.parentWindow) {
      return doc.parentWindow;
    }

    throw Error('Could not get iFrame window.');
  }
}

export default exports;
