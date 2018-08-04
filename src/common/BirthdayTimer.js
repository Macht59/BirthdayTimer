import CountDownDate from "./CountDownDate";

export default class BirthdayTimer {
    constructor() {
        this.birthDate = null;
        this.countdownDate = new CountDownDate();
    }

    initialize(birthDate, nowDate) {
        if (birthDate === this.birthDate) {
            return;
        }

        if (!nowDate) {
            nowDate = new Date();
        }

        if (!birthDate) {
            this.countdownDate = new CountDownDate();
            this.birthDate = null;
            return;
        }

        // Make time difference within one year
        let diff = birthDate - nowDate.setFullYear(birthDate.getFullYear());
        if (diff < 0) {
            diff += 365 * 24 * 60 * 60 * 1000;
        }

        this.countdownDate = new CountDownDate(diff);
        this.birthDate = birthDate;
    }
}
