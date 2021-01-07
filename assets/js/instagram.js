var getImageCaption = function(text) {
    var split = text.indexOf('*\n');
    if(split > 0) {
        return text.substring(0, split);
    }

    var match = /#\w+\s+/.exec(text);
    if (match) {
        return text.substring(0, match.index);
    }
    return text;
};

var getImageDate = function(ts) {
    var posted = new Date(ts); // timestamp to date
    return posted.getDate() +'.'+ (posted.getMonth()+1) + '.' +  posted.getFullYear(); // format date
};

var renderBubble = function(data) {
    var item = data.data[0]; // latest image from instagram
    var parentNode = document.getElementById('instagram');
    var feedNode = document.getElementById('instafeed');

    // insert text bubble
    var el = document.createElement('div');
    el.innerText = getImageCaption(item.caption);
    el.classList.add("speech-bubble");
    parentNode.insertBefore(el, feedNode);

    // insert date under the bubble
    var dateEl = document.createElement("p");
    dateEl.innerText = '✔️' + getImageDate(item.timestamp);
    parentNode.insertBefore(dateEl, feedNode);
};

var customCaptionFilter = function(image) {
    image.customCaption = image.caption ? getImageCaption(image.caption) : '';
    return true;
};

// http://instafeedjs.com/
var feed = new Instafeed({
    accessToken: InstagramToken,
    limit: 12,
    filter: customCaptionFilter,
    template: '<a href="{{link}}"><img src="{{image}}" title="{{model.customCaption}}" /></a>',
    success: renderBubble
});
feed.run();
