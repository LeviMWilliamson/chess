class BlackBishop extends Bishop {
    constructor( ctx, board, tile ) {
        super( ctx, board, tile, new BlackTeam() )
    }
}