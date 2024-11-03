package aafastaseqfilter

import (
	"testing"
)

func TestSequenceFilter(t *testing.T) {
	err := SequenceFilter("test_data/test_data_align.fas", 0.95)
	if err != nil {
		t.Error(err)
	}
	t.Log("Test passed")
}

func BenchmarkSequenceFilter(b *testing.B) {
	err := SequenceFilter("test_data/test_data_align.fas", 0.95)
	if err != nil {
		b.Error(err)
	}
	b.Log("Test passed")
}
