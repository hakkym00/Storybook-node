const menuBar = () => {
    sidebar = document.querySelector('.sidebar')
    sidebar.style.transform = 'translateX(0px)'
    sidebar.style.display = 'block'

}

const closeBar = () => {
    sidebar = document.querySelector('.sidebar')
    sidebar.style.transform = 'translateX(-250px)'
    sidebar.style.display= 'none'
}

CKEDITOR.replace( 'body',{
    plugins: 'wysiwygarea, toolbar, basicstyles, link'
} );
