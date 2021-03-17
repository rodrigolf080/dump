package main

import (
	"fmt"
	"os/exec"
)

func main() {
	
	// construct 'go version' command
	cmd := exec.Command("go", "version")

	// configue 'Stdout' and 'Stderr'
	cmd.Stdout = nil

	// run command
	if output, err := cmd.CombinedOutput(); err != nil {
		fmt.Println("Error", err)
	} else {
		fmt.Printf("Output: %s\n", output)
	}
}	
