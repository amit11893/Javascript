class MyPromise{
  constructor(){
    this.pending = [];
    this.rejected = [];
  }
  then(onResolve, onReject){
    this.pending.push({
      resolve: onResolve,
      reject: onReject
    });
    return this;
  }
  catch(onReject){
    this.rejected.push({
      reject: onReject
    });
    return this;
  }
  resolve(data){
    this.then = function(resolve, reject){
      if(resolve){ 
        resolve(data);
      }
      this.executePending('resolve', data);
    }
  }
  reject(data){
     this.then = function(resolve, reject){
        if(reject){ 
          reject(data);
        }
        this.executePending('reject', data);
     }
     this.catch = function (){
        this.executeRejected(error);
     }
  }
  executePending(type, data){
    let i=0;
    while(let f = this.pending[i++]){
      if(f[type]){
        f[type](data);
      }
    }
    delete this.pending;
  }
  executeRejected(error){
    let i=0;
    while(let f = this.rejected[i++]){
      if(f[0]){
        f[0](error);
      }
    }
    delete this.rejected;
  }
}
