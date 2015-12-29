import { saveAs } from './FileSaver';
import { TEMPLATE_PACKAGE_FILENAME, TEMPLATE_PACKAGE_EXTENSION } from '../Constants';
import JSZip from 'jszip';

export default {
  getFileSettings () {
    return {
      type: 'blob'
    };
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
    const { pageFileName } = page;
    return pageFileName;
  },

  download (pages, builder) {
    const { uploadedImages } = builder;
    const pagesLength = pages.length;
    let i = 0;

    if (pagesLength === 0) {
      return;
    }

    const zip = new JSZip();
    const fileSettings = this.getFileSettings();
    const zipFileName =  this.getFileName();

    for (; i < pagesLength; i++) {
      const page = pages[i];
      const { blocksCount } = page;

      if (blocksCount !== 0) {
        const pageHTML = this.getPageHTML(page);
        const fileName = this.getPageFileName(page);

        zip.file(fileName, pageHTML);
      }
    }

    for (i = 0; i < uploadedImages.length; i++) {
      const uploadedImage = uploadedImages[i];
      const { fileType, fileData } = uploadedImage;

      if (typeof fileType !== undefined && typeof fileData !== undefined) {
        zip.file('test.png', fileData);
      }
    }

    saveAs(zip.generate(fileSettings), zipFileName);
  }
};
