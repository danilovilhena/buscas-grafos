class Vertex {
    constructor(label) {
        this.label = label
        this.edges = {}
    }

    getNeighbours() { return this.edges }

    isNeighbourOf(neighbourLabel) {
        if (this.edges !== undefined && neighbourLabel in this.edges) return true;
        return false;
    }
}

module.exports = { Vertex }