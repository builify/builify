import JSZip from 'jszip';
import _map from 'lodash/map';
import Random from '../common/random';
import { fetch } from '../common/http';
import { saveAs } from 'file-saver';
import { TEMPLATE_PACKAGE_FILENAME, TEMPLATE_PACKAGE_EXTENSION } from '../constants';

function getFileSettings () {
  return {
    type: 'blob'
  };
}

function getFileName () {
  return `${TEMPLATE_PACKAGE_FILENAME}.${TEMPLATE_PACKAGE_EXTENSION}`;
}

async function addPageFilesToPackage (pckg, pages) {
  let _pageFileNames = [];

  return new Promise((resolve) => {
    _map(pages, (page) => {
      const { blocksCount } = page;

      if (blocksCount > 0) {
        let { pageFileName: fileName, pageFullSource: pageHTML } = page;

        if (_pageFileNames.indexOf(fileName) !== -1) {
          fileName = `${Random.randomKey(fileName.split('.').pop())}.html`;
        }

        _pageFileNames.push(fileName);

        pckg.file(fileName, pageHTML);
      }
    });

    resolve(true);
  });
}

async function downloadPages (pages) {
  const zip = new JSZip();
  const fileSettings = getFileSettings();
  const zipFileName = getFileName();
  const assetsFolder = zip.folder('assets');
  const templateFolder = assetsFolder.folder('template');

  // Get local asset files.
  const javascriptFile = await fetch('assets/template/template.js');
  const stylesheetFile = await fetch('assets/template/template.css');

  // Add template files to ZIP package.
  templateFolder.file('template.js', javascriptFile);
  templateFolder.file('template.css', stylesheetFile);

  // Add items to package and generate package.
  const pagesResult = await addPageFilesToPackage(zip, pages); //eslint-disable-line
  const content = await zip.generateAsync(fileSettings);

  // Let user download it.
  saveAs(content, zipFileName);
}

export default function (pages, state) {
  if (pages.length === 0 || !state) {
    return false;
  }

  downloadPages(pages, state);
}
