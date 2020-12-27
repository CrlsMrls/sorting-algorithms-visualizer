export function graphArray(
    selector: string,
    array: number[],
    reads: number[],
    writes: number[],
    start: number,
    end: number
) {
    const canvas: HTMLCanvasElement = document.querySelector(selector);
    if (canvas == null) {
        throw new Error('Canvas selector not valid');
    }

    const margin = 25; // in pixels
    const thickness = adjustThickness(array.length);

    // adjust height and width to array size
    canvas.width = array.length * thickness + margin * 2;
    canvas.height = array.length * thickness + margin * 2;

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw background
    context.fillStyle = '#f1f1f1';
    const side = array.length * thickness + 2 * margin;
    context.fillRect(0, 0, side, side);

    if (start < end) {
        context.fillStyle = 'darkgray';
        context.fillRect(
            start * thickness + margin,
            margin,
            (end - start) * thickness,
            array.length * thickness
        );
    }

    // draw lines
    for (let i = 0; i < array.length; i++) {
        context.fillStyle = '#23120b';
        // if ( i % 10 === 0) {
        if (reads && reads.includes(i)) {
            context.fillStyle = '#21209c';
        }
        // if (i % 100 === 0) {
        if (writes && writes.includes(i)) {
            context.fillStyle = '#fdb827';
        }

        // lines are bottom up
        context.fillRect(
            i * thickness + margin,
            array.length * thickness + margin,
            thickness,
            -array[i] * thickness
        );
    }
}

function adjustThickness(length: number): number {
    let thickness = 2;

    if (length < 300) {
        thickness = 20;
    }

    if (length < 100) {
        thickness = 40;
    }

    if (length < 20) {
        thickness = 60;
    }

    return thickness;
}
