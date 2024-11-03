package aafastaseqfilter

// import "github.com/yashweblife/BioSphere/go/FastaPoint"
import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	FastaPoint "github.com/yashweblife/BioSphere/go/FastaPoint"
)

func GetDataFromFile(filename string) ([]FastaPoint.FastaPoint, error) {
	data, err := os.ReadFile(filename)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	initial_split := strings.Split(string(data), ">")
	if initial_split[0] == "" {
		initial_split = initial_split[1:]
	}
	fasta_points := []FastaPoint.FastaPoint{}
	for i := 0; i < len(initial_split); i++ {
		val := strings.Index(initial_split[i], "\n")
		if val != -1 {
			header := initial_split[i][:val]
			sequence := initial_split[i][val+1:]
			fasta_points = append(fasta_points, FastaPoint.NewFastaPoint(header, sequence))
		}
	}
	return fasta_points, nil
}

func WriteDataToFile(data string, filename string) error {
	err := os.WriteFile(filename, []byte(data), 0644)
	return err
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

func SequenceFilter(filename string, PERCENTAGE float64) error {
	fasta_points, err := GetDataFromFile(filename)
	if err != nil {
		fmt.Println(err)
		return err
	}
	for i := 0; i < len(fasta_points); i++ {
		test_point := fasta_points[i]
		for j := 0; j < len(fasta_points); j++ {
			if i == j {
				continue
			}
			th := int(PERCENTAGE * float64(len(test_point.Sequence)))
			score := GetSimilarityScore(test_point.Sequence, fasta_points[j].Sequence)
			fmt.Println("Comapring", test_point.Header)
			fmt.Println("Score:", score, "/", th)

			if score >= th {
				fmt.Println("Removing", fasta_points[j].Header)
				fasta_points = append(fasta_points[:j], fasta_points[j+1:]...)
				j--
			}
		}
	}
	output := ""
	for i := 0; i < len(fasta_points); i++ {
		output += fasta_points[i].ToString() + "\n"
	}
	err = WriteDataToFile(output, "output"+strconv.FormatInt(time.Now().Unix(), 10)+".fasta")
	return err
}
