import java.util.*;
public class nestedCollection {
    public static void main(String args[]){
        Map<Integer,List<String>> map = new HashMap<>();
        Scanner sc = new Scanner(System.in);

        for(int i=1; i<=10; i++){
            Integer classNumber = (int)(Math.random() * 10);
            List<String> list = new ArrayList<>();
            System.out.print("Enter Student name : ");
            list.add(sc.nextLine());
            boolean flag = true;
            for (Map.Entry<Integer,List<String>> mp : map.entrySet()){
                if(mp.getKey() == classNumber){
                    List<String> list1 = new ArrayList<>();
                    list1 = mp.getValue();
                    list1.add(list.get(0));
                    map.put(classNumber, list1);
                    flag = false;
                    break;
                }
            }
            if(flag){
                map.put(classNumber, list);
            }
            
        }
        for (Map.Entry<Integer,List<String>> mp : map.entrySet()){
            System.out.println("Classroom " + mp.getKey() + " :  List of students in this class " + mp.getValue());
        }
    }
}
