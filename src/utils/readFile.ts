export function readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            if (typeof fileReader.result === 'string') {
                return resolve(fileReader.result);
            }
        }
        fileReader.readAsText(file)
    })
}