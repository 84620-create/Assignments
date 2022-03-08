import java.util.*;

class Student{
    
    int id,age;
    String name,branch;
    
    Student(int id, String name, int age, String branch){
        this.id = id;
        this.name = name;
        this.age = age;
        this.branch = branch;
    }
    
}

public class Main{
    
    private static final Scanner sc = new Scanner(System.in);
    
    private static Student createStudent(){
        System.out.print("Enter id : ");
	    int id = Integer.parseInt(sc.nextLine());
	    
	    System.out.print("Enter name : ");
	    String name = sc.nextLine();

	    System.out.print("Enter age : ");
	    int age = Integer.parseInt(sc.nextLine());
	    
	    System.out.print("Enter branch : ");
	    String branch = sc.nextLine();
	    
	    return new Student(id,name,age,branch);
    }
    
    private static String getBranch(){
        System.out.print("Enter branch name : ");
    	return sc.nextLine();
    }
    
    private static List<Student> input(){
        List<Student> arr = new ArrayList<>();
    	System.out.print("Enter a number of student you want : ");
    	int n = sc.nextInt();
    	sc.nextLine();
    	for(int i=0; i<n; i++){
    	   arr.add(createStudent());
    	}
    	return arr;
    }
   
	public static void main(String[] args) {
		List<Student> list = input();
		
		String branchName = getBranch();
		for(Student s : list){
		    if(branchName.equals(s.branch))
		        System.out.println(s.id + " " + s.name + " " + s.age + " " + s.branch);
		}
		
	}
}
