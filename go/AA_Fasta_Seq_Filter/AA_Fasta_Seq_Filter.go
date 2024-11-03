package aafastaseqfilter

// import "github.com/yashweblife/BioSphere/go/FastaPoint"
import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	FastaPoint "github.com/yashweblife/BioSphere/go/FastaPoint"
)

func GetDataFromFile(filename string) []FastaPoint.FastaPoint {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println(err)
	}
	initial_split := strings.Split(string(data), ">")
	fasta_points := []FastaPoint.FastaPoint{}

	for i := 1; i < len(initial_split); i++ {
		val := strings.Index(initial_split[i], "\n")
		if val != -1 {
			fasta_points = append(fasta_points, FastaPoint.NewFastaPoint(initial_split[i][:val], initial_split[i][val+1:]))
		}
	}
	return fasta_points
}

func WriteDataToFile(data string, filename string) {
	os.WriteFile(filename, []byte(data), 0644)
}

func GetSimilarityScore(seq1 string, seq2 string) int {
	if seq1 == seq2 {
		return len(seq1)
	}
	score := 0
	for i := 0; i < len(seq1); i++ {
		if seq1[i] == seq2[i] {
			score++
		}
	}
	return score
}

func SequenceFilter(filename string, PERCENTAGE float64) {
	fasta_points := GetDataFromFile(filename)
	for i := 0; i < len(fasta_points); i++ {
		test_point := fasta_points[i]
		for j := 0; j < len(fasta_points); j++ {
			if i == j {
				continue
			}
			th := int(PERCENTAGE * float64(len(test_point.Sequence)))
			if GetSimilarityScore(test_point.Sequence, fasta_points[j].Sequence) >= th {
				fasta_points = append(fasta_points[:j], fasta_points[j+1:]...)
				j--
			}
		}
	}
	output := ""
	for i := 0; i < len(fasta_points); i++ {
		output += fasta_points[i].ToString() + "\n"
	}
	WriteDataToFile(output, filename)
}
