const o0={upper:.165,fore:.15,thigh:.245,shin:.245},s0=.114,E={torso:[0,9],head:[9,17],armL:[17,24],armR:[24,31],legL:[31,37],legR:[37,43]},Q=43,$=2,J=8,e0=5,c=(r,t)=>[r[0]+t[0],r[1]+t[1],r[2]+t[2]],k=(r,t)=>[r[0]-t[0],r[1]-t[1],r[2]-t[2]],a=(r,t)=>[r[0]*t,r[1]*t,r[2]*t],r0=(r,t)=>r[0]*t[0]+r[1]*t[1]+r[2]*t[2],X=(r,t)=>[r[1]*t[2]-r[2]*t[1],r[2]*t[0]-r[0]*t[2],r[0]*t[1]-r[1]*t[0]],B=r=>Math.hypot(r[0],r[1],r[2]),T=r=>a(r,1/(B(r)||1)),z=(r,t,n)=>c(r,a(k(t,r),n));function m0(r,t=0){const n=Object.fromEntries(Object.keys(r).map(o=>[o,[r[o][0]*300,-r[o][1]*400,0]])),y=z(n.lHip,n.rHip,.5),e=B(k(n.neck,y))/.3,N=t*e,s=T(k(z(n.lShoulder,n.rShoulder,.5),y)),M=T(k(n.lShoulder,n.rShoulder)),i=B(k(n.lShoulder,n.rShoulder))/2,C=Math.acos(Math.min(1,i/(s0*e))),I=[0,0,1],S=T(c(a(M,Math.cos(C)),a(I,-Math.sin(C)))),Z=T(X(S,s)),G=o=>-r0(k(n[o],y),M)*Math.tan(Math.min(C,1.2));for(const o of["l","r"])n[`${o}Shoulder`][2]=G(`${o}Shoulder`),n[`${o}Hip`][2]=G(`${o}Hip`)*.8;for(const o of Object.keys(n))n[o][2]+=N;const V=(o,m,l)=>{const f=l*e,u=Math.hypot(n[m][0]-n[o][0],n[m][1]-n[o][1]);n[m][2]=n[o][2]+Math.sqrt(Math.max(0,f*f-u*u))*.9};for(const o of["l","r"])V(`${o}Shoulder`,`${o}Elbow`,o0.upper),V(`${o}Elbow`,`${o}Wrist`,o0.fore),V(`${o}Hip`,`${o}Knee`,o0.thigh),V(`${o}Knee`,`${o}Ankle`,o0.shin);const W=z(n.lHip,n.rHip,.5),_=z(n.lShoulder,n.rShoulder,.5),O=B(k(_,W));for(const o of["lElbow","rElbow","lWrist","rWrist"]){const m=k(n[o],W),l=r0(m,s)/O,f=Math.abs(r0(m,M));if(l>-.2&&l<1.05&&f<s0*e*.85){const u=o.endsWith("Wrist")?.092:.04;n[o][2]=Math.max(n[o][2],W[2]+e*u)}}const H=o=>z(W,_,o),p=T(k(n.head,n.neck)),P=T(X(p,I)),v=(o,m,l,f,u=[0,0,1],d=.02)=>({kind:0,a:o,b:m,ra:l*e,rb:f*e,m:u,k:d*e}),x=(o,m,l,f=[0,0,1],u=.03)=>({kind:1,c:o,r:a(m,e),ax:l,m:f,k:u*e}),U=[S,s,Z],b=o=>a(S,o==="l"?1:-1),D=c(n.neck,a(p,e*.05)),j=[x(c(W,a(s,e*.014)),[.086,.066,.058],U,[2,2,1],.045),x(H(.36),[.068,.085,.054],U,[2,1,.42],.05),x(H(.63),[.083,.105,.06],U,[1,1,1],.05),x(c(_,a(s,-e*.045)),[.084,.04,.05],U,[1,1,1],.045),v(c(n.neck,a(s,-e*.035)),D,.026,.024,[1,0,.3],.03)];for(const o of["l","r"]){const m=c(c(n[`${o}Shoulder`],a(s,-e*.012)),a(b(o),-e*.004));j.push(v(c(n.neck,a(s,-e*.006)),m,.024,.021,[1,1,1],.035))}const w=[P,p,T(X(P,p))],g=n.head,R=[x(c(g,a(p,e*.012)),[.044,.054,.053],w,[0,0,1],.02),x(c(c(g,a(p,-e*.022)),a(w[2],e*.01)),[.036,.04,.043],w,[0,0,1],.025),v(c(c(g,a(p,-e*.002)),a(w[2],e*.05)),c(c(g,a(p,-e*.016)),a(w[2],e*.058)),.005,.0075,[0,0,1],.008),x(c(c(g,a(P,e*.044)),a(p,e*.004)),[.006,.016,.011],w,[0,0,1],.006),x(c(c(g,a(P,-e*.044)),a(p,e*.004)),[.006,.016,.011],w,[0,0,1],.006),x(c(c(g,a(p,e*.022)),a(w[2],-e*.008)),[.047,.05,.052],w,[4,4,1],.008)],q=o=>{const m=n[`${o}Shoulder`],l=n[`${o}Elbow`],f=n[`${o}Wrist`],u=c(m,a(s,-e*.022)),d=T(k(f,l)),L=T(X(d,I)),K=B(L)>.1?L:S,Y=T(X(K,d)),l0=[K,d,Y],t0=c(f,a(d,e*.032));return[v(u,l,.027,.022,[1,0,.36],.018),v(l,z(l,f,.4),.025,.024,[0,0,1],.015),v(z(l,f,.4),f,.024,.0165,[0,0,1],.015),x(t0,[.011,.03,.026],l0,[0,0,1],.01),x(c(t0,a(d,e*.038)),[.009,.028,.022],l0,[0,0,1],.012),v(c(t0,a(Y,e*.016)),c(c(t0,a(Y,e*.03)),a(d,e*.024)),.008,.0065,[0,0,1],.008)]},F=o=>{const m=n[`${o}Hip`],l=n[`${o}Knee`],f=n[`${o}Ankle`],u=c(f,a(T(k(l,f)),e*.04)),d=T(c(c(a(I,.9),a(b(o),.28)),a(s,-.12))),L=c(c(f,a(s,-e*.018)),a(I,-e*.02)),K=c(L,a(d,e*.105)),Y=T(X(s,d));return[v(c(c(m,a(s,e*.012)),a(b(o),-e*.012)),l,.047,.035,[2,2,1],.02),v(l,u,.036,.029,[2,2,1],.018),v(u,f,.0185,.017,[0,0,1],.008),x(z(L,K,.5),[.029,.018,.056],[Y,s,d],[3,3,1],.012),v(c(L,a(s,-e*.006)),c(K,a(s,-e*.006)),.017,.014,[3,3,1],.01)]},A=o=>[c(c(n[`${o}Shoulder`],a(s,-e*.03)),a(b(o),e*.012)),e*.1,e*.035];return{groups:{torso:j,head:R,armL:q("l"),armR:q("r"),legL:F("l"),legR:F("r")},anchors:{head:[D,e*.07,e*.02],armL:A("l"),armR:A("r"),legL:[c(n.lHip,a(s,e*.02)),e*.1,e*.035],legR:[c(n.rHip,a(s,e*.02)),e*.1,e*.035]},u:e}}const h0=`#version 300 es
in vec2 pos; out vec2 uv;
void main() { uv = pos * 0.5 + 0.5; gl_Position = vec4(pos, 0.0, 1.0); }`,u0=`#version 300 es
precision highp float;
in vec2 uv; out vec4 outColor;
uniform highp sampler2D PR; // ${J} texels per primitive, see upload()
uniform vec4 ANC[${$*5}]; // head, armL, armR, legL, legR: anchor xyz + reach
uniform float ANK[${$*5}]; // max blend at the anchor
uniform float US[${$}];
uniform vec3 COL[${$*e0}];
uniform vec3 SHINE;
uniform int nFig;
uniform vec4 VIEW; // world rect: x0, y0 (bottom), w, h
uniform vec4 box;  // world-space bounds of all figures

vec4 T(int i, int c) { return texelFetch(PR, ivec2(c, i), 0); }
float smin(float a, float b, float k) {
  if (k <= 0.0) return min(a, b);
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}
float roundCone(vec3 p, vec3 a, vec3 b, float r1, float r2) {
  vec3 ba = b - a; float l2 = dot(ba, ba); float rr = r1 - r2; float a2 = l2 - rr * rr; float il2 = 1.0 / l2;
  vec3 pa = p - a; float y = dot(pa, ba); float z = y - l2;
  vec3 xv = pa * l2 - ba * y; float x2 = dot(xv, xv); float y2 = y * y * l2; float z2 = z * z * l2;
  float k = sign(rr) * rr * rr * x2;
  if (sign(z) * a2 * z2 > k) return sqrt(x2 + z2) * il2 - r2;
  if (sign(y) * a2 * y2 < k) return sqrt(x2 + y2) * il2 - r1;
  return (sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}
float ellipsoid(vec3 p, vec3 r) {
  float k0 = length(p / r);
  float k1 = length(p / (r * r));
  return k0 * (k0 - 1.0) / max(k1, 1e-6);
}
float prim(vec3 p, int i) {
  vec4 t0 = T(i, 0);
  if (t0.w < 0.0) return 1e5; // empty slot
  vec4 cb = T(i, 2);
  float dc = distance(p, cb.xyz) - cb.w;
  if (dc > cb.w * 0.5 + 4.0) return dc;
  vec4 t1 = T(i, 1);
  if (T(i, 3).w < 0.5) return roundCone(p, t0.xyz, t1.xyz, t0.w, t1.w);
  vec3 q = p - t0.xyz;
  vec3 lq = vec3(dot(q, T(i, 5).xyz), dot(q, T(i, 6).xyz), dot(q, T(i, 7).xyz));
  return ellipsoid(lq, t1.xyz);
}
float grp(vec3 p, int o, int a, int b) {
  float d = 1e5;
  for (int i = a; i < b; i++) d = smin(d, prim(p, o + i), T(o + i, 4).x);
  return d;
}
// melt a limb group into the body only near its joint
float attach(float body, float part, vec3 p, int ai) {
  float r = ANC[ai].w;
  float k = ANK[ai] * (1.0 - smoothstep(r * 0.35, r, distance(p, ANC[ai].xyz)));
  return smin(body, part, max(k, 0.0));
}
float figure(vec3 p, int f) {
  int o = f * ${Q};
  float d = grp(p, o, ${E.torso[0]}, ${E.torso[1]});
  d = attach(d, grp(p, o, ${E.head[0]}, ${E.head[1]}), p, f * 5 + 0);
  d = attach(d, grp(p, o, ${E.legL[0]}, ${E.legL[1]}), p, f * 5 + 3);
  d = attach(d, grp(p, o, ${E.legR[0]}, ${E.legR[1]}), p, f * 5 + 4);
  d = attach(d, grp(p, o, ${E.armL[0]}, ${E.armL[1]}), p, f * 5 + 1);
  d = attach(d, grp(p, o, ${E.armR[0]}, ${E.armR[1]}), p, f * 5 + 2);
  return d;
}
float scene(vec3 p) {
  float d = figure(p, 0);
  if (nFig > 1) d = min(d, figure(p, 1));
  return d;
}
int matAt(vec3 p, out int fig) {
  float best = 1e5; int mat = 0; fig = 0;
  for (int f = 0; f < ${$}; f++) {
    if (f >= nFig) break;
    for (int i = 0; i < ${Q}; i++) {
      int k = f * ${Q} + i;
      float d = prim(p, k);
      if (d < best) {
        best = d; fig = f;
        vec4 m = T(k, 3);
        float t;
        if (m.w < 0.5) {
          vec3 a = T(k, 0).xyz, b = T(k, 1).xyz;
          t = clamp(dot(p - a, b - a) / max(dot(b - a, b - a), 1e-4), 0.0, 1.0);
        } else {
          // ellipsoids: 0 at the bottom of the local Y axis, 1 at the top
          vec3 q = p - T(k, 0).xyz;
          t = clamp(0.5 + 0.5 * dot(q, T(k, 6).xyz) / T(k, 1).y, 0.0, 1.0);
        }
        mat = int(t < m.z ? m.x : m.y);
      }
    }
  }
  return mat;
}
vec3 normalAt(vec3 p, float e) {
  vec2 h = vec2(e, -e);
  return normalize(h.xyy * scene(p + h.xyy) + h.yyx * scene(p + h.yyx) + h.yxy * scene(p + h.yxy) + h.xxx * scene(p + h.xxx));
}
float ao(vec3 p, vec3 n, float u) {
  float o = 0.0, w = 1.0;
  for (int i = 1; i <= 6; i++) {
    float h = u * 0.014 * float(i);
    o += w * (h - scene(p + n * h));
    w *= 0.7;
  }
  return clamp(1.0 - o / (u * 0.045), 0.0, 1.0);
}
float softShadow(vec3 p, vec3 l, float u) {
  float res = 1.0, t = u * 0.012;
  for (int i = 0; i < 28; i++) {
    float h = scene(p + l * t);
    res = min(res, 10.0 * h / t);
    t += clamp(h, u * 0.004, u * 0.05);
    if (res < 0.02 || t > u * 0.6) break;
  }
  return clamp(res, 0.0, 1.0);
}
void main() {
  vec2 xy = VIEW.xy + uv * VIEW.zw;
  if (xy.x < box.x || xy.x > box.z || xy.y < box.y || xy.y > box.w) { outColor = vec4(0.0); return; }
  float u = US[0];
  float zTop = u * 0.8; float t = 0.0; bool hit = false; vec3 p;
  float eps = u * 0.0003;
  for (int i = 0; i < 200; i++) {
    p = vec3(xy, zTop - t);
    float d = scene(p);
    if (d < eps) { hit = true; break; }
    t += max(d * 0.8, eps * 0.5);
    if (t > u * 1.8) break;
  }
  if (!hit) { outColor = vec4(0.0); return; }
  vec3 n = normalAt(p, u * 0.0012);
  int fig;
  int mat = matAt(p, fig);
  vec3 base = COL[fig * ${e0} + mat];
  float fabric = (mat == 1 || mat == 2) ? 1.0 : 0.0;
  vec3 L1 = normalize(vec3(-0.5, 0.62, 0.6));   // soft key, upper left
  vec3 L2 = normalize(vec3(0.7, 0.1, 0.55));    // broad fill, right
  vec3 L3 = normalize(vec3(0.3, 0.5, -0.8));    // gentle rim
  float wrap = mat == 0 ? 0.55 : 0.45;
  float d1 = max((dot(n, L1) + wrap) / (1.0 + wrap), 0.0);
  float d2 = max((dot(n, L2) + wrap) / (1.0 + wrap), 0.0);
  float sh = mix(0.35, 1.0, softShadow(p + n * u * 0.004, L1, u));
  float occ = ao(p, n, u);
  float sky = 0.5 + 0.5 * n.y;
  vec3 amb = mix(vec3(0.62, 0.55, 0.53), vec3(0.95, 0.95, 1.0), sky);
  vec3 col = base * (0.34 * amb + 0.72 * d1 * sh * vec3(1.0, 0.97, 0.93) + 0.2 * d2 * vec3(0.95, 0.96, 1.0)) * (0.5 + 0.5 * occ);
  // matte: only a broad, faint sheen
  float spec = pow(max(dot(n, normalize(L1 + vec3(0.0, 0.0, 1.0))), 0.0), 14.0) * (mat == 0 ? SHINE.x : (mat == 3 ? SHINE.z : SHINE.y)) * sh;
  float rim = pow(1.0 - max(n.z, 0.0), 3.0) * 0.16 * max(dot(n, L3) + 0.5, 0.0);
  col += vec3(spec) + base * rim * (1.0 + fabric);
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  outColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}`,n0=r=>r<=.04045?r/12.92:((r+.055)/1.055)**2.4,h=r=>[n0((r>>16&255)/255),n0((r>>8&255)/255),n0((r&255)/255)],d0={porcelain:[[h(14199703),h(15789028),h(6036008),h(2890778),h(3877412)],[h(13211263),h(3025451),h(13483950),h(15657700),h(2037783)]],ghost:[[h(16777215),h(15856115),h(13619672),h(10790574),h(14277343)],[h(16774126),h(14342105),h(16052459),h(16777215),h(13815246)]]};let a0=null,c0=null,i0=null;const f0=new Map;function p0(){if(a0&&c0)return a0;const t=document.createElement("canvas").getContext("webgl2",{premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1});if(!t)throw new Error("WebGL2 unavailable");const n=(s,M)=>{const i=t.createShader(s);if(t.shaderSource(i,M),t.compileShader(i),!t.getShaderParameter(i,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(i)??"shader");return i},y=t.createProgram();if(t.attachShader(y,n(t.VERTEX_SHADER,h0)),t.attachShader(y,n(t.FRAGMENT_SHADER,u0)),t.linkProgram(y),!t.getProgramParameter(y,t.LINK_STATUS))throw new Error(t.getProgramInfoLog(y)??"link");t.useProgram(y);const e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);const N=t.getAttribLocation(y,"pos");return t.enableVertexAttribArray(N),t.vertexAttribPointer(N,2,t.FLOAT,!1,0,0),i0=t.createTexture(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,i0),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),a0=t,c0=y,t}function x0(r){return r.kind===0?[z(r.a,r.b,.5),B(k(r.b,r.a))/2+Math.max(r.ra,r.rb)]:[r.c,Math.max(...r.r)]}function v0(r,t,n,y="image/png",e,N="scene"){const s=`${t}|${n}|${y}|${N}|${JSON.stringify(r)}`,M=f0.get(s);if(M)return M;const i=p0(),C=Math.min(r.length,$),I=Q*$,S=new Float32Array(I*J*4);for(let g=0;g<I;g++)S[g*J*4+3]=-1;const Z=new Float32Array($*5*4),G=new Float32Array($*5),V=new Float32Array($),W=new Float32Array($*e0*3);let _=1/0,O=1/0,H=-1/0,p=-1/0;r.slice(0,C).forEach((g,R)=>{const q=R%2,F=m0(g,(R-(C-1))*.22);V[R]=F.u,W.set(d0[t][q].flat(),R*e0*3),Object.keys(E).forEach(A=>{const[o,m]=E[A];F.groups[A].slice(0,m-o).forEach((l,f)=>{const u=(R*Q+o+f)*J*4,[d,L]=x0(l);l.kind===0?S.set([...l.a,l.ra,...l.b,l.rb],u):(S.set([...l.c,0,...l.r,0],u),S.set([...l.ax[0],0,...l.ax[1],0,...l.ax[2],0],u+20)),S.set([...d,L,l.m[0],l.m[1],l.m[2],l.kind,l.k,0,0,0],u+8),_=Math.min(_,d[0]-L),H=Math.max(H,d[0]+L),O=Math.min(O,d[1]-L),p=Math.max(p,d[1]+L)})}),["head","armL","armR","legL","legR"].forEach((A,o)=>{const[m,l,f]=F.anchors[A];Z.set([...m,l],(R*5+o)*4),G[R*5+o]=f})});let P=[0,-400,300,400];if(N==="card"){const g=(H-_)*.94,R=(p-O)*.95,q=(_+H)/2,F=(O+p)/2;let A=R/.8,o=A*300/400;g>o*.86&&(o=g/.86,A=o*400/300),P=[q-o/2,F-A/2,o,A]}const v=Math.round(n),x=Math.round(n*400/300),U=i.canvas;U.width=v*2,U.height=x*2,i.viewport(0,0,v*2,x*2);const b=c0;i.bindTexture(i.TEXTURE_2D,i0),i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,J,I,0,i.RGBA,i.FLOAT,S),i.uniform1i(i.getUniformLocation(b,"PR"),0),i.uniform4fv(i.getUniformLocation(b,"ANC"),Z),i.uniform1fv(i.getUniformLocation(b,"ANK"),G),i.uniform1fv(i.getUniformLocation(b,"US"),V),i.uniform3fv(i.getUniformLocation(b,"COL"),W),i.uniform3fv(i.getUniformLocation(b,"SHINE"),t==="ghost"?[.03,0,.03]:[.06,.015,.08]),i.uniform1i(i.getUniformLocation(b,"nFig"),C),i.uniform4fv(i.getUniformLocation(b,"VIEW"),P),i.uniform4fv(i.getUniformLocation(b,"box"),[_,O,H,p]),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_STRIP,0,4);const D=document.createElement("canvas");D.width=v,D.height=x;const j=D.getContext("2d");j.imageSmoothingQuality="high",j.drawImage(U,0,0,v,x);const w=D.toDataURL(y,e);return f0.set(s,w),w}export{m0 as build,v0 as renderSculpt};
