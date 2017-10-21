const Tile = Vue.component('tile', {
    props: ['info'],
    methods: {
        rotate() {
            if (this.info.block_rotation === 3) {
                this.info.block_rotation = 0;
            }
            else {
                this.info.block_rotation++;
            }
        },
        change() {
            if (this.info.block_type === 4) {
                this.info.block_type = -1;
            }
            else {
                this.info.block_type++;
            }
        },
        detectDblClick(e, fn) {
            const delay = 500;
            //console.log(fn)
            if (e && e.target) {
                const elem = e.target;
                if (elem._clickTime) {
                    const elapsedInterval = ((new Date()) - elem._clickTime)
                    if (elapsedInterval < 500) {
                        return true;
                    }
                    else {
                        if (typeof fn === 'function') {
                            fn()
                        }
                    }
                }
                else {
                    if (typeof fn === 'function') {
                        fn()
                    }
                }
                elem._clickTime = new Date();
            }
            return false;
        },
        relay(...fns) {
            //console.log(fns);
            return (...args) => {
                fns.reduce((status, fn) => {
                    if (status) return fn(...args)
                    return false; 
                }, true)
            }
        }
    },
    computed: {
        image() {
            switch (this.info.block_type) {
                case 0:
                    return imageUrl('tile-dead-end.png'); 
                case 1:
                    return imageUrl('tile-straight.png');
                case 2:
                    return imageUrl('tile-corner.png');
                case 3:
                    return imageUrl('tile-three-way.png');
                case 4:
                    return imageUrl('tile-four-way.png');
                case -1:
                default:
                    return imageUrl('tile-none.png');
            }
        },
        rotation() {
            return this.info.block_rotation * -90;
        }
    },
    mounted() {

    }
})