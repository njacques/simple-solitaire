function Deck() {
    this.deck = [];
    for (i = 1; i < 14; i++) {
        this.deck[i]    = new Card(i, 'clubs');
        this.deck[i+13] = new Card(i, 'diamonds');
        this.deck[i+26] = new Card(i, 'hearts');
        this.deck[i+39] = new Card(i, 'spades');
    }
    this.deck.shift();
    this.shuffle();
}

Deck.prototype.getCard = function() {
    if(this.deck.length < 1) return false;
    
    // var index = Math.floor(Math.random() * (this.deck.length)),
        // removed = this.deck.splice(index, 1);
    
    // return removed[0];
    
    return this.deck.pop();
};

Deck.prototype.getRemainingCards = function() {
    return this.deck.splice(0);
};

Deck.prototype.count = function() {
    return this.deck.length;
};

Deck.prototype.shuffle = function() {
    var o = this.deck;
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    this.deck = o;
};