//main source file
//this is a bit messy, just want to get everything running

//some sample data we'll be using
//http://www.cise.ufl.edu/~ddd/cap6635/Fall-97/Short-papers/2.htm
// Day, Outlook, Temperature, Humidity, Wind, Play ball

// D1	Sunny	Hot	High	Weak	No
// D2	Sunny	Hot	High	Strong	No
// D3	Overcast	Hot	High	Weak	Yes
// D4	Rain	Mild	High	Weak	Yes
// D5	Rain	Cool	Normal	Weak	Yes
// D6	Rain	Cool	Normal	Strong	No
// D7	Overcast	Cool	Normal	Strong	Yes
// D8	Sunny	Mild	High	Weak	No
// D9	Sunny	Cool	Normal	Weak	Yes
// D10	Rain	Mild	Normal	Weak	Yes
// D11	Sunny	Mild	Normal	Strong	Yes
// D12	Overcast	Mild	High	Strong	Yes
// D13	Overcast	Hot	Normal	Weak	Yes
// D14	Rain	Mild	High	Strong	No

window.examples = [
{day:'D1',outlook:'Sunny', temp:'Hot', humidity:'High', wind: 'Weak',play:'No'},
{day:'D2',outlook:'Sunny', temp:'Hot', humidity:'High', wind: 'Strong',play:'No'},
{day:'D3',outlook:'Overcast', temp:'Hot', humidity:'High', wind: 'Weak',play:'Yes'},
{day:'D4',outlook:'Rain', temp:'Mild', humidity:'High', wind: 'Weak',play:'Yes'},
{day:'D5',outlook:'Rain', temp:'Cool', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D6',outlook:'Rain', temp:'Cool', humidity:'Normal', wind: 'Strong',play:'No'},
{day:'D7',outlook:'Overcast', temp:'Cool', humidity:'Normal', wind: 'Strong',play:'Yes'},
{day:'D8',outlook:'Sunny', temp:'Mild', humidity:'High', wind: 'Weak',play:'No'},
{day:'D9',outlook:'Sunny', temp:'Cool', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D10',outlook:'Rain', temp:'Mild', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D11',outlook:'Sunny', temp:'Mild', humidity:'Normal', wind: 'Strong',play:'Yes'},
{day:'D12',outlook:'Overcast', temp:'Mild', humidity:'High', wind: 'Strong',play:'Yes'},
{day:'D13',outlook:'Overcast', temp:'Hot', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D14',outlook:'Rain', temp:'Mild', humidity:'High', wind: 'Strong',play:'No'}
]

window.examples = _(window.examples)

var entropyForVar = function(set,val,target){
    
}

var gainForVar = function(set,val,target){
    
}

var highestGain = function(set,possible_vars){

}
