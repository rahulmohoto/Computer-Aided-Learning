app.component("modalcomponent", {
    template: `
        <!-- Modal -->
        <div :class="showModal" id="centerModal" ref="centerModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: block; padding-right: 17px; position: fixed; 
        top: 50px; right: 0; bottom: 0; left: 0; height: 250px; overflow: hidden;" :style="zIndex">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{title}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="font-family: Tahoma">
                {{body}}
            </div>
            <div class="modal-footer" style="padding-bottom: 1.75rem">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="callBackClose($event)" style="font-family: Tahoma">Close</button>
                <button type="button" class="btn btn-primary" @click="callBackErase($event)" style="font-family: Tahoma" :style="hide">Erase</button>
            </div>
            </div>
        </div>
        </div>
        `,
    methods: {
        callBackClose: function (e) {
            // debugger;
            this.$emit('click', e);
            // console.log(this.showModal);
            // this.showModal = "modal fade";
        },

        callBackErase: function (e) {
            // debugger;
            this.$emit('click', e);
        }
    },
    props: {
        showModal: String,
        title: String,
        body: String,
        zIndex: String,
        hide: String
    }
})