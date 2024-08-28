(function () {
    
    const menuClicked = document.querySelector('.hamburger').addEventListener('click', showMenu)
    const menuOptions = document.querySelector('.options')

    function showMenu () { 
        if(menuOptions.classList.contains("hidden") && !menuOptions.classList.contains('hamburger2')){
            menuOptions.classList.remove("hidden")
        }
            
        else{
            menuOptions.classList.add("hidden")
        }
            
    }
})()