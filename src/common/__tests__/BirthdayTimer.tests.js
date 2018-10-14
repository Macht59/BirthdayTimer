
import BirthdayTimer from '../BirthdayTimer';

it("can be created", () => {
    const t = new BirthdayTimer();
    expect(t).toBeDefined();
    expect(t.birthDate).toBeNull();
    expect(t.countdownDate).toBeDefined();
    expect(t.countdownDate.isInitialized).toBe(false);
    expect(t.countdownDate.isFinished).toBe(false);
});

it("can be initialized", () => {
    const t = new BirthdayTimer();
    const birthdate = new Date("2018-01-01");
    t.initialize(birthdate);
    expect(t.birthDate).toBe(birthdate);
    expect(t.countdownDate).toBeDefined();
    expect(t.countdownDate.isInitialized).toBe(true);
    expect(t.countdownDate.isFinished).toBe(false);
});

it("initialization with null birthdate will deinitialize timer", () => {
    const t = new BirthdayTimer();
    t.initialize(new Date("2018-01-01"));
    t.initialize(null);
    expect(t.birthDate).toBeNull();
    expect(t.countdownDate.isInitialized).toBe(false);
    expect(t.countdownDate.isFinished).toBe(false);
});

it("not initialized timer has undefined nexAge", () => {
    global.Date.now = jest.fn(() => 1530518207007);

    const t = new BirthdayTimer();
    expect(t.nextAge).toBe(0);
});

it("timer has correct nexAge when birthday will be this year", () => {
    global.Date.now = jest.fn(() => new Date(2018, 12, 30).getTime());

    const t = new BirthdayTimer();
    t.initialize(new Date(1990, 10, 29));
    expect(t.nextAge).toBe(29);
});

it("timer has correct nexAge when birthday will be next year", () => {
    global.Date.now = jest.fn(() => new Date(2018, 1, 30).getTime());

    const t = new BirthdayTimer();
    t.initialize(new Date(1990, 10, 29));
    expect(t.nextAge).toBe(28);
});