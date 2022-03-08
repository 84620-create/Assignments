import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class hashing{
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        if(passwordHashing("123456789").equals(passwordHashing(s)))
            System.out.println("Correct password");
        else{
            System.out.println("Wrong password");
        }

    }
    public static String passwordHashing(String password){
        try{
            MessageDigest messageDigest = MessageDigest.getInstance("SHA");
            messageDigest.update(password.getBytes());
            byte[] resultByteArray = messageDigest.digest();
            StringBuilder sb = new StringBuilder();
            for(byte b:resultByteArray){
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        }catch(NoSuchAlgorithmException e){
            e.printStackTrace();
        }
        return "";
    }
}
