package com.dubbo.demo.controller;

import com.dubbo.demo.dto.ResultVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/home")
public class testController {
    private static final Logger LOGGER = LoggerFactory.getLogger(testController.class);

    @RequestMapping("/index")
    public String printHello(ModelMap model) {
        model.addAttribute("message", "Hello Spring MVC Framework!");
        return "home/index";
    }

    @RequestMapping("/test")
    @ResponseBody
    public ResultVo aaa(String name) {
        LOGGER.info("the argument name:{}",name);
        return new ResultVo(200,"操作成功","123");
    }
}
