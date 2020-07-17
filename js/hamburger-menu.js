const hamburgerIcon = document.getElementById('hamburgerIcon');

hamburgerIcon.addEventListener('click', function () {
    let menuResp = document.getElementById('menuResp');
    if (menuResp.style.display === 'none') {
        menuResp.style.display = 'flex';
        menuResp.classList.add('display-menu-resp');
    } else {
        menuResp.style.display = 'none';
        menuResp.classList.remove('display-menu-resp');
    }
});