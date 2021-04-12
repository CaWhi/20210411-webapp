package com.dubbo.demo.controller;

import com.dubbo.demo.dto.ResultVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Controller
@RequestMapping("/file")
public class FileController {
    private static final Logger LOGGER = LoggerFactory.getLogger(FileController.class);

    private static final String BASEPATH = "D:"+ File.separator +"123";

    //type 0 process img,1 process txt,2 result img,3 result txt
    @RequestMapping("/getFile")
    public ResultVo getFile(String originName, String type, HttpServletResponse response) {
        try {
            int num = 0;
            
            String path = "";
            switch (type){
                case "0":
                    path = BASEPATH + File.separator + "images_test_processed";
                    num = Integer.parseInt(originName.split("\\.")[0]);
                    break;
                case "1":
                    path = BASEPATH + File.separator + "processed_sents";
                    num = Integer.parseInt(originName.split("\\.")[0].split("_")[0]);
                    break;
                case "2":
                    path = BASEPATH +File.separator+ "image_decode" + File.separator + "decode" + File.separator + "decoded";
                    num = Integer.parseInt(originName.split("\\.")[0]);
                    break;
                case "3":
                    path = BASEPATH +File.separator+ "decode_text" + File.separator + "decode_text" + File.separator + "decoded";
                    num = Integer.parseInt(originName.split("\\.")[0].split("_")[0]);
                    break;
            }

            File file = new File(path);
            if(file.isFile() || !file.exists()) {
                return new ResultVo(0,"失败",null);
            }
            File[] files = file.listFiles();

            File result = null;
            for(File file1 : files){
                String name = file1.getName();
                int resultNum = 0;

                if("0".equals(type)){
                    resultNum = Integer.parseInt(name.split("\\.")[0]);
                } else {
                    resultNum = Integer.parseInt(name.split("\\.")[0].split("_")[0]);
                }

                if("2".equals(type)){
                    resultNum++;
                }

                if(resultNum == num){
                    result = file1;
                    break;
                }
            }

            writeToResponse(result, response, result.getName());

            return new ResultVo(200,"操作成功","123");
        }
        catch (Exception e){
            LOGGER.error("异常",e);
            return new ResultVo(0,"失败",null);
        }
    }

    private void writeToResponse(File file, HttpServletResponse response, String fileName) throws IOException {
        ServletOutputStream os = null;
//        LOGGER.info("文件大小：{}", responseHttp.getEntity().getContentLength());
        try {
            os = response.getOutputStream();
            response.setContentType("application/binary;charset=UTF-8");
            response.setHeader("Content-disposition",
                    "attachment;filename= " + fileName);
//            responseHttp.getEntity().writeTo(os);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            FileInputStream fis = new FileInputStream(file);
            byte[] b = new byte[1024];
            int n;
            while ((n = fis.read(b)) != -1) {
                bos.write(b, 0, n);
            }
            fis.close();
            bos.close();

            bos.writeTo(os);
            os.flush();
            os.close();
        } catch (IOException e) {
            LOGGER.error("获取文件出错，IO流异常!", e);
        } finally {
            if (os != null) {
                os.close();
            }
        }
    }
}
