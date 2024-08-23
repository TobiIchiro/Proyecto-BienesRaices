import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.image = {
    dictDefaultMessage: "Sube aquí tus imágenes",
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar imagen',
    dictMaxFilesExceeded: 'Solo puedes agregar 1 imagen',
    headers: {
        'CSRF-Token': token
    },
    paramName: 'images',
    init: function(){
        const dropzone = this
        const btnPublish = document.querySelector('#publish')
        btnPublish.addEventListener('click', function() {
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete',function() {
            if(dropzone.getActiveFiles().length == 0){
                window.location.href = '/my-properties'
            }
        })
    }
}