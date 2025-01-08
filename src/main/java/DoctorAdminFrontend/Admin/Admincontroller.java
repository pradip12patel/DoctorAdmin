package DoctorAdminFrontend.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class Admincontroller {


    @GetMapping("/admin")
    public String showHomePage(Model model) {
    	
        model.addAttribute("welcomeMessage", "Welcome to the homepage!");
        
        return "index.html"; 
    }
    
    @GetMapping("/appointment-list")
    public String appointment() {
    	
        
        return "appointment-list.html"; 
    }

    
    @GetMapping("/blank-page")
    public String blank() {
    	
        
        return "blank-page.html"; 
    }


    @GetMapping("/components")
    public String component() {
    	
        
        return "components.html"; 
    }

    
    @GetMapping("/data-tables")
    public String datatables() {
    	
        
        return "data-tables.html"; 
    }

    @GetMapping("/dotcor-list")
    public String dotcorlist() {
    	
        
        return "dotcor-list.html"; 
    }


    @GetMapping("/error-404")
    public String error404() {
    	
        
        return "error-404.html"; 
    }


    @GetMapping("/error-505")
    public String error505() {
    	
        
        return "error-505.html"; 
    }

    
    @GetMapping("/forgot-password")
    public String forgotpassword() {
    	
        
        return "forgot-password.html"; 
    }

    
    @GetMapping("/form-basic-inputs")
    public String formbasiinputs() {
    	
        
        return "form-basic-inputs.html"; 
    }


    @GetMapping("/form-horizontal")
    public String formhorizontal() {
    	
        
        return "form-horizontal.html"; 
    }

    
    @GetMapping("/form-input-groups")
    public String forminputgroups() {
    	
        
        return "form-input-groups.html"; 
    }


    @GetMapping("/form-mask")
    public String formmask() {
    	
        
        return "form-mask.html"; 
    }

 
    @GetMapping("/form-validation")
    public String formvalidation() {
    	
        
        return "form-validation.html"; 
    }


    @GetMapping("/form-vartical")
    public String formvetial() {
    	
        
        return "form-vartical.html"; 
    }

     
    @GetMapping("/invoice-report")
    public String invoicereport() {
    	
        
        return "invoice-report.html"; 
    }

    
    @GetMapping("/invoice")
    public String invoice() {
    	
        
        return "invoice.html"; 
    }



    @GetMapping("/login")
    public String login() {
    	
        
        return "login.html"; 
    }


    @GetMapping("/lock-screen")
    public String lockscreen() {
    	
        
        return "lock-screen.html"; 
    }

    
    @GetMapping("/patient-list")
    public String patientlist() {
    	
        
        return "patient-list.html"; 
    }


      
    @GetMapping("/profile")
    public String profile() {
    	
        
        return "profile.html"; 
    }


    @GetMapping("/register")
    public String register() {
    	
        
        return "register.html"; 
    }


    @GetMapping("/reviews")
    public String review() {
    	
        
        return "reviews.html"; 
    }

     
   
    @GetMapping("/settings")
    public String setting() {
    	
        
        return "settings.html"; 
    }


    @GetMapping("/specialities")
    public String specialities() {
    	
        
        return "specialities.html"; 
    }


    @GetMapping("/tables-basic")
    public String tablesbasic() {
    	
        
        return "tablesbasic.html"; 
    }


    @GetMapping("/transactions-list")
    public String transactionslist() {
    	
        
        return "transactions-list.html"; 
    }



}
