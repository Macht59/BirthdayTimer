import CountDownDate from "./CountDownDate";

export default class BirthdayTimer {

    constructor() {
        this.birthDate = null;
        this.countdownDate = new CountDownDate();
    }

    get nextAge() {
        if (!this.birthDate) {
            return 0;
        }

        const nowDateOnly = new Date(Date.now()).setFullYear(1);
        const birthDateOnly = new Date(this.birthDate.getTime()).setFullYear(1);

        if (nowDateOnly <= birthDateOnly) {
            return (new Date(Date.now())).getFullYear() - this.birthDate.getFullYear();
        }

        return (new Date(Date.now())).getFullYear() + 1 - this.birthDate.getFullYear();
    }

    initialize(birthDate, nowDate) {
        if (birthDate === this.birthDate) {
            return;
        }

        if (!nowDate) {
            nowDate = new Date(Date.now());
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
