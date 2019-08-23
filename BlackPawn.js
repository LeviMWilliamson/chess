class BlackPawn extends Pawn {
    constructor( ctx, board, tile ) {
        super( ctx, board, tile, new BlackTeam() )
    }

    get moveSet() {
        return {
            move: [
                [0, 1]
            ],
            attack: [
                [1, 1],
                [-1, 1]
            ],
            doubleStep: [
                [0, 2]
            ],
            enPassant: [
                [1, 1],
                [1, -1]
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
            ([col, row]) => {
                let piece = this.board.viewTile(col, row).piece
                if(piece)
                    return !(piece.team instanceof this.team.constructor)
                else
                    return false
            }
        )

        if( this.tile.row == 1 ) {
            actions.doubleStep = validFilter(translateMap(moveset.doubleStep)).filter( 
                ([col, row]) => 
                    !board.viewTile(col, row).piece
            )
        }
        else
            actions.doubleStep = []

        if( this.tile.row == 4 )
            actions.enPassant = validFilter(translateMap(moveset.enPassant)).filter( 
                ([col, row]) => {
                    const adjacent_tile = board.viewTile(col-1, row)
                    if( adjacent_tile.piece instanceof WhitePawn && adjacent_tile.DoubleStepped )
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