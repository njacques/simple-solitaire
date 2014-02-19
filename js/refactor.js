Solitaire.prototype.moveCard = function(card, to) {
    var from = card.column,
        cards;
    
    if (card.column == 12) {
        cards = [this.waste.pop()];
    } else {
        var position = this.getCardPosition(card);
        cards = this.columns[card.column].splice(position);
    }
    
    var self = this;
    cards.forEach(function(card, index){
        card.column = to;
        self.table.moveCard(card, to, self.columns[to].length + index);
    });
    
    this.columns[to].push.apply(this.columns[to], cards);
    
    if (from && this.columns[from].length > 0) {
        this.columns[from][this.columns[from].length -1].flip();
    }
    
    this.table.update();
};