(function () {
    
    const categoryClicked = document.querySelector('.hamburger2').addEventListener('click', showCategories)
    const categories = document.querySelector('.categories')
    function showCategories() {
        if(categories.classList.contains("hidden")){
            categories.classList.remove("hidden")
        }
            
        else{
            categories.classList.add("hidden")
        }
    }
})()