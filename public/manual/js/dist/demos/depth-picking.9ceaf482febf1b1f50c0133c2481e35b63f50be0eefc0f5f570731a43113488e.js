"use strict";(()=>{var Q=Math.pow;var m=(n=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(n,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):n)(function(n){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var Z=(n,e,t)=>new Promise((s,r)=>{var a=o=>{try{l(t.next(o))}catch(c){r(c)}},i=o=>{try{l(t.throw(o))}catch(c){r(c)}},l=o=>o.done?s(o.value):Promise.resolve(o.value).then(a,i);l((t=t.apply(n,e)).next())});var p=m("three");var f=m("three");var ee="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}";var D=m("three");var x="srgb",X="srgb-linear";var y={FULL:0,SINGLE:1};var te=Number(D.REVISION.replace(/\D+/g,"")),se=te>=152,Se=new Map([[D.LinearEncoding,X],[D.sRGBEncoding,x]]),Te=new Map([[X,D.LinearEncoding],[x,D.sRGBEncoding]]);function F(n){return n===null?null:se?n.outputColorSpace:Se.get(n.outputEncoding)}function _(n,e){n!==null&&(se?n.colorSpace=e:n.encoding=Te.get(e))}function re(n){return te<154?n.replace("colorspace_fragment","encodings_fragment"):n}var b=m("three");var ie=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
}`;var O=class extends b.ShaderMaterial{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new b.Uniform(null),opacity:new b.Uniform(1)},blending:b.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ie,vertexShader:ee}),this.fragmentShader=re(this.fragmentShader)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}};var w=m("three");var ne=`#include <packing>
varying vec2 vUv;
#ifdef NORMAL_DEPTH
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D normalDepthBuffer;
#else
uniform mediump sampler2D normalDepthBuffer;
#endif
float readDepth(const in vec2 uv){return texture2D(normalDepthBuffer,uv).a;}
#else
#if INPUT_DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if INPUT_DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
void main(){
#if INPUT_DEPTH_PACKING == OUTPUT_DEPTH_PACKING
gl_FragColor=texture2D(depthBuffer,vUv);
#else
float depth=readDepth(vUv);
#if OUTPUT_DEPTH_PACKING == 3201
gl_FragColor=(depth==1.0)?vec4(1.0):packDepthToRGBA(depth);
#else
gl_FragColor=vec4(vec3(depth),1.0);
#endif
#endif
}`;var ae=`varying vec2 vUv;
#if DEPTH_COPY_MODE == 1
uniform vec2 texelPosition;
#endif
void main(){
#if DEPTH_COPY_MODE == 1
vUv=texelPosition;
#else
vUv=position.xy*0.5+0.5;
#endif
gl_Position=vec4(position.xy,1.0,1.0);}`;var U=class extends w.ShaderMaterial{constructor(){super({name:"DepthCopyMaterial",defines:{INPUT_DEPTH_PACKING:"0",OUTPUT_DEPTH_PACKING:"0",DEPTH_COPY_MODE:"0"},uniforms:{depthBuffer:new w.Uniform(null),texelPosition:new w.Uniform(new w.Vector2)},blending:w.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ne,vertexShader:ae}),this.depthCopyMode=y.FULL}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}set inputDepthPacking(e){this.defines.INPUT_DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}get outputDepthPacking(){return Number(this.defines.OUTPUT_DEPTH_PACKING)}set outputDepthPacking(e){this.defines.OUTPUT_DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=w.BasicDepthPacking){this.depthBuffer=e,this.inputDepthPacking=t}getInputDepthPacking(){return Number(this.defines.INPUT_DEPTH_PACKING)}setInputDepthPacking(e){this.defines.INPUT_DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}getOutputDepthPacking(){return Number(this.defines.OUTPUT_DEPTH_PACKING)}setOutputDepthPacking(e){this.defines.OUTPUT_DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}get texelPosition(){return this.uniforms.texelPosition.value}getTexelPosition(){return this.uniforms.texelPosition.value}setTexelPosition(e){this.uniforms.texelPosition.value=e}get mode(){return this.depthCopyMode}set mode(e){this.depthCopyMode=e,this.defines.DEPTH_COPY_MODE=e.toFixed(0),this.needsUpdate=!0}getMode(){return this.mode}setMode(e){this.mode=e}};var E=m("three");var d=m("three"),Pe=new d.Camera,v=null;function Ce(){if(v===null){let n=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]);v=new d.BufferGeometry,v.setAttribute!==void 0?(v.setAttribute("position",new d.BufferAttribute(n,3)),v.setAttribute("uv",new d.BufferAttribute(e,2))):(v.addAttribute("position",new d.BufferAttribute(n,3)),v.addAttribute("uv",new d.BufferAttribute(e,2)))}return v}var g=class n{constructor(e="Pass",t=new d.Scene,s=Pe){this.name=e,this.renderer=null,this.scene=t,this.camera=s,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new d.Mesh(Ce(),e),t.frustumCulled=!1,this.scene===null&&(this.scene=new d.Scene),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=d.BasicDepthPacking){}render(e,t,s,r,a){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,s){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof d.WebGLRenderTarget||t instanceof d.Material||t instanceof d.Texture||t instanceof n)&&this[e].dispose()}}};var k=class extends g{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new O,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new E.WebGLRenderTarget(1,1,{minFilter:E.LinearFilter,magFilter:E.LinearFilter,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,s,r,a){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,s){s!==void 0&&(this.renderTarget.texture.type=s,s!==E.UnsignedByteType?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":F(e)===x&&_(this.renderTarget.texture,x))}};var N=class extends g{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(e,t,s,r,a){let i=e.state.buffers.stencil;i.setLocked(!1),i.setTest(!1)}};var le=m("three");var oe=new le.Color,R=class extends g{constructor(e=!0,t=!0,s=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=e,this.depth=t,this.stencil=s,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(e,t,s){this.color=e,this.depth=t,this.stencil=s}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(e){this.overrideClearColor=e}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(e){this.overrideClearAlpha=e}render(e,t,s,r,a){let i=this.overrideClearColor,l=this.overrideClearAlpha,o=e.getClearAlpha(),c=i!==null,h=l>=0;c?(e.getClearColor(oe),e.setClearColor(i,h?l:o)):h&&e.setClearAlpha(l),e.setRenderTarget(this.renderToScreen?null:t),e.clear(this.color,this.depth,this.stencil),c?e.setClearColor(oe,o):h&&e.setClearAlpha(o)}};var G=class extends g{constructor(e,t,s=null){super("RenderPass",e,t),this.needsSwap=!1,this.clearPass=new R,this.overrideMaterialManager=s===null?null:new I(s),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get renderToScreen(){return super.renderToScreen}set renderToScreen(e){super.renderToScreen=e,this.clearPass.renderToScreen=e}get overrideMaterial(){let e=this.overrideMaterialManager;return e!==null?e.material:null}set overrideMaterial(e){let t=this.overrideMaterialManager;e!==null?t!==null?t.setMaterial(e):this.overrideMaterialManager=new I(e):t!==null&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(e){this.overrideMaterial=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getSelection(){return this.selection}setSelection(e){this.selection=e}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(e){this.ignoreBackground=e}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(e){this.skipShadowMapUpdate=e}getClearPass(){return this.clearPass}render(e,t,s,r,a){let i=this.scene,l=this.camera,o=this.selection,c=l.layers.mask,h=i.background,M=e.shadowMap.autoUpdate,P=this.renderToScreen?null:t;o!==null&&l.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(e.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(i.background=null),this.clearPass.enabled&&this.clearPass.render(e,t),e.setRenderTarget(P),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(e,i,l):e.render(i,l),l.layers.mask=c,i.background=h,e.shadowMap.autoUpdate=M}};var A=m("three");var S=m("three");var z=class extends g{constructor({depthPacking:e=S.RGBADepthPacking}={}){super("DepthCopyPass");let t=new U;t.outputDepthPacking=e,this.fullscreenMaterial=t,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new S.WebGLRenderTarget(1,1,{type:e===S.RGBADepthPacking?S.UnsignedByteType:S.FloatType,minFilter:S.NearestFilter,magFilter:S.NearestFilter,depthBuffer:!1}),this.renderTarget.texture.name="DepthCopyPass.Target"}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}get depthPacking(){return this.fullscreenMaterial.outputDepthPacking}getDepthPacking(){return this.fullscreenMaterial.outputDepthPacking}setDepthTexture(e,t=S.BasicDepthPacking){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.inputDepthPacking=t}render(e,t,s,r,a){e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.renderTarget.setSize(e,t)}};var H=new Float32Array([255/256/Q(256,3),255/256/Q(256,2),255/256/256,255/256]);function Be(n){return(n[0]*H[0]+n[1]*H[1]+n[2]*H[2]+n[3]*H[3])/255}var K=class extends z{constructor({depthPacking:e=A.RGBADepthPacking,mode:t=y.SINGLE}={}){super({depthPacking:e}),this.name="DepthPickingPass",this.fullscreenMaterial.mode=t,this.pixelBuffer=e===A.RGBADepthPacking?new Uint8Array(4):new Float32Array(4),this.callback=null}readDepth(e){return this.fullscreenMaterial.texelPosition.set(e.x*.5+.5,e.y*.5+.5),new Promise(t=>{this.callback=t})}render(e,t,s,r,a){let i=this.fullscreenMaterial,l=i.mode;if(l===y.FULL&&super.render(e),this.callback!==null){let o=this.renderTarget,c=this.pixelBuffer,h=o.texture.type!==A.FloatType,M=0,P=0;if(l===y.SINGLE)super.render(e);else{let Y=i.texelPosition;M=Math.round(Y.x*o.width),P=Math.round(Y.y*o.height)}e.readRenderTargetPixels(o,M,P,1,1,c),this.callback(h?Be(c):c[0]),this.callback=null}}setSize(e,t){this.fullscreenMaterial.mode===y.FULL&&super.setSize(e,t)}};var V=class extends g{constructor(e,t){super("MaskPass",e,t),this.needsSwap=!1,this.clearPass=new R(!1,!1,!0),this.inverse=!1}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get inverted(){return this.inverse}set inverted(e){this.inverse=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(e){this.inverted=e}render(e,t,s,r,a){let i=e.getContext(),l=e.state.buffers,o=this.scene,c=this.camera,h=this.clearPass,M=this.inverted?0:1,P=1-M;l.color.setMask(!1),l.depth.setMask(!1),l.color.setLocked(!0),l.depth.setLocked(!0),l.stencil.setTest(!0),l.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),l.stencil.setFunc(i.ALWAYS,M,4294967295),l.stencil.setClear(P),l.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?h.render(e,null):(h.render(e,t),h.render(e,s))),this.renderToScreen?(e.setRenderTarget(null),e.render(o,c)):(e.setRenderTarget(t),e.render(o,c),e.setRenderTarget(s),e.render(o,c)),l.color.setLocked(!1),l.depth.setLocked(!1),l.stencil.setLocked(!1),l.stencil.setFunc(i.EQUAL,1,4294967295),l.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),l.stencil.setLocked(!0)}};var W=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(e){typeof document!="undefined"&&document.hidden!==void 0&&(e?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=e)}get delta(){return this._delta*.001}get fixedDelta(){return this._fixedDelta*.001}set fixedDelta(e){this._fixedDelta=e*1e3}get elapsed(){return this._elapsed*.001}update(e){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(e!==void 0?e:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}handleEvent(e){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}};var j=class{constructor(e=null,{depthBuffer:t=!0,stencilBuffer:s=!1,multisampling:r=0,frameBufferType:a}={}){this.renderer=null,this.inputBuffer=this.createBuffer(t,s,a,r),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new k,this.depthTexture=null,this.passes=[],this.timer=new W,this.autoRenderToScreen=!0,this.setRenderer(e)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(e){let t=this.inputBuffer,s=this.multisampling;s>0&&e>0?(this.inputBuffer.samples=e,this.outputBuffer.samples=e,this.inputBuffer.dispose(),this.outputBuffer.dispose()):s!==e&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(t.depthBuffer,t.stencilBuffer,t.texture.type,e),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(e){if(this.renderer=e,e!==null){let t=e.getSize(new f.Vector2),s=e.getContext().getContextAttributes().alpha,r=this.inputBuffer.texture.type;r===f.UnsignedByteType&&F(e)===x&&(_(this.inputBuffer.texture,x),_(this.outputBuffer.texture,x),this.inputBuffer.dispose(),this.outputBuffer.dispose()),e.autoClear=!1,this.setSize(t.width,t.height);for(let a of this.passes)a.initialize(e,s,r)}}replaceRenderer(e,t=!0){let s=this.renderer,r=s.domElement.parentNode;return this.setRenderer(e),t&&r!==null&&(r.removeChild(s.domElement),r.appendChild(e.domElement)),s}createDepthTexture(){let e=this.depthTexture=new f.DepthTexture;return this.inputBuffer.depthTexture=e,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(e.format=f.DepthStencilFormat,e.type=f.UnsignedInt248Type):e.type=f.UnsignedIntType,e}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(let e of this.passes)e.setDepthTexture(null)}}createBuffer(e,t,s,r){let a=this.renderer,i=a===null?new f.Vector2:a.getDrawingBufferSize(new f.Vector2),l={minFilter:f.LinearFilter,magFilter:f.LinearFilter,stencilBuffer:t,depthBuffer:e,type:s},o=new f.WebGLRenderTarget(i.width,i.height,l);return r>0&&(o.ignoreDepthForMultisampleCopy=!1,o.samples=r),s===f.UnsignedByteType&&F(a)===x&&_(o.texture,x),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(e){for(let t of this.passes)t.mainScene=e}setMainCamera(e){for(let t of this.passes)t.mainCamera=e}addPass(e,t){let s=this.passes,r=this.renderer,a=r.getDrawingBufferSize(new f.Vector2),i=r.getContext().getContextAttributes().alpha,l=this.inputBuffer.texture.type;if(e.setRenderer(r),e.setSize(a.width,a.height),e.initialize(r,i,l),this.autoRenderToScreen&&(s.length>0&&(s[s.length-1].renderToScreen=!1),e.renderToScreen&&(this.autoRenderToScreen=!1)),t!==void 0?s.splice(t,0,e):s.push(e),this.autoRenderToScreen&&(s[s.length-1].renderToScreen=!0),e.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){let o=this.createDepthTexture();for(e of s)e.setDepthTexture(o)}else e.setDepthTexture(this.depthTexture)}removePass(e){let t=this.passes,s=t.indexOf(e);if(s!==-1&&t.splice(s,1).length>0){if(this.depthTexture!==null){let i=(o,c)=>o||c.needsDepthTexture;t.reduce(i,!1)||(e.getDepthTexture()===this.depthTexture&&e.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&s===t.length&&(e.renderToScreen=!1,t.length>0&&(t[t.length-1].renderToScreen=!0))}}removeAllPasses(){let e=this.passes;this.deleteDepthTexture(),e.length>0&&(this.autoRenderToScreen&&(e[e.length-1].renderToScreen=!1),this.passes=[])}render(e){let t=this.renderer,s=this.copyPass,r=this.inputBuffer,a=this.outputBuffer,i=!1,l,o,c;e===void 0&&(this.timer.update(),e=this.timer.delta);for(let h of this.passes)h.enabled&&(h.render(t,r,a,e,i),h.needsSwap&&(i&&(s.renderToScreen=h.renderToScreen,l=t.getContext(),o=t.state.buffers.stencil,o.setFunc(l.NOTEQUAL,1,4294967295),s.render(t,r,a,e,i),o.setFunc(l.EQUAL,1,4294967295)),c=r,r=a,a=c),h instanceof V?i=!0:h instanceof N&&(i=!1))}setSize(e,t,s){let r=this.renderer,a=r.getSize(new f.Vector2);(e===void 0||t===void 0)&&(e=a.width,t=a.height),(a.width!==e||a.height!==t)&&r.setSize(e,t,s);let i=r.getDrawingBufferSize(new f.Vector2);this.inputBuffer.setSize(i.width,i.height),this.outputBuffer.setSize(i.width,i.height);for(let l of this.passes)l.setSize(i.width,i.height)}reset(){let e=this.timer.autoReset;this.dispose(),this.autoRenderToScreen=!0,this.timer.autoReset=e}dispose(){for(let e of this.passes)e.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose()}};var T=m("three"),$=!1,I=class{constructor(e=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(e),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let s;if(t.material.flatShading)switch(t.material.side){case T.DoubleSide:s=this.materialsFlatShadedDoubleSide;break;case T.BackSide:s=this.materialsFlatShadedBackSide;break;default:s=this.materialsFlatShaded;break}else switch(t.material.side){case T.DoubleSide:s=this.materialsDoubleSide;break;case T.BackSide:s=this.materialsBackSide;break;default:s=this.materials;break}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=s[2]:t.isInstancedMesh?t.material=s[1]:t.material=s[0],++this.meshCount}}}cloneMaterial(e){if(!(e instanceof T.ShaderMaterial))return e.clone();let t=e.uniforms,s=new Map;for(let a in t){let i=t[a].value;i.isRenderTargetTexture&&(t[a].value=null,s.set(a,i))}let r=e.clone();for(let a of s)t[a[0]].value=a[1],r.uniforms[a[0]].value=a[1];return r}setMaterial(e){if(this.disposeMaterials(),this.material=e,e!==null){let t=this.materials=[this.cloneMaterial(e),this.cloneMaterial(e),this.cloneMaterial(e)];for(let s of t)s.uniforms=Object.assign({},e.uniforms),s.side=T.FrontSide;t[2].skinning=!0,this.materialsBackSide=t.map(s=>{let r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.side=T.BackSide,r}),this.materialsDoubleSide=t.map(s=>{let r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.side=T.DoubleSide,r}),this.materialsFlatShaded=t.map(s=>{let r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r}),this.materialsFlatShadedBackSide=t.map(s=>{let r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=T.BackSide,r}),this.materialsFlatShadedDoubleSide=t.map(s=>{let r=this.cloneMaterial(s);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=T.DoubleSide,r})}}render(e,t,s){let r=e.shadowMap.enabled;if(e.shadowMap.enabled=!1,$){let a=this.originalMaterials;this.meshCount=0,t.traverse(this.replaceMaterial),e.render(t,s);for(let i of a)i[0].material=i[1];this.meshCount!==a.size&&a.clear()}else{let a=t.overrideMaterial;t.overrideMaterial=this.material,e.render(t,s),t.overrideMaterial=a}e.shadowMap.enabled=r}disposeMaterials(){if(this.material!==null){let e=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let t of e)t.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return $}static set workaroundEnabled(e){$=e}};var de=m("tweakpane"),q=m("spatial-controls");var De=Math.PI/180,ve=180/Math.PI;function ue(n,e=16/9){return Math.atan(Math.tan(n*De*.5)/e)*ve*2}var L=class{constructor(){this.fps="0",this.timestamp=0,this.acc=0,this.frames=0}update(e){++this.frames,this.acc+=e-this.timestamp,this.timestamp=e,this.acc>=1e3&&(this.fps=this.frames.toFixed(0),this.acc=0,this.frames=0)}};var u=m("three");function ce(){let n=new u.AmbientLight(5390108),e=new u.PointLight(16704176,1,3);e.position.set(0,.93,0),e.castShadow=!0,e.shadow.bias=-.035,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.radius=4;let t=new u.DirectionalLight(16711680,.05);t.position.set(-1,0,0),t.target.position.set(0,0,0);let s=new u.DirectionalLight(65280,.05);s.position.set(1,0,0),s.target.position.set(0,0,0);let r=new u.Group;return r.add(e,t,s,n),r}function he(){let n=new u.PlaneGeometry,e=new u.MeshStandardMaterial({color:16777215}),t=new u.Mesh(n,e),s=new u.Mesh(n,e),r=new u.Mesh(n,e),a=new u.Mesh(n,e),i=new u.Mesh(n,e);t.position.y=-1,t.rotation.x=Math.PI*.5,t.scale.set(2,2,1),s.position.y=-1,s.rotation.x=Math.PI*-.5,s.scale.set(2,2,1),s.receiveShadow=!0,r.position.y=1,r.rotation.x=Math.PI*.5,r.scale.set(2,2,1),r.receiveShadow=!0,a.position.z=-1,a.scale.set(2,2,1),a.receiveShadow=!0,i.position.z=1,i.rotation.y=Math.PI,i.scale.set(2,2,1),i.receiveShadow=!0;let l=new u.Mesh(n,new u.MeshStandardMaterial({color:16711680})),o=new u.Mesh(n,new u.MeshStandardMaterial({color:65280})),c=new u.Mesh(n,new u.MeshStandardMaterial({color:16777215,emissive:16777215}));l.position.x=-1,l.rotation.y=Math.PI*.5,l.scale.set(2,2,1),l.receiveShadow=!0,o.position.x=1,o.rotation.y=Math.PI*-.5,o.scale.set(2,2,1),o.receiveShadow=!0,c.position.y=1-.001,c.rotation.x=Math.PI*.5,c.scale.set(.4,.4,1);let h=new u.Group;return h.add(t,s,r,a,i,l,o,c),h}function fe(){let n=new u.MeshStandardMaterial({color:16777215}),e=new u.Mesh(new u.BoxGeometry(1,1,1),n),t=new u.Mesh(new u.BoxGeometry(1,1,1),n),s=new u.Mesh(new u.SphereGeometry(1,32,32),n);e.position.set(-.35,-.4,-.3),e.rotation.y=Math.PI*.1,e.scale.set(.6,1.2,.6),e.castShadow=!0,t.position.set(.35,-.7,.3),t.rotation.y=Math.PI*-.1,t.scale.set(.6,.6,.6),t.castShadow=!0,s.position.set(-.5,-.7,.6),s.scale.set(.3,.3,.3),s.castShadow=!0;let r=new u.Group;return r.add(e,t,s),r}function be(){let n=new Map,e=new p.LoadingManager,t=new p.CubeTextureLoader(e),s=document.baseURI+"img/textures/skies/sunset/",r=".png",a=[s+"px"+r,s+"nx"+r,s+"py"+r,s+"ny"+r,s+"pz"+r,s+"nz"+r];return new Promise((i,l)=>{e.onLoad=()=>i(n),e.onError=o=>l(new Error(`Failed to load ${o}`)),t.load(a,o=>{o.colorSpace=p.SRGBColorSpace,n.set("sky",o)})})}window.addEventListener("load",()=>be().then(n=>{let e=new p.WebGLRenderer({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!1});e.debug.checkShaderErrors=window.location.hostname==="localhost",e.shadowMap.type=p.VSMShadowMap,e.shadowMap.autoUpdate=!1,e.shadowMap.needsUpdate=!0,e.shadowMap.enabled=!0;let t=document.querySelector(".viewport");t.prepend(e.domElement);let s=new p.PerspectiveCamera,r=new q.SpatialControls(s.position,s.quaternion,e.domElement),a=r.settings;a.general.mode=q.ControlMode.THIRD_PERSON,a.rotation.sensitivity=2.2,a.rotation.damping=.05,a.zoom.damping=.1,a.translation.enabled=!1,r.position.set(0,0,5);let i=new p.Scene;i.background=n.get("sky"),i.add(ce()),i.add(he()),i.add(fe());let l=new p.Mesh(new p.SphereGeometry(.2,32,32),new p.MeshBasicMaterial({color:11119017,transparent:!0,depthWrite:!1,opacity:.5}));i.add(l);let o=new j(e,{multisampling:Math.min(4,e.capabilities.maxSamples)}),c=new K;o.addPass(new G(i,s)),o.addPass(c),o.addPass(new k);let h=new p.Vector3;function M(C){return Z(this,null,function*(){let B=t.getBoundingClientRect(),pe=C.clientX-B.left,me=C.clientY-B.top;h.x=pe/t.clientWidth*2-1,h.y=-(me/t.clientHeight)*2+1,h.z=yield c.readDepth(h),h.z=h.z*2-1,l.position.copy(h.unproject(s))})}t.addEventListener("pointermove",C=>void M(C),{passive:!0});let P=new L;new de.Pane({container:t.querySelector(".tp")}).addBinding(P,"fps",{readonly:!0,label:"FPS"});function J(){let C=t.clientWidth,B=t.clientHeight;s.aspect=C/B,s.fov=ue(90,Math.max(s.aspect,16/9)),s.updateProjectionMatrix(),o.setSize(C,B)}window.addEventListener("resize",J),J(),requestAnimationFrame(function C(B){P.update(B),r.update(B),o.render(),requestAnimationFrame(C)})}));})();
