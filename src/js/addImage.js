import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.image = {
    dictDefaultMessage: "Sube aquí tus imágenes",
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 5,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar imagen',
    dictMaxFilesExceeded: 'Solo puedes agregar máximo 5 imágenes',
    headers: {
        'CSRF-Token': token
    },
    paramName: 'images'
}