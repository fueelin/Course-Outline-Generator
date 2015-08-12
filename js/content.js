var excludedSections = [
  'Summary',
];

(function registerEvents() {

  chrome.runtime.onMessage.addListener(function () {
    makeTemplate();
  });
}())

function makeTemplate() {

  return $.when(window.generateOutline()).then(function (course) {

    //#### Parse Course ####

    //Remove empty topics.
    course.units.forEach(function (week) {

      week.topics = week.topics.filter(function (lecture) {
        return lecture.sections.length;
      });

      //If this Unit only has a single Topic and they have the same name, clear out the Topic name.
      if(week.topics.length === 1 && week.topics[0].name === week.name) {
        week.topics[0].name = null;
      }

      week.topics.forEach(function (topic) {

        //If this Topic only has a single Section and they have the same name, clear out the Section name.
        if(topic.sections.length === 1 && topic.sections[0].name === topic.name) {
          topic.sections[0].name = null;
        }
      });
    });

    //#### Create Outline ####
    return $.get(chrome.extension.getURL('templates/course.template.html')).then(
        function (templateSource) {

          var template = Handlebars.compile(templateSource),
            renderedHTML = template(course);

          downloadFileFromText(course.name + ' Notes.doc', renderedHTML);
        },
        function (error) {
          console.log(error);
        }
    );
  });
}

function downloadFileFromText(filename, content) {
  var blob = new Blob([ content ], {type : "text/plain;charset=UTF-8"});
  var a = document.createElement('a');

  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.style.display = 'none';

  document.body.appendChild(a);

  a.click();

  delete a;
}
