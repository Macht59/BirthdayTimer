
export default class CountDownDate {

    /**
     * Initializes an instance of CountDownDate class
     * @param {Countdown date in milliseconds} date 
     */
    constructor(date) {
        this.countDownMilliseconds = null;
        this.isInitialized = false;
        if (date) {
            if (date > 0) {
                this.countDownMilliseconds = date;
                this.isInitialized = true;
            }
        }
    }

    get isFinished() {
        return this.isInitialized && this.countDownMilliseconds <= 0;
    }

    get days() {
        if (!this.isInitialized) {
            return 0;
        }

        return Math.floor(this.countDownMilliseconds / (1000 * 60 * 60 * 24));
    }

    get hours() {
        if (!this.isInitialized) {
            return 0;
        }

        return Math.floor((this.countDownMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    }

    get minutes() {
        if (!this.isInitialized) {
            return 0;
        }

        return Math.floor((this.countDownMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    }

    get seconds() {
        if (!this.isInitialized) {
            return 0;
        }

        return Math.floor((this.countDownMilliseconds % (1000 * 60)) / 1000);
    }

    tick() {
        if (!this.isInitialized || this.isFinished) {
            return;
        }

        this.countDownMilliseconds -= 1000;
    }
}
