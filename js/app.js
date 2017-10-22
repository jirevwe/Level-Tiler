Vue.use(vueClipboard)

const app = new Vue({
    el: '#app',
    components: {
        'board': Board,
        'tile': Tile,
        'modal-item': Modal
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
        },
        exportLevel() {
            this.$emit('modal:show', {
                title: 'Current Level',
                body: this.syntaxHighlight(this.tiles)
            })
        },
        syntaxHighlight(json) {
            if (typeof json != 'string') {
                 json = JSON.stringify(json, undefined, 2);
            }
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
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