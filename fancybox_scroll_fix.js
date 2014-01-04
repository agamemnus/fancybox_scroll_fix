This code combination is (c) 2013 Michael Romanovsky
Released under MIT license: http://opensource.org/licenses/MIT

// This function is public domain.
// Merge two objects together.
// If the primary object has the same key as the secondary object:
// If both keys' values are function, merge the functions, secondary first.
// If that key's value is an object, use the primary object's value.
function merge_objects_with_options (secondary, primary, options) {
  if (typeof options == "undefined") options = {}
 if (typeof secondary == "undefined") var primary = primary.primary, secondary = primary.secondary
 var new_object = {}
 for (var property in secondary) {new_object[property] = secondary[property]}
 for (var property in primary)   {
  if ((options.merge_subfunctions) && (typeof secondary[property] == "function") && (typeof primary[property] == "function")) {
   new_object[property] = function () {
    var args = Array.prototype.slice.call(arguments)
    secondary[property].apply (this, args)
    primary[property]  .apply (this, args)
   }
   continue
  }
  new_object[property] = primary[property]
 }
 return new_object
}

// This function is also public domain.
function detect_scrollbar_thickness () {
 // Create the measurement node.
 var scrollDiv = document.createElement("div")
 scrollDiv.style.width    = '100px'
 scrollDiv.style.height   = '100px'
 scrollDiv.style.overflow = 'scroll'
 scrollDiv.style.position = 'absolute'
 scrollDiv.style.top      = '-9999px'
 document.body.appendChild(scrollDiv)
 // Get the scrollbar width.
 var scrollbar_width = scrollDiv.offsetWidth - scrollDiv.clientWidth
 // Delete the DIV 
 document.body.removeChild (scrollDiv)
 return scrollbar_width
}


var fancybox_scroll_fix = {
 beforeLoad : function () {
  this.fancybox_scroll_fix = {}
  if ((window.innerWidth != document.body.clientWidth) || (window.innerHeight != document.body.clientHeight)) {
   var scrollbar_thickness = detect_scrollbar_thickness ()
   if (window.innerWidth != document.body.clientWidth) {
    this.fancybox_scroll_fix.temp_body_margin_right = scrollbar_thickness
     document.body.style.marginRight  = (parseFloat(window.getComputedStyle(document.body).getPropertyValue('margin-right'))  + scrollbar_thickness) + 'px'
   }
   if (window.innerHeight != document.body.clientHeight) {
    this.fancybox_scroll_fix.temp_body_margin_bottom = scrollbar_thickness
    document.body.style.marginBottom = (parseFloat(window.getComputedStyle(document.body).getPropertyValue('margin-bottom')) + scrollbar_thickness) + 'px'
   }
  }
 },
 afterClose : function () {
  $('.fancybox-lock .fancybox-overlay').css({'overflow-x': this.original_scroll_x, 'overflow-y': this.original_scroll_y})
  if ((this.fancybox_scroll_fix.temp_body_margin_right != 0) || (this.fancybox_scroll_fix.temp_body_margin_bottom != 0)) {
   var overlay = document.getElementsByClassName('fancybox-overlay')[0]
   overlay.parentNode.removeChild (overlay)
  }
  if (this.fancybox_scroll_fix.temp_body_margin_right != 0) {
   document.body.style.marginRight  = (parseFloat(window.getComputedStyle(document.body).getPropertyValue('margin-right'))  - this.fancybox_scroll_fix.temp_body_margin_right) + 'px'
   this.fancybox_scroll_fix.temp_body_margin_right = 0
  }
  if (this.fancybox_scroll_fix.temp_body_margin_bottom != 0) {
   document.body.style.marginBottom = (parseFloat(window.getComputedStyle(document.body).getPropertyValue('margin-bottom')) - this.fancybox_scroll_fix.temp_body_margin_bottom) + 'px'
   this.fancybox_scroll_fix.temp_body_margin_bottom = 0
  }
 },
 afterLoad  : function () {
  this.original_scroll_x = $('.fancybox-lock .fancybox-overlay').css('overflow-x')
  this.original_scroll_y = $('.fancybox-lock .fancybox-overlay').css('overflow-y')
  $('.fancybox-lock .fancybox-overlay').css({'overflow-x': 'auto', 'overflow-y': 'auto'})
 }
}
