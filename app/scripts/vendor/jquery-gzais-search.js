(function($) {

    $.fn.nameSearch = function(url) {

        $( this ).select2( {
            minimumInputLength: 1,
            ajax: {
                url: url,
                dataType: 'json',
                data: function( term, page ) {
                    return {
                        search: term,
                    };
                },
                results: function( data, page ) {
                    return {
                        id: data.id,
                        results: data
                    };
                }
            },
            id: function( user ) {
                return user.first_name + " " + user.last_name;
            },
            escapeMarkup: function(m) {
                return m;
            },
            formatResult: userFormatResult,
            formatSelection: userFormatSelection
        });

        $( this ).on( "select2-blur", function( e ) {
            $( '.searchBox' ).hide( );
        } );

    }

    function userFormatResult(user) {
        var fullName = user.first_name + " " + user.last_name;
        var markup = "<table class='user-result'><tr>";
        markup += "<td class='user-info'><div class='user-title'>" + fullName + "</div>";
        markup += "</td></tr></table>"
        return markup;
    }

    function userFormatSelection(user) {
        var fullName = user.first_name + " " + user.last_name;
        return fullName;
    }


}(jQuery));
