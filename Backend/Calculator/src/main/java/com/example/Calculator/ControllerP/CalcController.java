package com.example.Calculator.ControllerP;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin

public class CalcController {

 
 @GetMapping("/binary/{first}/{second}/{op}")
 public String calc(@PathVariable double first, @PathVariable double second, @PathVariable String op) {
	 String result = "";
	 try {
		result = evaluator.binaryEvaluate(first, second, op)+"";
	 } catch (Exception e1) {
			// TODO Auto-generated catch block
		e1.printStackTrace();
	 }
	 return result;
 }
 
 
 
}

class evaluator{
	
	public static String binaryEvaluate(double first, double second, String op) {
		double result = 0;
		switch(op) {
		case"-":
			result = first - second;
			break;
		case"+":
			result = first + second;
			break;
		case"*":
			result = first * second;
			break;
		case"div":
			result = first / second;
			break;
		case"percent":
			result = first / 100.0;
			break;
		case"^":
			result = Math.pow(first, second);
		}
		if(Double.isInfinite(result) || Double.isNaN(result))
			return "Error";
		return result+"";
	}
	

	
}