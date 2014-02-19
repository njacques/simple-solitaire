var Table = function(canvas) {
    this.initialize(canvas);
    
    this.startX = 100;
    this.startY = 25;
    this.columnWidth = 120;
    this.rowHeight = 195;
    this.stackOffset = 28;
};

Table.prototype = new createjs.Stage();

Table.prototype.addToWaste = function(card) {
    card.x = this.startX + this.columnWidth;
    card.y = this.startY;
    this.addChild(card);
    this.update();
};

Table.prototype.clearWaste = function(waste) {
    this.removeChild.apply(this, waste);
    this.update();
};

Table.prototype.displayCard = function(card, xPos, yPos) {
    card.x = xPos;
    card.y = yPos;
    this.addChild(card);
};

Table.prototype.drawStock = function(waste) {
    var stock = new createjs.Bitmap(path + "full_back.jpg");
    stock.x = this.startX;
    stock.y = this.startY;
    stock.addEventListener('click', function(event) {
        game.deal();
    });
    this.addChild(stock);
};

Table.prototype.drawColumns = function(columns) {
    var xPos   = this.startX,
        yPos   = this.startY + this.rowHeight,
        offset = this.stackOffset;
    
    var self = this;
    for (var i = 1; i < 8; i++) {
        var shape = new Placeholder();
        shape.x = xPos;
        shape.y = yPos;
        shape.column = i;
        this.addChild(shape);
    
        columns[i].forEach(function(card, index, array) {
            if (index == (array.length - 1)) {
                card.flip();
                card.column = i;
            }
            self.displayCard(card, xPos, yPos);
            yPos += offset;
        });

        xPos += this.columnWidth;
        yPos = this.startY + this.rowHeight;
    }
};

Table.prototype.drawSuits = function(columns) {
    var xPos = this.startX + this.columnWidth * 3,
        yPos = this.startY;
        
    for (var i = 8; i < 12; i++) {
        var length = columns[i].length;
        if (length > 0) {
            this.displayCard(columns[i][length - 1], xPos, yPos);
        } else {
            var shape = new Placeholder();
            shape.x = xPos;
            shape.y = yPos;
            shape.column = i;
            this.addChild(shape);
        }
        xPos += this.columnWidth;
    }
};

Table.prototype.moveCard = function(card, column, position) {
    // Remove and re-add card to table to change z-order
    this.removeChild(card);
    if (column > 7) {
        card.x = this.startX + this.columnWidth * (column - 5);
        card.y = this.startY;
    } else {
        card.x = this.startX + this.columnWidth * (column - 1);
        card.y = 220 + this.stackOffset * position;
    }
    this.addChild(card);
    this.update();
};

Table.prototype.setup = function(columns, waste) {
    this.removeAllChildren();
    this.drawStock(waste);
    this.drawSuits(columns);
    this.drawColumns(columns);
    this.update();
};