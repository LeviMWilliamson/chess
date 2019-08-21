class Tile {
    constructor( x, y, length, color) {
        this.X = x
        this.Y = y
        this.Length = length
        this.Color = color
    }

    set Piece( piece ) {
        assert( piece instanceof Piece, "Tile.Piece must be a Piece object." )
        piece.X = this.X + this.Length/2 - piece.Length/2
        piece.Y = this.Y + this.Length/2 - piece.Length/2
        this._Piece = piece
    }
    get Piece() {
        return this._Piece
    }

    render( ctx ) {
        ctx.fillStyle = this.Color
        ctx.fillRect( this.X, this.Y, this.Length, this.Length )
        if( this.Piece )
            this.Piece.render( ctx )
    }
}