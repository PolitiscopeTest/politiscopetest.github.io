function getObject(variable) {
    variable = variable.replaceAll(/[{}]/g, "")
    obj = {};
    const keypairs = variable.split(",");
    keypairs.forEach(keypair => {
        const temp = keypair.replaceAll("%20", "");
        const key = temp.split(":")[0];
        const value = temp.split(":")[1];
        obj[key] = value;
    });
    return obj;
}

function parseURLVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (pair[0] == variable) { 
            return getObject(pair[1]) 
        }
    }
    return ({ score: NaN, max: 300 });
}

function setBarValue(name, value, max) {
    value = Math.round(value / (max / 100));
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

let leftArray = ["Capitalist", "Authoritarian", "Individualist", "Conservative", "Federalist", "Freedom", "Globalist", "Pacifist"]
let rightArray = ["Socialist", "Libertarian", "Collectivist", "Liberal", "Statist", "Security", "Sovereigntist", "Militarist"]

function setLabel(val, axis, max) {
    if (val == max) {
        return "Ultra " + leftArray[axis]
    }
    else if (val >= (max / 100) * 90) {
        return "Fanatic " + leftArray[axis]
    }
    else if (val >= (max / 100) * 80) {
        return "Extreme " + leftArray[axis]
    }
    else if (val >= (max / 100) * 70) {
        return leftArray[axis]
    }
    else if (val >= (max / 100) * 60) {
        return "Moderate " + leftArray[axis]
    }
    else if (val > (max / 100) * 40) {
        return "Neutral"
    }
    else if (val > (max / 100) * 30) {
        return "Moderate " + rightArray[axis]
    }
    else if (val > (max / 100) * 20) {
        return rightArray[axis]
    }
    else if (val > (max / 100) * 10) {
        return "Extreme " + rightArray[axis]
    }
    else if (val > 0) {
        return "Fanatic " + rightArray[axis]
    }
    else {
        return "Ultra " + rightArray[axis]
    }
}

function setLabelGlobalPolicy(val, max) {
    if (val == max) {
        return "Ultra Globalist"
    }
    else if (val >= (max / 100) * 90) {
        return "Fanatic Globalist"
    }
    else if (val >= (max / 100) * 80) {
        return "Extreme Globalist"
    }
    else if (val >= (max / 100) * 70) {
        return "Globalist"
    }
    else if (val >= (max / 100) * 60) {
        return "Moderate Globalist"
    }
    else if (val > (max / 100) * 40) {
        return "Non-Aligned"
    }
    else if (val > (max / 100) * 30) {
        return "Moderate Patriot"
    }
    else if (val > (max / 100) * 20) {
        return "Patriot"
    }
    else if (val > (max / 100) * 10) {
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

econOpposite = economic.max - economic.score;
powerDistOpposite = powerDist.max - powerDist.score;
freeVsSecOpposite = freeVsSec.max - freeVsSec.score;
warStanceOpposite = warStance.max - warStance.score;
indVsCollOpposite = indVsColl.max - indVsColl.score;
globalPolicyOpposite = globalPolicy.max - globalPolicy.score;
politicalTraditionalismOpposite = politicalTraditionalism.max - politicalTraditionalism.score;
powerStructOpposite = powerStruct.max - powerStruct.score;

setBarValue("market", economic.score, economic.max);
setBarValue("equality", econOpposite, economic.max);

setBarValue("authoritarian", powerStruct.score, powerStruct.max);
setBarValue("libertarian", powerStructOpposite, powerStruct.max);

setBarValue("individualist", indVsColl.score, indVsColl.max);
setBarValue("collectivist", indVsCollOpposite, indVsColl.max);

setBarValue("conservatism", politicalTraditionalism.score, politicalTraditionalism.max);
setBarValue("liberalism", politicalTraditionalismOpposite, politicalTraditionalism.max);

setBarValue("federalism", powerDist.score, powerDist.max);
setBarValue("statism", powerDistOpposite, powerDist.max);

setBarValue("freedom", freeVsSec.score, freeVsSec.max);
setBarValue("security", freeVsSecOpposite, freeVsSec.max);

setBarValue("globalist", globalPolicy.score, globalPolicy.max);
setBarValue("sovereigntist", globalPolicyOpposite, globalPolicy.max);

setBarValue("pacifist", warStance.score, warStance.max);
setBarValue("militarist", warStanceOpposite, warStance.max);

document.getElementById("a-label").innerHTML = setLabel(economic.score, 0, economic.max)
document.getElementById("b-label").innerHTML = setLabel(powerStruct.score, 1, powerStruct.max)
document.getElementById("c-label").innerHTML = setLabel(indVsColl.score, 2, indVsColl.max)
document.getElementById("d-label").innerHTML = setLabel(politicalTraditionalism.score, 3, politicalTraditionalism.max)
document.getElementById("e-label").innerHTML = setLabel(powerDist.score, 4, powerDist.max)
document.getElementById("f-label").innerHTML = setLabel(freeVsSec.score, 5, freeVsSec.max)
document.getElementById("g-label").innerHTML = setLabelGlobalPolicy(globalPolicy.score, globalPolicy.max)
document.getElementById("h-label").innerHTML = setLabel(warStance.score, 7, warStance.max)

ideology = ""
ideodist = Infinity
for (var i = 0; i < ideologies.length; i++) {
    dist = 0
    dist += Math.pow(Math.abs(ideologies[i].stats.econ - Math.round(econOpposite / (economic.max / 100))), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.govt - Math.round(powerStructOpposite / (powerStruct.max / 100))), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.free - Math.round(freeVsSecOpposite / (freeVsSec.max / 100))), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.indi - Math.round(indVsCollOpposite / (indVsColl.max / 100))), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.dipl - Math.round(globalPolicy.score / (globalPolicy.max / 100))), 1.73856063)
    dist += Math.pow(Math.abs(ideologies[i].stats.scty - Math.round(politicalTraditionalismOpposite / (politicalTraditionalism.max / 100))), 1.73856063)
    if (dist < ideodist) {
        ideology = ideologies[i].name
        ideodist = dist
    }
}

document.getElementById("ideology-label").innerHTML = ideology
document.getElementsByTagName("title")[0].innerHTML = "Your Results - " + ideology