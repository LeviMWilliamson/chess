class Tile {
    constructor( ctx, x, y, length, color, column, row) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.length = length
        this.color = color
        this.column = column
        this.row = row
    }

    set highlighted( highlighted ) {
        if( highlighted ) {
            this.effectsColor = this.ctx.createRadialGradient(this.x + this.length/2, this.y + this.length/2, this.length/16, this.x + this.length/2, this.y + this.length/2, this.length)
            this.effectsColor.addColorStop(0, 'rgba(25, 25, 255, 1)')
            this.effectsColor.addColorStop(1, 'rgba(25, 25, 255, 0)')
        }
        else
            this.effectsColor = null
    }


    set piece( piece ) {
        assert( piece instanceof Piece, "Tile.piece must be a Piece object." )
        piece.x = this.x + this.length/2 - piece.length/2
        piece.y = this.y + this.length/2 - piece.length/2
        this._Piece = piece
    }
    get piece() {
        return this._Piece
    }

    render() {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect( this.x, this.y, this.length, this.length )
        if(this.effectsColor) {
            this.ctx.fillStyle = this.effectsColor
            this.ctx.fillRect( this.x, this.y, this.length, this.length )
            this.ctx.strokeWidth = '1px'
            this.ctx.strokeStyle = 'blue'
            this.ctx.strokeRect( this.x+1, this.y+1, this.length-2, this.length-2 )
        }
        if( this.piece )
            this.piece.render()
    }
}