
// period, comma, question mark, exclamation mark, colon, and semi-colon)
var vowelCount;
var consonantCount;
var specialCharCount;
var vowels = ['a', 'e', 'i', 'o', 'u', 'y']
var consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
var specialChars = ['.', ',', '?', '!', ':', ';'];

var map1 = new Map();

document.addEventListener('DOMContentLoaded', function () {
    initVars()
    console.log(map1);
});

function initVars() {
    vowelCount = 0;
    consonantCount = 0;
    specialCharCount = 0;

    let tempArray = vowels.concat(consonants);
    tempArray = tempArray.concat(specialChars)

    tempArray.forEach( char => {
        map1.set(char, 0);
    })
}

function createDonut(){

    d3.select("svg").remove();

// set the dimensions and margins of the graph
        const width = 580,
        height = 400,
        margin = 30;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        const radius = Math.min(width, height) / 2 - margin

        // append the svg object to the div called 'my_dataviz'
        const svg = d3.select("#pie_div")
        .append("svg")
        .attr('class', 'bg-svg')
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

        // Create dummy data
        const data = {vowelData: vowelCount, consonantData: consonantCount, specialCharsData: specialCharCount}

        // set the color scale
        const color = d3.scaleOrdinal()
        .range(["pink", "green", "blue"])

        // Compute the position of each group on the pie:
        const pie = d3.pie()
            .value(d=>d[1])

        const data_ready = pie(Object.entries(data))
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#000")
        .text("a simple tooltip");
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('whatever')
        .data(data_ready)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(100)         // This is the size of the donut hole
            .outerRadius(radius))
        .attr('fill', d => color(d.data[0]))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
            .on("mouseover", function (d) { console.log("HOVERING") })

}


function parseText( inputStr ){
    inputStr = inputStr.toLowerCase();
    [...inputStr].forEach( char => {
        if(specialChars.includes(char)){
            let x = map1.get(char);
            x++;
            specialCharCount++;
            map1.set(char, x);
            
        } else if (vowels.includes(char)){
            let x = map1.get(char);
            x++;
            vowelCount++;
            map1.set(char, x);

        }
        else if (consonants.includes(char)) {
            let x = map1.get(char);
            x++;
            consonantCount++;
            map1.set(char, x);
           
        }
        
    });
    console.log(inputStr);
}



function submitText(){
    initVars();
    var textarea = document.getElementById('wordbox');
    parseText(textarea.value);
    console.log(map1);
    createDonut();
}




