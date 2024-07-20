// Définir la liste des travaux en tant que variable globale
let travaux = [];

// Fonction asynchrone pour récupérer les travaux via l'API
async function fetchAndGenerateWorks() {
    try {
        const reponse = await fetch('http://localhost:5678/api/works');
        travaux = await reponse.json(); // Assigner les travaux à la variable globale
        genererTravaux(travaux); // Appel de la fonction pour générer les travaux une fois qu'ils ont été récupérés
    } catch (error) {
        console.error('Erreur lors de la récupération des travaux :', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Vérifiez l'URL de la page avant de supprimer le token
    if (window.location.pathname === '/index.html') {
        localStorage.removeItem('token');
    }
    fetchAndGenerateWorks();
    setFilters();
});

const portfolioSection = document.getElementById('portfolio');

function setFilters(){
    let token = localStorage.getItem('token');
    if (token) {
        console.log('Token JWT trouvé. Les éléments de filtre ne seront pas créés.');
        return;
    }

    // Vérifie si les éléments ont déjà été créés
    const existingSortBar = document.querySelector('.sortBar');
    if (existingSortBar) {
        console.log('Les éléments de filtre ont déjà été créés.');
        return;
    }

    // Création des éléments si non créés
    const h2 = document.createElement('h2');
    h2.textContent = 'Mes Projets';
        
    const sortBar = document.createElement('div');
    sortBar.className = 'sortBar';
        
    const buttonTous = document.createElement('button');
    buttonTous.id = 'Tous';
    buttonTous.className = 'button--green';
    buttonTous.textContent = 'Tous';
        
    const buttonObjet = document.createElement('button');
    buttonObjet.id = 'Objet';
    buttonObjet.textContent = 'Objets';
        
    const buttonAppartement = document.createElement('button');
    buttonAppartement.id = 'Appartement';
    buttonAppartement.textContent = 'Appartements';
        
    const buttonHotel = document.createElement('button');
    buttonHotel.id = 'Hotel';
    buttonHotel.textContent = 'Hotels & restaurants';
        
    // Ajout des boutons à la barre de tri
    sortBar.appendChild(buttonTous);
    sortBar.appendChild(buttonObjet);
    sortBar.appendChild(buttonAppartement);
    sortBar.appendChild(buttonHotel);
        
    // Ajout des éléments à la section portfolio
    if (portfolioSection) {
        portfolioSection.prepend(sortBar);
        portfolioSection.prepend(h2);
    } else {
        console.error('La section portfolio n\'a pas été trouvée.');
    }
}
setFilters();


// Fonction pour filtrer les travaux par catégorie
function filterWorksByCategory(works, categoryId) {
    return works.filter(work => work.categoryId === categoryId);
}

// Fonction pour afficher les travaux filtrés par catégorie
function showFiguresByCategory(category, activeButton) {
    const sectionFigure = document.querySelector("#dynamicFigure");
    sectionFigure.innerHTML = "";
    const filteredWorks = category === 'all' ? travaux : filterWorksByCategory(travaux, category);
    genererTravaux(filteredWorks);

    // Mettre à jour les classes des boutons
    objetButton.classList.toggle("button--green", activeButton === objetButton);
    appartementButton.classList.toggle("button--green", activeButton === appartementButton);
    hotelButton.classList.toggle("button--green", activeButton === hotelButton);
    tousButton.classList.toggle("button--green", activeButton === tousButton);
}

// Boutons
const objetButton = document.getElementById('Objet');
const appartementButton = document.getElementById('Appartement');
const hotelButton = document.getElementById('Hotel');
const tousButton = document.getElementById('Tous');

function addEventListeners() {
    const objetButton = document.querySelector('#Objet');
    const appartementButton = document.querySelector('#Appartement');
    const hotelButton = document.querySelector('#Hotel');
    const tousButton = document.querySelector('#Tous');

    if (objetButton) {
        objetButton.addEventListener('click', () => showFiguresByCategory(1, objetButton));
    } else {
        console.error('Le bouton Objet n\'a pas été trouvé.');
    }

    if (appartementButton) {
        appartementButton.addEventListener('click', () => showFiguresByCategory(2, appartementButton));
    } else {
        console.error('Le bouton Appartement n\'a pas été trouvé.');
    }

    if (hotelButton) {
        hotelButton.addEventListener('click', () => showFiguresByCategory(3, hotelButton));
    } else {
        console.error('Le bouton Hotel n\'a pas été trouvé.');
    }

    if (tousButton) {
        tousButton.addEventListener('click', () => showFiguresByCategory('all', tousButton));
    } else {
        console.error('Le bouton Tous n\'a pas été trouvé.');
    }
}
addEventListeners();

const sectionFigure = document.createElement('div');
sectionFigure.id = 'dynamicFigure';
sectionFigure.className = 'gallery';
portfolioSection.appendChild(sectionFigure);

function genererTravaux(travaux){
    
    for (let i = 0; i < travaux.length; i++) {
        const figure = travaux[i];
        // Création d’une balise dédiée à un travail
        const figureElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = figure.title;
        
        // Generayion de la balise figure de l'image et du nom
        sectionFigure.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
     }
}

export {showFiguresByCategory, filterWorksByCategory, genererTravaux, setFilters};