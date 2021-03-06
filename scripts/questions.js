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
    if (Math.abs(strongAgree) > Math.abs(strongDisagree)) {
        let val = max_scores.get(type);
        max_scores.set(type, val + Math.abs(strongAgree))
    } else {
        let val = max_scores.get(type);
        max_scores.set(type, val + Math.abs(strongDisagree))
    }
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
    return makePointObj(type, 8 * mult, 6 * mult, -6 * mult, -8 * mult)
}

var makeMinutePoint = function (type, negate) {
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
            makeTenet("political-traditionalism", true)
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
        "I love my country despite all else.",
        [
            makePointObj("global-policy", 8, 4, 0, -2)
        ]
    ),
    makeQuestion(
        "I stand by the principles of my country.",
        [
            makeMajorPoint("global-policy", false),
            makeMajorPoint("political-traditionalism", false)
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
        "Provincial/State laws should have precedence over national laws.",
        [
            makeMajorPoint("power-struct", true),
            makePointObj("political-traditionalism", 4, 2, 0, 0)
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
            makeMinorPoint("economic", true),
            makeMinorPoint("power-struct", false),
            makeMinorPoint("power-dist")
        ]
    ),
    makeQuestion(
        "Subdivisions of nations should have their own militaries.",
        [
            makeMajorPoint("power-dist", false),
            makePointObj("political-traditionalism", 4, 2, 0, 0)
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
        "Society was better many years ago than it is now.",
        [
            makeMajorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "Communism, if implemented correctly, would be the best form of economics.",
        [
            makeTenet("economic", true),
            makeMajorPoint("power-struct", false),
            makeMajorPoint("power-dist", true),
            makeTenet("ind-vs-coll", true)
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
            makeMajorPoint("ind-vs-coll", true),
            makeMinorPoint("power-dist", true)
        ]
    ),
    makeQuestion(
        "Capitalism is better than any existing alternative.",
        [
            makePointObj("economic", 12, 7, -7, -12),
            makeMajorPoint("ind-vs-coll", false),
            makeMinorPoint("power-struct", true),
            makeMajorPoint("political-traditionalism", false)
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
            makePointObj("war-stance", 2, 1, -4, -6),
            makeMinorPoint("global-policy", true)
        ]
    ),
    makeQuestion(
        "People who served in the military deserve preferential treatment.",
        [
            makeTenet("war-stance", true),
            makeMajorPoint("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "There should be mandatory military service.",
        [
            makeTenet("war-stance", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "Diplomatic options should always be tried before war is even considered.",
        [
            makeTenet("war-stance", false)
        ]
    ),
    makeQuestion(
        "Even when protesting an authoritarian government, violence is not acceptable.",
        [
            makeMinutePoint("war-stance", false),
            makeMajorPoint("free-vs-sec", true)
        ]
    ),
    makeQuestion(
        "We have no right to militarily intervene in other nations.",
        [
            makeMajorPoint("war-stance", false)
        ]
    ),
    makeQuestion(
        "Those who disagree with the government should be removed from the country.",
        [
            makePointObj("free-vs-sec", -16, -12, 12, 16),
            makeTenet("power-struct", false)
        ]
    ),
    makeQuestion(
        "Those who say things against the government deserve to be imprisoned.",
        [
            makePointObj("free-vs-sec", -8, -6, 6, 8),
            makeTenet("power-struct", false),
            makeMajorPoint("power-dist", true)
        ]
    ),
    makeQuestion(
        "The death penalty should be used for all crimes.",
        [
            makePointObj("free-vs-sec", -8, -6, 6, 8),
            makeTenet("power-struct", false),
            makeMajorPoint("war-stance", true)
        ]
    ),
    makeQuestion(
        "Laws are important to ensure civilized society.",
        [
            makePointObj("free-vs-sec", 0, 0, 5, 10),
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
        "All people should get the same rewards regardless of their work.",
        [
            makeTenet("economic", true),
            makeMajorPoint("ind-vs-coll", true),
            makeTenet("political-traditionalism", true)
        ]
    ),
    makeQuestion(
        "The rich do not pay their fair share.",
        [
            makeTenet("economic", true),
            makeMajorPoint("ind-vs-coll", true),
            makeTenet("political-traditionalism", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "Welfare is a necessary institution in a society.",
        [
            makeMajorPoint("political-traditionalism", true),
            makeMajorPoint("economic", true),
            makeMinorPoint("power-dist", true)
        ]
    ),
    makeQuestion(
        "Everyone has the rights to universal healthcare, affordable housing, and a stable job.",
        [
            makeMajorPoint("economic", true),
            makeMajorPoint("political-traditionalism", true),
            makeMajorPoint("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "Documents like the Constitution (or other founding documents) are \"Living Documents,\" meaning they are interpreted based on the context of current day.",
        [
            makeTenet("political-traditionalism", true),
        ]
    ),
    makeQuestion(
        "All firearms should be banned.",
        [
            makeMajorPoint("free-vs-sec", true),
            makeTenet("power-struct", false),
            makeTenet("political-traditionalism", true),
            makeMajorPoint("war-stance", false),
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
        "Local governments handle most situations better than a national government",
        [
            makeMajorPoint("power-dist", false),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "The United Nations should have a military to enforce its decisions.",
        [
            makeMajorPoint("global-policy", false),
            makeMinorPoint("political-traditionalism", true),
            makeMinutePoint("war-stance", true)
        ]
    ),
    makeQuestion(
        "We are first and foremost citizens of Earth.",
        [
            makeMajorPoint("global-policy", false),
            makeMajorPoint("ind-vs-coll", true)
        ]
    ),
    makeQuestion(
        "Protectionism is always necessary to protect a nation's economy.",
        [
            makeMajorPoint("global-policy", true),
            makeMajorPoint("economic", true)
        ]
    ),
    makeQuestion(
        "My nation is closer to my views than most nations in the world.",
        [
            makeMajorPoint("global-policy", true),
        ]
    ),
    makeQuestion(
        "Governments should be empowered to make decisions as a substitute for its citizens to ensure equity across the nation regardless of race gender, wealth, status, etc.",
        [
            makePointObj("free-vs-sec", -12, -8, 8, 12),
            makePointObj("power-struct", 12, 8, -4, -6),
        ]
    ),
    makeQuestion(
        "The government should control the whole economy to prevent the exploitation of the masses.",
        [
            makePointObj("economic", -12, -8, 2, 4),
            makePointObj("ind-vs-coll", -10, -6, 6, 10),
            makeMajorPoint("power-dist", true)
        ]
    ),
    makeQuestion(
        "Representatives represent the people's interests.",
        [
            makeMajorPoint("power-struct", true),
            makeMinorPoint("power-dist", false)
        ]
    ),
    makeQuestion(
        "The majority opinion should always be followed.",
        [
            makeTenet("ind-vs-coll", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "International trade is generally beneficial.",
        [
            makeMinorPoint("global-policy", false),
            makeMajorPoint("economic", false)
        ]
    ),
    makeQuestion(
        "The government should stay out of the economy.",
        [
            makeTenet("economic", false),
            makeMajorPoint("power-struct", true)
        ]
    ),
    makeQuestion(
        "Surveillance has gone too far.",
        [
            makeMajorPoint("free-vs-sec", false),
            makeMinorPoint("power-struct", true),
            makeMinorPoint("power-dist", false)
        ]
    ),
    makeQuestion(
        "People have the right to leave their wealth to their descendents.",
        [
            makeMajorPoint("economic", false),
            makeMinorPoint("power-struct", true),
            makeMinorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "States/Provinces should have their own militaries",
        [
            makeMajorPoint("power-dist", false),
            makeMajorPoint("power-struct", true),
            makePointObj("political-traditionalism", 4, 2, 0, 0)
        ]
    ),
    makeQuestion(
        "Vaccines should be required for all people in order to eliminate harmful diseases",
        [
            makeMajorPoint("free-vs-sec", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "Everyone should be implanted with microchips to help prevent crime or catch criminals",
        [
            makeTenet("free-vs-sec", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "We should nuke our enemies",
        [
            makePointObj("war-stance", 16, 12, 0, -1)
        ]
    ),
    makeQuestion(
        "It is better to maintain a balanced budget than to ensure welfare for all citizens.",
        [
            makeMajorPoint("economic", false)
        ]
    ),
    makeQuestion(
        "It is important to maintain our national sovereignty.",
        [
            makeMajorPoint("global-policy", true)
        ]
    ),
    makeQuestion(
        "The workers should own the factories they work in.",
        [
            makeMajorPoint("ind-vs-coll", true),
            makeMajorPoint("economic", true)
        ]
    ),
    makeQuestion(
        "Quality education is a right of all people.",
        [
            makeMajorPoint("economic", true),
            makeMajorPoint("political-traditionalism", true)
        ]
    ),
    makeQuestion(
        "Military action by our nation is often necessary to protect it.",
        [
            makeMajorPoint("war-stance", true),
            makeMinorPoint("global-policy", true)
        ]
    ),
    makeQuestion(
        "The only time a nation can prosper is in peace time.",
        [
            makeTenet("war-stance", false)
        ]
    ),
    makeQuestion(
        "States/Provinces have the right to secede from their parent country.",
        [
            makeTenet("power-dist", false),
            makePointObj("political-traditionalism", 8, 4, 0, 0)
        ]
    ),
    makeQuestion(
        "All billionaires got their wealth through exploitation.",
        [
            makeMajorPoint("economic", true),
            makeMajorPoint("political-traditionalism", true)
        ]
    ),
    makeQuestion(
        "Organizations like the CDC should be able to override government policy to aid in medical emergencies.",
        [
            makeMajorPoint("free-vs-sec", true),
            makeMajorPoint("economic", true),
            makeMajorPoint("power-struct", false),
            makeMajorPoint("global-policy", false),
            makeMinorPoint("power-dist", true),
            makeTenet("political-traditionalism", true)
        ]
    ),
    makeQuestion(
        "Private charities often provide better assistance to the poor and vulnerable than the government does.",
        [
            makeMajorPoint("economic", false),
            makeMinorPoint("power-dist", true),
            makeMajorPoint("political-traditionalism", false)
        ]
    ),
    makeQuestion(
        "Governments should break up monopolies",
        [
            makeMajorPoint("economic", false)
        ]
    ),
    makeQuestion(
        "Controlling inflation is more important than controlling unemployment.",
        [
            makeMajorPoint("economic", false),
            makeMinorPoint("ind-vs-coll", false)
        ]
    ),
    makeQuestion(
        "It's a sad reflection on our society that something as basic as drinking water is now a bottled, branded consumer product.",
        [
            makeMajorPoint("economic", true)
        ]
    ),
    makeQuestion(
        "The only social responsibility of a company should be to deliver a profit to its shareholders.",
        [
            makeMajorPoint("economic", false)
        ]
    ),
    makeQuestion(
        "A significant advantage of a one-party state is that it avoids all the arguments that delay progress in a democratic political system.",
        [
            makeTenet("power-dist", true),
            makeMajorPoint("power-struct", false),
            makePointObj("free-vs-sec", -2, -1, 0, 0)
        ]        
    ),
    makeQuestion(
        "Everything that can be left to the free market should be.",
        [
            makeMajorPoint("economic", true),
            makeMinorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "Government regulations rarely completely solve the problem they intended to fix.",
        [
            makeMinorPoint("economic", true),
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "People should be able to volunteer for experimental treatments when they have no treatment and will die if they do not",
        [
            makeMajorPoint("free-vs-sec", true),
            makeMinutePoint("economic", false)
        ]
    ),
    makeQuestion(
        "My country should not have elections or votes",
        [
            makeMajorPoint("power-dist", true),
            makeMajorPoint("power-struct", false),
            makeMinutePoint("free-vs-sec", true)
        ]
    ),
    makeQuestion(
        "The government has too much power",
        [
            makeMajorPoint("power-struct", false)
        ]
    ),
    makeQuestion(
        "People who spread misinformation should be punished",
        [
            makeMajorPoint("power-struct", false),
            makeMajorPoint("free-vs-sec", true)
        ]
    ),
    makeQuestion(
        "For any economic problem, there is a regulation that can fix it",
        [
            makeMajorPoint("economic", true),
            makeMajorPoint("power-struct", false)
        ]
    )//,
    // makeQuestion(
        
    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // ),
    // makeQuestion(

    // )
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

