function Solitaire() {
    this.table = new Table('board');
    
    this.columns = {};
    this.stock   = [];
    this.waste   = [];
    
    this.selectedCard = null;
    
    this.table.addEventListener("click", this.handleClick.bind(this));
    
    var cardImages = [];
    for (i = 1; i < 14; i++) {
        cardImages[i]    = Card.prototype.basePath + i + 'c.jpg';
        cardImages[i+13] = Card.prototype.basePath + i + 'd.jpg';
        cardImages[i+26] = Card.prototype.basePath + i + 'h.jpg';
        cardImages[i+39] = Card.prototype.basePath + i + 's.jpg';
    }
    cardImages.push(Card.prototype.basePath + 'full_back.jpg');
    
    resources.load(cardImages);
    resources.onReady(this.newGame.bind(this));
}

Solitaire.prototype.newGame = function() {
    var deck = new Deck();
    
    this.columns = { 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[], 10:[], 11:[] };
    this.stock   = [];
    this.waste   = [];

    for (var i = 1; i < 8; i++) {
        for (var j = 1; j <= i; j++) {
            var card = deck.getCard();
            card.column = i;
            this.columns[i].push(card);
        }
    }
    
    this.stock = deck.getRemainingCards().map(function(card){
        card.column = 12;
        card.flip();
        return card;
    });
    
    this.table.setup(this.columns, this.waste);
};

Solitaire.prototype.canMove = function(card, destination) {
    var destCard = this.getTopCard(destination);
    
    if (destCard === null) {
        if (destination > 7 && card.number == 1) {
            return true;
        }
        
        if (destination <= 7 && card.number == 13) {
            return true;
        }
    } else {
        if (destination > 7 && card.suite == destCard.suite && card.number == destCard.number + 1) {
            return true;
        }
        
        if (destination <= 7 && card.number == destCard.number - 1) {
            if ((card.suite == 'hearts' || card.suite == 'diamonds') && 
                (destCard.suite == 'clubs' || destCard.suite == 'spades')) {
                    return true;
            }
            
            if ((card.suite == 'clubs' || card.suite == 'spades') && 
                (destCard.suite == 'hearts' || destCard.suite == 'diamonds')) {
                    return true;
            }       
        }
    }
    return false;
};

Solitaire.prototype.deal = function() {
    if (this.stock.length === 0) {
        this.table.clearWaste(this.waste);
        this.stock = this.waste;
        this.waste = [];
    } else {
        var card = this.stock.shift();
        this.waste.push(card);
        this.table.addToWaste(card);
    }
};

Solitaire.prototype.getCardPosition = function(card) {
    var position;
    this.columns[card.column].some(function(element, index){
        if (element === card) {
            position = index;
            return true;
        }
        return false;
    });
    return position;
};

Solitaire.prototype.getTopCard = function(column) {
    if (column == 12 && this.waste.length > 0) {
        return this.waste[this.waste.length-1];
    }
    
    if (column && this.columns[column].length > 0) {
        return this.columns[column][this.columns[column].length - 1];
    }
    
    return null;
};

Solitaire.prototype.moveCard = function(card, to) {
    var from = card.column,
        cards;
    
    if (card.column == 12) {
        cards = [this.waste.pop()];
    } else {
        var position = this.getCardPosition(card);
        cards = this.columns[card.column].splice(position);
    }
    
    if (from <= 7 && this.columns[from].length > 0) {
        this.columns[from][this.columns[from].length -1].flip();
    }
    
    var self = this;
    cards.forEach(function(card, index){
        card.column = to;
        self.table.moveCard(card, to, self.columns[to].length + index);
    });
    
    this.columns[to].push.apply(this.columns[to], cards);
};

Solitaire.prototype.handleClick = function(event) {
    var target = event.target;
    
    if (!target instanceof Card && !target instanceof Placeholder) {
        console.log('Deal');
        return;
    }
    
    if (this.selectedCard && this.canMove(this.selectedCard, target.column)) {           
        this.moveCard(this.selectedCard, target.column);
        this.selectedCard = null;
    } else if (target instanceof Card && target.faceUp) {
        this.selectedCard = (this.selectedCard == target) ? null : target;
    }
};