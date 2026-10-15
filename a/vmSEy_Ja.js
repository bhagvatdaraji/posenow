const X={upper:.165,fore:.15,thigh:.245,shin:.245},i=(a,t)=>[a[0]+t[0],a[1]+t[1],a[2]+t[2]],A=(a,t)=>[a[0]-t[0],a[1]-t[1],a[2]-t[2]],n=(a,t)=>[a[0]*t,a[1]*t,a[2]*t],$=a=>Math.hypot(a[0],a[1],a[2]),F=a=>n(a,1/($(a)||1)),S=(a,t,p)=>i(a,n(A(t,a),p));function j(a,t=0,p=0){const e=Object.fromEntries(Object.keys(a).map(r=>[r,[a[r][0]*300,-a[r][1]*400,0]])),T=S(e.lHip,e.rHip,.5),y=S(e.lShoulder,e.rShoulder,.5),o=$(A(e.neck,T))/.3;for(const r of Object.keys(e))e[r][2]+=p*o;T[2]+=p*o,y[2]+=p*o;const c=(r,m,l)=>{const h=l*o,x=Math.hypot(e[m][0]-e[r][0],e[m][1]-e[r][1]);e[m][2]=e[r][2]+Math.sqrt(Math.max(0,h*h-x*x))*.9};for(const r of["l","r"])c(`${r}Shoulder`,`${r}Elbow`,X.upper),c(`${r}Elbow`,`${r}Wrist`,X.fore),c(`${r}Hip`,`${r}Knee`,X.thigh),c(`${r}Knee`,`${r}Ankle`,X.shin);const u=F(A(y,T)),g=[u[1],-u[0],0],k=$(A(e.lShoulder,e.rShoulder))/2,H=$(A(y,T)),O=Math.max(k*.5,o*.06);for(const r of["lElbow","rElbow","lWrist","rWrist"]){const m=A(e[r],T),l=(m[0]*u[0]+m[1]*u[1])/H,h=Math.abs(m[0]*g[0]+m[1]*g[1]);l>-.15&&l<1.05&&h<k*.9&&(e[r][2]=Math.max(e[r][2],O+o*.04+p*o))}const w=r=>S(T,y,r),b=F(A(e.head,e.neck)),E=[0,0,1],f=(r,m,l,h,x=1,I=[0,0,1],s=.026)=>({a:r,b:m,ra:l*o,rb:h*o,zs:x,m:I,k:s*o}),L=r=>n(g,r==="l"?1:-1),R=(r,m,l)=>{const h=F(i(i(n(E,.85),n(L(r),.32)),n(u,-.18))),x=i(i(l,n(F(A(l,m)),o*.016)),n(E,-o*.012));return f(x,i(x,n(h,o*.095)),.03,.027,.78,[3,3,1],.012)},_=r=>{const m=e[`${r}Hip`],l=e[`${r}Knee`],h=e[`${r}Ankle`],x=S(m,l,.45);return[f(m,x,.06,.054,1,[2,2,1]),f(x,l,.054,.043,1,[2,2,1]),f(l,h,.044,.036,1,[2,2,1]),R(r,l,h)]},v=e.head,M=i(v,n(b,o*.022)),D=i(i(v,n(b,-o*.034)),n(E,o*.012)),U=[f(e.lHip,e.rHip,.058,.058,.78,[2,2,1],.03),f(w(.04),w(.42),.078,.07,.64,[2,1,.3],.035),f(w(.4),w(.66),.072,.086,.6,[1,1,1],.035),f(i(S(e.lShoulder,y,.55),n(u,-o*.055)),i(S(e.rShoulder,y,.55),n(u,-o*.055)),.056,.056,.55,[1,1,1],.035),f(i(e.neck,n(u,-o*.03)),i(e.lShoulder,n(u,-o*.01)),.026,.03,.7,[1,1,1],.03),f(i(e.neck,n(u,-o*.03)),i(e.rShoulder,n(u,-o*.01)),.026,.03,.7,[1,1,1],.03),f(i(e.neck,n(u,-o*.035)),i(e.neck,n(b,o*.05)),.027,.025,1,[t?1:0,0,.32],.02),f(i(v,n(b,o*.004)),M,.046,.047,.95,[0,0,1],.008),f(v,D,.041,.028,.92,[0,0,1],.012),f(i(i(v,n(b,-o*.006)),n(E,o*.04)),i(i(v,n(b,-o*.016)),n(E,o*.047)),.007,.009,1,[0,0,1],.006),f(i(i(v,n(g,o*.044)),n(b,o*.006)),i(i(v,n(g,o*.046)),n(b,-o*.012)),.01,.008,.45,[0,0,1],.005),f(i(i(v,n(g,-o*.044)),n(b,o*.006)),i(i(v,n(g,-o*.046)),n(b,-o*.012)),.01,.008,.45,[0,0,1],.005),f(i(i(v,n(b,o*.016)),n(E,-o*.012)),i(i(M,n(b,o*.012)),n(E,-o*.004)),.049,.049,.95,[4,4,1],.006),..._("l"),..._("r")],W=r=>{const m=e[`${r}Shoulder`],l=e[`${r}Elbow`],h=e[`${r}Wrist`],x=F(A(h,l)),I=S(m,l,.45),s=S(l,h,.3),B=i(i(m,n(L(r),o*.01)),n(u,-o*.01));return[f(B,S(m,l,.3),.034,.033,1,[1,1,1],.02),f(m,I,.039,.037,1,[1,1,1],.02),f(I,l,.037,.029,1,t?[1,1,1]:[1,0,.25],.02),f(l,s,.03,.031,1,t?[1,1,1]:[0,0,1],.018),f(s,h,.031,.02,1,t?[1,0,.8]:[0,0,1],.018),f(i(h,n(x,o*.014)),i(h,n(x,o*.068)),.022,.019,.55,[0,0,1],.012)]};return{body:U,armL:W("l"),armR:W("r"),shL:e.lShoulder,shR:e.rShoulder,u:o}}const K=`#version 300 es
in vec2 pos; out vec2 uv;
void main() { uv = pos * 0.5 + 0.5; gl_Position = vec4(pos, 0.0, 1.0); }`,J=`#version 300 es
precision highp float;
in vec2 uv; out vec4 outColor;
// one row per primitive: [a.xyz, ra] [b.xyz, rb] [bound centre, bound radius] [matA, matB, split, zs] [k]
uniform highp sampler2D PR;
uniform vec4 SH[4]; // shoulder xyz + figure scale u
uniform vec3 COL[10]; // per figure: skin, top, bottoms, shoes, hair
uniform vec3 SHINE; // gloss for skin, fabric, shoes
uniform int nFig;
uniform vec4 box; // x0, y0, x1, y1 in view units

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
vec4 T(int i, int c) { return texelFetch(PR, ivec2(c, i), 0); }
float prim(vec3 p, int i) {
  vec4 a = T(i, 0);
  if (a.w <= 0.0) return 1e5;
  // far from this part: the bounding-sphere distance is a safe lower bound
  vec4 cb = T(i, 2);
  float dc = distance(p, cb.xyz) - cb.w;
  if (dc > cb.w * 0.6 + 6.0) return dc;
  vec4 b = T(i, 1);
  float zs = T(i, 3).w;
  float cz = 0.5 * (a.z + b.z);
  vec3 q = vec3(p.xy, cz + (p.z - cz) / zs);
  vec3 a3 = vec3(a.xy, cz + (a.z - cz) / zs), b3 = vec3(b.xy, cz + (b.z - cz) / zs);
  return roundCone(q, a3, b3, a.w, b.w) * min(zs, 1.0);
}
float figure(vec3 p, int f) {
  int o = f * 34;
  float u = SH[f * 2].w;
  float body = 1e5, al = 1e5, ar = 1e5;
  for (int i = 0; i < 22; i++) body = smin(body, prim(p, o + i), T(o + i, 4).x);
  for (int i = 22; i < 28; i++) al = smin(al, prim(p, o + i), T(o + i, 4).x);
  for (int i = 28; i < 34; i++) ar = smin(ar, prim(p, o + i), T(o + i, 4).x);
  // arms melt into the body only near their own shoulder
  float kl = mix(u * 0.045, u * 0.004, smoothstep(u * 0.05, u * 0.14, distance(p, SH[f * 2].xyz)));
  float kr = mix(u * 0.045, u * 0.004, smoothstep(u * 0.05, u * 0.14, distance(p, SH[f * 2 + 1].xyz)));
  return smin(smin(body, al, kl), ar, kr);
}
float scene(vec3 p) {
  float d = figure(p, 0);
  if (nFig > 1) d = min(d, figure(p, 1));
  return d;
}
// material of the nearest primitive at a surface point (clean hem lines)
int matAt(vec3 p, out int fig) {
  float best = 1e5; int mat = 0; fig = 0;
  for (int f = 0; f < 2; f++) {
    if (f >= nFig) break;
    for (int i = 0; i < 34; i++) {
      int k = f * 34 + i;
      float d = prim(p, k);
      if (d < best) {
        best = d; fig = f;
        vec3 a = T(k, 0).xyz, b = T(k, 1).xyz;
        vec4 m = T(k, 3);
        float t = clamp(dot(p - a, b - a) / max(dot(b - a, b - a), 1e-4), 0.0, 1.0);
        mat = int(t < m.z ? m.x : m.y);
      }
    }
  }
  return mat;
}
vec3 normalAt(vec3 p) {
  const vec2 e = vec2(0.35, -0.35);
  return normalize(e.xyy * scene(p + e.xyy) + e.yyx * scene(p + e.yyx) + e.yxy * scene(p + e.yxy) + e.xxx * scene(p + e.xxx));
}
float ao(vec3 p, vec3 n, float u) {
  float o = 0.0, w = 1.0;
  for (int i = 1; i <= 5; i++) {
    float h = u * 0.012 * float(i);
    o += w * (h - scene(p + n * h));
    w *= 0.6;
  }
  return clamp(1.0 - o / (u * 0.03), 0.0, 1.0);
}
void main() {
  vec2 xy = vec2(uv.x * 300.0, (uv.y - 1.0) * 400.0);
  if (xy.x < box.x || xy.x > box.z || xy.y < box.y || xy.y > box.w) { outColor = vec4(0.0); return; }
  float u = SH[0].w;
  float t = 0.0; float zTop = u * 0.6; bool hit = false; vec3 p;
  for (int i = 0; i < 140; i++) {
    p = vec3(xy, zTop - t);
    float d = scene(p);
    if (d < 0.08) { hit = true; break; }
    t += max(d * 0.85, 0.05);
    if (t > u * 1.4) break;
  }
  if (!hit) { outColor = vec4(0.0); return; }
  vec3 n = normalAt(p);
  int fig;
  int mat = matAt(p, fig);
  vec3 base = COL[fig * 5 + mat];
  float gloss = mat == 0 ? SHINE.x : (mat == 3 ? SHINE.z : (mat == 4 ? SHINE.y * 3.0 : SHINE.y));
  float fabric = mat == 1 || mat == 2 || mat == 4 ? 1.0 : 0.0;
  vec3 v = vec3(0.0, 0.0, 1.0);
  vec3 L1 = normalize(vec3(-0.45, 0.6, 0.66)), L2 = normalize(vec3(0.65, 0.05, 0.55)), L3 = normalize(vec3(0.55, 0.45, -0.7));
  float w = 0.4;
  float d1 = max((dot(n, L1) + w) / (1.0 + w), 0.0), d2 = max((dot(n, L2) + w) / (1.0 + w), 0.0);
  float occ = ao(p, n, u);
  float sky = 0.5 + 0.5 * n.y;
  vec3 col = base * (0.30 * mix(vec3(0.82, 0.7, 0.68), vec3(1.0), sky) + 0.78 * d1 * vec3(1.0, 0.97, 0.94) + 0.22 * d2 * vec3(1.0, 0.92, 0.9)) * (0.55 + 0.45 * occ);
  float spec = pow(max(dot(n, normalize(L1 + v)), 0.0), 60.0) * gloss;
  float rim = pow(1.0 - max(n.z, 0.0), 3.0) * 0.35 * max(dot(n, L3) + 0.4, 0.0);
  // fabric: soft sheen at grazing angles instead of a hard highlight
  float sheen = fabric * pow(1.0 - max(n.z, 0.0), 2.0) * 0.18;
  col += vec3(spec) + vec3(rim) * (1.0 - 0.5 * fabric) + base * sheen;
  col *= 0.95;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14); // ACES fit: keeps colour, rolls off highlights
  outColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}`,C=a=>a<=.04045?a/12.92:((a+.055)/1.055)**2.4,d=a=>[C((a>>16&255)/255),C((a>>8&255)/255),C((a&255)/255)],Q={porcelain:[[d(14262414),d(15853788),d(5904166),d(2757656),d(3810848)],[d(13209468),d(2827815),d(13154726),d(15854822),d(1971990)]],ghost:[[d(16777215),d(15658736),d(13224914),d(10132644),d(13816792)],[d(16773612),d(14144726),d(15986666),d(16777215),d(13617867)]]};let G=null,N=null,P=null;const V=new Map;function Z(){if(G&&N)return G;const t=document.createElement("canvas").getContext("webgl2",{premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1});if(!t)throw new Error("WebGL2 unavailable");const p=(o,c)=>{const u=t.createShader(o);if(t.shaderSource(u,c),t.compileShader(u),!t.getShaderParameter(u,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(u)??"shader");return u},e=t.createProgram();if(t.attachShader(e,p(t.VERTEX_SHADER,K)),t.attachShader(e,p(t.FRAGMENT_SHADER,J)),t.linkProgram(e),!t.getProgramParameter(e,t.LINK_STATUS))throw new Error(t.getProgramInfoLog(e)??"link");t.useProgram(e);const T=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,T),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);const y=t.getAttribLocation(e,"pos");return t.enableVertexAttribArray(y),t.vertexAttribPointer(y,2,t.FLOAT,!1,0,0),P=t.createTexture(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,P),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),G=t,N=e,t}function t0(a,t,p,e="image/png",T){const y=`${t}|${p}|${e}|${JSON.stringify(a)}`,o=V.get(y);if(o)return o;const c=Z(),u=68,g=5,k=new Float32Array(u*g*4),H=new Float32Array(16),O=new Float32Array(30);let w=300,b=0,E=0,f=-400;a.slice(0,2).forEach((W,r)=>{const m=r%2,l=j(W,m,(r-(Math.min(a.length,2)-1))*.2);O.set(Q[t][m].flat(),r*5*3);const h=(x,I)=>x.forEach((s,B)=>{const Y=r*34+I+B,q=S(s.a,s.b,.5);k.set([...s.a,s.ra,...s.b,s.rb,...q,$(A(s.b,s.a))/2+Math.max(s.ra,s.rb),s.m[0],s.m[1],s.m[2],s.zs,s.k,0,0,0],Y*g*4);const z=Math.max(s.ra,s.rb)*1.3;w=Math.min(w,s.a[0]-z,s.b[0]-z),E=Math.max(E,s.a[0]+z,s.b[0]+z),f=Math.max(f,s.a[1]+z,s.b[1]+z),b=Math.min(b,s.a[1]-z,s.b[1]-z)});h(l.body,0),h(l.armL,22),h(l.armR,28),H.set([...l.shL,l.u,...l.shR,l.u],r*8)});const L=Math.round(p),R=Math.round(p*400/300),_=c.canvas;_.width=L*2,_.height=R*2,c.viewport(0,0,L*2,R*2);const v=N;c.bindTexture(c.TEXTURE_2D,P),c.texImage2D(c.TEXTURE_2D,0,c.RGBA32F,g,u,0,c.RGBA,c.FLOAT,k),c.uniform1i(c.getUniformLocation(v,"PR"),0),c.uniform4fv(c.getUniformLocation(v,"SH"),H),c.uniform1i(c.getUniformLocation(v,"nFig"),Math.min(a.length,2)),c.uniform3fv(c.getUniformLocation(v,"COL"),O),c.uniform3fv(c.getUniformLocation(v,"SHINE"),t==="ghost"?[.1,.02,.1]:[.3,.03,.25]),c.uniform4fv(c.getUniformLocation(v,"box"),[w,b,E,f]),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),c.drawArrays(c.TRIANGLE_STRIP,0,4);const M=document.createElement("canvas");M.width=L,M.height=R;const D=M.getContext("2d");D.imageSmoothingQuality="high",D.drawImage(_,0,0,L,R);const U=M.toDataURL(e,T);return V.set(y,U),U}export{j as primitives,t0 as renderSculpt};
