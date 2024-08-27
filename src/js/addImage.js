import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.image = {
    dictDefaultMessage: "Sube aquí tus imágenes",
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 5,
    parallelUploads: 5,
    autoProcessQueue: false,
    uploadMultiple: true,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar imagen',
    dictMaxFilesExceeded: 'Solo puedes agregar máximo 5 imágenes',
    headers: {
        'CSRF-Token': token
    },
    paramName: function() { return 'images'; },
    init: function(){
        const dropzone = this
        const btnPublish = document.querySelector('#publish')

        btnPublish.addEventListener('click',function() {
            dropzone.processQueue()
        })
        dropzone.on('queuecomplete',function() {
            if(dropzone.getActiveFiles().length == 0) {
                window.location.href = '/my-properties'
            }
        })
    }
}