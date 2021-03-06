
    // Create Dino Constructor
    function Dino(species, weight, height, where, diet, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

   

    // Create Dino Objects
    const dinoInfo = [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ] 
    //
    const dinoMap = dinoInfo.map(function(item){
        return new Dino(item.species, item.weight, item.height, item.where, item.diet, item.when, [item.fact]);
    });

       
    // Create Human Object
    let human = new Dino();

    
    // Use IIFE to get human data from form
    // On button click, prepare and display infographic
    (function() {
        const form = document.getElementById('dino-compare');
        const inputs = form.getElementsByTagName('input');
        document.getElementById('btn').addEventListener('click', function () {
            for (i = 0; i < inputs.length; i++) {
                if (inputs[i].value === '') {
                    alert("Please fill out form completely");
                    return false;
                } 
            };
            
            return submitForm();
                        
            function submitForm() {
                //convert feet to inches
                human.height = parseInt(document.getElementById('feet').value) * 12 + parseInt(document.getElementById('inches').value);
                human.weight = parseInt(document.getElementById('weight').value);
                human.diet = document.getElementById('diet').value.toLowerCase();
                human.where = document.getElementById('continent').value;
                human.species = document.getElementById('name').value;
                //push human object to the middle of array
                dinoMap.splice(4, 0, human);
                
                compareWeight();
                compareDiet();
                compareLocation();
                removeForm();
                tiles();
            }
        })
    })();


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    const compareWeight = function() {     
        const dinoOnly = dinoMap.filter(function(item) {
            return item.species !== human.species;
        });

        dinoOnly.forEach(function(dino) {
            if (dino.weight > human.weight) {
                dino.fact.push(`${dino.species} is heavier than you!`);
                dino.fact.push(`${dino.species} outweighs you by ${dino.weight - human.weight} lbs!`);
            } else if (dino.weight === human.weight) {
                dino.fact.push(`You are the same weight as a ${dino.species}`);
            } else {
                dino.fact.push(`${dino.species} is lighter than you!`);
                dino.fact.push(`You outweigh a ${dino.species} by ${human.weight - dino.weight} lbs!`);
            }
        });

        dinoOnly.forEach(function(dino) {
            if (dino.diet == 'carnivor' && (dino.height > human.height && dino.weight > human.weight)) {
                dino.fact.push(`You better run when you see a ${dino.diet} like the ${dino.species}!`);
            } else if (dino.height < human.height && dino.weight < human.weight) {
                dino.fact.push(`${dino.species}\'s can still be dangerous even if you outweigh them by ${human.weight - dino.weight})!`);
                dino.fact.push(`${dino.species}\'s can still be dangerous even if you are taller by ${human.height - dino.height} inches!`);
            } else if (dino.diet = 'herbavor') {
                dino.fact.push(`${dino.diet}\'s can still be dangerous. Run!`);
            }
        });
    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareDiet = function () {
        const dinoDiet = dinoMap.filter(function(item) {
            return item.species !== human.species;
        });

        dinoDiet.forEach(function(dino) {
            if (dino.diet == 'carnivor'){
                dino.fact.push(`${dino.species} probably ate other dinosaurs in the ${dino.when} era.`);
                const smallerDino = dinoMap.filter(function(item) {
                    return item.weight < dino.weight && item.when == dino.when;
                });
                smallerDino.forEach(function(data) {
                    if (dino.species == 'Elasmosaurus') {
                        dino.fact.push(`${dino.species} probably only ate other marine dinosaurs and floating land/air dinosaurs.`);
                        dino.fact.push(`If Tyrannosaurus Rex could swim, he would have gone after ${dino.species}`);
                    } else if (dino.species == 'Tyrannosaurus Rex'){
                        dino.fact.push(`The ${dino.species} ate whatever he wanted. Weight size did not matter.`);
                    } else {
                        dino.fact.push(`${data.species} where prey to ${dino.species}`);
                    }
                    
                });
                dino.fact.push(`${dino.species} eats meat like you!`);
            } else if(dino.diet == 'herbavor' && dino.weight > 1000) {
                dino.fact.push(`The ${dino.species} would have to eat a lot of plants!`);

            }
            
        });
    }

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareLocation = function () {
        const dinoLocation = dinoMap.filter(function(item) {
            return (item.where === human.where || item.where.includes(human.where)) && item.species !== human.species;
        });

        dinoLocation.forEach(function(dino) {
            dino.fact.push(`${dino.species} once lived where you live now in the ${dino.when} era!`);
        });
    }

   


    // Generate Tiles for each Dino in Array
    const tiles = function() {
        let randomFact = '';
        dinoMap.forEach(function(dino) {  
            let newTile = document.createElement('div'); 
            newTile.setAttribute('id', `${dino.species}`); 
            newTile.setAttribute('class', 'grid-item');    

            if (dino.species != human.species){
                // Get random fact from array
                randomFact = dino.fact[Math.floor(Math.random()*dino.fact.length)];
            }
            if (human.species != dino.species && dino.species.toLowerCase() !== 'pigeon') {
                newTile.innerHTML = `
                    <h2>${dino.species}</h2>
                    <img src="images/${dino.species.toLowerCase()}.png">
                    <p><b>Did you know?</b><br/>${randomFact}</p>
                `;
            } else if(dino.species.toLowerCase() == "pigeon"){
                newTile.innerHTML = `
                    <h2>${dino.species}</h2>
                    <img src="images/${dino.species.toLowerCase()}.png">
                    <p><b>Did you know?</b><br/>All birds are considered dinosaurs</p>
                `;
            } else {
                newTile.innerHTML = `
                    <h2>${dino.species}</h2>
                    <img src="images/human.png">
                `;
            }
                        
            // Add tiles to DOM
            document.querySelector('#grid').appendChild(newTile);
        });
    }
      
    // Remove form from screen
    function removeForm () {
        document.querySelector("#dino-compare").innerHTML = '';
    } 



