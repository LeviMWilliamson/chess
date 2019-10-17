class Bishop extends Piece {
    constructor( ctx, board, tile, team ) {
        super(ctx, board, tile, team)
        this.length = this.tile.length/2
    }

    render() {
        let primary = `hsl(${this.team.hue}, 32%, 50%)`
        let secondary = `hsl(${this.team.hue}, 16%, 25%)`
        this.ctx.fillStyle = primary
        this.ctx.strokeStyle = secondary
        this.ctx.lineWidth = this.length/16

        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/2, 0, 2*Math.PI, true )
        this.ctx.closePath()
        this.ctx.fill()
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/4, 0, 2*Math.PI, true )
        this.ctx.closePath()
        this.ctx.stroke()

        this.ctx.fillStyle = secondary
        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/12, 0, 2*Math.PI, true )
        this.ctx.closePath()
        this.ctx.fill()

        this.ctx.fillStyle = primary
        this.ctx.beginPath()
        this.ctx.moveTo( this.x + this.length/2 + (this.length/4 * Math.cos( Math.PI*9/4 )), this.y + this.length/2 + (this.length/4 * Math.sin( Math.PI*9/4 )) )
        this.ctx.lineTo( this.x + this.length/2, this.y + this.length/2 )
        this.ctx.closePath()
        this.ctx.stroke()
    }
 
    get potentialMoves() {

        let actions = {}
        actions.move = []
        actions.attack = []

        // Look to top-left
        var max = Math.min( this.tile.column, this.tile.row )
        for( let i = 0; i >= max; i-- ) {
            const tile = this.board.viewTile( this.tile.column + i, this.tile.row + i )
            // If we run into a piece, we can either attack it (enemy piece), or terminate the path
            if( tile.hasPiece() ) {
                if( !(tile.piece.team instanceof this.team.constructor) )
                    actions.attack.push([this.tile.column + i, this.tile.row + i])

                break
            }
            else
                actions.move.push([this.tile.column + i, this.tile.row + i])
        }

        // Look to top-right
        var max = Math.max( this.board.width - this.tile.column, this.tile.row )
        for( let i = 0; i <= max; i++ ) {
            const tile = this.board.viewTile(this.tile.column + i, this.tile.row - i)
            // If we run into a piece, we can either attack it (enemy piece), or terminate the path
            if( tile.hasPiece() ) {
                if( !(tile.piece.team instanceof this.team.constructor) )
                    actions.attack.push([this.tile.column + i, this.tile.row + i])

                break
            }
            else
                actions.move.push([this.tile.column + i, this.tile.row + i])
        }
        // Look bot-left
        var max = Math.max( this.tile.column, this.board.height - this.tile.row )
        for( let i = 0; i <= max; i++ ) {
            const tile = this.board.viewTile(this.tile.column + i, this.tile.row - i)
            // If we run into a piece, we can either attack it (enemy piece), or terminate the path
            if( tile.hasPiece() ) {
                if( !(tile.piece.team instanceof this.team.constructor) )
                    actions.attack.push([this.tile.column + i, this.tile.row + i])

                break
            }
            else
                actions.move.push([this.tile.column + i, this.tile.row + i])
        }
        // Look bot-right
        var max = Math.max( this.board.width - this.tile.column, this.board.height - this.tile.row )
        for( let i = 0; i <= max; i++ ) {
            const tile = this.board.viewTile(this.tile.column + i, this.tile.row + i)
            // If we run into a piece, we can either attack it (enemy piece), or terminate the path
            if( tile.hasPiece() ) {
                if( !(tile.piece.team instanceof this.team.constructor) )
                    actions.attack.push([this.tile.column + i, this.tile.row + i])

                break
            }
            else
                actions.move.push([this.tile.column + i, this.tile.row + i])
        }
        

        return actions
    }
}