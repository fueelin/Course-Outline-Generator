window.generateOutline = function() {

    var course = {
        name: $('.title').text().trim(),
        units: [],
    };

    var $modules = $('.c-outline-module');

    for(var m = 0; m < $modules.length; m++) {
        var $module = $($modules[m]);

        var module = {
            name: $module.find('.c-outline-module-title').text().split(String.fromCharCode(160))[1], //Split on &nbsp
            topics: []
        };

        var $lessons = $module.find('.c-outline-lesson');

        for(var l = 0; l < $lessons.length; l++) {
            var $lesson = $($lessons[l]);

            var lesson = {
                name: $lesson.find('.bt3-col-xs-9 h4').text().trim(),
                sections: [],
            };

            var $videos = $lesson.find('.c-outline-item-content').has('.cif-play-circle');

            for(var v = 0; v < $videos.length; v++) {
                var $video = $($videos[v]);

                var video = {
                    name: $video.find('.c-outline-item-title-text').text().trim(),
                };

                lesson.sections.push(video);
            }

            module.topics.push(lesson);
        }

        course.units.push(module);
    }

    return course;
};