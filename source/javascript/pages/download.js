import JSZip from 'jszip';
import Random from '../common/random';
import { saveAs } from 'file-saver';
import { TEMPLATE_PACKAGE_FILENAME, TEMPLATE_PACKAGE_EXTENSION } from '../constants';
import {
  map as _map
} from 'lodash';

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

async function downloadPages (pages, coreAssets) {
  const zip = new JSZip();
  const fileSettings = getFileSettings();
  const zipFileName = getFileName();
  const assetsFolder = zip.folder('assets');
  const templateFolder = assetsFolder.folder('template');

  zip.folder('images');

  // Add template files to ZIP package.
  templateFolder.file('template.js', coreAssets.javascript.toString());
  templateFolder.file('template.css', coreAssets.stylesheet.toString());

  // Add items to package and generate package.
  const pagesResult = await addPageFilesToPackage(zip, pages); //eslint-disable-line
  const content = await zip.generateAsync(fileSettings);

  // Let user download it.
  saveAs(content, zipFileName);
}

export default function (pages, state) {
  if (pages.length === 0 || !state || !state.template) {
    return false;
  }

  const { template } = state;
  const { core: coreAssets } = template;

  downloadPages(pages, coreAssets);
}
