package cn.wizardj.blog;

import org.junit.jupiter.api.Test;

public class TestArr {



    @Test
    public void testAAA(){
        Integer i = new Integer(100);
        int j = 100;
        System.out.println(i == j);

        String a = new String("a");
        String b = "a";
        System.out.println(a == b);
        System.out.println(a.equals(b));
    }

    @Test
    public void testIn(){
        String aa = "aaa";
        System.out.println(aa.intern());
    }

    @Test
    public void testArr(){
        int [] arrA = {-1, 2, -3, 30, -10, 20, -5};

        System.out.println(sumArr(arrA));
    }

    private int sumArr(int[] arrA) {
        int result = -1;
        int length = arrA.length;
        int[][] sumMap = new int[length][length];
        sumMap[0][0] = arrA[0];
        for (int i = 0; i < length; i++) {
            for (int j = i + 1; j < length; j++) {
                sumMap[i][j] = sumMap[i][j-1] + arrA[j];
                result = Math.max(sumMap[i][j], result);
            }
        }
        return result;
    }

}
