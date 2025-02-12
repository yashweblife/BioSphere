import { resolve } from 'node:path';
import FastaPoint from "../../lib/FastaPoint";
import { file } from 'bun';
const PERCENTAGE = 0.995

export async function getDataFromFile(path: string){
    const p = resolve(__dirname,"../../TEST_DATA",path)
    const files = Bun.file(p);
    if(!files){
        console.log("NO FILE FOUND");
        return;
    }
    const data = await files.text();
    if(!data){
        console.log("NO DATA");
        return;
    }
    console.log("Found Data");
    console.log("Starting File Breakdown");
    //split fasta on >
    const initial_split = data.split('>');
    const initial_len = initial_split.length-1;
    const fasta_points = [];
    for(let i=0;i<initial_split.length;i++){
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`Reading Progress: ${i}/${initial_len}`);
        const val = initial_split[i].indexOf('\n')
        if(val !== -1){
            const fp = new FastaPoint(initial_split[i].substring(0,val),initial_split[i].substring(val+1));
            fasta_points.push(fp);
        }
    }
    return fasta_points.filter(x => !x.sequence.includes('XXXXXXXXX') && !x.sequence.includes('nnnnnnnnnn'));
}

export async function writeDataToFile(data: string, path: string = `./output-${new Date().getTime()}.fasta`){
    console.log("Writing to:", path);
    await Bun.write(resolve(__dirname,"../../OUTPUT_DATA")+"/"+path, data);
} 

export async function SequenceFilter(fileName:string = './test_data/test_data_align.fas'){
    const start_time = performance.now();
    // console.log("\n\n\nSTART");
    const fasta_points = await getDataFromFile(fileName);
    if(!fasta_points){
        return;
    }
    let filtered_data = [...fasta_points]
    for(let i=0;i<filtered_data.length;i++){
        let test_point = filtered_data[i];
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`Filter Progress: ${i}/${filtered_data.length-1}`);
        // console.log("\n\nTESTING:", test_point.header);
        for(let j=0;j<filtered_data.length;j++){
            if(i === j){
                continue
            }
            let compare_point = filtered_data[j];
            // console.log("-------------------------\nCOMPARING:\t", compare_point.header);
            let score = get_similarity_score(test_point.sequence,compare_point.sequence)
            let th = Math.round(test_point.sequence.length * PERCENTAGE)
            // console.log("SCORE:", score, "/", th);
            if(score >= th){
                const temp = filtered_data.splice(j,1);
                // console.log("REMOVING:", temp[0].header);
                j--;
            }
        }
    }
    // console.log("\n\n\nEND");
    let output = "";
    for(let i=0;i<filtered_data.length;i++){
        output += filtered_data[i].toString() + "\n";
    }
    const outputFileName = `./sequence_filter_output-${new Date().getTime()}.fasta`
    console.log("Input File Name: ", fileName);
    console.log("Output File Name: ", outputFileName);
    await writeDataToFile(output, outputFileName);
    const end_time = performance.now();
    console.log("SequenceFilter Time taken:", end_time - start_time, "ms");
}
export async function SequenceFilter1(fileName:string = './test_data/test_data_align.fas'){
    const start_time = performance.now();
    console.log("\n\n\nSTART");
    const fasta_points = await getDataFromFile(fileName);
    let filtered_data = [...fasta_points!].slice(0,5);
    console.log(filtered_data.length);
    function test(arr:FastaPoint[], index=0){
        if(index === arr.length){
            return arr
        }
        console.log("PIVOT:\t", arr[index].header);
        const pivot = arr[index];
        for(let i=index+1;i<arr.length;i++){
            console.log("COMPARING TO:\t", arr[i].header);
            const sim = get_similarity_score(pivot.sequence,arr[i].sequence);
            const th = Math.round(pivot.sequence.length * PERCENTAGE);
            console.log("SCORE:\t", sim, "/", th);
            if(sim >= th){
                console.log("REMOVING:", arr[i].header);
                arr.splice(i,1);
            }
        }
        test(arr, index+1);
    }
    return;
    const output_arr:FastaPoint[] = test(filtered_data) || [];
    console.log(output_arr);
    console.log("\n\n\nEND");
    let output = output_arr.map(x => x.toString()).join("\n");
    for(let i=0;i<filtered_data.length;i++){
        output += filtered_data[i].toString() + "\n";
    }
    await writeDataToFile(output, `./sequence_filter_1_output-${new Date().getTime()}.fasta`);
    const end_time = performance.now();
    console.log("SequenceFilter1Time taken:", end_time - start_time, "ms");
}


function get_similarity_score(seq1: string, seq2: string){
    let score = 0;
    for(let i=0;i<seq1.length;i++){
        if(seq1[i] === seq2[i]){
            score++;
        }
    }
    return score
}