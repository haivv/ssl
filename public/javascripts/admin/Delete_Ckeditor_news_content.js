ClassicEditor
    .create(document.querySelector('#news_content'), {
        ckfinder: {
            uploadUrl: '/admin/uploads_add_news'
        },
        toolbar: [
            'imageUpload', 'mediaEmbed', '|',
            'heading', '|',
            'bold', 'italic', 'link', '|',
            'insertTable', 'bulletedList', 'numberedList', '|',
            'undo', 'redo', '|',
            'alignment', '|',  // Thêm nút căn lề vào toolbar
            'blockQuote', '|', 'removeFormat', '|',
        ],
        image: {
            toolbar: [
                'toggleImageCaption', 'imageTextAlternative', '|',
                'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
                'alignLeft', 'alignCenter', 'alignRight', '|',
                'linkImage', 'unlinkImage', '|',
                'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignRight', '|',
                'removeImage'
            ],
            styles: [ 'full', 'alignLeft', 'alignRight' ]
        },
        mediaEmbed: {
            previewsInData: true
        }
    })
    .catch(error => {
        console.error(error);
    });
