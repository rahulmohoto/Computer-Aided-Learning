const App = {
    data() {
        return {
            counter: 8,
            // isActive: true,
            // isClass2: false,
            canvas: null,
            canvasImgStyle: "none",
            ctx: false,
            flag: false,
            prevX: 0,
            currX: 0,
            prevY: 0,
            currY: 0,
            dot_flag: false,
            clicked: false,

            x: "black",
            y: 2,

            canvas_container: null,
            navbar_container: null,
            section_container: null,

            shapes: ['Triangle', 'Circle', 'Square'],
            currentShape: 'Triangle',
            socket: null
        }
    },

    computed: {
        getStyles() {
            var container = document.querySelector(".container"); // Will change this later.
            var container_style = getComputedStyle(container); // Will change this later.
            this.canvas_container = container_style;

            var navbar = document.getElementById("navbar"); // Will change this later.
            var navbar_style = getComputedStyle(navbar); // Will change this later.
            this.navbar_container = navbar_style;

            var section = document.getElementById("header18-1");
            var section_style = getComputedStyle(section);
            this.section_container = section_style;
        },
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
                    // parseInt('245px', 10);
                    this.currX = e.clientX - this.canvas.offsetLeft - parseInt(this.canvas_container.marginLeft, 10) - parseInt(this.canvas_container.paddingLeft, 10);
                    this.currY = e.clientY - this.canvas.offsetTop - parseInt(this.canvas_container.marginTop, 10) - parseInt(this.canvas_container.paddingTop, 10) - parseInt(this.navbar_container.height, 10) - parseInt(this.section_container.paddingTop, 10);
                    // console.log(this.canvas_container.marginLeft, this.canvas_container.marginTop);
                    // console.log(this.canvas_container.paddingLeft, this.canvas_container.paddingTop);
                    // console.log(this.currX, this.currY);
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

                this.getStyles;

                this.currX = e.clientX - this.canvas.offsetLeft - parseInt(this.canvas_container.marginLeft, 10) - parseInt(this.canvas_container.paddingLeft, 10);
                this.currY = e.clientY - this.canvas.offsetTop - parseInt(this.canvas_container.marginTop, 10) - parseInt(this.canvas_container.paddingTop, 10) - parseInt(this.navbar_container.height, 10) - parseInt(this.section_container.paddingTop, 10);

                // console.log(e.clientX, e.clientY);
                // console.log(this.canvas.offsetLeft, this.canvas.offsetTop);
                // console.log(container_style.marginTop, container_style.marginLeft);
                // console.log(container_style.paddingLeft, container_style.paddingTop);

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
        },

        erase() {
            var m = confirm("Want to clear");
            if (m) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.canvasImgStyle = "none";
                // this.canvasImg.style.display = "none";
                // document.getElementById("canvasimg").style.display = "none";
            }
        },

        nextShape() {
            var currentShape = this.shapes.filter(n => n == this.currentShape);
            var currentIndex = this.shapes.findIndex(n => n == currentShape[0]);
            var nextIndex = (currentIndex + 1) >= this.shapes.length ? 0 : currentIndex + 1;
            this.currentShape = this.shapes[nextIndex];
            console.log(this.currentShape);
        },

        Test() {
            debugger;
            // print()
            pictureURL = this.canvas.toDataURL();
            this.socket.emit('capture_canvas_event' ,{
                message: 'Sending from client',
                url: pictureURL
            })
        }
    },

    components: {
        'test_component': { template: `<h1>Hello this is app</h1>` },
    },

    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.navbar_container = this.$refs.navbar;
        // this.canvas_container = this.$refs.canvasContainer;
    },

    created() {
        el = this;

        this.socket = io.connect('http://' + "127.0.0.1" + ':' + location.port); // 127.0.0.1 is for local server
        this.socket.on('connect',
            function () {
                console.log('initSocketIO');
                // this.socket = socket;
            });
    }
}

const app = Vue.createApp(App);
// app.mount('#app')