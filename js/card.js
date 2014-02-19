var Card = function(number, suite) {
    this.number = number;
    this.suite  = suite;
    this.faceUp = false;
    
    this.initialize(Card.prototype.basePath + 'full_back.jpg');
};

Card.prototype = new createjs.Bitmap(); // inherit from Container

Card.prototype.basePath = '';

Card.prototype.getImagePath = function() {
    return Card.prototype.basePath + this.number + this.suite[0] + '.jpg';
};

Card.prototype.setBasePath = function(basePath) {
    this.basePath = basePath;
};

Card.prototype.flip = function() {
    //this.image.src = this.getImagePath();
    this.image = resources.get(this.getImagePath());
    this.faceUp = true;
};