class Board {

    constructor( ctx ) {
        this.ctx = ctx

        this.selected = null
        this.turn = 'black'
        // Defaults
        this.colors = ['black', 'white']
        // width in tiles
        this.width = 8
        // height in tiles
        this.height = 8
        // length in Pixels
        this.tileLength = 64
        // Position
        this.x = window.innerWidth/2 - ( this.width * this.tileLength )/2
        this.y = window.innerHeight/2 - ( this.height * this.tileLength )/2
        // Place tiles
        this.tiles = []
        for(let i=0; i<this.width; i++) {
            this.tiles.push( new Array(this.height) )
            // Colors alternate on every placement
            for(let j=0; j<this.height; j++)
                this.tiles[i][j] = new Tile( ctx, this.x + i*this.tileLength, this.y + j*this.tileLength, this.tileLength, this.colors[ (i+j)%2 ], i, j)
        }
        canvas.addEventListener('click', mouseEvent => {
            const col = Math.floor( (mouseEvent.clientX - this.x) / this.tileLength )
            const row = Math.floor( (mouseEvent.clientY - this.y) / this.tileLength )

            if( col >= 0 && col < this.width && row >= 0 && row < this.height ) {
                const tile = this.tiles[col][row]
                if( tile.piece instanceof Piece ) {
                    
                    if(!this.selected) {
                        this.selected = tile.piece
                        for( let row of this.tiles ) {
                            for( let tile of row ) {
                                tile.highlighted = false
                                tile.render()
                            }
                        }
                        tile.highlighted = true
                        tile.render()
                        const moves = tile.piece.potentialMoves
                        const passive_moves = [ ...moves.move, ...moves.doubleStep ]
                        for( let move of passive_moves) {
                            let move_tile = this.tiles[ move[0] ][ move[1] ]
                            move_tile.highlighted = true
                            move_tile.render()
                        }
                    }

                }
                else {
                    if(this.selected) {
                        const moves = this.selected.potentialMoves
                        const passive_moves = [ ...moves.move, ...moves.doubleStep ]
                        const tile_is_move = passive_moves.find( 
                            ([move_col, move_row]) => move_col == col && move_row == row )
                        if( tile_is_move ) {
                            this.movePiece(this.selected, col, row)
                            this.selected = null
                            for( let row of this.tiles ) {
                                for( let tile of row ) {
                                    tile.highlighted = false
                                    tile.render()
                                }
                            }
                            this.render()
                        }
                    }
                }
            }
            else {
                this.selected = null
                for( let row of this.tiles ) {
                    for( let tile of row ) {
                        tile.highlighted = false
                        tile.render()
                    }
                }
            }
        })
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

    /**
     * Moves piece to tile
     */
    movePiece( piece, tile_col, tile_row ) {
        assert( tile_col >= 0 && tile_col < this.width, "Attempted to move piece horizontally off the board." )
        assert( tile_row >= 0 && tile_row < this.height, "Attempted to move piece vertically off the board." )
        const tile = this.tiles[tile_col][tile_row]
        tile.piece = piece
        piece.tile = tile
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