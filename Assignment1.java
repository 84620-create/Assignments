import java.util.*;
class Assignment1{
    String reverseString(String s){
        String ans="";
        for(int i=s.length()-1; i>=0; i--){
		    ans += s.charAt(i);
		}
		return ans;
    }
    String capitalizeString(String s){
        String ans = "";
        ans += (char)(s.charAt(0) - 'a' + 'A');
        for(int i=1; i<s.length(); i++){
		    if(s.charAt(i) == ' '){
		        ans += s.charAt(i);
		        i++;
		        if(s.charAt(i) >= 97){
    		        ans += (char)(s.charAt(i) - 'a' + 'A');
    		    }else{
    		        ans += s.charAt(i);
    		    }
		    }else if(s.charAt(i) < 97){
		        ans += (char)(s.charAt(i) - 'A' + 'a');
		    }else{
		        ans += s.charAt(i);
		    }
		}
		return ans;
    }
    
    String isPalindrome(String s){
        int j=s.length()-1;
        for(int i=0; i<s.length()/2; i++){
            if(s.charAt(i) != s.charAt(j)){
                return "not Palindrome";
            }
            j--;
        }
		    
		return "Palindrome";
    }
	public static void main(String[] args) {
	   Assignment1 obj = new Assignment1();
		Scanner sc = new Scanner(System.in);

		System.out.print("Enter a String : ");
		String s = sc.nextLine();

	    System.out.println("Input string : " + s);
	    System.out.println("Reverse string : " + obj.reverseString(s));
	    System.out.println("string is " + obj.isPalindrome(s));
	    System.out.println("Capitalization of first letter of each word of given string  : " + obj.capitalizeString(s));
		
	}
}
