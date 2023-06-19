/*
Lets imagine a data processor. It should be able to process data from CSV, Excel, Word, txt files etc. Data processing follow a general set of steps, namely: Ingesting, transforming, validating, storing. 

While each step for each type of data might be significantly different, their high level steps are the same. Infact, it is conceivable to say storing is probably going to be the same across all data types: maybe putting it in an S3 bucket! 

To make our example more interesting, lets have a sendNotification() hook that will send an admin an email once the data has been stored but only for certain data types. 
*/

abstract class DataProcessor {
    process(): void {
        this.ingest();
        this.transform();
        this.validate();
        this.store();
        if (this.sendNotification()) {
            this.notifyManager();
        }
    }
    ingest(): void {
        console.log("Ingesting file");
    }
    abstract transform(): void;

    abstract validate(): void;

    store(): void {
        console.log("Sending to an S3 bucket");
    }

    notifyManager(): void {
        console.log("Sending a notification to manager");
    }

    abstract sendNotification(): boolean;
}

//Give transform() validate() and sendNotification() implementations
class CSV extends DataProcessor {
    transform(): void {
        console.log("Transforming a CSV");
    }
    validate(): void {
        console.log("Validating a CSV");
    }
    sendNotification(): boolean {
        return true;
    }
}

class Excel extends DataProcessor {
    transform(): void {
        console.log("Transforming a Excel");
    }
    validate(): void {
        console.log("Validating a Excel");
    }
    sendNotification(): boolean {
        return false;
    }
}

//You can make this example more realistic by passing a file as a constructor parameter, but we're lazy.
const processCSV: CSV = new CSV();
processCSV.process();

const processExcel: Excel = new Excel();
processExcel.process();

/*
Ingesting file
Transforming a CSV
Validating a CSV
Sending to an S3 bucket
Sending a notification to manager
Ingesting file
Transforming a Excel
Validating a Excel
Sending to an S3 bucket
*/
