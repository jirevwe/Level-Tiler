const Modal = Vue.component('modal-item', {
    data() {
        return {
            title: '',
            body: '',
            footer: '',
            show: false
        }
    },
    methods: {
        close() {
            this.show = false;
        }
    },
    computed: {
        text() {
            return ''
        }
    },
    mounted() {
        this.$parent.$on('modal:show', (modal) => {
            this.title = modal.title || '';
            this.body = modal.body || '';
            this.footer = modal.footer || '';
            this.show = true;
        })
    }
})