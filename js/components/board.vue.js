const Board = Vue.component('board', {
    props: ['width', 'height', 'tile-width', 'tile-height'],
    computed: {
        rowHeight() {
            return Math.floor(this.height / this.tileHeight);
        },
        rowTileWidth() {
            return Math.floor(this.width / this.tileWidth);
        }
    },
    mounted() {
        console.log(this.width, this.height, this.tileWidth, this.tileHeight)
    }
})