module.exports = { getGame, getHelp, getAns, atGroup, joinGroup, leaveGroup };


var groupMap = new Map();



// return random int between min and max (including min and max)
function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function getGame(min = 1, max = 13) {
    return Array.from(Array(4)).map(x=>randInt(min, max));
}


function getHelp() {

  return "\
app website: https://github.com/hangyu-feng/discord-24points\n\
-getRandomGame or -getR generate four 1-13 number for the 24 points\n\
-getGame or -getG generate four 1-13 number for the 24 points that must have answer\n\
-join <Group> add yourself to the <Group>\n\
-at <Group> at everyone in the <Group>\n\
-ans get the answer of the previous four number\n\
-root set the channel as root channel\n\
-tellRoot send the message in the root channel to tell everyone, can be done in private chat, but the user id would be recorded, abuse would be banned\n\
-networth <buyback cost> or -net <buyback cost> to calculate networth by buyback cost
-help or -h get the help"
}

function atGroup(groupName) {
  if(groupMap.has(groupName)){
    const groupSet = groupMap.get(groupName)
    return  Array.from(groupSet).join(" ");
  }
  else{
    return "no such group";
  }
}

function leaveGroup(groupName,auther) {
  if(groupMap.has(groupName)){
    let groupSet = groupMap.get(groupName);
    groupSet.delete(auther);
    groupMap.set(groupName,groupSet);
  }

  return groupName;
}

function joinGroup(groupName,auther) {
  if(!groupMap.has(groupName)){
    let groupSet = new Set();
    groupSet.add(auther)
    groupMap.set(groupName,groupSet);
  }
  else{
    let groupSet = groupMap.get(groupName);
    groupSet.add(auther);
    groupMap.set(groupName,groupSet);
  }
}

function getAns(prevNum) {
  let numbersStrArray = prevNum.map(x => x.toString());

  if (judge(prevNum, numbersStrArray)) {
    return res;
  }
  return "no ans"
}

var res = "";
function judge(numsArray,numsStrArray, result = 24) {
  if (!numsArray || numsArray.length === 0) return false;
  if (numsArray.length === 1){
    if(Math.abs(numsArray[0] - result) < 1e-5){
      res = numsStrArray[0];
      return true;
    }
    else{
      return false;
    }
  }


  for (let i = 0; i < numsArray.length - 1; i++) {
      for (let j = i + 1; j < numsArray.length; j++) {
          let n1 = numsArray[i];
          let n2 = numsArray[j];
          let s1 = numsStrArray[i];
          let s2 = numsStrArray[j];
          let rest = [];
          let restStr = [];

          for (let k = 0; k < numsArray.length; k++ ){
              if (k !== i && k !== j) {
                  rest.push(numsArray[k]);
                  restStr.push(numsStrArray[k]);
              }
          }
          if (judge([n1 + n2, ...rest],["(" + s1 + " + " + s2 +")", ...restStr], result)
          || judge([n1 - n2, ...rest],["(" + s1 + " - " + s2 +")", ...restStr], result)
          || judge([n2 - n1, ...rest],["(" + s2 + " - " + s1 +")", ...restStr], result)
          || judge([n1 * n2, ...rest],["(" + s1 + " * " + s2 +")", ...restStr], result)
          || judge([n1 / n2, ...rest],["(" + s1 + " / " + s2 +")", ...restStr], result)
          || judge([n2 / n1, ...rest],["(" + s2 + " / " + s1 +")", ...restStr], result)) {
              return true;
          }
      }
  }
  return false;
}
