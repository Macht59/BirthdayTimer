
import Timer from '../BirthdayTimer';

it("can be created", () => {
    const t = new Timer();
    expect(t).toBeDefined();
    expect(t.birthDate).toBeNull();
    expect(t.countdownDate).toBeDefined();
    expect(t.countdownDate.isInitialized).toBe(false);
    expect(t.countdownDate.isFinished).toBe(false);
});

it("can be initialized", () => {
    const t = new Timer();
    const birthdate = new Date("2018-01-01");
    t.initialize(birthdate);
    expect(t.birthDate).toBe(birthdate);
    expect(t.countdownDate).toBeDefined();
    expect(t.countdownDate.isInitialized).toBe(true);
    expect(t.countdownDate.isFinished).toBe(false);
});

it("initialization with null birthdate will deinitialize timer", () => {
    const t = new Timer();
    t.initialize(new Date("2018-01-01"));
    t.initialize(null);
    expect(t.birthDate).toBeNull();
    expect(t.countdownDate.isInitialized).toBe(false);
    expect(t.countdownDate.isFinished).toBe(false);
});
