var makeQuestion = function (question, pointObjs) {
    return {
        question: question,
        pointObjs: pointObjs,
        award: function (choice) {
            this.pointObjs.forEach(pointObj => {
                pointObj.addPoints(choice)
            });
        },
        remove: function (choice) {
            this.pointObjs.forEach(pointObj => {
                pointObj.removePoints(choice)
            });
        }
    }
}

var makePointObj = function (type, strongAgree, agree, disagree, strongDisagree) {
    let choices = new Map();
    choices.set("strongAgree", strongAgree);
    choices.set("agree", agree);
    choices.set("disagree", disagree);
    choices.set("strongDisagree", strongDisagree);
    choices.set("neutral", 0)
    return {
        category: type,
        points: choices,
        addPoints: function (choice) {
            let val = scores.get(type);
            scores.set(this.category, val + this.points.get(choice));
        },
        removePoints: function (choice) {
            let val = scores.get(type);
            scores.set(this.category, val - this.points.get(choice));
        }
    }
}

var makeMajorPoint = function (type, negate) {
    let mult = 1;
    if (negate) {
        mult = -1;
    }
    return makePointObj(type, 4 * mult, 2 * mult, -2 * mult, -4 * mult);
}

var makeMinorPoint = function (type, negate) {
    let mult = 1;
    if (negate) {
        mult = -1;
    }
    return makePointObj(type, 2 * mult, 1 * mult, -1 * mult, -2 * mult);
}

var makeTenet = function (type, negate) {
    let mult = 1;
    if (negate) {
        mult = -1;
    }
    return makePointObj(type, 6 * mult, 4 * mult, -6 * mult, -9 * mult)
}

var makeMinutePoint = function(type, negate) {
    let mult = 1;
    if (negate) {
        mult = -1;
    }
    return makePointObj(type, 1 * mult, 0 * mult, -0 * mult, -1 * mult)
}

var questions = [
    makeQuestion(
        "The freer the market, the freer the people.",
        [

            makeTenet("economic", false),
            makeMinorPoint("free-vs-sec", false)
        ]
    ),
    makeQuestion(
        "From each according to his ability, to each according to his needs.",
        [
            makeTenet("economic", true),
            makeTenet("ind-vs-coll", true),
            makeMajorPoint("political-traditionalism", true)
        ]
    ),
    makeQuestion(
        "Regulation is necessary to prevent corporations from destroying the environment.",
        [

            makeMajorPoint("economic", false),
            makeMinorPoint("power-struct", true)
        ]
    ),
    makeQuestion(
        "Alliances are important for protecting a nation.",
        [
            makeMajorPoint("global-policy", false)
        ]
    ),
    makeQuestion(
        "Organizations like the United Nations are important for keeping peace.",
        [
            makeMajorPoint("global-policy", false),
            makeMinorPoint("political-traditionalism", true)
        ]
    ),
    makeQuestion(
        "The government should own the means of production.",
        [
            makeMajorPoint("economic", true),
            makeTenet("ind-vs-coll", true),
            makeMajorPoint("power-struct", false),
            makeMinorPoint("power-dist", false)
        ]
    ),
    makeQuestion(
        "I love my coutry despite all else.",
        [
            makePointObj("global-policy", 8, 4, 0, -2)
        ]
    ),
    makeQuestion(
        "I stand by the principles of my country.",
        [
            makeMajorPoint("global-policy", false),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "A strong national government is necessary to ensure stability and prosperity of a nation.",
        [
            makeMajorPoint("power-dist", true),
            makeMinorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "Those who have nothing to hide should have nothing to worry from government surveillance.",
        [
            makeTenet("free-vs-sec", true),
            makeMajorPoint("power-struct", false),
            makeMinorPoint("power-dist", false)
        ]
    ),
    makeQuestion(
        "Provincial/State laws should have precedent over national laws.",
        [
            makeMajorPoint("centralization", true),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "The Internet should be banned.",
        [
            makeTenet("free-vs-sec", true),
            makeMinorPoint("economic", true),
            makeMajorPoint("centralization", false)
        ]
    ),
    makeQuestion(
        "A nation must obey its leadership without question.",
        [
            makeMinorPoint("global-policy", true),
            makeMajorPoint("centralization", false)
        ]
    ),
    makeQuestion(
        "The government should monitor all citizens to combat terrorism.",
        [
            makeTenet("free-vs-sec", true),
            makeMinorPoint("economy", true),
            makeMinorPoint("centralization", false),
            makeMinorPoint("power-dist")
        ]
    ),
    makeQuestion(
        "Subdivisions of nations should have their own militaries.",
        [
            makeMajorPoint("power-dist", false),
            makeMajorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "Firearm regulation should be implemented for the greater good of society.",
        [
            makeMajorPoint("free-vs-sec", true),
            makeMinorPoint("centralization", false),
            makeMajorPoint("political-traditionalism", true)
        ]
    ),
    makeQuestion(
        "A nation requires a strong military to remain independent", 
        [
            makeTenet("war-stance", false),
            makeMinorPoint("global-policy", true)
        ]
    ),
    makeQuestion(
        "International aid is a waste of money.",
        [
            makeMajorPoint("global-policy", true),
            makeMinutePoint("economic", false)
        ]
    ),
    makeQuestion(
        "There are many issues that it does not make sense to address at a local level.",
        [
            makeMajorPoint("power-dist", false),
            makeMinorPoint("power-struct", true)
        ]
    ),
    makeQuestion(
        "People should have the right to leave their wealth to their descendents.",
        [
            makeMajorPoint("economic", false),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "Society was better many years ago than it is now.",
        [
            makeMinorPoint("political-traditionalism", false)
        ]
    ), 
    makeQuestion(
        "Communism, if implemented correctly, would the best form of economics.",
        [
            makeTenet("economic", true),
            makeMajorPoint("power-struct", false),
            makeMajorPoint("power-dist", true),
            makeMajorPoint("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "Certain groups of people deserve more rights.",
        [
            makeTenet("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "War is beneficial for the economy.",
        [
            makeTenet("war-stance", true),
            makeMajorPoint("power-struct", false)
        ]
    )
]

var finalQuestions = null;
function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

var init = function () {
    finalQuestions = questions;
    finalQuestions = shuffleArray(finalQuestions);
}

