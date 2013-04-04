
$(document).ready(function () {
  'use strict';


  var path = '/a/localdata.com/spreadsheet/formResponse?formkey=dDQ5Vm02REM2dEZGalA3bnpqS1BEZmc6MQ&ifq';
  var formUrl = 'https://docs.google.com' + path;

  function setToggle(id) {
    var $el = $('#' + id);
    $el.change(function handleToggle(e) {
      var $sub = $('div[data-condition="' + id + '"]');
      if ($el.prop('checked')) {
        console.log($sub);
        $sub.show(400);
      } else {
        $sub.hide(400);
      }
    });
  }

  setToggle('soon');
  setToggle('past');
  setToggle('tech-1');

  // Collect and submit entries from the form.
  $('#interested').submit(function (e) {
    e.preventDefault();
    $('#form-submit').val('Submitting...');


    // Validation
    $('#req-message').hide();
    var valid = true;
    $('input[data-required="true"]').each(function () {
      var val = $(this).val();
      if (!val) {
        valid = false;
      }
    });

    if (!valid) {
      $('#req-message').show();
      $('#form-submit').val('Submit');
      $('body').animate({
        scrollTop: 0
      });
      return;
    }

    var data = $(this).serialize();
    console.log(data);
    // Record responses in the spreadsheet.
    $.ajax({
      url: formUrl,
      data: data,
      type: 'POST',
      headers: {
        ':host': 'docs.google.com',
        ':method': 'POST',
        ':path': path,
        ':scheme': 'https',
        ':version': 'HTTP/1.1'
      }
    }).done(function () {
      // Thank the user.
      $('#sec-form').hide(500, function () {
        $('#sec-thanks').show(600);
      });
    }).fail(function () {
      $('#form-submit').val('Oops! Please try again in a bit.');
      setTimeout(function () {
        $('#form-submit').val('Submit');
      }, 2000);
    });
  });
});
