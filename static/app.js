const App = {
    data() {
        return {
            counter: 8,
            // isActive: true,
            // isClass2: false,
            canvas: "canvas",
            ctx: false,
            flag: false,
            prevX: 0,
            currX: 0,
            prevY: 0,
            currY: 0,
            dot_flag: false,
            clicked: false,

            x: "black",
            y: 2
        }
    },

    methods: {
        click() {
            this.counter++;
            console.log(this.counter);
        },

        findxy(res, e) {
            if (res == 'up' || res == "out" || !this.clicked) {
                this.flag = false;
            }
            if (res == 'move') {
                if (this.flag) {
                    this.prevX = this.currX;
                    this.prevY = this.currY;
                    this.currX = e.clientX - this.canvas.offsetLeft;
                    this.currY = e.clientY - this.canvas.offsetTop;
                    this.draw();
                }
            }
        },

        draw() {
            this.ctx.beginPath();
            this.ctx.moveTo(this.prevX, this.prevY);
            this.ctx.lineTo(this.currX, this.currY);
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.ctx.closePath();
        },

        startingCoordinate(e) {
            // if(!clicked)
            this.clicked = !this.clicked;

            if (this.clicked) {
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - this.canvas.offsetLeft;
                this.currY = e.clientY - this.canvas.offsetTop;

                this.flag = true;
                this.dot_flag = true;
                if (this.dot_flag) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "black";
                    this.ctx.fillRect(this.currX, this.currY, 2, 2);
                    this.ctx.closePath();
                    this.dot_flag = false;
                }
            }
        }
    },

    components: {
        'test_component': { template: `<h1>Hello this is app</h1>` },
    },

    mounted() {
        // canvas = document.getElementById('can');
        this.canvas = this.$refs.canvas;
        // console.log(canvas);
        this.ctx = this.canvas.getContext("2d");
        w = this.canvas.width;
        h = this.canvas.height;

        // this.initialize();
    }
}

const app = Vue.createApp(App);
// app.mount('#app')