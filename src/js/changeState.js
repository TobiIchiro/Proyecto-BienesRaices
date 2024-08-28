(function () {
    const changeStateButton = document.querySelectorAll('.change-state')
    changeStateButton.forEach(button => {
        button.addEventListener('click',changeStateProperty)
    })

    function changeStateProperty(e) {
        const {propertyId : id} = e.target.dataset
        alert(id)
    }
})()