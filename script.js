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

    window.selectSemester = function(num) {
        const solarSystem = document.querySelector('.solar-system');
        const stationMenu = document.getElementById('station-menu');
        const backBtn = document.getElementById('backToSolar');
        const vaisseau = document.getElementById('vaisseau');
        
        const titleSemester = document.getElementById('semester-choice-title');
        const titleDestination = document.getElementById('destination-choice-title');

        const tl = gsap.timeline();

        tl.to([solarSystem, titleSemester], { 
            opacity: 0, 
            y: -20,
            duration: 0.4, 
            onComplete: () => { 
                solarSystem.style.display = 'none'; 
                titleSemester.style.display = 'none';
            }
        });

        tl.to(vaisseau, {
            bottom: "10%",
            duration: 0.6,
            ease: "power2.out"
        }, "<"); // le "<" indique que l'animation commence en même temps que la précédente

        tl.set([stationMenu, backBtn, titleDestination], { display: 'flex', opacity: 0, y: 20 });
        tl.set(titleDestination, { display: 'block' });

        tl.to([titleDestination, backBtn, stationMenu], { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.1 
        });
    };

    window.backToSolarSystem = function() {
        const solarSystem = document.querySelector('.solar-system');
        const stationMenu = document.getElementById('station-menu');
        const backBtn = document.getElementById('backToSolar');
        const vaisseau = document.getElementById('vaisseau');
        
        const titleSemester = document.getElementById('semester-choice-title');
        const titleDestination = document.getElementById('destination-choice-title');

        const tl = gsap.timeline();

        tl.to([stationMenu, backBtn, titleDestination], { 
            opacity: 0, 
            y: 20, 
            duration: 0.4,
            onComplete: () => {
                stationMenu.style.display = 'none';
                backBtn.style.display = 'none';
                titleDestination.style.display = 'none';
            }
        });

        tl.to(vaisseau, {
            bottom: "37%",
            duration: 0.6,
            ease: "power2.inOut"
        }, "<");

        tl.set([solarSystem, titleSemester], { display: 'flex', opacity: 0, y: -20 });
        tl.set(titleSemester, { display: 'block' });

        tl.to([solarSystem, titleSemester], { 
            opacity: 1, 
            y: 0, 
            duration: 0.5 
        });
    };

});