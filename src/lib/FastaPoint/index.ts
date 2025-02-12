import { resolve } from "node:path";

export default class FastaPoint {
    constructor(public header: string, public sequence: string) {
    }
    toString() {
        return ">" + this.header + "\n" + this.sequence
    }
    at(index: number) {
        return this.sequence[index]
    }
    static async fromFile(path: string) {
        const p = resolve(__dirname, "..", "..", "TEST_DATA", path)
        console.log(p)
        const files = Bun.file(p);
        const data = await files.text();
        //split fasta on >
        const initial_split = data.split('>');
        const fasta_points = [];
        for (let i = 0; i < initial_split.length; i++) {
            const val = initial_split[i].indexOf('\n')
            if (val !== -1) {
                const head = initial_split[i].substring(0, val).replace("\r", "");
                const seq = initial_split[i].substring(val + 1).replace("\r\n", "");
                const fp = new FastaPoint(head, seq);
                fasta_points.push(fp);
            }
        }
        return fasta_points
    }
} 