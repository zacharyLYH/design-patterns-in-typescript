/*
Let's imagine a typical company in the 21st century. Every company likely has many departments (HR, IT, Logistics etc..), and each department might have some very computation heavy workloads to carry out. Let's assume the company in question doesn't employ third party vendors to do their heavy workloads, for example, instead of using a third party payroll software, they decided to implement their own payroll system in-house. With a sufficiently big number of employees, there is potentially a lot of payment processing that needs to be computed. That is just one example and we'll leave other heavy computation workloads a company may possible have as an exercise for the reader.

Now, to the main point. The company bought a super powerful server, one that can handle all the company's heavy workloads sequentially as jobs. In order to minimize the time needed for all the computational jobs to be finished, you realize you have to standardize the way in which execution is done on the server; every job cannot come with their own operating system, library of dependencies etc. Should every job need to first load their dependencies and data to the server before actually doing meaningful work, then too much time is wasted. Recognizing that, your job is to provide an API that all workloads have to implement, and provide the code needed to run the server.
*/

interface CompanyCommand {
    execute(): void;
}

// Each department has its own work to do
class Payroll {
    private paying: string;
    constructor(paying: string) {
        this.paying = paying;
    }
    payEmployees(): void {
        console.log("Bye bye money. Paying ", this.paying);
    }
}

class Antivirus {
    private department: string;
    constructor(department: string) {
        this.department = department;
    }
    systemVirusDetection(): void {
        console.log(
            `Scanning for pesky viruses in the ${this.department} department`
        );
    }
}

class Logistics {
    generateLogistics(): void {
        console.log("Generating logistics!");
    }
}

// We need to standardize APIs. Every department needs to use CompanyCommand
class PayrollCommand implements CompanyCommand {
    private payroll: Payroll;
    constructor(payroll: Payroll) {
        this.payroll = payroll;
    }
    execute(): void {
        this.payroll.payEmployees();
    }
}

class AntivirusCommand implements CompanyCommand {
    private antivirus: Antivirus;
    constructor(antivirus: Antivirus) {
        this.antivirus = antivirus;
    }
    execute(): void {
        this.antivirus.systemVirusDetection();
    }
}

class LogisticsCommand implements CompanyCommand {
    private logistics: Logistics;
    constructor(logistics: Logistics) {
        this.logistics = logistics;
    }
    execute(): void {
        this.logistics.generateLogistics();
    }
}

// The server logic. Jobs get queued into a job queue, then a job runner runs them all in a batch.
class PowerfulCompanyServer {
    private jobQueue: CompanyCommand[] = [];
    enqueueJobs(job: CompanyCommand): void {
        this.jobQueue.push(job);
    }
    runJobs(): void {
        for (const job of this.jobQueue) {
            job.execute(); //beautiful
        }
    }
}

const companyServer = new PowerfulCompanyServer();

// The payroll guys work the fastest - they'll batch their job first.
const payConstructionWorkers = new PayrollCommand(
    new Payroll("construction workers")
);
const payCSuite = new PayrollCommand(new Payroll("CSuite"));
companyServer.enqueueJobs(payConstructionWorkers);
companyServer.enqueueJobs(payCSuite);

// Time to scan for viruses
const scanLogistics = new AntivirusCommand(new Antivirus("logistics"));
const scanMarketing = new AntivirusCommand(new Antivirus("marketing"));
companyServer.enqueueJobs(scanLogistics);
companyServer.enqueueJobs(scanMarketing);

// Its not their fault that logistics are usually very complicated. So, they go last.
const tomorrowsLogistics = new LogisticsCommand(new Logistics());
companyServer.enqueueJobs(tomorrowsLogistics);

// Wait, the HR folks forgot to pay themselves
const payHR = new PayrollCommand(new Payroll("hr department"));
companyServer.enqueueJobs(payHR);

// Alright, it's midnight. Time to run the enqueued jobs and call it a day.
companyServer.runJobs();

/*
Bye bye money. Paying  construction workers
Bye bye money. Paying  CSuite
Scanning for pesky viruses in the logistics department
Scanning for pesky viruses in the marketing department
Generating logistics!
Bye bye money. Paying  hr department
*/
