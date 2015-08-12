//Example: Natural Language Processing
window.generateOutline = function() {

    var courseItems = $('.course-item-list').children(),
        currentWeek = null,
        currentLecture = null,
        headerFormat = null;

    var headerFormats = {
        weekDashedPre: 1,
        romanPreWeekParentheticalPost: 2,
    };

    //#### Course ####
    var course = {
        name: $('.course-topbanner-name').text(),
        units: [],
    };

    for(var i = 0; i < courseItems.length; i++) {
        var $item = $(courseItems[i]);

        if($item.hasClass('course-item-list-header')) {
            var headerText = $item.children('h3').text().trim();

            if(headerFormat === null) {

                //*TCB* Regex would be better...
                if(headerText.has('Week 1 - ')) {
                    headerFormat = headerFormats.weekDashedPre;
                }
                else if(headerText.has('I. ') && headerText.has('(Week 1)')) {
                    headerFormat = headerFormats.romanPreWeekParentheticalPost;
                }
            }

            var weekNumber = null,
                lectureName = null;

            if(headerFormat === headerFormats.weekDashedPre) {
                var headerParts = headerText.split(' - ');

                weekNumber = headerParts[0].split(' ')[1];
                lectureName = headerParts[1];
            }
            else if(headerFormat === headerFormats.romanPreWeekParentheticalPost) {

                var headerParts = headerText.split(' ('),
                    weekText = headerParts[1].replace(')', '');

                weekNumber = weekText.split(' ')[1];
                lectureName = headerParts[0].from(headerParts[0].indexOf(' ')).titleize();
            }

            //#### Week ####
            if(!currentWeek || currentWeek.weekNumber != weekNumber) {

                currentWeek = {
                    name: 'Week ' + weekNumber,
                    weekNumber: weekNumber,
                    topics: [] }

                course.units.push(currentWeek);

                currentLecture = null;
            }

            //#### Lecture ####
            if(!currentLecture || currentLecture.name !== lectureName) {

                currentLecture = {
                    name: lectureName,
                    sections: [],
                };

                currentWeek.topics.push(currentLecture);
            }
        }
        else if($item.hasClass('course-item-list-section-list')) {
            var $sections = $item.children('li');

            //#### Sections ####
            for(var j = 0; j < $sections.length; j++) {
                var $section = $($sections[j]);

                //Handle multi-part sections.
                var sectionText = $section.children('a').text().trim(),
                    sectionName = sectionText.split('(')[0].trim();

                if(!excludedSections.any(sectionName)) {

                    var doesSectionExist = currentLecture.sections.any(function (section) {
                        return section.name === sectionName;
                    });

                    if (!doesSectionExist) {
                        currentLecture.sections.push({name: sectionName});
                    }
                }
            }
        }
    }

    return course;
};