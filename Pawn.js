class Pawn extends Piece {
    constructor( ctx, board, tile, team ) {
        super(ctx, board, tile, team)
        this.doubleStepped = false
        this.length = this.tile.length/2
    }

    render() {
        this.ctx.fillStyle = `hsl(${this.team.hue}, 32%, 50%)`
        this.ctx.strokeStyle = `hsl(${this.team.hue}, 16%, 25%)`
        this.ctx.lineWidth = this.length/16

        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/2, 0, 2*Math.PI, true )
        this.ctx.closePath()
        this.ctx.fill()
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length*1/2, this.y + this.length*1/2, this.length/4, 0, 2*Math.PI, true )
        this.ctx.closePath()
        this.ctx.stroke()
    }
}