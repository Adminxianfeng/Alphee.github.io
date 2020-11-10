var charIndex = -1;
var stringLength = 0;
var inputText = "";
var contentToWrites = ["contentToWrite1", "contentToWrite2", "contentToWrite3", "contentToWrite4", "contentToWrite5", "contentToWrite6", "contentToWrite7", "contentToWrite8", "contentToWrite9"];
var myContents = ["myContent1", "myContent2", "myContent3", "myContent4", "myContent5", "myContent6", "myContent7", "myContent8", "myContent9"];
var blinks = ["blink1", "blink2", "blink3", "blink4", "blink5", "blink6", "blink7", "blink8", "blink9"];
var timer1;
function writeContent(init, activeIndex) {
    if (init) {
        inputText = document.getElementById(contentToWrites[activeIndex]).innerHTML;
    }
    if (charIndex == -1) {
        charIndex = 0;
        stringLength = inputText.length;
    }
    var initString = document.getElementById(myContents[activeIndex]).innerHTML;
    initString = initString.replace(/<SPAN.*$/gi, "");

    var theChar = inputText.charAt(charIndex);
    var nextFourChars = inputText.substr(charIndex, 4);
    if (nextFourChars == '<BR>' || nextFourChars == '<br>') {
        theChar = '<BR>';
        charIndex += 3;
    }
    initString = initString + theChar + "<SPAN id='" + blinks[activeIndex]+ "'>_</SPAN>";
    document.getElementById(myContents[activeIndex]).innerHTML = initString;

    charIndex = charIndex / 1 + 1;
    if (charIndex % 2 == 1) {
        document.getElementById(blinks[activeIndex]).style.display = 'none';
    } else {
        document.getElementById(blinks[activeIndex]).style.display = 'inline';
    }
    if (charIndex <= stringLength) {
        timer1 = setTimeout('writeContent(false,' + activeIndex + ')', 93);
    } else {
        blinkSpan(activeIndex);
    }
}
function stop() {
    timer1 && clearTimeout(timer1);
}
var currentStyle = 'inline';
function blinkSpan(index) {
    if (currentStyle == 'inline') {
        currentStyle = 'none';
    } else {
        currentStyle = 'inline';
    }
    document.getElementById(blinks[index]).style.display = currentStyle;
    setTimeout('blinkSpan(' + index + ')', 100);
}

function initParam() {
    charIndex = -1;
    stringLength = 0;
    inputText = "";
    currentStyle = 'inline';
}