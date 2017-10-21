const app = new Vue({
    el: '#app',
    components: {
        'board': Board,
        'tile': Tile
    },
    data: {
        tiles: [
            [
                {
                    block_type: 0,
                    block_rotation: 0,
                    fog: false
                },
                {
                    block_type: -1,
                    block_rotation: 1,
                    fog: false
                },
                {
                    block_type: 0,
                    block_rotation: 2,
                    fog: false
                }
            ],
            [
                {
                    block_type: 4,
                    block_rotation: 3,
                    fog: false
                },
                {
                    block_type: 4,
                    block_rotation: 0,
                    fog: false
                },
                {
                    block_type: 4,
                    block_rotation: 1,
                    fog: false
                }
            ]
        ]
    }
})