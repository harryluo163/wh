function Map() {
    this.entries = []
}
Map.prototype = {
    put: function (e, t) {
        for (var i = this.entries.length, n = 0; i > n; n++)if (this.entries[n].key == e)return void(this.entries[n].value = t);
        this.entries[i] = {key: e, value: t}
    }, get: function (e) {
        for (var t = this.entries.length, i = 0; t > i; i++)if (this.entries[i].key == e)return this.entries[i].value;
        return null
    }
};