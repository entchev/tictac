class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", (event => {
      const $sqr = $(event.currentTarget);
      this.makeMove($sqr);
    }));
  }

  makeMove($sqr) {
    const pos = $sqr.data("pos");
    const currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("Unfortunately, this " + e.msg.toLowerCase());
      return;
    }

    $sqr.addClass(currentPlayer);

    if (this.game.isOver()) {
  
      this.$el.off("click");
      this.$el.addClass("game-over");

      const winner = this.game.winner().toUpperCase();
      const $figcaption = $("<figcaption>");


      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`The winner is ${winner}!`);
      } else {
        $figcaption.html("It's a draw!");
      }
      
      this.$el.append($figcaption);
    }
  }

  setupBoard() {
    const $row = $("<ul>");

    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $square = $("<li>"); 
        $square.data("pos", [i, j])

        $row.append($square);
      }
    }

    this.$el.append($row);
    
    const $restart = $(".restart");
    $restart.click(function () {
      location.reload();
    });

  };
}

module.exports = View;
