package cn.wizardj.blog.controller;

import org.junit.jupiter.api.Test;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;

class HelloWorldTest {

    @Test
    public void testHM () {

        HashMap<String, String> testMap = new HashMap<>();
        testMap.put("testA", "A");
        testMap.put("testA", "B");
        System.out.println(testMap.get("testA"));


    }

}