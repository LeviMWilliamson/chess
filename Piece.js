class Piece {
    constructor( x, y, length, hue ) {
        this.X = x;
        this.Y = y;
        this.Length = length
        this.Hue = hue;
    }
    
    /**
     * @param X The horizontal location of the Chess Piece on the canvas.
     */
     set X( x ) {
        assert( typeof x == 'number', "Board.X must be a scalar value." )
        this._X = x
    }
    get X() {
        return this._X
    }

    /**
     * @param Y The vertical location of the Chess Piece on the canvas.
     */
    set Y( y ) {
        assert( typeof y == 'number', "Board.Y must be a scalar value." )
        this._Y = y
    }
    get Y() {
        return this._Y;
    }

    /**
     * @param Length The size of the Chess Piece to be drawn.
     */
    set Length( length ) {
        assert( typeof length == 'number', "Piece.Length must be a scalar value." )
        assert( length > 0, "Piece.Length must be greater than zero." )
        this._Length = length
    }
    get Length() {
        return this._Length
    }

    render( ctx ) { }
}