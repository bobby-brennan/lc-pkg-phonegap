// Converted from tlvince's shell script:
// https://github.com/tlvince/phonegap-icon-splash-generator/blob/master/phonegap-icon-splash-generator.sh

var EXEC = require('child_process').exec;

var ICON_SET = [
  // Default icon
  {size: "128x128", file: "www/icon.png"},

  // Icons
  {size: "128x128", file: "www/res/icon/icon.png"},
  {size: "36x36", file: "www/res/icon/android/icon-36-ldpi.png"},
  {size: "72x72", file: "www/res/icon/android/icon-72-hdpi.png"},
  {size: "48x48", file: "www/res/icon/android/icon-48-mdpi.png"},
  {size: "96x96", file: "www/res/icon/android/icon-96-xhdpi.png"},

  {size: "80x80", file: "www/res/icon/blackberry/icon-80.png"},

  {size: "29x29", file: "www/res/icon/ios/icon-29.png"},
  {size: "40x40", file: "www/res/icon/ios/icon-40.png"},
  {size: "50x50", file: "www/res/icon/ios/icon-50.png"},
  {size: "57x57", file: "www/res/icon/ios/icon-57.png"},
  {size: "58x58", file: "www/res/icon/ios/icon-58.png"},
  {size: "72x72", file: "www/res/icon/ios/icon-72.png"},
  {size: "76x76", file: "www/res/icon/ios/icon-76.png"},
  {size: "80x80", file: "www/res/icon/ios/icon-80.png"},
  {size: "100x100", file: "www/res/icon/ios/icon-100.png"},
  {size: "144x144", file: "www/res/icon/ios/icon-144.png"},
  {size: "114x114", file: "www/res/icon/ios/icon-114.png"},
  {size: "120x120", file: "www/res/icon/ios/icon-120.png"},
  {size: "152x152", file: "www/res/icon/ios/icon-152.png"},

  {size: "64x64", file: "www/res/icon/webos/icon-64.png"},

  {size: "48x48", file: "www/res/icon/windows-phone/icon-48.png"},
  {size: "173x173", file: "www/res/icon/windows-phone/icon-173-tile.png"},

  // Splash screens
  {size: "512x512", extent: "1280x720", file: "www/res/screen/android/screen-xhdpi-landscape.png"},
  {size: "256x256", extent: "480x800", file: "www/res/screen/android/screen-hdpi-portrait.png"},
  {size: "128x128", extent: "320x200", file: "www/res/screen/android/screen-ldpi-landscape.png"},
  {size: "512x512", extent: "720x1280", file: "www/res/screen/android/screen-xhdpi-portrait.png"},
  {size: "256x256", extent: "320x480", file: "www/res/screen/android/screen-mdpi-portrait.png"},
  {size: "256x256", extent: "480x320", file: "www/res/screen/android/screen-mdpi-landscape.png"},
  {size: "128x128", extent: "200x320", file: "www/res/screen/android/screen-ldpi-portrait.png"},
  {size: "256x256", extent: "800x480", file: "www/res/screen/android/screen-hdpi-landscape.png"},

  {size: "128x128", extent: "225x225", file: "www/res/screen/blackberry/screen-225.png"},

  {size: "256x256", extent: "640x960", file: "www/res/screen/ios/screen-iphone-portrait-2x.png"},
  {size: "256x256", extent: "320x480", file: "www/res/screen/ios/screen-iphone-portrait.png"},
  {size: "256x256", extent: "960x640", file: "www/res/screen/ios/screen-iphone-landscape-2x.png"},
  {size: "256x256", extent: "480x320", file: "www/res/screen/ios/screen-iphone-landscape.png"},

  {size: "512x512", extent: "768x1004", file: "www/res/screen/ios/screen-ipad-portrait.png"},
  {size: "1024x1024", extent: "1536x2008", file: "www/res/screen/ios/screen-ipad-portrait-2x.png"},
  {size: "512x512", extent: "1024x783", file: "www/res/screen/ios/screen-ipad-landscape.png"},
  {size: "1024x1024", extent: "2008x1536", file: "www/res/screen/ios/screen-ipad-landscape-2x.png"},

  {size: "64x64", file: "www/res/screen/webos/screen-64.png"},

  {size: "256x256", extent: "480x800", file: "www/res/screen/windows-phone/screen-portrait.jpg"},
];

var makeDirs = function(rootDir, onDone) {
  var cmd = "mkdir -p " + rootDir + "/www/res/{icon,screen}/{android,blackberry,ios,webos,windows-phone}";
  EXEC(cmd, function(err, stdout, stderr) {
    if (err) throw err;
    onDone();
  });
}

var runConvert = function(source, iconConfig, background) {
  var cmd = "convert -resize " + iconConfig.size;
  if (background) {
    cmd += ' -background "' + background + '"';
  }
  if (iconConfig.extent) {
    cmd += ' -gravity center -extent ' + iconConfig.extent;
  }
  cmd += ' ' + source + ' ' + iconConfig.file;
  EXEC(cmd, function(err, stdout, stderr) {
    if (err) {
      console.log('Error converting icon. You must have ImageMagick installed if you want to specify an icon.');
      console.log('Try running\nsudo yum install ImageMagick ImageMagick-devel\nor\nsudo apt-get install imagemagick\n');
      throw err;
    }
  });
}

var runAllConverts = function(source, background) {
  for (var i = 0; i < ICON_SET.length; ++i) {
    runConvert(source, ICON_SET[i], background);
  }
}

exports.run = function(dirs, config, next) {
  if (!config.icon) {
    return next();
  }
  var icon = config.icon;
  var iconPath = icon.indexOf('/') === 0 ? icon : dirs.destDir + '/' + icon;
  makeDirs(dirs.destDir, function() {
    runAllConverts(iconPath, config.splash_background);
    next();
  });
}
