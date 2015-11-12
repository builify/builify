const exports = {
  addDoctype (htmlString) {
    if (!htmlString || htmlString === null) {
      return;
    }

    const defaultHtml5Type = '<!DOCTYPE html>';

    return (defaultHtml5Type + htmlString);
  },

  removeUnneccesaryDataFromDocument (targetDocument) {
    const query = [
      '[data-reactid]',
      '[data-abctoolbox]',
      '[data-abcpanel]',
      'contentEditable',
      'contenteditable',
      '.editable'
    ].join(',');

    const targets = targetDocument.querySelectorAll(query);

    for (let i = 0; i < targets.length; i++) {
      const currentTarget = targets[i];

      if (currentTarget.getAttribute('data-reactid')) {
        currentTarget.removeAttribute('data-reactid');
      }

      if (currentTarget.getAttribute('data-abctoolbox') ||
          currentTarget.getAttribute('data-abcpanel')) {
        currentTarget.remove();
      }

      if (currentTarget.getAttribute('contentEditable')) {
        currentTarget.removeAttribute('contentEditable');
      }

      if (currentTarget.getAttribute('contenteditable')) {
        currentTarget.removeAttribute('contenteditable');
      }

      if (currentTarget.classList.contains('editable')) {
        currentTarget.classList.remove('editable');
      }
    }

    return targetDocument;
  },

  getPageHTML (target) {
    const winElem = target.contentWindow;
    const docElement = winElem.document;
    const documentElement = docElement.documentElement;
    let documentCopy = documentElement.cloneNode(true);
    let HTMLSource = '';

    documentCopy = removeUnneccesaryDataFromDocument(documentCopy);
    HTMLSource = addDoctype(documentCopy.outerHTML);

    return HTMLSource;
  },

  downloadPages () {
    const zip = new JSZip();
    const pageHTML = getPageHTML(window.frames['ab-cfrm']);

    zip.file('index.html', String(pageHTML));

    const content = zip.generate({
      type: 'blob'
    });

    saveAs(content, 'HTMLTemplate.zip');
  }
};

export default exports;
