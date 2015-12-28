import React from 'react';
import Dropzone from 'react-dropzone-component';

export default class ImageEditContentUploadImage extends React.Component {
  static propTypes = {
    onUploadImage: React.PropTypes.func.isRequired
  };
  
  dropzoneConfig = {
    uploadMultiple: false,
    parallelUploads: 1,
    clickable: true,
    maxFiles: 1,
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/index.html'
  };

  fileUploadCallback = (file) => {
    const { onUploadImage } = this.props;
    const { name, height, width, size, lastModified } = file;
    let reader = new FileReader();

    reader.onload = (e) => {
      return onUploadImage({
        fileSize: size,
        fileDimensions: {
          h: height,
          w: width
        },
        fileName: name,
        fileType: file.type,
        fileData: e.target.result,
        lastModified: lastModified
      });
    };

    reader.readAsDataURL(file);
  };

  initCallback = (dropzone) => {
    var minSteps = 6,
        maxSteps = 60,
        timeBetweenSteps = 100,
        bytesPerStep = 1000000;

    dropzone.on("maxfilesexceeded", function(file) {
      this.removeFile(file);
    });

    dropzone.uploadFiles = function(files) {
      var self = this;

      for (let i = 0; i < files.length; i++) {
        var file = files[i],
            totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

        for (let step = 0; step < totalSteps; step++) {
          const duration = timeBetweenSteps * (step + 1);

          window.setTimeout(function(file, totalSteps, step) {
            return function() {
              file.upload = {
                progress: 100 * (step + 1) / totalSteps,
                total: file.size,
                bytesSent: (step + 1) * file.size / totalSteps
              };

              self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);

              if (file.upload.progress == 100) {
                file.status = Dropzone.SUCCESS;
                self.emit("success", file, 'success', null);
                self.emit("complete", file);
                self.processQueue();
              }
            };
          }(file, totalSteps, step), duration);
        }
      }
    }
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const dropzoneEventHandlers = {
      init: this.initCallback,
      addedfile: this.fileUploadCallback,
    };

    return (
      <div className='ab-modal__tab'>
        <Dropzone
          config={this.dropzoneConfig}
          eventHandlers={dropzoneEventHandlers} />
      </div>
    );
  }
}
