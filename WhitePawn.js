class WhitePawn extends Pawn {
    constructor( ctx, board, tile ) {
        super( ctx, board, tile, new WhiteTeam() )
    }

    get moveSet() {
        return {
            move: [
                [0, -1]
            ],
            attack: [
                [1, -1],
                [-1, -1]
            ],
            doubleStep: [
                [0, -2]
            ],
            enPassant: [
                [1, -1],
                [-1, -1]
            ]
        }
    }

    get potentialMoves() {

        let moveset = this.moveSet
        let actions = {}

        const translateMap = coords => 
            coords.map( 
                ([col, row]) => 
                    ([col + this.tile.column, row + this.tile.row]) 
            )

        const validFilter = coords => 
            coords.filter( 
                ([col, row]) => 
                    this.board.validTile(col, row) 
            )
    
        actions.move =  validFilter(translateMap(moveset.move)).filter( 
            ([col, row]) => 
                !this.board.viewTile(col, row).piece
        )
        actions.attack = validFilter(translateMap(moveset.attack)).filter( 
            ([col, row]) => 
                this.board.viewTile(col, row).piece instanceof Piece 
        )

        if( this.tile.row == 6 ) {
            actions.doubleStep = validFilter(translateMap(moveset.doubleStep)).filter( 
                ([col, row]) => 
                    !board.viewTile(col, row).piece
            )
        }
        else
            actions.doubleStep = []

        if( this.tile.row == 3 )
            actions.enPassant = validFilter(translateMap(moveset.enPassant)).filter( 
                ([col, row]) => {
                    const adjacent_tile = board.viewTile(col, row+1)
                    console.log(adjacent_tile)
                    if( adjacent_tile.piece instanceof BlackPawn && adjacent_tile.piece.doubleStepped )
                        return !board.viewTile(col, row).piece
                    else 
                        return false
                }
            )
        else
            actions.enPassant = []

        return actions
    }
}