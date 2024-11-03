package FastaPoint

import (
	"testing"
)

func TestFastaPoint(t *testing.T) {

	fp := NewFastaPoint("header", "sequence")

	if fp.ToString() != ">"+fp.Header+"\n"+fp.Sequence {
		t.Errorf("Expected %s, got %s", ">"+fp.Header+"\n"+fp.Sequence, fp.ToString())
	}
	if fp.GetLength() != len(fp.Sequence) {
		t.Errorf("Expected %d, got %d", len(fp.Sequence), fp.GetLength())
	}
}
