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
            if (e && e.target) {
                const elem = e.target;
                if (elem._clickTime) {
                    const elapsedInterval = ((new Date()) - elem._clickTime)
                    if (elapsedInterval < delay) {
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
        detectMouseDown(e) {
            const threshold = 1500;
            if (e && e.target) {
                const elem = e.target;
                elem._mouseTapTime = new Date();
            }
            return true;
        },
        detectMouseUp(e, fn) {
            const threshold = 1000;
            if (e && e.target) {
                const elem = e.target;
                if (elem._mouseTapTime) {
                    const elapsedInterval = ((new Date()) - elem._mouseTapTime)
                    console.log(elapsedInterval, elapsedInterval >= threshold)
                    if (elapsedInterval >= threshold) {
                        if (typeof fn === 'function') fn()
                        return true;
                    }
                }
                elem._mouseTapTime = null;
            }
            return false;
        },
        detectLongPress(e, fn) {
            return !this.detectMouseUp(e, fn);
        },
        relay(...fns) {
            console.log("click", fns)
            return (...args) => {
                fns.reduce((status, fn) => {
                    if (status) return fn(...args)
                    return false; 
                }, true)
            }
        },
        placeEnemy() {
            this.info.fog = !this.info.fog;
        },
        curry(fn, ...params) {
            return () => fn(...params);
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