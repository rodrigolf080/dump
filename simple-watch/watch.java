/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author rod
 */
import java.util.Scanner;
public class watch
{
    // Initial state is Time (state 0)
    // State 1 is the altimeter
    // State 2 is the hour settter mode
    // State 3 is the minute setter mode
    // Choice is either 1 or 2 representing the Mode and Set button respectively
    // Choise 0 shuts down the program
    private int state = 0;
    private int choice;
    private int hours;
    private int minutes;
    private int altitude = 1500;
    private boolean running;
    
    // Make new Watch object / default hours and minutes is 0
    public watch() {
        hours = 0;
        minutes = 0;
    }
    
    // Make new Watch object / set hours and minutes on the constructor
    public watch(int h, int m) {
        hours = h;
        minutes = m;
    }
    
    // Increment hours by 1 /reset at 24
    public void incHours(){
        hours = hours + 1;
        if (hours == 24){
            hours = 0;
        }
    }
    // Increment minutes by 1 / reset at 60
    public void incMinutes(){
        minutes = minutes + 1;
        if (minutes == 60){
            minutes = 0;
        }
    }
    
    public void run() {
        // FMS states
   
        // ----
        // 0. - clock 
        // 1. - altimeter 
        // 2. - change hour 
        // 3. - change minute
        // ----
        // User input
        // 1 - Mode button
        // 2 - Set button
        // 0 - Exit program (shutdown running device)
        running = true;
        System.out.println("--------");
        System.out.printf("%s:%s\n", hours, minutes);
        System.out.println("--------\n");
        System.out.println("Mode....1");
        System.out.println("Set.....2");
        System.out.println("Quit....0\n");
        Scanner button = new Scanner(System.in);
        
        while (running){
            // Get user input and to do watch button functionality 
            System.out.print("Press Button > ");
            choice = button.nextInt();
            System.out.println("");
            // If 0 pressed, shutdown
            if (choice == 0){
                running = false;
                System.exit(0);
            }
            // If Mode button pressed, behave differently depending on the state
            if (choice == 1){
                if (state == 0){
                    // Move from Time to Altimeter
                    System.out.println("--------");
                    System.out.println("1500m");
                    System.out.println("--------\n");
                    System.out.println("Mode....1");
                    System.out.println("Set.....2");
                    System.out.println("Quit....0\n");
                    state = 1;
                    
                } 
                else if (state == 1) {
                    // Move from Altimer to Time
                    System.out.println("--------");
                    System.out.printf("%s:%s\n", hours, minutes);
                    System.out.println("--------\n");
                    System.out.println("Mode....1");
                    System.out.println("Set.....2");
                    System.out.println("Quit....0\n");
                    state = 0;
                }
                else if (state == 2) {
                    // Move from SetHours to SetMinutes
                    System.out.println("--------");
                    System.out.printf("%s:%s\n", hours, minutes);
                    System.out.println("--------\n");
                    System.out.println("Mode....1");
                    System.out.println("Set.....2");
                    System.out.println("Quit....0\n");
                    state = 3;
                }
                else if (state == 3) {
                    // Move from SetMinutes to Time
                    System.out.println("--------");
                    System.out.printf("%s:%s\n", hours, minutes);
                    System.out.println("--------\n");
                    System.out.println("Mode....1");
                    System.out.println("Set.....2");
                    System.out.println("Quit....0\n");
                    state = 0;
                }
            }
            // If Set button selected behave according to the current state
            if (choice == 2){
                if (state == 0){
                    // Move from Time to SetHours
                    System.out.println("--------");
                    System.out.printf("%s\n", hours);
                    System.out.println("--------\n");
                    System.out.println("Mode....1");
                    System.out.println("Set.....2");
                    System.out.println("Quit....0\n");
                    state = 2;
                    
                } else if (state == 1) {
                    // Do nothing really, just update Altimeter
                    System.out.println("--------");
                    System.out.println("1500m");
                    System.out.println("--------\n");
                    System.out.println("Mode....1");
                    System.out.println("Set.....2");
                    System.out.println("Quit....0\n");
                    state = 1;
                }
                else if (state == 2) {
                    // Increment and update hours
                    this.incHours();
                    System.out.println("--------");
                    System.out.printf("%s\n", hours);
                    System.out.println("--------\n");
                    System.out.println("Mode....1");
                    System.out.println("Set.....2");
                    System.out.println("Quit....0\n");
                }
                else if (state == 3){
                    // Increment and update minutes
                    this.incMinutes();
                    System.out.println("--------");
                    System.out.printf("%s\n", minutes);
                    System.out.println("--------\n");
                    System.out.println("Mode....1");
                    System.out.println("Set.....2");
                    System.out.println("Quit....0\n");
                }
            }
        }
        
    }
}
