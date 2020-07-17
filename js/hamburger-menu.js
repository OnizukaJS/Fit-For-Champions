const hamburgerIcon = document.getElementById('hamburgerIcon');

hamburgerIcon.addEventListener('click', function () {
    let menuResp = document.getElementById('menuResp');
    if (menuResp.style.display === 'none') {
        menuResp.style.display = 'flex';
        hamburgerIcon.style.backgroundColor = '#0C1B33';
        hamburgerIcon.style.border = '1px solid';
        hamburgerIcon.style.color = 'white';
        hamburgerIcon.style.outline = 'none';
        menuResp.classList.add('display-menu-resp');
    } else {
        menuResp.style.display = 'none';
        menuResp.classList.remove('display-menu-resp');
        hamburgerIcon.style.backgroundColor = 'white';
        hamburgerIcon.style.border = 'none';
        hamburgerIcon.style.color = '#0C1B33';
        hamburgerIcon.style.outline = 'none';
    }
});