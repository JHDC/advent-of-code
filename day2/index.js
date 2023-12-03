const fsp = require('fs').promises

async function part1() {
  const input = await fsp.readFile('./input.txt','utf-8')
  
  const games = []
  const lines = input.split('\n')

  for(const line of lines) {
    const match = line.match(/Game (\d+): (.*)/)

      const gameNumber = parseInt(match[1])
      const gameDetails = match[2]

      const rounds = gameDetails.split(';')

      const gameData = {
        gameNumber,
        rounds: [],
      }

      for(const round of rounds) {
        const roundData = {
          colors: {},
        }

        const colors = round.split(',')

        for(const color of colors) {
          const parts = color.trim().split(' ')
          const count = parseInt(parts[0])
          const colorName = parts[1]

          roundData.colors[colorName] = count
        }

        gameData.rounds.push(roundData)
      }

      games.push(gameData)
  }

  const matchedGames = games.filter(game => {
    const impossibleRounds = game.rounds.filter(round => round.colors.red > 12 || round.colors.green > 13 || round.colors.blue > 14)
    return impossibleRounds.length < 1
  }).map(game => game.gameNumber)

  const sum = matchedGames.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  console.log(sum)
}

async function part2() {
  const input = await fsp.readFile('./input.txt','utf-8')
  
  const games = []
  const lines = input.split('\n')

  for(const line of lines) {
    const match = line.match(/Game (\d+): (.*)/)

      const gameNumber = parseInt(match[1])
      const gameDetails = match[2]

      const rounds = gameDetails.split(';')

      const gameData = {
        gameNumber,
        rounds: [],
      }

      for(const round of rounds) {
        const roundData = {
          colors: {},
        }

        const colors = round.split(',')

        for(const color of colors) {
          const parts = color.trim().split(' ')
          const count = parseInt(parts[0])
          const colorName = parts[1]

          roundData.colors[colorName] = count
          if(gameData[colorName]) {
            if(gameData[colorName] < count) gameData[colorName] = count
          }
          else gameData[colorName] = count
        }

        gameData.rounds.push(roundData)
      }

      games.push(gameData)
  }

  const gameProducts = games.map(game => game.blue * game.green * game.red)

  const sum = gameProducts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  console.log(sum)
}

part2()