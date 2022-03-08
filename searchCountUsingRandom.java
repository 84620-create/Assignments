import java.util.*;
import java.lang.Math;
public class searchCountUsingRandom {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a minimum range : ");
        int min = sc.nextInt();
        System.out.println();
        System.out.print("Enter a maximum range : ");
        int max = sc.nextInt();
        System.out.println();
        System.out.print("Enter a a number between " + min + " to " + max + " :");
        int n = sc.nextInt();
        int range = max - min + 1;
        int count=1;
        while(n != (int)(Math.random() * range)){
            count++;
        }
        System.out.println("Number founded in " + count + " iterations.");
    }
}
