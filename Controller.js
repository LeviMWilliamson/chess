class Controller {
    constructor( canvas, board ) {
        this.canvas = canvas
        this.board = board

        this.selected = null
        this.turn = 'white'

        this.init()
    }
    init() {
        this.board.render()
        this.canvas.addEventListener('click', mouseEvent => {
            const tile = this.board.tileFromCoordinates( mouseEvent.clientX, mouseEvent.clientY )
            if( tile ) {

                if( tile.hasPiece() ) {
                    if( this.selected && this.turn != tile.piece.team.name ) {
                        const moves = this.selected.potentialMoves
                        const attack_moves = [...moves.attack, ...(moves.enPassant?moves.enPassant:[])]
                        const tile_attackable = attack_moves.find( 
                            ([move_col, move_row]) => move_col == tile.column && move_row == tile.row 
                        )
                        if( tile_attackable ) {
                            this.board.movePiece(this.selected, tile)
                            this.deselect()
                        }
                    }
                    else {
                        if( tile.piece.team.name == this.turn ) {
                            this.selected = tile.piece
                            this.board.removeHighlights()
                            tile.highlighted = true

                            const moves = tile.piece.potentialMoves
                            const passive_moves = [ ...moves.move, ...(moves.doubleStep?moves.doubleStep:[]) ]
                            const attack_moves = [ ...moves.attack, ...(moves.enPassant?moves.enPassant:[]) ]
                            for( let move of [...passive_moves, ...attack_moves] )
                                this.board.tiles[ move[0] ][ move[1] ].highlighted = true
                        }
                    }

                }
                else {
                    if( this.selected ) {
                        const moves = this.selected.potentialMoves
                        const passive_moves = [ ...moves.move, ...(moves.doubleStep?moves.doubleStep:[]) ]
                        const tile_is_move = passive_moves.find( 
                            ([move_col, move_row]) => move_col == tile.column && move_row == tile.row 
                        )
                        if( tile_is_move ) {
                            this.board.movePiece(this.selected, tile)
                            this.deselect()
                        }
                    }
                }
            }
            else {
                this.deselect()
            }
            this.board.render()
        })
    }

    deselect() {
        this.selected = null
        this.board.removeHighlights()
    }
    
}