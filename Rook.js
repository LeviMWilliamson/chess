class Rook extends Piece {
    constructor( ctx, board, tile, team ) {
        super(ctx, board, tile, team)
        this.length = this.tile.length/2
    }

    render() {
        this.ctx.fillStyle = `hsl(${this.team.hue}, 32%, 50%)`
        this.ctx.strokeStyle = `hsl(${this.team.hue}, 16%, 25%)`
        this.ctx.lineWidth = this.length/16

        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/2, 0, 2*Math.PI, true )
        this.ctx.closePath()
        this.ctx.fill()
        this.ctx.stroke()

        this.ctx.lineWidth = this.length/32
        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/5, 0, 2*Math.PI, true )
        this.ctx.closePath()
        this.ctx.stroke()

        this.ctx.lineWidth = this.length/12
        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/4, Math.PI/3, Math.PI/6, true )
        this.ctx.closePath()
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/4, -Math.PI/6, -Math.PI/3, true )
        this.ctx.closePath()
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/4, Math.PI*5/6, Math.PI*2/3, true )
        this.ctx.closePath()
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.arc( this.x + this.length/2, this.y + this.length/2, this.length/4, -Math.PI*2/3, -Math.PI*5/6, true )
        this.ctx.closePath()
        this.ctx.stroke()
    }

    get potentialMoves() {

        let actions = {}
        actions.move = []
        actions.attack = []

        // Look to the right
        for( let i = this.tile.column+1; i < this.board.width; i++ ) {
            const tile = this.board.viewTile(i, this.tile.row)
            // If we run into a piece, we can either attack it (enemy piece), or terminate the path
            if( tile.hasPiece() ) {
                if( !(tile.piece.team instanceof this.team.constructor) )
                    actions.attack.push([i, this.tile.row])

                break
            }
            else
                actions.move.push([i, this.tile.row])
        }
        // Look below
        for( let i = this.tile.row+1; i < this.board.height; i++ ) {
            const tile = this.board.viewTile(this.tile.column, i)
            // If we run into a piece, we can either attack it (enemy piece), or terminate the path
            if( tile.hasPiece() ) {
                if( !(tile.piece.team instanceof this.team.constructor) )
                    actions.attack.push([this.tile.column, i])

                break
            }
            else
                actions.move.push([this.tile.column, i])
        }
        // Look left
        for( let i = this.tile.column-1; i >= 0; i-- ) {
            const tile = this.board.viewTile(i, this.tile.row)
            // If we run into a piece, we can either attack it (enemy piece), or terminate the path
            if( tile.hasPiece() ) {
                if( !(tile.piece.team instanceof this.team.constructor) )
                    actions.attack.push([i, this.tile.row])

                break
            }
            else
                actions.move.push([i, this.tile.row])
        }
        // Look up
        for( let i = this.tile.row-1; i >= 0; i-- ) {
            const tile = this.board.viewTile(this.tile.column, i)
            // If we run into a piece, we can either attack it (enemy piece), or terminate the path
            if( tile.hasPiece() ) {
                if( !(tile.piece.team instanceof this.team.constructor) )
                    actions.attack.push([this.tile.column, i])

                break
            }
            else
                actions.move.push([this.tile.column, i])
        }
        

        return actions
    }
}