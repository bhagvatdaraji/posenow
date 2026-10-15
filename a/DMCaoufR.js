const O={upper:.165,fore:.15,thigh:.245,shin:.245},h=(e,o)=>[e[0]+o[0],e[1]+o[1],e[2]+o[2]],x=(e,o)=>[e[0]-o[0],e[1]-o[1],e[2]-o[2]],v=(e,o)=>[e[0]*o,e[1]*o,e[2]*o],_=e=>Math.hypot(e[0],e[1],e[2]),R=e=>v(e,1/(_(e)||1)),M=(e,o,t)=>h(e,v(x(o,e),t));function Y(e,o=0){const t=Object.fromEntries(Object.keys(e).map(n=>[n,[e[n][0]*300,-e[n][1]*400,0]])),u=M(t.lHip,t.rHip,.5),A=M(t.lShoulder,t.rShoulder,.5),a=_(x(t.neck,u))/.3,g=(n,i,f)=>{const m=f*a,p=Math.hypot(t[i][0]-t[n][0],t[i][1]-t[n][1]);t[i][2]=t[n][2]+Math.sqrt(Math.max(0,m*m-p*p))*.9};for(const n of["l","r"])g(`${n}Shoulder`,`${n}Elbow`,O.upper),g(`${n}Elbow`,`${n}Wrist`,O.fore),g(`${n}Hip`,`${n}Knee`,O.thigh),g(`${n}Knee`,`${n}Ankle`,O.shin);const r=R(x(A,u)),d=[-r[1],r[0],0],E=_(x(t.lShoulder,t.rShoulder))/2,T=_(x(A,u)),$=Math.max(E*.5,a*.06);for(const n of["lElbow","rElbow","lWrist","rWrist"]){const i=x(t[n],u),f=(i[0]*r[0]+i[1]*r[1])/T,m=Math.abs(i[0]*d[0]+i[1]*d[1]);f>-.15&&f<1.05&&m<E*.9&&(t[n][2]=Math.max(t[n][2],$+a*.04))}const w=n=>M(u,A,n),y=R(x(t.head,t.neck)),l=(n,i,f,m,p=1,b=[0,0,1])=>({a:n,b:i,ra:f*a,rb:m*a,zs:p,m:b}),I=(n,i)=>{const f=R(x(i,n)),m=h(h(i,v(f,a*.02)),[0,0,a*.075]);return l(h(i,v(f,a*.012)),m,.032,.026,.75,[3,3,1])},k=[l(t.lHip,t.rHip,.064,.064,.8,[2,2,1]),l(w(.02),w(.45),.088,.077,.62,[2,1,.3]),l(w(.45),w(.8),.081,.102,.58,[1,1,1]),l(h(M(t.lShoulder,t.neck,.18),v(r,-a*.022)),h(M(t.rShoulder,t.neck,.18),v(r,-a*.022)),.038,.038,.62,[1,1,1]),l(h(t.neck,v(r,-a*.02)),h(t.neck,v(y,a*.06)),.03,.026,1,[o?1:0,0,.3]),l(h(t.head,v(y,-a*.012)),h(t.head,v(y,a*.03)),.044,.054,.9),l(h(h(t.head,v(y,a*.012)),[0,0,-a*.012]),h(h(t.head,v(y,a*.046)),[0,0,-a*.006]),.05,.055,.92,[4,4,1]),l(t.lHip,t.lKnee,.066,.046,1,[2,2,1]),l(t.lKnee,t.lAnkle,.046,.033,1,[2,2,1]),I(t.lKnee,t.lAnkle),l(t.rHip,t.rKnee,.066,.046,1,[2,2,1]),l(t.rKnee,t.rAnkle,.046,.033,1,[2,2,1]),I(t.rKnee,t.rAnkle)],z=n=>{const i=t[`${n}Shoulder`],f=t[`${n}Elbow`],m=t[`${n}Wrist`],p=R(x(m,f));return[l(h(i,v(r,-a*.012)),M(i,f,.35),.036,.034,1,[1,1,1]),l(i,f,.042,.031,1,o?[1,1,1]:[1,0,.55]),l(f,m,.031,.021,1,o?[1,0,.82]:[0,0,1]),l(h(m,v(p,a*.012)),h(m,v(p,a*.07)),.022,.018,.7)]};return{body:k,armL:z("l"),armR:z("r"),shL:t.lShoulder,shR:t.rShoulder,u:a}}const J=`#version 300 es
in vec2 pos; out vec2 uv;
void main() { uv = pos * 0.5 + 0.5; gl_Position = vec4(pos, 0.0, 1.0); }`,Q=`#version 300 es
precision highp float;
in vec2 uv; out vec4 outColor;
uniform vec4 A[48];
uniform vec4 B[48];
uniform float Z[48];
uniform vec4 C[48]; // bounding sphere per primitive, for cheap culling
uniform vec4 SH[4]; // shoulder xyz + figure scale u
uniform vec3 M[48]; // matA, matB, split
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
float prim(vec3 p, int i) {
  vec4 a = A[i], b = B[i];
  if (a.w <= 0.0) return 1e5;
  // far from this part: the bounding-sphere distance is a safe lower bound
  float dc = distance(p, C[i].xyz) - C[i].w;
  if (dc > C[i].w * 0.6 + 6.0) return dc;
  float zs = Z[i];
  float cz = 0.5 * (a.z + b.z);
  vec3 q = vec3(p.xy, cz + (p.z - cz) / zs);
  vec3 a3 = vec3(a.xy, cz + (a.z - cz) / zs), b3 = vec3(b.xy, cz + (b.z - cz) / zs);
  return roundCone(q, a3, b3, a.w, b.w) * min(zs, 1.0);
}
float figure(vec3 p, int f) {
  int o = f * 24;
  float u = SH[f * 2].w;
  float body = 1e5, al = 1e5, ar = 1e5;
  for (int i = 0; i < 14; i++) body = smin(body, prim(p, o + i), u * (i < 4 ? 0.035 : (i == 5 || i == 6 ? 0.01 : 0.026)));
  for (int i = 14; i < 19; i++) al = smin(al, prim(p, o + i), u * 0.025);
  for (int i = 19; i < 24; i++) ar = smin(ar, prim(p, o + i), u * 0.025);
  // arms melt into the body only near their own shoulder
  float kl = mix(u * 0.03, u * 0.004, smoothstep(u * 0.05, u * 0.14, distance(p, SH[f * 2].xyz)));
  float kr = mix(u * 0.03, u * 0.004, smoothstep(u * 0.05, u * 0.14, distance(p, SH[f * 2 + 1].xyz)));
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
    for (int i = 0; i < 24; i++) {
      int k = f * 24 + i;
      float d = prim(p, k);
      if (d < best) {
        best = d; fig = f;
        vec3 a = A[k].xyz, b = B[k].xyz;
        float t = clamp(dot(p - a, b - a) / max(dot(b - a, b - a), 1e-4), 0.0, 1.0);
        mat = int(t < M[k].z ? M[k].x : M[k].y);
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
}`,G=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,s=e=>[G((e>>16&255)/255),G((e>>8&255)/255),G((e&255)/255)],tt={porcelain:[[s(14262414),s(15853788),s(5904166),s(2757656),s(3810848)],[s(13209468),s(2827815),s(13154726),s(15854822),s(1971990)]],ghost:[[s(16777215),s(15658736),s(13224914),s(10132644),s(13816792)],[s(16773612),s(14144726),s(15986666),s(16777215),s(13617867)]]};let U=null,N=null;const V=new Map;function ot(){if(U&&N)return U;const o=document.createElement("canvas").getContext("webgl2",{premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1});if(!o)throw new Error("WebGL2 unavailable");const t=(g,r)=>{const d=o.createShader(g);if(o.shaderSource(d,r),o.compileShader(d),!o.getShaderParameter(d,o.COMPILE_STATUS))throw new Error(o.getShaderInfoLog(d)??"shader");return d},u=o.createProgram();if(o.attachShader(u,t(o.VERTEX_SHADER,J)),o.attachShader(u,t(o.FRAGMENT_SHADER,Q)),o.linkProgram(u),!o.getProgramParameter(u,o.LINK_STATUS))throw new Error(o.getProgramInfoLog(u)??"link");o.useProgram(u);const A=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,A),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),o.STATIC_DRAW);const a=o.getAttribLocation(u,"pos");return o.enableVertexAttribArray(a),o.vertexAttribPointer(a,2,o.FLOAT,!1,0,0),U=o,N=u,o}function et(e,o,t,u="image/png",A){const a=`${o}|${t}|${u}|${JSON.stringify(e)}`,g=V.get(a);if(g)return g;const r=ot(),d=48,E=new Float32Array(d*4),T=new Float32Array(d*4),$=new Float32Array(d).fill(1),w=new Float32Array(16),y=new Float32Array(d*4),l=new Float32Array(d*3),I=new Float32Array(30);let k=300,z=0,n=0,i=-400;e.slice(0,2).forEach((K,C)=>{const P=C%2,L=Y(K,P);I.set(tt[o][P].flat(),C*5*3);const W=(D,q)=>D.forEach((c,j)=>{const F=C*24+q+j;E.set([...c.a,c.ra],F*4),T.set([...c.b,c.rb],F*4),$[F]=c.zs,l.set(c.m,F*3);const Z=M(c.a,c.b,.5);y.set([...Z,_(x(c.b,c.a))/2+Math.max(c.ra,c.rb)],F*4);const S=Math.max(c.ra,c.rb)*1.3;k=Math.min(k,c.a[0]-S,c.b[0]-S),n=Math.max(n,c.a[0]+S,c.b[0]+S),i=Math.max(i,c.a[1]+S,c.b[1]+S),z=Math.min(z,c.a[1]-S,c.b[1]-S)});W(L.body,0),W(L.armL,14),W(L.armR,19),w.set([...L.shL,L.u,...L.shR,L.u],C*8)});const f=Math.round(t),m=Math.round(t*400/300),p=r.canvas;p.width=f*2,p.height=m*2,r.viewport(0,0,f*2,m*2);const b=N;r.uniform4fv(r.getUniformLocation(b,"A"),E),r.uniform4fv(r.getUniformLocation(b,"B"),T),r.uniform1fv(r.getUniformLocation(b,"Z"),$),r.uniform4fv(r.getUniformLocation(b,"C"),y),r.uniform4fv(r.getUniformLocation(b,"SH"),w),r.uniform1i(r.getUniformLocation(b,"nFig"),Math.min(e.length,2)),r.uniform3fv(r.getUniformLocation(b,"M"),l),r.uniform3fv(r.getUniformLocation(b,"COL"),I),r.uniform3fv(r.getUniformLocation(b,"SHINE"),o==="ghost"?[.1,.02,.1]:[.3,.03,.25]),r.uniform4fv(r.getUniformLocation(b,"box"),[k,z,n,i]),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.drawArrays(r.TRIANGLE_STRIP,0,4);const H=document.createElement("canvas");H.width=f,H.height=m;const X=H.getContext("2d");X.imageSmoothingQuality="high",X.drawImage(p,0,0,f,m);const B=H.toDataURL(u,A);return V.set(a,B),B}export{Y as primitives,et as renderSculpt};
