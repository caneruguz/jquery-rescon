/**
 * jquery-rescon - Build responsive bootstrap pages within fixed width containers in websites
 * @author Caner Uguz, caneruguz@gmail.com
 * @version v0.2.0
 * @link https://github.com/caneruguz/jquery-rescon
 * @license Apache 2.0
 */
(function($) {
    $.fn.rescon = function(options) {
        var self = this;
        this.settings = $.extend({                                      // Default options
            complete : null,                                            // Function to run at the end.
            sizes : { "xs" : 0, "sm" : 768, "md" : 992, "lg" : 1200 },  // Default Bootstrap sizes.
            action : "run"                                              // Action: "run" to apply or "reset" to reset.
        }, options);

        var el = this;                                                  // The elements this was called on. This is a list.
        this.sizes = ["xs", "sm", "md", "lg"];                          // Pre-existing sizes. Do not delete those, you can change them with the settings.

        this.runRescon = function (index, element){

            /* SET MODE BASED ON WIDTH  */
            var currentMode = "md";
            var size = self.settings.sizes;
            var width = $(element).width();                             // get container width and set the current mode. Change these sizes to your own threshold.
            if(width >= size.xs && width < size.sm ){
                currentMode = "xs"
            }
            if(width >= size.sm && width < size.md ){
                currentMode = "sm"
            }
            if(width >= size.md && width < size.lg ){
                currentMode = "md"
            }
            if(width >= size.lg ){
                currentMode = "lg"
            }


            /* CREATE DATA ATTRIBUTES  */
            $(element).find('div').each(function(i, e){                 // Find child elements that may have these classes
                var classString = $(e).attr('class');                   // Get existing classes
                if(classString){                                        // If there is no class attribute don't bother
                    var rescon_exists = $(e).attr('data-rescon');       // Check if there is already data-rescon attribute
                    var visible_exists = $(e).attr('data-visible');     // Check if there is already data-visible attribute
                    if(!rescon_exists || !visible_exists) {             // If either one of them is missing continue
                        var rescon_string = "";                         // Set variable for collecting rescon classes
                        var visible_string = "";                        // Set variable for collecting visible classes
                        var classList = classString.split(' ');         // split classes into array
                        for (var i = 0; i < classList.length; i++) {    // loop through classes
                            var o = classList[i];
                            if (!rescon_exists) {                       // if data-rescon attribute does not exist, generate it
                                if (o.indexOf('col-') !== -1) {         // if this class includes 'col-' add it to rescon
                                    rescon_string += " " + o;
                                }
                            }
                            if (!visible_exists) {                      // check if data-visible attribute does not exits, generate it
                                if (o.indexOf('visible-') !== -1 || o.indexOf('hidden-') !== -1) {
                                    visible_string += " " + o;          // if this class includes visible att it to visible attribute
                                }
                            }
                        }
                        if(rescon_string){ $(e).attr('data-rescon', rescon_string.trim()) } ;     // set data-rescon attribute with classes we collected
                        if( visible_string) { $(e).attr('data-visible', visible_string.trim()) } ; // set visible attribute with classes we collected
                    }
                    var newclass = classString.replace(/\bcol-\S*/g, "").replace(/\bvisible-\S*/g, "").replace(/\hidden-\S*/g, "");      // Remove all classes related to column resizing so we are left with original classes
                    $(e).attr('class', newclass);                       // set visible attribute with classes we collected
                }

            })


            /* SET WIDTHS  */
            $(element).find('[data-rescon*="col-"]').each(function(i, e){  // Look at each column element within this div. You can change .find() to other selectors for more refined control.
                var dataString = $(e).attr('data-rescon');              // existing column related classes
                var newCols = "";                                       // the column classes we wil assign to this element
                var currentSize = self.sizes.indexOf(currentMode); // Index for the current size in the sizes table, returns 0, 1 etc.
                var dataList = dataString.split(" ");                   // split colum related classes into class names
                var before = self.recurseDown(currentSize, dataString); // If there are no column identifiers at this level move down, because bootstrap cascades upwards.
                if(before !== -1){                                      // before shouldn't be -1, this is to avoid errors.
                    for(var i = 0; i < dataList.length; i++) {          // Loop through colum relevant classes
                        var o = dataList[i];
                        if(o.indexOf(self.sizes[before])  !== -1 ){     // if this class is pertinent to current size add it to the new column related classes
                            newCols += " "+o;
                        }
                    }
                }
                if(newCols == ""){                                      // If we still don't have anything set default of 12 width
                    var newCols = "col-"+currentMode+"-"+"12";
                }
                $(e).addClass(newCols.trim());                          // Rewrite the classes for the element
            })


            /* SET VISIBILITY */
            $(element).find('[data-visible*="visible"],[data-visible*="hidden"]:not(".hidden-print")').each(function(i, e) {
                var dataString = $(e).attr('data-visible');             // Get existing visibility. This data attribute should have been generated already.
                var dataArray = dataString.split(" ");
                for(var i = 0; i < dataArray.length; i++) {             // Loop through visibility options to apply classes. In cases of conflict the last class applies.
                    var c = dataArray[i];
                    var classArray = c.split('-')
                    var classView =  classArray[1];                     // Get the size of the class i.e. xs, sm etc.
                    if (c.indexOf("visible-") !== -1) {
                        if(classView == currentMode) {                  // If the class applies to the current more show display option
                            if(classArray.length > 2){
                                var classDisplay =  classArray[3] ? classArray[2]+"-"+classArray[3] : classArray[2];
                                $(e).css("display", classDisplay);
                            } else {
                                $(e).css("display", "block");
                            }
                        }
                        else {
                            $(e).css("display", "none");                // If class doesn't apply to the current hide.
                        }
                    }
                    if (c.indexOf("hidden-") !== -1) {                  // If class is hidden do opposite.
                        if(classView == currentMode) {
                            if(classArray[0] === 'hidden'){
                                $(e).css("display", "none");
                            }
                        } else {
                            if(classArray[0] === 'hidden'){
                                $(e).css("display", "block");
                            }
                        }
                    }

                }
            });
        }


        this.recurseDown = function recur (index, dataString){          // Helper function to recursively check if lower widhts are set, for instance for mode md, check if sm or xs is set.
            if(index >= 0){
                if(dataString.indexOf(self.sizes[index])){
                    return index;
                } else {
                    recur(index-1, dataString)
                }
            } else {
                return -1;
            }
        }

        this.reset = function (index, element){                         // Clear the effects of the plugin by restoring to original classes.
            $(element).find('div[data-rescon*="col-"]').each(function(i, e){
                var dataString = $(e).attr('data-rescon');
                var classString = $(e).attr('class');
                var newclass = classString.replace(/^col.*/g, "");
                $(e).attr('class', newclass+" "+dataString);
            })
            el.find('[class*=visible],[class*=hidden]:not(".hidden-print")').each(function(i, e){
                $(this).addClass($(this).attr('data-visible'))
            })
        }

        if(this.settings.action === "run"){
            el.each(self.runRescon);
        }
        if(this.settings.action === "reset"){
            el.each(self.reset);
        }

        // Run the complete function if there is one
        if ( $.isFunction( self.settings.complete ) ) {
            self.settings.complete.call( this );
        }

        // Return the element so jquery can chain it
        return this;

    }

}(jQuery));
