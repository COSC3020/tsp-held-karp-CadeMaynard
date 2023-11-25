[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12949872&assignment_repo_type=AssignmentRepo)
# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

## Response:

The worst-case for the time complexity of this implementation suggests that memoization will never have the opportunity to be used so we will have to do the whole function for every order of nodes. The function for all possible combinations without repetition would be $\Theta(|V|!)$ where $|V|$ is the number of vertices.

The worst-case for the memory complexity is much the same because there would be no repetitions of graphs so we must memoize every unique order of vertices. This would be the same complexity of $\Theta(|V|!)$ where $|V|$ is the number of vertices.

## An aside on memoization in this code:

I struggled with how memoization should work with "start" for some time so I feel that I should comment on the conclusions I came to. I was confused about how nodesLeft and start should be combined for the sake of memoization keys. I figured if we have three nodes "A", "B", and "C" if we give the function "A" as a start and nodesLeft containing "B" and "C" it will return the same thing as if we gave the function "B" as a start and nodesLeft containing "A" and "C". I was trying to decide if I needed to add start into nodesLeft and sort that to simplify the memoization. If we think of the memoization from a more functional perspective with referential transparency, however, though these functions may output the same thing they are different because they have different inputs. Thus, I deemed it unnecessary to combine start and nodesLeft.

### Sources:

https://sentry.io/answers/remove-specific-item-from-array/
<br>
https://www.freecodecamp.org/news/insert-into-javascript-array-at-specific-index/
