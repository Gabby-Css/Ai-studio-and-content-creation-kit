PAIRS = [
    (" return {D,dist:(t)=>ease(t/T)*D};}", " return {D,ease,T,dist:(t)=>ease(t/T)*D,ground:(id,x0)=>tl.fromTo(id,{x:x0},{x:x0-D,duration:T,ease},0)};}      // ground(id,x0): a ground object that moves with the scenery"),
]
