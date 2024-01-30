const prompt = require("prompt-sync")({ sigint: true });
let combat = true;
let tourEnnemi = false;
let tourUser = true;

// On déclare nos variables qu'on utilisera plus tard et on importe prompt sync pour l'input user

class Pokemon {
    constructor(attaques, nom, pv){
        this.attaques = attaques;
        this.nom = nom;
        this.pv = pv;
    }
}
// On crée une classe pokémon

const continuer = () => {
    prompt(`Appuyez sur entrée pour continuer....`);
}
// Fonction pour attendre que l'user press entrée pour continuer

class Attaque {
    constructor(nomAttaque, precisionAttaque, puissanceAttaque, descriptionAttaque, typeAttaque){
        this.nomAttaque = nomAttaque;
        this.precisionAttaque = precisionAttaque;
        this.puissanceAttaque = puissanceAttaque;
        this.descriptionAttaque = descriptionAttaque;
        this.typeAttaque = typeAttaque;
    }
}
// On crée une classe pour les attaques des pokémons 

const randomize = (pourcentage) => {
    let randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber <= pourcentage){
        return true;
    }else{
        return false;
    }
}

// Fonction pour randomiser avec un pourcentage 

const randomize2 = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
// Fonction pour randomiser avec un min et un max

const creerAttaque = (nomAttaque, precisionAttaque, puissanceAttaque, descriptionAttaque, typeAttaque) => {
    let nouvelleAttaque = new Attaque(nomAttaque, precisionAttaque, puissanceAttaque, descriptionAttaque, typeAttaque);
    return nouvelleAttaque;
}

// Fonction pour créer une attaque avec notre classe Attaque


const afficherAttaques = (nomPokemon) => {
    let i = 1;
    let attaquesAffichees = "";
    nomPokemon.attaques.forEach((attaque) =>{
        attaquesAffichees += `[${i}] : ${attaque.nomAttaque},  Chances de toucher : ${attaque.precisionAttaque}%,  Dégâts : ${attaque.puissanceAttaque} \n`;
        i++
    })
    console.log(attaquesAffichees);
}

// Fonction pour afficher les attaques de notre pokémon

const afficherPv = (nomPokemon) => {
    let pvPokemon = nomPokemon.pv;
    let hpBar = "";
    for(let i = 0; i < pvPokemon; i++){
        hpBar += "-";
    }
    
    console.log(`\nPV : ${pvPokemon} |${hpBar}|\n`);
}

// Fonction pour afficher les PV de notre pokémon

const finDePartie = () => {
    console.log("\n FIN \n");
    combat = false;
    process.exit();
}

// Fonction pour mettre fin à la partie et fin au programme


const executerAttaque = (numeroAttaque, nomPokemon, nomEnnemi) => {
    console.log(`${nomPokemon.nom} utilise ${nomPokemon.attaques[numeroAttaque -1].nomAttaque}`);
    continuer();
    if (randomize(nomPokemon.attaques[numeroAttaque -1].precisionAttaque)){
        console.log("L'attaque a touché.");
        continuer();
        if (nomPokemon.attaques[numeroAttaque -1].typeAttaque === "dmg"){
            nomEnnemi.pv -= nomPokemon.attaques[numeroAttaque -1].puissanceAttaque;
        }else if(nomPokemon.attaques[numeroAttaque -1].typeAttaque === "heal"){
            if (nomPokemon.pv < 100){
                nomPokemon.pv += nomPokemon.attaques[numeroAttaque -1].puissanceAttaque;
            }else if (nomPokemon.pv >= 100){
                console.log("L'attaque a réussi, mais ses PV sont déjà au max.");
            }
        }
        
        if (nomPokemon.pv > 100){
            nomPokemon.pv = 100;
        }
    }else{
        console.log("L'attaque a échoué.");
        continuer();
    }

} 

// Fonction pour lancer une attaque, utiliser notre fonction randomize pour calculer si l'attaque va être lancée, si l'attaque est de type heal, soigne, si les HP sont déjà au max, ne rien faire

let pokemon = new Pokemon([creerAttaque("Frappe Rapide", 50, 10, "Lance un coup rapide", "dmg"), creerAttaque("Soin Léger", 33.33, 15, "Soigne 15 PV", "heal"), creerAttaque("Coup Puissant", 33.33, 20, "Lance un coup puissant", "dmg"), creerAttaque("Frappe dévastatrice", 25, 30, "Lance un coup dévastateur", "dmg")], "Guerrier du Feu", 100);
let ennemi = new Pokemon([creerAttaque("Frappe Rapide", 50, 10, "Lance un coup rapide", "dmg"), creerAttaque("Soin Léger", 33.33, 15, "Soigne 15 PV", "heal"), creerAttaque("Coup Puissant", 33.33, 20, "Lance un coup puissant", "dmg"), creerAttaque("Frappe dévastatrice", 25, 30, "Lance un coup dévastateur", "dmg")], "Sombre Lutin", 100);

// On crée deux objets de type Pokemon pour notre pokemon et celui de l'ordinateur

while (combat){
    if (tourUser){
        console.log("Vos PV : ");
        afficherPv(pokemon);
        console.log("PV de l'ennemi : ");
        afficherPv(ennemi);
        afficherAttaques(pokemon);

        let choix = prompt("> ");
        switch (Number(choix)){
            case 1:
                executerAttaque(1, pokemon, ennemi);
                tourEnnemi = true;
                tourUser = false;
                break;
            case 2:
                executerAttaque(2, pokemon, ennemi);
                tourEnnemi = true;
                tourUser = false;
                break;
            case 3:
                executerAttaque(3, pokemon, ennemi);
                tourEnnemi = true;
                tourUser = false;
                break;
            case 4:
                executerAttaque(4, pokemon, ennemi);
                tourEnnemi = true;
                tourUser = false;
                break;
            default:
                console.log("Entrée incorrecte.");
        }
    }else if (tourEnnemi){
        executerAttaque(randomize2(1, 4), ennemi, pokemon);
        tourUser = true;
        tourEnnemi = false;
    }
    if (pokemon.pv <= 0){
        console.log(`${pokemon.nom} est mort au combat. Vous avez perdu.`);
        finDePartie();
    }else if(ennemi.pv <= 0){
        console.log(`${ennemi.nom} est mort au combat. Vous avez gagné. `);
        finDePartie();
    }
}

// boucle qui utilise toutes nos fonctions, check si les PV d'un des objets de type pokemon est inferieur ou égal à 0 pour mettre fin à la partie, plusieurs if else qui alternent entre l'ordinateur et l'user