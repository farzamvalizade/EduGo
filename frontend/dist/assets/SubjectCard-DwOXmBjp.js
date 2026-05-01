import{r as d,j as e,L as n}from"./index-KPbWMPPl.js";const f=({subject:r,completedStages:t,totalStages:a,icon:c,continueUrl:s,isHomePage:l=!1,isCompleted:i=!1,isStarted:u=!1})=>{const o=Math.min(t/a*100,100),[x,h]=d.useState(0);return d.useEffect(()=>{requestAnimationFrame(()=>{h(o)})},[o]),e.jsxs("div",{className:`
              bg-[#1a1a1a] rounded-2xl p-5 border-2 border-custard/30 cursor-pointer transition-all duration-300 ease-out hover:border-custard/60 hover:scale-[1.03]`,tabIndex:0,children:[e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl flex items-center justify-center",children:e.jsx("img",{src:c,alt:r,className:"w-full h-full"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h4",{className:"mb-1",children:r}),e.jsxs("p",{className:"text-sm text-muted-foreground mb-3",children:[t," از ",a," مرحله"]}),u&&e.jsx("div",{className:"relative h-2 bg-secondary rounded-full overflow-hidden mb-3",children:e.jsx("div",{className:`
                h-full
                bg-custard
                rounded-full
                transition-[width] duration-700 ease-out
              `,style:{width:`${x}%`}})}),l&&e.jsxs(n,{to:s,className:"flex items-center gap-2 text-sm text-custard",children:[e.jsx("span",{children:"ادامه"}),e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"inline-block transform scale-x-[-1]",children:[e.jsx("path",{d:"M5 12h14"}),e.jsx("path",{d:"m12 5 7 7-7 7"})]})]})]})]}),!l&&!i&&e.jsx(n,{to:s,className:`
            w-full
            inline-flex items-center justify-center
            rounded-full
            bg-custard/90 text-black
            px-6 py-3
            font-medium
            transition-all duration-300 ease-out
            hover:bg-custard
            hover:scale-[1.02]
            hover:shadow-[0_8px_30px_rgba(255,255,203,0.35)]
            active:scale-95
          `,children:"بیشتر ببینید"}),i&&e.jsx(n,{to:s,className:`
            w-full
            inline-flex items-center justify-center
            rounded-full
            bg-[#2a2a2a] text-white
            px-6 py-3
            font-medium
            transition-all duration-300 ease-out
            hover:bg-custard
            hover:scale-[1.02]
            hover:shadow-[0_8px_30px_rgba(255,255,203,0.35)]
            active:scale-95
          `,children:"کامل شده ✓"})]})};export{f as S};
