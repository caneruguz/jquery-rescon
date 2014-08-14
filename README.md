jquery-rescon
=============

#### Jquery plugin for allowing fixed width containers to render responsively regardless of viewport size

At the time of the creation of this plugin Bootstrap responsiveness used the @media tags in css to define its grid so that all grid related sizing was based on how wide the viewport of the browser was. 

However when you put bootstrap content into fixed width containers, you lose the responsiveness of the page. This is a problem for making containers look good in small sizes as well, especially in cases of widgets or widget heavy sites like dashboards. 

This plugin does something very simple. It gets the width of the container and readjusts the bootstrap classes. For instance if a page has .col-xs-12 and col-md-6; the script recognizes that although the page is wide the container is within xs width. So the script removes .col-md-6 so that only the xs style goes into effect. 

This plugin also supports the bottom-up hierachy of bootstrap. If you define col-xs-6, all sizes higher than xs will also follow this. 

For divs without any column information it falls back to standard 12 width column. 

The script doesn't make any permanent changes and does not interfere with other classes in these elements. 
