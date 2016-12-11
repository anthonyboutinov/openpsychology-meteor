import './organizer.html';

import '/imports/ui/components/dashboard/panels/organizer/coaches.js';
import '/imports/ui/components/dashboard/panels/organizer/events.js';
import { ReactiveVar } from 'meteor/reactive-var';

function getImageLightness(imageSrc,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness);
    }
}

Template.dashboardOrganizer.helpers({
  pageHeadingColorClass() {
    const bannerBrightness = this.bannerBrightness.get();
    const midBrightnessValue = 180;
    return bannerBrightness && bannerBrightness <= midBrightnessValue ? "color-light" : "";
  },
});

Template.dashboardOrganizer.onCreated(function(){

  this.data.bannerBrightness = new ReactiveVar(false);
  bb = this.data.bannerBrightness;

  const bannerLink = this.data.organizer().bannerLink();
  getImageLightness(bannerLink, function(brightness) {
    console.log(brightness);
    bb.set(brightness);
  });

});
