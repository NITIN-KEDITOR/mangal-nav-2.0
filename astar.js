// A* Algorithm O(n log n) - NASA Space Apps
class MinHeap {
  constructor(){ this.heap=[]; }
  push(node){ this.heap.push(node); this.heap.sort((a,b)=>a.f-b.f); }
  pop(){ return this.heap.shift(); }
  isEmpty(){ return this.heap.length===0; }
}
function heuristic(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
function aStar(grid,start,goal){
  let open=new MinHeap(); let closed=new Set();
  open.push({x:start.x,y:start.y,g:0,h:heuristic(start,goal),f:heuristic(start,goal),parent:null});
  const dirs=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]];
  while(!open.isEmpty()){
    let cur=open.pop(); let key=`${cur.x},${cur.y}`;
    if(closed.has(key)) continue; closed.add(key);
    if(cur.x===goal.x && cur.y===goal.y){ let path=[]; while(cur){ path.push(cur); cur=cur.parent; } return path.reverse(); }
    for(let [dx,dy] of dirs){
      let nx=cur.x+dx, ny=cur.y+dy;
      if(nx<0||ny<0||nx>=grid[0].length||ny>=grid.length) continue;
      if(grid[ny][nx]===1) continue;
      let g=cur.g + (dx===0||dy===0?1:1.4) + grid[ny][nx]*0.5;
      let h=heuristic({x:nx,y:ny},goal);
      open.push({x:nx,y:ny,g,h,f:g+h,parent:cur});
    }
  }
  return [];
}
