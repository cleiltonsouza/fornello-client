(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{e125:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",[e("div",{staticClass:"q-pa-md q-gutter-sm"},[e("q-breadcrumbs",[e("q-breadcrumbs-el",{attrs:{label:"Home"}}),e("q-breadcrumbs-el",{attrs:{label:"Template"}}),e("q-breadcrumbs-el",{attrs:{label:"Mapeamento"}})],1)],1),e("div",{staticClass:"q-pa-md q-gutter-sm"},[e("q-card",{staticClass:"my-card"},[e("q-card-section",[e("div",{staticClass:"text-h6"},[t._v("Mapeamento")]),e("div",{staticClass:"text-subtitle2"},[t._v(t._s(t.mapeamentoInput.template.descricao))])]),e("q-card-section",[e("div",{staticClass:"q-pa-md q-gutter-md"},t._l(t.mapeamentoInput.mapeamentoItens,(function(a){return e("div",{key:a.mapeamentoItemId,staticClass:"text-h6",staticStyle:{"margin-top":"10px"}},[e("q-badge",{attrs:{color:"primary",align:"middle","text-color":"white"}},[t._v("\n              template api\n            ")]),e("q-badge",{attrs:{align:"middle",color:"white","text-color":"black"}},[t._v("\n              "+t._s(a.pathTemplate)+"\n            ")]),e("q-input",{attrs:{outlined:"",label:"Persona template"},model:{value:a.pathPersona,callback:function(e){t.$set(a,"pathPersona",e)},expression:"mapeamento.pathPersona"}}),3!=a.tipoMapeamentoItem?e("div",t._l(a.subMapeamentoItem,(function(a){return e("div",{key:a.mapeamentoItemId,staticClass:"text-h6",staticStyle:{"margin-top":"10px"}},[e("q-badge",{attrs:{color:"primary",align:"middle","text-color":"white"}},[t._v("\n                  template api\n                ")]),e("q-badge",{attrs:{align:"middle",color:"white","text-color":"black"}},[t._v("\n                  "+t._s(a.pathTemplate)+"\n                ")]),e("q-input",{attrs:{outlined:"",label:"Persona template"},model:{value:a.pathPersona,callback:function(e){t.$set(a,"pathPersona",e)},expression:"mapeamentoNivel1.pathPersona"}}),3!=a.tipoMapeamentoItem?e("div",t._l(a.subMapeamentoItem,(function(a){return e("div",{key:a.mapeamentoItemId,staticClass:"text-h6",staticStyle:{"margin-top":"10px"}},[e("q-badge",{attrs:{color:"primary",align:"middle","text-color":"white"}},[t._v("\n                      template api\n                    ")]),e("q-badge",{attrs:{align:"middle",color:"white","text-color":"black"}},[t._v("\n                      "+t._s(a.pathTemplate)+"\n                    ")]),e("q-input",{attrs:{outlined:"",label:"Persona template"},model:{value:a.pathPersona,callback:function(e){t.$set(a,"pathPersona",e)},expression:"mapeamentoNivel2.pathPersona"}})],1)})),0):t._e()],1)})),0):t._e()],1)})),0)]),e("q-separator",{attrs:{dark:""}}),e("q-card-actions",[e("q-btn",{attrs:{color:"primary",icon:"check",label:"Salvar",flat:""},on:{click:function(e){return t.atualizar()}}}),e("q-btn",{attrs:{icon:"arrow_back",label:"Voltar",flat:""},on:{click:function(e){return t.voltar()}}})],1)],1)],1)])},r=[],o=a("1b40"),l=a("ec43"),s=function(t,e,a,n){var r,o=arguments.length,l=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)l=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(l=(o<3?r(l):o>3?r(e,a,l):r(e,a))||l);return o>3&&l&&Object.defineProperty(e,a,l),l};let i=class extends o["c"]{constructor(){super(...arguments),this.mapeamentoInput={templateId:"",tipoMapeamentoItem:0,template:{},mapeamentoItens:[]}}atualizar(){this._mapeamentoService.atualizar(this.mapeamentoId,{mapeamentoItens:this.mapeamentoInput.mapeamentoItens}).then((t=>this.$q.notify(t))).catch((t=>this.$q.notify(t))).finally((()=>this.$router.push({path:"/template"})))}recuperaPorId(t){this._mapeamentoService.recuperaPorId(t).then((t=>this.mapeamentoInput=t)).catch((t=>this.$q.notify(t)))}created(){this._mapeamentoService=new l["a"],this.mapeamentoId=this.$route.params.mapeamentoId,this.recuperaPorId(this.mapeamentoId)}voltar(){this.$router.back()}};i=s([o["a"]],i);var p=i,c=p,m=a("2877"),d=a("ead5"),u=a("079e"),h=a("f09f"),b=a("a370"),v=a("58a8"),f=a("27f9"),q=a("eb85"),I=a("4b7e"),_=a("9c40"),g=a("eebe"),x=a.n(g),y=Object(m["a"])(c,n,r,!1,null,null,null);e["default"]=y.exports;x()(y,"components",{QBreadcrumbs:d["a"],QBreadcrumbsEl:u["a"],QCard:h["a"],QCardSection:b["a"],QBadge:v["a"],QInput:f["a"],QSeparator:q["a"],QCardActions:I["a"],QBtn:_["a"]})}}]);