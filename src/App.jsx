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
  "Math DP": ["ugly-number-ii","count-sorted-vowel-strings","race-car","super-egg-drop","least-operators-to-express-number","largest-multiple-of-three","minimum-one-bit-operations-to-make-integers-zero"]
};

const STORAGE_KEY = "dp_tracker_v1";
function slugToTitle(slug) { return slug.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" "); }
function getLCUrl(slug) { return `https://leetcode.com/problems/${slug}/`; }
function hexToRgb(hex) { const h=hex.replace("#",""); const b=parseInt(h,16); return `${(b>>16)&255},${(b>>8)&255},${b&255}`; }

const CATEGORY_COLORS = ["#00ffa3","#00c8ff","#ff6b6b","#ffd93d","#c77dff","#ff9f43","#54a0ff","#b8e994","#ff6b9d","#00d2d3","#1dd1a1","#ee5a24","#0abde3","#f368e0","#ffdd59","#48dbfb","#a29bfe","#feca57","#1abc9c","#fd79a8","#74b9ff"];
const STATUS_ICONS = ["○","✓","↻"];
const STATUS_LABELS = ["Unsolved","Solved","Review"];
const STATUS_COLORS = ["#2e2e40","#00ffa3","#ffd93d"];

export default function DPTracker() {
  const [progress, setProgress] = useState(() => {
    try { const s=localStorage.getItem(STORAGE_KEY); return s?JSON.parse(s):{}; } catch { return {}; }
  });
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [confetti, setConfetti] = useState(false);
  const [prevSolved, setPrevSolved] = useState(0);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(progress)); } catch {} }, [progress]);

  const categories = Object.keys(DP_DATA);
  const totalProblems = useMemo(()=>Object.values(DP_DATA).reduce((a,b)=>a+b.length,0),[]);
  const solvedCount = useMemo(()=>Object.values(progress).filter(v=>v===1).length,[progress]);
  const reviewCount = useMemo(()=>Object.values(progress).filter(v=>v===2).length,[progress]);
  const globalPct = Math.round(((solvedCount + reviewCount)/totalProblems)*100);

  function cycleStatus(slug) {
    setProgress(prev => {
      const cur = prev[slug]||0;
      const next = (cur+1)%3;
      const updated = {...prev,[slug]:next};
      if (next===1) {
        const ns = Object.values(updated).filter(v=>v===1).length;
        if (ns%10===0 && ns>prevSolved) { setConfetti(true); setTimeout(()=>setConfetti(false),2500); }
        setPrevSolved(ns);
      }
      return updated;
    });
  }

  function getCatStats(cat) {
    const ps = DP_DATA[cat];
    const solved = ps.filter(s=>(progress[s]||0)===1).length;
    const review = ps.filter(s=>(progress[s]||0)===2).length;
    return { solved, review, total:ps.length, pct:Math.round(((solved + review)/ps.length)*100) };
  }

  const filteredProblems = useMemo(()=>{
    if (!activeCategory) return [];
    return DP_DATA[activeCategory].filter(slug=>{
      const ms = !search||slugToTitle(slug).toLowerCase().includes(search.toLowerCase())||slug.includes(search.toLowerCase());
      const mf = filterStatus==="all"||(progress[slug]||0)===Number(filterStatus);
      return ms&&mf;
    });
  },[activeCategory,search,filterStatus,progress]);

  const catIdx = activeCategory ? categories.indexOf(activeCategory) : 0;
  const activeCatColor = CATEGORY_COLORS[catIdx % CATEGORY_COLORS.length];

  return (
    <div style={{minHeight:"100vh",background:"#07070f",color:"#ddd",fontFamily:"'Courier New',Courier,monospace",position:"relative",overflowX:"hidden"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#1e1e2e;border-radius:3px}
        .catbtn:hover{filter:brightness(1.3)!important;transform:translateX(2px)}
        .probrow:hover{background:rgba(255,255,255,0.04)!important}
        .lclink:hover{color:#fff!important;text-decoration:underline!important}
        @keyframes pop{0%{transform:scale(0);opacity:1}60%{transform:scale(2.5);opacity:1}100%{transform:scale(4);opacity:0}}
        @keyframes fin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        input:focus{border-color:rgba(255,255,255,0.2)!important;outline:none}
      `}</style>

      {/* BG grid */}
      <div style={{position:"fixed",inset:0,zIndex:0,backgroundImage:"linear-gradient(rgba(0,255,163,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,163,0.022) 1px,transparent 1px)",backgroundSize:"44px 44px",pointerEvents:"none"}}/>
      <div style={{position:"fixed",top:"-250px",right:"-150px",width:"600px",height:"600px",background:"radial-gradient(circle,rgba(0,200,255,0.07) 0%,transparent 65%)",borderRadius:"50%",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:"-150px",left:"-100px",width:"500px",height:"500px",background:"radial-gradient(circle,rgba(0,255,163,0.05) 0%,transparent 65%)",borderRadius:"50%",pointerEvents:"none",zIndex:0}}/>

      {confetti && (
        <div style={{position:"fixed",inset:0,zIndex:9999,pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{fontSize:"80px",animation:"pop 2.5s ease forwards"}}>🎉</div>
        </div>
      )}

      <div style={{position:"relative",zIndex:1,maxWidth:"1440px",margin:"0 auto",padding:"clamp(20px,4vw,40px) clamp(16px,3vw,32px)"}}>

        {/* HEADER */}
        <div style={{marginBottom:"36px"}}>
          <div style={{fontSize:"10px",letterSpacing:"5px",color:"#00ffa3",textTransform:"uppercase",marginBottom:"8px",opacity:0.8}}>Dynamic Programming</div>
          <h1 style={{fontSize:"clamp(30px,5vw,58px)",fontWeight:"900",letterSpacing:"-2px",color:"#fff",lineHeight:1,marginBottom:"8px"}}>
            PROGRESS<span style={{color:"#00ffa3"}}>_</span>TRACKER
          </h1>
          <p style={{fontSize:"11px",color:"#333",letterSpacing:"3px"}}>{totalProblems} PROBLEMS · {categories.length} CATEGORIES</p>
        </div>

        {/* GLOBAL STATS */}
        <div style={{background:"rgba(255,255,255,0.018)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"clamp(18px,3vw,28px)",marginBottom:"24px"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"20px",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{flex:1,minWidth:"240px"}}>
              <div style={{display:"flex",alignItems:"baseline",gap:"10px",marginBottom:"14px"}}>
                <span style={{fontSize:"clamp(40px,6vw,56px)",fontWeight:"900",color:"#00ffa3",lineHeight:1,textShadow:"0 0 30px rgba(0,255,163,0.3)"}}>{globalPct}%</span>
                <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
                  <span style={{fontSize:"13px",color:"#555"}}>complete</span>
                  <span style={{fontSize:"11px",color:"#333"}}>{(solvedCount + reviewCount)} / {totalProblems}</span>
                </div>
              </div>
              <div style={{height:"8px",background:"rgba(255,255,255,0.05)",borderRadius:"4px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${globalPct}%`,background:"linear-gradient(90deg,#00ffa3,#00c8ff)",borderRadius:"4px",transition:"width 0.7s cubic-bezier(.4,0,.2,1)",boxShadow:"0 0 16px rgba(0,255,163,0.35)"}}/>
              </div>
              <div style={{marginTop:"8px",fontSize:"11px",color:"#2a2a3f"}}>{reviewCount} in review · {totalProblems-solvedCount-reviewCount} remaining</div>
            </div>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
              {[["Solved",solvedCount,"#00ffa3"],["Review",reviewCount,"#ffd93d"],["Pending",totalProblems-solvedCount-reviewCount,"#1e1e2e"]].map(([label,val,color])=>(
                <div key={label} style={{textAlign:"center",minWidth:"72px",background:"rgba(255,255,255,0.02)",border:`1px solid rgba(${hexToRgb(color)},0.18)`,borderRadius:"12px",padding:"14px 10px"}}>
                  <div style={{fontSize:"clamp(24px,3vw,34px)",fontWeight:"900",color,lineHeight:1}}>{val}</div>
                  <div style={{fontSize:"9px",letterSpacing:"2px",color:"#333",textTransform:"uppercase",marginTop:"6px"}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{display:"flex",gap:"20px",marginBottom:"18px",flexWrap:"wrap",fontSize:"11px",color:"#333",letterSpacing:"1px"}}>
          <span style={{color:"#555"}}>CLICK BUTTON TO CYCLE:</span>
          {STATUS_ICONS.map((ic,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <span style={{color:STATUS_COLORS[i],fontSize:"13px"}}>{ic}</span>{STATUS_LABELS[i]}
            </span>
          ))}
        </div>

        {/* MAIN LAYOUT */}
        <div style={{display:"grid",gridTemplateColumns:activeCategory?"min(300px,34%) 1fr":"1fr",gap:"18px",alignItems:"start"}}>

          {/* CATEGORY LIST */}
          <div>
            {!activeCategory && <div style={{fontSize:"10px",letterSpacing:"3px",color:"#2a2a3f",textTransform:"uppercase",marginBottom:"12px"}}>Select a category to view problems</div>}
            <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
              {categories.map((cat,i)=>{
                const {solved,review,total,pct} = getCatStats(cat);
                const color = CATEGORY_COLORS[i%CATEGORY_COLORS.length];
                const isActive = activeCategory===cat;
                const done = solved===total;
                return (
                  <button key={cat} className="catbtn"
                    onClick={()=>{setActiveCategory(isActive?null:cat);setSearch("");setFilterStatus("all");}}
                    style={{background:isActive?`rgba(${hexToRgb(color)},0.09)`:"rgba(255,255,255,0.015)",border:`1px solid ${isActive?color:"rgba(255,255,255,0.055)"}`,borderRadius:"10px",padding:"11px 14px",cursor:"pointer",textAlign:"left",transition:"all 0.18s",color:"#ddd",boxShadow:isActive?`0 0 18px rgba(${hexToRgb(color)},0.12)`:"none"}}
                  >
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                      <span style={{fontSize:"12px",fontWeight:"700",color:isActive?color:"#bbb"}}>{cat}{done?" ✓":""}</span>
                      <span style={{fontSize:"11px",color,fontWeight:"700"}}>{pct}%</span>
                    </div>
                    <div style={{height:"2px",background:"rgba(255,255,255,0.05)",borderRadius:"1px",overflow:"hidden",marginBottom:"6px"}}>
                      <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:"1px",transition:"width 0.4s ease",boxShadow:`0 0 6px ${color}`}}/>
                    </div>
                    <div style={{display:"flex",gap:"12px"}}>
                      <span style={{fontSize:"10px",color:"#00ffa3"}}>✓ {solved}</span>
                      {review>0&&<span style={{fontSize:"10px",color:"#ffd93d"}}>↻ {review}</span>}
                      <span style={{fontSize:"10px",color:"#2a2a3f"}}>/ {total}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PROBLEM PANEL */}
          {activeCategory && (
            <div style={{animation:"fin 0.22s ease"}}>
              <div style={{marginBottom:"14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px",flexWrap:"wrap"}}>
                  <h2 style={{fontSize:"clamp(16px,2.5vw,20px)",fontWeight:"900",color:activeCatColor,textShadow:`0 0 20px rgba(${hexToRgb(activeCatColor)},0.4)`}}>{activeCategory}</h2>
                  <span style={{fontSize:"11px",color:"#2a2a3f"}}>{DP_DATA[activeCategory].length} problems</span>
                  <button onClick={()=>setActiveCategory(null)} style={{marginLeft:"auto",background:"transparent",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"6px",color:"#444",cursor:"pointer",padding:"4px 12px",fontSize:"11px",fontFamily:"Courier New"}}>✕ close</button>
                </div>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="search problems..." style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"8px",padding:"8px 14px",color:"#ddd",fontFamily:"Courier New",fontSize:"12px",flex:1,minWidth:"140px",transition:"border-color 0.2s"}}/>
                  {["all","0","1","2"].map(f=>(
                    <button key={f} onClick={()=>setFilterStatus(f)} style={{padding:"8px 12px",borderRadius:"8px",fontSize:"10px",cursor:"pointer",fontFamily:"Courier New",letterSpacing:"1.5px",background:filterStatus===f?activeCatColor:"rgba(255,255,255,0.03)",border:`1px solid ${filterStatus===f?activeCatColor:"rgba(255,255,255,0.07)"}`,color:filterStatus===f?"#000":"#555",transition:"all 0.15s",fontWeight:filterStatus===f?"700":"400"}}>
                      {f==="all"?"ALL":STATUS_LABELS[Number(f)].toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:"4px"}}>
                {filteredProblems.length===0&&(
                  <div style={{padding:"48px",textAlign:"center",color:"#1e1e2e",fontSize:"12px",border:"1px dashed rgba(255,255,255,0.05)",borderRadius:"10px"}}>no problems match filter</div>
                )}
                {filteredProblems.map((slug,idx)=>{
                  const status = progress[slug]||0;
                  const sc = STATUS_COLORS[status];
                  return (
                    <div key={slug} className="probrow" style={{display:"flex",alignItems:"center",gap:"12px",background:"rgba(255,255,255,0.018)",border:`1px solid ${status?`rgba(${hexToRgb(sc)},0.2)`:"rgba(255,255,255,0.04)"}`,borderRadius:"8px",padding:"10px 14px",transition:"all 0.12s"}}>
                      <button onClick={()=>cycleStatus(slug)} title="Click to cycle status" style={{width:"30px",height:"30px",borderRadius:"7px",flexShrink:0,background:status?`rgba(${hexToRgb(sc)},0.12)`:"rgba(255,255,255,0.03)",border:`2px solid ${sc}`,color:sc,fontSize:"15px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",boxShadow:status?`0 0 10px rgba(${hexToRgb(sc)},0.3)`:"none",fontFamily:"Courier New"}}>
                        {STATUS_ICONS[status]}
                      </button>
                      <span style={{fontSize:"10px",color:"#222",minWidth:"22px",flexShrink:0}}>{String(idx+1).padStart(2,"0")}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <a href={getLCUrl(slug)} target="_blank" rel="noopener noreferrer" className="lclink"
                          style={{color:status===1?"#00ffa3":status===2?"#ffd93d":"#777",textDecoration:"none",fontSize:"13px",fontFamily:"Courier New",fontWeight:status===1?"600":"400",display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",transition:"color 0.12s"}}>
                          {slugToTitle(slug)}
                        </a>
                      </div>
                      <span style={{fontSize:"9px",letterSpacing:"1.5px",padding:"3px 8px",borderRadius:"4px",flexShrink:0,background:`rgba(${hexToRgb(sc)},0.08)`,color:sc,textTransform:"uppercase"}}>
                        {STATUS_LABELS[status]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{marginTop:"48px",borderTop:"1px solid rgba(255,255,255,0.04)",paddingTop:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
          <span style={{fontSize:"10px",color:"#1e1e2e",letterSpacing:"3px"}}>DP GRIND — PERSONAL TRACKER · {new Date().getFullYear()}</span>
          <button onClick={()=>{if(window.confirm("Reset ALL progress? This cannot be undone."))setProgress({});}} style={{background:"transparent",border:"1px solid rgba(255,60,60,0.12)",borderRadius:"6px",color:"rgba(255,60,60,0.3)",cursor:"pointer",padding:"6px 14px",fontSize:"10px",letterSpacing:"2px",fontFamily:"Courier New",transition:"all 0.15s"}}>
            RESET ALL
          </button>
        </div>
      </div>
    </div>
  );
}