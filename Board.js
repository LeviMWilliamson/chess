class Board {

    constructor( ctx ) {
        this.ctx = ctx
        // Defaults
        this.colors = ['black', 'white']
        // width in tiles
        this.width = 8
        // height in tiles
        this.height = 8
        // length in Pixels
        this.tileLength = 64
        // Position
        this.x = 0
        this.y = 0
        // Place tiles
        this.tiles = []
        for(let i=0; i<this.width; i++) {
            this.tiles.push( new Array(this.height) )
            // Colors alternate on every placement
            for(let j=0; j<this.height; j++)
                this.tiles[i][j] = new Tile( ctx, this.x + i*this.tileLength, this.y + j*this.tileLength, this.tileLength, this.colors[ (i+j)%2 ], i, j)
        }
    }

    /**
     * @param x The horizontal location of the Chess-Board on the canvas.
     */
    set x( x ) {
        assert( typeof x == 'number', "Board.x must be a scalar value." )
        this._X = x
    }
    get x() {
        return this._X
    }

    /**
     * @param y The vertical location of the Chess-Board on the canvas.
     */
    set y( y ) {
        assert( typeof y == 'number', "Board.y must be a scalar value." )
        this._Y = y
    }
    get y() {
        return this._Y;
    }

    /**
     * @param width The width of the board in tiles.
     */
    set width( width ) {
        assert( typeof width == 'number', "Board.width must be a scalar value." )
        assert( width >= 1, "Board.width must be at least 1." )
        this._Width = width
    }
    get width() {
        return this._Width
    }

    /**
     * @param height The height of the board in tiles.
     */
    set height( height ) {
        assert( typeof height == 'number', "Board.height must be a scalar value." )
        assert( height >= 1, "Board.height must be at least 1." )
        this._Height = height
    }
    get height() {
        return this._Height
    }

    /**
     * @param tileLength length of each tile (both vertical and horizontal) in pixels.
     */
    set tileLength( tile_length ) {
        assert( typeof tile_length == 'number', "Board.tileLength must be a scalar value." )
        assert( tile_length >= 1, "Board.tileLength must be at least 1." )
        this._TileLength = tile_length
    }
    get tileLength() {
        return this._TileLength;
    }

    validTile( tile_col, tile_row ) {
        return tile_col >= 0 && tile_col < this.width && tile_row >= 0 && tile_row < this.height
    }

    viewTile( tile_col, tile_row ) {
        assert( tile_col >= 0 && tile_col < this.width, "Attempted to access a tile index greater than board's width." )
        assert( tile_row >= 0 && tile_row < this.height, "Attempted to access a tile index greater than board's height." )
        return this.tiles[tile_col][tile_row]
    }

    tileFromCoordinates(x, y) {
        const col = Math.floor( (x - this.x) / this.tileLength )
        const row = Math.floor( (y - this.y) / this.tileLength )
        if( this.validTile(col, row) )
            return this.tiles[col][row]
        else
            return null
    }

    /**
     * Moves piece to tile
     */
    movePiece( piece, tile) {
        assert( piece instanceof Piece, "Attempted to move an object that is not a piece." )
        assert( tile instanceof Tile, "Attempted to move a piece to an object other than a tile." )

        const old_tile = piece.tile
        old_tile.piece = null

        tile.piece = piece
        piece.tile = tile

        tile.render()
        old_tile.render()
    }

    /**
     * Removes highlighting from every tile
     */
    removeHighlights() {
        for( let row of this.tiles ) {
            for( let tile of row ) {
                tile.highlighted = false
            }
        }
    }

    /**
     * @output Draws the board onto the canvas.
     */
    render() {
        // Draw the tiles
        this.tiles.forEach( col => 
            col.forEach( tile => tile.render() ) 
        )
        // Outline the board
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect( this.x, this.y, this.width * this.tileLength , this.height * this.tileLength )
    }

    clear() {
        this.ctx.clearRect( this.x, this.y, this.width, this.height )
    }
}