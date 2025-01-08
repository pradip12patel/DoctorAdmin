package DoctorAdminFrontend.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class Admincontroller {


    @GetMapping("/index")
    public String showHomePage(Model model) {
    	
        model.addAttribute("welcomeMessage", "Welcome to the homepage!");
        
        return "index"; 
    }
    
    @GetMapping("/appointment-list")
    public String appointment() {
    	
        
        return "appointment-list"; 
    }

    
    @GetMapping("/blank-page")
    public String blank() {
    	
        
        return "blank-page"; 
    }


    @GetMapping("/components")
    public String component() {
    	
        
        return "components"; 
    }

    
    @GetMapping("/data-tables")
    public String datatables() {
    	
        
        return "data-tables"; 
    }

    @GetMapping("/doctor-list")
    public String dotcorlist() {
    	
        
        return "doctor-list"; 
    }


    @GetMapping("/error-404")
    public String error404() {
    	
        
        return "error-404"; 
    }


    @GetMapping("/error-505")
    public String error505() {
    	
        
        return "error-505"; 
    }

    
    @GetMapping("/forgot-password")
    public String forgotpassword() {
    	
        
        return "forgot-password"; 
    }

    
    @GetMapping("/form-basic-inputs")
    public String formbasiinputs() {
    	
        
        return "form-basic-inputs"; 
    }


    @GetMapping("/form-horizontal")
    public String formhorizontal() {
    	
        
        return "form-horizontal"; 
    }

    
    @GetMapping("/form-input-groups")
    public String forminputgroups() {
    	
        
        return "form-input-groups"; 
    }


    @GetMapping("/form-mask")
    public String formmask() {
    	
        
        return "form-mask"; 
    }

 
    @GetMapping("/form-validation")
    public String formvalidation() {
    	
        
        return "form-validation"; 
    }


    @GetMapping("/form-vartical")
    public String formvetial() {
    	
        
        return "form-vartical"; 
    }

     
    @GetMapping("/invoice-report")
    public String invoicereport() {
    	
        
        return "invoice-report"; 
    }

    
    @GetMapping("/invoice")
    public String invoice() {
    	
        
        return "invoice"; 
    }



    @GetMapping("/login")
    public String login() {
    	
        
        return "login"; 
    }


    @GetMapping("/lock-screen")
    public String lockscreen() {
    	
        
        return "lock-screen"; 
    }

    
    @GetMapping("/patient-list")
    public String patientlist() {
    	
        
        return "patient-list"; 
    }


      
    @GetMapping("/profile")
    public String profile() {
    	
        
        return "profile"; 
    }


    @GetMapping("/register")
    public String register() {
    	
        
        return "register"; 
    }


    @GetMapping("/reviews")
    public String review() {
    	
        
        return "reviews"; 
    }

     
   
    @GetMapping("/settings")
    public String setting() {
    	
        
        return "settings"; 
    }


    @GetMapping("/specialities")
    public String specialities() {
    	
        
        return "specialities"; 
    }


    @GetMapping("/tables-basic")
    public String tablesbasic() {
    	
        
        return "tablesbasic"; 
    }


    @GetMapping("/transactions-list")
    public String transactionslist() {
    	
        
        return "transactions-list"; 
    }



}
