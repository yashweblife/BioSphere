package aafastaseqfilter

// import "github.com/yashweblife/BioSphere/go/FastaPoint"
import (
	"fmt"
	"io/ioutil"
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

func WriteDataToFile(data string, filename string) {}

func GetSimilarityScore(seq1 string, seq2 string) int {}

func SequenceFilter(filename string) {
	fp := FastaPoint.NewFastaPoint("", "")
}
