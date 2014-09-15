jquery-rescon
=============

Jquery plugin for allowing fixed width containers to render responsively regardless of viewport size

#### Description 

At the time of the creation of this plugin Bootstrap responsiveness used the @media tags in css to define its grid so that all grid related sizing was based on how wide the viewport of the browser was. 

However when you put bootstrap content into fixed width containers, you lose the responsiveness of the page. This is a problem for making containers look good in small sizes as well, especially in cases of widgets or widget heavy sites like dashboards. 

This plugin does something very simple. It gets the width of the container and readjusts the bootstrap classes. For instance if a page has .col-xs-12 and col-md-6; the script recognizes that although the page is wide the container is within xs width. So the script removes .col-md-6 so that only the xs style goes into effect. 

This plugin also supports the bottom-up hierachy of bootstrap. If you define col-xs-6, all sizes higher than xs will also follow this. 

For divs without any column information it falls back to standard 12 width column. 

The script doesn't make any permanent changes and does not interfere with other classes in these elements. 

#### How to use it
Use the plugin as with any other jquery plugin by adding it to the wrapper element that contains your sizable divs. 

```javascript 
$(document).ready(function(){
    // Regular methods of doing it. Considering .rescon is the container for your columns
      $(".rescon").rescon();
    
    // You can programmatically reset the plugin and take things back to their original state. This example uses a button click
    $('#reset').on('click', function(){
        $(".rescon").rescon({ action : "reset"});
    })
    
    // And run it back again. 
    $('#run').on('click', function(){
      $(".rescon").rescon({ action : "run"});
    })
    
    // Add custom sizes
    $(".rescon").rescon( { 
        sizes : { "xs" : 0, "sm" : 300, "md" : 600, "lg" : 1000 }
    });
        

})
```

#### Download
The files you need to use are under /dist folder, there is a minified version as well. 

#### Demo
Demo page coming soon. 
