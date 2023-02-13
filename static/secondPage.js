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

            shapes: ['Triangle', 'Circle', 'Quadriteral', 'Pentagon', 'Hexagon'],
            currentShape: 'Triangle',
            socket: null,
            detectedShape: null,
            width: 0,
            remainingSeconds: 5,
            setOpacity: "opacity: 1",
            dialog: {
                setBody: null,
                setTitle: null,
                visible: "modal fade",
                setZIndex: "z-index: -1050",
                eraseHide: "display: none"
            }
        }
    },

    asyncComputed: {

    },

    computed: {
        setWidth() {
            debugger;
            if (this.detectedShape == this.currentShape) {
                return this.width = this.width + 20;
            }
            if (this.width >= 100) {
                return this.width = 0;
            }
            return this.width;
        },

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
        async wait() {
            debugger;
            return new Promise(resolve => {
                var timeleft = 5;
                var downloadTimer = setInterval(() => {
                    if (timeleft <= 0) {
                        clearInterval(downloadTimer);
                        this.remainingSeconds = 5;
                        this.nextShape();
                        // return this.width = this.width + 20;
                    } else {
                        // console.log(this.remainingSeconds);
                        this.remainingSeconds = 5 - timeleft // + " seconds remaining";
                    }
                    timeleft -= 1;
                }, 1000);
            });
        },

        findxy(res, e) {
            if (res == 'up' || res == "out" || !this.clicked) {
                this.flag = false;
            }
            if (res == 'move') {
                if (this.flag) {
                    this.prevX = this.currX;
                    this.prevY = this.currY;
                    this.currX = e.clientX - this.canvas.offsetLeft - parseInt(this.canvas_container.marginLeft, 10) - parseInt(this.canvas_container.paddingLeft, 10);
                    this.currY = e.clientY - this.canvas.offsetTop - parseInt(this.canvas_container.marginTop, 10) - parseInt(this.canvas_container.paddingTop, 10) - parseInt(this.navbar_container.height, 10) - parseInt(this.section_container.paddingTop, 10);
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

        clear() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.canvasImgStyle = "none";
            this.detectedShape = null;

            this.setOpacity = "opacity: 1";
        },

        showDialog(title, body, hide) {
            debugger;
            this.setOpacity = "opacity: 0.3";

            this.dialog.setTitle = title;
            this.dialog.setBody = body;
            this.dialog.setZIndex = "z-index: 1050";
            this.dialog.visible = "modal show";
            this.dialog.eraseHide = hide;
        },

        nextShape() {
            debugger;
            var currentShape = this.shapes.filter(n => n == this.currentShape);
            var currentIndex = this.shapes.findIndex(n => n == currentShape[0]);
            var nextIndex = (currentIndex + 1) >= this.shapes.length ? 0 : currentIndex + 1;
            this.currentShape = this.shapes[nextIndex];
            // console.log(this.currentShape);

            this.clear();
        },

        test() {
            debugger;
            // print()
            pictureURL = this.canvas.toDataURL();
            this.socket.emit('capture_canvas_event', {
                message: 'Sending from client',
                url: pictureURL
            })
        },

        erase() {
            this.showDialog(title = "Confirmation", body = "Do you want to erase?", eraseHide = "display: block");
        },

        closeDialog(e) {
            debugger;
            if (e.target.innerText == "Erase") {
                this.clear();
                // this.canvasImg.style.display = "none";
            }
            this.dialog.setZIndex = "z-index: -1050";
            this.dialog.visible = "modal fade";
            this.setOpacity = "opacity: 1";
        }
    },

    watch: {
        width: {
            // console.log(value);
            handler: function (value) {
                if (value == 100) {
                    this.showDialog(title = "Congratulations!!", body = "Hope you enjoyed this small program of self learning. Best wishes!!", eraseHide = "display: none");
                    // this.width = 0;
                }
            },
            deep: true
        }
    },

    components: {
        'test_component': { template: `<h1>Hello this is app</h1>` },
    },

    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext("2d");
    },

    created() {
        el = this;

        this.socket = io.connect('http://' + "127.0.0.1" + ':' + location.port); // 127.0.0.1 is for local server
        this.socket.on('connect', () => {
            console.log('initSocketIO');
            this.showDialog(title = "Welcome!", body = "Here you will see the left shape. You have to draw the exact shape on the canvas. 5 shapes, 20 points each. Also you can see your progress.", hide = "display: none");
        });
        this.socket.on('message', async (obj) => {
            console.log('detected shape', obj.shape);
            this.detectedShape = obj.shape;
            if (this.currentShape == this.detectedShape)
                await this.wait();
            // if (this.width == 100)
            //     this.width = 0;
        })
    }
}

const app = Vue.createApp(App);
// app.mount('#app')