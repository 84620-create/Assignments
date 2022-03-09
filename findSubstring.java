/*Given two strings a and b, return a new string, following the rules given below. 
If string b occurs in string a, then the new string should concatenate the characters that appear before 
and after of String b.
Ignore cases where there is no character before or after the word, 
and a character may be included twice if it is in between two string b's.

Example1)
i/p:abcXY123XYijk,XY
o/p:c13i

Example2)
i/p:XY123XY,XY
o/p:13

Example3)
i/p:XY1XY,XY
o/p:11
*/

import java.util.*;
public class findSubstring{
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter first string : ");
		String str1 = sc.next();
        System.out.println();
        System.out.print("Enter second string : ");
		String str2 = sc.next();
        System.out.println();
		String ans = "";
		
        while (str1.indexOf(str2) != -1) {	
			int index = str1.indexOf(str2);
			
			if (index == 0 && index + str2.length() < str1.length() - 1) {
				ans += (str1.charAt(index + str2.length()));
				str1 = str1.replaceFirst(str2, "");
				continue;
			}
			
			if (index - 1 >= 0 && index + str2.length() >= str1.length()) {
				ans += (str1.charAt(index - 1));
				str1 = str1.replaceFirst(str2, "");
				continue;
			}
			
			if (index + str2.length() < str1.length() - 1 && index - 1 >= 0) {
				ans += (str1.charAt(index - 1));
				ans += (str1.charAt(index + str2.length()));
				str1 = str1.replaceFirst(str2, "");
			}
		}

		System.out.println("Sub string : " + ans);
	}
}

