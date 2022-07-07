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
    value = Math.round(value/3);
    if (value < 0) {
        value = 0;
    }
    if (value > 100) {
        value = 100;
    }
    outerel = document.getElementById(name);
    innerel = outerel.getElementsByClassName("text-wrapper")[0];
    outerel.style.width = (value + "%");
    innerel.innerHTML = (value + "%");
    if (innerel.offsetWidth + 20 > outerel.offsetWidth) {
        innerel.style.visibility = "hidden";
    }
}

let leftArray = ["Market", "Authoritarian", "Individualist", "Conservatism", "Federalism", "Freedom", "Globalist", "Pacifist"]
let rightArray = ["Equality", "Libertarian", "Collectivist", "Liberalism", "Statism", "Security", "Sovereigntist", "Militarist"]

function setLabel(val, axis) {
    if (val >= 270) {
        return "Fanatic " + leftArray[axis]
    }
    else if (val >= 240) {
        return "Extreme " + leftArray[axis]
    }
    else if (val >= 210) {
        return leftArray[axis]
    }
    else if (val >= 180) {
        return "Moderate " + leftArray[axis]
    }
    else if (val > 120) {
        return "Neutral"
    }
    else if (val > 90) {
        return "Moderate " + rightArray[axis]
    }
    else if (val > 60) {
        return rightArray[axis]
    }
    else if (val > 30) {
        return "Extreme " + rightArray[axis]
    }
    else {
        return "Fanatic " + rightArray[axis]
    }
}

function setLabelGlobalPolicy(val) {
    if (val >= 270) {
        return "Fanatic Globalist"
    }
    else if (val >= 240) {
        return "Extreme Globalist"
    }
    else if (val >= 210) {
        return "Globalist"
    }
    else if (val >= 180) {
        return "Moderate Globalist"
    }
    else if (val > 120) {
        return "Non-Aligned"
    }
    else if (val > 90) {
        return "Moderate Patriot"
    }
    else if (val > 60) {
        "Patriot"
    }
    else if (val > 30) {
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

econOpposite = 300 - economic;
powerDistOpposite = 300 - powerDist;
freeVsSecOpposite = 300 - freeVsSec;
warStanceOpposite = 300 - warStance;
indVsCollOpposite = 300 - indVsColl;
globalPolicyOpposite = 300 - globalPolicy;
politicalTraditionalismOpposite = 300 - politicalTraditionalism;
powerStructOpposite = 300 - powerStruct;

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
    dist += Math.pow(Math.abs(ideologies[i].stats.econ - Math.round(econOpposite/3)), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.govt - Math.round(powerStructOpposite/3)), 2) 
    dist += Math.pow(Math.abs(ideologies[i].stats.free - Math.round(freeVsSecOpposite/3)), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.dipl - Math.round(globalPolicy/3)), 1.73856063)
    dist += Math.pow(Math.abs(ideologies[i].stats.scty - Math.round(politicalTraditionalismOpposite/3)), 1.73856063)
    dist += Math.pow(Math.abs(ideologies[i].stats.indi - Math.round(indVsCollOpposite/3)), 1.73856063)
    if (dist < ideodist) {
        ideology = ideologies[i].name
        ideodist = dist
    }
}

document.getElementById("ideology-label").innerHTML = ideology
document.getElementsByTagName("title")[0].innerHTML = "Your Results - " + ideology