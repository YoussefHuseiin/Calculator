package Calculator;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class CalculatorTest {

	@Test
	void testAdd() {
		Calculator test = new Calculator();
		int output = test.add(-4,-1);
		assertEquals(-5,output);
		
	}

	@Test
	void testDivide() {
		Calculator test = new Calculator();
		float output = test.divide(2,5);
		assertEquals((float)2/5,output);
		assertThrows(ArithmeticException.class,()->test.divide(4, 0)); 
	}

}
