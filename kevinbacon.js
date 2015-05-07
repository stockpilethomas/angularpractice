function multiply() {
    return arguments[0] * arguments[1];
}

console.log(multiply(3, 4));

function getFilmsForActor(actor) {
    if (actor === 'kevinbacon') {
        return ['face-off'];
    } else if (actor === 'martha stewart') {
        return ['face-off', 'con-air'];
    } else if (actor === 'nicholas cage') {
        return ['con-air'];
    }
}

function getActorsForFilm(film) {
    if (film === 'face-off') {
        return ['martha stewart', 'kevinbacon'];
    } else if (film == 'con-air') {
        return ['martha stewart', 'nicholas cage'];
    }
}

// Doesn't appropriately handle cycles, which will result in infinite processing if KBD is infinite
function getKevinBaconDistance(actorOne, actorTwo) {
    var currentLevelQueue = [];

    var films = getFilmsForActor(actorOne);
    if (!films) {
        console.log("Unable to retrieve films for " + actorOne + ".");
        return -1;
    }

    var i;
    for (i = 0; i < films.length; i++) {
        currentLevelQueue.push({ film : films[i], depth : 0 });
    }

    while (currentLevelQueue.length != 0) {
        var currPair = currentLevelQueue.shift();
        var currFilm = currPair.film;
        var currDepth = currPair.depth;
        var currActors = getActorsForFilm(currFilm);
        if (!currActors) {
            console.log("No actors found for film " + currFilm + ".");
            continue;
        }

        for (i = 0; i < currActors.length; i++) {
            if (actorTwo === currActors[i]) {
                return currDepth;
            } else {
                var newFilms = getFilmsForActor(currActors[i]);
                var k;
                for (k = 0; k < newFilms.length; k++) {
                    currentLevelQueue.push({ film : newFilms[k], depth : currDepth + 1});
                }
            }
        }
    }
}

console.log(getKevinBaconDistance('martha stewart', 'kevinbacon'));
console.log(getKevinBaconDistance('nicholas cage', 'kevinbacon'));