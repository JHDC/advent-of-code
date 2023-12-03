const fsp = require('fs').promises

async function lookForward1(strArr,strIndex,count) {
  if(isNaN(strArr[parseInt(strIndex)+1])) return count

  return await lookForward1(strArr,parseInt(strIndex)+1,count+1)
}

async function part1() {
  const input = await fsp.readFile('./input.txt','utf-8')

  const lines = input.split('\n')

  let validNums = []
  for(const lineNum in lines) {
    const pLineNum = parseInt(lineNum)
    const strArr = lines[lineNum].split('')

    let processed = []

    for(const strIndex in strArr) {
      const pIndex = parseInt(strIndex)
      if(isNaN(strArr[strIndex])) continue
      if(processed.includes(pIndex)) continue

      const numEndPosition = await lookForward1(strArr,strIndex,0)

      const num = lines[lineNum].slice(strIndex,pIndex+numEndPosition+1)
      console.log(num)

      for(let i = pIndex; i <= pIndex+numEndPosition; i++) {
        processed.push(i)
      }

      let nearbyCharacters = []
      if(pIndex > 0) nearbyCharacters.push(strArr[pIndex-1])
      if(pIndex+numEndPosition+1 < strArr.length) nearbyCharacters.push(strArr[pIndex+numEndPosition+1])
      if(pLineNum > 0) {
        const prevLineStrArr = lines[pLineNum-1].split('')
        const nearbyPrevLine = prevLineStrArr.filter((str,i) => i>=strIndex-1 && i<=pIndex+numEndPosition+1)
        nearbyCharacters = nearbyCharacters.concat(nearbyPrevLine)
      }
      if(pLineNum < lines.length-1) {
        const nextLineStrArr = lines[pLineNum+1].split('')
        const nearbyNextLine = nextLineStrArr.filter((str,i) => i>=strIndex-1 && i<=pIndex+numEndPosition+1)
        nearbyCharacters = nearbyCharacters.concat(nearbyNextLine)
      }

      console.log(nearbyCharacters)
      
      const nearbySymbols = nearbyCharacters.filter(char => isNaN(char) && char != '.')
      if(nearbySymbols.length > 0) validNums.push(parseInt(num))
    }
  }

  console.log(validNums)

  const sum = validNums.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  console.log(sum)
}

async function lookBehind(strArr,strIndex,result) {
  if(isNaN(strArr[strIndex])) return result.split("").reverse().join("")
  result += strArr[strIndex]

  return await lookBehind(strArr,strIndex-1,result)
}

async function lookAhead(strArr,strIndex,result) {
  if(isNaN(strArr[strIndex])) return result
  result += strArr[strIndex]

  return await lookAhead(strArr,strIndex+1,result)
}

async function part2() {
  const input = await fsp.readFile('./input.txt','utf-8')

  const lines = input.split('\n')

  let validNums = []
  for(const lineNum in lines) {
    const pLineNum = parseInt(lineNum)
    if(pLineNum > 1) return
    const strArr = lines[lineNum].split('')

    for(const strIndex in strArr) {
      const pIndex = parseInt(strIndex)
      if(strArr[strIndex] != '*') continue

      const nearbyNumbers = []
      if(pIndex > 0) {
        if(!isNaN(strArr[pIndex-1])) nearbyNumbers.push(await lookBehind(strArr,pIndex-1,''))
      }
      if(pIndex+1 < strArr.length) {
        if(!isNaN(strArr[pIndex+1])) nearbyNumbers.push(await lookAhead(strArr,pIndex+1,''))
      }
      if(pLineNum > 0) {
        const prevLineStrArr = lines[pLineNum-1].split('')
        const nearbyPrevLine = prevLineStrArr.filter((str,i) => i>=strIndex-1 && i<=pIndex+1)
        console.log(nearbyPrevLine)
      }
      // if(pLineNum < lines.length-1) {
      //   const nextLineStrArr = lines[pLineNum+1].split('')
      //   const nearbyNextLine = nextLineStrArr.filter((str,i) => i>=strIndex-1 && i<=pIndex+1)
      //   nearbyCharacters.nextLine = nearbyNextLine
      // }

      console.log(nearbyNumbers)
      
      // const nearbySymbols = nearbyCharacters.filter(char => isNaN(char) && char != '.')
      // if(nearbySymbols.length > 0) validNums.push(parseInt(num))
    }
  }

  // console.log(validNums)

  // const sum = validNums.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  // console.log(sum)
}

part2()
