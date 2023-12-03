const fsp = require('fs').promises

async function lookForward(strArr,strIndex,count) {
  if(isNaN(strArr[parseInt(strIndex)+1])) return count

  return await lookForward(strArr,parseInt(strIndex)+1,count+1)
}

async function part1() {
  const input = await fsp.readFile('./input.txt','utf-8')

  const lines = input.split('\n')

  for(const lineNum in lines) {
    const pLineNum = parseInt(lineNum)
    if(lineNum > 0) return
    const strArr = lines[lineNum].split('')

    let processed = []
    let validNums = []

    for(const strIndex in strArr) {
      const pIndex = parseInt(strIndex)
      if(isNaN(strArr[strIndex])) continue
      if(processed.includes(pIndex)) continue

      const numEndPosition = await lookForward(strArr,strIndex,0)

      const num = lines[lineNum].slice(strIndex,pIndex+numEndPosition+1)
      console.log(num)

      for(let i = pIndex; i <= pIndex+numEndPosition; i++) {
        processed.push(i)
        
        const nearbyPositions = [ pIndex-1, numEndPosition+1 ]
        // typeof x === 'symbol'
      }
    }
  }
}

part1()