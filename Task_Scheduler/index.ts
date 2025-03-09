// Make a Task Scheduler which will have a conccurency limit, and only that limit number of tasks can be runnning parallel at once

class TaskScheduler {
    conccurency : number;
    runningTask:number;
    waitinQueue: any;
    constructor(conccurency){
        this.conccurency = conccurency
        this.runningTask = 0;
        this.waitinQueue = [];
    }

    getNextTask(){
        if(this.runningTask < this.conccurency &&   this.waitinQueue.length > 0){
            const nextTask = this.waitinQueue.shift();
            nextTask();
        }
    }
    addTask(task){
        return new Promise((resolve,reject)=>{
            async function __taskRunner(){
                this.runningTask++;
                try {
                    const result = await task();
                    console.log(`Result: ${result}`)
                    resolve(result)
                }catch(err){
                    console.log(`An error accured: ${err}`);
                    reject(err)
                }finally{
                    this.runningTask--;
                    this.getNextTask();
                }

            }

            if(this.runningTask < this.conccurency){
                __taskRunner.call(this)
            }else{
                this.waitinQueue.push(__taskRunner.bind(this))
            }
        })
    }
}