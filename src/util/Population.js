class Population extends Array {
    get even() {
        return this.length % 2 === 0;
    };

    get odd() {
        return !this.even;
    };

    get avarage() {
        return Population.avarage(...this);
    };

    get mean() {
        return this.avarage;
    };

    get median() {
        let even = this.even;
        let length = this.length;
        let sorted = this.sorted();

        if (even)
            return Population.avarage(sorted[(length / 2) - 1], sorted[(length / 2)])
            return sorted[(length - 1) / 2];
    };
    
    sorted(callback = (a, b) => b - a) {
        return [...this].sort(callback);
    };

    get avarageAbsoluteDeviation() {

        let mean = this.mean;
        let length = this.length;

        let distancesMap = this.map(dataPoint => Math.abs(dataPoint - mean));
        let avarageDistance = distancesMap.reduce((a, b) => a + b) / length;

        return avarageDistance;
    };

    get standardDeviation() {

        let mean = this.mean;
        let length = this.length;
        
        let squaresMap = this.map(dataPoint => (dataPoint - mean) ** 2);
        let avarageSquare = squaresMap.reduce((a, b) => a + b) / length;

        return Math.sqrt(avarageSquare);
    };

    static avarage(...elements) {
        return elements.reduce((a, b) => a + b) / elements.length;
    };
};

export default Population;