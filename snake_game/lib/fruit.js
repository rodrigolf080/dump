function Fruit() {
    // Set initial position as p(10ua, 10ua)
    this.x;
    this.y;

    this.pickLocation = () => {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;

    };

    this.draw = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x, this.y, scale, scale);
    }; 
    
};