package main

import "fmt"

// Implementation A: Iterative approach
func sum_to_n_a(n int) int {
	sum := 0
	for i := 1; i <= n; i++ {
		sum += i
	}
	return sum
}
// Efficiency: O(n) time complexity, O(1) space complexity
// This implementation iterates from 1 to n, making it linear in time.
// It uses constant additional space, making it memory efficient.

// Implementation B: Mathematical formula
func sum_to_n_b(n int) int {
	return n * (n + 1) / 2
}
// Efficiency: O(1) time complexity, O(1) space complexity
// The mathematical formula directly computes the result without iteration, 
// making it the fastest and most efficient solution. Suitable for very large values of n.

// Implementation C: Recursive approach
func sum_to_n_c(n int) int {
	if n == 0 {
		return 0
	}
	return n + sum_to_n_c(n-1)
}
// Efficiency: O(n) time complexity, O(n) space complexity
// The recursive solution has a linear time complexity due to n recursive calls.
// However, it uses additional memory proportional to the recursion depth, 
// making it less efficient than the iterative approach for large n.

func main() {
	n := 5
	fmt.Println("Sum to n using Iterative:", sum_to_n_a(n))
	fmt.Println("Sum to n using Formula:", sum_to_n_b(n))
	fmt.Println("Sum to n using Recursive:", sum_to_n_c(n))
}
