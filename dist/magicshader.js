var three=require("three"),dat=require("dat.gui"),magicUniformsToThree=function(e){var r={};for(var t in e){var a=e[t].json.value;"bool"===e[t].type&&(a=!!a),"string"==typeof a&&(a=new three.Color(a)),r[t]={value:a}}return r},parseShaders=function(e,r){var t=parseGLSL(e),a=parseGLSL(r);return Object.assign({},t,a)},parseGLSL=function(source){var lines=source.match(/uniform (.+?) (.+?);.+\/\/.+ms\((.+?)\)/gm);if(!lines)return{};var uniforms={};return lines.forEach(function(line){var ref=line.match(/uniform (.+?) (.+?);.+\/\/.+ms\((.+?)\)/),type=ref[1],name=ref[2],jsonString=ref[3],json={};try{eval("json = "+jsonString)}catch(e){throw new Error(e)}json.value||(json.value=0),uniforms[name]={name:name,type:type,json:json}}),uniforms},gui=new dat.GUI({name:"MagicShader"}),spectorGui,id=0,MagicShader=function(e){function r(r){var t=parseShaders(r.vertexShader,r.fragmentShader);r.uniforms=Object.assign({},magicUniformsToThree(t),r.uniforms),e.call(this,r),this.params=r,this.magicUniforms=t,this.displayName=this.params.name||"Shader n. "+ ++id,this.spector(),this.bindUI()}return e&&(r.__proto__=e),(r.prototype=Object.create(e&&e.prototype)).constructor=r,r.prototype.bindUI=function(){var e=this;this.gui&&gui.removeFolder(this.gui),this.gui=gui.addFolder(this.displayName),Object.keys(this.magicUniforms).forEach(function(r){var t=e.magicUniforms[r],a=t.json,i=e.uniforms[r],s=e.gui.addFolder(a.name||"🔮 "+t.type+" - "+r);if(i.value instanceof three.Color)s.addColor(a,"value").onChange(function(e){i.value.set(e)}).listen();else if(Array.isArray(a.value))Object.keys(i.value).forEach(function(e){var r=s.add(i.value,e);a.step&&r.step(a.step),a.range&&a.range[e]&&2===a.range[e].length&&(r.min(a.range[e][0]),r.max(a.range[e][1])),r.listen()});else{var o=s.add(i,"value");a.step&&o.step(a.step),a.options&&o.options(a.options),a.range&&2===a.range.length&&(o.min(a.range[0]),o.max(a.range[1])),o.listen()}})},r.prototype.spector=function(){var e=this;window.spector&&(spectorGui||(spectorGui=gui.addFolder("📈 Spector"),this.spectorFPS=0,setInterval(function(){e.spectorFPS=spector.getFps()},200),spectorGui.add(this,"spectorFPS").name("FPS").listen(),spectorGui.add(this,"capture")),this.checkProgram=this.checkProgram.bind(this),this.checkProgramInterval=setInterval(this.checkProgram,200))},r.prototype.capture=function(){var e=document.querySelector("canvas");spector.captureNextFrame(e)},r.prototype.checkProgram=function(){this.program&&this.program.program&&(this.program.program.__SPECTOR_Object_TAG.displayText=this.displayName,this.program.vertexShader.__SPECTOR_Object_TAG.displayText="Vertex - "+this.displayName,this.program.fragmentShader.__SPECTOR_Object_TAG.displayText="Fragment - "+this.displayName,this.program.program.__SPECTOR_rebuildProgram=this.rebuildShader.bind(this),clearInterval(this.checkProgramInterval))},r.prototype.rebuildShader=function(e,r,t,a){this.vertexShader=e,this.fragmentShader=r,this.magicUniforms=parseShaders(e,r),this.uniforms=Object.assign({},this.uniforms,magicUniformsToThree(this.magicUniforms)),this.needsUpdate=!0,this.bindUI(),t(this.program.program),this.checkProgramInterval=setInterval(this.checkProgram,200)},r}(three.RawShaderMaterial);exports.gui=gui,exports.default=MagicShader;
//# sourceMappingURL=magicshader.js.map
