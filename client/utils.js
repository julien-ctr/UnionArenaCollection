module.exports = {
    getEstimateNumber: function(){
        const seriesList = require('./series.json');
        
        console.log(seriesList);
        const initialValue = 0;
        let total = seriesList.reduce(
            (accumulator, currentValue) => {
                return accumulator + 120*2+15*2;
            },
            initialValue,
        )
        
        return total;
    },
    
    progressBar: function(barSize, maxValue, currentValue){
        let string = '[';
        const blocks = parseInt(barSize * currentValue/maxValue);
        
        for (let i = 0; i < blocks; i++){
            string += '█';
        }
        
        for (let i = blocks; i < barSize; i++){
            string += ' ';
        }
        string += ']';
        
        console.log(string);
    },
    
    clearTerminal: function(){
        process.stdout.write('\x1Bc');
    }
}
