package cn.wizardj.blog.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloWorld {

    @GetMapping("hello")
    @ResponseBody
    public String test() {
        return "hello world";
    }

    @GetMapping("helloPage")
    public String testPage() {
        return "/hello.html";
    }

    @GetMapping("/")
    public String index(){
        return "index.html";
    }

}
