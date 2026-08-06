/*!
 * (C) Helvetia Design System https://design.baloise.dev/ - Apache License 2.0
 */
const x=x=>{if(null==x||null==x||""===x)return x;const e=String(x).toLowerCase(),s=l[e];return s?(console.warn(`[bal] The t-shirt size "${x}" is deprecated. Please use the short value "${s}" instead.`),s):x},l=Object.entries({"3xs":"xx-small","2xs":"xx-small",xs:"x-small",sm:"small",base:"normal",md:"medium",lg:"large",xl:"x-large","2xl":"xx-large","3xl":"xxx-large","4xl":"xxxx-large","5xl":"xxxxx-large","6xl":"xxxxxx-large"}).reduce(((x,[l,e])=>(x[e]||(x[e]=l),x)),{});export{x as n}