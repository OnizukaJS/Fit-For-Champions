// [INDEX PAGE] GET THE LAST 3 VIDEOS
function getVideosLastHighlights() {

    const lastHighlightsSection = document.getElementById('container-last-hightlights-videos');
    const lastHighlightsMyTeam = document.getElementById('container-last-hightlights-my-team');
    const warningMsg = document.createElement('p');
    const nameOfFavTeam = document.getElementById('name-of-favourite-team');

    fetch(`https://www.scorebat.com/video-api/v1/`)

        .then((response) => {
            warningMsg.innerHTML = ''; //Para vaciar el mensaje

            if (!response.ok) {
                throw new Error('Cuidado, no se puede encontrar ningun imagenes');
            }

            return response.json(); //gracias a .json() permite leer todos los datos del url qu'on a choppé sur response qui permet de chopper l'url
        })
        .then((data) => {
            for (let i = 0; i < 3; i++) {
                let elmt = data[i];

                let date = new Date(`${elmt.date}`);
                let dateFormated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

                const divContainer = document.createElement('div');

                const titleElt = document.createElement('p');
                titleElt.innerHTML = `Teams: ${elmt.title} <br> Date: ${dateFormated}`;
                titleElt.classList.add('style-text-video');


                const embedVid = document.createElement('div');
                embedVid.innerHTML = `${elmt.embed}`;
                embedVid.classList.add('size-lasthighlights-vid');

                divContainer.appendChild(titleElt);
                divContainer.appendChild(embedVid);
                lastHighlightsSection.appendChild(divContainer);

            }

            // [INDEX PAGE] GET THE LAST 3 VIDEOS OF THE TEAM CHOSEN DURING THE SUSCRIPTION
            const lastUserSaved = db.getLoginUser();

            const favTeam = lastUserSaved.team;
            nameOfFavTeam.innerHTML = favTeam;

            //Array with games of your favourite team
            const filterData = data.filter((game) => {
                if (game.side1.name === favTeam || game.side2.name === favTeam) {
                    return true;
                }
            });

            //If the array is empty, return a message telling the user his/her team did not play for a while
            if (filterData.length === 0) {
                const arrIsEmpty = document.createElement('p');
                arrIsEmpty.innerHTML = `Sorry, it seems ${favTeam} did not play for a while but check out all the others highlights <a href="highlights.html">HERE</a>`;
                lastHighlightsMyTeam.appendChild(arrIsEmpty);
            } else {
                //Another loop to search for the matchs based on the favourite team
                for (let i = 0; i < 3; i++) {
                    let elmt = filterData[i];

                    let date = new Date(`${elmt.date}`);
                    let dateFormated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

                    const divContainer = document.createElement('div');

                    const titleElt = document.createElement('p');
                    titleElt.innerHTML = `Teams: ${elmt.title} <br> Date: ${dateFormated}`;
                    titleElt.classList.add('style-text-video');


                    const embedVid = document.createElement('div');
                    embedVid.innerHTML = `${elmt.embed}`;
                    embedVid.classList.add('size-lasthighlights-vid');

                    divContainer.appendChild(titleElt);
                    divContainer.appendChild(embedVid);
                    lastHighlightsMyTeam.appendChild(divContainer);

                }
            }
        })

        .catch((err) => {
            warningMsg.textContent = err; //Le message va se créer une seule fois car const warning mess est créé en dehors de la recherche.

            firstSectionElt.appendChild(warningMsg);
        })
}

getVideosLastHighlights();

// [HIGHLIGHTS PAGE] Change the "teams" options based on the "championship" chosen
const championshipChosenHighlightsPage = document.getElementById('championship'); //Input championship
const teamChosenHighlightsPage = document.getElementById('teams'); //Input teams
const frenchTeams = document.getElementById('frenchTeams');
const spanishTeams = document.getElementById('spanishTeams');
const italianTeams = document.getElementById('italianTeams');
const englishTeams = document.getElementById('englishTeams');
const germanTeams = document.getElementById('germanTeams');

championshipChosenHighlightsPage.addEventListener('change', function (e) {
    switch (e.target.value) {
        case 'SPAIN: La Liga':
            teamChosenHighlightsPage.innerHTML = '<option hidden selected>Select a team</option>';
            teamChosenHighlightsPage.appendChild(spanishTeams);
            break;
        case 'FRANCE: Ligue 1':
            teamChosenHighlightsPage.innerHTML = '<option hidden selected>Select a team</option>';
            teamChosenHighlightsPage.appendChild(frenchTeams);
            break;
        case 'ITALY: Serie A':
            teamChosenHighlightsPage.innerHTML = '<option hidden selected>Select a team</option>';
            teamChosenHighlightsPage.appendChild(italianTeams);
            break;
        case 'ENGLAND: Premier League':
            teamChosenHighlightsPage.innerHTML = '<option hidden selected>Select a team</option>';
            teamChosenHighlightsPage.appendChild(englishTeams);
            break;
        case "GERMANY: Bundesliga":
            teamChosenHighlightsPage.innerHTML = '<option hidden selected>Select a team</option>';
            teamChosenHighlightsPage.appendChild(germanTeams);
            break;
        default:
            break;
    }
});

// [HIGHLIGHTS PAGE] GET THE LAST 20 VIDEOS
function getVideosAllHighlights() {

    const firstSectionElt = document.getElementById('all-highlights');
    const warningMsg = document.createElement('p');

    fetch(`https://www.scorebat.com/video-api/v1/`)

        .then((response) => {
            warningMsg.innerHTML = ''; //Para vaciar el mensaje

            if (!response.ok) {
                throw new Error('Cuidado, no se puede encontrar ningun imagenes');
            }

            return response.json(); //gracias a .json() permite leer todos los datos del url qu'on a choppé sur response qui permet de chopper l'url
        })
        .then((data) => {

            for (let i = 0; i < 20; i++) {
                let elmt = data[i];
                let date = new Date(`${elmt.date}`);
                let dateFormated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

                const divContainer = document.createElement('div');

                const titleElt = document.createElement('p');
                titleElt.innerHTML = `Teams: ${elmt.title} <br> Date: ${dateFormated}`;
                titleElt.classList.add('style-text-video');

                const embedVid = document.createElement('div');
                embedVid.innerHTML = `${elmt.embed}`;
                embedVid.classList.add('size-highlights-vid');

                divContainer.appendChild(titleElt);
                divContainer.appendChild(embedVid);
                firstSectionElt.appendChild(divContainer);

            }
        })

        .catch((err) => {
            warningMsg.textContent = err; //Le message va se créer une seule fois car const warning mess est créé en dehors de la recherche.

            firstSectionElt.appendChild(warningMsg);
        })
}

getVideosAllHighlights();


// [HIGHLIGHTS PAGE] BASED ON THE CHOSEN CHAMPIONSHIP
function getVideosBasedOnChosenChampionship() {
    //Input championship
    const championshipChosenHighlightsPage = document.getElementById('championship');
    //Section "all-highlights"
    const firstSectionElt = document.getElementById('all-highlights');

    const warningMsg = document.createElement('p');

    championshipChosenHighlightsPage.addEventListener('change', function (e) {

        //Clean the section before to display new stuff
        firstSectionElt.innerHTML = '';

        fetch(`https://www.scorebat.com/video-api/v1/`)

            .then((response) => {
                warningMsg.innerHTML = ''; //Para vaciar el mensaje

                if (!response.ok) {
                    throw new Error('Cuidado, no se puede encontrar ningun imagenes');
                }

                return response.json(); //gracias a .json() permite leer todos los datos del url qu'on a choppé sur response qui permet de chopper l'url
            })
            .then((data) => {

                //Array with games of the chosen championship
                const filterData = data.filter((game) => {
                    if (game.competition.name === e.target.value) {
                        return true;
                    }
                });

                if (filterData.length === 0) {
                    const yellowCard = document.createElement('img');
                    yellowCard.src = 'images/referee.png';
                    yellowCard.classList.add('referee');
                    const arrIsEmpty = document.createElement('p');
                    arrIsEmpty.innerHTML = 'Oups, it seems the ' + e.target.value + ' is on break...but check out other championships';
                    arrIsEmpty.classList.add('no-highlights-available');

                    firstSectionElt.appendChild(arrIsEmpty);
                    firstSectionElt.appendChild(yellowCard);
                } else {
                    //Another loop to search for the matchs based on the favourite team
                    for (let i = 0; i < 20; i++) {
                        let elmt = filterData[i];

                        let date = new Date(`${elmt.date}`);
                        let dateFormated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

                        const divContainer = document.createElement('div');

                        const titleElt = document.createElement('p');
                        titleElt.innerHTML = `Teams: ${elmt.title} <br> Date: ${dateFormated}`;
                        titleElt.classList.add('style-text-video');

                        const embedVid = document.createElement('div');
                        embedVid.innerHTML = `${elmt.embed}`;
                        embedVid.classList.add('size-highlights-vid');

                        divContainer.appendChild(titleElt);
                        divContainer.appendChild(embedVid);

                        firstSectionElt.appendChild(divContainer);
                    }
                }
            })
            .catch((err) => {
                warningMsg.textContent = err; //Le message va se créer une seule fois car const warning mess est créé en dehors de la recherche.
                console.log(warningMsg);

            })
    })
}

getVideosBasedOnChosenChampionship();


// [HIGHLIGHTS PAGE] BASED ON THE CHOSEN TEAM
function getVideosBasedOnChosenTeam() {
    const teamChosenHighlightsPage = document.getElementById('teams');
    const firstSectionElt = document.getElementById('all-highlights');
    const warningMsg = document.createElement('p');

    teamChosenHighlightsPage.addEventListener('change', function (e) {

        //Clean the section before to display new stuff
        firstSectionElt.innerHTML = '';

        fetch(`https://www.scorebat.com/video-api/v1/`)

            .then((response) => {
                warningMsg.innerHTML = ''; //Para vaciar el mensaje

                if (!response.ok) {
                    throw new Error('Cuidado, no se puede encontrar ningun imagenes');
                }

                return response.json(); //gracias a .json() permite leer todos los datos del url qu'on a choppé sur response qui permet de chopper l'url
            })
            .then((data) => {

                //Array with games of the chosen team
                const filterData = data.filter((game) => {
                    if (game.side1.name === e.target.value || game.side2.name === e.target.value) {
                        return true;
                    }
                });

                if (filterData.length === 0) {
                    const yellowCard = document.createElement('img');
                    yellowCard.src = 'images/referee.png';
                    yellowCard.classList.add('referee');

                    const arrIsEmpty = document.createElement('p');
                    arrIsEmpty.innerHTML = 'Oups, it seems ' + e.target.value + ' did not play for a while but check out other teams';
                    arrIsEmpty.classList.add('no-highlights-available');
                    firstSectionElt.appendChild(arrIsEmpty);
                    firstSectionElt.appendChild(yellowCard);
                } else {
                    //Another loop to search for the matchs based on the favourite team
                    for (let i = 0; i < 20; i++) {
                        let elmt = filterData[i];

                        const divContainer = document.createElement('div');

                        const titleElt = document.createElement('p');
                        titleElt.innerHTML = `${elmt.title}`;
                        titleElt.classList.add('style-text-video');

                        const embedVid = document.createElement('div');
                        embedVid.innerHTML = `${elmt.embed}`;
                        embedVid.classList.add('size-highlights-vid');

                        divContainer.appendChild(titleElt);
                        divContainer.appendChild(embedVid);

                        firstSectionElt.appendChild(divContainer);
                    }
                }
            })
            .catch((err) => {
                warningMsg.textContent = err; //Le message va se créer une seule fois car const warning mess est créé en dehors de la recherche.
                console.log(warningMsg);

            })
    })
}

getVideosBasedOnChosenTeam();

// [HIGHLIGHTS PAGE] Reset the settings
const resetButton = document.getElementById('reset-settings');
resetButton.addEventListener('click', window.location.reload());