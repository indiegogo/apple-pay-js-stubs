function formatLog(text) {
    var timestamp = Math.round(new Date().getTime()/1000)
    return timestamp + ": " + text;
}

function logSessionInteraction(text) {
    $( "<div>" + formatLog(text) + "</div>" ).appendTo( "#interactions" );
}

function logSessionError(text) {
    $( "<div class=\"error\">" + formatLog(text) + "</div>" ).appendTo( "#interactions" );
}

// loadScript based on Answer by e-satis
// from http://stackoverflow.com/a/950146/40444
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}