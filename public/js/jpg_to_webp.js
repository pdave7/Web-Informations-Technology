const webp=require('webp-converter');

//pass input image(.jpeg,.pnp .....) path ,output image(give path where to save and image file name with .webp extension)
//pass option(read  documentation for options)

//cwebp(input,output,option,result_callback)

webp.cwebp("../img/index_bg_blur.jpg","../img/index_bg_blur_reduced.webp","-q 40",function(status)
 {
   //if exicuted successfully status will be '100'
   //if exicuted unsuccessfully status will be '101'
   console.log(status);
 });
