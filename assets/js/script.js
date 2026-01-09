document.addEventListener('DOMContentLoaded', () => {
    
    const launchBtn = document.getElementById('launchBtn');
    const introScreen = document.getElementById('intro-screen');
    const vaisseau = document.getElementById('vaisseau');
    const cockpit = document.getElementById('interface-cockpit');
    const stars1 = document.getElementById('stars1');
    const stars2 = document.getElementById('stars2');

    gsap.set(vaisseau, { bottom: "10%", scale: 1 });
    

    launchBtn.addEventListener('click', () => {
        
        const tl = gsap.timeline();

        tl.to(introScreen, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
            onComplete: () => { introScreen.style.display = 'none'; }
        });

        tl.to(vaisseau, {
            bottom: "5%",
            scale: 0.8,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.5"); // Commence un peu avant la fin du titre

        tl.to(stars1, {
            y: "50%",
            duration: 3, 
            ease: "expo.inOut"
        }, "<");
        
        tl.to(stars2, {
            y: "40%", 
            duration: 3, 
            ease: "expo.inOut"
        }, "<");

        tl.to(vaisseau, {
            bottom: "37%", 
            scale: 1,
            duration: 2.5,
            ease: "power2.out"
        }, "<+0.2");

        tl.to(cockpit, {
            opacity: 1,
            duration: 1,
            delay: 0.5
        });

        // Animation de flottement du vaisseau
        gsap.to(vaisseau, {
            y: "-=15",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    });

    
    window.openSection = function(id) {
        const target = document.getElementById(id);
        const tl = gsap.timeline();

        // Le menu et le titre s'effacent
        tl.to(cockpit, { opacity: 0, scale: 0.9, duration: 0.5 });

        // Le vaisseau se déplace sur le côté
        tl.to(vaisseau, { 
            left: "10%", 
            bottom: "10%", 
            scale: 0.8, 
            rotation: 15,
            duration: 0.8 
        }, "<");

        // La section apparait
        if(target) {
            target.style.display = 'block';
            tl.fromTo(target, 
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
            );
        }
    };

    window.closeSection = function() {
        const sections = document.querySelectorAll('.book-section');
        const tl = gsap.timeline();

        // Fermer la section active
        sections.forEach(s => {
            if(s.style.display === 'block') {
                tl.to(s, { opacity: 0, y: 20, duration: 0.4, onComplete: () => s.style.display = 'none' });
            }
        });

        // Retour du menu
        tl.to(cockpit, { opacity: 1, scale: 1, duration: 0.5 });
        
        // Retour du vaisseau au centre
        tl.to(vaisseau, { 
            left: "50%", 
            bottom: "10%", 
            scale: 1, 
            rotation: 0,
            duration: 0.8 
        }, "<");
    };


    const semestersData = {
        5: {
            color: "#3498db",
            entreprise: { title: "Entreprise - Semestre 5", content: "<strong>Présentation de l'organisation :</strong><br>Dans le cadre de mon parcours d'ingénieur orienté Data et IA en alternance, j'ai eu la chance d'intégrer le groupe La Poste, et plus précisément la DSI de la Branche Grand Public et Numérique (BGPN). Au sein de cette structure, j'évolue dans la direction DSOD (Direction des Solutions Distributeurs), sous la responsabilité de Louis Ramin. Mon alternance s'inscrit dans un projet stratégique : le Programme SI Distributeur 2030, piloté par Christophe Le Du, qui vise à moderniser l'intégralité des outils numériques utilisés par les postiers et les clients en bureau de poste.<br><br><strong>Mon environnement :</strong><br>Je suis rattaché à l'équipe ART (Appui et Référent Technique), menée par Loïc Hennequin. Je travaille en collaboration directe avec mon tuteur, Jérôme Biabiany, Expert Informatique, qui m'accompagne sur les aspects techniques et stratégiques, tandis que Loïc Hennequin apporte une vision stratégique et l'orientation projet."},
            missions: { title: "Missions - Semestre 5", content: "<strong>Le défi de la migration (Legacy vers nouveau socle technologique) :</strong><br>Ma mission principale consiste à participer à la migration du socle applicatif Legacy (utilisant des technologies datées) de La Poste vers un environnement moderne basé sur Java 17+ et SpringBoot et à évaluer les apports en s’aidant de solution d’IA générative. Cette migration est importante pour assurer la maintenabilité, la sécurité et la performance des applications de la branche.<br>À ce jour, j'ai expérimenté la migration complète de deux premières applications. Ce travail nécessite une compréhension de l'existant et une certaine rigueur pour transformer l'architecture vers les normes Maven, les nouvelles technologies qui peuvent parfois différer et les standards actuels de l'entreprise (nommage, conventions, packaging).<br><br><strong>Innovation - Accélération par l'IA :</strong><br>Parallèlement à ces migrations manuelles, j'ai pu commencer à me renseigner et à tester un POC (Proof of Concept) visant à automatiser ce processus grâce à l'Intelligence Artificielle. L'objectif est de concevoir un système d'assistance à la migration pour gagner en efficacité et réduire les erreurs humaines lors des phases de refactorisation du code.<br>Dans ce cadre, j'ai eu l'opportunité de participer aux réflexions de la DSI sur l'usage de l'IA lors de plusieurs réunions sur les nouveaux modèles de langage exploitables par le groupe ou encore une réunion sur l'utilisation de l'IA au sein des équipes.<br><br><strong>Capitalisation et Documentation :</strong><br>Enfin, conformément aux exigences de l'ingénieur, j'ai pu produire une documentation technique (basée sur mes premières migrations réussies). Ce guide étape par étape détaille les opérations de restructuration, la gestion des dépendances et la mise en place de services bouchonnés (Mock via SoapUI) pour garantir l'autonomie des tests du module applicatifs sans dépendre des services tiers.</p>" },
            ecole: { title: "École - Semestre 5", content: "<strong>Fondamentaux Techniques et Algorithmiques :</strong><br>Depuis ma rentrée à Polytech Nantes en formation d'ingénieur par apprentissage, j'ai consolidé mes bases théoriques sur des domaines importants pour mon rôle de futur ingénieur IDIA. L'étude de l'algorithmique (Python), des systèmes informatiques (Linux, architecture PC) et du langage relationnel (SQL, Algèbre relationnelle) m'apporte la rigueur nécessaire pour comprendre le fonctionnement bas niveau des applications que je migre en entreprise.<br><br><strong>Théorie des Graphes et Optimisation :</strong><br>Un projet a consisté à réaliser une étude approfondie sur la théorie des graphes. Au sein d'un groupe de quatre étudiants, nous avons produit un rapport de 35 pages explorant des notions complexes comme les algorithmes de recherche du plus court chemin (Dijkstra, Bellman-Ford) et les arbres couvrants (Kruskal, Prim).<br><br><strong>Méthodes de Travail et Soft Skills :</strong><br>Le développement logiciel moderne ne se limitant pas au code, j'ai approfondi l'utilisation de Git pour le versioning et les stratégies de tests. Ce projet d'école m'a également permis d'exercer des compétences de gestion de projet essentielles à mon intégration chez La Poste :<br>• <strong>Pilotage :</strong> Animation de réunions et répartition des tâches selon les compétences de chacun.<br>• <strong>Organisation :</strong> Élaboration d'un cahier des charges et planification du travail pour favoriser l'entraide.<br>• <strong>Communication :</strong> Gestion des idées et intégration des retours d'équipe." }
        },
        6: {
            color: "#e67e22",
            entreprise: { title: "Entreprise - Semestre 6", content: "Contenu S6..." },
            missions: { title: "Missions - Semestre 6", content: "Contenu S6..." },
            ecole: { title: "École - Semestre 6", content: "Contenu S6..." }
        },
        7: { color: "#2ecc71",
            entreprise: { title: "Entreprise - Semestre 7", content: "Contenu S7..." },
            missions: { title: "Missions - Semestre 7", content: "Contenu S7..." },
            ecole: { title: "École - Semestre 7", content: "Contenu S7..." }
        },
        8: { color: "#9b59b6",
            entreprise: { title: "Entreprise - Semestre 8", content: "Contenu S8..." },
            missions: { title: "Missions - Semestre 8", content: "Contenu S8..." },
            ecole: { title: "École - Semestre 8", content: "Contenu S8..." },
        },
        9: { color: "#e74c3c",
            entreprise: { title: "Entreprise - Semestre 9", content: "Contenu S9..." },
            missions: { title: "Missions - Semestre 9", content: "Contenu S9..." },
            ecole: { title: "École - Semestre 9", content: "Contenu S9..." },
        },
        10: { color: "#1abc9c",
            entreprise: { title: "Entreprise - Semestre 10", content: "Contenu S10..." },
            missions: { title: "Missions - Semestre 10", content: "Contenu S10..." },
            ecole: { title: "École - Semestre 10", content: "Contenu S10..." },
        },
    };

    let currentSemester = null;


    window.selectSemester = function(num) {
        currentSemester = num;
        
        const solarSystem = document.querySelector('.solar-system');
        const planetarySystem = document.querySelector('.planetary-system');
        const titleSemester = document.getElementById('semester-choice-title');
        const titleDestination = document.getElementById('destination-choice-title');
        const vaisseau = document.getElementById('vaisseau');
        const centralPlanet = document.getElementById('central-planet-visual');

        // 1. Mise à jour de la planète centrale (Texte et COULEUR)
        centralPlanet.innerText = "S" + num;
        
        // On récupère la couleur depuis nos données
        const planetColor = semestersData[num] ? semestersData[num].color : '#fff';
        
        // On applique la couleur au dégradé et à l'ombre
        centralPlanet.style.background = `radial-gradient(circle at 30% 30%, ${planetColor}, #000)`;
        centralPlanet.style.boxShadow = `0 0 50px ${planetColor}`;

        // 2. Animations de transition
        const tl = gsap.timeline();

        // Sortie du système solaire
        tl.to([solarSystem, titleSemester], { 
            opacity: 0, 
            scale: 1.5, 
            duration: 0.8, 
            ease: "power2.in",
            onComplete: () => { 
                solarSystem.style.display = 'none'; 
                titleSemester.style.display = 'none';
            }
        });

        tl.to(vaisseau, { bottom: "5%", scale: 0.9, duration: 0.8 }, "<");

        // Entrée du système planétaire
        tl.set(planetarySystem, { display: 'flex', opacity: 0, scale: 0.5 });
        tl.set(titleDestination, { display: 'block', opacity: 0 });
        
        tl.to(planetarySystem, { opacity: 1, scale: 1, duration: 1, ease: "expo.out" });
        tl.to(titleDestination, { opacity: 1, duration: 0.5 }, "-=0.5");
    };

    window.backToSolarSystem = function() {
        const solarSystem = document.querySelector('.solar-system');
        const planetarySystem = document.querySelector('.planetary-system');
        const titleSemester = document.getElementById('semester-choice-title');
        const titleDestination = document.getElementById('destination-choice-title');
        const vaisseau = document.getElementById('vaisseau');

        const tl = gsap.timeline();

        tl.to([planetarySystem, titleDestination], { 
            opacity: 0, 
            scale: 1, 
            duration: 0.6,
            onComplete: () => {
                planetarySystem.style.display = 'none';
                titleDestination.style.display = 'none';
            }
        });

        tl.to(vaisseau, { bottom: "37%", scale: 1, duration: 0.8 }, "<");

        tl.set([solarSystem, titleSemester], { display: 'flex', opacity: 0, scale: 1.5 });
        tl.set(titleSemester, { display: 'block' });

        tl.to([solarSystem, titleSemester], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });
    };

        // --- GESTION DU CONTENU (JSON) ---
    window.openContent = function(sectionKey) {
        // 1. On récupère les éléments
        const overlay = document.getElementById('content-overlay');
        const title = document.getElementById('content-title');
        const body = document.getElementById('content-body');
        const planetarySystem = document.querySelector('.planetary-system');

        // 2. Vérification des données dans ton objet semestersData
        if (semestersData[currentSemester] && semestersData[currentSemester][sectionKey]) {
            const data = semestersData[currentSemester][sectionKey];
            
            // On injecte le contenu
            title.innerHTML = data.title;
            body.innerHTML = data.content;

            // 3. On affiche l'overlay en FLEX d'abord
            overlay.style.display = 'flex';

            // 4. Animation GSAP
            const tl = gsap.timeline();
            
            // On floute l'arrière-plan (le système planétaire)
            tl.to(planetarySystem, { filter: "blur(5px)", scale: 0.95, duration: 0.5 });
            
            // On fait apparaître l'overlay et la boîte de texte
            tl.to(overlay, { opacity: 1, duration: 0.4 }, "<");
            tl.fromTo('.book-section', 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 
                "-=0.2"
            );
        } else {
            console.error("Données introuvables pour S" + currentSemester + " section: " + sectionKey);
        }
    };

    window.closeContent = function() {
        const overlay = document.getElementById('content-overlay');
        const planetarySystem = document.querySelector('.planetary-system');
        
        const tl = gsap.timeline();
        
        tl.to('.book-section', { y: 50, opacity: 0, duration: 0.3 });
        tl.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => { overlay.style.display = 'none'; } });
        tl.to(planetarySystem, { filter: "blur(0px)", scale: 1, duration: 0.5 }, "-=0.3");
    };
});