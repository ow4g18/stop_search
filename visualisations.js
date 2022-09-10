var oldWidth = 0
function render() {
    if (oldWidth == innerWidth) return
    oldWidth = innerWidth

    var width = height = d3.select('#graph').node().offsetWidth

    const t_time = 500 // Standard transition fade time

    const standard_cols = ["#648FFF", "#DC267F", "#785EF0", "#FE6100", "#FFB000"] // From https://davidmathlogic.com/colorblind/#%23648FFF-%23785EF0-%23DC267F-%23FE6100-%23FFB000

    const margin = { top: 10, right: 30, bottom: 50, left: 90 };

    if (innerWidth <= 1125) { // max_width + 25
        width = innerWidth
        height = innerHeight * .7
    }

    // Begin visualisation 1

    var svg_1 = d3.select('.container-1 #graph').html('')
        .append("svg")
        .attrs({ width: width, height: height })
        .append("g")

    d3.csv("./data/historic_stops.csv",

        function (data) {

            data.forEach(function (d) {
                d.year = d3.timeParse("%Y")(d.Year);
                d.value = d.Stops
            })

            // Add X axis --> it is a date format
            const x_stops = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.year; }))
                .range([margin.left, width - margin.right]);
            x_axis_stops = svg_1.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x_stops));

            // Add stops Y axis
            const y_stops = d3.scaleLinear()
                .domain([0, 1.1 * d3.max(data, function (d) { return +d.value; })])
                .range([height - margin.bottom, margin.top]);
            y_axis_stops = svg_1.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y_stops));

            // Add the line
            stops_line = svg_1.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", standard_cols[0])
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                    .x(function (d) { return x_stops(d.year) })
                    .y(function (d) { return y_stops(d.value) })
                )

            // Other elements (titles, labels etc) added in next section.

        })

    d3.csv("./data/london_stats.csv",

        function (data) {

            data.forEach(function (d) {
                d.date = d3.timeParse("%m-%Y")(d.date);
            })

            const margin = { top: 10, right: 30, bottom: 50, left: 90 };

            // Add multiple X axes --> it is a date format
            const x_stats = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.date; }))
                .range([margin.left, width - margin.right]);
            x_axis_stats = svg_1.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x_stats))

            // Add Y axis weapons
            const y_weapons = d3.scaleLinear()
                .domain([0, 1.1 * d3.max(data, function (d) { return +d.poss_weapons; })])
                .range([height - margin.bottom, margin.top]);
            y_axis_weapons = svg_1.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y_weapons));

            // Add Y axis robbery and violence
            const y_rob_and_vio = d3.scaleLinear()
                .domain([0, 1.1 * d3.max(data, function (d) { return +d.violence_injury; })])
                .range([height - margin.bottom, margin.top]);
            y_axis_rob_and_vio = svg_1.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y_rob_and_vio));

            // Add Y axis homicide
            const y_homicide = d3.scaleLinear()
                .domain([0, 1.1 * d3.max(data, function (d) { return +d.homicide; })])
                .range([height - margin.bottom, margin.top]);
            y_axis_homicide = svg_1.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y_homicide));

            // Add Y axis possession of drugs
            const y_drugs = d3.scaleLinear()
                .domain([0, 1.1 * d3.max(data, function (d) { return +d.poss_drugs; })])
                .range([height - margin.bottom, margin.top]);
            y_axis_drugs = svg_1.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y_drugs));

            // Add Y axis trafficking
            const y_traffic = d3.scaleLinear()
                .domain([0, 1.1 * d3.max(data, function (d) { return +d.traffic_drugs; })])
                .range([height - margin.bottom, margin.top]);
            y_axis_traffic = svg_1.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y_traffic));


            // Add Blunt2 rectangle
            box = svg_1.append("rect")
                .attr("x", 290)
                .attr("y", margin.top + 40)
                .attr("height", height - margin.bottom - 50)
                .style("fill", standard_cols[1])

            // Add weapons line
            weapons_line = svg_1.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", standard_cols[0])
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                    .x(function (d) { return x_stats(d.date) })
                    .y(function (d) { return y_weapons(d.poss_weapons) })
                )

            // Add robbery line
            rob_line = svg_1.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", standard_cols[0])
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                    .x(function (d) { return x_stats(d.date) })
                    .y(function (d) { return y_rob_and_vio(d.robbery) })
                )

            // Add violence line
            vio_line = svg_1.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", standard_cols[0])
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                    .x(function (d) { return x_stats(d.date) })
                    .y(function (d) { return y_rob_and_vio(d.violence_injury) })
                )

            // Add homicide line
            homicide_line = svg_1.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", standard_cols[0])
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                    .x(function (d) { return x_stats(d.date) })
                    .y(function (d) { return y_homicide(d.homicide) })
                )

            // Add possession of drugs line
            drugs_line = svg_1.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", standard_cols[0])
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                    .x(function (d) { return x_stats(d.date) })
                    .y(function (d) { return y_drugs(d.poss_drugs) })
                )

            // Add trafficking line
            traffic_line = svg_1.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", standard_cols[0])
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                    .x(function (d) { return x_stats(d.date) })
                    .y(function (d) { return y_traffic(d.traffic_drugs) })
                )

            // text label for the x axis
            svg_1.append("text")
                .attr("transform",
                    "translate(" + (50 + (width / 2)) + " ," +
                    (height - 10) + ")")
                .style("text-anchor", "middle")
                .text("Year");

            // "Stops" label for the first y axis
            stops_y_label = svg_1.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -300)
                .attr("y", 5)
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Stops");

            // "Arrests" label for the second y axis
            stats_y_label = svg_1.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -300)
                .attr("y", 5)
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Arrests");

            // Add point label for peak of stops
            const peak_loc = [274, 105]
            peak_point = svg_1.append('circle')
                .attr('cx', peak_loc[0])
                .attr('cy', peak_loc[1])
                .attr('r', 7)
                .attr('stroke', 'black')
                .attr('fill', standard_cols[1]);

            // First line of peak label
            peak_label_1 = svg_1.append("text")
                .attr('x', peak_loc[0] - 10)
                .attr('y', peak_loc[1])
                .style("text-anchor", "end")
                .text("One stop every");
            // Second line of peak label
            peak_label_2 = svg_1.append("text")
                .attr('x', peak_loc[0] - 10)
                .attr('y', peak_loc[1] + 15)
                .style("text-anchor", "end")
                .text("20 seconds.");

            // Blunt 2 box label
            box_label = svg_1.append("text")
                .attr("x", 380)
                .attr("y", 550)
                .attr("text-anchor", "middle")
                .text("BLUNT 2 Period")

            // Seperate Roberry and Violence labels
            vio_label = svg_1.append("text")
                .attr('x', width - margin.right)
                .attr('y', 230)
                .style("text-anchor", "end")
                .text("Violence (with injury)");
            rob_label = svg_1.append("text")
                .attr('x', width - margin.right)
                .attr('y', 470)
                .style("text-anchor", "end")
                .text("Robbery");

            // Title: total stops
            title_stops = svg_1.append("text")
                .attr("x", 350)
                .attr("y", 40)
                .text("Total Number of Stops in England and Wales (2002-2021)")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")

            // Title: Possesion of weapons
            title_weapons = svg_1.append("text")
                .attr("x", 360)
                .attr("y", 40)
                .text("Arrests for Possession of Offensive Weapons (London, 2005-2014)")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")

            // Title: Violence line 1
            title_rob_vio_line_1 = svg_1.append("text")
                .attr("x", 370)
                .attr("y", 40)
                .text("Arrests for Crimes Associated with")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")
            // Title: Violene line 2
            title_rob_vio_line_2 = svg_1.append("text")
                .attr("x", 370)
                .attr("y", 60)
                .text("Public Violence (London, 2005-2014)")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")

            // Title: Homicide
            title_homicide = svg_1.append("text")
                .attr("x", 360)
                .attr("y", 40)
                .text("Arrests for Homicide (London, 2005-2014)")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")

            // Title: Possession of drugs
            title_drugs = svg_1.append("text")
                .attr("x", 360)
                .attr("y", 40)
                .text("Arrests for Possession of Drugs (London, 2005-2014)")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")

            // Title: Trafficking
            title_traffic = svg_1.append("text")
                .attr("x", 360)
                .attr("y", 40)
                .text("Arrests for Drug Trafficking Offences (London, 2005-2014)")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")
        })

    // Control scrolling elements of svg_1
    gs_1 = d3.graphScroll()
        .container(d3.select('.container-1'))
        .graph(d3.selectAll('.container-1 #graph'))
        .eventId('uniqueId1')  // namespace for scroll and resize events
        .sections(d3.selectAll('.container-1 #sections > div'))
        .on('active', function (i) {

            // Define line opacity arrays to display one at a time
            var stops_opac = [1, 1, 0, 0, 0, 0, 0, 0];
            var stats_opac = [0, 0, 1, 1, 1, 1, 1, 1];
            var weapons_opac = [0, 0, 1, 0, 0, 0, 0, 0];
            var rob_and_vio_opac = [0, 0, 0, 1, 0, 0, 0, 0];
            var homicide_opac = [0, 0, 0, 0, 1, 0, 0, 0]
            var drugs_opac = [0, 0, 0, 0, 0, 1, 0, 0]
            var traffic_opac = [0, 0, 0, 0, 0, 0, 1, 1]

            // Define box variables to animate width
            var rect_opac = [0, 0, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3];
            var box_width = [0, 0, 175, 175, 175, 175, 175, 175];

            // Transition all variables according to opacity matrix above
            // Total stops lines and axes
            stops_line.transition().duration(t_time).attr("opacity", stops_opac[i])
            x_axis_stops.transition().duration(t_time).attr("opacity", stops_opac[i])
            y_axis_stops.transition().duration(t_time).attr("opacity", stops_opac[i])
            title_stops.transition().duration(t_time).attr("opacity", stops_opac[i])
            stops_y_label.transition().duration(t_time).attr("opacity", stops_opac[i])

            // Other axes
            x_axis_stats.transition().duration(t_time).attr("opacity", stats_opac[i])
            stats_y_label.transition().duration(t_time).attr("opacity", stats_opac[i])

            // Weapons line, axis, title
            weapons_line.transition().duration(t_time).attr("opacity", weapons_opac[i])
            y_axis_weapons.transition().duration(t_time).attr("opacity", weapons_opac[i])
            title_weapons.transition().duration(t_time).attr("opacity", weapons_opac[i])

            // Robbery and violence lines, axes, titles
            rob_line.transition().duration(t_time).attr("opacity", rob_and_vio_opac[i])
            vio_line.transition().duration(t_time).attr("opacity", rob_and_vio_opac[i])
            y_axis_rob_and_vio.transition().duration(t_time).attr("opacity", rob_and_vio_opac[i])
            vio_label.transition().duration(t_time).attr("opacity", rob_and_vio_opac[i])
            rob_label.transition().duration(t_time).attr("opacity", rob_and_vio_opac[i])
            title_rob_vio_line_1.transition().duration(t_time).attr("opacity", rob_and_vio_opac[i])
            title_rob_vio_line_2.transition().duration(t_time).attr("opacity", rob_and_vio_opac[i])

            // Homicide lines, axes, titles
            homicide_line.transition().duration(t_time).attr("opacity", homicide_opac[i])
            y_axis_homicide.transition().duration(t_time).attr("opacity", homicide_opac[i])
            title_homicide.transition().duration(t_time).attr("opacity", homicide_opac[i])

            // Possession of drugs lines, axes, titles
            drugs_line.transition().duration(t_time).attr("opacity", drugs_opac[i])
            y_axis_drugs.transition().duration(t_time).attr("opacity", drugs_opac[i])
            title_drugs.transition().duration(t_time).attr("opacity", drugs_opac[i])

            // Trafficking lines, axes, titles
            traffic_line.transition().duration(t_time).attr("opacity", traffic_opac[i])
            y_axis_traffic.transition().duration(t_time).attr("opacity", traffic_opac[i])
            title_traffic.transition().duration(t_time).attr("opacity", traffic_opac[i])

            // Control "One stop every 20 seconds label"
            if (i == 1) {
                peak_point.transition().duration(t_time).attr("opacity", 1);
                peak_label_1.transition().duration(t_time).attr("opacity", 1);
                peak_label_2.transition().duration(t_time).attr("opacity", 1);
            }
            if (i != 1) {
                peak_point.transition().duration(t_time).attr("opacity", 0);
                peak_label_1.transition().duration(t_time).attr("opacity", 0);
                peak_label_2.transition().duration(t_time).attr("opacity", 0);
            }

            // Control Blunt2 box width and opacity
            box.transition().duration(1500)
                .attr("fill-opacity", rect_opac[i])
                .attr("width", box_width[i])

            box_label.transition().duration(t_time)
                .attr("opacity", rect_opac[i] * 3.3)

        })

    // Begin visualisation 2

    var svg_2 = d3.select('.container-2 #graph').html('')
        .append("svg")
        .attrs({ width: width, height: height })
        .append("g")

    // Define Y scale outside of .csv as it is used across multiple datasets
    var y_pct = d3.scaleLinear()
        .domain([0, 85])
        .range([height - margin.bottom, margin.top]);

    d3.csv("./data/ethnicity.csv",

        function (data) {

            // List of groups: Years on the X axis
            var groups = d3.map(data, function (d) { return (d.year) }).keys()

            // Split data in half, according to population adjustment
            let grouped_data = [];
            grouped_data = data.map((d) => { return { year: d.year, w: [d.w, d.w_pop], b: [d.b, d.b_pop], a: [d.a, d.a_pop], o: [d.o, d.o_pop] } })

            // List of subgroups: Ethnicities
            var subgroups = data.columns.slice(1, 5)

            // Define X scale
            var x = d3.scaleBand()
                .domain(groups)
                .range([margin.left, width - margin.right])
                .padding([0.1])
            // Add X axis
            svg_2.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickSize(0));

            // Add Y axis
            svg_2.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y_pct));

            // Position bars
            var x_subgroup = d3.scaleBand()
                .domain(subgroups)
                .range([0, x.bandwidth()])
                .padding([0.05])

            // Map Ethnicities to colours
            var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(standard_cols.slice(0, 4))

            svg_2.append("g")
                .selectAll("g")
                // Enter in data = loop group per group
                .data(grouped_data)
                .enter()
                .append("g")
                .attr("transform", function (d) { return "translate(" + x(d.year) + ",0)"; })
                .selectAll("dispro_bars")
                .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
                .enter().append("rect")
                .attr("class", "dispro_bars")
                .attr("x", function (d) { return x_subgroup(d.key); })
                .attr("y", function (d) { return y_pct(d.value[0]); })
                .attr("width", x_subgroup.bandwidth())
                .attr("height", function (d) { return height - y_pct(d.value[0]) - margin.bottom; })
                .attr("fill", function (d) { return color(d.key); });

            // Create legend
            const labelHeight = x_subgroup.bandwidth();
            const dispro_labels = ["White", "Black", "Asian", "Other (inc. Mixed)"];

            svg_2.selectAll("legend_rect")
                .data(dispro_labels)
                .enter()
                .append("rect")
                .attr("transform", "translate(480, 60)")
                .attr("y", function (d) { let idx = dispro_labels.indexOf(d); return labelHeight * idx * 1.5 })
                .attr('width', labelHeight)
                .attr('height', labelHeight)
                .attr('fill', d => color(dispro_labels.indexOf(d)))
                .attr('stroke', 'black')
                .style('stroke-width', '1px');

            svg_2.selectAll("legend_text")
                .data(dispro_labels)
                .enter()
                .append('text')
                .attr("transform", "translate(" + (480 + labelHeight + 5) + "," + (60 + labelHeight / 2) + ")")
                .text(function (d) { return d })
                .attr("y", function (d) { let idx = dispro_labels.indexOf(d); return labelHeight * idx * 1.5 })
                .attr("alignment-baseline", "central")
                .style('font-family', 'sans-serif')
                .style('font-size', `${labelHeight}px`);

            // text label for the X axis
            svg_2.append("text")
                .attr("transform",
                    "translate(" + (50 + (width / 2)) + " ," +
                    (height - 10) + ")")
                .style("text-anchor", "middle")
                .text("Year");

            // text label for the Y axis
            svg_2.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -300)
                .attr("y", 15)
                .attr("dy", "1em")
                .text("Percentage of Total Stops")
                .style("text-anchor", "middle")

            // Title for bar chart 1
            title_pop = svg_2.append("text")
                .attr("x", 350)
                .attr("y", 40)
                .text("Distribution of Stops by Ethnicity (London, 2014-2021)")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")

            // Title for bar chart 2
            title_no_pop_line_1 = svg_2.append("text")
                .attr("x", 350)
                .attr("y", 40)
                .text("Population Adjusted Distribution of Stops")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")
            title_no_pop_line_2 = svg_2.append("text")
                .attr("x", 350)
                .attr("y", 58)
                .text("by Ethnicity (London, 2014-2021)")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")

        })

    // Control scrolling elements of svg_2
    gs_2 = d3.graphScroll()
        .container(d3.select('.container-2'))
        .graph(d3.selectAll('.container-2 #graph'))
        .eventId('uniqueId2')  // namespace for scroll and resize events
        .sections(d3.selectAll('.container-2 #sections > div'))
        .on('active', function (i) {

            // Title opacity arrays
            title_opacs_pop = [0, 1]
            title_opacs_no_pop = [1, 0]

            // Control changing title text
            dispro_titles = ["Percentage of stops by ethnicity", "Percentage of stops by ethnicity (population adjusted)"]

            // Animate bars
            d3.selectAll(".dispro_bars")
                .transition().duration(3000).attr("height", function (d) { return height - y_pct(d.value[i]) - margin.bottom; })
                .attr("y", function (d) { return y_pct(d.value[i]); })

            // Control title opacity
            title_pop.transition().duration(t_time).attr("opacity", title_opacs_no_pop[i])
            title_no_pop_line_1.transition().duration(t_time).attr("opacity", title_opacs_pop[i])
            title_no_pop_line_2.transition().duration(t_time).attr("opacity", title_opacs_pop[i])

        })

    // Begin visualisation 4 (See map.js for visualisation 3)

    // Create new margin variable to account for long labels
    var margin_bar_charts = { top: 100, right: 75, bottom: 25, left: 200 };

    // Third bar chart has new margins (shorter labels)
    var graph_3_left_margin = margin_bar_charts.right;
    var graph_height = height - margin_bar_charts.top;
    var graph_height_3 = (graph_height / 2) - 50;

    function wrap(text, width) {
        // Function to wrap text to a particular width, across multiple lines
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1,
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    var svg_4 = d3.select('.container-4 #graph').html('')
        .append("svg")
        .attrs({ width: width, height: height })
        .append("g")
        .attr("transform", "translate(" + margin_bar_charts.left + "," + margin_bar_charts.top + ")");

    // First bar chart data

    var bar_data_1 = [{
        "name": "I don't know",
        "value": 10,
    },
    {
        "name": "I think stop and search is unneccessary and should be discontinued in policing",
        "value": 10,
    },
    {
        "name": "I think it is neccessary but the police do not apply it as they should",
        "value": 39,
    },
    {
        "name": "I think it is neccessary and the police should keep using it as they are",
        "value": 41,
    }];

    // Second bar chart data

    var bar_data_2 = [{
        "name": "Other",
        "value": 3,
    },
    {
        "name": "They apply it too much",
        "value": 10,
    },
    {
        "name": "They don't apply it enough",
        "value": 15,
    },
    {
        "name": "They apply it when there aren't reasonable grounds to do so",
        "value": 47,
    },
    {
        "name": "They don't apply it in the same way to all groups of people",
        "value": 63,
    }];

    // Third bar chart(s) data

    var bar_data_3_a = [{
        "name": "BAME",
        "value": 28,
    },
    {
        "name": "white",
        "value": 43,
    }]

    var bar_data_3_b = [{
        "name": "BAME",
        "value": 14,
    },
    {
        "name": "white",
        "value": 9,
    }]

    // X scale for charts 1 and 2
    var x_1_2 = d3.scaleLinear()
        .range([0, width - margin_bar_charts.right - margin_bar_charts.left])
        .domain([0, d3.max([d3.max(bar_data_1, function (d) { return d.value; }), d3.max(bar_data_2, function (d) { return d.value; })])])

    // X scale for chart(s) 3
    var x_3 = d3.scaleLinear()
        .range([0, width - margin_bar_charts.right - graph_3_left_margin])
        .domain([0, d3.max([d3.max(bar_data_3_a, function (d) { return d.value; }), d3.max(bar_data_3_b, function (d) { return d.value; })])])

    // Y scale for chart 1
    var y_1 = d3.scaleBand()
        .range([graph_height - margin_bar_charts.bottom, 0])
        .domain(bar_data_1.map(function (d) { return d.name; }))
        .padding(0.5);

    // Y scale for chart 2
    var y_2 = d3.scaleBand()
        .range([graph_height - margin_bar_charts.bottom, 0])
        .domain(bar_data_2.map(function (d) { return d.name; }))
        .padding(0.5);

    // Y scales for chart(s) 3
    var y_3_a = d3.scaleBand()
        .range([graph_height_3 - margin_bar_charts.bottom, 0])
        .domain(bar_data_3_a.map(function (d) { return d.name; }))
        .padding(0.5);
    var y_3_b = d3.scaleBand()
        .range([graph_height_3 - margin_bar_charts.bottom, 0])
        .domain(bar_data_3_b.map(function (d) { return d.name; }))
        .padding(0.5);

    var chart_3_v_shift = 300 // Graph 3b) is shifted downwards

    // First chart Y axis
    y_axis_1 = svg_4.append("g")
        .call(d3.axisLeft(y_1));

    // Second chart Y axis
    y_axis_2 = svg_4.append("g")
        .call(d3.axisLeft(y_2));

    // Third chart(s) Y axes
    y_axis_3_a = svg_4.append("g")
        .attr("transform", "translate(" + (graph_3_left_margin - margin_bar_charts.left) + ",0)")
        .call(d3.axisLeft(y_3_a));
    y_axis_3_b = svg_4.append("g")
        .attr("transform", "translate(" + (graph_3_left_margin - margin_bar_charts.left) + "," + chart_3_v_shift + ")")
        .call(d3.axisLeft(y_3_b));

    // Wrap and transform tick text one tick at a time

    const tick_padding = 15

    svg_4.selectAll(".tick text")
        .attr("font-size", "14px")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "I don't know"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ",0)")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "I think stop and search is unneccessary and should be discontinued in policing"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ",-16)")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "I think it is neccessary but the police do not apply it as they should"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ",-17)")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "I think it is neccessary and the police should keep using it as they are"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ",-17)")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "They don't apply it in the same way to all groups of people"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ",-16)")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "They apply it when there aren't reasonable grounds to do so"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ",-17)")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "They don't apply it enough"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ", 0)")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "They apply it too much"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ", 0)")

    svg_4.selectAll(".tick text")
        .filter(function (d) { return d == "Other"; })
        .call(wrap, margin_bar_charts.left - 2 * tick_padding)
        .attr("transform", "translate(" + (-tick_padding) + ", 0)")

    // Append rectangles chart 1
    svg_4.selectAll("bars_a")
        .data(bar_data_1)
        .enter().append("rect")
        .attr("class", "bars_a")
        .attr("width", function (d) { return x_1_2(d.value); })
        .attr("y", function (d) { return y_1(d.name); })
        .attr("height", y_1.bandwidth())
        .attr("fill", standard_cols[0])

    // Append rectangles chart 2
    svg_4.selectAll("bars_b")
        .data(bar_data_2)
        .enter().append("rect")
        .attr("class", "bars_b")
        .attr("width", function (d) { return x_1_2(d.value); })
        .attr("y", function (d) { return y_2(d.name); })
        .attr("height", y_2.bandwidth())
        .attr("fill", standard_cols[0])

    // Append rectangles chart 3a
    svg_4.selectAll("bars_3_a")
        .data(bar_data_3_a)
        .enter().append("rect")
        .attr("class", "bars_3_a")
        .attr("transform", "translate(" + (graph_3_left_margin - margin_bar_charts.left) + ",0)")
        .attr("width", function (d) { return x_3(d.value); })
        .attr("y", function (d) { return y_3_a(d.name); })
        .attr("height", y_3_a.bandwidth())
        .attr("fill", standard_cols[0])

    // Append rectangles chart 3b
    svg_4.selectAll("bars_3_b")
        .data(bar_data_3_b)
        .enter().append("rect")
        .attr("class", "bars_3_b")
        .attr("transform", "translate(" + (graph_3_left_margin - margin_bar_charts.left) + "," + chart_3_v_shift + ")")
        .attr("width", function (d) { return x_3(d.value); })
        .attr("y", function (d) { return y_3_b(d.name); })
        .attr("height", y_3_b.bandwidth())
        .attr("fill", standard_cols[0])

    // Append number labels chart 1
    svg_4.append("g")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 20)
        .selectAll("text_a")
        .data(bar_data_1)
        .enter().append("text")
        .attr("class", "text_a")
        .attr("x", function (d) { return x_1_2(d.value); })
        .attr("y", function (d) { return y_1(d.name) + y_1.bandwidth() / 2; })
        .attr("dy", "0.35em")
        .attr("dx", -6)
        .attr("fill", "#eee")
        .text(function (d) { return d.value + "%" })

    // Append number labels chart 2
    svg_4.append("g")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 20)
        .selectAll("text_b")
        .data(bar_data_2)
        .enter().append("text")
        .attr("class", "text_b")
        .attr("x", function (d) { return x_1_2(d.value); })
        .attr("y", function (d) { return y_2(d.name) + y_2.bandwidth() / 2; })
        .attr("dy", "0.35em")
        .attr("dx", -6)
        .attr("fill", "#eee")
        .text(function (d) { return d.value + "%" })

    // Append number labels chart 3a
    svg_4.append("g")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 20)
        .selectAll("text_3")
        .data(bar_data_3_a)
        .enter().append("text")
        .attr("class", "text_3")
        .attr("transform", "translate(" + (graph_3_left_margin - margin_bar_charts.left) + ",0)")
        .attr("x", function (d) { return x_3(d.value); })
        .attr("y", function (d) { return y_3_a(d.name) + y_3_a.bandwidth() / 2; })
        .attr("dy", "0.35em")
        .attr("dx", -6)
        .attr("fill", "#eee")
        .text(function (d) { return d.value + "%" })

    // Append number labels chart 3b
    svg_4.append("g")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 20)
        .selectAll("text_3")
        .data(bar_data_3_b)
        .enter().append("text")
        .attr("class", "text_3")
        .attr("transform", "translate(" + (graph_3_left_margin - margin_bar_charts.left) + "," + chart_3_v_shift + ")")
        .attr("x", function (d) { return x_3(d.value); })
        .attr("y", function (d) { return y_3_b(d.name) + y_3_b.bandwidth() / 2; })
        .attr("dy", "0.35em")
        .attr("dx", -6)
        .attr("fill", "#eee")
        .text(function (d) { return d.value + "%" })

    // Move short bar labels outside of bar
    svg_4.selectAll(".text_b")
        .filter(function (d) { return d.value == 3; })
        .attr("transform", "translate(40,0)")
        .attr("fill", "black");

    // Title chart 1
    svg_4.append("foreignObject")
        .attr("class", "title_a")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", "translate(-120, -60)")
        .append("xhtml:body")
        .style("font", "16px 'Helvetica Neue'")
        .style("font-weight", "bold")
        .html("<center> Which of the following statements most accurately reflects how you feel about 'stop and search' in policing? <center/>")

    // Title chart 2
    svg_4.append("foreignObject")
        .attr("class", "title_b")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", "translate(-120, -60)")
        .append("xhtml:body")
        .style("font", "16px 'Helvetica Neue'")
        .style("font-weight", "bold")
        .html("<center> Why do you think that the police don't apply stop and search powers as they should? <center/>")

    // Title chart 3a
    svg_4.append("foreignObject")
        .attr("class", "title_3")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", "translate(-120, -60)")
        .append("xhtml:body")
        .style("font", "16px 'Helvetica Neue'")
        .style("font-weight", "bold")
        .html("<center> &quotI think stop and search is necessary and the police should continue using it as they are&quot <center/>")

    // Title chart 3b
    svg_4.append("foreignObject")
        .attr("class", "title_3")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", "translate(-120, 250)")
        .append("xhtml:body")
        .style("font", "16px 'Helvetica Neue'")
        .style("font-weight", "bold")
        .html("<center> &quotI think stop and search is unnecessary and should be discontinued in policing&quot <center/>")

    // Add source
    svg_4.append("text")
        .attr("transform", "translate(150, 545)")
        .text("Source: IOPC Public Perceptions Tracker")

    // Control scrolling element of svg_4
    gs_4 = d3.graphScroll()
        .container(d3.select('.container-4'))
        .graph(d3.selectAll('.container-4 #graph'))
        .eventId('uniqueId4')  // namespace for scroll and resize events
        .sections(d3.selectAll('.container-4 #sections > div'))
        .on('active', function (i) {

            // Define opacity arrays for the 3 charts
            var opacs_a = [1, 0, 0, 0];
            var opacs_b = [0, 1, 0, 0];
            var opacs_3 = [0, 0, 1, 1];

            // Transition Y axes
            y_axis_1.transition().duration(t_time).attr("opacity", opacs_a[i])
            y_axis_2.transition().duration(t_time).attr("opacity", opacs_b[i])
            y_axis_3_a.transition().duration(t_time).attr("opacity", opacs_3[i])
            y_axis_3_b.transition().duration(t_time).attr("opacity", opacs_3[i])

            // Transition bars
            svg_4.selectAll(".bars_a").transition().duration(t_time).attr("opacity", opacs_a[i])
            svg_4.selectAll(".bars_b").transition().duration(t_time).attr("opacity", opacs_b[i])
            svg_4.selectAll(".bars_3_a").transition().duration(t_time).attr("opacity", opacs_3[i])
            svg_4.selectAll(".bars_3_b").transition().duration(t_time).attr("opacity", opacs_3[i])

            // Transition text labels
            svg_4.selectAll(".text_a").transition().duration(t_time).attr("opacity", opacs_a[i])
            svg_4.selectAll(".text_b").transition().duration(t_time).attr("opacity", opacs_b[i])
            svg_4.selectAll(".text_3").transition().duration(t_time).attr("opacity", opacs_3[i])

            // Transition titles
            svg_4.selectAll(".title_a").transition().duration(t_time).attr("opacity", opacs_a[i])
            svg_4.selectAll(".title_b").transition().duration(t_time).attr("opacity", opacs_b[i])
            svg_4.selectAll(".title_3").transition().duration(t_time).attr("opacity", opacs_3[i])

        })

    // Begin visualisation 5

    var svg_5 = d3.select('.container-5 #graph').html('')
        .append("svg")
        .attrs({ width: width, height: height })
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Define donut chart radii
    var radius_a_b = Math.min(width, height) / 4
    var radius_c = Math.min(width, height) / 3

    // Donut chart data
    var data_pie_a = { "Very Much So": 18, "To some extent": 54, "Not very much": 14, "Not at all": 3, "Don't know": 11 }
    var data_pie_b = { "Very Much So": 17, "To some extent": 49, "Not very much": 18, "Not at all": 5, "Don't know": 11 }
    var data_pie_c = {
        "Extremely Confident": 0.2, "Very Confident": 3.5, "Somewhat Confident": 11.5,
        "Not so Confident": 32.2, "Not at All Confident": 52.5
    }

    // set the color scale for donuts 1 and 2
    var color_a_b = d3.scaleOrdinal()
        .domain(["Very Much So", "To some extent", "Not very much", "Not at all", "Don't know"])
        .range(standard_cols);

    // set the color scale for donut 3
    var color_c = d3.scaleOrdinal()
        .domain([0.2, 3.5, 11.5, 32.2, 52.5])
        .range(standard_cols);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(function (d) { return d.value; })

    // Prepare data to enter into donut
    var data_ready_a = pie(d3.entries(data_pie_a))
    var data_ready_b = pie(d3.entries(data_pie_b))
    var data_ready_c = pie(d3.entries(data_pie_c))

    // The arc generator
    var arc_a_b = d3.arc()
        .innerRadius(radius_a_b * 0.5)         // This is the size of the donut hole
        .outerRadius(radius_a_b * 0.8)

    // The arc generator
    var arc_c = d3.arc()
        .innerRadius(radius_c * 0.5)         // This is the size of the donut hole
        .outerRadius(radius_c * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc_c = d3.arc()
        .innerRadius(radius_c * 0.9)
        .outerRadius(radius_c * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

    // Slices for chart 1
    svg_5.selectAll("slices_a")
        .data(data_ready_a)
        .enter()
        .append('path')
        .attr("class", "slices_a")
        .attr('d', arc_a_b)
        .attr("transform", "translate(" + -width / 4 + ", 40)")
        .attr('fill', function (d) { return (color_a_b(d.data.key)) })
        .style("stroke-width", "2px")

    // Slice for chart 2
    svg_5.selectAll("slices_b")
        .data(data_ready_b)
        .enter()
        .append('path')
        .attr("class", "slices_b")
        .attr('d', arc_a_b)
        .attr("transform", "translate(" + width / 4 + ", 40)")
        .attr('fill', function (d) { return (color_a_b(d.data.key)) })
        .style("stroke-width", "2px")

    // Slices for chart 3
    svg_5.selectAll("slices_c")
        .data(data_ready_c)
        .enter()
        .append('path')
        .attr("class", "slices_c")
        .attr("transform", "translate(0, 100)")
        .attr('d', arc_c)
        .attr('fill', function (d) { return (color_c(d.data.value)) })
        .style("stroke-width", "2px")

    // Add the slice labels chart 1
    svg_5.selectAll('labels_a')
        .data(data_ready_a)
        .enter()
        .append('text')
        .attr("class", "labels_a")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(function (d) { return d.data.value + "%" })
        .attr('transform', function (d) {
            var pos = arc_a_b.centroid(d);
            pos[0] = pos[0] - width / 4;
            pos[1] = pos[1] + 40
            return 'translate(' + pos + ')';
        })

    // Add the slice labels chart 2
    svg_5.selectAll('labels_b')
        .data(data_ready_b)
        .enter()
        .append('text')
        .attr("class", "labels_b")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(function (d) { return d.data.value + "%" })
        .attr('transform', function (d) {
            var pos = arc_a_b.centroid(d);
            pos[0] = pos[0] + width / 4;
            pos[1] = pos[1] + 40
            return 'translate(' + pos + ')';
        })

    // Add the slice labels chart 3
    svg_5.selectAll('labels_c')
        .data(data_ready_c)
        .enter()
        .append('text')
        .attr("class", "labels_c")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(function (d) { let value = d.data.value; return (value == 0.2 || value == 3.5) ? null : value + "%" })
        .attr('transform', function (d) {
            var pos = arc_c.centroid(d);
            pos[1] = pos[1] + 100
            return 'translate(' + pos + ')';
        })

    // Add the polyline between chart and labels for the small segment:
    svg_5.selectAll('lines_c')
        .data(data_ready_c)
        .enter()
        .append('polyline')
        .attr("class", "lines_c")
        .attr("transform", "translate(0, 100)")
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function (d) {
            var posA = arc_c.centroid(d) // line insertion in the slice
            posA[1] = posA[1] - 25
            var posB = outerArc_c.centroid(d) // line break: we use the other arc generator that has been built only for that
            var posC = outerArc_c.centroid(d); // Label position = almost the same as posB
            var mult = ((d.data.value - 0.2) / 1.65) - 1 // Multiplier based on value of 0.2 or 3.5
            posC[0] = (radius_c * mult * 0.95); // multiply by 1 or -1 to put it on the right or on the left
            return d.data.value == 0.2 || d.data.value == 3.5 ? [posA, posB, posC] : null
        })

    // Add the labels to the two polylines
    svg_5.selectAll('labels_c')
        .data(data_ready_c)
        .enter()
        .append('text')
        .attr("class", "labels_c")
        .text(function (d) { value = d.data.value; return value == 0.2 || value == 3.5 ? d.data.key + " (" + value + "%)" : null })
        .attr('transform', function (d) {
            var pos = outerArc_c.centroid(d);
            var mult = ((d.data.value - 0.2) / 1.65) - 1 // Multiplier based on value of 0.2 or 3.5
            pos[0] = (radius_c * mult * 0.99);
            if (d.data.value == 0.2) {
                pos[0] = pos[0] + 180;
            }
            pos[1] = pos[1] + 90 // Shift text on top of line
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', 'end')

    // Create legend

    const labelHeight = 18;

    // Legend rectangles charts 1 and 2
    svg_5.selectAll("legend_rect_a_b")
        .data(data_ready_a)
        .enter()
        .append("rect")
        .attr("class", "legend_rect_a_b")
        .attr("transform", "translate(-250, -200)")
        .attr("y", function (d) { let x = labelHeight * d.index * 10; return x < width - margin.left - margin.right ? 0 : 30 }) // If rect runs off page, move down a line
        .attr('x', function (d) { let x = labelHeight * d.index * 10; return x < width - margin.left - margin.right ? x : x - 410 }) // If rect runs off page, shift left
        .attr('width', labelHeight)
        .attr('height', labelHeight)
        .attr('fill', d => color_a_b(d.data.key))
        .attr('stroke', 'grey')
        .style('stroke-width', '1px');

    // legend text charts 1 and 2
    svg_5.selectAll("legend_text_a_b")
        .data(data_ready_a)
        .enter()
        .append('text')
        .attr("class", "legend_text_a_b")
        .attr("transform", "translate(-220, -185)")
        .text(d => d.data.key)
        .attr("y", function (d) { let x = labelHeight * d.index * 10; return x < width - margin.left - margin.right ? 0 : 30 }) // If rect runs off page, move down a line
        .attr('x', function (d) { let x = labelHeight * d.index * 10; return x < width - margin.left - margin.right ? x : x - 410 }) // If rect runs off page, shift left
        // .attr("alignment-baseline", "hanging")
        .style('font-family', 'sans-serif')
        .style('font-size', `${labelHeight}px`);

    // Legned rectangles chart 3
    svg_5.selectAll("legend_rect_c")
        .data(data_ready_c)
        .enter()
        .append("rect")
        .attr("class", "legend_rect_c")
        .attr("transform", "translate(-290, -200)")
        .attr("y", function (d) { let x = labelHeight * d.index * 11; return x < width - 100 ? 0 : 30 }) // If rect runs off page, move down a line
        .attr('x', function (d) { let x = labelHeight * d.index * 11; return x < width - 100 ? x : x - 460 }) // If rect runs off page, shift left
        .attr('width', labelHeight)
        .attr('height', labelHeight)
        .attr('fill', d => color_c(d.data.value))
        .attr('stroke', 'grey')
        .style('stroke-width', '1px');

    // Legend text chart 3
    svg_5.selectAll("legend_text_c")
        .data(data_ready_c)
        .enter()
        .append('text')
        .attr("class", "legend_text_c")
        .attr("transform", "translate(-265, -185)")
        .text(d => d.data.key)
        .attr("y", function (d) { let x = labelHeight * d.index * 11; return x < width - 100 ? 0 : 30 }) // If rect runs off page, move down a line
        .attr('x', function (d) { let x = labelHeight * d.index * 11; return x < width - 100 ? x : x - 460 }) // If rect runs off page, shift left
        .style('font-family', 'sans-serif')
        .style('font-size', `${labelHeight}px`);

    // Add labels to centre of donuts 1 and 2

    const center_label_size = [90, 50]

    // Centre label chart 1
    svg_5.append("foreignObject")
        .attr("class", "center_label_a")
        .attr("width", center_label_size[0])
        .attr("height", center_label_size[1])
        .attr("transform", "translate(" + ((-width / 4) - center_label_size[0] / 2) + "," + (40 - (center_label_size[1] / 2)) + ")")
        .append("xhtml:body")
        .style("font", "14px 'Helvetica Neue'")
        .html("<center> All Respondants <center/>")

    // Centre label chart 2
    svg_5.append("foreignObject")
        .attr("class", "center_label_b")
        .attr("width", center_label_size[0])
        .attr("height", center_label_size[1])
        .attr("transform", "translate(" + ((width / 4) - center_label_size[0] / 2) + "," + (50 - (center_label_size[1] / 2)) + ")")
        .append("xhtml:body")
        .style("font", "14px 'Helvetica Neue'")
        .html("<center> BAME <center/>")

    // Add donut chart titles

    // Title charts 1 and 2
    svg_5.append("foreignObject")
        .attr("class", "title_pie_a_b")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", "translate(-250, -280)")
        .append("xhtml:body")
        .style("font", "16px 'Helvetica Neue'")
        .style("font-weight", "bold")
        .html("<center> To what extent, if at all, do you think that the police in the United Kingdom respond in a fair and proportionate way when dealing with incidents involving members of the public? <center/>")

    // Title chart 3
    svg_5.append("foreignObject")
        .attr("class", "title_pie_c")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", "translate(-250, -280)")
        .append("xhtml:body")
        .style("font", "16px 'Helvetica Neue'")
        .style("font-weight", "bold")
        .html("<center> As a black person, how confident are you that you would be treated the same as a white person by the police? <center/>")

    // Add source charts 1 and 2
    svg_5.append("text")
        .attr("class", "source_a_b")
        .attr("transform", "translate(25, 320)")
        .text("Source: IOPC Public Perceptions Tracker")

    // Add source chart 3
    svg_5.append("text")
        .attr("class", "source_c")
        .attr("transform", "translate(-35, 320)")
        .text("Source: The Black Community and Human Rights")

    // Add data/CVR_quotes.png as image
    const img_margin = 25
    svg_5.append('svg:image')
        .attr("class", "quote_image")
        .attr('href', './data/CVR_quote.png')
        .attr('x', - width / 2 + img_margin)
        .attr('y', - height / 2 + img_margin)
        .attr('width', width - 2 * img_margin)
        .attr('height', height - 2 * img_margin)

    // Control scrolling elements of svg_5
    gs_5 = d3.graphScroll()
        .container(d3.select('.container-5'))
        .graph(d3.selectAll('.container-5 #graph'))
        .eventId('uniqueId5')  // namespace for scroll and resize events
        .sections(d3.selectAll('.container-5 #sections > div'))
        .on('active', function (i) {

            // Define chart opacity arrays
            opacs_a_b = [1, 0, 0, 0]
            opacs_c = [0, 1, 0, 0]
            opacs_img = [0, 0, 1, 1]

            // Control donut chart slices
            d3.selectAll(".slices_a").transition().duration(t_time).style("opacity", opacs_a_b[i])
            d3.selectAll(".slices_b").transition().duration(t_time).style("opacity", opacs_a_b[i])
            d3.selectAll(".slices_c").transition().duration(t_time).style("opacity", opacs_c[i])

            // Control chart 3 polylines
            d3.selectAll(".lines_c").transition().duration(t_time).style("opacity", opacs_c[i])

            // Control donut chart labels
            d3.selectAll(".labels_a").transition().duration(t_time).attr("opacity", opacs_a_b[i])
            d3.selectAll(".labels_b").transition().duration(t_time).attr("opacity", opacs_a_b[i])
            d3.selectAll(".labels_c").transition().duration(t_time).attr("opacity", opacs_c[i])

            // Control donut chart legends
            d3.selectAll(".legend_rect_a_b").transition().duration(t_time).attr("opacity", opacs_a_b[i])
            d3.selectAll(".legend_rect_c").transition().duration(t_time).attr("opacity", opacs_c[i])
            d3.selectAll(".legend_text_a_b").transition().duration(t_time).attr("opacity", opacs_a_b[i])
            d3.selectAll(".legend_text_c").transition().duration(t_time).attr("opacity", opacs_c[i])

            // Control donut chart titles
            d3.selectAll(".title_pie_a_b").transition().duration(t_time).attr("opacity", opacs_a_b[i])
            d3.selectAll(".title_pie_c").transition().duration(t_time).attr("opacity", opacs_c[i])

            // Control centre labels for donut charts 1 and 2
            d3.selectAll(".center_label_a").transition().duration(t_time).attr("opacity", opacs_a_b[i])
            d3.selectAll(".center_label_b").transition().duration(t_time).attr("opacity", opacs_a_b[i])

            // Control source labels
            d3.selectAll(".source_a_b").transition().duration(t_time).attr("opacity", opacs_a_b[i])
            d3.selectAll(".source_c").transition().duration(t_time).attr("opacity", opacs_c[i])

            // Control quote image
            d3.selectAll(".quote_image").transition().duration(t_time).attr("opacity", opacs_img[i])

        })

}

// Render above visualisations, re-render if window resized
render()
d3.select(window).on('resize', render)