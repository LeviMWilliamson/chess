class WhiteRook extends Rook {
    constructor( ctx, board, tile ) {
        super( ctx, board, tile, new WhiteTeam() )
    }
}