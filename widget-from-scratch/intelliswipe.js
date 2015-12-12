(function ($) {

    var deleteLi = function (element) {
        $(element).remove();
    }

    var consolePrint = function(value) {
        $("#console").append(value);
    }

    var bool = true;
    var trackSlide = function (event) {
        console.log(event);

        $.each(event.changedTouches, function (index, touch) {
            //console.log($(touch.target).parent()[0])

            var target = touch.target;
            while(!$(target).is("li")) {
                //if(bool)console.log("backtracking");
                target = $(target).parent()[0]
            }
            console.log(target.movingBox);
            bool = false;  
            if (target.movingBox) {
                target.movingBox.offset({
                    left: touch.pageX - target.deltaX
                });
                target.lastOffSetX = touch.pageX - target.deltaX
            }
            
        });
        event.preventDefault();
    }

    var endSlide = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            var target = touch.target;
            while(!$(target).is("li")) {
                target = $(target).parent()[0]
            }            
            var startingPos = target.startingPosition;
            var lastPos = target.lastOffSetX;
            var LEFT_BUTTON_WIDTH = $(".left-button").width();
            var RIGHT_BUTTON_WIDTH = $(".left-button").width();
            var smallDrag = Math.abs((lastPos - startingPos)) < 100

            if (target.movingBox && $(target).is("li")) {
                if (smallDrag) {
                    target.movingBox.offset({
                        left: target.startingPosition
                    });            
                } else {
                    if (startingPos < lastPos) {
                        target.movingBox.offset({
                            left: (target.startingPosition + LEFT_BUTTON_WIDTH)
                        });   
                    } else {
                        target.movingBox.offset({
                            left: (target.startingPosition - RIGHT_BUTTON_WIDTH)
                        }); 
                    }
                }   
                target.movingBox = null;
            }
        });
    } 

    var startMove = function (event) {

        $.each(event.changedTouches, function (index, touch) {
            var target = touch.target;
            while(!$(target).is("li")) {
                if(bool)console.log("backtracking");
                target = $(target).parent()[0]
            }
            if($(target).is("li")) {
            
            var jThis = $(target),
                startOffset = jThis.offset();
            
            target.movingBox = jThis;
            target.startingPosition = startOffset.left;
            target.deltaX = touch.pageX - startOffset.left;
}
        });
        
        event.stopPropagation();
    }

    var appendRightButton = function(element) {
        var listItem = $(element);
        listItem.prepend("<div class='right-button'> </div> ");
        var rightButton = listItem.find(".right-button");  
        rightFunction(rightButton, listItem);              
    }

    var rightFunction;
    var leftFunction;

    var deleteButton = function(buttonSide, listItem) {
        buttonSide.click(function () {
            deleteLi(listItem);
        });
    }

    var saveButton = function () {
        //To be implemented
    }

    var appendLeftButton = function(element) {
        $(element).prepend("<div class='left-button'> </div> ");          
    }       


    $.fn.intelliswipe = function (options) {
        var def = {
            'right-function': deleteButton
            ,'left-function': saveButton
        };

        jQuery.extend(options, def);
        rightFunction = def['right-function'];
        leftFunction = def['left-function'];
        var ulItems = $(this).children();

        ulItems.each(function (index, element) {
            $(element).width($("#list-container").width() + 300);
            appendRightButton(element);
            appendLeftButton(element);       
            element.addEventListener("touchstart", startMove, false);
            element.addEventListener("touchmove", trackSlide, false);
            element.addEventListener("touchend", endSlide, false);

        });

        $('#list-container').scrollLeft($(".left-button").width());   
    };
}(jQuery));