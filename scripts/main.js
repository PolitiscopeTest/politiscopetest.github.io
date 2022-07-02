var scores = new Map();
scores.set("economic", 0); //Market vs. equality (Positive means more market driven)
scores.set("power-dist", 0); //Federalism vs Statism (Positive means more federalist)
scores.set("free-vs-sec", 0); //Freedom vs Security (Positive means more freedom)
scores.set("war-stance", 0) //Pacifist vs Militarist (Positive means more pacifist)
scores.set("ind-vs-coll", 0) //Individualism vs Collectivism (Positive means more individualist)
scores.set("global-policy", 0) //Globalism vs Sovereigntism (Positive means more globalist)
scores.set("political-traditionalism", 0) //Conservatism vs Liberalism (Positive means more conservative)
scores.set("power-struct", 0) //Authoritarian vs Libertarian (Positive means more authoritarian)

var current_question = null
var quest_num = 0;
answers = []

var makeChoice = function (choice) {
    current_question.award(choice);
    answers[quest_num] = choice;
    nextQuestion();
}

var questionsInit = function () {
    current_question = finalQuestions[quest_num];
    header = document.getElementById("quest-num");
    header.innerHTML = "Question " + (1 + quest_num).toString() + " of 100";
    questBody = document.getElementById("quest-body");
    questBody.innerHTML = current_question.question;
}

var nextQuestion = function () {
    quest_num += 1;
    if (quest_num >= questions.length) { 
        results()
    }
    else {
        current_question = finalQuestions[quest_num];
        header = document.getElementById("quest-num");
        header.innerHTML = "Question " + (1 + quest_num).toString() + " of 100";
        questBody = document.getElementById("quest-body");
        questBody.innerHTML = current_question.question;
        document.getElementById("back").style.display = "block"
    }
}

var prevQuestion = function () {
    quest_num -= 1;
    current_question = finalQuestions[quest_num];
    current_question.remove(answers[quest_num]);
    header = document.getElementById("quest-num");
    header.innerHTML = "Question " + (1 + quest_num).toString() + " of 100";
    questBody = document.getElementById("quest-body");
    questBody.innerHTML = current_question.question;

    if (quest_num <= 0) {
        document.getElementById("back").style.display = "none"
    }
}

function calc_score(score) {
    return 50 + score;
}

var results = function () {
    location.href =
        `results.html` +
        `?economic=${calc_score(scores.get("economic"))}` +
        `&power-dist=${calc_score(scores.get("power-dist"))}` +
        `&free-vs-sec=${calc_score(scores.get("free-vs-sec"))}` +
        `&war-stance=${calc_score(scores.get("war-stance"))}` +
        `&ind-vs-coll=${calc_score(scores.get("ind-vs-coll"))}` +
        `&global-policy=${calc_score(scores.get("global-policy"))}` +
        `&political-traditionalism=${calc_score(scores.get("political-traditionalism"))}` +
        `&power-struct=${calc_score(scores.get("power-struct"))}`
}