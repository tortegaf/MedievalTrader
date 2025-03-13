package co.edu.javeriana.jpa_medievaltrader.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String mostrarMenu() {
        return "index"; 
    }
}
