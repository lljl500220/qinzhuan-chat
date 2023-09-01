export const delay = (delayTime:number) => {
    const start = Date.now();
    let now = start;
    while (now - start < delayTime) {
        now = Date.now();
    }
}