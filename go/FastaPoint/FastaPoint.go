package FastaPoint

type FastaPoint struct {
	Header   string
	Sequence string
}

func (p FastaPoint) ToString() string {
	return ">" + p.Header + "\n" + p.Sequence
}

func NewFastaPoint(header string, sequence string) FastaPoint {
	return FastaPoint{Header: header, Sequence: sequence}
}

func (p FastaPoint) GetLength() int {
	return len(p.Sequence)
}
