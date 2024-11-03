export default class FastaPoint {
    constructor(public header: string, public sequence: string) {
    }

    toString(){
        return ">"+this.header + "\n" + this.sequence
    }
} 