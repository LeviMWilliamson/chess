class Board {

    constructor() {
        // Defaults
        this.Colors = ['black', 'white']
        // Width in Tiles
        this.Width = 8
        // Height in Tiles
        this.Height = 8
        // Length in Pixels
        this.TileLength = 64
        this.X = window.innerWidth/2 - ( this.Width * this.TileLength )/2
        this.Y = window.innerHeight/2 - ( this.Height * this.TileLength )/2
        //Place Tiles
        this.Tiles = []
        for(let i=0; i<this.Width; i++) {
            this.Tiles.push( new Array(this.Height) )
            // Colors alternate on every placement
            for(let j=0; j<this.Height; j++)
                this.Tiles[i][j] = new Tile( this.X + i*this.TileLength, this.Y + j*this.TileLength, this.TileLength, this.Colors[ (i+j)%2 ])
        }
    }

    /**
     * @param X The horizontal location of the Chess-Board on the canvas.
     */
    set X( x ) {
        assert( typeof x == 'number', "Board.X must be a scalar value." )
        this._X = x
    }
    get X() {
        return this._X
    }

    /**
     * @param Y The vertical location of the Chess-Board on the canvas.
     */
    set Y( y ) {
        assert( typeof y == 'number', "Board.Y must be a scalar value." )
        this._Y = y
    }
    get Y() {
        return this._Y;
    }

    /**
     * @param Width The width of the board in tiles.
     */
    set Width( width ) {
        assert( typeof width == 'number', "Board.Width must be a scalar value." )
        assert( width >= 1, "Board.Width must be at least 1." )
        this._Width = width
    }
    get Width() {
        return this._Width
    }

    /**
     * @param Height The height of the board in tiles.
     */
    set Height( height ) {
        assert( typeof height == 'number', "Board.Height must be a scalar value." )
        assert( height >= 1, "Board.Height must be at least 1." )
        this._Height = height
    }
    get Height() {
        return this._Height
    }

    /**
     * @param TileLength Length of each tile (both vertical and horizontal) in pixels.
     */
    set TileLength( tile_length ) {
        assert( typeof tile_length == 'number', "Board.TileLength must be a scalar value." )
        assert( tile_length >= 1, "Board.TileLength must be at least 1." )
        this._TileLength = tile_length
    }
    get TileLength() {
        return this._TileLength;
    }

    viewTile( tile_col, tile_row ) {
        assert( tile_col >= 0 && tile_col < this.Width, "Attempted to access a tile index greater than board's width." )
        assert( tile_row >= 0 && tile_row < this.Height, "Attempted to access a tile index greater than board's height." )
        return this.Tiles[tile_col][tile_row]
    }

    /**
     * Moves piece to tile
     */
    movePiece( piece, tile_col, tile_row ) {
        assert( tile_col >= 0 && tile_col < this.Width, "Attempted to move piece horizontally off the board." )
        assert( tile_row >= 0 && tile_row < this.Height, "Attempted to move piece vertically off the board." )
        this.Tiles[tile_col][tile_row].Piece = piece
    }

    /**
     * @output Draws the board onto the canvas.
     */
    render( ctx ) {
        // Outline the board
        ctx.strokeStyle = 'black'
        ctx.strokeRect( this.X, this.Y, this.Width * this.TileLength , this.Height * this.TileLength )

        this.Tiles.forEach( col => 
            col.forEach( tile => tile.render( ctx ) ) 
        )
    }

    clear( ctx ) {
        ctx.clearRect( this.X, this.Y, this.Width, this.Height )
    }
}