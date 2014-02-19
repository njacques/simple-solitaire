var Placeholder = function() {
    this.initialize();
    this.graphics.beginStroke("#F00").beginFill("#FFF").drawRect(0, 0, 100, 145);
};

Placeholder.prototype = new createjs.Shape();