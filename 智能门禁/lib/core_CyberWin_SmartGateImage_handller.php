<?php
// +----------------------------------------------------------------------
// | CYBERWINPHPDONET [ WE CAN DO IT JUST CYBER WIN IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2004-2016 http://www.ynwlzc.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: cybersnow<admin@ynwlzc.cn>
// +----------------------------------------------------------------------

/**
 * CYBERWINPHPDONET core_CyberWin_SmartGateImage_handller 刷脸图像处理
 * @category   
 * @package  Common
 * @author   cybersnow<admin@ynwlzc.cn>
 */


/*
*通用函数迁移
*/
	
class CyberWin_SmartGateImage_handller{

	public function cyberwin_getImgBase64($facecache_fullpath){
		$未来之窗转换['status']=4;
		$未来之窗转换['message']="未知";
		$未来之窗转换['src']=$facecache_fullpath;
		$未来之窗转换['data']="";

		if(file_exists($facecache_fullpath)){
		}else{
			$未来之窗转换['message']="文件不存在";
			return $未来之窗转换;
		}
		$图片类型 = $this->cyberwin_getImgFile_Type($facecache_fullpath);

		$目标最终地址= $facecache_fullpath;

		if($图片类型  == "jpg"){
		}

		if($图片类型  == "png"){

			
		}

		if($图片类型  == "bmp"){

			//echo "bmp格式";
		
			 
		}

		if($图片类型  == "gif"){

		}

		switch ($图片类型)
		{
		case "jpg":
			{
			}
		  break;  
		case "png":
			{
			  $图片格式png_数据 = imagecreatefrompng($facecache_fullpath);

			   $dstFile = str_replace('_ori.bmp', '_new_pngf.jpg', $facecache_fullpath);

               $res = imagejpeg($图片格式png_数据, $dstFile);

			   $目标最终地址= $dstFile;
			}
		  break;
		  case "gif":
			{
			
			  $图片格式png_数据 = imagecreatefromgif($facecache_fullpath);

			   $dstFile = str_replace('_ori.bmp', '_new_giff.jpg', $facecache_fullpath);

               $res = imagejpeg($图片格式png_数据, $dstFile);
			   imagedestroy($dstFile);
			  

			   $目标最终地址= $dstFile;
			}
		  break;
		  case "bmp":
			{
			 	 $dstFile = str_replace('_ori.bmp', '_new_bmpf.jpg', $facecache_fullpath);
			    $this->changeBMPtoJPGV2024($facecache_fullpath, $dstFile);
			
			  $目标最终地址= $dstFile;
			}
		  break;
		default:
			{
			$未来之窗转换['message']="未知".$图片类型;
			return $未来之窗转换;
			}
		}

 
 

		//echo $图片类型;

		 $content互联网 = file_get_contents($目标最终地址);



		  $file_content = chunk_split(base64_encode($content互联网)); // base64编码
		 $img_base64 = 'data:image/' . $img_type . ';base64,' . $file_content;//合成图片的base64编码

	     

		$未来之窗转换['status']=9;
		$未来之窗转换['message']="转换成功";
		$未来之窗转换['data']= $img_base64;
		$未来之窗转换['des']= $目标最终地址;
		return $未来之窗转换;
	}

	public function cyberwin_getImgFile_Type($facecache_fullpath){
	//image/png  image/bmp  image/jpeg
		$imginfo= getimagesize($facecache_fullpath);
		$图片类型 =  end($imginfo);

		if($图片类型 == "image/png"){
			return "png";
		}

		if($图片类型 == "image/bmp"){
			return "bmp";
		}

		if($图片类型 == "image/jpeg"){
			return "jpg";
		}

		if($图片类型 == "image/gif"){
			return "gif";
		}

		 

		return $图片类型;

      // return end($imginfo);
   }

	public function changeBMPtoJPGV2024($srcPathName,$dstFile ){
		$srcFile=$srcPathName;  
	   // $dstFile = str_replace('_ori.bmp', '_new.jpg', $srcPathName);
		$photoSize = GetImageSize($srcFile);  
		$pw = $photoSize[0];  
		$ph = $photoSize[1];
		$dstImage = ImageCreateTrueColor($pw, $ph);  
		$white = imagecolorallocate($dstImage, 255, 255, 255);
		//用 $white 颜色填充图像
		imagefill( $dstImage, 0, 0, $white);
		//读取图片  
		$srcImage = $this->ImageCreateFromBMP_private($srcFile); 
		//合拼图片  

		imagecopyresampled($dstImage, $srcImage, 0, 0, 0, 0, $pw, $ph, $pw, $ph);  
		$judge = imagejpeg($dstImage, $dstFile, 90);  
		imagedestroy($dstImage);
		if($judge){
			return $dstFile;
		}else{
			return false;
		}
	}

	public function ImageCreateFromBMP_private($filename) {
    if (!$f1 = fopen($filename, "rb"))
        return false;

    $FILE = unpack("vfile_type/Vfile_size/Vreserved/Vbitmap_offset", fread($f1, 14));
    if ($FILE['file_type'] != 19778)
        return false;

    $BMP = unpack('Vheader_size/Vwidth/Vheight/vplanes/vbits_per_pixel' .
        '/Vcompression/Vsize_bitmap/Vhoriz_resolution' .
        '/Vvert_resolution/Vcolors_used/Vcolors_important', fread($f1, 40));
    $BMP['colors'] = pow(2, $BMP['bits_per_pixel']);
    if ($BMP['size_bitmap'] == 0)
        $BMP['size_bitmap'] = $FILE['file_size'] - $FILE['bitmap_offset'];
    $BMP['bytes_per_pixel'] = $BMP['bits_per_pixel'] / 8;
    $BMP['bytes_per_pixel2'] = ceil($BMP['bytes_per_pixel']);
    $BMP['decal'] = ($BMP['width'] * $BMP['bytes_per_pixel'] / 4);
    $BMP['decal'] -= floor($BMP['width'] * $BMP['bytes_per_pixel'] / 4);
    $BMP['decal'] = 4 - (4 * $BMP['decal']);
    if ($BMP['decal'] == 4)
        $BMP['decal'] = 0;

    $PALETTE = array();
    if ($BMP['colors'] < 16777216) {
        $PALETTE = unpack('V' . $BMP['colors'], fread($f1, $BMP['colors'] * 4));
    }

    $IMG = fread($f1, $BMP['size_bitmap']);
    $VIDE = chr(0);

    $res = imagecreatetruecolor($BMP['width'], $BMP['height']);
    $P = 0;
    $Y = $BMP['height'] - 1;
    while ($Y >= 0) {
        $X = 0;
        while ($X < $BMP['width']) {
            switch ($BMP['bits_per_pixel']) {
                case 32:
                    $COLOR = unpack("V", substr($IMG, $P, 3) . $VIDE);
                    break;
                case 24:
                    $COLOR = unpack("V", substr($IMG, $P, 3) . $VIDE);
                    break;
                case 16:
                    $COLOR = unpack("n", substr($IMG, $P, 2));
                    $COLOR[1] = $PALETTE[$COLOR[1] + 1];
                    break;
                case 8:
                    $COLOR = unpack("n", $VIDE . substr($IMG, $P, 1));
                    $COLOR[1] = $PALETTE[$COLOR[1] + 1];
                    break;
                case 4:
                    $COLOR = unpack("n", $VIDE . substr($IMG, floor($P), 1));
                    if (($P * 2) % 2 == 0)
                        $COLOR[1] = ($COLOR[1] >> 4);
                    else
                        $COLOR[1] = ($COLOR[1] & 0x0F);
                    $COLOR[1] = $PALETTE[$COLOR[1] + 1];
                    break;
                case 1:
                    $COLOR = unpack("n", $VIDE . substr($IMG, floor($P), 1));
                    if (($P * 8) % 8 == 0)
                        $COLOR[1] = $COLOR[1] >> 7;
                    elseif (($P * 8) % 8 == 1)
                        $COLOR[1] = ($COLOR[1] & 0x40) >> 6;
                    elseif (($P * 8) % 8 == 2)
                        $COLOR[1] = ($COLOR[1] & 0x20) >> 5;
                    elseif (($P * 8) % 8 == 3)
                        $COLOR[1] = ($COLOR[1] & 0x10) >> 4;
                    elseif (($P * 8) % 8 == 4)
                        $COLOR[1] = ($COLOR[1] & 0x8) >> 3;
                    elseif (($P * 8) % 8 == 5)
                        $COLOR[1] = ($COLOR[1] & 0x4) >> 2;
                    elseif (($P * 8) % 8 == 6)
                        $COLOR[1] = ($COLOR[1] & 0x2) >> 1;
                    elseif (($P * 8) % 8 == 7)
                        $COLOR[1] = ($COLOR[1] & 0x1);
                    $COLOR[1] = $PALETTE[$COLOR[1] + 1];
                    break;
                default:
                    return false;
                    break;
            }

            imagesetpixel($res, $X, $Y, $COLOR[1]);
            $X++;
            $P += $BMP['bytes_per_pixel'];
        }
        $Y--;
        $P+=$BMP['decal'];
    }
    fclose($f1);
    return $res;
}


}
 
 
 

?>