//Vue.use(vueClipboard)

const app = new Vue({
    el: '#app',
    components: {
        'board': Board,
        'tile': Tile,
        'modal-item': Modal
    },
    methods: {
        doc() {
            return document;
        },
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
                body: JSON.stringify(this.tiles)
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
    },
    mounted() {
        this.$on("copy", (text) => {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
            document.execCommand("copy", )
        })
    }
})