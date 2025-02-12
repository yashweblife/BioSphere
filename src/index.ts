import { getDataFromFile, SequenceFilter, writeDataToFile } from "./Projects/AA_Fasta_Seq_Filter";
const FILE_NAME = "H5_HA_Nuc_MAFFT.fasta";
import FastaPoint from "./lib/FastaPoint"

SequenceFilter(FILE_NAME);
// async function test(){
//     const data = await FastaPoint.fromFile(FILE_NAME)
//     data.forEach(x => {
//         if(x.at(108) == "I"){
//             x.header = x.header.concat("V109I");
//             console.log(x.header)
//         }
//     })
//     let output = "";
//     data.forEach(x => {
//         output += x.toString() + "\n";
//     })
//     writeDataToFile(output, `./sequence_filter_output-${new Date().getTime()}.fasta`);
// }

//emu b