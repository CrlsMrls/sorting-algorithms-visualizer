export class TrackableArray {
    private array: number[];
    public reads: number;
    public writes: number;
    public maxStack: number;
    private stack: number;

    constructor(array: number[]) {
        this.array = [...array];
        this.reads = 0;
        this.writes = 0;
        this.maxStack = 0;
        this.stack = 0;
    }

    get length(): number {
        return this.array.length;
    }

    cloneArray(): number[] {
        return [...this.array];
    }

    get(pos: number): number {
        this.reads++;
        return this.array[pos];
    }

    set(pos: number, value: number): void {
        this.writes++;
        this.array[pos] = value;
    }

    isFirstGreater(pos1: number, pos2: number): boolean {
        this.reads += 2;
        return this.array[pos1] > this.array[pos2];
    }

    swap(pos1: number, pos2: number): void {
        this.writes += 2;
        const swap: number = this.array[pos1];
        this.array[pos1] = this.array[pos2];
        this.array[pos2] = swap;
    }

    trackRange(start: number, end: number): void {}

    trackRecursiveCall(): void {
        this.stack++;
        this.maxStack = Math.max(this.stack, this.maxStack);
    }

    trackReturned() {
        this.stack--;
    }

    increaseReads() {
        this.reads++;
    }

    increaseWrites() {
        this.writes++;
    }
}
