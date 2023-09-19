package com.example.group8officedeskbooking.controller;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;

public class QRCodeGenerator {


    public static String readQRCodeImage(MultipartFile qrImage) throws Exception
    {
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer( new BufferedImageLuminanceSource(ImageIO.read((qrImage.getInputStream())))));
        Result result = new MultiFormatReader().decode(binaryBitmap);
        System.out.println(result.getText());
        return result.getText();
    }



}

