import { getDataFromFile, SequenceFilter } from "./Projects/AA_Fasta_Seq_Filter";
const FILE_NAME = "H5_PB2_prep_MAFFT.fasta";
// const TEST_FILES = ["H5_PB2_all_212_Copy.fasta", "test_data_align.fas", "2024_11_02_TestAlignment.fas"]
// TEST_FILES.forEach(file => SequenceFilter(file));
SequenceFilter(FILE_NAME);
