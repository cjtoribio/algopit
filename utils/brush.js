var colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
};
function colorize(txt, color){
	return '\033[' + colors[color][0] + 'm' + txt + '\033[' + colors[color][1] + 'm';

}

var obj = {
	colorize: colorize,
    pallette: function(){
        for(var name in colors){
            console.log(colorize(name, name));
        }
    }
};
for(var name in colors){
	var color = colors[name];
	obj[name] = function(txt){
		return colorize(txt, this.name);
	}.bind({
		name: name
	});
}

module.exports = obj;