var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

$(document).ready(function() {
    $(document).on('keypress', function(event) {
        if(event.key == '5') {
            $('#left .grid').toggleClass('five');
        }
    });
});
