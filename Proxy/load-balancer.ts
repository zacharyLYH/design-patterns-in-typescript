/*
Imagine a web server environment. In real world deployments, its common to have a load balancer sitting infront a fleet of compute engines. The reason for this is to balance web traffic load across all instances, so that not one compute instance gets too hot while the others stay cold and unused, leading to severe inefficiencies. Our proxy will be our load balancers, and we'll our Subject shall be a fleet of compute engines.

Now, in real life, you might also have auto-scaling features for your fleet of compute instances, ie. if there are too many requests for your servers, the compute side can spin up more instances of itself and scale out, thus serve more clients. We won't do that here. We are primarily interested in the load balancer and how the load balancer can implement the proxy pattern.

The algorithm for load balancing is the Round Robin algorithm, and we're not implementing any other advanced algorithms.
*/

interface Compute {
    runComputation(): void;
}

//Subject
class CPU implements Compute {
    private cpuID: string;
    constructor(newCpuID: string) {
        this.cpuID = newCpuID;
    }
    runComputation(): void {
        console.log(`Running computation on CPU ID ${this.cpuID}`);
    }
}

//Proxy
class LoadBalancer implements Compute {
    private fleet: CPU[]; //reference to our fleet
    private nextCPU: number; //points to the next CPU to runComputation()
    constructor(...instances: CPU[]) {
        this.fleet = instances;
        this.nextCPU = 0;
    }
    /*
    nextCPU tells us which CPU runs code. This pointer increments every time a new computation happens. When 
    nextCPU is equal to the length of the fleet, it means we've reached the end of the fleet and should roll back to the first cpu.
    */
    runComputation(): void {
        this.fleet[this.nextCPU].runComputation();
        this.nextCPU++;
        if (this.nextCPU === this.fleet.length) {
            this.nextCPU = 0;
        }
    }
}

const cpu1 = new CPU("1");
const cpu2 = new CPU("2");
const cpu3 = new CPU("3");

const loadBalancer = new LoadBalancer(cpu1, cpu2, cpu3);

loadBalancer.runComputation();
loadBalancer.runComputation();
loadBalancer.runComputation();
//rollback happens here
loadBalancer.runComputation();
loadBalancer.runComputation();
loadBalancer.runComputation();
//another roll back
loadBalancer.runComputation();

/*
Running computation on CPU ID 1
Running computation on CPU ID 2
Running computation on CPU ID 3
Running computation on CPU ID 1
Running computation on CPU ID 2
Running computation on CPU ID 3
Running computation on CPU ID 1
*/
