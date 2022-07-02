function parseURLVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (pair[0] == variable) { return pair[1] }
    }
    return (NaN);
}

function setBarValue(name, value) {
    outerel = document.getElementById(name);
    innerel = outerel.getElementsByClassName("text-wrapper")[0];
    outerel.style.width = (value + "%")
    innerel.innerHTML = (value + "%")
    if (innerel.offsetWidth + 20 > outerel.offsetWidth) {
        innerel.style.visibility = "hidden"
    }
}

let leftArray = ["Market", "Authoritarian", "Individualist", "Conservatism", "Federalism", "Freedom", "Globalist", "Pacifist"]
let rightArray = ["Equality", "Libertarian", "Collectivist", "Liberalism", "Statism", "Security", "Sovereigntist", "Militarist"]

function setLabel(val, axis) {
    if (val >= 90) {
        return "Fanatic " + leftArray[axis]
    }
    else if (val >= 80) {
        return "Extreme " + leftArray[axis]
    }
    else if (val >= 70) {
        return leftArray[axis]
    }
    else if (val >= 60) {
        return "Moderate " + leftArray[axis]
    }
    else if (val > 40) {
        return "Neutral"
    }
    else if (val > 30) {
        return "Moderate " + rightArray[axis]
    }
    else if (val > 20) {
        return rightArray[axis]
    }
    else if (val > 10) {
        return "Extreme " + rightArray[axis]
    }
    else {
        return "Fanatic " + rightArray[axis]
    }
}

function setLabelGlobalPolicy(val) {
    if (val >= 90) {
        return "Fanatic Globalist"
    }
    else if (val >= 80) {
        return "Extreme Globalist"
    }
    else if (val >= 70) {
        return "Globalist"
    }
    else if (val >= 60) {
        return "Moderate Globalist"
    }
    else if (val > 40) {
        return "Non-Aligned"
    }
    else if (val > 30) {
        return "Moderate Patriot"
    }
    else if (val > 20) {
        "Patriot"
    }
    else if (val > 10) {
        return "Nationalist"
    }
    else {
        return "Jingoist"
    }
}



economic = parseURLVariable("economic");
powerDist = parseURLVariable("power-dist");
freeVsSec = parseURLVariable("free-vs-sec");
warStance = parseURLVariable("war-stance");
indVsColl = parseURLVariable("ind-vs-coll");
globalPolicy = parseURLVariable("global-policy");
politicalTraditionalism = parseURLVariable("political-traditionalism");
powerStruct = parseURLVariable("power-struct");

econOpposite = 100 - economic;
powerDistOpposite = 100 - powerDist;
freeVsSecOpposite = 100 - freeVsSec;
warStanceOpposite = 100 - warStance;
indVsCollOpposite = 100 - indVsColl;
globalPolicyOpposite = 100 - globalPolicy;
politicalTraditionalismOpposite = 100 - politicalTraditionalism;
powerStructOpposite = 100 - powerStruct;

setBarValue("market", economic);
setBarValue("equality", econOpposite);

setBarValue("authoritarian", powerStruct);
setBarValue("libertarian", powerStructOpposite);

setBarValue("individualist", indVsColl);
setBarValue("collectivist", indVsCollOpposite);

setBarValue("conservatism", politicalTraditionalism);
setBarValue("liberalism", politicalTraditionalismOpposite);

setBarValue("federalism", powerDist);
setBarValue("statism", powerDistOpposite);

setBarValue("freedom", freeVsSec);
setBarValue("security", freeVsSecOpposite);

setBarValue("globalist", globalPolicy);
setBarValue("sovereigntist", globalPolicyOpposite);

setBarValue("pacifist", warStance);
setBarValue("militarist", warStanceOpposite);

document.getElementById("a-label").innerHTML = setLabel(economic, 0)
document.getElementById("b-label").innerHTML = setLabel(powerStruct, 1)
document.getElementById("c-label").innerHTML = setLabel(indVsColl, 2)
document.getElementById("d-label").innerHTML = setLabel(politicalTraditionalism, 3)
document.getElementById("e-label").innerHTML = setLabel(powerDist, 4)
document.getElementById("f-label").innerHTML = setLabel(freeVsSec, 5)
document.getElementById("g-label").innerHTML = setLabelGlobalPolicy(globalPolicy, 6)
document.getElementById("h-label").innerHTML = setLabel(warStance, 7)

ideology = ""
ideodist = Infinity
for (var i = 0; i < ideologies.length; i++) {
    dist = 0
    dist += Math.pow(Math.abs(ideologies[i].stats.econ - econOpposite), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.govt - powerStructOpposite), 2) 
    dist += Math.pow(Math.abs(ideologies[i].stats.dipl - globalPolicy), 1.73856063)
    dist += Math.pow(Math.abs(ideologies[i].stats.scty - politicalTraditionalism), 1.73856063)
    dist += Math.pow(Math.abs(ideologies[i].stats.free - freeVsSecOpposite), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.indi - indVsColl), 1.5)
    if (dist < ideodist) {
        ideology = ideologies[i].name
        ideodist = dist
    }
}

document.getElementById("ideology-label").innerHTML = ideology