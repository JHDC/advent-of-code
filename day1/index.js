const fsp = require('fs').promises

async function part1() {
  const input = JSON.parse(await fsp.readFile('./input.json','utf-8'))
  
  const nums = input.map(str => {
    let firstNum
    let lastNum
    for(const subStr of str) {
      if(!isNaN(subStr) && !firstNum) firstNum = subStr
      if(!isNaN(subStr)) lastNum = subStr
    }
    return parseInt(firstNum+lastNum)
  })
  
  console.log(nums)
  const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  console.log(sum)
}

async function part2() {
  const input = JSON.parse(await fsp.readFile('./input.json','utf-8'))
  const numStrings = [
    { num: '1', str: 'one' },
    { num: '2', str: 'two' },
    { num: '3', str: 'three' },
    { num: '4', str: 'four' },
    { num: '5', str: 'five' },
    { num: '6', str: 'six' },
    { num: '7', str: 'seven' },
    { num: '8', str: 'eight' },
    { num: '9', str: 'nine' },
  ]
  
  const nums = input.map(str => {
    let firstNum
    let lastNum
    for(const index in str) {
      if(!isNaN(str[index]) && !firstNum) firstNum = str[index]
      if(!isNaN(str[index])) lastNum = str[index]

      const matchNum = numStrings.find(numString => str.slice(index,parseInt(index)+5).includes(numString.str))

      if(matchNum && !firstNum) firstNum = matchNum.num
      if(matchNum) lastNum = matchNum.num
    }
    return parseInt(firstNum+lastNum)
  })
  
  console.log(nums)
  const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  console.log(sum)
}

async function part2Cheat() {
  const strings = JSON.parse(await fsp.readFile('./input.json','utf-8'))
  const words = [ {word: 'one',val: 1}, {word: 'two',val: 2}, {word: 'three',val: 3}, {word: 'four',val: 4}, {word: 'five',val: 5}, {word: 'six',val: 6}, {word: 'seven',val: 7}, {word: 'eight',val: 8}, {word: 'nine',val: 9} ];

  let sum2 = 0;

  for (let i = 0; i < strings.length; i++) { 
      let matches = []; 
      for (let k = 0; k < strings[i].length; k++) { 
          if (isNaN(strings[i][k])) { 
              for (const x of words) { 
                  const { word, val } = x 
                  const check = strings[i].slice(k, k + word.length); 
                  if (check == word) { 
                      matches.push(val); 
                      break; 
                  } 
              } 
          } else { 
              matches.push(Number(strings[i][k])) 
          } 
      } 
      sum2 += (matches[0] * 10) + matches[matches.length - 1]
  }

  console.log(sum2)
}

part2()
