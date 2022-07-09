var scores = new Map();
scores.set("economic", 0); //Market vs. equality (Positive means more market driven)
scores.set("power-dist", 0); //Federalism vs Statism (Positive means more federalist)
scores.set("free-vs-sec", 0); //Freedom vs Security (Positive means more freedom)
scores.set("war-stance", 0) //Pacifist vs Militarist (Positive means more pacifist)
scores.set("ind-vs-coll", 0) //Individualism vs Collectivism (Positive means more individualist)
scores.set("global-policy", 0) //Globalism vs Sovereigntism (Positive means more globalist)
scores.set("political-traditionalism", 0) //Conservatism vs Liberalism (Positive means more conservative)
scores.set("power-struct", 0) //Authoritarian vs Libertarian (Positive means more authoritarian)

var max_scores = new Map();
max_scores.set("economic", 0); //Market vs. equality (Positive means more market driven)
max_scores.set("power-dist", 0); //Federalism vs Statism (Positive means more federalist)
max_scores.set("free-vs-sec", 0); //Freedom vs Security (Positive means more freedom)
max_scores.set("war-stance", 0) //Pacifist vs Militarist (Positive means more pacifist)
max_scores.set("ind-vs-coll", 0) //Individualism vs Collectivism (Positive means more individualist)
max_scores.set("global-policy", 0) //Globalism vs Sovereigntism (Positive means more globalist)
max_scores.set("political-traditionalism", 0) //Conservatism vs Liberalism (Positive means more conservative)
max_scores.set("power-struct", 0) //Authoritarian vs Libertarian (Positive means more authoritarian)

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
    header.innerHTML = "Question " + (1 + quest_num).toString() + " of " + questions.length.toString();
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
        header.innerHTML = "Question " + (1 + quest_num).toString() + " of " + questions.length.toString();
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
    header.innerHTML = "Question " + (1 + quest_num).toString() + " of " + questions.length.toString();
    questBody = document.getElementById("quest-body");
    questBody.innerHTML = current_question.question;

    if (quest_num <= 0) {
        document.getElementById("back").style.display = "none"
    }
}

function calc_score(score, max) {
    return max + score;
}

var results = function () {
    location.href =
        `results.html` +
        `?economic={score:${calc_score(scores.get("economic"), max_scores.get("economic"))},max:${max_scores.get("economic") * 2}}` +
        `&power-dist={score:${calc_score(scores.get("power-dist"), max_scores.get("power-dist"))}, max:${max_scores.get("power-dist") * 2}}` +
        `&free-vs-sec={score:${calc_score(scores.get("free-vs-sec"), max_scores.get("free-vs-sec"))}, max:${max_scores.get("free-vs-sec") * 2}}` +
        `&war-stance={score:${calc_score(scores.get("war-stance"), max_scores.get("war-stance"))}, max:${max_scores.get("war-stance") * 2}}` +
        `&ind-vs-coll={score:${calc_score(scores.get("ind-vs-coll"), max_scores.get("ind-vs-coll"))}, max:${max_scores.get("ind-vs-coll") * 2}}` +
        `&global-policy={score:${calc_score(scores.get("global-policy"), max_scores.get("global-policy"))}, max:${max_scores.get("global-policy") * 2}}` +
        `&political-traditionalism={score:${calc_score(scores.get("political-traditionalism"), max_scores.get("political-traditionalism"))}, max:${max_scores.get("political-traditionalism") * 2}}` +
        `&power-struct={score:${calc_score(scores.get("power-struct"), max_scores.get("power-struct"))}, max:${max_scores.get("power-struct") * 2}}`
}