

$(document).ready(function() {



    // function getQueryParameter(name) {
    //
    //     let pairs = window.location.search.substring(1).split('&');
    //     let pair;
    //
    //     for (let index = 0; index < pairs.length; index++) {
    //
    //         pair = pairs[index].split('=');
    //
    //         if (decodeURIComponent(pair[0]) === name) {
    //             return decodeURIComponent(pair[1]);
    //         }
    //     }
    //
    //     return false;
    // }

    function populateTable() {

        let tableContent = '';

        let req_path = "/users?user="+query;
        console.log(req_path);
        $.getJSON(req_path, function( data ) {


            // Stick our user data array into a userlist letiable in the global object
            console.log(data);
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>'+this.username+'</td>';
                tableContent += '<td>' + this.email + '</td>';
                tableContent += '<td>' + this.fullname + '</td>';
                tableContent += '<td>' + this.age + '</td>';
                tableContent += '<td>' + this.location + '</td>';
                tableContent += '<td>' + this.gender + '</td>';
                tableContent += '</tr>';
            });

            // Inject the whole content string into our existing HTML table
            $('#userList table tbody').html(tableContent);
        });
    };



    let query = $("#search").attr("data-x");
    console.log("que" +query);
    let html = '<h3>Search='+ query +'</h3>';

    $("#search").html(html);
    console.log(query);

    populateTable()

});