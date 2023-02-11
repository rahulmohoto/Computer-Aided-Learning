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
            visible: "modal fade",
            setZIndex: "z-index: -1050",
            remainingSeconds: 5,
        }
    },

    asyncComputed: {
         
    },

    computed: {
        setWidth() {
            debugger;
            if (this.detectedShape == this.currentShape) {
                console.log(this.width);
                // await this.wait(5);
                // debugger;
                // this.nextShape();
                return this.width = this.width + 20;
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

        clear() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.canvasImgStyle = "none";
            this.detectedShape = null;
        },

        erase() {
            debugger;
            // var m = confirm("Want to clear");
            this.setZIndex = "z-index: 1050";
            this.visible = "modal show";
            // this.closeDialog(e);

            // if (m) {
            // this.clear();
            // this.canvasImg.style.display = "none";
            // document.getElementById("canvasimg").style.display = "none";
            // }
        },

        nextShape() {
            debugger;
            var currentShape = this.shapes.filter(n => n == this.currentShape);
            var currentIndex = this.shapes.findIndex(n => n == currentShape[0]);
            var nextIndex = (currentIndex + 1) >= this.shapes.length ? 0 : currentIndex + 1;
            this.currentShape = this.shapes[nextIndex];
            console.log(this.currentShape);

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

        closeDialog(e) {
            debugger;
            // console.log("Dialog Closed!!");
            // this.visible = "modal fade";
            // console.log(e.target.tagName);
            if (e.target.innerText == "Erase") {
                this.clear();
                // this.canvasImg.style.display = "none";
            }
            this.setZIndex = "z-index: -1050";
            this.visible = "modal fade";
        }
    },

    components: {
        'test_component': { template: `<h1>Hello this is app</h1>` },
        // 'modalcomponent': {
        //     template: `
        // <!-- Modal -->
        // <div :class="showModal" id="centerModal" ref="centerModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: block; padding-right: 17px; position: fixed; 
        // top: 0; right: 0; bottom: 0; left: 0; height: 250px; overflow: hidden;" :style="zIndex">
        // <div class="modal-dialog modal-dialog-centered" role="document">
        //     <div class="modal-content">
        //     <div class="modal-header">
        //         <h5 class="modal-title">{{title}}</h5>
        //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //         <span aria-hidden="true">&times;</span>
        //         </button>
        //     </div>
        //     <div class="modal-body" style="font-family: Tahoma">
        //         {{body}}
        //     </div>
        //     <div class="modal-footer" style="padding-bottom: 1.75rem">
        //         <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="callBackClose($event)" style="font-family: Tahoma">Close</button>
        //         <button type="button" class="btn btn-primary" @click="callBackErase($event)" style="font-family: Tahoma">Erase</button>
        //     </div>
        //     </div>
        // </div>
        // </div>
        // `,
        //     methods: {
        //         callBackClose: function (e) {
        //             debugger;
        //             this.$emit('click', e);
        //             // console.log(this.showModal);
        //             // this.showModal = "modal fade";
        //         },

        //         callBackErase: function(e) {
        //             debugger;
        //             this.$emit('click', e);
        //         }
        //     },
        //     props: {
        //         showModal: String,
        //         title: String,
        //         body: String,
        //         zIndex: String
        //     }
        // }
    },

    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.navbar_container = this.$refs.navbar;
        console.log(this.navbar_container);
        // this.canvas_container = this.$refs.canvasContainer;

        var container = this.$refs.refContainer;
        console.log(container);

    },

    created() {
        el = this;

        this.socket = io.connect('http://' + "127.0.0.1" + ':' + location.port); // 127.0.0.1 is for local server
        this.socket.on('connect', () => {
            console.log('initSocketIO');
            // this.socket = socket;
        });
        this.socket.on('message', async (obj) => {
            console.log('detected shape', obj.shape);
            this.detectedShape = obj.shape;
            if(this.currentShape == this.detectedShape)
                await this.wait();
        })
    }
}

const app = Vue.createApp(App);
// app.mount('#app')