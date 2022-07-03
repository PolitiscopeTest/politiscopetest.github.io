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
    return makePointObj(type, 6 * mult, 4 * mult, -4 * mult, -6 * mult)
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
            makeMajorPoint("power-struct", true),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "The Internet should be banned.",
        [
            makeTenet("free-vs-sec", true),
            makeMinorPoint("economic", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "A nation must obey its leadership without question.",
        [
            makeMinorPoint("global-policy", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "The government should monitor all citizens to combat terrorism.",
        [
            makeTenet("free-vs-sec", true),
            makeMinorPoint("economy", true),
            makeMinorPoint("power-struct", false),
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
            makeMinorPoint("power-struct", false),
            makeMajorPoint("political-traditionalism", true),
            makeMinorPoint("war-stance", false)
        ]
    ),
    makeQuestion(
        "A nation requires a strong military to remain independent.",
        [
            makeTenet("war-stance", true),
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
            makeMajorPoint("power-dist", true),
            makeMinorPoint("power-struct", false)
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
        "Communism, if implemented correctly, would be the best form of economics.",
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
    ),
    makeQuestion(
        "A united world government would be beneficial to mankind.",
        [
            makeTenet("global-policy", false),
            makeMinorPoint("ind-vs-coll", true),
            makeMinorPoint("power-dist", true)
        ]
    ),
    makeQuestion(
        "Capitalism is better than any existing alternative.",
        [
            makePointObj("economic", 12, 7, -7, -12),
            makeMajorPoint("ind-vs-coll", false),
            makeMinorPoint("power-struct", true),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "The national government doesn't represent the interests of its people.",
        [
            makeMajorPoint("power-dist", false)
        ]
    ),
    makeQuestion(
        "Only those who serve in the military should be allowed to make decisions for the country.",
        [
            makeTenet("war-stance", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "People who served in the military should be respected.",
        [
            makeMajorPoint("war-stance", true),
            makeMinorPoint("global-policy", true)
        ]
    ),
    makeQuestion(
        "People who served in the military deserve preferencial treatment.",
        [
            makeMajorPoint("war-stance", true),
            makeMajorPoint("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "There should be mandatory military service.",
        [
            makeMajorPoint("war-stance", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "Diplomatic options should always be tried before war is even considered.",
        [
            makeMajorPoint("war-stance", false)
        ]
    ),
    makeQuestion(
        "Even when protesting an authoritarian government, violence is not acceptable.",
        [
            makeMajorPoint("war-stance", false),
            makeMajorPoint("free-vs-sec", true)
        ]
    ),
    makeQuestion(
        "We have no right to militarily intervene in other nations.",
        [
            makeMajorPoint("war-stance", false),
            makeMajorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "Those who disagree with the government should be removed from the country.",
        [
            makePointObj("free-vs-sec", -16, -12, 2, 4),
            makeTenet("power-struct", false)
        ]
    ),
    makeQuestion(
        "Those who say things against the government deserve to be imprisoned.",
        [
            makePointObj("free-vs-sec", -8, -6, 2, 4),
            makeTenet("power-struct", false),
            makeMajorPoint("power-dist", true)
        ]
    ),
    makeQuestion(
        "The death penalty should be used for all felonies.",
        [
            makePointObj("free-vs-sec", -8, -6, 2, 4),
            makeTenet("power-struct", false),
            makeMajorPoint("war-stance", true)
        ]
    ),
    makeQuestion(
        "Laws are important to ensure civilized society.",
        [
            makePointObj("free-vs-sec", 4, 2, -1, -2),
            makeMinutePoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "No authority should be questioned.",
        [
            makeMajorPoint("power-struct", false),
            makeMajorPoint("free-vs-sec", true),
            makeMinorPoint("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "Whistleblowers should be strongly protected.",
        [
            makeMajorPoint("free-vs-sec", false),
        ]
    ),
    makeQuestion(
        "Equality of outcome is important.",
        [
            makeTenet("economic", true),
            makeMajorPoint("ind-vs-coll", true),
            makeMajorPoint("political-traditionalism", true)
        ]
    ),
    makeQuestion(
        "The rich do not pay their fair share.",
        [
            makeTenet("economic", true),
            makeMajorPoint("ind-vs-coll", true),
            makeMajorPoint("political-traditionalism", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "Universal Basic Income is necessary.",
        [
            makeMajorPoint("political-traditionalism", true),
            makeMajorPoint("economic", true),
            makePointObj("power-dist", -2, -1, 0, 0)
        ]
    ),
    makeQuestion(
        "Everyone has the rights to universal healthcare, offordable housing, and a stable job.",
        [
            makeMajorPoint("economic", true),
            makeMajorPoint("political-traditionalism", true),
            makeMajorPoint("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "Documents like the Constitution are \"Living Documents,\" meaning they can be interpreted based on the context of the situation.",
        [
            makeTenet("political-traditionalism", true),
        ]
    ),
    makeQuestion(
        "All firearms should be banned.",
        [
            makeMajorPoint("free-vs-sec", true),
            makeTenet("power-struct", false),
            makeMinorPoint("war-stance", false),
            makeMinorPoint("power-dist", false)
        ]
    ),
    makeQuestion(
        "Local governments should have more power than they currently do.",
        [
            makeTenet("power-dist", false)
        ]
    ),
    makeQuestion(
        "Many laws should depend more on the residents of a local area rather than the residents of the nation.",
        [
            makeMajorPoint("power-dist", false),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "Local governments can handle issues that the national government can't.",
        [
            makeMajorPoint("power-dist", false),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "The United Nations should have a military to enforce its resolutions.",
        [
            makeMajorPoint("global-policy", false),
            makeMinorPoint("political-traditionalism", false),
            makeMinutePoint("war-stance", true)
        ]
    ),
    makeQuestion(
        "We are not members of a nation, instead we are members of this planet.",
        [
            makeMajorPoint("global-policy", false),
            makeMinorPoint("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "Protectionism is always necessary to protect a nation's economy.",
        [
            makeMajorPoint("global-policy", true),
            makeMinorPoint("economic", true)
        ]
    ),
    makeQuestion(
        "My nation is closer to my views than most nations in the world.",
        [
            makeMajorPoint("global-policy", true),
        ]
    ),
    makeQuestion(
        "People should not be be free because they are unable to make the correct decisions for themselves.",
        [
            makePointObj("free-vs-sec", -100, -50, 2, 4),
            makePointObj("power-struct", 100, 50, -2, -4),
        ]
    ),
    makeQuestion(
        "The government should control the whole economy to prevent the exploitation of the masses.",
        [
            makePointObj("economy", -100, -50, 2, 4),
            makePointObj("ind-vs-coll", -20, -10, 2, 4),
            makeMajorPoint("power-dist", true)
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

