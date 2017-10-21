const app = new Vue({
    el: '#app',
    components: {
        'board': Board,
        'tile': Tile
    },
    methods: {
        addRight() {
            this.tiles = this.tiles.map(row => [...row, {
                block_type: 0,
                block_rotation: 0,
                fog: false
            }])
        },
        addBottom() {
            this.tiles.push(this.tiles[this.tiles.length - 1].map(tile => ({
                block_type: 0,
                block_rotation: 0,
                fog: false
            })) || [
                {
                    block_type: 0,
                    block_rotation: 0,
                    fog: false
                }
            ])
        }
    },
    data: {
        tiles: [
            [
                {
                    block_type: -1,
                    block_rotation: 0,
                    fog: false
                }
            ]
        ]
    }
})