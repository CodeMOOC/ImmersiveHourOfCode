/* Animation utility */
function isFunction(object) {
   return !!(object && object.constructor && object.call && object.apply);
}

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if(isFunction(callback)) {
                callback(this);
            }
        });
    }
});

var tiles = [
    {
        'name': 'Tavole di legno',
        'texture': 'planks_oak.png'
    },
    {
        'name': 'Blocco di legno',
        'texture': 'code-org-block.png'
    },
    {
        'name': 'Ghiaia',
        'texture': 'gravel.jpg'
    },
    {
        'name': 'Esplosivo',
        'texture': 'tnt.png'
    },
    {
        'name': 'Batteria',
        'texture': 'battery.png'
    },
    {
        'name': 'Lava',
        'texture': 'lava.gif'
    },
    {
        'name': 'Tesoro',
        'texture': 'chest.png'
    },
    {
        'name': 'Maiale',
        'texture': 'code-org-goal.gif',
        'scale': 0.8
    },
    {
        'name': 'Angry Prof',
        'texture': 'angryProf.png',
        'scale': 1.0
    },
    {
        'name': 'Angry Breen',
        'texture': 'angryBreen.png',
        'scale': 1.0
    }
];

var backgrounds = [
    {
        'name': 'Nero',
        'texture': 'background_black.png'
    },
    {
        'name': 'Code.org',
        'texture': 'background_code_org.png'
    }
];

var lastCard = null;

function genSelectCard(i) {
    return function() {
        console.log('Assigning tile ' + i + ' to card ' + lastCard);

        if(lastCard) {
            if(i < 0 || i >= tiles.length) {
                //Blank tile
                $(lastCard).css('background-image', '');
            }
            else {
                var selTile = tiles[i];

                $(lastCard).css('background-image', 'url(\'resources/textures/' + selTile.texture + '\')');
                if(selTile.scale) {
                    $(lastCard).css('background-size', (selTile.scale * 100.0) + '% ' + (selTile.scale * 100.0) + '%')
                }
                else {
                    $(lastCard).css('background-size', '100% 100%');
                }
            }
        }

        closeDialog($('.tile-dialog'));
    };
}

function closeDialog(container) {
    var dialog = container.find('.dialog');
    var fader = container.find('.fader');
    fader.animateCss('fadeOut animate-fast');
    dialog.animateCss('fadeOutDown animate-fast', function() {
        container.hide();
    });
}

$(document).ready(function() {
    var cards = $('#left .grid .card');

    //Dialog init
    $('.tile-dialog').hide();
    var dialogContent = $('.tile-dialog > .dialog > .content')[0];
    for(var i = -1; i < tiles.length; ++i) {
        var tileElement = document.createElement("div");
        tileElement.setAttribute('class', 'tile');
        if(i == -1)
            tileElement.innerHTML = '<div class="name">Vuoto</div><div class="image"></div>';
        else
            tileElement.innerHTML = '<div class="name">' + tiles[i].name + '</div><div class="image" style="background-image: url(\'resources/textures/' + tiles[i].texture + '\')"></div>';
        tileElement.onclick = genSelectCard(i);
        $(dialogContent).append(tileElement);
    }

    //Dialog opener
    cards.click(function() {
        console.log('Tile clicked');
        lastCard = $(this);

        var container = $('.tile-dialog').show();
        container.find('.dialog').animateCss('zoomIn animate-fast');
        container.find('.fader').animateCss('fadeIn animate-fast');
    });

    //Dialog closer
    $('body').on('click', '.dialog-container a.closer', function() {
        var container = $(this).parent().parent();
        closeDialog(container);
    });

    //Options init
    var backgroundSelector = $('.option .background-selector');
    for(var i = 0; i < backgrounds.length; ++i) {
        var optionElement = document.createElement('option')
        optionElement.setAttribute('value', backgrounds[i].texture);
        optionElement.innerText = backgrounds[i].name;

        $(backgroundSelector).append(optionElement);
    }
    backgroundSelector.change(function() {
        var background_filename = $(this).val();
        console.log('Selected background ' + background_filename);
        $('#left .grid').css('background-image', 'url(\'resources/textures/' + background_filename + '\')');
    });
    $('#left .grid').css('background-image', 'url(\'resources/textures/' + backgrounds[0].texture + '\')');

    $('#left a.reset').click(function() {
        cards.css('background-image', '');
        backgroundSelector[0].selectedIndex = 0;
        $('#left .grid').css('background-image', 'url(\'resources/textures/' + backgrounds[0].texture + '\')');
    });
});
