<template>
  <div class="game-area">
    <div class="message">{{message}}</div>
    <table>
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <td v-bind:class="col.c"
          v-for="(col, colIndex) in row" :key="colIndex"
          @click="MakeAMove(rowIndex, colIndex)">
        {{col.v}}
        </td>
      </tr>
    </table>
    <button v-if="this.gameFinished" @click="ResetGame()">Start again</button>
  </div>
</template>

<script>
export default {
  name: 'TicTacToe',
  data: function () {
    return {
      currentPlayerSymbol: 'x',
      gameFinished: false,
      message: '',
      board: [
        [{v: '', c: ''}, {v: '', c: ''}, {v: '', c: ''}],
        [{v: '', c: ''}, {v: '', c: ''}, {v: '', c: ''}],
        [{v: '', c: ''}, {v: '', c: ''}, {v: '', c: ''}]
      ]
    };
  },
  created: function() {
    this.ResetGame();
  },
  methods: {
    ResetGame: function () {
      this.board = [
        [{v: '', c: ''}, {v: '', c: ''}, {v: '', c: ''}],
        [{v: '', c: ''}, {v: '', c: ''}, {v: '', c: ''}],
        [{v: '', c: ''}, {v: '', c: ''}, {v: '', c: ''}]
      ];
      
      this.currentPlayerSymbol = 'x';
      this.gameFinished = false;
      this.SetMessage('Player ' + this.currentPlayerSymbol + ' turn:');
    },

    SetMessage: function (msg) {
      this.message = msg;
    },

    MakeAMove: function (rowIndex, colIndex) {
      let val = this.board[rowIndex][colIndex].v;
      
      if (val !== '') {
        // some message to display that you already clicked this element
        return;
      }

      if (this.gameFinished) {
        // some message to display that the game need a restart
        return;
      }

      // change value to current player symbol
      this.board[rowIndex][colIndex].v = this.currentPlayerSymbol;

      // check winning conditions
      let winnerState = this.WhoWins();

      if (winnerState === 'nomoves') {
        // display a message that nobody wins this game
        this.SetMessage('No moves! Draw!');
        this.gameFinished = true;
      }
      else if (winnerState !== '') {
        // display a message for the winner
        this.SetMessage('Player ' + winnerState + ' wins!');
        this.gameFinished = true;
      }
      else {
        // change a player symbol
        this.currentPlayerSymbol = 
          this.currentPlayerSymbol == 'x' ? 'o' : 'x';

        this.SetMessage('Player ' + this.currentPlayerSymbol + ' turn:');
      }
    },

    WhoWins: function () {
      let board = this.board;

      // check horizontals
      for (let i = 0; i < board.length; i++) {
        let row = board[i];

        if (
          row[0].v !== '' && 
          row[0].v === row[1].v && 
          row[0].v === row[2].v
        ) {
          // set winning class
          row[0].c = row[1].c = row[2].c = 'win';

          return row[0].v;
        }
      }

      // check verticals
      for (let i = 0; i < 3; i++) {
        if (
          board[0][i].v !== '' && 
          board[0][i].v === board[1][i].v && 
          board[0][i].v === board[2][i].v
        ) {
          // set winning class
          board[0][i].c = board[1][i].c = board[2][i].c = 'win';

          return board[0][i].v;
        }
      }

      // check diagonals (the simplest way to check)
      if (
        board[0][0].v !== '' &&
        board[0][0].v === board[1][1].v && 
        board[0][0].v === board[2][2].v) {
          // set winning class
          board[0][0].c = board[1][1].c = board[2][2].c = 'win';

          return board[0][0].v;
      }

      if (
        board[2][0].v !== '' &&
        board[2][0].v === board[1][1].v && 
        board[2][0].v === board[0][2].v) {
          // set winning class
          board[2][0].c = board[1][1].c = board[0][2].c = 'win';

          return board[2][0];
      }

      // check that there's no other moves
      for (let i = 0; i < board.length; i++) {
        for (let y = 0; y < board[i].length; y++) {
          if (board[i][y].v === '') {
            return '';
          }
        }
      }

      return 'nomoves';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-area .message {
  text-align: left;
}

.game-area table td {
  border: 1px solid #000;
  padding: 10px;
  font-size: 40px;
  width: 50px;
  height: 50px;
}
.game-area table td:hover {
  background: rgb(170, 170, 170);
  cursor: pointer;
}
.game-area table td.win {
  background: green;
  color: #fff;
}
</style>