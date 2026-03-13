import { useState, useEffect, useMemo } from "react";

const DP_DATA = {
  "Linear DP": ["climbing-stairs","best-time-to-buy-and-sell-stock","min-cost-climbing-stairs","divisor-game","decode-ways","unique-binary-search-trees","house-robber","perfect-squares","best-time-to-buy-and-sell-stock-with-cooldown","coin-change","counting-bits","integer-break","count-numbers-with-unique-digits","wiggle-subsequence","partition-equal-subset-sum","maximum-length-of-pair-chain","best-time-to-buy-and-sell-stock-with-transaction-fee","delete-and-earn","domino-and-tromino-tiling","knight-dialer","minimum-cost-for-tickets","partition-array-for-maximum-sum","filling-bookcase-shelves","longest-arithmetic-subsequence-of-given-difference","greatest-sum-divisible-by-three","best-time-to-buy-and-sell-stock-iii","student-attendance-record-ii","decode-ways-ii","triples-with-bitwise-and-equal-to-zero","maximum-profit-in-job-scheduling","minimum-number-of-taps-to-open-to-water-a-garden","count-all-valid-pickup-and-delivery-options","stone-game-iii","restore-the-array","form-largest-integer-with-digits-that-add-up-to-target","stone-game-iv","coin-change-2"],
  "Knapsack": ["house-robber-ii","ones-and-zeroes","target-sum","shopping-offers","2-keys-keyboard","minimum-swaps-to-make-sequences-increasing","best-team-with-no-conflicts","profitable-schemes","tallest-billboard","pizza-with-3n-slices","reducing-dishes"],
  "Multi Dimensions DP": ["triangle","combination-sum-iv","out-of-boundary-paths","knight-probability-in-chessboard","champagne-tower","largest-sum-of-averages","minimum-falling-path-sum","video-stitching","longest-arithmetic-subsequence","stone-game-ii","number-of-dice-rolls-with-target-sum","dice-roll-simulation","number-of-sets-of-k-non-overlapping-line-segments","best-time-to-buy-and-sell-stock-iv","create-maximum-number","frog-jump","split-array-largest-sum","freedom-trail","minimum-number-of-refueling-stops","number-of-music-playlists","count-vowels-permutation","minimum-falling-path-sum-ii","minimum-distance-to-type-a-word-using-two-fingers","minimum-difficulty-of-a-job-schedule","number-of-ways-to-paint-n-3-grid","build-array-where-you-can-find-the-maximum-exactly-k-comparisons","number-of-ways-of-cutting-a-pizza","paint-house-iii","count-all-possible-routes"],
  "Interval DP": ["guess-number-higher-or-lower-ii","arithmetic-slices","predict-the-winner","palindromic-substrings","stone-game","minimum-score-triangulation-of-polygon","last-stone-weight-ii","minimum-cost-tree-from-leaf-values","stone-game-vii","burst-balloons","remove-boxes","strange-printer","valid-permutations-for-di-sequence","minimum-cost-to-merge-stones","allocate-mailboxes","minimum-cost-to-cut-a-stick","stone-game-v"],
  "Bit DP": ["can-i-win","partition-to-k-equal-sum-subsets","stickers-to-spell-word","shortest-path-visiting-all-nodes","smallest-sufficient-team","maximum-students-taking-exam","number-of-ways-to-wear-different-hats-to-each-other","minimum-cost-to-connect-two-groups-of-points","maximum-number-of-achievable-transfer-requests","distribute-repeating-integers","maximize-grid-happiness","find-minimum-time-to-finish-all-jobs"],
  "Digit DP": ["non-negative-integers-without-consecutive-ones","numbers-at-most-n-given-digit-set","numbers-with-repeated-digits"],
  "DP on Trees": ["unique-binary-search-trees-ii","house-robber-iii","maximum-product-of-splitted-binary-tree","linked-list-in-binary-tree","longest-zigzag-path-in-a-binary-tree","binary-tree-cameras","maximum-sum-bst-in-binary-tree","number-of-ways-to-reorder-array-to-get-same-bst"],
  "String DP": ["is-subsequence","palindrome-partitioning","palindrome-partitioning-ii","word-break","unique-substrings-in-wraparound-string","minimum-ascii-delete-sum-for-two-strings","longest-string-chain","longest-happy-string","longest-valid-parentheses","distinct-subsequences","word-break-ii","count-the-repetitions","concatenated-words","count-different-palindromic-subsequences","distinct-subsequences-ii","longest-chunked-palindrome-decomposition","palindrome-partitioning-iii","find-all-good-strings","string-compression-ii","number-of-ways-to-form-a-target-string-given-a-dictionary"],
  "Probability DP": ["soup-servings","new-21-game","airplane-seat-assignment-probability"],
  "Kadane's Algorithm": ["maximum-subarray","maximum-product-subarray","bitwise-ors-of-subarrays","longest-turbulent-subarray","maximum-subarray-sum-with-one-deletion","k-concatenation-maximum-sum","largest-divisible-subset","length-of-longest-fibonacci-subsequence"],
  "LCS": ["longest-palindromic-substring","longest-palindromic-subsequence","maximum-length-of-repeated-subarray","longest-common-subsequence","regular-expression-matching","wildcard-matching","edit-distance","interleaving-string","shortest-common-supersequence","minimum-insertion-steps-to-make-a-string-palindrome","max-dot-product-of-two-subsequences"],
  "LIS": ["longest-increasing-subsequence","number-of-longest-increasing-subsequence","russian-doll-envelopes","delete-columns-to-make-sorted-iii","minimum-number-of-removals-to-make-mountain-array","maximum-height-by-stacking-cuboids","make-array-strictly-increasing"],
  "2D Grid Traversal": ["unique-paths","unique-paths-ii","minimum-path-sum","maximum-non-negative-product-in-a-matrix","where-will-the-ball-fall","dungeon-game","cherry-pickup","number-of-paths-with-max-score","cherry-pickup-ii","kth-smallest-instructions"],
  "Cumulative Sum": ["range-sum-query-immutable","maximal-square","range-sum-query-2d-immutable","largest-plus-sign","push-dominoes","largest-1-bordered-square","count-square-submatrices-with-all-ones","matrix-block-sum","maximum-points-you-can-obtain-from-cards","count-submatrices-with-all-ones","ways-to-make-a-fair-array","maximal-rectangle","max-sum-of-rectangle-no-larger-than-k","super-washing-machines","maximum-sum-of-3-non-overlapping-subarrays","number-of-submatrices-that-sum-to-target","get-the-maximum-score"],
  "Hashmap SubArray": ["continuous-subarray-sum","find-two-non-overlapping-sub-arrays-each-with-target-sum","maximum-number-of-non-overlapping-subarrays-with-sum-equals-target"],
  "DP + Alpha": ["arithmetic-slices-ii-subsequence","odd-even-jump","constrained-subsequence-sum","delivering-boxes-from-storage-to-ports"],
  "Insertion DP": ["k-inverse-pairs-array"],
  "Graph DP": ["cheapest-flights-within-k-stops","find-the-shortest-superstring"],
  "Memoization": ["minimum-jumps-to-reach-home","scramble-string","tiling-a-rectangle-with-the-fewest-squares","number-of-ways-to-stay-in-the-same-place-after-some-steps","jump-game-v","minimum-number-of-days-to-eat-n-oranges"],
  "Binary Lifting": ["kth-ancestor-of-a-tree-node"],
  "Math DP": ["ugly-number-ii","count-sorted-vowel-strings","race-car","super-egg-drop","least-operators-to-express-number","largest-multiple-of-three","minimum-one-bit-operations-to-make-integers-zero"],
};

const STRUCTURED_DATA = {
  "Linked List": {
    sections: [
      { title: "Design", problems: [
        { id: "ll-1", title: "Design Linked List", slug: "design-linked-list", difficulty: "Medium" },
      ]},
      { title: "Normal Recursion (Given 1 LL)", note: "Simple Recursion — Nothing else", problems: [
        { id: "ll-2", title: "Swapping Nodes in a Linked List", slug: "swapping-nodes-in-a-linked-list", difficulty: "Medium" },
        { id: "ll-3", title: "Plus One Linked List", slug: "plus-one-linked-list", difficulty: "Medium" },
        { id: "ll-4", title: "Convert Binary Number in a Linked List to Integer", slug: "convert-binary-number-in-a-linked-list-to-integer", difficulty: "Easy" },
      ]},
      { title: "Modifying the LL (same number of nodes)", problems: [] },
      { title: "Reversing the Linked List", problems: [
        { id: "ll-5", title: "Reverse Linked List", slug: "reverse-linked-list", difficulty: "Easy" },
        { id: "ll-6", title: "Reverse Linked List II", slug: "reverse-linked-list-ii", difficulty: "Medium" },
        { id: "ll-7", title: "Palindrome Linked List", slug: "palindrome-linked-list", difficulty: "Easy" },
        { id: "ll-8", title: "Reverse Nodes in K-Group", slug: "reverse-nodes-in-k-group", difficulty: "Hard" },
        { id: "ll-9", title: "Print Immutable Linked List in Reverse", slug: "print-immutable-linked-list-in-reverse", difficulty: "Medium" },
      ]},
      { title: "Reordering the Nodes", problems: [
        { id: "ll-10", title: "Partition List", slug: "partition-list", difficulty: "Medium", important: true },
        { id: "ll-11", title: "Reorder List", slug: "reorder-list", difficulty: "Medium" },
        { id: "ll-12", title: "Swap Nodes in Pairs", slug: "swap-nodes-in-pairs", difficulty: "Medium" },
        { id: "ll-13", title: "Rotate List", slug: "rotate-list", difficulty: "Medium" },
        { id: "ll-14", title: "Odd Even Linked List", slug: "odd-even-linked-list", difficulty: "Medium" },
      ]},
      { title: "Delete Nodes", problems: [
        { id: "ll-15", title: "Remove Nth Node From End of List", slug: "remove-nth-node-from-end-of-list", difficulty: "Medium" },
        { id: "ll-16", title: "Remove Duplicates from Sorted List", slug: "remove-duplicates-from-sorted-list", difficulty: "Easy", note: "Unsorted → use HashMap" },
        { id: "ll-17", title: "Remove Duplicates from Sorted List II", slug: "remove-duplicates-from-sorted-list-ii", difficulty: "Medium" },
        { id: "ll-18", title: "Remove Linked List Elements", slug: "remove-linked-list-elements", difficulty: "Easy" },
      ]},
      { title: "Insert Node", problems: [
        { id: "ll-19", title: "Insert into a Sorted Circular Linked List", slug: "insert-into-a-sorted-circular-linked-list", difficulty: "Medium" },
      ]},
      { title: "Given 2 or More LL", problems: [
        { id: "ll-20", title: "Add Two Numbers", slug: "add-two-numbers", difficulty: "Medium" },
        { id: "ll-21", title: "Add Two Numbers II", slug: "add-two-numbers-ii", difficulty: "Medium" },
        { id: "ll-22", title: "Merge Two Sorted Lists", slug: "merge-two-sorted-lists", difficulty: "Easy" },
        { id: "ll-23", title: "Merge K Sorted Lists", slug: "merge-k-sorted-lists", difficulty: "Hard", important: true },
        { id: "ll-24", title: "Intersection of Two Linked Lists", slug: "intersection-of-two-linked-lists", difficulty: "Easy" },
        { id: "ll-25", title: "Add Two Polynomials Represented as Linked Lists", slug: "add-two-polynomials-represented-as-linked-lists", difficulty: "Medium" },
      ]},
      { title: "Fast / Slow Pointer (Cycle or Middle)", problems: [
        { id: "ll-26", title: "Linked List Cycle", slug: "linked-list-cycle", difficulty: "Easy" },
        { id: "ll-27", title: "Middle of the Linked List", slug: "middle-of-the-linked-list", difficulty: "Easy" },
        { id: "ll-28", title: "Delete the Middle Node of a Linked List", slug: "delete-the-middle-node-of-a-linked-list", difficulty: "Medium" },
        { id: "ll-29", title: "Linked List Cycle II", slug: "linked-list-cycle-ii", difficulty: "Medium" },
      ]},
      { title: "Hash Table", problems: [
        { id: "ll-30", title: "Copy List with Random Pointer", slug: "copy-list-with-random-pointer", difficulty: "Medium", important: true },
        { id: "ll-31", title: "Remove Duplicates from an Unsorted Linked List", slug: "remove-duplicates-from-an-unsorted-linked-list", difficulty: "Medium", note: "Sorted → no hash table needed" },
      ]},
      { title: "Design Data Structure using LL", problems: [
        { id: "ll-32", title: "LRU Cache", slug: "lru-cache", difficulty: "Medium" },
        { id: "ll-33", title: "Design HashMap", slug: "design-hashmap", difficulty: "Easy" },
        { id: "ll-34", title: "Max Stack", slug: "max-stack", difficulty: "Hard" },
        { id: "ll-35", title: "Design HashSet", slug: "design-hashset", difficulty: "Easy" },
        { id: "ll-36", title: "Design Browser History", slug: "design-browser-history", difficulty: "Medium", note: "Stack-based" },
        { id: "ll-37", title: "Design Twitter", slug: "design-twitter", difficulty: "Medium", note: "No need of LL" },
        { id: "ll-38", title: "Design Circular Queue", slug: "design-circular-queue", difficulty: "Medium" },
      ]},
      { title: "Merge Sort on List", problems: [
        { id: "ll-39", title: "Sort List", slug: "sort-list", difficulty: "Medium" },
      ]},
      { title: "LL + Tree", problems: [
        { id: "ll-40", title: "Convert BST to Sorted Doubly Linked List", slug: "convert-binary-search-tree-to-sorted-doubly-linked-list", difficulty: "Medium" },
        { id: "ll-41", title: "Flatten a Multilevel Doubly Linked List", slug: "flatten-a-multilevel-doubly-linked-list", difficulty: "Medium" },
        { id: "ll-42", title: "Maximum Twin Sum of a Linked List", slug: "maximum-twin-sum-of-a-linked-list", difficulty: "Medium" },
        { id: "ll-43", title: "Delete Node in a Linked List", slug: "delete-node-in-a-linked-list", difficulty: "Medium" },
      ]},
      { title: "To Do", problems: [
        { id: "ll-44", title: "All O'one Data Structure", slug: "all-oone-data-structure", difficulty: "Hard" },
        { id: "ll-45", title: "LFU Cache", slug: "lfu-cache", difficulty: "Hard" },
        { id: "ll-46", title: "Design a Text Editor", slug: "design-a-text-editor", difficulty: "Hard" },
      ]},
    ],
  },
"Binary Tree": {
  sections: [
    { 
      title: "Binary Tree Problems", 
      problems: [
        { id: "bt-1",  title: "Invert Binary Tree", slug: "invert-binary-tree", difficulty: "Easy" },
        { id: "bt-2",  title: "Convert Sorted Array to Binary Search Tree", slug: "convert-sorted-array-to-binary-search-tree", difficulty: "Easy" },
        { id: "bt-3",  title: "Count Complete Tree Nodes", slug: "count-complete-tree-nodes", difficulty: "Medium" },
        { id: "bt-4",  title: "All Possible Full Binary Trees", slug: "all-possible-full-binary-trees", difficulty: "Medium" },
        { id: "bt-5",  title: "Delete Leaves With a Given Value", slug: "delete-leaves-with-a-given-value", difficulty: "Medium" },
        { id: "bt-6",  title: "Binary Search Tree Iterator", slug: "binary-search-tree-iterator", difficulty: "Medium" },
        { id: "bt-7",  title: "Longest Univalue Path", slug: "longest-univalue-path", difficulty: "Medium" },
        { id: "bt-8",  title: "Delete Nodes And Return Forest", slug: "delete-nodes-and-return-forest", difficulty: "Medium" },
        { id: "bt-9",  title: "Validate Binary Search Tree", slug: "validate-binary-search-tree", difficulty: "Medium" },
        { id: "bt-10", title: "Construct Binary Tree from Inorder and Postorder Traversal", slug: "construct-binary-tree-from-inorder-and-postorder-traversal", difficulty: "Medium" },
        { id: "bt-11", title: "All Nodes Distance K in Binary Tree", slug: "all-nodes-distance-k-in-binary-tree", difficulty: "Medium" },
        { id: "bt-12", title: "Maximum Difference Between Node and Ancestor", slug: "maximum-difference-between-node-and-ancestor", difficulty: "Medium" },
        { id: "bt-13", title: "Find Duplicate Subtrees", slug: "find-duplicate-subtrees", difficulty: "Medium" },
        { id: "bt-14", title: "Flatten Binary Tree to Linked List", slug: "flatten-binary-tree-to-linked-list", difficulty: "Medium" },
        { id: "bt-15", title: "House Robber III", slug: "house-robber-iii", difficulty: "Medium" },
        { id: "bt-16", title: "Step-By-Step Directions From a Binary Tree Node to Another", slug: "step-by-step-directions-from-a-binary-tree-node-to-another", difficulty: "Medium" },
        { id: "bt-17", title: "Delete Node in a BST", slug: "delete-node-in-a-bst", difficulty: "Medium" },
        { id: "bt-18", title: "Populating Next Right Pointers in Each Node II", slug: "populating-next-right-pointers-in-each-node-ii", difficulty: "Medium" },
        { id: "bt-19", title: "Trim a Binary Search Tree", slug: "trim-a-binary-search-tree", difficulty: "Medium" },
        { id: "bt-20", title: "Distribute Coins in Binary Tree", slug: "distribute-coins-in-binary-tree", difficulty: "Medium" },
        { id: "bt-21", title: "Binary Search Tree to Greater Sum Tree", slug: "binary-search-tree-to-greater-sum-tree", difficulty: "Medium" },

        { id: "bt-22", title: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree", difficulty: "Hard" },
        { id: "bt-23", title: "Binary Tree Cameras", slug: "binary-tree-cameras", difficulty: "Hard" },
        { id: "bt-24", title: "Binary Tree Maximum Path Sum", slug: "binary-tree-maximum-path-sum", difficulty: "Hard" },
        { id: "bt-25", title: "Maximum Sum BST in Binary Tree", slug: "maximum-sum-bst-in-binary-tree", difficulty: "Hard" },

        { id: "bt-26", title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree", difficulty: "Easy" },
        { id: "bt-27", title: "Balanced Binary Tree", slug: "balanced-binary-tree", difficulty: "Easy" },
        { id: "bt-28", title: "Binary Tree Level Order Traversal II", slug: "binary-tree-level-order-traversal-ii", difficulty: "Easy" },

        { id: "bt-29", title: "Construct Binary Tree from Preorder and Inorder Traversal", slug: "construct-binary-tree-from-preorder-and-inorder-traversal", difficulty: "Medium" },
        { id: "bt-30", title: "Convert Sorted List to Binary Search Tree", slug: "convert-sorted-list-to-binary-search-tree", difficulty: "Medium" },
        { id: "bt-31", title: "Binary Tree Right Side View", slug: "binary-tree-right-side-view", difficulty: "Medium" },
        { id: "bt-32", title: "Lowest Common Ancestor of a Binary Tree", slug: "lowest-common-ancestor-of-a-binary-tree", difficulty: "Medium" },
        { id: "bt-33", title: "Check Completeness of a Binary Tree", slug: "check-completeness-of-a-binary-tree", difficulty: "Medium" },
        { id: "bt-34", title: "Vertical Order Traversal of a Binary Tree", slug: "vertical-order-traversal-of-a-binary-tree", difficulty: "Hard" },
        { id: "bt-35", title: "Recover Binary Search Tree", slug: "recover-binary-search-tree", difficulty: "Hard" },

        { id: "bt-36", title: "Recover a Tree From Preorder Traversal", slug: "recover-a-tree-from-preorder-traversal", difficulty: "Hard" },

        { id: "bt-37", title: "Validate Binary Tree Nodes", slug: "validate-binary-tree-nodes", difficulty: "Medium" },
        { id: "bt-38", title: "Linked List in Binary Tree", slug: "linked-list-in-binary-tree", difficulty: "Medium" },
        { id: "bt-39", title: "Balance a Binary Search Tree", slug: "balance-a-binary-search-tree", difficulty: "Medium" },
        { id: "bt-40", title: "Kth Largest Sum in a Binary Tree", slug: "kth-largest-sum-in-a-binary-tree", difficulty: "Medium" }
      ]
    }
  ]
}
};

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  // Backgrounds
  bg:         "#0d1117",
  bgNav:      "#111827",
  bgCard:     "#161d2e",
  bgCardHov:  "#1a2236",
  bgInset:    "#0a0f1a",
  bgPanel:    "#131929",

  // Blue accent
  blue:       "#4d9fff",
  blueLight:  "#7ab8ff",
  blueDim:    "rgba(77,159,255,0.12)",
  blueBorder: "rgba(77,159,255,0.25)",

  // Orange accent
  orange:     "#ff8c42",
  orangeLight:"#ffaa6e",
  orangeDim:  "rgba(255,140,66,0.12)",
  orangeBorder:"rgba(255,140,66,0.25)",

  // Text
  textPrimary:   "#e8edf5",
  textSecondary: "#8896aa",
  textMuted:     "#3d4f68",
  textFaint:     "#1e2c40",

  // Borders
  border:     "rgba(255,255,255,0.06)",
  borderMed:  "rgba(255,255,255,0.1)",

  // Status
  solved:     "#4d9fff",
  review:     "#ff8c42",
  unsolved:   "#2a3a52",

  // Difficulty
  easy:   { bg: "rgba(52,199,89,0.08)",   color: "#34c759", border: "rgba(52,199,89,0.2)" },
  medium: { bg: "rgba(255,204,0,0.08)",   color: "#ffcc00", border: "rgba(255,204,0,0.2)" },
  hard:   { bg: "rgba(255,69,58,0.08)",   color: "#ff453a", border: "rgba(255,69,58,0.2)" },
};

// DP category palette — cool blues + warm oranges
const DP_CAT_COLORS = [
  "#4d9fff","#ff8c42","#60b4ff","#ffaa6e","#38bdf8","#fb923c",
  "#7dd3fc","#fed7aa","#3b82f6","#f97316","#60a5fa","#fdba74",
  "#93c5fd","#ff8c42","#bfdbfe","#4d9fff","#0ea5e9","#ff7c20",
  "#06b6d4","#ffa040","#22d3ee","#ff6b00",
];

const STORAGE_KEY = "dsa_tracker_navy_v1";

const STATUS_ICONS  = ["○", "✓", "↻"];
const STATUS_LABELS = ["Unsolved", "Solved", "Review"];
const STATUS_COLORS = [T.unsolved, T.solved, T.review];

const TOPICS = {
  "Dynamic Programming": { color: T.blue,   icon: "∑",  type: "dp" },
  "Linked List":         { color: T.orange, icon: "⟳",  type: "structured" },
  "Binary Tree":         { color: T.blue,   icon: "⌥",  type: "structured" },
};

const DIFF_STYLE = {
  Easy:   T.easy,
  Medium: T.medium,
  Hard:   T.hard,
};

function slugToTitle(slug) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function getLCUrl(slug) { return `https://leetcode.com/problems/${slug}/`; }

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function DSAMasterTracker() {
  const [progress, setProgress] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [activeTopic, setActiveTopic]       = useState("Dynamic Programming");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSection, setActiveSection]   = useState(null);
  const [search, setSearch]                 = useState("");
  const [filterStatus, setFilterStatus]     = useState("all");
  const [noteModal, setNoteModal]           = useState(null);
  const [noteText, setNoteText]             = useState("");
  const [confetti, setConfetti]             = useState(false);
  const [prevSolved, setPrevSolved]         = useState(0);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {} }, [progress]);

  function cycleStatus(key) {
    setProgress(prev => {
      const cur  = prev[key] || 0;
      const next = (cur + 1) % 3;
      const updated = { ...prev, [key]: next };
      if (next === 1) {
        const ns = Object.values(updated).filter(v => v === 1).length;
        if (ns % 10 === 0 && ns > prevSolved) { setConfetti(true); setTimeout(() => setConfetti(false), 2500); }
        setPrevSolved(ns);
      }
      return updated;
    });
  }

  const NOTE_KEY = k => `__note__${k}`;
  const getNote  = k => progress[NOTE_KEY(k)] || "";
  function saveNote() {
    if (!noteModal) return;
    setProgress(prev => ({ ...prev, [NOTE_KEY(noteModal)]: noteText }));
    setNoteModal(null);
  }
  function openNote(k) { setNoteModal(k); setNoteText(getNote(k)); }

  const allKeys = useMemo(() => {
    const keys = [];
    Object.values(DP_DATA).forEach(arr => arr.forEach(s => keys.push(s)));
    Object.values(STRUCTURED_DATA).forEach(td => td.sections.forEach(sec => sec.problems.forEach(p => keys.push(p.id))));
    return keys;
  }, []);

  const globalStats = useMemo(() => {
    const solved = allKeys.filter(k => (progress[k] || 0) === 1).length;
    const review = allKeys.filter(k => (progress[k] || 0) === 2).length;
    const total  = allKeys.length;
    return { solved, review, total, pct: Math.round(((solved + review) / total) * 100) };
  }, [progress, allKeys]);

  const topicStats = useMemo(() => {
    const out = {};
    let dpTotal = 0, dpSolved = 0, dpReview = 0;
    Object.values(DP_DATA).forEach(arr => arr.forEach(s => {
      dpTotal++;
      const v = progress[s] || 0;
      if (v === 1) dpSolved++;
      if (v === 2) dpReview++;
    }));
    out["Dynamic Programming"] = { total: dpTotal, solved: dpSolved, review: dpReview };
    Object.entries(STRUCTURED_DATA).forEach(([topic, td]) => {
      let total = 0, solved = 0, review = 0;
      td.sections.forEach(sec => sec.problems.forEach(p => {
        total++;
        const v = progress[p.id] || 0;
        if (v === 1) solved++;
        if (v === 2) review++;
      }));
      out[topic] = { total, solved, review };
    });
    return out;
  }, [progress]);

  function getDPCatStats(cat) {
    const ps     = DP_DATA[cat];
    const solved = ps.filter(s => (progress[s] || 0) === 1).length;
    const review = ps.filter(s => (progress[s] || 0) === 2).length;
    return { solved, review, total: ps.length, pct: Math.round(((solved + review) / ps.length) * 100) };
  }

  const filteredDP = useMemo(() => {
    if (!activeCategory) return [];
    return DP_DATA[activeCategory].filter(slug => {
      const ms = !search || slugToTitle(slug).toLowerCase().includes(search.toLowerCase()) || slug.includes(search.toLowerCase());
      const mf = filterStatus === "all" || (progress[slug] || 0) === Number(filterStatus);
      return ms && mf;
    });
  }, [activeCategory, search, filterStatus, progress]);

  const filteredSections = useMemo(() => {
    if (activeTopic === "Dynamic Programming") return [];
    const td = STRUCTURED_DATA[activeTopic];
    if (!td) return [];
    return td.sections.map(sec => ({
      ...sec,
      problems: sec.problems.filter(p => {
        const ms = !search || p.title.toLowerCase().includes(search.toLowerCase());
        const mf = filterStatus === "all" || (progress[p.id] || 0) === Number(filterStatus);
        return ms && mf;
      }),
    })).filter(sec => sec.problems.length > 0 || !search);
  }, [activeTopic, search, filterStatus, progress]);

  const topicColor = TOPICS[activeTopic]?.color || T.blue;
  const dpCatColor = activeCategory
    ? DP_CAT_COLORS[Object.keys(DP_DATA).indexOf(activeCategory) % DP_CAT_COLORS.length]
    : T.blue;

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.textPrimary, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e2c40; border-radius: 4px; }
        .cat-btn:hover { background: rgba(77,159,255,0.07) !important; border-color: rgba(77,159,255,0.3) !important; }
        .prob-row:hover { background: #1a2236 !important; }
        .lc-link:hover { color: #fff !important; }
        .topic-btn:hover { filter: brightness(1.08); }
        .note-btn:hover { color: ${T.textSecondary} !important; }
        .sec-nav-btn:hover { background: rgba(255,255,255,0.04) !important; color: ${T.textSecondary} !important; }
        .filter-btn:hover { border-color: rgba(255,255,255,0.15) !important; }
        @keyframes pop { 0%{transform:scale(0);opacity:1} 60%{transform:scale(2.5);opacity:1} 100%{transform:scale(4);opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-4px)} to{opacity:1;transform:none} }
        @keyframes shimmer { 0%{opacity:0.5} 50%{opacity:1} 100%{opacity:0.5} }
        input:focus, textarea:focus { outline: none; border-color: rgba(77,159,255,0.4) !important; box-shadow: 0 0 0 3px rgba(77,159,255,0.08) !important; }
        .reset-btn:hover { color: rgba(255,80,80,0.6) !important; border-color: rgba(255,80,80,0.25) !important; }
      `}</style>

      {/* Subtle grid */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(77,159,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(77,159,255,0.015) 1px,transparent 1px)`, backgroundSize: "48px 48px", pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "fixed", top: "-200px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(77,159,255,0.06) 0%,transparent 65%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-150px", left: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(255,140,66,0.05) 0%,transparent 65%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />

      {confetti && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "80px", animation: "pop 2.5s ease forwards" }}>🎉</div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1480px", margin: "0 auto", padding: "clamp(20px,4vw,40px) clamp(16px,3vw,32px)" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: "32px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "4px", color: T.blue, textTransform: "uppercase", marginBottom: "10px", fontFamily: "'DM Mono', monospace", opacity: 0.7 }}>Personal DSA Tracker</div>
            <h1 style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: "700", letterSpacing: "-1.5px", color: T.textPrimary, lineHeight: 1.05, marginBottom: "6px" }}>
              Algo<span style={{ color: T.orange }}>.</span>Grind
            </h1>
            <p style={{ fontSize: "12px", color: T.textMuted, letterSpacing: "1.5px", fontFamily: "'DM Mono', monospace" }}>{globalStats.total} problems · {Object.keys(TOPICS).length} topics</p>
          </div>
          {/* Mini legend */}
          <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: T.textMuted, alignItems: "center", fontFamily: "'DM Mono', monospace" }}>
            {STATUS_ICONS.map((ic, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ color: STATUS_COLORS[i], fontSize: "13px" }}>{ic}</span>{STATUS_LABELS[i]}
              </span>
            ))}
          </div>
        </div>

        {/* ── GLOBAL STATS ── */}
        <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "14px", padding: "clamp(16px,3vw,24px)", marginBottom: "20px", backdropFilter: "blur(8px)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: "220px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "14px" }}>
                <span style={{ fontSize: "clamp(40px,6vw,54px)", fontWeight: "700", color: T.blue, lineHeight: 1, letterSpacing: "-2px" }}>{globalStats.pct}%</span>
                <div>
                  <div style={{ fontSize: "13px", color: T.textSecondary, fontWeight: "500" }}>complete</div>
                  <div style={{ fontSize: "11px", color: T.textMuted, fontFamily: "'DM Mono', monospace" }}>{globalStats.solved + globalStats.review} / {globalStats.total}</div>
                </div>
              </div>
              {/* Dual progress bar */}
              <div style={{ height: "6px", background: "rgba(255,255,255,0.04)", borderRadius: "3px", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(globalStats.solved / globalStats.total) * 100}%`, background: `linear-gradient(90deg, ${T.blue}, ${T.blueLight})`, borderRadius: "3px", transition: "width 0.7s cubic-bezier(.4,0,.2,1)" }} />
                <div style={{ position: "absolute", left: `${(globalStats.solved / globalStats.total) * 100}%`, top: 0, height: "100%", width: `${(globalStats.review / globalStats.total) * 100}%`, background: `linear-gradient(90deg, ${T.orange}, ${T.orangeLight})`, transition: "all 0.7s cubic-bezier(.4,0,.2,1)" }} />
              </div>
              <div style={{ marginTop: "8px", fontSize: "11px", color: T.textFaint, fontFamily: "'DM Mono', monospace" }}>
                <span style={{ color: T.blue }}>■</span> solved &nbsp;<span style={{ color: T.orange }}>■</span> review
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[["Solved", globalStats.solved, T.blue, T.blueDim, T.blueBorder], ["Review", globalStats.review, T.orange, T.orangeDim, T.orangeBorder], ["Pending", globalStats.total - globalStats.solved - globalStats.review, T.textMuted, "rgba(255,255,255,0.02)", T.border]].map(([label, val, color, bg, border]) => (
                <div key={label} style={{ textAlign: "center", minWidth: "72px", background: bg, border: `1px solid ${border}`, borderRadius: "10px", padding: "14px 10px" }}>
                  <div style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: "700", color, lineHeight: 1, letterSpacing: "-1px" }}>{val}</div>
                  <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: T.textMuted, textTransform: "uppercase", marginTop: "5px", fontFamily: "'DM Mono', monospace" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TOPIC SELECTOR ── */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          {Object.entries(TOPICS).map(([topic, cfg]) => {
            const ts  = topicStats[topic] || { total: 0, solved: 0, review: 0 };
            const pct = ts.total ? Math.round(((ts.solved + ts.review) / ts.total) * 100) : 0;
            const isActive = activeTopic === topic;
            return (
              <button key={topic} className="topic-btn"
                onClick={() => { setActiveTopic(topic); setActiveCategory(null); setSearch(""); setFilterStatus("all"); }}
                style={{ background: isActive ? (cfg.color === T.blue ? T.blueDim : T.orangeDim) : T.bgCard, border: `1px solid ${isActive ? cfg.color : T.border}`, borderRadius: "12px", padding: "14px 20px", cursor: "pointer", color: isActive ? cfg.color : T.textMuted, transition: "all 0.2s", minWidth: 170, textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "16px", opacity: 0.9 }}>{cfg.icon}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: isActive ? cfg.color : T.textSecondary }}>{topic}</span>
                </div>
                <div style={{ height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "1px", overflow: "hidden", marginBottom: "6px" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: cfg.color, transition: "width 0.4s ease", borderRadius: "1px" }} />
                </div>
                <div style={{ fontSize: "10px", color: isActive ? cfg.color : T.textFaint, fontFamily: "'DM Mono', monospace" }}>{ts.solved}/{ts.total} · {pct}%</div>
              </button>
            );
          })}
        </div>

        {/* ══════════════════ DYNAMIC PROGRAMMING ══════════════════ */}
        {activeTopic === "Dynamic Programming" && (
          <div style={{ display: "grid", gridTemplateColumns: activeCategory ? "min(300px,32%) 1fr" : "1fr", gap: "18px", alignItems: "start" }}>
            {/* Category list */}
            <div>
              {!activeCategory && (
                <div style={{ fontSize: "11px", color: T.textMuted, marginBottom: "14px", fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}>
                  Select a category →
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {Object.keys(DP_DATA).map((cat, i) => {
                  const { solved, review, total, pct } = getDPCatStats(cat);
                  const color    = DP_CAT_COLORS[i % DP_CAT_COLORS.length];
                  const isActive = activeCategory === cat;
                  const done     = solved === total;
                  return (
                    <button key={cat} className="cat-btn"
                      onClick={() => { setActiveCategory(isActive ? null : cat); setSearch(""); setFilterStatus("all"); }}
                      style={{ background: isActive ? `rgba(77,159,255,0.07)` : T.bgCard, border: `1px solid ${isActive ? color : T.border}`, borderRadius: "9px", padding: "10px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.15s", color: T.textPrimary }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "600", color: isActive ? color : T.textSecondary }}>{cat}{done ? " ✓" : ""}</span>
                        <span style={{ fontSize: "10px", color, fontFamily: "'DM Mono', monospace", fontWeight: "500" }}>{pct}%</span>
                      </div>
                      <div style={{ height: "2px", background: "rgba(255,255,255,0.04)", borderRadius: "1px", overflow: "hidden", marginBottom: "5px" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "1px", transition: "width 0.4s ease" }} />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <span style={{ fontSize: "10px", color: T.blue, fontFamily: "'DM Mono', monospace" }}>✓ {solved}</span>
                        {review > 0 && <span style={{ fontSize: "10px", color: T.orange, fontFamily: "'DM Mono', monospace" }}>↻ {review}</span>}
                        <span style={{ fontSize: "10px", color: T.textFaint, fontFamily: "'DM Mono', monospace" }}>/ {total}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Problem panel */}
            {activeCategory && (
              <div style={{ animation: "fadeUp 0.22s ease" }}>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                    <h2 style={{ fontSize: "clamp(15px,2.2vw,19px)", fontWeight: "700", color: dpCatColor, letterSpacing: "-0.5px" }}>{activeCategory}</h2>
                    <span style={{ fontSize: "11px", color: T.textMuted, fontFamily: "'DM Mono', monospace" }}>{DP_DATA[activeCategory].length} problems</span>
                    <button onClick={() => setActiveCategory(null)} style={{ marginLeft: "auto", background: "transparent", border: `1px solid ${T.border}`, borderRadius: "6px", color: T.textMuted, cursor: "pointer", padding: "4px 12px", fontSize: "11px", fontFamily: "'DM Mono', monospace", transition: "all 0.15s" }}>✕ close</button>
                  </div>
                  <SearchBar search={search} setSearch={setSearch} filterStatus={filterStatus} setFilterStatus={setFilterStatus} accentColor={dpCatColor} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  {filteredDP.length === 0 && <EmptyState />}
                  {filteredDP.map((slug, idx) => (
                    <DPProblemRow key={slug} slug={slug} idx={idx}
                      status={progress[slug] || 0} note={getNote(slug)}
                      onCycle={() => cycleStatus(slug)} onNote={() => openNote(slug)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════ STRUCTURED (LL / BT) ══════════════════ */}
        {activeTopic !== "Dynamic Programming" && (
          <div style={{ display: "grid", gridTemplateColumns: "min(250px,28%) 1fr", gap: "18px", alignItems: "start" }}>

            {/* Sidebar */}
            <div style={{ position: "sticky", top: 20 }}>
              {/* Topic stats */}
              {(() => {
                const ts  = topicStats[activeTopic] || {};
                const pct = ts.total ? Math.round(((ts.solved + ts.review) / ts.total) * 100) : 0;
                const col = topicColor;
                return (
                  <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "3px", color: col, textTransform: "uppercase", marginBottom: "8px", fontFamily: "'DM Mono', monospace", opacity: 0.8 }}>{activeTopic}</div>
                    <div style={{ fontSize: "34px", fontWeight: "700", color: col, lineHeight: 1, marginBottom: "10px", letterSpacing: "-1px" }}>{pct}%</div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.04)", borderRadius: "2px", overflow: "hidden", marginBottom: "10px" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: col, transition: "width 0.5s ease" }} />
                    </div>
                    <div style={{ fontSize: "11px", color: T.textMuted, fontFamily: "'DM Mono', monospace" }}>
                      <span style={{ color: T.blue }}>✓</span> {ts.solved} &nbsp;<span style={{ color: T.orange }}>↻</span> {ts.review} &nbsp;/ {ts.total}
                    </div>
                  </div>
                );
              })()}

              {/* Section nav */}
              <div style={{ fontSize: "9px", letterSpacing: "3px", color: T.textFaint, textTransform: "uppercase", marginBottom: "8px", paddingLeft: "4px", fontFamily: "'DM Mono', monospace" }}>SECTIONS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", maxHeight: "44vh", overflowY: "auto", marginBottom: "16px" }}>
                {(STRUCTURED_DATA[activeTopic]?.sections || []).map(sec => {
                  const secSolved = sec.problems.filter(p => (progress[p.id] || 0) === 1).length;
                  const secTotal  = sec.problems.length;
                  const isActive  = activeSection === sec.title;
                  return (
                    <button key={sec.title} className="sec-nav-btn"
                      onClick={() => { setActiveSection(sec.title); document.getElementById("sec-" + sec.title.replace(/\W/g, "-"))?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                      style={{ background: isActive ? "rgba(255,255,255,0.04)" : "transparent", border: "none", borderRadius: "6px", padding: "7px 10px", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", color: isActive ? T.textSecondary : T.textMuted, fontSize: "11px", transition: "all 0.15s" }}>
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>{sec.title}</span>
                      {secTotal > 0 && <span style={{ fontSize: "10px", color: T.textFaint, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>{secSolved}/{secTotal}</span>}
                    </button>
                  );
                })}
              </div>

              {/* Filter */}
              <div style={{ fontSize: "9px", letterSpacing: "3px", color: T.textFaint, textTransform: "uppercase", marginBottom: "8px", paddingLeft: "4px", fontFamily: "'DM Mono', monospace" }}>FILTER</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {["all", "0", "1", "2"].map(f => {
                  const isActive = filterStatus === f;
                  return (
                    <button key={f} className="filter-btn" onClick={() => setFilterStatus(f)}
                      style={{ padding: "8px 12px", borderRadius: "7px", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", background: isActive ? (f === "1" ? T.blueDim : f === "2" ? T.orangeDim : "rgba(255,255,255,0.05)") : "transparent", border: `1px solid ${isActive ? (f === "1" ? T.blue : f === "2" ? T.orange : T.borderMed) : T.border}`, color: isActive ? (f === "1" ? T.blue : f === "2" ? T.orange : T.textSecondary) : T.textMuted, textAlign: "left", transition: "all 0.15s", fontWeight: isActive ? "600" : "400" }}>
                      {f === "all" ? "All Problems" : STATUS_LABELS[Number(f)]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main */}
            <div style={{ animation: "fadeUp 0.22s ease" }}>
              <div style={{ marginBottom: "20px" }}>
                <SearchBar search={search} setSearch={setSearch} filterStatus={filterStatus} setFilterStatus={setFilterStatus} accentColor={topicColor} hideFilterButtons />
              </div>
              {filteredSections.map(sec => (
                <div key={sec.title} id={"sec-" + sec.title.replace(/\W/g, "-")} style={{ marginBottom: "28px", animation: "fadeUp 0.3s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", paddingBottom: "8px", borderBottom: `1px solid ${T.border}` }}>
                    <h2 style={{ fontSize: "11px", fontWeight: "600", color: T.textMuted, textTransform: "uppercase", letterSpacing: "2px", flex: 1, fontFamily: "'DM Mono', monospace" }}>{sec.title}</h2>
                    {sec.note && <span style={{ fontSize: "10px", color: T.orange, background: T.orangeDim, border: `1px solid ${T.orangeBorder}`, borderRadius: "4px", padding: "2px 8px", fontFamily: "'DM Mono', monospace" }}>{sec.note}</span>}
                    {sec.problems.length > 0 && (
                      <span style={{ fontSize: "10px", color: T.textFaint, fontFamily: "'DM Mono', monospace" }}>
                        {sec.problems.filter(p => (progress[p.id] || 0) === 1).length}/{sec.problems.length}
                      </span>
                    )}
                  </div>
                  {sec.problems.length === 0 && <div style={{ color: T.textFaint, fontSize: "12px", fontStyle: "italic", padding: "4px 0", fontFamily: "'DM Mono', monospace" }}>No problems listed</div>}
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    {sec.problems.map((p, idx) => {
                      const status = progress[p.id] || 0;
                      const note   = getNote(p.id);
                      const dc     = DIFF_STYLE[p.difficulty] || DIFF_STYLE.Medium;
                      const sc     = STATUS_COLORS[status];
                      return (
                        <div key={p.id} className="prob-row"
                          style={{ display: "flex", alignItems: "center", gap: "10px", background: T.bgCard, border: `1px solid ${status ? `rgba(${status === 1 ? "77,159,255" : "255,140,66"},0.15)` : T.border}`, borderRadius: "8px", padding: "9px 12px", transition: "all 0.12s", animation: "slideIn 0.2s ease both", animationDelay: `${idx * 15}ms` }}>
                          <button onClick={() => cycleStatus(p.id)}
                            style={{ width: "26px", height: "26px", borderRadius: "6px", flexShrink: 0, background: status ? `rgba(${status === 1 ? "77,159,255" : "255,140,66"},0.1)` : "rgba(255,255,255,0.03)", border: `1.5px solid ${sc}`, color: sc, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", fontFamily: "'DM Mono', monospace" }}>
                            {STATUS_ICONS[status]}
                          </button>
                          <span style={{ fontSize: "10px", color: T.textFaint, minWidth: "20px", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>{String(idx + 1).padStart(2, "0")}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <a href={getLCUrl(p.slug)} target="_blank" rel="noopener noreferrer" className="lc-link"
                              style={{ color: status === 1 ? T.blue : status === 2 ? T.orange : T.textSecondary, textDecoration: "none", fontSize: "13px", fontWeight: status === 1 ? "500" : "400", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color 0.12s" }}>
                              {p.title}
                              {p.important && <span style={{ fontSize: "9px", background: "rgba(255,69,58,0.1)", color: "#ff453a", border: "1px solid rgba(255,69,58,0.25)", borderRadius: "3px", padding: "1px 5px", letterSpacing: "1px", fontWeight: "700", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>IMP</span>}
                            </a>
                          </div>
                          {note && <span style={{ fontSize: "12px", flexShrink: 0 }} title={note}>📝</span>}
                          <span style={{ fontSize: "9px", padding: "2px 7px", borderRadius: "4px", flexShrink: 0, background: dc.bg, color: dc.color, border: `1px solid ${dc.border}`, letterSpacing: "0.5px", fontWeight: "600", fontFamily: "'DM Mono', monospace" }}>{p.difficulty}</span>
                          {p.note && <span title={p.note} style={{ fontSize: "12px", color: T.textMuted, cursor: "help", flexShrink: 0 }}>ℹ</span>}
                          <button className="note-btn" onClick={() => openNote(p.id)}
                            style={{ background: "transparent", border: "none", color: T.textFaint, cursor: "pointer", fontSize: "13px", padding: "2px 4px", transition: "color 0.15s", flexShrink: 0 }}>✎</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <div style={{ marginTop: "48px", borderTop: `1px solid ${T.border}`, paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "10px", color: T.textFaint, letterSpacing: "2px", fontFamily: "'DM Mono', monospace" }}>DSA TRACKER · {new Date().getFullYear()}</span>
          <button className="reset-btn" onClick={() => { if (window.confirm("Reset ALL progress? This cannot be undone.")) setProgress({}); }}
            style={{ background: "transparent", border: `1px solid rgba(255,60,60,0.1)`, borderRadius: "6px", color: "rgba(255,60,60,0.25)", cursor: "pointer", padding: "6px 14px", fontSize: "10px", letterSpacing: "1.5px", fontFamily: "'DM Mono', monospace", transition: "all 0.15s" }}>
            RESET ALL
          </button>
        </div>
      </div>

      {/* ── NOTE MODAL ── */}
      {noteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)" }}
          onClick={() => setNoteModal(null)}>
          <div style={{ background: T.bgPanel, border: `1px solid ${T.borderMed}`, borderRadius: "14px", padding: "24px", width: "460px", maxWidth: "90vw", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "11px", letterSpacing: "3px", color: T.textMuted, textTransform: "uppercase", marginBottom: "14px", fontFamily: "'DM Mono', monospace" }}>Personal Note</div>
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={6}
              placeholder="Write your approach, key insights, edge cases..."
              style={{ width: "100%", background: T.bgInset, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "12px", color: T.textPrimary, fontSize: "13px", fontFamily: "'DM Mono', monospace", resize: "vertical", boxSizing: "border-box", transition: "all 0.2s" }} />
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "14px" }}>
              <button onClick={() => setNoteModal(null)}
                style={{ background: "transparent", border: `1px solid ${T.border}`, color: T.textMuted, padding: "8px 18px", borderRadius: "7px", cursor: "pointer", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              <button onClick={saveNote}
                style={{ background: T.blueDim, border: `1px solid ${T.blue}`, color: T.blue, padding: "8px 18px", borderRadius: "7px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>Save Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SearchBar({ search, setSearch, filterStatus, setFilterStatus, accentColor, hideFilterButtons }) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search problems..."
        style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "9px 14px", color: T.textPrimary, fontFamily: "'DM Sans', sans-serif", fontSize: "13px", flex: 1, minWidth: "140px", transition: "all 0.2s", '::placeholder': { color: T.textMuted } }} />
      {!hideFilterButtons && ["all", "0", "1", "2"].map(f => {
        const isActive = filterStatus === f;
        return (
          <button key={f} onClick={() => setFilterStatus(f)}
            style={{ padding: "9px 14px", borderRadius: "8px", fontSize: "11px", cursor: "pointer", fontFamily: "'DM Mono', monospace", background: isActive ? accentColor : T.bgCard, border: `1px solid ${isActive ? accentColor : T.border}`, color: isActive ? "#000" : T.textMuted, transition: "all 0.15s", fontWeight: isActive ? "700" : "400", letterSpacing: "0.5px" }}>
            {f === "all" ? "ALL" : STATUS_LABELS[Number(f)].toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function DPProblemRow({ slug, idx, status, note, onCycle, onNote }) {
  const sc = STATUS_COLORS[status];
  return (
    <div className="prob-row"
      style={{ display: "flex", alignItems: "center", gap: "10px", background: T.bgCard, border: `1px solid ${status ? `rgba(${status === 1 ? "77,159,255" : "255,140,66"},0.15)` : T.border}`, borderRadius: "8px", padding: "9px 12px", transition: "all 0.12s", animation: "slideIn 0.2s ease both", animationDelay: `${idx * 12}ms` }}>
      <button onClick={onCycle}
        style={{ width: "26px", height: "26px", borderRadius: "6px", flexShrink: 0, background: status ? `rgba(${status === 1 ? "77,159,255" : "255,140,66"},0.1)` : "rgba(255,255,255,0.03)", border: `1.5px solid ${sc}`, color: sc, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", fontFamily: "'DM Mono', monospace" }}>
        {STATUS_ICONS[status]}
      </button>
      <span style={{ fontSize: "10px", color: T.textFaint, minWidth: "20px", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>{String(idx + 1).padStart(2, "0")}</span>
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: "8px" }}>
        <a href={getLCUrl(slug)} target="_blank" rel="noopener noreferrer" className="lc-link"
          style={{ color: status === 1 ? T.blue : status === 2 ? T.orange : T.textSecondary, textDecoration: "none", fontSize: "13px", fontWeight: status === 1 ? "500" : "400", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color 0.12s" }}>
          {slugToTitle(slug)}
        </a>
        {note && <span style={{ fontSize: "11px", flexShrink: 0 }} title={note}>📝</span>}
      </div>
      <button onClick={onNote} className="note-btn"
        style={{ background: "transparent", border: "none", color: T.textFaint, cursor: "pointer", fontSize: "13px", padding: "2px 4px", transition: "color 0.15s", flexShrink: 0 }}>✎</button>
      <span style={{ fontSize: "9px", letterSpacing: "1px", padding: "2px 8px", borderRadius: "4px", flexShrink: 0, background: status === 1 ? T.blueDim : status === 2 ? T.orangeDim : "rgba(255,255,255,0.03)", color: sc, border: `1px solid ${status === 1 ? T.blueBorder : status === 2 ? T.orangeBorder : T.border}`, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" }}>
        {STATUS_LABELS[status]}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ padding: "48px", textAlign: "center", color: T.textFaint, fontSize: "12px", border: `1px dashed ${T.border}`, borderRadius: "10px", fontFamily: "'DM Mono', monospace" }}>
      No problems match filter
    </div>
  );
}