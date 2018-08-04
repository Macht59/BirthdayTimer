import CountDownDate from "../CountDownDate";

it("can be created", () => {
    const cd = new CountDownDate();
    expect(cd).toBeDefined();
    expect(cd.isInitialized).toBe(false);
    expect(cd.isFinished).toBe(false);
    expect(cd.countDownMilliseconds).toBeNull();
    expect(cd.days).toBe(0);
    expect(cd.hours).toBe(0);
    expect(cd.minutes).toBe(0);
    expect(cd.seconds).toBe(0);
});

it("can be initialized", () => {
    const date = getDateDiff(0, 0, 3, 4, 5, 7);
    const cd = new CountDownDate(date);
    expect(cd).toBeDefined();
    expect(cd.isInitialized).toBe(true);
    expect(cd.isFinished).toBe(false);
    expect(cd.countDownMilliseconds).toBeDefined();
    expect(cd.days).toBe(3);
    expect(cd.hours).toBe(4);
    expect(cd.minutes).toBe(5);
    expect(cd.seconds).toBe(7);
});

it("can't be initialized with negative time", () => {
    const date = getDateDiff(0, 0, 0, 0, 0, -10);
    const cd = new CountDownDate(date);
    expect(cd).toBeDefined();
    expect(cd.countDownMilliseconds).toBeNull();
    expect(cd.isInitialized).toBe(false);
    expect(cd.isFinished).toBe(false);
    expect(cd.days).toBe(0);
    expect(cd.hours).toBe(0);
    expect(cd.minutes).toBe(0);
    expect(cd.seconds).toBe(0);
});

it("tick() substructs one second", () => {
    const date = getDateDiff(0, 0, 3, 4, 5, 7);
    const cd = new CountDownDate(date);
    expect(cd).toBeDefined();
    expect(cd.isInitialized).toBe(true);
    expect(cd.isFinished).toBe(false);
    expect(cd.countDownMilliseconds).toBeDefined();
    expect(cd.days).toBe(3);
    expect(cd.hours).toBe(4);
    expect(cd.minutes).toBe(5);
    expect(cd.seconds).toBe(7);
    cd.tick();
    expect(cd.isInitialized).toBe(true);
    expect(cd.isFinished).toBe(false);
    expect(cd.countDownMilliseconds).toBeDefined();
    expect(cd.days).toBe(3);
    expect(cd.hours).toBe(4);
    expect(cd.minutes).toBe(5);
    expect(cd.seconds).toBe(6);
});

it("tick() does nothing if CountDownDate is not initialized", () => {
    const cd = new CountDownDate();
    expect(cd).toBeDefined();
    const cdClone = Object.assign({}, cd);
    cd.tick();
    expect(cdClone).toMatchObject(cd);
});

it("tick() does nothing if CountDownDate is finished", () => {
    const date = getDateDiff(0, 0, 0, 0, 0, 1);
    const cd = new CountDownDate(date);
    expect(cd).toBeDefined();
    expect(cd.isInitialized).toBe(true);
    expect(cd.isFinished).toBe(false);
    expect(cd.countDownMilliseconds).toBeDefined();
    expect(cd.days).toBe(0);
    expect(cd.hours).toBe(0);
    expect(cd.minutes).toBe(0);
    expect(cd.seconds).toBe(1);
    cd.tick();
    expect(cd.isInitialized).toBe(true);
    expect(cd.isFinished).toBe(true);
    expect(cd.countDownMilliseconds).toBeDefined();
    expect(cd.days).toBe(0);
    expect(cd.hours).toBe(0);
    expect(cd.minutes).toBe(0);
    expect(cd.seconds).toBe(0);
    const cdClone = Object.assign({}, cd);
    cd.tick();
    expect(cd).toMatchObject(cdClone);
});

it("shows correct time", () =>{
    const date = getDateDiff(0, 0, 1, 1, 1, 1);
    const cd = new CountDownDate(date);
    expect(cd.isInitialized).toBe(true);
    expect(cd.isFinished).toBe(false);
    expect(cd.seconds).toBe(1);
    expect(cd.minutes).toBe(1);
    expect(cd.hours).toBe(1);
    expect(cd.days).toBe(1);
});

it("shows correct months", () =>{
    const date = getDateDiff(0, 1, 0, 0, 0, 0);
    const cd = new CountDownDate(date);
    expect(cd.isInitialized).toBe(true);
    expect(cd.isFinished).toBe(false);
    expect(cd.seconds).toBe(0);
    expect(cd.minutes).toBe(0);
    expect(cd.hours).toBe(0);
    expect(cd.days).toBe(31);
});

it("shows correct years", () =>{
    const date = getDateDiff(1, 0, 0, 0, 0, 0);
    const cd = new CountDownDate(date);
    expect(cd.isInitialized).toBe(true);
    expect(cd.isFinished).toBe(false);
    expect(cd.seconds).toBe(0);
    expect(cd.minutes).toBe(0);
    expect(cd.hours).toBe(0);
    expect(cd.days).toBe(365);
});

function getDateDiff(years, months, days, hours, minutes, seconds) {
    const date = new Date(years, months, days, hours, minutes, seconds);

    return new Date(date - new Date(0, 0, 0)).getTime();
}
