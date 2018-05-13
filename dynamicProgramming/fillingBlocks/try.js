function fillingBlocks(n) {

}

4x3

4x1

[0,0,1,1]

4x2

[0,0,1,1] [----]
[2,2,3,3] [----]

[0,0,1,2] [--||]
[3,3,1,2] [--||]

[0,1,1,2] [|--|]
[0,3,3,2] [|--|]

[0,1,2,2] [||--]
[0,1,3,3] [||--]

[0,1,2,3] [||||]
[0,1,2,3] [||||]

---------------------

4x1

- check top left (index = (0,0))
- try position 1
  [0,0,.,.]
  - success
    - check position right (index = (2,0))
    - try position 1
      [0,0,1,1]
      - success
        - check position right (index = (4,0))
        - try position 1
          [0,0,1,1],2,2
          - fail
        - try position 2
          [0,0,1,1],2
                  2
          - fail
        - check position down (index = (2,1))
    - try position 2
      [0,0,1,.]
           1
      - fail
    - check position down (index = (0,1))
- try position 2
  [0,.,.,.]
   0
  - fail


- check position
- try position 1
  - if success
    - check position right
    - check position down
  - if fail
- try position 2
  - if success
  - if fail

4x2

- check position first (index = (0,0))
  - try position 1
    [0,0,.,.]
    [.,.,.,.]
    - success
      - check position right (index = (2,0))
        + try position 1
          [0,0,1,1]
          [.,.,.,.]
          + success
            + check position right (index = ())
            + check position down (index = ())
        + try position 2
          [0,0,1,.]
          [.,.,1,.]
          + success
            + check position right (index = ())
            + check position down (index = ())
      - check position down (index = (0,1))
        + try position 1
          [0,0,.,.]
          [1,1,.,.]
          + success
            + check position right (index = ())
            + check position down (index = ())
        + try position 2
          [0,0,.,.]
          [1,.,.,.]
           1
          + fail
  - try position 2
    [0,.,.,.]
    [0,.,.,.]
    - success
      - check position right (index = (1,0))
        + try position 1
          [0,1,1,.]
          [0,.,.,.]
          + success
            + check position right (index = ())
            + check position down (index = ())
        + try position 2
          [0,1,.,.]
          [0,1,.,.]
          + success
            + check position right (index = ())
            + check position down (index = ())
      - check position down (index = (3,0))
        + try position 1
          [0,.,.,.]
          [0,.,.,.]
           1,1
          + fail
        + try position 2
          [0,.,.,.]
          [0,.,.,.]
           1
           1
          + fail
           

//check top left
  // try position 1
  - [0,0,.,.]
    [.,.,.,.]
      //check right
        // try position 1
        - [0,0,1,1]
          [.,.,.,.]
            //check right
              // try position 1
              - [0,0,1,1]2,2
                [.,.,.,.]
              // try position 2
              - [0,0,1,1]
                [.,.,2,2]
                  //check right
                    - [0,0,1,1]
                      [.,.,2,2]3,3
                  //check down
                    - [0,0,1,1]
                      [.,.,2,2]
                             3
                             3
            //check down
        // try position 2
        - [0,0,1,.]
          [.,.,1,.]
      //check down
        // try position 1
        - [0,0,.,.]
          [1,1,.,.]
  // try position 2
  - [0,.,.,.]
    [0,.,.,.]

position 1 => [x,x]
position 2 => [x]
              [x]

/** 
 * check top left 
 * try position 1 (success) [0,0]
 * - check right side
 *      try position 1 (success) [1,1]
 *      - check right side
 *          not possible
 *      - check down side
 *            try position 1 (success) [3,3]
 *            - check right side
 *                not possible
 *            - check down side
 *                not possible
 *            + 1
 *            try position 2 (fail)
 *      try position 2 (success) [1]
 *                               [1]
 *      - check right side
 *          try position 1 (fail)
 *          try position 2 (success) [2]
 *                                   [2]
 *          - check right side
 *              not possible
 *          - check down side
 *              not possible
 *          + 1
 *      - check down side
 *          not possible
 * - check down side
 *      try position 1 (success) [3,3]
 *      - check right side
 *          not possible (has been used)
 *      - check down side
 *          not possible
 *      + 1 (?)
 *      try position 2 (fail)
 *      + 2 + 1(?)
 * try position 2 (success) [0]
 *                          [0]
 * - check right side
 *      try position 1 (success) [1,1]
 *      - check right side
 *      - check down side
 *      try position 2 (success) [1]
 *                               [1]
 *      - check right side
 *      - check down side
 * - check down side
*/




