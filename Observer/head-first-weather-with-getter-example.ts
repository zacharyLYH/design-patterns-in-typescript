// WeatherData.ts

class WeatherData {
    private temperature: number;
    private humidity: number;
    private pressure: number;
    private observers: Observer[];

    constructor() {
        this.temperature = 0;
        this.humidity = 0;
        this.pressure = 0;
        this.observers = [];
    }

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update();
        }
    }

    getTemperature(): number {
        return this.temperature;
    }

    getHumidity(): number {
        return this.humidity;
    }

    getPressure(): number {
        return this.pressure;
    }

    setMeasurements(
        temperature: number,
        humidity: number,
        pressure: number
    ): void {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.notifyObservers();
    }
}

// Observer.ts

interface Observer {
    update(): void;
}

// CurrentConditionsDisplay.ts

class CurrentConditionsDisplay implements Observer {
    private temperature: number;
    private humidity: number;
    private subject: WeatherData;

    constructor(subject: WeatherData) {
        this.subject = subject;
        this.temperature = 0;
        this.humidity = 0;
    }

    update(): void {
        this.temperature = this.subject.getTemperature();
        this.humidity = this.subject.getHumidity();
        this.display();
    }

    display(): void {
        console.log(
            `Current conditions: ${this.temperature}F degrees and ${this.humidity}% humidity`
        );
    }
}

// StatisticsDisplay.ts

class StatisticsDisplay implements Observer {
    private temperature: number;
    private humidity: number;
    private pressure: number;
    private subject: WeatherData;

    constructor(subject: WeatherData) {
        this.subject = subject;
        this.temperature = 0;
        this.humidity = 0;
        this.pressure = 0;
    }

    update(): void {
        this.temperature = this.subject.getTemperature();
        this.humidity = this.subject.getHumidity();
        this.pressure = this.subject.getPressure();
        this.display();
    }

    display(): void {
        console.log(
            `Current statistics: ${this.temperature}F degrees, ${this.humidity}% humidity, ${this.pressure} pressure`
        );
    }
}

// Usage

const weatherData = new WeatherData();

const currentConditionsDisplay = new CurrentConditionsDisplay(weatherData);
const statisticsDisplay = new StatisticsDisplay(weatherData);

weatherData.addObserver(currentConditionsDisplay);
weatherData.addObserver(statisticsDisplay);

weatherData.setMeasurements(80, 65, 30.4);
weatherData.setMeasurements(82, 70, 29.2);
weatherData.setMeasurements(78, 90, 29.2);

/*
Current conditions: 80F degrees and 65% humidity
Current statistics: 80F degrees, 65% humidity, 30.4 pressure
Current conditions: 82F degrees and 70% humidity
Current statistics: 82F degrees, 70% humidity, 29.2 pressure
Current conditions: 78F degrees and 90% humidity
Current statistics: 78F degrees, 90% humidity, 29.2 pressure
*/
