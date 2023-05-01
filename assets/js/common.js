// add toggle functionality to abstract and bibtex buttons
$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
        $(this).parent().parent().find(".bibtex.hidden.open").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
        $(this).parent().parent().find(".abstract.hidden.open").toggleClass('open');
    });
    $('a').removeClass('waves-effect waves-light');
});

// add bootstrap classes to tables
$(document).ready(function() {
  $('table').each(function() {
    // only select tables that are not inside an element with "news" (about page) or "card" (cv page) class
    if($(this).parents('[class*="news"]').length==0 &&
        $(this).parents('[class*="card"]').length==0 &&
        $(this).parents('code').length == 0) {
      // make table use bootstrap-table
      $(this).attr('data-toggle','table');
      // add some classes to make the table look better
      // $(this).addClass('table-sm');
      $(this).addClass('table-hover');

      if (document.documentElement.getAttribute("data-theme") == "dark") {
        $(this).addClass('table-dark');
      } else {
        $(this).removeClass('table-dark');
      }
    }
  })
});

// bootstrap-toc
$(function () {
    if($('#toc-sidebar').length){
        var navSelector = "#toc-sidebar";
        var $myNav = $(navSelector);
        Toc.init($myNav);
        $("body").scrollspy({
            target: navSelector,
        });
    }
});

