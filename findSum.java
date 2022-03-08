import java.util.*;
public class findSum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i=0; i<n; i++){
            arr[i] = sc.nextInt();
        }
        int sum=0;
        boolean flag1 = false;
        boolean flag2 = false;
        for(int i=0; i<n; i++){
            if(arr[i] == 6 && flag2 == false){
                flag1 = true;
                continue;
            }if(arr[i] == 7){
                if(flag1 == false)
                    sum += arr[i];
                flag2 = true;
                continue;
            }if(flag1 == false && flag2 == false){
                sum += arr[i];
            }if(flag1 == true && flag2 == true){
                sum += arr[i];
            }if(flag1 == false && flag2 == true){
                sum += arr[i];
            }
        }
        System.out.println(sum);
    }
}
