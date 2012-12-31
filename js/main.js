
$(document).ready(function () {
  'use strict';

  var formUrl = 'https://script.google.com/macros/s/AKfycbwSnzL9t1eM7Yolf0iOK35E5Rqx55r5w7F5uybDgOGMi6C_ilE/exec';

  function showDepth(e) {
    $('#form-depth-sep').show();
    $('#form-depth').show(400);
  }

  $('#form-name').focus(showDepth);
  $('#form-email').focus(showDepth);

  if (window.location.hash === '#interest') {
    showDepth();
  }

  // Collect and submit entries from the form.
  $('#subForm').submit(function (e) {
    e.preventDefault();

    // Name and email
    var data = {
        name: $('#form-name').val(),
        email: $('#form-email').val()
    };

    // How did they hear about us?
    data.source = $('input[name="source"]:checked').val();
    // Handle the "other" case
    if (data.source === '') {
      data.source = $('#source-other').val();
    }

    // What type of work do they do?
    data.work = $('input[name="work"]:checked').val();
    if (data.work === '') {
      data.work = $('#work-other').val();
    }

    // What type of organization?
    data.org = $('input[name="org"]:checked').val();
    if (data.org === '') {
      data.org = $('#org-other').val();
    }

    // When will they collect data?
    data.when = $('input[name="when"]:checked').val();

    $('#form-submit').val('Submitting...');

    // Record responses in the spreadsheet.
    $.ajax({
      url: formUrl,
      data: data,
      dataType: 'jsonp'
    }).always(function () {
      // Submit signup info to Campaign Monitor.
      $('#hidden-name').val(data.name);
      $('#hidden-email').val(data.email);
      $('#hidden-form').submit();

      $('#form-submit').val('Subscribe');
    });

  });
});
