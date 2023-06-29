"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[30],{1728:function(t,e,i){i.d(e,{_:function(){return s}});let s=console},6053:function(t,e,i){i.d(e,{R:function(){return o},m:function(){return u}});var s=i(1728),a=i(3848),r=i(8511),n=i(760);class u extends r.F{constructor(t){super(),this.defaultOptions=t.defaultOptions,this.mutationId=t.mutationId,this.mutationCache=t.mutationCache,this.logger=t.logger||s._,this.observers=[],this.state=t.state||o(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options={...this.defaultOptions,...t},this.updateCacheTime(this.options.cacheTime)}get meta(){return this.options.meta}setState(t){this.dispatch({type:"setState",state:t})}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),this.mutationCache.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.observers=this.observers.filter(e=>e!==t),this.scheduleGc(),this.mutationCache.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.observers.length||("loading"===this.state.status?this.scheduleGc():this.mutationCache.remove(this))}continue(){var t,e;return null!=(t=null==(e=this.retryer)?void 0:e.continue())?t:this.execute()}async execute(){var t,e,i,s,a,r,u,o,h,l,c,d,f,p,y,v,m,g,b,q;let C="loading"===this.state.status;try{if(!C){this.dispatch({type:"loading",variables:this.options.variables}),await (null==(h=(l=this.mutationCache.config).onMutate)?void 0:h.call(l,this.state.variables,this));let t=await (null==(c=(d=this.options).onMutate)?void 0:c.call(d,this.state.variables));t!==this.state.context&&this.dispatch({type:"loading",context:t,variables:this.state.variables})}let f=await (()=>{var t;return this.retryer=(0,n.Mz)({fn:()=>this.options.mutationFn?this.options.mutationFn(this.state.variables):Promise.reject("No mutationFn found"),onFail:(t,e)=>{this.dispatch({type:"failed",failureCount:t,error:e})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:null!=(t=this.options.retry)?t:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode}),this.retryer.promise})();return await (null==(t=(e=this.mutationCache.config).onSuccess)?void 0:t.call(e,f,this.state.variables,this.state.context,this)),await (null==(i=(s=this.options).onSuccess)?void 0:i.call(s,f,this.state.variables,this.state.context)),await (null==(a=(r=this.mutationCache.config).onSettled)?void 0:a.call(r,f,null,this.state.variables,this.state.context,this)),await (null==(u=(o=this.options).onSettled)?void 0:u.call(o,f,null,this.state.variables,this.state.context)),this.dispatch({type:"success",data:f}),f}catch(t){try{throw await (null==(f=(p=this.mutationCache.config).onError)?void 0:f.call(p,t,this.state.variables,this.state.context,this)),await (null==(y=(v=this.options).onError)?void 0:y.call(v,t,this.state.variables,this.state.context)),await (null==(m=(g=this.mutationCache.config).onSettled)?void 0:m.call(g,void 0,t,this.state.variables,this.state.context,this)),await (null==(b=(q=this.options).onSettled)?void 0:b.call(q,void 0,t,this.state.variables,this.state.context)),t}finally{this.dispatch({type:"error",error:t})}}}dispatch(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"loading":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:!(0,n.Kw)(this.options.networkMode),status:"loading",variables:t.variables};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"};case"setState":return{...e,...t.state}}})(this.state),a.V.batch(()=>{this.observers.forEach(e=>{e.onMutationUpdate(t)}),this.mutationCache.notify({mutation:this,type:"updated",action:t})})}}function o(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0}}},2030:function(t,e,i){i.d(e,{S:function(){return v}});var s=i(7179),a=i(1728),r=i(3848),n=i(760),u=i(8511);class o extends u.F{constructor(t){super(),this.abortSignalConsumed=!1,this.defaultOptions=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.cache=t.cache,this.logger=t.logger||a._,this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.initialState=t.state||function(t){let e="function"==typeof t.initialData?t.initialData():t.initialData,i=void 0!==e,s=i?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:i?null!=s?s:Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:i?"success":"loading",fetchStatus:"idle"}}(this.options),this.state=this.initialState,this.scheduleGc()}get meta(){return this.options.meta}setOptions(t){this.options={...this.defaultOptions,...t},this.updateCacheTime(this.options.cacheTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.cache.remove(this)}setData(t,e){let i=(0,s.oE)(this.state.data,t,this.options);return this.dispatch({data:i,type:"success",dataUpdatedAt:null==e?void 0:e.updatedAt,manual:null==e?void 0:e.manual}),i}setState(t,e){this.dispatch({type:"setState",state:t,setStateOptions:e})}cancel(t){var e;let i=this.promise;return null==(e=this.retryer)||e.cancel(t),i?i.then(s.ZT).catch(s.ZT):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(t=>!1!==t.options.enabled)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(t=>t.getCurrentResult().isStale)}isStaleByTime(t=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!(0,s.Kp)(this.state.dataUpdatedAt,t)}onFocus(){var t;let e=this.observers.find(t=>t.shouldFetchOnWindowFocus());e&&e.refetch({cancelRefetch:!1}),null==(t=this.retryer)||t.continue()}onOnline(){var t;let e=this.observers.find(t=>t.shouldFetchOnReconnect());e&&e.refetch({cancelRefetch:!1}),null==(t=this.retryer)||t.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(e=>e!==t),this.observers.length||(this.retryer&&(this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.scheduleGc()),this.cache.notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(t,e){var i,a,r,u;if("idle"!==this.state.fetchStatus){if(this.state.dataUpdatedAt&&null!=e&&e.cancelRefetch)this.cancel({silent:!0});else if(this.promise)return null==(r=this.retryer)||r.continueRetry(),this.promise}if(t&&this.setOptions(t),!this.options.queryFn){let t=this.observers.find(t=>t.options.queryFn);t&&this.setOptions(t.options)}Array.isArray(this.options.queryKey);let o=(0,s.G9)(),h={queryKey:this.queryKey,pageParam:void 0,meta:this.meta},l=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>{if(o)return this.abortSignalConsumed=!0,o.signal}})};l(h);let c={fetchOptions:e,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(h)):Promise.reject("Missing queryFn for queryKey '"+this.options.queryHash+"'")};l(c),null==(i=this.options.behavior)||i.onFetch(c),this.revertState=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==(null==(a=c.fetchOptions)?void 0:a.meta))&&this.dispatch({type:"fetch",meta:null==(u=c.fetchOptions)?void 0:u.meta});let d=t=>{if((0,n.DV)(t)&&t.silent||this.dispatch({type:"error",error:t}),!(0,n.DV)(t)){var e,i,s,a;null==(e=(i=this.cache.config).onError)||e.call(i,t,this),null==(s=(a=this.cache.config).onSettled)||s.call(a,this.state.data,t,this)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return this.retryer=(0,n.Mz)({fn:c.fetchFn,abort:null==o?void 0:o.abort.bind(o),onSuccess:t=>{var e,i,s,a;if(void 0===t){d(Error(this.queryHash+" data is undefined"));return}this.setData(t),null==(e=(i=this.cache.config).onSuccess)||e.call(i,t,this),null==(s=(a=this.cache.config).onSettled)||s.call(a,t,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:d,onFail:(t,e)=>{this.dispatch({type:"failed",failureCount:t,error:e})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:c.options.retry,retryDelay:c.options.retryDelay,networkMode:c.options.networkMode}),this.promise=this.retryer.promise,this.promise}dispatch(t){this.state=(e=>{var i,s;switch(t.type){case"failed":return{...e,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...e,fetchStatus:"paused"};case"continue":return{...e,fetchStatus:"fetching"};case"fetch":return{...e,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null!=(i=t.meta)?i:null,fetchStatus:(0,n.Kw)(this.options.networkMode)?"fetching":"paused",...!e.dataUpdatedAt&&{error:null,status:"loading"}};case"success":return{...e,data:t.data,dataUpdateCount:e.dataUpdateCount+1,dataUpdatedAt:null!=(s=t.dataUpdatedAt)?s:Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":let a=t.error;if((0,n.DV)(a)&&a.revert&&this.revertState)return{...this.revertState};return{...e,error:a,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,fetchFailureReason:a,fetchStatus:"idle",status:"error"};case"invalidate":return{...e,isInvalidated:!0};case"setState":return{...e,...t.state}}})(this.state),r.V.batch(()=>{this.observers.forEach(e=>{e.onQueryUpdate(t)}),this.cache.notify({query:this,type:"updated",action:t})})}}var h=i(2772);class l extends h.l{constructor(t){super(),this.config=t||{},this.queries=[],this.queriesMap={}}build(t,e,i){var a;let r=e.queryKey,n=null!=(a=e.queryHash)?a:(0,s.Rm)(r,e),u=this.get(n);return u||(u=new o({cache:this,logger:t.getLogger(),queryKey:r,queryHash:n,options:t.defaultQueryOptions(e),state:i,defaultOptions:t.getQueryDefaults(r)}),this.add(u)),u}add(t){this.queriesMap[t.queryHash]||(this.queriesMap[t.queryHash]=t,this.queries.push(t),this.notify({type:"added",query:t}))}remove(t){let e=this.queriesMap[t.queryHash];e&&(t.destroy(),this.queries=this.queries.filter(e=>e!==t),e===t&&delete this.queriesMap[t.queryHash],this.notify({type:"removed",query:t}))}clear(){r.V.batch(()=>{this.queries.forEach(t=>{this.remove(t)})})}get(t){return this.queriesMap[t]}getAll(){return this.queries}find(t,e){let[i]=(0,s.I6)(t,e);return void 0===i.exact&&(i.exact=!0),this.queries.find(t=>(0,s._x)(i,t))}findAll(t,e){let[i]=(0,s.I6)(t,e);return Object.keys(i).length>0?this.queries.filter(t=>(0,s._x)(i,t)):this.queries}notify(t){r.V.batch(()=>{this.listeners.forEach(({listener:e})=>{e(t)})})}onFocus(){r.V.batch(()=>{this.queries.forEach(t=>{t.onFocus()})})}onOnline(){r.V.batch(()=>{this.queries.forEach(t=>{t.onOnline()})})}}var c=i(6053);class d extends h.l{constructor(t){super(),this.config=t||{},this.mutations=[],this.mutationId=0}build(t,e,i){let s=new c.m({mutationCache:this,logger:t.getLogger(),mutationId:++this.mutationId,options:t.defaultMutationOptions(e),state:i,defaultOptions:e.mutationKey?t.getMutationDefaults(e.mutationKey):void 0});return this.add(s),s}add(t){this.mutations.push(t),this.notify({type:"added",mutation:t})}remove(t){this.mutations=this.mutations.filter(e=>e!==t),this.notify({type:"removed",mutation:t})}clear(){r.V.batch(()=>{this.mutations.forEach(t=>{this.remove(t)})})}getAll(){return this.mutations}find(t){return void 0===t.exact&&(t.exact=!0),this.mutations.find(e=>(0,s.X7)(t,e))}findAll(t){return this.mutations.filter(e=>(0,s.X7)(t,e))}notify(t){r.V.batch(()=>{this.listeners.forEach(({listener:e})=>{e(t)})})}resumePausedMutations(){var t;return this.resuming=(null!=(t=this.resuming)?t:Promise.resolve()).then(()=>{let t=this.mutations.filter(t=>t.state.isPaused);return r.V.batch(()=>t.reduce((t,e)=>t.then(()=>e.continue().catch(s.ZT)),Promise.resolve()))}).then(()=>{this.resuming=void 0}),this.resuming}}var f=i(9833),p=i(7205);function y(t,e){return null==t.getNextPageParam?void 0:t.getNextPageParam(e[e.length-1],e)}class v{constructor(t={}){this.queryCache=t.queryCache||new l,this.mutationCache=t.mutationCache||new d,this.logger=t.logger||a._,this.defaultOptions=t.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[],this.mountCount=0}mount(){this.mountCount++,1===this.mountCount&&(this.unsubscribeFocus=f.j.subscribe(()=>{f.j.isFocused()&&(this.resumePausedMutations(),this.queryCache.onFocus())}),this.unsubscribeOnline=p.N.subscribe(()=>{p.N.isOnline()&&(this.resumePausedMutations(),this.queryCache.onOnline())}))}unmount(){var t,e;this.mountCount--,0===this.mountCount&&(null==(t=this.unsubscribeFocus)||t.call(this),this.unsubscribeFocus=void 0,null==(e=this.unsubscribeOnline)||e.call(this),this.unsubscribeOnline=void 0)}isFetching(t,e){let[i]=(0,s.I6)(t,e);return i.fetchStatus="fetching",this.queryCache.findAll(i).length}isMutating(t){return this.mutationCache.findAll({...t,fetching:!0}).length}getQueryData(t,e){var i;return null==(i=this.queryCache.find(t,e))?void 0:i.state.data}ensureQueryData(t,e,i){let a=(0,s._v)(t,e,i),r=this.getQueryData(a.queryKey);return r?Promise.resolve(r):this.fetchQuery(a)}getQueriesData(t){return this.getQueryCache().findAll(t).map(({queryKey:t,state:e})=>{let i=e.data;return[t,i]})}setQueryData(t,e,i){let a=this.queryCache.find(t),r=null==a?void 0:a.state.data,n=(0,s.SE)(e,r);if(void 0===n)return;let u=(0,s._v)(t),o=this.defaultQueryOptions(u);return this.queryCache.build(this,o).setData(n,{...i,manual:!0})}setQueriesData(t,e,i){return r.V.batch(()=>this.getQueryCache().findAll(t).map(({queryKey:t})=>[t,this.setQueryData(t,e,i)]))}getQueryState(t,e){var i;return null==(i=this.queryCache.find(t,e))?void 0:i.state}removeQueries(t,e){let[i]=(0,s.I6)(t,e),a=this.queryCache;r.V.batch(()=>{a.findAll(i).forEach(t=>{a.remove(t)})})}resetQueries(t,e,i){let[a,n]=(0,s.I6)(t,e,i),u=this.queryCache,o={type:"active",...a};return r.V.batch(()=>(u.findAll(a).forEach(t=>{t.reset()}),this.refetchQueries(o,n)))}cancelQueries(t,e,i){let[a,n={}]=(0,s.I6)(t,e,i);void 0===n.revert&&(n.revert=!0);let u=r.V.batch(()=>this.queryCache.findAll(a).map(t=>t.cancel(n)));return Promise.all(u).then(s.ZT).catch(s.ZT)}invalidateQueries(t,e,i){let[a,n]=(0,s.I6)(t,e,i);return r.V.batch(()=>{var t,e;if(this.queryCache.findAll(a).forEach(t=>{t.invalidate()}),"none"===a.refetchType)return Promise.resolve();let i={...a,type:null!=(t=null!=(e=a.refetchType)?e:a.type)?t:"active"};return this.refetchQueries(i,n)})}refetchQueries(t,e,i){let[a,n]=(0,s.I6)(t,e,i),u=r.V.batch(()=>this.queryCache.findAll(a).filter(t=>!t.isDisabled()).map(t=>{var e;return t.fetch(void 0,{...n,cancelRefetch:null==(e=null==n?void 0:n.cancelRefetch)||e,meta:{refetchPage:a.refetchPage}})})),o=Promise.all(u).then(s.ZT);return null!=n&&n.throwOnError||(o=o.catch(s.ZT)),o}fetchQuery(t,e,i){let a=(0,s._v)(t,e,i),r=this.defaultQueryOptions(a);void 0===r.retry&&(r.retry=!1);let n=this.queryCache.build(this,r);return n.isStaleByTime(r.staleTime)?n.fetch(r):Promise.resolve(n.state.data)}prefetchQuery(t,e,i){return this.fetchQuery(t,e,i).then(s.ZT).catch(s.ZT)}fetchInfiniteQuery(t,e,i){let a=(0,s._v)(t,e,i);return a.behavior={onFetch:t=>{t.fetchFn=()=>{var e,i,s,a,r,n,u;let o;let h=null==(e=t.fetchOptions)?void 0:null==(i=e.meta)?void 0:i.refetchPage,l=null==(s=t.fetchOptions)?void 0:null==(a=s.meta)?void 0:a.fetchMore,c=null==l?void 0:l.pageParam,d=(null==l?void 0:l.direction)==="forward",f=(null==l?void 0:l.direction)==="backward",p=(null==(r=t.state.data)?void 0:r.pages)||[],v=(null==(n=t.state.data)?void 0:n.pageParams)||[],m=v,g=!1,b=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>{var e,i;return null!=(e=t.signal)&&e.aborted?g=!0:null==(i=t.signal)||i.addEventListener("abort",()=>{g=!0}),t.signal}})},q=t.options.queryFn||(()=>Promise.reject("Missing queryFn for queryKey '"+t.options.queryHash+"'")),C=(t,e,i,s)=>(m=s?[e,...m]:[...m,e],s?[i,...t]:[...t,i]),O=(e,i,s,a)=>{if(g)return Promise.reject("Cancelled");if(void 0===s&&!i&&e.length)return Promise.resolve(e);let r={queryKey:t.queryKey,pageParam:s,meta:t.options.meta};b(r);let n=q(r),u=Promise.resolve(n).then(t=>C(e,s,t,a));return u};if(p.length){if(d){let e=void 0!==c,i=e?c:y(t.options,p);o=O(p,e,i)}else if(f){let e=void 0!==c,i=e?c:null==(u=t.options).getPreviousPageParam?void 0:u.getPreviousPageParam(p[0],p);o=O(p,e,i,!0)}else{m=[];let e=void 0===t.options.getNextPageParam,i=!h||!p[0]||h(p[0],0,p);o=i?O([],e,v[0]):Promise.resolve(C([],v[0],p[0]));for(let i=1;i<p.length;i++)o=o.then(s=>{let a=!h||!p[i]||h(p[i],i,p);if(a){let a=e?v[i]:y(t.options,s);return O(s,e,a)}return Promise.resolve(C(s,v[i],p[i]))})}}else o=O([]);let P=o.then(t=>({pages:t,pageParams:m}));return P}}},this.fetchQuery(a)}prefetchInfiniteQuery(t,e,i){return this.fetchInfiniteQuery(t,e,i).then(s.ZT).catch(s.ZT)}resumePausedMutations(){return this.mutationCache.resumePausedMutations()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getLogger(){return this.logger}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(t){this.defaultOptions=t}setQueryDefaults(t,e){let i=this.queryDefaults.find(e=>(0,s.yF)(t)===(0,s.yF)(e.queryKey));i?i.defaultOptions=e:this.queryDefaults.push({queryKey:t,defaultOptions:e})}getQueryDefaults(t){if(!t)return;let e=this.queryDefaults.find(e=>(0,s.to)(t,e.queryKey));return null==e?void 0:e.defaultOptions}setMutationDefaults(t,e){let i=this.mutationDefaults.find(e=>(0,s.yF)(t)===(0,s.yF)(e.mutationKey));i?i.defaultOptions=e:this.mutationDefaults.push({mutationKey:t,defaultOptions:e})}getMutationDefaults(t){if(!t)return;let e=this.mutationDefaults.find(e=>(0,s.to)(t,e.mutationKey));return null==e?void 0:e.defaultOptions}defaultQueryOptions(t){if(null!=t&&t._defaulted)return t;let e={...this.defaultOptions.queries,...this.getQueryDefaults(null==t?void 0:t.queryKey),...t,_defaulted:!0};return!e.queryHash&&e.queryKey&&(e.queryHash=(0,s.Rm)(e.queryKey,e)),void 0===e.refetchOnReconnect&&(e.refetchOnReconnect="always"!==e.networkMode),void 0===e.useErrorBoundary&&(e.useErrorBoundary=!!e.suspense),e}defaultMutationOptions(t){return null!=t&&t._defaulted?t:{...this.defaultOptions.mutations,...this.getMutationDefaults(null==t?void 0:t.mutationKey),...t,_defaulted:!0}}clear(){this.queryCache.clear(),this.mutationCache.clear()}}},8511:function(t,e,i){i.d(e,{F:function(){return a}});var s=i(7179);class a{destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),(0,s.PN)(this.cacheTime)&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}updateCacheTime(t){this.cacheTime=Math.max(this.cacheTime||0,null!=t?t:s.sk?1/0:3e5)}clearGcTimeout(){this.gcTimeout&&(clearTimeout(this.gcTimeout),this.gcTimeout=void 0)}}}}]);