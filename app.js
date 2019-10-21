new Vue({
  el: '#app',
  data: {
    name: 'Alan',
    gameIsStarted: false,
    isFirstRound: false,
    playerHP: 100,
    enemyHP: 100,
    hpBar: {
      margin: 0,
      backgroundColor: 'green',
      color: 'white'
    },
    log: []
  },
  methods: {
    actionClass (action) {
      return [
        action.type === 'p' ? 'player-turn' : 'monster-turn'
      ]
    },

    startGame () {
      this.gameIsStarted = true
      this.isFirstRound = true
    },

    resetGame () {
      this.gameIsStarted = false
      this.isFirstRound = false
      this.playerHP = 100
      this.enemyHP = 100
      this.log = []
    },

    attackAct () {
      const pD = this.calcDamage(5, 10)
      this.enemyHP -= pD
      this.checkWin()
      this.damageLineList('p', pD)

      this.monsterAttacks()
    },

    specialAttackAct () {
      const pD = this.calcDamage(10, 20)
      this.enemyHP -= pD
      this.checkWin()
      this.damageLineList('p', pD)

      this.monsterAttacks()
    },

    healAct () {
      if (this.playerHP <= 90) {
        this.playerHP += 10
      } else {
        this.playerHP = 100
      }
      this.damageLineList('p', 10)

      this.monsterAttacks()
    },

    monsterAttacks () {
      const eD = this.calcDamage(6, 12)
      this.playerHP -= eD
      this.checkWin()
      this.damageLineList('e', eD)
    },

    calcDamage (min, max) {
      const damage = Math.floor(Math.random() * (max - min)) + min
      return damage
    },

    damageLineList (t, d) {
      this.log.unshift({ type: t, damage: d })
    },

    checkWin () {
      if (this.enemyHP <= 0) {
        this.finish('Player')
        return
      }

      if (this.playerHP <= 0) {
        this.finish('Enemy')
        return
      }
    },

    finish (name) {
      if (confirm(name + ' win the game!')) {
        this.resetGame()
      } else {
        this.resetGame()
      }
    }
  }
})
