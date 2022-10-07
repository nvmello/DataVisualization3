
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

// set the dimensions and margins of the graph
        const width = 580,
        height = 400,
        margin = 30;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        const radius = Math.min(width, height) / 2 - margin

        // append the svg object to the div called 'pie_div'
        const svg = d3.select("#pie_svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

        // Create dummy data
        const data = {Vowels: vowelCount, Consonants: consonantCount, Punctuation: specialCharCount}

        // set the color scale
        const color = d3.scaleOrdinal()
        .range(["#D7A9E3FF", "#8BBEE8FF", "#A8D5BAFF"]);

        // Compute the position of each group on the pie:
        const pie = d3.pie()
            .value(d=>d[1])
    
        const data_ready = pie(Object.entries(data))
        var div = d3.select("body").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('whatever')
        .data(data_ready)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(100)         // This is the size of the donut hole
            .outerRadius(radius))
        .attr('fill', d => color(d))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style('opacity', '1')
            .on('mouseover', function (d) {
                svg.append('text')
                    .style("text-anchor", "middle")
                    .attr("class", "textCenter")
                
                    .text(d.target.__data__.data[0] + ": " + d.target.__data__.data[1])
                    d3.select(this).transition()
                    .style("stroke-width", "4px")
                    
            })
            .on("click", function (d) {
                d3.selectAll("#bar_svg > *").remove();
                drawBar(d.target.__data__.data[0] , d3.select(this).style('fill'));
                    })
            .on('mouseout', function (d) {
                d3.select(".textCenter")
                    .remove()
                d3.select(this).transition()
                    .style("stroke-width", "2px");
            });
}

function drawBar(data, color) {  
    if(data.toLowerCase() === "vowels"){
        data = vowels;
    } else if (data.toLowerCase() === "consonants"){
        data = consonants;
    } else if (data.toLowerCase() === "punctuation") {
        data = specialChars;
    }
    let margin = 30;
    const svg = d3.select("#bar_svg");
    let width = 580 - margin;
    let height = 400 - margin; 
    

    var xScale = d3.scaleBand().range([0, width-margin]).padding(0.5); 
    var yScale = d3.scaleLinear().range([height, margin]); 
    var g = svg.append("g")
        // .attr("transform", `translate(${margin},${height})`);

    xScale.domain(data.map(function (d) {
        return d;
    }));

    yScale.domain([
        0,
        d3.max(map1, function (d) {
            return d[1];
        }),
    ]);

    g.append("g")
        .attr("transform", `translate(${margin},${height})`)
        .call(d3.axisBottom(xScale)) 

    g.append("g")
        .attr("transform", `translate(${margin},${0})`)
        .call(d3.axisLeft(yScale)) 

    var div = d3.select("#bar_div")
        .append("div")
        .attr("class", "tooltip-bar");


    var bar = g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return xScale(d) + margin;
        })
        .attr("y", function (d) {
            return yScale(map1.get(d));
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return height - yScale(map1.get(d));
        })
        .style("fill", color)
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .on('mouseover', function (d, i) {
       
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85');
            div.transition()
                .duration(50)
                .style("opacity", 1);
            let barData = ('Character: ' + i + '<br/>' + 'Count: ' + map1.get(i));
           
            div.html(barData)
                .style("left", (d.pageX) + "px")
                .style("top", (d.pageY) + "px");
            
                
            // div.html(count)
            //     .style("left", (x + 10) + "px")
            //     .style("top", (y - 30) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            div.transition()
                .duration('50')
                .style("opacity", 0);
        });

   
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
    d3.selectAll("svg > *").remove();
    initVars();
    var textarea = document.getElementById('wordbox');
    parseText(textarea.value);
    console.log(map1);
    createDonut();
}