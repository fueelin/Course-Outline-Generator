window.generateOutline = function() {

    var course = {
        name: $('.course-title').text().trim(),
        units: [],
    };

    var $units = $('.section');

    for(var t = 0; t < $units.length; t++) {
        var $unit = $($units[t]);

        var unit = {
            name: $unit.find('.title a').text().trim(),
            topics: [],
        };

        var topic = {
            name: null,
            sections: [],
        }

        var $sections = $unit.find('.content');

        for(var s = 0; s < $sections.length; s++) {
            var $section = $($sections[s]);

            var section = {
                name: $section.find('h5').text().trim(),
                sections: [{ name: null }],
            };

            topic.sections.push(section);
        }

        unit.topics.push(topic);

        course.units.push(unit);
    }

    return course;
};