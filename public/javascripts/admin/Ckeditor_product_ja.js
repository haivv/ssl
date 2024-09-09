ClassicEditor
  .create(document.querySelector('#editor_ja'), {
    toolbar: [

      'heading', '|',
      'bold', 'italic', 'link', '|',
      'insertTable', 'bulletedList', 'numberedList', '|',
      'undo', 'redo', '|', 'alignment', '|',
      'blockQuote', '|', 'removeFormat', '|',
    ]
  
  })
  .catch(error => {
    console.error(error);
  });

