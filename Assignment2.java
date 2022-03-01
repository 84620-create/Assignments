import java.util.*;


public class Assignment2{
    public static void swap(int[] arr, int i, int j){
        int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
    }

    public static int partition(int[] arr, int l, int r){
        int pivat = arr[r];
        int i = l-1;
        
        for(int j=l; j<r; j++){
            if(arr[j]<pivat){
                i++;
                Assignment2.swap(arr,i,j);
            }
        }
        Assignment2.swap(arr,i+1,r);
        return i+1;
    }

    public static void quickSort(int[] arr, int l, int r){
        if(l<r){
            int pi = Assignment2.partition(arr,l,r);

            quickSort(arr,l,pi-1);
            quickSort(arr,pi+1,r);
        }
    }
    public static void main(String args[]){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the size of Array : ");
        int n = scanner.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++){
            arr[i] = scanner.nextInt();
        }
        Assignment2.quickSort(arr,0,n-1);
        System.out.print("Befor sorting the array : ");
        for(int i=0; i<n; i++){
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.print("After sorting the array : ");
        for(int i=0; i<n; i++){
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.print("Enter the number  : ");
        int m = scanner.nextInt();
        System.out.println();
        System.out.print(m + "th highest number : ");
        System.out.println(arr[n-m]);
    }
}