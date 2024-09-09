ClassicEditor
  .create(document.querySelector('#editor'), {
    ckfinder: {
      uploadUrl: '/admin/upload'
    },
    toolbar: [
      'imageUpload', 'mediaEmbed', '|',
      'heading', '|',
      'bold', 'italic', 'link', '|',
      'insertTable', 'bulletedList', 'numberedList', '|',
      'undo', 'redo', '|', 'alignment', '|',
      'blockQuote', '|', 'removeFormat', '|',

    ],
    image: {
      toolbar: [
        'toggleImageCaption',         // Toggle image caption
        'imageTextAlternative',       // Alternative text for image
        'ckboxImageEdit',             // Edit image properties
        '|',                          // Separator
        'imageStyle:inline',          // Display image inline
        'imageStyle:block',           // Display image as block
        'imageStyle:side',            // Display image as side content

        '|',                          // Separator
        'alignLeft',                  // Align image to the left
        'alignCenter',                // Align image to the center
        'alignRight',                 // Align image to the right
        '|',                          // Separator
        'linkImage',                  // Link URL for image
        'unlinkImage',                // Remove link from image
        '|',                          // Separator
        'imageStyle:full',            // Display image full width
        'imageStyle:alignLeft',       // Display image full width, aligned left
        'imageStyle:alignRight',      // Display image full width, aligned right
        '|',                          // Separator
        'removeImage'                 // Remove image from content
      ],
      styles: [
        'full',
        'alignLeft',
        'alignRight'
      ],
      customClass: {
          image: 'image'
      }
    },
    mediaEmbed: {
      previewsInData: true
    }
  })
  .catch(error => {
    console.error(error);
  });