import JSZip from 'jszip';
import _map from 'lodash/map';
import { saveAs } from './FileSaver';
import { TEMPLATE_PACKAGE_FILENAME, TEMPLATE_PACKAGE_EXTENSION } from '../Constants';

function getFileSettings () {
  return {
    type: 'blob'
  };
}

function getFileName () {
  return `${TEMPLATE_PACKAGE_FILENAME}.${TEMPLATE_PACKAGE_EXTENSION}`;
}

function get (url) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState === 4) { // done
        if (request.status === 200) { // complete
          resolve(request.responseText);
        }
      }
    };

    request.onerror = function (e) {
      reject(e.target.status);
    };

    request.open('GET', url, true);
    request.send(null);
  });
}

async function addPageFilesToPackage (pckg, pages) {
  return new Promise(function(resolve) {
    _map(pages, function (page) {
      const { blocksCount } = page;

      if (blocksCount > 0) {
        const { pageFileName: fileName, pageFullSource: pageHTML } = page;

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

  const javascriptFile = await get('assets/template/template.js');
  const stylesheetFile = await get('assets/template/template.css');

  templateFolder.file('template.js', javascriptFile);
  templateFolder.file('template.css', stylesheetFile);

  const pagesResult = await addPageFilesToPackage(zip, pages); //eslint-disable-line

  zip.generateAsync(fileSettings)
    .then(function (content) {
      saveAs(content, zipFileName);
    });
}

export default function (pages, state) {
  if (pages.length === 0 || !state) {
    return false;
  }

  downloadPages(pages, state);
}
