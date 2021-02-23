// Create an object Snake to hold the snake attributes and methods

function Snake() {
        // Set initial position as p(0, 0)
        this.x = 15 * scale;
        this.y = 15 * scale;
        this.xSpeed = 1 * scale;
        this.ySpeed = 0;
        this.total = 0;
        this.tail = [];



        // Draw snake
        // Snake is a white square of 10x10 at state 0
        this.draw = () => {
            ctx.fillStyle = '#ff5e13';

            // print tail on the screen as soon as the first element arrives 
            for (let i=0; i<this.tail.length; i++){
                ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
            }

            // print head 
            ctx.fillRect(this.x, this.y, scale, scale);
        }; 

        // Move snake
        this.update = () => {
            // Increase the tail size on the left side for every fruit eaten
            // Tail[0] is a thing
            for (let i=0; i<this.tail.length - 1; i++){
                // Each tail element is recursively the image of the previous one
                // so the first element of the tail should be placed on the last place the snakes head was
                // for every tick of the clock , and so on for every other element 
                this.tail[i] = this.tail[i+1];
            };

            // tail printing starts at the last head position (last unit where snake head was)
            // Tail[0] is a thing
            this.tail[this.total - 1] =  {x: this.x, y: this.y};

            // Add snake speed to p(x, y) to create movement 
            this.x += this.xSpeed;
            this.y += this.ySpeed;

            // Border control
            // When the snake hits a border it goes to the opposite side of the map
            if (this.x > (canvas.width - 1)) {
                this.x = scale;
            };
            if (this.y > (canvas.height - 1)) {
                this.y = scale;
            };
            if (this.x < 0) {
                this.x = (canvas.height)  ;
            };
            if (snake.y < 0) {
                this.y = (canvas.height);
            };
        };

        this.checkDeath = function() {
            // if head hits tail blow
            this.tail.forEach(ele => {
                if (this.x == ele.x && this.y == ele.y) {
                    this.total = 0;
                    this.tail = []
                    result = 0;

                }
            });
        }

        // Direction control
        this.changeDirection = (direction) => {
            // Move towards the direction pressing in the keyboard on every switch of direction
            // Snake is constantly moving towards ONE direction
            // Block direction inversion to the opposite direction
            switch(direction) {
                // Keypress to change snake's direction
                case 'Up':
                    // Move up
                    if (this.xSpeed == 0) {
                        break
                    } else {
                        this.xSpeed = 0;
                        this.ySpeed = -1 * scale;
                        // add a timer here like a cooldown for movement keypresses
                        break
                    };
                case 'Left':
                    // Move left
                    if (this.ySpeed == 0) {
                        break
                    } else {
                        this.xSpeed = -1 * scale;
                        this.ySpeed = 0;
                        break
                    };
                    
                case 'Right':
                    // Move right
                    if (this.ySpeed  == 0) {
                        break
                    } else {
                        this.xSpeed = 1 * scale;
                        this.ySpeed = 0;
                        break
                    };
                    
                case 'Down':
                    // Move down
                    if (this.xSpeed == 0) {
                        break
                    } else {
                        this.xSpeed = 0;
                        this.ySpeed = 1 * scale;
                        break
                    };
                    
            }
        }
        // Handle snake and fruit interaction return true or false to the checker
        this.checkEat = function (fruit) {
            if (this.x == fruit.x && this.y == fruit.y) {
                this.total += 1
                fruit.pickLocation();
                result += 1;

            };
        };    
};
