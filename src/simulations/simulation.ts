import { TrackableArray } from './trackableArray';

export interface SimulationStep {
    array: number[];
    reads: number[] | null;
    writes: number[] | null;
    start: number;
    end: number;
}

export class Simulation extends TrackableArray {
    public steps: SimulationStep[];
    public name: string;
    private includeReadsSteps;

    constructor(array: number[], name: string, reads: boolean) {
        super(array);
        this.name = name;
        this.includeReadsSteps = reads;
        this.steps = [
            // initial step is before any change
            {
                array: super.cloneArray(),
                reads: [],
                writes: [],
                start: 0,
                end: array.length,
            },
        ];
    }

    trackRange(start: number, end: number): void {
        this.steps[this.steps.length - 1].start = start;
        this.steps[this.steps.length - 1].end = end;
    }

    get(pos: number): number {
        if (this.includeReadsSteps) {
            this.steps.push({
                array: super.cloneArray(),
                reads: [pos],
                writes: [],
                start: this.prevStart(),
                end: this.prevEnd(),
            });
        }

        return super.get(pos);
    }

    set(pos: number, value: number): void {
        super.set(pos, value);

        this.steps.push({
            array: super.cloneArray(),
            reads: [],
            writes: [pos],
            start: this.prevStart(),
            end: this.prevEnd(),
        });
    }

    isFirstGreater(pos1: number, pos2: number): boolean {
        if (this.includeReadsSteps) {
            this.steps.push({
                array: super.cloneArray(),
                reads: [pos1, pos2],
                writes: [],
                start: this.prevStart(),
                end: this.prevEnd(),
            });
        }

        return super.isFirstGreater(pos1, pos2);
    }

    swap(pos1: number, pos2: number): void {
        this.steps.push({
            array: super.cloneArray(),
            reads: [],
            writes: [pos1, pos2],
            start: this.prevStart(),
            end: this.prevEnd(),
        });

        super.swap(pos1, pos2);
    }

    addLastStep() {
        this.steps.push({
            array: super.cloneArray(),
            reads: [],
            writes: [],
            start: 0,
            end: 0,
        });
    }

    private prevStart(): number {
        return this.steps[this.steps.length - 1].start;
    }
    private prevEnd(): number {
        return this.steps[this.steps.length - 1].end;
    }
}
