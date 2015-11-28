import { saveAs } from './FileSaver';
import JSZip from 'jszip';
import _ from 'lodash';

const exports = {
  getFileSettings () {
    return {
      type: 'blob'
    }
  },

  getFileName () {
    return 'template.zip'
  },

  createHTMLStructureToBODYTag () {
    return (
      `
      <!DOCTYPE HTML>
      <html>
        <head>
        	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        	<title>Your Website</title>
        </head>
      <body>
      `
    );
  },

  finishHTMLBodyTag (HTML) {
    return (
      `
      ${HTML}
      </body>
      </html>
      `
    );
  },

  addNavigation (HTML, navigation) {
    if (Object.keys(navigation).length === 0) {
      return HTML;
    }

    const { source } = navigation;

    return (
      `
      ${HTML}
      ${source}
      `
    );
  },

  addMain (HTML, main) {
    if (main.length === 0) {
      return HTML;
    }

    let mainBlocks = '';

    _.map(main, (item, idx) => {
      const { source } = item;
      mainBlocks += source;
    });

    console.log(mainBlocks);

    return (
      `
      ${HTML}
      ${mainBlocks}
      `
    );
  },

  addFooter (HTML, footer) {
    if (Object.keys(footer).length === 0) {
      return HTML;
    }

    const { source } = footer;

    return (
      `
      ${HTML}
      ${source}
      `
    );
  },

  getPageHTML (page) {
    const { pageFullSource } = page;
    console.log(page);
    return pageFullSource;
  },

  getPageFileName (page) {
    return `${_.uniqueId('index')}.html`;
  },

  download (pages) {
    const pagesLength = pages.length;

    if (pagesLength === 0) {
      return;
    }

    const zip = new JSZip();
    const fileSettings = this.getFileSettings();
    const zipFileName =  this.getFileName();

    for (let i = 0; i < pagesLength; i++) {
      const page = pages[i];
      const { blocksCount } = page;

      if (blocksCount !== 0) {
        const pageHTML = this.getPageHTML(page);
        const fileName = this.getPageFileName(page);

        zip.file(fileName, pageHTML);
      }
    }

    saveAs(zip.generate(fileSettings), zipFileName);
  }
};

export default exports;
