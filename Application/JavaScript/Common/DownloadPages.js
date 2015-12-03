import { saveAs } from './FileSaver';
import { TEMPLATE_PACKAGE_FILENAME, TEMPLATE_PACKAGE_EXTENSION } from '../Constants';
import JSZip from 'jszip';
import _ from 'lodash';

const exports = {
  getFileSettings () {
    return {
      type: 'blob'
    }
  },

  getFileName () {
    const fileName = `${TEMPLATE_PACKAGE_FILENAME}.${TEMPLATE_PACKAGE_EXTENSION}`;
    return fileName;
  },

  getPageHTML (page) {
    const { pageFullSource } = page;
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
