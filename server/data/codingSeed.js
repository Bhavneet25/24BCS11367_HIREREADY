const codingProblems = [
  {
    _id: "code_prob_01",
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    acceptanceRate: "52.4%",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] == 6, return [1, 2]."
      }
    ],
    testCases: [
      {
        input: "JSON.stringify({ nums: [2, 7, 11, 15], target: 9 })",
        expectedOutput: "[0,1]",
        isHidden: false
      },
      {
        input: "JSON.stringify({ nums: [3, 2, 4], target: 6 })",
        expectedOutput: "[1,2]",
        isHidden: false
      },
      {
        input: "JSON.stringify({ nums: [3, 3], target: 6 })",
        expectedOutput: "[0,1]",
        isHidden: true
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your code here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int comp = target - nums[i];
        if (mp.count(comp)) return {mp[comp], i};
        mp[nums[i]] = i;
    }
    return {};
}`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) return new int[]{map.get(comp), i};
        map.put(nums[i], i);
    }
    return new int[]{};
}`
    },
    solutionSnippet: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []`,
      explanation: "Using a Hash Map gives O(N) time complexity and O(N) space. As we iterate through the list, we check if the complement `target - nums[i]` already exists in the map."
    },
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
    tags: ["Array", "Hash Table"],
    hints: [
      "A brute force approach checks all pairs in O(n^2).",
      "Can we do better by caching visited numbers in a hash map?"
    ],
    submissionsCount: 4280
  },
  {
    _id: "code_prob_02",
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    category: "Stack & Queue",
    acceptanceRate: "44.1%",
    description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      {
        input: "s = '()[]{}'",
        output: "true",
        explanation: "All pairs match correctly in proper order."
      },
      {
        input: "s = '(]'",
        output: "false",
        explanation: "Closing bracket does not match opening bracket type."
      }
    ],
    testCases: [
      {
        input: "JSON.stringify({ s: '()[]{}' })",
        expectedOutput: "true",
        isHidden: false
      },
      {
        input: "JSON.stringify({ s: '(]' })",
        expectedOutput: "false",
        isHidden: false
      },
      {
        input: "JSON.stringify({ s: '{[]}' })",
        expectedOutput: "true",
        isHidden: true
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your code here
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`
    },
    solutionSnippet: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
      python: `def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
      explanation: "A Last-In-First-Out (Stack) structure allows checking matching parentheses in O(N) time and O(N) auxiliary space."
    },
    companies: ["Amazon", "Microsoft", "Accenture", "Wipro"],
    tags: ["String", "Stack"],
    hints: [
      "Use a stack to keep track of open brackets.",
      "When encountering a closing bracket, check whether the top of the stack matches."
    ],
    submissionsCount: 3820
  },
  {
    _id: "code_prob_03",
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Two Pointers",
    acceptanceRate: "54.8%",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    testCases: [
      {
        input: "JSON.stringify({ prices: [7,1,5,3,6,4] })",
        expectedOutput: "5",
        isHidden: false
      },
      {
        input: "JSON.stringify({ prices: [7,6,4,3,1] })",
        expectedOutput: "0",
        isHidden: false
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Write your code here
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
  }
  return maxProfit;
}`,
      python: `def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')
    max_p = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_p:
            max_p = price - min_price
    return max_p`,
      cpp: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxP = 0;
    for (int p : prices) {
        minPrice = min(minPrice, p);
        maxP = max(maxP, p - minPrice);
    }
    return maxP;
}`,
      java: `public int maxProfit(int[] prices) {
    int min = Integer.MAX_VALUE, max = 0;
    for (int p : prices) {
        if (p < min) min = p;
        else if (p - min > max) max = p - min;
    }
    return max;
}`
    },
    solutionSnippet: {
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
      python: `def maxProfit(prices):
    min_price, max_profit = float('inf'), 0
    for p in prices:
        min_price = min(min_price, p)
        max_profit = max(max_profit, p - min_price)
    return max_profit`,
      explanation: "Maintain the minimum price seen so far in a single pass. For each day, calculate potential profit and update max profit. O(N) time and O(1) space."
    },
    companies: ["Goldman Sachs", "Amazon", "Microsoft", "TCS"],
    tags: ["Array", "Dynamic Programming"],
    hints: [
      "Keep track of the minimum purchase price as you scan left to right."
    ],
    submissionsCount: 5120
  },
  {
    _id: "code_prob_04",
    title: "Maximum Subarray (Kadane's Algorithm)",
    slug: "maximum-subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptanceRate: "50.7%",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "Single element has max sum 1."
      }
    ],
    testCases: [
      {
        input: "JSON.stringify({ nums: [-2,1,-3,4,-1,2,1,-5,4] })",
        expectedOutput: "6",
        isHidden: false
      },
      {
        input: "JSON.stringify({ nums: [5,4,-1,7,8] })",
        expectedOutput: "23",
        isHidden: false
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your code here
  let currentSum = nums[0];
  let maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      python: `def maxSubArray(nums: list[int]) -> int:
    cur = max_sum = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        max_sum = max(max_sum, cur)
    return max_sum`,
      cpp: `int maxSubArray(vector<int>& nums) {
    int cur = nums[0], maxS = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        cur = max(nums[i], cur + nums[i]);
        maxS = max(maxS, cur);
    }
    return maxS;
}`,
      java: `public int maxSubArray(int[] nums) {
    int cur = nums[0], max = nums[0];
    for (int i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        max = Math.max(max, cur);
    }
    return max;
}`
    },
    solutionSnippet: {
      javascript: `function maxSubArray(nums) {
  let current = nums[0];
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    max = Math.max(max, current);
  }
  return max;
}`,
      python: `def maxSubArray(nums):
    current = total = nums[0]
    for x in nums[1:]:
        current = max(x, current + x)
        total = max(total, current)
    return total`,
      explanation: "Kadane's Algorithm maintains the maximum subarray ending at index i: either starting fresh at nums[i] or extending current subarray."
    },
    companies: ["Google", "Microsoft", "Adobe", "Cognizant"],
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    hints: [
      "If the current accumulated sum becomes negative, is it ever beneficial to keep adding to it?"
    ],
    submissionsCount: 6140
  },
  {
    _id: "code_prob_05",
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptanceRate: "54.6%",
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The vertical lines are [1,8,6,2,5,4,8,3,7]. The max area is between index 1 and index 8: min(8, 7) * (8 - 1) = 7 * 7 = 49."
      }
    ],
    testCases: [
      {
        input: "JSON.stringify({ height: [1,8,6,2,5,4,8,3,7] })",
        expectedOutput: "49",
        isHidden: false
      },
      {
        input: "JSON.stringify({ height: [1,1] })",
        expectedOutput: "1",
        isHidden: false
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // Write your code here
  let left = 0, right = height.length - 1;
  let max = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}`,
      python: `def maxArea(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_w = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        max_w = max(max_w, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_w`,
      cpp: `int maxArea(vector<int>& height) {
    int l = 0, r = height.size() - 1, mx = 0;
    while (l < r) {
        mx = max(mx, min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return mx;
}`,
      java: `public int maxArea(int[] height) {
    int l = 0, r = height.length - 1, max = 0;
    while (l < r) {
        max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return max;
}`
    },
    solutionSnippet: {
      javascript: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;
  while (left < right) {
    max = Math.max(max, Math.min(height[left], height[right]) * (right - left));
    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}`,
      python: `def maxArea(height):
    l, r, max_a = 0, len(height) - 1, 0
    while l < r:
        max_a = max(max_a, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return max_a`,
      explanation: "Using two pointers starting from the two extremities. The area is constrained by the shorter line, so we advance the pointer with the lower height inward."
    },
    companies: ["Google", "Amazon", "Goldman Sachs"],
    tags: ["Array", "Two Pointers", "Greedy"],
    hints: [
      "Start with widest container (pointers at ends) and shrink inward."
    ],
    submissionsCount: 3410
  }
];

module.exports = {
  codingProblems,
};
